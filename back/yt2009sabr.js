// SABR lib for yt2009
const fetch = require("node-fetch")
const playerResponsePb = require("./proto/android_player_pb")
const sabrResponsePb = require("./proto/sabr_response_pb")
const yt2009utils = require("./yt2009utils")
const yt2009signin = require("./yt2009androidsignin")
const yt2009constants = require("./yt2009constants.json")
const child_process = require("child_process")
const audioItags = [139, 140]

let players = {}
let playbackSessions = {}

module.exports = {
    "initPlaybackSession": function(id, videoQualities) {
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

        return `/sabr_playback?pid=${rid}`;
        /*
        if(players[id] && Date.now() <= players[id].expire) {

        }*/
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
                        || s.itag == 140 || s.itag == 139)
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

            /*let applicableItags = {
                "1080p": [304, 137],
                "720p": [299, 136],
                "480p": [135],
                "audio": [140, 139],
                "lq": [134, 133, 160]
            }*/

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

            //console.log(vItags)

            let videoFmts = fmts.filter((s) => {
                return vItags.includes(s.itag)
            })
            videoFmts = videoFmts.sort((a,b) => {
                return b.itag - a.itag
            })
            if(!videoFmts[0]) {
                videoFmts = fmts.filter((s) => {
                    return s.itag == 160
                })
            }
            let audioFmts = fmts.filter((s) => {
                return (s.itag == 140 || s.itag == 139)
            })
            audioFmts = audioFmts.sort((a,b) => {
                return b.totalbitrate - a.totalbitrate
            })

            if(!audioFmts[0]) {
                console.log(`couldn't find suitable audio?`)
                callback(false)
                return;
            }

            // list all itags to user
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
            let videoLmt = preferedVideoFmt.lastchanged;
            let audioFmt = preferedAudioFmt.itag
            let audioLmt = preferedAudioFmt.lastchanged
            let audioXtags = preferedAudioFmt.xtags || ""
            let protoReq = createProto(
                videoFmt, videoLmt, audioFmt,
                audioLmt, audioXtags, r.ustreamer,
                offset
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
                //console.log("trying pull with " + r.sabrUrl)
                fetch(r.sabrUrl, {
                    "method": "POST",
                    "headers": {
                        "user-agent": "com.google.android.youtube/20.06.36 (Linux; U; Android 14) gzip"
                    },
                    "body": protoReq
                }).catch(e => {
                    // retry on network error
                    pull()
                }).then(r => {if(!r || !r.status) return;r.buffer().then(r => {
                    if(r.length < 1000) {
                        console.log(`malformed resp? ${r.toString("base64")}`)
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
                            callback(data)
                        }
                    }, (redir) => {
                        if(redir) {
                            // use for later request
                            //console.log("received sabr redir", redir)
                            players[p.id].sabrUrl = redir;
                        }
                    })
                })})
            }
            pull()
        }

        // (create/use cached) /player for SABR streaming data and other data
        // related to it
        if(req.query.force_replayer) {
            console.log(`[sabr/${playbackSession}] force replayer called!`)
        }
        if(players[p.id] && players[p.id].expiry - 60000 >= Date.now()
        && !req.query.force_replayer) {
            //console.log(`using cached player for ${playbackSession}`)
            processPlayer(players[p.id])
        } else {
            //console.log(`using clean player for ${playbackSession}`)
            let rHeaders = JSON.parse(JSON.stringify(yt2009constants.headers))
            rHeaders["user-agent"] = "com.google.android.youtube/20.06.36 (Linux; U; Android 14) gzip"
            if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
                let d = yt2009signin.getData().yAuth
                rHeaders.Authorization = `Bearer ${d}`
            }
            rHeaders["Content-Type"] = "application/x-protobuf"
            rHeaders["x-goog-api-format-version"] = "2"
            yt2009utils.craftPlayerProto(p.id, (pbmsg) => {
                fetch("https://youtubei.googleapis.com/youtubei/v1/player", {
                    "headers": rHeaders,
                    "method": "POST",
                    "body": pbmsg
                }).then(r => {r.buffer().then(b => {
                    let resp = playerResponsePb.root.deserializeBinary(b)
                    let formats = resp.toObject().formatsList[0]
                    let bp = {} //bp -- backport
                    let expire = "0"
                    function backportFormat(f) {
                        let a = JSON.parse(JSON.stringify(f))
                        a.qualityLabel = f.qualitylabel;
                        a.bitrate = f.totalbitrate;
                        a.mimeType = f.mimetype;
                        a.itag = f.formatid
                        if(f.audiotrackList && f.audiotrackList[0]) {
                            a.isOriginal = false;
                            let at = f.audiotrackList[0]
                            if(f.xtags) {
                                try {
                                    let xtagsProto = playerResponsePb.xtags
                                                 .deserializeBinary(f.xtags);
                                    xtagsProto = xtagsProto.toObject()
                                    let isOg = xtagsProto.partList.filter(s => {
                                        return s.value == "original"
                                    })[0]
                                    if(isOg) {
                                        a.isOriginal = true;
                                    }
                                }
                                catch(error) {}
                            }
                            a.audioTrack = {
                                "label": at.displayname,
                                "vss_id": at.vssid,
                                "audioIsDefault": Boolean(at.isdefault)
                            }
                        } else {
                            a.audioTrack = false;
                        }
                        if(a.url && a.url.includes("expire=")) {
                            expire = a.url.split("expire=")[1].split("&")[0]
                        }
                        return a;
                    }
                    if(!formats) {
                        callback(false)
                        return;
                    }
                    if(formats.dashformatList) {
                        if(!bp.streamingData) {
                            bp.streamingData = {}
                        }
                        bp.streamingData.adaptiveFormats = []
                        formats.dashformatList.forEach(f => {
                            bp.streamingData.adaptiveFormats.push(
                                backportFormat(f)
                            )
                        })
                    }

                    let ustreamerConfig = resp.toObject()
                                          .playerconfigmsgList[0]
                                          .mediacommonconfigmsgList[0]
                                          .mediaustreamerconfigList[0]
                                          .mediaustreamerrequestconfig
                    bp.ustreamer = ustreamerConfig;
                    bp.sabrUrl = formats.serverabrstreamingurl;
                    bp.expiry = parseInt(expire) * 1000
                    players[p.id] = bp;
                    processPlayer(bp)
                })})
            })
        }
    },

    "createProto": function(
        videoItagN, videoLmt, audioItagN, audioLmt, audioXtags, ustreamer, offset
    ) {
        const requestProto = require("./proto/sabr_pb")
        let videoItag = new requestProto.itagData()
        videoItag.setItag(videoItagN)
        videoItag.setLastmodifiedtime(videoLmt)
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
        let unk = new requestProto.hwData()
        unk.setId(1398091118)
        context.addHw(unk)
        context.setGl("US")
        context.setUtcoffsetminutes(60)
        context.setTimezone("Europe/Warsaw")
        context.setDevicecodename("ranchu;")
        abrNineteen.addClient(context)
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

    "parseResponse": function(r, fCallback, redirCallback) {
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

        let allParts = []
        let mediaHeaders = []
        let finalFragments = {}
        let audioInit;
        let videoInit;
        let fragments = {}
        let fullRes = r;

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
    }
}