const child_process = require("child_process")
const fs = require("fs")
const config = require("./config.json")

const SCREEN_WIDTH = 256
const SCREEN_HEIGHT = 192
const FRAMERATE = 15
const AUDIO_SAMPLE_RATE = 32000
const HEADER_SIZE = 52
const THUMBNAIL_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT * 2
const AUDIO_START = HEADER_SIZE + THUMBNAIL_SIZE
const START_PREFIX = Buffer.from([0, 0, 1])

const ffmpeg_dpg_video = [
    "-y", "-loglevel", "error",
    "-i", "$1",
    "-map", "0:v:0",
    "-r", `${FRAMERATE}`,
    "-sws_flags", "lanczos",
    "-vf", `scale=${SCREEN_WIDTH}:${SCREEN_HEIGHT}:force_original_aspect_ratio=decrease,`
         + `pad=${SCREEN_WIDTH}:${SCREEN_HEIGHT}:(ow-iw)/2:(oh-ih)/2,setsar=1`,
    "-c:v", "mpeg1video",
    "-strict", "unofficial",
    "-mbd", "2",
    "-trellis", "1",
    "-mpv_flags", "+cbp_rd",
    "-mpv_flags", "+mv0",
    "-b:v", "256k",
    "-cmp", "2",
    "-subcmp", "2",
    "-precmp", "2",
    "-f", "data",
    "$2"
]
const ffmpeg_dpg_audio = [
    "-y", "-loglevel", "error",
    "-i", "$1",
    "-map", "0:a:0",
    "-c:a", "mp2",
    "-b:a", "128k",
    "-ac", "2",
    "-ar", `${AUDIO_SAMPLE_RATE}`,
    "-f", "data",
    "$2"
]
const ffmpeg_dpg_audio_silence = [
    "-y", "-loglevel", "error",
    "-f", "lavfi",
    "-i", `anullsrc=r=${AUDIO_SAMPLE_RATE}:cl=stereo`,
    "-t", "$3",
    "-map", "0:a:0",
    "-c:a", "mp2",
    "-b:a", "128k",
    "-ac", "2",
    "-ar", `${AUDIO_SAMPLE_RATE}`,
    "-f", "data",
    "$2"
]
const ffmpeg_dpg_thumbnail = [
    "-loglevel", "error",
    "-ss", "$3",
    "-i", "$1",
    "-frames:v", "1",
    "-f", "rawvideo",
    "-pix_fmt", "rgb24",
    "-"
]

let converting = {}

function ffmpegArgs(template, input, output, extra) {
    return template.map(a => {
        return a.replace("$1", () => input)
                .replace("$2", () => output)
                .replace("$3", () => extra)
    })
}

function devlog(text) {
    if(config.env == "dev") {
        console.log("[dpg]", text)
    }
}

function probe(file, callback) {
    child_process.execFile("ffmpeg", ["-hide_banner", "-i", file],
    (error, stdout, stderr) => {
        stderr = String(stderr)
        let d = /Duration:\s*(\d+):(\d{2}):(\d{2}(?:\.\d+)?)/.exec(stderr)
        if(!d) {
            callback(new Error("can't read the video duration"))
            return;
        }
        callback(null, {
            "duration": parseInt(d[1]) * 3600 + parseInt(d[2]) * 60
                        + parseFloat(d[3]),
            "audio": /Stream #\d+:\d+.*: Audio:/.test(stderr)
        })
    })
}

function indexVideo(file, callback) {
    let frames = 0
    let gop = []
    let headerStart = -1
    let carry = Buffer.alloc(0)
    let carryOffset = 0
    let failed = false
    let stream = fs.createReadStream(file, {"highWaterMark": 1024 * 1024})

    stream.on("data", chunk => {
        let buf = Buffer.concat([carry, chunk])
        let i = 0
        while((i = buf.indexOf(START_PREFIX, i)) !== -1) {
            if(i + 6 > buf.length) {
                break;
            }
            let code = buf[i + 3]
            let position = carryOffset + i
            if((code == 0xB3 || code == 0xB8) && headerStart == -1) {
                headerStart = position
            } else if(code == 0x00) {
                if(((buf[i + 5] >> 3) & 7) == 1) {
                    gop.push(frames, headerStart == -1 ? position : headerStart)
                }
                frames++
                headerStart = -1
            }
            i += 3
        }
        carry = buf.subarray(Math.max(buf.length - 5, 0))
        carryOffset += buf.length - carry.length
    })
    stream.on("error", error => {
        failed = true
        callback(error)
    })
    stream.on("end", () => {
        if(failed) return;
        if(frames == 0) {
            callback(new Error("no video frames in the converted stream"))
            return;
        }
        let gopBuffer = Buffer.alloc(gop.length * 4)
        gop.forEach((v, i) => {
            gopBuffer.writeInt32LE(v, i * 4)
        })
        callback(null, {"frames": frames, "gop": gopBuffer})
    })
}

function createThumbnail(file, duration, callback) {
    function grab(second, next) {
        child_process.execFile("ffmpeg", ffmpegArgs(
            ffmpeg_dpg_thumbnail, file, "", `${second}`
        ), {"encoding": "buffer", "maxBuffer": 4 * 1024 * 1024},
        (error, stdout) => {
            next(!error && stdout.length >= SCREEN_WIDTH * SCREEN_HEIGHT * 3
                 ? stdout : null)
        })
    }
    grab(Math.floor(duration / 10), (rgb) => {
        if(rgb) return convert(rgb);
        grab(0, (rgb) => {
            convert(rgb)
        })
    })

    function convert(rgb) {
        let thumbnail = Buffer.alloc(THUMBNAIL_SIZE)
        for(let p = 0; p < SCREEN_WIDTH * SCREEN_HEIGHT; p++) {
            let pixel = 0x8000
            if(rgb) {
                pixel |= ((rgb[p * 3 + 2] >> 3) << 10)
                      |  ((rgb[p * 3 + 1] >> 3) << 5)
                      |  (rgb[p * 3] >> 3)
            }
            thumbnail.writeUInt16LE(pixel, p * 2)
        }
        callback(thumbnail)
    }
}

function createHeader(frames, audioSize, videoSize, gopSize) {
    let videoStart = AUDIO_START + audioSize
    let header = Buffer.alloc(HEADER_SIZE)
    header.write("DPG4", 0, "latin1")
    header.writeInt32LE(frames, 4)
    header.writeInt32LE(Math.floor(FRAMERATE * 0x100), 8)
    header.writeInt32LE(AUDIO_SAMPLE_RATE, 12)
    header.writeInt32LE(0, 16)
    header.writeInt32LE(AUDIO_START, 20)
    header.writeInt32LE(audioSize, 24)
    header.writeInt32LE(videoStart, 28)
    header.writeInt32LE(videoSize, 32)
    header.writeInt32LE(videoStart + videoSize, 36)
    header.writeInt32LE(gopSize, 40)
    header.writeInt32LE(3, 44)
    header.write("THM0", 48, "latin1")
    return header;
}

function writeDpg(output, parts, callback) {
    let out = fs.createWriteStream(output)
    let done = false
    function finish(error) {
        if(done) return;
        done = true
        callback(error)
    }
    out.on("error", finish)
    out.on("finish", () => {
        finish(null)
    })
    out.write(Buffer.concat([parts.header, parts.thumbnail]))

    let files = [parts.audioFile, parts.videoFile]
    function nextFile() {
        if(files.length == 0) {
            out.end(parts.gop)
            return;
        }
        let input = fs.createReadStream(files.shift())
        input.on("error", error => {
            out.destroy()
            finish(error)
        })
        input.on("end", nextFile)
        input.pipe(out, {"end": false})
    }
    nextFile()
}

module.exports = {
    "convert": function(input, output, callback) {
        if(converting[output]) {
            converting[output].push(callback)
            return;
        }
        converting[output] = [callback]

        let videoFile = output + ".m1v"
        let audioFile = output + ".mp2"
        let partFile = output + ".part"
        function finish(error) {
            if(error) {
                devlog(`${output}: ${error.message}`)
            }
            ;[videoFile, audioFile, partFile].forEach(f => {
                fs.rm(f, {"force": true}, () => {})
            })
            let callbacks = converting[output]
            delete converting[output]
            callbacks.forEach(c => {
                c(error)
            })
        }

        probe(input, (error, info) => {
            if(error) {
                finish(error)
                return;
            }

            let pending = 2
            let failure = null
            function encoded(error) {
                failure = failure || error
                pending--
                if(pending > 0) return;
                if(failure) {
                    finish(failure)
                    return;
                }
                assemble()
            }
            child_process.execFile(
                "ffmpeg", ffmpegArgs(ffmpeg_dpg_video, input, videoFile),
                (error) => encoded(error)
            )
            child_process.execFile(
                "ffmpeg", ffmpegArgs(
                    info.audio ? ffmpeg_dpg_audio : ffmpeg_dpg_audio_silence,
                    input, audioFile, `${info.duration}`
                ), (error) => encoded(error)
            )

            function assemble() {
                let audioSize, videoSize;
                try {
                    audioSize = fs.statSync(audioFile).size
                    videoSize = fs.statSync(videoFile).size
                }
                catch(error) {
                    finish(error)
                    return;
                }
                if(audioSize == 0 || videoSize == 0) {
                    finish(new Error("ffmpeg produced an empty stream"))
                    return;
                }
                indexVideo(videoFile, (error, index) => {
                    if(error) {
                        finish(error)
                        return;
                    }
                    createThumbnail(videoFile, info.duration, (thumbnail) => {
                        writeDpg(partFile, {
                            "header": createHeader(
                                index.frames, audioSize,
                                videoSize, index.gop.length
                            ),
                            "thumbnail": thumbnail,
                            "audioFile": audioFile,
                            "videoFile": videoFile,
                            "gop": index.gop
                        }, (error) => {
                            if(error) {
                                finish(error)
                                return;
                            }
                            fs.rename(partFile, output, (error) => {
                                finish(error)
                            })
                        })
                    })
                })
            }
        })
    }
}
