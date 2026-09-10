const fs = require("fs")
const path = require("path")
const childProcess = require("child_process")
const yt2009Utils = require("./yt2009utils")

const jobs = new Map()
// Keep completed HLS streams for six hours.
const HLS_CACHE_LIFETIME = 6 * 60 * 60 * 1000
const cleanupTimers = new Map()

const assetsRoot = path.resolve(__dirname, "../assets")
const hlsRoot = path.join(assetsRoot, "iphone-hls")

fs.mkdirSync(hlsRoot, { recursive: true })

function validVideoId(id) {
    return typeof id === "string" &&
           /^[a-zA-Z0-9_-]{11}$/.test(id)
}

function waitForPlaylist(playlist, firstSegment, callback) {
    const started = Date.now()

    const timer = setInterval(() => {
        const ready =
            fs.existsSync(playlist) &&
            fs.existsSync(firstSegment) &&
            fs.statSync(firstSegment).size > 0

        if (ready) {
            clearInterval(timer)
            callback(true)
            return
        }

        if (Date.now() - started > 30000) {
            clearInterval(timer)
            callback(false)
        }
    }, 100)
}

function scheduleCleanup(videoId, outputDirectory) {
    if(cleanupTimers.has(videoId)) {
        clearTimeout(cleanupTimers.get(videoId))
    }

    const timer = setTimeout(() => {
        // Do not delete a stream while FFmpeg is still running.
        if(jobs.has(videoId)) {
            scheduleCleanup(videoId, outputDirectory)
            return
        }

        try {
            fs.rmSync(outputDirectory, {
                recursive: true,
                force: true
            })

            console.log(
                `[iPhone HLS] Deleted cache for ${videoId}`
            )
        } catch(error) {
            console.error(
                `[iPhone HLS] Cache deletion failed for ${videoId}`,
                error
            )
        }

        cleanupTimers.delete(videoId)
    }, HLS_CACHE_LIFETIME)

    // Allow Node to exit without waiting six hours.
    timer.unref()

    cleanupTimers.set(videoId, timer)
}

function startTranscoding(videoId, inputFile, outputDirectory) {
    const playlist = path.join(outputDirectory, "index.m3u8")
    const segmentPattern = path.join(
        outputDirectory,
        "segment_%05d.ts"
    )

    const arguments = [
        "-y",

        // Reconnect if Googlevideo briefly interrupts the connection.
        "-reconnect", "1",
        "-reconnect_streamed", "1",
        "-reconnect_delay_max", "5",

        "-user_agent",
        "com.google.android.youtube/21.16.256 (Linux; U; Android 14)",

        "-i", inputFile,

        "-map", "0:v:0",
        "-map", "0:a:0?",

        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-profile:v", "baseline",
        "-level:v", "3.0",
        "-pix_fmt", "yuv420p",

        "-vf",
        "scale=320:240:force_original_aspect_ratio=decrease," +
        "pad=320:240:(ow-iw)/2:(oh-ih)/2",

        "-r", "24",
        "-b:v", "400k",
        "-maxrate", "500k",
        "-bufsize", "1000k",

        // One keyframe for every two-second segment at 24 fps.
        "-g", "48",
        "-keyint_min", "48",
        "-sc_threshold", "0",

        "-c:a", "aac",
        "-profile:a", "aac_low",
        "-b:a", "96k",
        "-ar", "44100",
        "-ac", "2",

        "-f", "hls",
        "-hls_time", "2",
        "-hls_list_size", "0",
        "-hls_playlist_type", "event",
        "-hls_flags", "independent_segments",
        "-hls_segment_filename", segmentPattern,

        playlist
    ]

    console.log(`[iPhone HLS] Starting ${videoId}`)

    const process = childProcess.spawn("ffmpeg", arguments, {
        stdio: ["ignore", "ignore", "pipe"]
    })

    jobs.set(videoId, process)

    process.stderr.on("data", data => {
        if (process.env && process.env.YT2009_HLS_DEBUG === "1") {
            console.log(data.toString())
        }
    })

    process.on("error", error => {
        console.error(`[iPhone HLS] FFmpeg error:`, error)
        jobs.delete(videoId)
    })

    process.on("close", code => {
        console.log(`[iPhone HLS] ${videoId} finished: ${code}`)
        jobs.delete(videoId)

        scheduleCleanup(videoId, outputDirectory)
    })

    return process
}

function getDirectVideoUrl(videoId, callback) {
    yt2009Utils.pullBarePlayer(videoId, player => {
        if (
            !player ||
            !player.streamingData ||
            !Array.isArray(player.streamingData.formats)
        ) {
            console.error(
                `[iPhone HLS] No streaming formats for ${videoId}`
            )
            callback(false)
            return
        }

        const formats = player.streamingData.formats.filter(format => {
            return (
                format &&
                format.url &&
                format.mimeType &&
                format.mimeType.includes("video/mp4")
            )
        })

        // Prefer itag 18: combined H.264 video and AAC audio.
        let selected = formats.find(format => {
            return String(format.itag) === "18"
        })

        // Otherwise use the lowest-bitrate combined MP4.
        if (!selected) {
            selected = formats.sort((a, b) => {
                return (a.bitrate || 0) - (b.bitrate || 0)
            })[0]
        }

        if (!selected || !selected.url) {
            console.error(
                `[iPhone HLS] No direct combined MP4 for ${videoId}`
            )
            callback(false)
            return
        }

        console.log(
            `[iPhone HLS] Direct format ${selected.itag} selected`
        )

        callback(selected.url)
    })
}

function prepareStream(videoId, callback) {
    const outputDirectory = path.join(hlsRoot, videoId)
    const playlist = path.join(outputDirectory, "index.m3u8")
    const firstSegment = path.join(
        outputDirectory,
        "segment_00000.ts"
    )

    // A completed transcode is already cached.
    if (
        fs.existsSync(playlist) &&
        fs.readFileSync(playlist, "utf8").includes("#EXT-X-ENDLIST")
    ) {
        callback(true)
        return
    }

    // Another request already started this stream.
    if (jobs.has(videoId)) {
        waitForPlaylist(playlist, firstSegment, callback)
        return
    }

    console.log(
        `[iPhone HLS] Resolving direct URL for ${videoId}`
    )

    getDirectVideoUrl(videoId, directUrl => {
        if (!directUrl) {
            callback(false)
            return
        }

        // Remove an incomplete stream left by an earlier FFmpeg job.
        try {
            fs.rmSync(outputDirectory, {
                recursive: true,
                force: true
            })
        } catch(error) {
            console.error(
                `[iPhone HLS] Cache cleanup failed`,
                error
            )
        }

        fs.mkdirSync(outputDirectory, {
            recursive: true
        })

        startTranscoding(
            videoId,
            directUrl,
            outputDirectory
        )

        waitForPlaylist(
            playlist,
            firstSegment,
            callback
        )
    })
}

module.exports = {
    register(app) {
        app.get("/iphone-hls/:videoId/index.m3u8", (req, res) => {
            const videoId = req.params.videoId

            if (!validVideoId(videoId)) {
                res.sendStatus(400)
                return
            }

            prepareStream(videoId, success => {
                if (!success) {
                    res.sendStatus(500)
                    return
                }

                res.redirect(
                    `/assets/iphone-hls/${videoId}/index.m3u8`
                )
            })
        })
    }
}