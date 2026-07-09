const yt2009sabr = require("./yt2009sabr")
let sabrPlaybackSessions = {}
let noPidIpRequests = {}

module.exports = {
    "set": function(app) {
        app.get("/sabr_flv_init", (req, res) => {
            if(!req.query.video_id) {
                res.sendStatus(400)
                return;
            }
            if(noPidIpRequests[req.ip] && noPidIpRequests[req.ip] >= 10) {
                res.sendStatus(429)
                return;
            };
            if(!noPidIpRequests[req.ip]) {
                noPidIpRequests[req.ip] = 0;
                setTimeout(() => {
                    noPidIpRequests[req.ip] = null;
                    delete noPidIpRequests[req.ip]
                }, 60000)
            }
            noPidIpRequests[req.ip]++
            let startQuality = ["480p", "360p", "240p", "144p"]
            let pid = yt2009sabr.initPlaybackSession(
                req.query.video_id.substring(0,11), startQuality
            ).split("pid=")[1].split("?")[0]
            sabrPlaybackSessions[pid] = {
                "sentFragments": [],
                "offset": 0,
                "qualities": startQuality,
                "id": req.query.video_id.substring(0,11)
            }
            let begin = 0;
            if(req.query.begin) {
                begin = parseInt(req.query.begin)
            }
            if(req.query.start) {
                begin = parseInt(req.query.start) * 1000
            }
            if(isNaN(begin)) {
                begin = 0;
            }
            res.redirect("/sabr_flv_playback/" + pid + ".flv?begin=" + begin)
        })
        app.get("/sabr_flv_init/*", (req, res) => {
            if(req.originalUrl.includes("&") && !req.originalUrl.includes("?")) {
                req.originalUrl = req.originalUrl.replace("&", "?")
            }
            let pid = req.originalUrl.split("sabr_flv_init/")[1]
                         .split("/")[0].split("?")[0]
            if(!pid) {
                res.sendStatus(400)
                return;
            }
            sabrPlaybackSessions[pid] = {
                "sentFragments": [],
                "offset": 0,
                "isKnownSabrd": true
            }
            let begin = 0;
            if(req.query.begin) {
                begin = parseInt(req.query.begin)
            }
            if(req.query.start) {
                begin = parseInt(req.query.start) * 1000
            }
            if(isNaN(begin)) {
                begin = 0;
            }
            res.redirect("/sabr_flv_playback/" + pid + ".flv?begin=" + begin)
        })
        app.get("/sabr_flv_playback/*", (req, res) => {
            let audioItags = ["139", "140"]
            let availablePackets = []
            let playbackId = req.originalUrl.split("sabr_flv_playback/")[1]
                             .split("/")[0].split(".")[0].split("?")[0];
            let playback = sabrPlaybackSessions[playbackId]
            let use1080 = playback.isKnownSabrd ? "" : false;
            if(!use1080) {
                try {
                    use1080 = (
                        playback.qualities.includes("1080p") ? "hd_1080" : ""
                    )
                }
                catch(error) {}
            }
            //console.log(`got request for ${playbackId} (${playback.id})`)
            //console.log(`starting sabr flv playback for ${playbackId}`)
            let noDelay = req.query.nodelay == "1"
            let dictatedOffset = req.query.start || req.query.begin
            if(dictatedOffset && !isNaN(parseInt(dictatedOffset))) {
                dictatedOffset = parseInt(dictatedOffset)// - 3000
            } else {
                dictatedOffset = null;
            }
            sabrPlaybackSessions[playbackId].lastBytes = 0;
            sabrPlaybackSessions[playbackId].sentFragments = []
            playback.sentFragments = []
            sabrPlaybackSessions[playbackId].offset = dictatedOffset || 0;
            playback.offset = dictatedOffset || 0;
            playback.lastBytes = 0;
            let videoDuration = 0;
            let hadMetadataSent = false;
            let isStartOfVideo = true;
            let requestStopped = false;
            res.set("content-type", "video/x-flv")
            req.on("close", () => {
                requestStopped = true;
            })
            function requestSabr(callback, forceReplayer) {
                let fReq = {
                    "query": {
                        "pid": playbackId,
                        "offset": playback.offset,
                        "hd": 1
                    },
                    "headers": {
                        "cookie": use1080
                    }
                }
                if(forceReplayer) {
                    fReq.query.force_replayer = 1;
                }
                //console.log(`requesting sabr at ${playback.offset}`)
                yt2009sabr.handlePlayer(playbackId, playback.offset, fReq, (data) => {
                    if(!data) {
                        callback(false)
                        return;
                    }
                    function addPart(part, p) {
                        let hasFragment = playback.sentFragments.includes(part)
                        let itag = part.split("-")[0]
                        if(audioItags.includes(itag)
                        && !hasFragment) {
                            // audio part
                            audioFragments.push(p)
                            playback.sentFragments.push(part)
                        } else if(!audioItags.includes(itag)
                        && !hasFragment) {
                            // video part
                            videoFragments.push(p)
                            playback.sentFragments.push(part)
                        }
                    }
                    let audioFragments = []
                    let videoFragments = []
                    for(let part in data) {
                        switch(part) {
                            case "videoMime":
                            case "itag":
                            case "xtags":
                            case "liveHead":
                            case "contentLengths":
                            case "hasRedirect":
                            case "usedXtag": {
                                break;
                            }
                            default: {
                                addPart(part, data[part])
                                break;
                            }
                        }
                    }
                    let updatedSnt = playback.sentFragments
                    sabrPlaybackSessions[playbackId].sentFragments = updatedSnt
                    //console.log(`sending ${audioFragments.length} audios and ${videoFragments.length} videos`)
                    callback([audioFragments, videoFragments])
                })
            }
            function processSabr(parts) {
                if(!parts || !parts[0] || !parts[1] || !parts.forEach) {
                    // smth went wrong
                    res.sendStatus(500)
                    return;
                }
                didReplayeredRequest = false;
                if(!hadMetadataSent && parts[1][0]) {
                    // grab video duration from bytes
                    // other fields like width/height are "optional"
                    let header = parts[1][0].slice(0,4096)
                    let duration = header.indexOf("mvhd") + 20
                    duration = header.readUInt32BE(duration)
                    let timescale = header.indexOf("mvhd") + 16
                    timescale = header.readUInt32BE(timescale)
                    duration = Math.floor(duration / timescale)
                    let approxFramerate = 25
                    let tkhdWidth = header.indexOf("tkhd") + 80
                    let tkhdHeight = header.indexOf("tkhd") + 84
                    tkhdWidth = header.readUInt16BE(tkhdWidth)
                    tkhdHeight = header.readUInt16BE(tkhdHeight)
                    header = flvTools.createMetadata(
                        duration, tkhdWidth, tkhdHeight, approxFramerate
                    )
                    videoDuration = duration;
                    res.write(header[0])
                    playback.lastBytes = header[1]
                    hadMetadataSent = true;
                }
                
                if(requestStopped) {
                    res.end()
                    return;
                }
                let packets = flvTools.createMediaPackets(
                    playback.lastBytes, parts[0], parts[1], false, isStartOfVideo
                )
                availablePackets = availablePackets.concat(packets[0])
                                .sort((a,b) => {
                    return (a[3] - b[3])
                })
                let topChunkForVideo = availablePackets.filter(s => {
                    return s[1] == "video"
                })
                topChunkForVideo = topChunkForVideo[topChunkForVideo.length - 1]
                let topChunkForAudio = availablePackets.filter(s => {
                    return s[1] == "audio"
                })
                topChunkForAudio = topChunkForAudio[topChunkForAudio.length - 1]
                let topTimestamp = 0;
                try {
                    topTimestamp = Math.min(topChunkForVideo[3], topChunkForAudio[3])
                }
                catch(error) {
                    topTimestamp = (topChunkForAudio || topChunkForVideo || [0,0,0,0])[3]
                }
                let packetsToSend = availablePackets.filter(s => {
                    return s[3] <= topTimestamp
                })
                packetsToSend = flvTools.packageMediaPackets(
                    playback.lastBytes, packetsToSend, false
                )
                res.write(packetsToSend[0])
                playback.lastBytes = packetsToSend[1]
                if(isStartOfVideo) {
                    isStartOfVideo = false;
                }
                try {
                    availablePackets = availablePackets.filter(s => {
                        return s[3] > topTimestamp
                    })
                }
                catch(error){}
                playback.offset += 5000
                if(playback.offset >= ((videoDuration * 1000) + 5000)
                || requestStopped) {
                    //console.log(`${playback.offset} finishing`)
                    try {
                        res.write(flvTools.packageMediaPackets(
                            playback.lastBytes, [], true
                        )[0])
                    }
                    catch(error){}
                    res.end()
                    return;
                } else {
                    setTimeout(() => {
                        let gotResponseHere = false;
                        requestSabr((parts) => {
                            gotResponseHere = true;
                            if(!didReplayeredRequest) {
                                processSabr(parts)
                            }
                        })
                        // workaround deadlocks
                        setTimeout(() => {
                            if(!gotResponseHere && !requestStopped) {
                                //console.log("replayer due to stall")
                                didReplayeredRequest = true;
                                requestSabr((parts) => {
                                    processSabr(parts)
                                }, true)
                            }
                        }, 20000)
                    }, (noDelay || dictatedOffset) ? 250 : 1000)
                }
            }
            let didReplayeredRequest = false;
            setTimeout(() => {
                if(!hadMetadataSent && playback.offset == 0) {
                    didReplayeredRequest = true;
                    requestSabr((parts) => {
                        processSabr(parts)
                    }, true)
                }
            }, 2200)
            requestSabr((parts) => {
                if(!didReplayeredRequest) {
                    processSabr(parts)
                }
            })
        })
    }
}



const flvStaticParts = {
    "head": Buffer.from("464C5601", "hex"),
    "headerSize": Buffer.from([0,0,0,9]),
    "avcEnding": Buffer.from("170200000000000010", "hex")
}

function uint32(number) {
    let a = Buffer.alloc(4)
    a.writeUInt32BE(number, 0)
    return a;
}

function doubleBE(number) {
    let a = Buffer.alloc(8)
    a.writeDoubleBE(number, 0)
    return a;
}

function uint16(number) {
    let a = Buffer.alloc(2)
    a.writeUInt16BE(number, 0)
    return a;
}

// backup for nonstandard sizes (24bit for example)
function createInt(int, length) {
    if(!length) length = 4
    let i = parseInt(int).toString(16).padStart(length * 2, "0")
    let arrayForm = Buffer.from(i.match(/.{1,2}/g).map(s => {
        return parseInt(s, 16)
    }))
    return arrayForm
}

function uint24(number) {
    return createInt(number, 3)
}

function craftFlvHeader(fileType) {
    let fileTypes = {
        "audio": 4,
        "video": 1,
        "both": 5
    }
    return Buffer.concat([
        flvStaticParts.head,
        Buffer.from([fileTypes[fileType] || 5]),
        flvStaticParts.headerSize
    ])
}

function craftPacketHeader(sizeOfPrevious, type, dataSize, timestamp, streamId) {
    let packetTypes = {
        "audio": 8,
        "video": 9,
        "amf": 18
    }
    if(timestamp > 16777215) {
        // over 3 bit limit, put the upper byte as 4th
        timestamp = timestamp.toString(16).padStart(8, "0")
        let lower = timestamp.substring(2)
        let upper = timestamp.substring(0,2)
        timestamp = Buffer.concat([
            Buffer.from(lower, "hex"), Buffer.from(upper, "hex")
        ])
    } else {
        timestamp = Buffer.concat([
            uint24(timestamp), Buffer.from([0])
        ])
    }
    return Buffer.concat([
        uint32(sizeOfPrevious || 0),
        Buffer.from([(packetTypes[type] || 9)]),
        uint24(dataSize || 0),
        timestamp,
        uint24(streamId || 0)
    ])
}

function craftVideoMetadata(duration, width, height, framerate) {
    function createPart(name, type, content) {
        let types = {
            "callback": Buffer.from([8]),
            "number": Buffer.from([0]),
            "string": Buffer.from([2])
        }
        return Buffer.concat([
            uint16(name.length),
            Buffer.from(name),
            types[type || "string"],
            content
        ])
    }

    return Buffer.concat([
        Buffer.from([2]),
        createPart("onMetaData", "callback", Buffer.from([0,0,0,11])),
        createPart("duration", "number", doubleBE(duration)),
        createPart("width", "number", doubleBE(width)),
        createPart("height", "number", doubleBE(height)),
        createPart("framerate", "number", doubleBE(framerate)),
        createPart("canseekontime", "number", doubleBE(1)),
        uint24(9)
    ])
}

function craftAvcHeaderPacket(videoFile) {
    let avcCBox = videoFile.indexOf("avcC")
    let boxLength = videoFile.readUInt32BE(avcCBox - 4) - 4
    avcCBox = videoFile.slice(avcCBox + 4, avcCBox + boxLength)
    return Buffer.concat([
        Buffer.from([23,0,0,0,0]),
        avcCBox
    ])
}

function craftAacHeaderPacket(audioFile) {
    let esdsBox = audioFile.indexOf("esds")
    let boxLength = audioFile.readUInt32BE(esdsBox - 4) - 7
    esdsBox = audioFile.slice(esdsBox + 4, esdsBox + boxLength)
    esdsBox = esdsBox.slice(esdsBox.byteLength - 16)
    return Buffer.concat([Buffer.from("AF00", "hex"), esdsBox]) // AF00 -- intro
}

// yt2009sabr
function readTimescale(file) {
    let mvhdBox = file.indexOf("mvhd") + 16
    return file.readUInt32BE(mvhdBox)
}

function readTfdt(file) {
    let tfdtBox = file.indexOf("tfdt")
    let boxLength = file.readUInt32BE(tfdtBox - 4) - 4
    tfdtBox = file.slice(tfdtBox + 4, tfdtBox + boxLength)
    if(tfdtBox.readUInt8(0) == 1) {
        // tfdt version 1 (8byte tfdt)
        let n = tfdtBox.slice(tfdtBox.length - 8)
        return parseInt(n.toString("hex"), 16)
    } else {
        // tfdt version 0 (4byte)
        let end = tfdtBox.length - 4
        return tfdtBox.readUInt32BE(end)
    }
}

function getTimestampOffset(file) {
    let ts = readTimescale(file)
    let tfdt = readTfdt(file)
    if(!ts || !tfdt) return 0;
    return Math.round((tfdt / ts) * 1000)
}

// sources
// https://chromium.googlesource.com/chromium/src/media/+/master/formats/mp4/box_definitions.cc
// https://mpeggroup.github.io/FileFormatConformance/?query=%3D%22trun%22
function parseMp4Trun(file) {
    let trunBox = file.indexOf("trun")
    let boxLength = file.readUInt32BE(trunBox - 4) - 4
    trunBox = file.slice(trunBox + 4, trunBox + boxLength)

    let trunFlags = trunBox.readUInt32BE(0)
    let dataOffsetPresent = (trunFlags & 0x1) !== 0
    let firstSampleFlagsPresent = (trunFlags & 0x4) !== 0
    let sampleDurationPresent = (trunFlags & 0x100) !== 0
    let sampleSizePresent = (trunFlags & 0x200) !== 0
    let sampleFlagsPresent = (trunFlags & 0x400) !== 0
    let sampleCompositionTimeOffsetsPresent = (trunFlags & 0x800) !== 0
    
    let cursor = 8; // flags + sample count
    if(dataOffsetPresent) {
        cursor += 4;
    }
    if(firstSampleFlagsPresent) {
        cursor += 4;
    }

    let sizes = []
    let flags = []
    let compositionTimes = []
    let allData = []
    let extractedParts = 0;
    let durations = []
    let bytesPerSegment = (
        sampleDurationPresent
      + sampleSizePresent
      + sampleFlagsPresent
      + sampleCompositionTimeOffsetsPresent
    ) * 4
    if(sampleSizePresent) {
        while(cursor < boxLength) {
            let partBytes = trunBox.slice(cursor, cursor + bytesPerSegment)
            let partCursor = 0;
            if(partBytes && partBytes.length == bytesPerSegment) {
                if(sampleDurationPresent) {
                    durations.push(partBytes.readUInt32BE(partCursor))
                    partCursor += 4
                }
                if(sampleSizePresent) {
                    sizes.push(partBytes.readUInt32BE(partCursor))
                    partCursor += 4
                }
                if(sampleFlagsPresent) {
                    flags.push(partBytes.readUInt32BE(partCursor))
                    partCursor += 4
                }
                if(sampleCompositionTimeOffsetsPresent) {
                    compositionTimes.push(partBytes.readUInt32BE(partCursor))
                    partCursor += 4
                }
                allData.push([
                    sizes[extractedParts],
                    flags[extractedParts],
                    compositionTimes[extractedParts]
                ])
                extractedParts++
            }
            cursor += bytesPerSegment
        }
    }

    if(durations.length >= 1) {
        durations.unshift(0)
        avcPacketTimestamps = durations;
    }

    return allData
}

function readSampleDuration(file) {
    // no durations from trun, read from tfhd
    let tfhdBox = file.indexOf("tfhd")
    let tfhdLength = file.readUInt32BE(tfhdBox - 4) - 4
    tfhdBox = file.slice(tfhdBox + 4, tfhdBox + tfhdLength)
    let tfhdCursor = 0;
    let tfhdFlags = tfhdBox.readUInt32BE(0)
    tfhdCursor += 8 // flags + track id
    let dataOffsetPresent = tfhdFlags & 0x1
    let sampleDescriptionIndexPresent = tfhdFlags & 0x2
    let defaultSampleDurationPresent = tfhdFlags & 0x8
    let defaultSampleSizePresent = tfhdFlags & 0x10
    let durationIsEmpty = tfhdFlags & 0x010000
    let defaultBaseIsMoof = tfhdFlags & 0x020000
    if(!durationIsEmpty) {
        if(dataOffsetPresent) {
            tfhdCursor += 8
        }
        if(sampleDescriptionIndexPresent) {
            tfhdCursor += 4
        }
        if(defaultSampleDurationPresent) {
            // yesssss
            return tfhdBox.readUInt32BE(tfhdCursor)
        }
        // defaultSampleSize and defaultSampleFlags can be skipped
    } else {
        // what??
        throw "no samples in this file?"
    }
}

const flvTools = {
    "createMetadata": function(duration, width, height, framerate) {
        let metadataPacket = craftVideoMetadata(duration, width, height, framerate)
        return [
            Buffer.concat([
                craftFlvHeader("both"),
                craftPacketHeader(0, "amf", metadataPacket.byteLength, 0, 0),
                metadataPacket
            ]),
            metadataPacket.byteLength
        ]
    },

    "createMediaPackets": function(
        lastPacketSize, audioMedia, videoMedia, isEndingOfVideo, isStartOfVideo
    ) {
        let groupedPackets = []
        let avcOffset = null;
        let avcPacketComposedTimestamps = []
        let avcPackets = []
        let avcPacketDataLengths = []
        let aacPackets = []
        let aacPacketDataLengths = []
        let aacPacketComposedTimestamps = []
        let avcTimescale = 0;
        let avcHeadPacket = null;
        let aacHeadPacket = null;

        // parse video fragments
        let parsedVideos = 0;
        videoMedia.forEach(videoFile => {
            if(!avcHeadPacket && isStartOfVideo) {
                avcHeadPacket = craftAvcHeaderPacket(videoFile)
            }
            let avcPacketTimestamps = []
            avcTimescale = readTimescale(videoFile)
            let avcTfhdDuration = null
            if(parsedVideos == 0 && !avcOffset) {
                avcOffset = getTimestampOffset(videoFile)
            }
            avcTfhdDuration = readSampleDuration(videoFile)
            let avcSamples = parseMp4Trun(videoFile)
            if(avcTfhdDuration) {
                // backup fill avcPacketTimestamps from tfhd (if in tfhd then it's constant)
                while(avcPacketTimestamps.length !== avcSamples.length) {
                    avcPacketTimestamps.push(avcTfhdDuration)
                }
            }
            let avcMdatCursor = 0;
            let avcMdatBox = videoFile.indexOf("mdat")
            let avcMdatLength = videoFile.readUInt32BE(avcMdatBox - 4) - 4
            avcMdatBox = videoFile.slice(avcMdatBox + 4, avcMdatBox + avcMdatLength)
            let avcPacketIndex = 0;
            avcSamples.forEach(s => {
                // create avc packets
                // https://veovera.org/docs/enhanced/enhanced-rtmp-v1.html#a-tidbit-about-flv-file-format
                
                let partSize = s[0]
                let partFlags = s[1]
                let partCompositionTime = s[2]

                let partType = 1 // keyframe
                if(partFlags > 65535) {
                    partType = 2 // interframe
                }

                partType = parseInt(partType.toString("2") + "0111", 2)
                partCompositionTime = partCompositionTime * (1000 / avcTimescale)

                let header = Buffer.concat([
                    Buffer.from([partType]),
                    Buffer.from([1]), // avc segment part
                    uint24(partCompositionTime)
                ])

                let mdatPart = avcMdatBox.slice(avcMdatCursor, avcMdatCursor + partSize)
                avcMdatCursor += partSize;
                let packetData = Buffer.concat([
                    header,
                    mdatPart
                ])
                avcPackets.push(packetData)
                avcPacketDataLengths.push(packetData.byteLength)
                avcPacketComposedTimestamps.push(
                    (avcPacketComposedTimestamps[avcPacketComposedTimestamps.length - 1] || 0)
                + avcPacketTimestamps[avcPacketIndex]
                )
                avcPacketIndex++
            })
            parsedVideos++
        })
        avcPacketComposedTimestamps = avcPacketComposedTimestamps.map(s => {
            return Math.round(s * (1000 / avcTimescale)) + avcOffset
        })
        // parse audio fragments
        let parsedAudios = 0;
        audioMedia.forEach(audioFile => {
            let compositedTimestamps = []
            if(!aacHeadPacket && isStartOfVideo) {
                aacHeadPacket = craftAacHeaderPacket(audioFile)
            }
            let aacPacketTimestamps = []
            let aacTimescale = readTimescale(audioFile)
            let aacTfhdDuration = readSampleDuration(audioFile)
            let aacSamples = parseMp4Trun(audioFile)
            let aacTimestampOffset = getTimestampOffset(audioFile)

            if(aacTfhdDuration) {
                while(aacPacketTimestamps.length !== aacSamples.length) {
                    aacPacketTimestamps.push(aacTfhdDuration)
                }
            }

            let aacMdatCursor = 0;
            let aacMdatBox = audioFile.indexOf("mdat")
            let aacMdatLength = audioFile.readUInt32BE(aacMdatBox - 4) - 4
            aacMdatBox = audioFile.slice(aacMdatBox + 4, aacMdatBox + aacMdatLength)
            let aacPacketIndex = 0;
            aacSamples.forEach(s => {
                // create aac packets
                // http://download.macromedia.com/f4v/video_file_format_spec_v10_1.pdf // E.4.2.1

                let partSize = s[0]
                let mdatPart = aacMdatBox.slice(aacMdatCursor, aacMdatCursor + partSize)
                aacMdatCursor += partSize
                let packetData = Buffer.concat([
                    Buffer.from("AF01", "hex"), // AF01 -- raw (media) part
                    mdatPart
                ])
                aacPackets.push(packetData)
                aacPacketDataLengths.push(packetData.byteLength)
                compositedTimestamps.push(
                    (compositedTimestamps[compositedTimestamps.length - 1] || 0)
                + aacPacketTimestamps[aacPacketIndex]
                )

                aacPacketIndex++
            })

            if(parsedAudios == 0) {
                //compositedTimestamps.unshift(aacTimestampOffset)
                //compositedTimestamps.pop()
            }
            parsedAudios++
            compositedTimestamps = compositedTimestamps.map(s => {
                return Math.round(s * (1000 / aacTimescale)) + aacTimestampOffset
            })
            aacPacketComposedTimestamps = aacPacketComposedTimestamps
                                          .concat(compositedTimestamps)
        })

        // group both
        let avcPacketIndex = 0;
        avcPacketComposedTimestamps.forEach(p => {
            groupedPackets.push([
                0, p, avcPackets[avcPacketIndex],
                avcPacketDataLengths[avcPacketIndex]
            ])
            avcPacketIndex++
        })
        let aacPacketIndex = 0;
        aacPacketComposedTimestamps.forEach(p => {
            groupedPackets.push([
                1, p, aacPackets[aacPacketIndex],
                aacPacketDataLengths[aacPacketIndex]
            ])
            aacPacketIndex++
        })
        groupedPackets = groupedPackets.sort((a,b) => {
            return (a[1] - b[1])
        })

        let lastSize = lastPacketSize || 0;
        let fullPackets = []
        if(avcHeadPacket && aacHeadPacket) {
            fullPackets = [
                [lastSize, "video", avcHeadPacket.byteLength, 0, 0, avcHeadPacket],
                [avcHeadPacket.byteLength, "audio", aacHeadPacket.byteLength, 0, 0, aacHeadPacket]
            ]
            lastSize = aacHeadPacket.byteLength
        }

        let packetIndex = 0;
        groupedPackets.forEach(p => {
            fullPackets.push([
                lastSize, (p[0] ? "audio" : "video"), p[3], p[1], 0, p[2]
            ])
            lastSize = p[3]
            packetIndex++
        })

        if(isEndingOfVideo) {
            let ts = avcPacketComposedTimestamps
            fullPackets.push([
                lastSize, "video", 5, ts[ts.length - 1], 0, flvStaticParts.avcEnding
            ])
            lastSize = 5
        }

        return [fullPackets, lastSize]
    },

    "packageMediaPackets": function(lastSize, groupedPackets, isEndingOfVideo) {
        let fullFile = []
        lastSize = lastSize || 0
        let lastTimestamp = 0;
        groupedPackets.forEach(p => {
            fullFile.push(craftPacketHeader(lastSize, p[1], p[2], p[3], 0))
            fullFile.push(p[5])
            lastSize = p[2]
            lastTimestamp = p[3]
        })
        if(isEndingOfVideo) {
            fullFile.push(
                craftPacketHeader(lastSize, "video", 5, lastTimestamp, 0)
            )
            fullFile.push(flvStaticParts.avcEnding)
            lastSize = 5
        }
        return [Buffer.concat(fullFile), lastSize]
    }
}