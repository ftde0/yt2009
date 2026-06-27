const child_process = require("child_process")
const config = require("./config.json")
const yt2009sabr = require("./yt2009sabr")

/*

yt2009 sabr adapter
transforms youtube's sabr protocol to a standard hls vod playlist,
enabling sabr playback on many devices,
without custom implementations for sabr.

*/

function getTfdt(mp4) {
    function readInt(part) {
        let nums = []
        for(let byte of part) {
            nums.push(byte)
        }
        nums = nums.map(s => {
            return s.toString(16).padStart(2, "0")
        }).join("")
        return parseInt(nums, 16)
    }
    // get timescale from mdhd header
    let timescaleIndex = mp4.indexOf("mdhd") + 16
    let timescale = readInt(mp4.slice(timescaleIndex, timescaleIndex + 4))
    // get tfdt (start offset of fragmented media)
    let tfdtIndex = mp4.indexOf("tfdt") + 4
    let tfdtVersion = mp4.slice(tfdtIndex, tfdtIndex + 1)[0]
    let tfdt = 0;
    if(tfdtVersion == 0) {
        // 4 byte tfdt
        // skip version + flags
        tfdtIndex += 4
        tfdt = readInt(mp4.slice(tfdtIndex, tfdtIndex + 4))
    } else {
        // 8 byte tfdt
        // skip version + flags
        tfdtIndex += 4
        tfdt = readInt(mp4.slice(tfdtIndex, tfdtIndex + 8))
    }
    return [tfdt, timescale]
}

let sabrFragmentTimestamps = {
    "audio": 10,
    "video": 5,
}
let sabrVideoLengths = {}
let sabrFragmentMaps = {}
let ongoingVideoFetches = {}
let sabrLastOffsetsFetched = {}
let sabrVideoOffsetCorrections = {}
let sabrVideoBklistOffsets = {}
let audioItags = ["139", "140"]
let vidManifestBase = `http://${config.ip}:${config.port}/shls-video-manifest`
let audManifestBase = `http://${config.ip}:${config.port}/shls-audio-manifest`
let vidFragmentBase = `http://${config.ip}:${config.port}/sabrhls-video-fragment`
let audFragmentBase = `http://${config.ip}:${config.port}/sabrhls-audio-fragment`
let hlsManifestVersion = 6


module.exports = {
    "register": function(app) {
        app.get("/sabr_hls_adapter/*", (req, res) => {
            let sabrSession = ""
            let sabrVideoLength = -1;
            try {
                sabrSession = req.originalUrl.split("/sabr_hls_adapter/")[1]
                                 .split("/")[0]
                sabrVideoLength = parseInt(
                    req.originalUrl.split(sabrSession + "/")[1]
                       .split(".")[0].split("/")[0]
                )
            }
            catch(error){}
            if(!sabrSession
            || sabrVideoLength == -1
            || isNaN(sabrVideoLength)) {
                res.sendStatus(400)
                return;
            }
            sabrVideoLengths[sabrSession] = sabrVideoLength
            let videoUrl = `${vidManifestBase}/${sabrSession}/${sabrVideoLength}/hd.m3u8`
            let audioUrl = `${audManifestBase}/${sabrSession}/${sabrVideoLength}/hd.m3u8`
            res.set("content-type", "application/x-mpegURL")
            sabrFragmentMaps[sabrSession] = []
            res.send(`#EXTM3U
#EXT-X-VERSION:${hlsManifestVersion}
#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",LANGUAGE="en",NAME="English",AUTOSELECT=YES,DEFAULT=YES,CHANNELS="2",URI="${audioUrl}"
#EXT-X-STREAM-INF:AUDIO="audio",AVERAGE-BANDWIDTH=1176057,BANDWIDTH=3893522,CODECS="avc1.42C01F,mp4a.40.2",RESOLUTION=854x480,FRAME-RATE=24.000
${videoUrl}`)
            if(!sabrLastOffsetsFetched[sabrSession]) {
                sabrLastOffsetsFetched[sabrSession] = [0,0] //VIDEO,AUDIO
            }
            if(sabrVideoBklistOffsets[sabrSession]) {
                sabrVideoBklistOffsets[sabrSession] = null;
                delete sabrVideoBklistOffsets[sabrSession]
            }
            if(sabrVideoOffsetCorrections[sabrSession]) {
                sabrVideoOffsetCorrections[sabrSession] = null;
                delete sabrVideoOffsetCorrections[sabrSession]
            }
        })

        app.get("/shls-video-manifest/*", (req, res) => {
            let playbackSession = ""
            let vl = 0;
            let isHd = (req.originalUrl.includes("/hd."));
            try {
                playbackSession = req.originalUrl.split(
                    "/shls-video-manifest/"
                )[1].split("/")[0]
                vl = parseInt(req.originalUrl.split(playbackSession + "/")[1]
                     .split(".m")[0].split("/")[0])
            }
            catch(error){}
            if(!playbackSession || !vl || isNaN(vl)) {
                res.sendStatus(400)
                return;
            }
            res.set("content-type", "application/x-mpegURL")
            let resp = `#EXTM3U
#EXT-X-VERSION:${hlsManifestVersion}
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:${sabrFragmentTimestamps.video.toFixed(0)}
#EXT-X-MEDIA-SEQUENCE:0`
            let a = 0;
            while(a < vl) {
                let addTimestamp = sabrFragmentTimestamps.video
                if(a + sabrFragmentTimestamps.video > vl) {
                    addTimestamp = vl - a
                }
                if(vl - a >= 4) {
                    resp += `\n#EXTINF:${addTimestamp.toFixed(3)},
${vidFragmentBase}/${playbackSession}/${a}${isHd ? "/hd" : ""}.ts\n`
                }
                a += sabrFragmentTimestamps.video
            }
            resp += `#EXT-X-ENDLIST`
            res.send(resp)
        })

        app.get("/shls-audio-manifest/*", (req, res) => {
            let playbackSession = ""
            let vl = 0;
            let isHd = (req.originalUrl.includes("/hd."));
            try {
                playbackSession = req.originalUrl.split(
                    "/shls-audio-manifest/"
                )[1].split("/")[0]
                vl = parseFloat(req.originalUrl.split(playbackSession + "/")[1]
                     .split(".m")[0].split("/")[0])
            }
            catch(error){}
            if(!playbackSession || !vl || isNaN(vl)) {
                res.sendStatus(400)
                return;
            }
            res.set("content-type", "application/x-mpegURL")
            let resp = `#EXTM3U
#EXT-X-VERSION:${hlsManifestVersion}
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:${sabrFragmentTimestamps.audio.toFixed(0)}
#EXT-X-MEDIA-SEQUENCE:0`
            let a = 0;
            while(a < vl) {
                let addTimestamp = sabrFragmentTimestamps.audio
                if(a + sabrFragmentTimestamps.audio > vl) {
                    addTimestamp = vl - a
                }
                resp += `\n#EXTINF:${addTimestamp.toFixed(3)},
${audFragmentBase}/${playbackSession}/${a}${isHd ? "/hd" : ""}.aac\n`
                a += sabrFragmentTimestamps.audio
            }
            resp += `#EXT-X-ENDLIST`
            res.send(resp)
        })

        function requestSabr(
            session, offset, hd, callback, fragmentsType, forceReplayer
        ) {
            if(!sabrFragmentMaps[session]) {
                sabrFragmentMaps[session] = []
            }
            function processResponse(data) {
                if(!data) {
                    callback(false)
                    return;
                }
                let audioParts = []
                let videoParts = []
                for(let part in data) {
                    switch(part) {
                        case "videoMime":
                        case "itag":
                        case "xtags":
                        case "liveHead":
                        case "contentLengths":
                        case "hasRedirect": {
                            break;
                        }
                        default: {
                            let hasFragment = sabrFragmentMaps[session]
                                              .includes(part)
                            let itag = part.split("-")[0]
                            let p = data[part]
                            if(audioItags.includes(itag)
                            && fragmentsType == "audio"
                            && !hasFragment
                            && audioParts.length == 0) {
                                // audio part
                                audioParts.push(p)
                                sabrFragmentMaps[session].push(part)
                            } else if(!audioItags.includes(itag)
                            && !hasFragment
                            && fragmentsType == "video"
                            && videoParts.length == 0) {
                                // video part
                                videoParts.push([p,part])
                                sabrFragmentMaps[session].push(part)
                            }
                            break;
                        }
                    }
                }
                if(fragmentsType == "audio") {
                    callback(audioParts)
                } else {
                    callback(videoParts)
                }
            }
            let fReq = {
                "query": {
                    "pid": session,
                    "offset": offset
                }
            }
            let fetchId = session + "-" + offset
            if(hd) {
                fetchId += "-hd"
                fReq.query.hd = true;
            }
            if(forceReplayer) {
                fReq.query.force_replayer = 1
            }
            if(ongoingVideoFetches[fetchId]) {
                ongoingVideoFetches[fetchId] = function(f) {
                    processResponse(f)
                }
                return;
            }
            ongoingVideoFetches[fetchId] = 1;
            yt2009sabr.handlePlayer(session, offset, fReq, (data) => {
                if(ongoingVideoFetches[fetchId]
                && typeof(ongoingVideoFetches[fetchId]) == "function") {
                    ongoingVideoFetches[fetchId](data)
                }
                ongoingVideoFetches[fetchId] = null;
                delete ongoingVideoFetches[fetchId]
                processResponse(data)
            })
        }

        app.get("/sabrhls-video-fragment/*", (req, res) => {
            let playbackSession = ""
            let offset = 0;
            let isHd = (req.originalUrl.includes("/hd."));
            try {
                playbackSession = req.originalUrl.split(
                    "/sabrhls-video-fragment/"
                )[1].split("/")[0]
                offset = parseFloat(
                    req.originalUrl.split(playbackSession + "/")[1]
                       .split(".ts")[0].split("/")[0]
                )
            }
            catch(error){}
            if(!playbackSession || offset == -1 || isNaN(offset)) {
                res.sendStatus(400)
                return;
            }
            offset = offset * 1000
            if(sabrVideoOffsetCorrections[playbackSession]) {
                offset += sabrVideoOffsetCorrections[playbackSession]
            }
            let ogOffset = offset;
            res.set("content-type", "video/mp2t")
            if(sabrVideoBklistOffsets[playbackSession] == offset) {
                res.sendStatus(404)
                return;
            }
            if(!sabrLastOffsetsFetched[playbackSession]) {
                sabrLastOffsetsFetched[playbackSession] = [0,0]
            }
            let isSeek = false;
            let lastDiff = offset - sabrLastOffsetsFetched[playbackSession][0]
            if(lastDiff !== 0
            && lastDiff !== (sabrFragmentTimestamps.video * 1000)) {
                // seeking
                isSeek = true;
                sabrFragmentMaps[playbackSession] = []
            }
            sabrLastOffsetsFetched[playbackSession][0] = offset
            let doSabrCount = 0;
            function doSabr() {
                if(offset >= (sabrVideoLengths[playbackSession] * 1000)) {
                    // requested segments after video
                    if(!sabrVideoBklistOffsets[playbackSession]) {
                        sabrVideoBklistOffsets[playbackSession] = ogOffset
                    }
                    res.sendStatus(404)
                    return;
                }
                doSabrCount++
                requestSabr(playbackSession, offset, isHd, (fragments) => {
                    if(!fragments || !fragments[0]) {
                        // no fragments for video, retry
                        offset += 2000
                        if(!sabrVideoOffsetCorrections[playbackSession]) {
                            // applying minor offset correction
                            sabrVideoOffsetCorrections[playbackSession] = 2000
                        } else if(doSabrCount >= 2) {
                            // applying lvl2 corrections
                            let crctn = (doSabrCount * 1000) + 1000
                            sabrVideoOffsetCorrections[playbackSession] = crctn
                        }
                        if(doSabrCount >= 20) {
                            res.sendStatus(500)
                            return;
                        }
                        doSabr()
                        return;
                    }
                    let f = fragments[0][0]
                    let fragmentName = fragments[0][1]
                    if(!f) {
                        // no fragments for video, retry
                        offset += 2000
                        if(!sabrVideoOffsetCorrections[playbackSession]) {
                            // applying minor offset correction
                            sabrVideoOffsetCorrections[playbackSession] = 2000
                        } else if(doSabrCount >= 2) {
                            // applying lvl2 corrections
                            let crctn = (doSabrCount * 1000) + 1000
                            sabrVideoOffsetCorrections[playbackSession] = crctn
                        }
                        doSabr()
                        return;
                    }
                    if(!isSeek) {
                        let lastFragment = sabrFragmentMaps[playbackSession]
                                           .filter(s => {
                            return s && !audioItags.includes(s.split("-")[0])
                        })
                        lastFragment = lastFragment[lastFragment.length - 2]
                        if(lastFragment) {
                            let currentFid = parseInt(fragmentName.split("-")[1])
                            let lastFid = parseInt(lastFragment.split("-")[1])
                            if(currentFid - lastFid !== 1) {
                                // fragment skipped by sabr
                                // try a re-request to get the fragment
                                offset -= 2000
                                let fmap = sabrFragmentMaps[playbackSession]
                                           .filter(s => {
                                    return s !== fragmentName
                                })
                                sabrFragmentMaps[playbackSession] = fmap
                                sabrVideoOffsetCorrections[playbackSession] = -2000
                                doSabr()
                                return;
                            }
                        }
                    }
                    // success for video
                    // start offset, if needed
                    let timestamp = getTfdt(f)
                    timestamp = parseFloat(
                        (timestamp[0] / timestamp[1]).toFixed(2)
                    )
                    let ffmpegArgs = [
                        "-f", "mp4",
                        "-i", "pipe:",
                        "-c:v", "copy",
                        "-f", "mpegts",
                        "-muxpreload", "0",
                        "-muxdelay", "0",
                        "-output_ts_offset", timestamp,
                        "-"
                    ]
                    let c = child_process.spawn(
                        "ffmpeg", ffmpegArgs
                    )
                    let b = Buffer.from([])
                    c.stderr.on("data", (e) => {})
                    c.stdout.on("data", (d) => {
                        b = Buffer.concat([b, d])
                    })
                    c.stdout.on("end", () => {
                        res.send(b)
                    })
                    c.stdin.write(f)
                    c.stdin.end()
                }, "video")
            }
            doSabr()
        })

        app.get("/sabrhls-audio-fragment/*", (req, res) => {
            let playbackSession = ""
            let offset = 0;
            let isHd = (req.originalUrl.includes("/hd."));
            try {
                playbackSession = req.originalUrl.split(
                    "/sabrhls-audio-fragment/"
                )[1].split("/")[0]
                offset = parseInt(
                    req.originalUrl.split(playbackSession + "/")[1]
                       .split(".a")[0].split("/")[0]
                )
            }
            catch(error){}
            if(!playbackSession || offset == -1 || isNaN(offset)) {
                res.sendStatus(400)
                return;
            }
            offset = offset * 1000
            function createInt(int, length) {
                if(!length) length = 4
                return int.toString(16).padStart(length * 2, "0")
            }
            let id3Header = Buffer.from([
                `4944330400000000003F505249560000`,
                `00350000636F6D2E6170706C652E7374`,
                `7265616D696E672E7472616E73706F72`,
                `7453747265616D54696D657374616D70`
            ].join(""), "hex")
            res.set("content-type", "audio/x-aac")
            let lastDiff = offset - sabrLastOffsetsFetched[playbackSession][1]
            if(lastDiff !== 0
            && lastDiff !== (sabrFragmentTimestamps.audio * 1000)) {
                // seeking
                sabrFragmentMaps[playbackSession] = []
            }
            sabrLastOffsetsFetched[playbackSession][1] = offset
            let doSabrCount = 0;
            let forceReplayer = false;
            let forceReplayerCount = 0;
            function doSabr() {
                doSabrCount++
                if(doSabrCount > 20) {
                    // too many retries for audio, call it quit
                    res.sendStatus(500)
                    return;
                }
                let sabrGotResponse = false;
                requestSabr(playbackSession, offset, isHd, (fragments) => {
                    if(!fragments) {
                        res.sendStatus(500)
                        return;
                    }
                    forceReplayerCount = 0;
                    forceReplayer = false;
                    sabrGotResponse = true;
                    let f = fragments[0]
                    if(!f) {
                        // retry with higher offset
                        offset += 2000
                        doSabr()
                        return;
                    }
                    // success for audio
                    let tfdt = getTfdt(f)
                    let pts = Math.floor((tfdt[0] * 90000) / tfdt[1])
                    id3Header = Buffer.concat([
                        id3Header,
                        Buffer.from(`0000000000${createInt(pts, 4)}`, "hex")
                    ])
                    let ffmpegArgs = [
                        "-f", "m4a",
                        "-i", "pipe:",
                        "-c:v", "copy",
                        "-f", "adts",
                        "-"
                    ]
                    let c = child_process.spawn(
                        "ffmpeg", ffmpegArgs
                    )
                    let b = Buffer.from([])
                    c.stderr.on("data", (e) => {})
                    c.stdout.on("data", (d) => {
                        b = Buffer.concat([b, d])
                    })
                    c.stdout.on("end", () => {
                        b = Buffer.concat([id3Header, b])
                        try{res.send(b)}catch(error){}
                    })
                    c.stdin.write(f)
                    c.stdin.end()
                }, "audio", forceReplayer)
                
                // recover not starting due to sabr;
                // only do this if won't play at all otherwise
                // may cause audio/video skips so only as a last resort
                setTimeout(() => {
                    if(!sabrGotResponse
                    && offset == 0
                    && forceReplayerCount == 0) {
                        forceReplayer = true;
                        forceReplayerCount++
                        doSabr()
                    }
                }, 3000)
            }
            doSabr()
        })
    }
}