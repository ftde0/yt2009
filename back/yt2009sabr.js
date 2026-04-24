// SABR lib for yt2009
const fetch = require("node-fetch")
const sabrResponsePb = require("./proto/sabr_response_pb")
const yt2009utils = require("./yt2009utils")
const yt2009signin = require("./yt2009androidsignin")
const yt2009constants = require("./yt2009constants.json")
const yt2009exports = require("./yt2009exports")
const yt2009mobilehelper = require("./yt2009mobilehelper")
const config = require("./config.json")
const child_process = require("child_process")
const fs = require("fs")
const audioItags = [139, 140]

let players = {}
let playbackSessions = {}
let downloadProgresses = []

module.exports = {
    "initPlaybackSession": function(id, videoQualities, extraProperties) {
        let rid = ""
        let chars = "qwertyuiopasdfghjklzxcvbnm1234567890_-".split("")
        while(rid.length !== 16) {
            rid += chars[Math.floor(Math.random() * chars.length)]
        }
        while(playbackSessions[rid]) {
            rid = ""
            while(rid.length !== 16) {
                rid += chars[Math.floor(Math.random() * chars.length)]
            }
        }

        playbackSessions[rid] = {
            "id": id,
            "qualities": videoQualities
        }

        if(extraProperties) {
            for(let p in extraProperties) {
                playbackSessions[rid][p] = extraProperties[p]
            }
        }

        return `/sabr_playback?pid=${rid}`;
    },

    "handlePlayer": function(playbackSession, offset, req, callback) {
        if(!playbackSessions[playbackSession]
        || yt2009utils.isUnsupportedNode()) {
            callback(false)
            return;
        }
        
        let p = playbackSessions[playbackSession]
        let createProto = this.createProto
        let parseResponse = this.parseResponse
        let selfRef = this.handlePlayer;
		
		let customItag = false;
		if(req.query.user_video_itag
		&& !isNaN(parseInt(req.query.user_video_itag))) {
			playbackSessions[playbackSession].dirty = true;
			p.dirty = true;
            playbackSessions[playbackSession].pongItag = true;
            p.pongItag = true;
			customItag = parseInt(req.query.user_video_itag)
		}

        if(req.query.ri == "1") {
            playbackSessions[playbackSession].pongItag = true;
            p.pongItag = true;
        }

        function processPlayer(r) {
            if(!r.sabrUrl) {
                console.log(`no sabr url found for ${playbackSession} (???)`)
                callback(false)
                return;
            }
            let fmts = r.streamingData.adaptiveFormats
            try {
                fmts = fmts.filter((s) => {
                    return (
                        (s.itag == 299 || s.itag == 298 || s.itag == 137
                        || s.itag == 216 || s.itag == 136 || s.itag == 135
                        || s.itag == 134 || s.itag == 133 || s.itag == 160
                        || s.itag == 140 || s.itag == 139
						|| (customItag && s.itag == customItag))
                        && !s.isdrc
                        && (!s.audioTrack
                        || (s.audioTrack
                        && s.isOriginal !== null
                        && s.isOriginal !== undefined)
                        || (s.audioTrack && s.audioTrack.audioIsDefault))
                    )
                })
            }
            catch(error) {
                console.log(error)
            }

            let vItags = [134, 133]
            //let vq = "lq"
            if(req.query.hd
            && (p.qualities.includes("720p")
            || p.qualities.includes("1080p"))) {
                // hd
                if(req.headers
                && req.headers.cookie
                && req.headers.cookie.includes("hd_1080")) {
                    vItags = [304, 137, 136, 135, 134, 133]
                } else {
                    vItags = [299, 136, 135, 134, 133]
                }
            } else if(req.query.hd
            && (p.qualities.includes("480p"))) {
                // hq
                vItags = [135, 134, 133]
            }

            let videoFmts = fmts.filter((s) => {
                return (
					(customItag && customItag == s.itag)
				  || vItags.includes(s.itag)
				)
            })
            videoFmts = videoFmts.sort((a,b) => {
                return b.itag - a.itag
            })
            if(!videoFmts[0]) {
                videoFmts = fmts.filter((s) => {
                    return s.itag == 160
                })
            }
            if(p.pongItag
            && p.dirty
            && customItag
            && videoFmts[0].itag !== customItag) {
                let target = videoFmts.filter(s => {
                    return s.itag == customItag
                })
                if(target[0]) {
                    videoFmts = [target[0]]
                }
            }
            let audioFmts = fmts.filter((s) => {
                return (s.itag == 140 || s.itag == 139)
            })
            audioFmts = audioFmts.sort((a,b) => {
                if(b.totalbitrate) {
                    return b.totalbitrate - a.totalbitrate;
                } else {
                    return b.bitrate - a.bitrate;
                }
            })

            if(!audioFmts[0]) {
                console.log(`couldn't find suitable audio?`)
                callback(false)
                return;
            }

            // list all xtags to user
            let usedItag = audioFmts[0].formatid;
            let at = audioFmts.filter(s => {
                return s.formatid == usedItag
            })
            let xtagList = []
            at.forEach(z => {
                if(z.xtags && z.audioTrack && z.audioTrack.label) {
                    xtagList.push([z.audioTrack.label, z.xtags].join())
                }
            })


            // cant filter isOriginal on the initial filter wtf??
            let hasAudiotracks = audioFmts.filter(s => {
                return s.isOriginal !== null && s.isOriginal !== undefined
            }).length
            let usedAudiotrack = audioFmts.filter(s => {
                return (
                    req.query && req.query.xtags
                    ? s.xtags == req.query.xtags
                    : s.isOriginal
                )
            })
            if(hasAudiotracks >= 1 && usedAudiotrack.length >= 1) {
                audioFmts = [usedAudiotrack[0]]
            }

            //console.log(audioFmts)

            let preferedVideoFmt = videoFmts[0]
            let preferedAudioFmt = audioFmts[0]
            
            if(!preferedVideoFmt || !preferedAudioFmt) {
                console.log(`couldn't find suitable formats?`)
                callback(false)
                return;
            }

            //console.log(preferedVideoFmt)
            //console.log(preferedAudioFmt)

            // create request proto payload
            let videoFmt = preferedVideoFmt.itag;
            let videoLmt = preferedVideoFmt.lastchanged
                        || parseInt(preferedVideoFmt.lastModified)
			let videoXtags = preferedVideoFmt.xtags
            let audioFmt = preferedAudioFmt.itag
            let audioLmt = preferedAudioFmt.lastchanged
                        || parseInt(preferedAudioFmt.lastModified)
            let audioXtags = preferedAudioFmt.xtags || ""
            let pchelperBoundPot = (p.pchelperBindingReq
                                 && p.pchelperBindingReq.potBytes
                                 && p.pchelperBindingReq.potKey)
                                 ? [
                                    p.pchelperBindingReq.potBytes,
                                    p.pchelperBindingReq.potKey
                                 ]
                                 : false;
            let protoReq = createProto(
                videoFmt, videoLmt, audioFmt,
                audioLmt, audioXtags, r.ustreamer,
                offset, videoXtags, pchelperBoundPot
            )

            // send request
            let pullCount = 0;
            let pullMax = 3; // max 3 tries
            function pull() {
                pullCount++
                if(pullCount > pullMax) {
                    console.log("exceeded pull tries!")
                    callback(false)
                    return;
                }
                let gotRedirectData = false;
                //console.log("trying pull with " + r.sabrUrl)
                fetch(r.sabrUrl, {
                    "method": "POST",
                    "headers": {
                        "user-agent": "com.google.android.youtube/20.51.39 (Linux; U; Android 14) gzip"
                    },
                    "body": protoReq
                }).catch(e => {
                    // retry on network error
                    pull()
                }).then(r => {if(!r || !r.status) return;r.buffer().then(r => {
                    if(r.length < 1000) {
                        console.log(`no media response? ${r.toString("base64")}`)
                    }
                    let parseOptions = {};
                    if(req && req.query && req.query.return_part_lengths) {
                        parseOptions.returnPartLengths = true;
                        //console.log("returning lenghts")
                    }
                    parseResponse(r, (data) => {
                        if(data.type && data.type == "redirect") {
                            // redo request with new url
                            console.log("redoing request because redirector?")
                            pull()
                        } else {
                            if(xtagList.length >= 1) {
                                data.xtags = xtagList.join(";")
                            }
                            if(preferedAudioFmt.xtags) {
                                data.usedXtag = preferedAudioFmt.xtags
                            }
							if(p.dirty) {
								data.videoMime = preferedVideoFmt.mimeType
							}
                            if(p.pongItag) {
                                data.itag = preferedVideoFmt.itag
                            }
                            if(gotRedirectData) {
                                data.hasRedirect = true;
                            }
                            if(req.query.return_video_length) {
                                try {
                                    let z = players[p.id]
                                    let l = z.videoDetails.lengthSeconds
                                    data.videoLength = l;
                                }
                                catch(error) {
                                    console.log(error, players[p.id])
                                }
                            }

                            //console.log(data)
                            callback(data)
                        }
                    }, (redir) => {
                        if(redir) {
                            // use for later request
                            players[p.id].sabrUrl = redir;
                            gotRedirectData = true;
                        }
                    }, parseOptions)
                })})
            }
            pull()
        }

        // (create/use cached) /player for SABR streaming data and other data
        // related to it
        if(req.query.force_replayer) {
            console.log(`[sabr/${playbackSession}] force replayer called!`)
        }
        function extractPlayerData(data) {
            data.sabrUrl = data.streamingData.serverAbrStreamingUrl;
            data.ustreamer = data.playerConfig.mediaCommonConfig
                                 .mediaUstreamerRequestConfig
                                 .videoPlaybackUstreamerConfig;
            if(data.sabrUrl && data.sabrUrl.includes("expire=")) {
                data.expiry = parseInt(
                    data.sabrUrl.split("expire=")[1].split("&")[0]
                ) * 1000
            } else {
                data.expiry = Date.now() + (7200 * 1000) // 2 hrs
            }
            players[p.id] = data;
        }
        if(!players[p.id] && yt2009exports.read().players[p.id]) {
            if(config.env == "dev") {
                console.log(`using cached exports player for ${playbackSession}`)
            }
            players[p.id] = yt2009exports.read().players[p.id]
            extractPlayerData(players[p.id])
        }
        if(players[p.id] && players[p.id].expiry - 60000 >= Date.now()
        && !req.query.force_replayer) {
            /*if(config.env == "dev") {
                console.log(`using cached sabr player for ${playbackSession}`)
            }*/
            processPlayer(players[p.id])
        } else {
            if(config.env == "dev") {
                console.log(`using clean player for ${playbackSession}`)
            }
            if(p.pchelperBindingReq) {
                p.pchelperBindingReq.usePot = true;
                p.pchelperBindingReq.callbackPot = true;
                p.pchelperBindingReq.query = {
                    "video_id": p.id
                }
                yt2009mobilehelper.pullPlayer(p.pchelperBindingReq, (d) => {
                    p.pchelperBindingReq.potBytes = d[1]
                    p.pchelperBindingReq.potKey = d[2]
                    extractPlayerData(d[0])
                    processPlayer(players[p.id])
                })
            }
            if(config.wyjeba_typu_onesie
            || yt2009exports.read().session_use_onesie) {
                yt2009utils.wyjebaTypuOnesie(p.id, (data) => {
                    extractPlayerData(data)
                    processPlayer(players[p.id])
                })
                return;
            }
            let rHeaders = JSON.parse(JSON.stringify(yt2009constants.headers))
            rHeaders["user-agent"] = "com.google.android.youtube/20.51.39 (Linux; U; Android 14) gzip"
            if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
                let d = yt2009signin.getData().yAuth
                rHeaders.Authorization = `Bearer ${d}`
            }
            rHeaders["Content-Type"] = "application/x-protobuf"
            rHeaders["x-goog-api-format-version"] = "2"
            rHeaders["x-goog-visitor-id"] = yt2009exports.read().visitor
            yt2009utils.craftPlayerProto(p.id, (pbmsg) => {
                fetch("https://youtubei.googleapis.com/youtubei/v1/player", {
                    "headers": rHeaders,
                    "method": "POST",
                    "body": pbmsg,
                    "agent": yt2009utils.createFetchAgent()
                }).then(r => {r.buffer().then(b => {
                    let player = yt2009utils.protoportPlayer(b)
                    extractPlayerData(player)
                    processPlayer(player)
                })})
            })
        }
    },

    "createProto": function(
        videoItagN, videoLmt, audioItagN, audioLmt,
        audioXtags, ustreamer, offset, videoXtags,
        pchelperPot
    ) {
        const requestProto = require("./proto/sabr_pb")
        let videoItag = new requestProto.itagData()
        videoItag.setItag(videoItagN)
        videoItag.setLastmodifiedtime(videoLmt)
		if(videoXtags) {
			videoItag.setDrcstring(videoXtags)
		}
        let audioItag = new requestProto.itagData()
        audioItag.setItag(audioItagN)
        audioItag.setLastmodifiedtime(audioLmt)
        audioItag.setDrcstring(audioXtags ? audioXtags : "")
        let abrReq = new requestProto.root()
        let abrNineteen = new requestProto.root.sourcePlayer()
        let context = new requestProto.clientMsg()
        context.setDevicemake("Google")
        context.setDevicemodel("Android SDK built for x86")
        context.setClientnumber(3) // ANDROID
        context.setClientversion("20.06.36")
        context.setOsname("Android")
        context.setOsversion("10")
        context.setHl("en")
        context.setGl("US")
        context.setUtcoffsetminutes(60)
        context.setTimezone("Europe/Warsaw")
        context.setDevicecodename("ranchu;")
        abrNineteen.addClient(context)
        let potBytes = Buffer.from([1])
        let potKey = Buffer.from([1])
        if(yt2009exports.read().potBytes && yt2009exports.read().potKey) {
            potBytes = yt2009exports.read().potBytes
            potKey = yt2009exports.read().potKey
        }
        if(pchelperPot && pchelperPot[0] && pchelperPot[1]) {
            potBytes = pchelperPot[0]
            potKey = pchelperPot[1]
        }
        let pot = new requestProto.serviceIntegrityDimensionsMsg()
        let content = new requestProto.serviceIntegrityDimensionsMsg.contents()
        content.setEncryptdata(potBytes)
        content.setTokendata(potKey)
        pot.addContent(content)
        abrNineteen.addServiceintegritydimensions(pot)
        let abrItagsData = new requestProto.root.sourcePlayer.abrRequestMsg()
        abrItagsData.addVideoitag(videoItag)
        abrItagsData.addAudioitag(audioItag)
        abrReq.addPlayerreq(abrNineteen)
        abrReq.addPlayablevideoitag(videoItag)
        abrReq.addPlayableaudioitag(audioItag)
        let timing = new requestProto.root.timingData()
        timing.setPlayerwidth(1920)
        timing.setPlayerheight(1080)
        timing.setFiveint(5)
        timing.setStarttime(offset)
        timing.setReqinittime(0)
        timing.setFiveint2(5)
        timing.setRelinittime(0)
        abrReq.addTiming(timing)
        abrReq.setConfig(ustreamer)
        return abrReq.serializeBinary()
    },

    "parseResponse": function(r, fCallback, redirCallback, parseOptions) {
        // root ump parse logic
        // https://github.com/LuanRT/googlevideo/blob/main/src/core/UMP.ts
        // https://github.com/LuanRT/googlevideo/blob/main/src/core/ChunkedDataBuffer.ts
        // copy of the license available at ./LICENSE-GOOGLEVIDEO
        class chunkedDataBuffer {
            constructor(initChunks) {
                this.chunks = []
                this.currentChunkOffset = 0;
                this.currentDataView = null;
                this.totalLength = 0;
                this.currentChunkIndex = 0;
                if(initChunks && initChunks.length == 1) {
                    this.append(initChunks[0])
                }
            }

            getLength() {
                return this.totalLength
            }

            append(chunk) {
                if(this.canMergeWithLastChunk()) {
                    var lastChunk = this.chunks[this.chunks.length - 1]
                    this.chunks[this.chunks.length - 1] = new Uint8Array(
                        lastChunk.buffer,
                        lastChunk.byteOffset,
                        lastChunk.length + chunk.length
                    )
                    this.resetFocus()
                } else {
                    this.chunks.push(chunk)
                }
                this.totalLength += chunk.length
            }

            split(position) {
                var extractedBuffer = new chunkedDataBuffer()
                var remainingBuffer = new chunkedDataBuffer()
                var iterator = this.chunks[Symbol.iterator]()

                var item = iterator.next()
                while(!item.done) {
                    var chunk = item.value;
                    if(position >= chunk.length) {
                        extractedBuffer.append(chunk)
                        position -= chunk.length
                    } else if(position > 0) {
                        extractedBuffer.append(new Uint8Array(
                            chunk.buffer, chunk.byteOffset, position
                        ))
                        remainingBuffer.append(new Uint8Array(
                            chunk.buffer,
                            chunk.byteOffset + position,
                            chunk.length - position
                        ))
                        position = 0
                    } else {
                        remainingBuffer.append(chunk)
                    }
                    item = iterator.next()
                }

                return {
                    "extractedBuffer": extractedBuffer,
                    "remainingBuffer": remainingBuffer
                }
            }

            isFocused(position) {
                return position >= this.currentChunkOffset
                    && position < this.currentChunkOffset + this.chunks[this.currentChunkIndex].length
            }

            focus(position) {
                if(!this.isFocused(position)) {
                    if(position < this.currentChunkOffset) {
                        this.resetFocus()
                    }

                    while(
                        this.currentChunkOffset + this.chunks[this.currentChunkIndex].length <= position
                    && this.currentChunkIndex < this.chunks.length - 1
                    ) {
                        this.currentChunkOffset += this.chunks[this.currentChunkIndex].length;
                        this.currentChunkIndex += 1
                    }

                    this.currentDataView = undefined;
                }
            }

            canRead(position, length) {
                return position + length <= this.totalLength
            }

            canMergeWithLastChunk(chunk) {
                if(this.chunks.length == 0) return false;
                var lastChunk = this.chunks[this.chunks.length - 1]
                if(lastChunk.buffer == chunk.buffer
                && lastChunk.byteOffset + lastChunk.length == chunk.byteOffset) {
                    return true;
                }
                return false;
            }

            resetFocus() {
                this.currentDataView = undefined;
                this.currentChunkIndex = 0;
                this.currentChunkOffset = 0;
            }

            getUint8(position) {
                this.focus(position)
                var chunk = this.chunks[this.currentChunkIndex]
                return chunk[position - this.currentChunkOffset]
            }
        }

        class ump {
            constructor(c) {
                this.chunkedDataBuffer = c;
            }

            parse(callback) {
                while(true) {
                    var offset = 0;

                    var p = this.readVarint(offset)
                    var partType = p[0]
                    offset = p[1]

                    var p2 = this.readVarint(offset)
                    var partSize = p2[0]
                    offset = p2[1]

                    if(partType < 0 || partSize < 0) {
                        break;
                    }
                    
                    if(!this.chunkedDataBuffer.canRead(offset, partSize)) {
                        if(!this.chunkedDataBuffer.canRead(offset, 1)) {
                            break;
                        }

                        return {
                            "type": partType,
                            "size": partSize,
                            "data": this.chunkedDataBuffer
                        }
                    }

                    var splitResult = this.chunkedDataBuffer.split(offset)
                                        .remainingBuffer.split(partSize);
                    offset = 0;

                    callback({
                        "type": partType,
                        "size": partSize,
                        "data": splitResult.extractedBuffer
                    })

                    this.chunkedDataBuffer = splitResult.remainingBuffer
                }
            }

            readVarint(offset) {
                var byteLength = 0;

                if(this.chunkedDataBuffer.canRead(offset,1)) {
                    var firstByte = this.chunkedDataBuffer.getUint8(offset)
                    if(firstByte < 128) {
                        byteLength = 1;
                    } else if(firstByte < 192) {
                        byteLength = 2;
                    } else if(firstByte < 224) {
                        byteLength = 3;
                    } else if(firstByte < 240) {
                        byteLength = 4;
                    } else {
                        byteLength = 5;
                    }
                }

                if(byteLength < 1
                || !this.chunkedDataBuffer.canRead(offset,byteLength)) {
                    return [-1, offset]
                }
                
                var value = 0;

                switch(byteLength) {
                    case 1: {
                        value = this.chunkedDataBuffer.getUint8(offset++)
                        break;
                    }
                    case 2: {
                        var b11 = this.chunkedDataBuffer.getUint8(offset++)
                        var b21 = this.chunkedDataBuffer.getUint8(offset++)
                        value = (b11 & 0x3f) + 64 * b21
                        break;
                    }
                    case 3: {
                        var b21 = this.chunkedDataBuffer.getUint8(offset++)
                        var b22 = this.chunkedDataBuffer.getUint8(offset++)
                        var b23 = this.chunkedDataBuffer.getUint8(offset++)
                        value = (b21 & 0x1f) + 32 * (b22 + 256 * b23)
                        break;
                    }
                    case 4: {
                        var b31 = this.chunkedDataBuffer.getUint8(offset++)
                        var b32 = this.chunkedDataBuffer.getUint8(offset++)
                        var b33 = this.chunkedDataBuffer.getUint8(offset++)
                        var b34 = this.chunkedDataBuffer.getUint8(offset++)
                        value = (b31 & 0x0f) + 16 * (b32 + 256 * (b33 + 256 * b34))
                        break;
                    }
                    default: {
                        var tempOffset = offset + 1
                        this.chunkedDataBuffer.focus(tempOffset)

                        if(this.canReadFromCurrentChunk(tempOffset,4)) {
                            value = this.getCurrentDataView().getUint32(
                                tempOffset - this.chunkedDataBuffer.currentChunkOffset,
                                true
                            )
                        } else {
                            var b43 = this.chunkedDataBuffer.getUint8(tempOffset + 2)
                            var b44 = this.chunkedDataBuffer.getUint8(tempOffset + 3)
                            var b41 = this.chunkedDataBuffer.getUint8(tempOffset + 1)
                            b43 = b43 + 256 * b44

                            value = this.chunkedDataBuffer(tempOffset) + 256 * (b41 + 256 * b33)

                            offset += 5
                            break;
                        }
                    }
                }

                return [value,offset]
            }

            canReadFromCurrentChunk(offset, length) {
                return offset - this.chunkedDataBuffer.currentChunkOffset + length
                    <= this.chunkedDataBuffer[this.chunkedDataBuffer.currentChunkIndex].length
            }

            getCurrentDataView() {
                if(!this.chunkedDataBuffer.currentDataView) {
                    var currentChunk = this.chunkedDataBuffer.chunks[this.chunkedDataBuffer.currentChunkIndex]
                    this.chunkedDataBuffer.currentDataView = new DataView(
                        currentChunk.buffer,
                        currentChunk.byteOffset,
                        currentChunk.length
                    )
                }

                return this.chunkedDataBuffer.currentDataView;
            }
        }

        if(parseOptions && parseOptions.parseAsOnesieWyjebka) {
            let parts = []
            let umpParse = new ump(new chunkedDataBuffer([r]))
            umpParse.parse(function(part) {
                var data = part.data.chunks[0]
                var type = part.type
                if(type == 11 && data.length > 100) {
                    try {
                        parts.push(require("zlib").gunzipSync(data))
                    }
                    catch(error){}
                }
            })
            fCallback(parts)
            return;
        }

        let allParts = []
        let mediaHeaders = []
        let finalFragments = {}
        let audioInit;
        let videoInit;
        let fragments = {}
        let fullRes = r;
        let contentLengths = {}

        // concat fragments and write
        function finalize() {
            if(!videoInit) {
                // if no videoinit, mark as empty
                // and pray that one of the fragments has it
                videoInit = Buffer.from("")
            }
            if(!audioInit) {
                // same for audioInit
                audioInit = Buffer.from("")
            }
            for(var n in fragments) {
                var isVideo = (audioItags.indexOf(parseInt(n.split("-")[0])) == -1)

                let mediaData = Buffer.concat(fragments[n])
                let wholeChunk;
                
                if(isVideo && videoInit) {
                    wholeChunk = Buffer.concat([videoInit, mediaData])
                } else if(!isVideo && audioInit) {
                    wholeChunk = Buffer.concat([audioInit, mediaData])
                }

                finalFragments[n] = wholeChunk
            }

            if(parseOptions && parseOptions.returnPartLengths) {
                finalFragments.contentLengths = contentLengths;
            }

            // output callback
            fCallback(finalFragments)
        }

        // parse & organize sabr response
        function organizeData() {
            allParts = allParts.filter(function(s) {return s.friendlyType})

            // headers
            var tMediaHeaders = allParts.filter(function(s) {
                return s.friendlyType == "MEDIA_HEADER"
            })
            tMediaHeaders.forEach(function(m) {
                mediaHeaders.push(
                    sabrResponsePb.root.deserializeBinary(m.data).toObject()
                )
            })

            // redirect data (follow for the next request)
            var tRedir = allParts.filter(function(s) {
                return s.friendlyType == "REDIR"
            })
            if(tRedir[0]) {
                var redirUrl = []
                for (var i = 0; i < tRedir[0].data.length; i++) {
                    var e = tRedir[0].data[i]
                    e = String.fromCharCode(e)
                    redirUrl.push(e)
                }
                while(redirUrl[0] && redirUrl[0] !== "h") {
                    redirUrl.shift()
                }
                redirUrl = redirUrl.join("")
                redirCb(redirUrl)
            }

            // actual media bytes
            var tMediaData = allParts.filter(function(s) {
                return s.friendlyType == "MEDIA_FRAGMENT"
            })
            tMediaData.forEach(function(m) {
                // first byte is chunknumber
                var chunk = m.data[0]
                var header = mediaHeaders.filter(function(s) {
                    return s.chunknumber == chunk;
                })[0]
                var mdata = m.data.slice(1)

                // content times if needed
                if(parseOptions
                && parseOptions.returnPartLengths
                && header.chunkmediadata) {
                    try {
                        let ts = header.chunkmediadata.timescale
                        // resulting values are in seconds
                        let start = header.chunkmediadata.starttime / ts;
                        let length = header.chunkmediadata.length / ts;
                        let id = header.itag + "-" + header.totalchunknumber;
                        contentLengths[id] = {
                            "s": start,
                            "l": length
                        }
                    }
                    catch(error) {}
                }

                // should fill init
                if(header.isinitchunk) {
                    if(audioItags.indexOf(header.itag) !== -1) {
                        audioInit = Buffer.from(mdata);
                    } else {
                        videoInit = Buffer.from(mdata);
                    }
                } else {
                    // mdata
                    var id = header.itag + "-" + header.totalchunknumber;
                    if(!fragments[id]) {
                        fragments[id] = []
                    }
                    fragments[id].push(Buffer.from(mdata))
                }
            })

            finalize()
        }

        function redirCb(url) {
            try {
                redirCallback(url)
            }
            catch(error) {}
        }

        function parserStart() {
            if(fullRes[0] == 104 && fullRes[1] == 116
            && fullRes[2] == 116 && fullRes[3] == 112
            && fullRes[4] == 115) {
                // redirect only response
                var redirUrl = []
                for (var i = 0; i < fullRes.length; i++) {
                    var e = fullRes[i]
                    e = String.fromCharCode(e)
                    redirUrl.push(e)
                }
                redirUrl = redirUrl.join("")
                redirCb(redirUrl)
                finalFragments = {"type": "redirect"}
                fCallback(finalFragments)
                return;
            }

            var umpParse = new ump(new chunkedDataBuffer([fullRes]))
            umpParse.parse(function(part) {
                var data = part.data.chunks[0]
                var type = part.type
                var friendlyType = "";
                switch(type) {
                    case 20: {
                        friendlyType = "MEDIA_HEADER"
                        break;
                    }
                    case 21: {
                        friendlyType = "MEDIA_FRAGMENT"
                        break;
                    }
                    case 22: {
                        friendlyType = "MEDIA_END"
                        break
                    }
                    case 43: {
                        friendlyType = "REDIR"
                        break;
                    }
                }
                allParts.push({
                    "data": data,
                    "type": part.type,
                    "friendlyType": friendlyType
                })
            })

            organizeData()
        }

        parserStart()
    },

    "download": function(id, quality, callback) {
        let fIndicator = `${id}`
        if(quality && quality !== "360p") {
            fIndicator += `-${quality}`
        }
        if(downloadProgresses.includes(fIndicator)) {
            // sabr download of this video already running, wait for complete
            let x = setInterval(() => {
                if(!downloadProgresses.includes(fIndicator)) {
                    clearInterval(x)
                    callback(`/assets/${fIndicator}.mp4`)
                }
            }, 500)
            return;
        }
        if(config.env == "dev") {
            console.log(`starting sabr download of ${fIndicator}`)
        }
        function freeupProgress() {
            downloadProgresses = downloadProgresses.filter(s => {
                return s !== fIndicator
            })
        }
        downloadProgresses.push(fIndicator)
        let fReq = {
            "headers": {},
            "query": {
                "hd": 1,
                "return_video_length": 1,
                "return_part_lengths": 1
                //"force_replayer": 0/1
            }
        }
        // list of available qualities (handler will use top available from those)
        let qList = ["360p", "240p", "144p"]
        switch(quality) {
            case "1080p": {
                fReq.headers.cookie = "hd_1080"
                qList = ["1080p", "720p", "480p", "360p", "240p", "144p"]
                break;
            }
            case "720p": {
                qList = ["720p", "480p", "360p", "240p", "144p"]
                break;
            }
            case "480p": {
                qList = ["480p", "360p", "240p", "144p"]
                break;
            }
        }
        function remuxFragments(files, extension, callback) {
            // i would never write this normally
            // but has to be done here. RIP.
            let newFileNames = []
            files = JSON.parse(JSON.stringify(files))
            function runFile() {
                /*let chunkId = files[0].split(s + "-")[1]
                console.log(chunkId, contentLengths[chunkId])
                return;*/
                let ffmpegCmd = [
                    "ffmpeg",
                    "-y",
                    `-i "${__dirname}/${files[0]}"`,
                    "-c copy",
                    `"${__dirname}/${files[0]}-re.${extension}"`
                ].join(" ")
                child_process.exec(ffmpegCmd, (error, stdout, stderr) => {
                    newFileNames.push(`${files[0]}-re.${extension}`)
                    files.shift()
                    if(files[0]) {
                        runFile()
                    } else {
                        callback(newFileNames)
                    }
                })
            }
            if(files[0]) {
                runFile()
            }
        }
        let s = this.initPlaybackSession(id, qList).split("pid=")[1]
        let thisRef = this;
        let writtenVideoFiles = []
        let writtenAudioFiles = []
        let receivedPartIndexes = []
        let receivedParts = {}
        let offsetSeconds = 0;
        let videoLength = 0;
        let concurrentReplayerCount = 0;
        let contentLengths = {}
        function downloadPart() {
            // receive parts
            thisRef.handlePlayer(s, offsetSeconds * 1000, fReq, (data) => {
                if(fReq.query.force_replayer) {
                    fReq.query.force_replayer = null;
                    delete fReq.query.force_replayer;
                }
                if(!data) {
                    callback(false)
                    freeupProgress()
                    return;
                }
                let hasRedirect = false;
                let partCount = 0;
                for(let part in data) {
                    //console.log(`got response part ${part}`)
                    switch(part) {
                        case "xtags":
                        case "usedXtag":
                        case "videoMime":
                        case "itag": {
                            break;
                        }
                        case "videoLength": {
                            videoLength = parseInt(data[part])
                            break;
                        }
                        case "contentLengths": {
                            for(let p in data[part]) {
                                contentLengths[p] = data[part][p]
                            }
                            break;
                        }
                        case "hasRedirect": {
                            hasRedirect = true
                            break;
                        }
                        default: {
                            let o = offsetSeconds.toString()
                            if(!receivedParts[o]) {
                                receivedParts[o] = []
                                receivedPartIndexes.push(o)
                            }
                            receivedParts[o].push(part)
                            let fname = `../assets/${s}-${part}`
                            partCount++
                            if(!fs.existsSync(fname)) {
                                //console.log(`received ${s}-${part}`)
                                let itag = parseInt(part.split("-")[0])
                                if(audioItags.includes(itag)) {
                                    // is audio itag
                                    writtenAudioFiles.push(fname)
                                } else {
                                    // is video
                                    writtenVideoFiles.push(fname)
                                }
                                fs.writeFileSync(fname, data[part])
                            }
                            break;
                        }
                    }
                }
                if(offsetSeconds >= videoLength) {
                    // end of video

                    let remuxCallbacksDone = 0;
                    let remuxCallbacksRequired = 2;
                    let remuxedFiles = []
                    // remux audio fragments
                    let audioAssetsFname = `../assets/assets-${s}-audio`
                    remuxFragments(writtenAudioFiles, "m4a", (files) => {
                        files.forEach(f => {
                            remuxedFiles.push(f)
                        })
                        remuxCallbacksDone++
                        files = files.map(s => {
                            return `file '${__dirname}/${s}'`
                        })
                        fs.writeFileSync(
                            audioAssetsFname,
                            files.join("\n")
                        )
                    })

                    // remux video fragments

                    // list all video fragments
                    let videoAssetsFname = `../assets/assets-${s}-video`
                    remuxFragments(writtenVideoFiles, "mp4", (files) => {
                        files.forEach(f => {
                            remuxedFiles.push(f)
                        })
                        remuxCallbacksDone++
                        files = files.map(s => {
                            return `file '${__dirname}/${s}'`
                        })
                        fs.writeFileSync(
                            videoAssetsFname,
                            files.join("\n")
                        )
                    })

                    // create end fname
                    let targetFname = `/assets/${id}`
                    if(quality && quality !== "360p") {
                        targetFname += "-" + quality + ".mp4"
                    } else {
                        targetFname += ".mp4"
                    }

                    // call ffmpeg to merge all together
                    // first audio-video parts to ones,
                    // then both of those to create a target mp4
                    let callbacksRequired = 3;
                    let callbacksDone = 0;
                    function callFfmpeg(fileList, target, callback) {
                        let ffmpegCmd = [
                            "ffmpeg",
                            "-y",
                            "-safe 0",
                            "-f concat",
                            `-i "${__dirname}/${fileList}"`,
                            "-c copy",
                            `"${__dirname}/..${target}"`
                        ].join(" ")
                        //console.log(`calling ${ffmpegCmd}`)
                        child_process.exec(ffmpegCmd, (error, stdout, stderr) => {
                            if(fs.existsSync(`..${target}`)) {
                                callback(target)
                            } else {
                                callback(false)
                            }
                        })
                    }

                    let check = setInterval(() => {
                        if(remuxCallbacksDone >= remuxCallbacksRequired) {
                            markCallbackDone(true)
                            clearInterval(check)
                            callFfmpeg(
                                audioAssetsFname,
                                targetFname + "-a.m4a",
                                (c) => {
                                    markCallbackDone(c)
                                }
                            )
                            callFfmpeg(
                                videoAssetsFname,
                                targetFname + "-v.mp4",
                                (c) => {
                                    markCallbackDone(c)
                                }
                            )
                        }
                    }, 200)

                    let completeStatuses = []
                    function markCallbackDone(c) {
                        completeStatuses.push(c)
                        callbacksDone++
                        if(callbacksDone >= callbacksRequired
                        && !completeStatuses.filter(z => {
                            return !z
                        })[0]) {
                            // all completed well?
                            let ffmpegCmd = [
                                "ffmpeg",
                                "-y",
                                `-i "${__dirname}/..${targetFname}-a.m4a"`,
                                `-i "${__dirname}/..${targetFname}-v.mp4"`,
                                "-map 0:a",
                                "-map 1:v",
                                "-c:v copy",
                                "-c:a copy",
                                `"${__dirname}/..${targetFname}"`
                            ].join(" ")
                            child_process.exec(ffmpegCmd, (e, so, se) => {
                                if(fs.existsSync(`..${targetFname}`)) {
                                    callback(targetFname)
                                    freeupProgress()
                                } else {
                                    callback(false)
                                    freeupProgress()
                                }
                                setTimeout(() => {
                                    remuxedFiles.forEach(f => {
                                        try {
                                            fs.unlink(f, (e) => {})
                                        }
                                        catch(error){}
                                    })
                                    writtenAudioFiles.forEach(f => {
                                        try {
                                            fs.unlink(f, (e) => {})
                                        }
                                        catch(error){}
                                    })
                                    writtenVideoFiles.forEach(f => {
                                        try {
                                            fs.unlink(f, (e) => {})
                                        }
                                        catch(error){}
                                    })
                                    try {
                                        fs.unlink(
                                            `..${targetFname}-a.m4a`, (e) => {}
                                        )
                                        fs.unlink(
                                            `..${targetFname}-v.mp4`, (e) => {}
                                        )
                                        fs.unlink(audioAssetsFname, (e) => {})
                                        fs.unlink(videoAssetsFname, (e) => {})
                                    }
                                    catch(error){}
                                }, 1000)
                            })
                        } else if(callbacksDone >= callbacksRequired) {
                            callback(false);
                            freeupProgress()
                        }
                    }

                    return;
                }
                if(partCount >= 1) {
                    // safe to call next
                    concurrentReplayerCount = 0;
                    let timeout = 150;
                    if(offsetSeconds >= 180) {
                        timeout = 350
                    }
                    setTimeout(() => {
                        offsetSeconds += 5
                        downloadPart()
                    }, 150)
                } else {
                    // no parts? try recalling
                    if(!hasRedirect) {
                        concurrentReplayerCount++
                        if(concurrentReplayerCount > 3) {
                            // not!
                            callback(false)
                            freeupProgress()
                            return;
                        }
                        fReq.query.force_replayer = 1
                    }
                    setTimeout(() => {
                        downloadPart()
                    }, 500)
                }
            })
        }
        downloadPart()
    }
}

yt2009exports.writeData("umpParseFun", module.exports.parseResponse)
yt2009exports.writeData("sabrMirror", module.exports)