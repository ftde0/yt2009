function initMplayer(sabrUrl) {
    var v = document.getElementsByTagName("video")[0]
    // init as sabr
    if(!sabrUrl
    || !sabrUrl.indexOf
    || sabrUrl.indexOf("http:") !== -1
    || sabrUrl.indexOf("https:") !== -1
    || sabrUrl.indexOf("//") == 0) return;
    // sabr support
    function addToSabrQueue(data) {
        if(sabrData.addedSegments.indexOf(data.id) == -1
        || v.currentTime <= 20) {
            sabrData.appendQueue.push(data)
            sabrData.addedSegments.push(data.id)
        }
    }
    function requestSabr(offset, source, force) {
        function uint8tostring(uint8) {
            var s = ""
            for (var zi = 0; zi < uint8.length; zi++) {
                s += String.fromCharCode(uint8[zi])
            }
            return s;
        }
        var r = new XMLHttpRequest();
        var url = [
            sabrUrl,
            "&offset=" + offset
        ]
        if(window.sabrHd) {
            url.push("&hd=1")
        }
        if(force) {
            url.push("&force_replayer=1")
        }
        function retryRequest(force) {
            sabrData.lastRequestFailCount++
            if(sabrData.lastRequestFailCount > 3) {
                console.warn("last sabr request failed too many times! no recovery")
                return;
            }
            requestSabr(offset, source, force)
        }
        r.open("GET", url.join(""))
        r.responseType = "arraybuffer"
        r.send(null)
        sabrData.currentRequest = r;
        r.addEventListener("timeout", function(e) {retryRequest()}, false)
        r.addEventListener("error", function(e) {retryRequest()}, false)
        r.addEventListener("load", function(e) {
            if(sabrData.waitingSabrFetch) {
                sabrData.waitingSabrFetch = false;
            }
            if(sabrData.timedSabrFetchAborted && source == "TIMED") {
                sabrData.timedSabrFetchAborted = false;
                return;
            }
            if(r.status >= 400) {
                // invalid response
                console.log("network response problem")
                return;
            }
            // parse x-yt2009-saber
            var partsExtracted = 0;
            var partsInResponse = parseInt(
                r.getResponseHeader("x-part-count")
            )
            var s = r.response;
            var cursor = 14 // SABER-START

            if(partsInResponse == 0
            && !r.getResponseHeader("x-yt2009-got-internal-redirect")) {
                // something might have gone terribly wrong
                retryRequest(true)
                return;
            } else if(partsInResponse == 0) {
                retryRequest()
                return;
            }
            sabrData.lastRequestFailCount = 0;
            while(partsExtracted !== partsInResponse) {
                var partHeader = uint8tostring(
                    new Uint8Array(s.slice(cursor, cursor + 70))
                )
                partHeader = partHeader.split("//")[1]
                var headerLength = ("//" + partHeader + "//").length
                var partId = partHeader.split("SPART-\"")[1].split("\"")[0]
                var plen = parseInt(partHeader.split("-CL=")[1])
                var pdata = s.slice(
                    cursor + headerLength,
                    cursor + headerLength + plen
                )
                var ptype = "video"
                var partItag = parseInt(partId.split("-")[0])
                if(sabrData.audioItags.indexOf(partItag) !== -1) {
                    ptype = "audio"
                }
                
                var part = {
                    "id": partId,
                    "itag": parseInt(partId.split("-")[0]),
                    "pn": parseInt(partId.split("-")[1]),
                    "data": pdata,
                    "type": ptype
                }
                addToSabrQueue(part)
                cursor = cursor + headerLength + plen
                partsExtracted++
            }
        }, false)
    }
    var ms = new MediaSource();
    var vStream;
    var aStream;
    var videoStartedPlaying = false;
    v.src = URL.createObjectURL(ms);

    window.sabrData = {
        "offset": 0,
        "addedSegments": [],
        "audioItags": [139, 140],
        "appendQueue": [],
        "rawMediaSource": ms,
        "waitingSabrFetch": false,
        "timedCooldown": false,
        "timedSabrFetchAborted": false,
        "lastRequestFailCount": 0,
        "readAhead": 90,
        "firstRequestComplete": false
    }
    
    function readyStart() {
        sabrData.videoMime = "video/mp4; codecs=\"avc1.4D4028\""
        sabrData.audioMime = "audio/mp4; codecs=\"mp4a.40.2\""
        vStream = ms.addSourceBuffer(sabrData.videoMime)
        aStream = ms.addSourceBuffer(sabrData.audioMime)
        sabrData.videoBuffer = vStream
        sabrData.audioBuffer = aStream
        requestSabr(0, "TIMED")
    }

    // init
    ms.addEventListener("sourceopen", function() {
        readyStart()
    }, false)
    
    var vbq = setInterval(function() {
        if(sabrData.appendQueue[0]) {
            if(sabrData.appendQueue[0].type == "audio"
            && sabrData.audioBuffer && !sabrData.audioBuffer.updating) {
                try {
                    sabrData.audioBuffer.appendBuffer(
                        sabrData.appendQueue[0].data
                    )
                }
                catch(error) {
                    clearInterval(vbq)
                    initAsSabr()
                    return;
                }
                sabrData.appendQueue.shift()
            } else if(sabrData.appendQueue[0].type == "video"
            && sabrData.videoBuffer && !sabrData.videoBuffer.updating) {
                try {
                    sabrData.videoBuffer.appendBuffer(
                        sabrData.appendQueue[0].data
                    )
                }
                catch(error) {
                    clearInterval(vbq)
                    initAsSabr()
                    return;
                }
                sabrData.appendQueue.shift()
            }
            if(!sabrData.firstRequestComplete) {
                sabrData.firstRequestComplete = true;
                setTimeout(function() {
                    try{v.play()}catch(error){}
                }, 500)
            }
        }
    }, 250)
    
    // watch for new buffer fetches
    v.addEventListener("timeupdate", function() {
        videoStartedPlaying = true;
        if(v.currentTime > 120
        && !sabrData.videoBuffer.updating
        && !sabrData.audioBuffer.updating) {
            // don't keep much backwards buffer to not overfill
            try {
                sabrData.videoBuffer.remove(0, v.currentTime - 120)
                sabrData.audioBuffer.remove(0, v.currentTime - 120)
            }
            catch(error){console.log(error)}
        }

        if(sabrData.waitingSabrFetch || sabrData.timedCooldown) return;
        var c = v.currentTime;
        var arrayedRanges = []
        for (var k = 0; k < v.buffered.length; k++) {
            arrayedRanges.push({
                "start": v.buffered.start(k),
                "end": v.buffered.end(k)
            })
        }
        var currentRange = arrayedRanges.filter(function(s) {
            return (s.start <= c && s.end >= c)
        })[0]
        if(currentRange && ((currentRange.end - c) < sabrData.readAhead
        && (currentRange.end - c) > 0.1
        && !(v.duration - currentRange.end <= 0.3))
        && !sabrData.appendQueue[0]) {
            sabrData.sabrTimedCooldown = true;
            sabrData.waitingSabrFetch = true;
            requestSabr(Math.floor(currentRange.end * 1000), "TIMED")
            setTimeout(function() {
                sabrData.sabrTimedCooldown = false;
            }, 2000)
        }

        if(v.duration - v.currentTime <= 0.4) {
            var t = 0;
            while(t !== 3) {
                sabrData.fEnd = true;
                v.pause()
                t++
            }
        } else {
            sabrData.fEnd = false;
        }
    }, false)

    v.addEventListener("seeking", function(s) {
        var vc = v.currentTime
        var arrayedRanges = []
        for (var k = 0; k < v.buffered.length; k++) {
            arrayedRanges.push({
                "start": v.buffered.start(k),
                "end": v.buffered.end(k)
            })
        }
        var currentRange = arrayedRanges.filter(function(s) {
            return (s.start <= vc && s.end >= vc)
        })
        if(!currentRange[0]) {
            // time not buffered
            if(!sabrData.waitingSabrFetch) {
                sabrData.waitingSabrFetch = true;
                sabrData.addedSegments = []
                requestSabr(Math.floor(vc * 1000), "SEEK")
            } else {
                // wait for current sabr fetch to end
                var x = setInterval(function() {
                    if(!sabrData.waitingSabrFetch) {
                        sabrData.waitingSabrFetch = true;
                        sabrData.addedSegments = []
                        clearInterval(x)
                        requestSabr(Math.floor(vc * 1000), "SEEK")
                    }
                }, 100)
            }
        }
    }, false)

    setTimeout(function() {
        if(!v.playing && !videoStartedPlaying) {
            try {
                sabrData.currentRequest.abort()
                sabrData.waitingSabrFetch = false;
            }
            catch(error) {}
            requestSabr(0, "FORCE", true)
        }
    }, 4000)
}