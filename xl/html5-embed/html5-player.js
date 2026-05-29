function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}
var video = $("video")

// modern browser check
var modernBrowser = false;
var ua = navigator.userAgent;
var browserVersion = 1;
if(ua.indexOf("Firefox/") !== -1) {
    browserVersion = parseInt(ua.split("Firefox/")[1].split(" ")[0])
} else if(ua.indexOf("Chrome/") !== -1) {
    browserVersion = parseInt(ua.split("Chrome/")[1].split(" ")[0])
}
if(browserVersion >= 40) {
    modernBrowser = true;
}

// toggle the hid class
function toggleHid(element) {
    if(element.className.indexOf("hid") !== -1) {
        element.className = element.className.replace("hid", "")
    } else {
        element.className += " hid"
    }
}

// center an element with js
// compatibility with older browsers, remember that term?
function centerElement(element, enableCenterX, enableCenterY) {
    if(modernBrowser) {
        if(element.className.indexOf("browser-modern") == -1) {
            element.className += " browser-modern"
        }
        return;
    }
    var centerX = (window.innerWidth / 2) 
                - (element.getBoundingClientRect().width / 2);
    var centerY = (window.innerHeight / 2) 
                - (element.getBoundingClientRect().height / 2);
    if(enableCenterX) {
        element.style.left = centerX + "px"
    }
    if(enableCenterY) {
        element.style.top = centerY + "px"
    }
}
function initCenter() {
    centerElement($(".timer"), true, false)
}
window.addEventListener("resize", initCenter, false)
initCenter()

// try autoplay
try {
    if(!window.sabrBase) {
		video.play()
	}
}
catch(error) {}

// video pause/play
function videoToggle() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

video.addEventListener("pause", function() {
    $(".pause-btn").className += " hid"
    $(".play-btn").className = $(".play-btn").className.split("hid").join("")
}, false)

video.addEventListener("play", function() {
    $(".pause-btn").className = $(".pause-btn").className.split("hid").join("")
    $(".play-btn").className += " hid"
}, false)

video.addEventListener("click", videoToggle, false)

$(".pause-btn").addEventListener("click", function() {
    video.pause()
}, false)

$(".play-btn").addEventListener("click", function() {
    video.play()
}, false)

// seconds to time (ex. 300 -> 5:00)
function seconds_to_time(input) {
    var minutes = 0;
    var seconds = 0;

    var remainingSeconds = input % 60
    minutes = Math.floor(input / 60)
    seconds = remainingSeconds;

    if(seconds.toString().length == 1) {
        seconds = "0" + seconds.toString();
    }

    return minutes + ":" + seconds;
}

// update the progressbars and timers
var overrideTimer = false;
function timeUpdate() {
	if(video.buffered.length <= 0) return;
    var watched_vidth = (video.currentTime / video.duration) * 100
    $(".watched").style.width = watched_vidth + "%";

    var buffered_width = (video.buffered.end(0) / video.duration) * 100
    $(".loaded").style.width = buffered_width + "%"

    if(overrideTimer) return;
    $(".timer").innerHTML = seconds_to_time(Math.floor(video.currentTime))
                        + " / " + seconds_to_time(Math.floor(video.duration))

    hideLoadingSprite()
}

video.addEventListener("timeupdate", timeUpdate, false)

// enable looping
$(".loop-btn").addEventListener("click", function() {
    video.loop = !video.loop;

    // toggle inactive class
    if($(".loop-btn").className.indexOf("inactive") == -1) {
        $(".loop-btn").className += " inactive"
    } else {
        $(".loop-btn").className = $(".loop-btn").className
                                                .replace("inactive", "")
    }
}, false)

// fullscreen
var fullscreenOpen = false;
$(".fullscreen-btn").addEventListener("click", function() {
    if(!fullscreenOpen) {
        // open fullscreen
        try {
            document.documentElement.requestFullscreen()
            fullscreenOpen = true;
        }
        catch(error) {}
    } else {
        // close fullscreen
        try {
            document.exitFullscreen()
            fullscreenOpen = false;
        }
        catch(error) {}
    }
}, false)

document.addEventListener("fullscreenchange", function() {
    if(!document.fullscreenElement) {
        fullscreenOpen = false;
    }
}, false)

// video seeking
var lastMouseX = 0;

$(".progressbar").addEventListener("mousemove", function(e) {
    var x = (e.offsetX
        || e.pageX - $(".progressbar").getBoundingClientRect().left)
            / $(".progressbar").getBoundingClientRect().width
    if(Math.floor(x * 100) <= 1) return;
    $(".seekbtn").className = $(".seekbtn").className
                                .split("hid").join("")
                                .trimRight()
    $(".seekbtn").style.left = (x * 100) + "%"

    overrideTimer = true;
    lastMouseX = x
    $(".timer").innerHTML = seconds_to_time(Math.floor(video.duration * x))
                    + " / " + seconds_to_time(Math.floor(video.duration))
}, false)

$(".progressbar").addEventListener("mouseout", function(e) {
    if(e.pageY >= $(".progressbar").getBoundingClientRect().top) return;
    overrideTimer = false;
    if($(".seekbtn").className.indexOf("hid") !== -1) return;
    $(".seekbtn").className += " hid"
}, false)

$(".progressbar").addEventListener("click", function() {
    var x = lastMouseX
    video.currentTime = Math.floor(video.duration * x)
}, false)

// progressbar fading when necessary
function getUnix() {
    return Math.floor(new Date().getTime() / 1000);
}
var lastMouseMovement = getUnix()
document.addEventListener("mousemove", function() {
    lastMouseMovement = getUnix()
    $(".controls").style.opacity = 1;
}, false)
var controlsFade = setInterval(function() {
    if(getUnix() - lastMouseMovement >= 3) {
        $(".controls").style.opacity = 0;
    }
}, 1000)

// loading sprite
function adjustSprite() {
    if(document.querySelector(".html5-loading")) {
        // -16 from half the gif size (32x32)
        var left = video.getBoundingClientRect().width / 2 - 16
        $(".html5-loading").style.left = left + "px"
        var top = video.getBoundingClientRect().height / 2 - 16
        $(".html5-loading").style.top = top + "px"; 
    }
}

adjustSprite()
window.onresize = adjustSprite;

function showLoadingSprite() {
    var c = $(".html5-loading").className
    $(".html5-loading").className = c.split("hid").join("")
}

function hideLoadingSprite() {
    if($(".html5-loading").className.indexOf("hid") !== -1) return;
    $(".html5-loading").className += " hid"
}

// hq / hd
var r = new XMLHttpRequest();
var hqEnabled = false;
r.open("GET", "/get_video_info?video_id=" + id)
r.send(null)
var formatMaps = {}
var stdUrl = ""
var hqUrl = false
r.addEventListener("load", function(e) {
    var fmtUrls = decodeURIComponent(
        r.responseText.split("fmt_url_map=")[1].split("&")[0]
    ).split(",")
    for(var fmt in fmtUrls) {
        fmt = fmtUrls[fmt]
        formatMaps[fmt.split("|")[0]] = fmt.split("|")[1]
    }
    function hqExists() {
        document.querySelector(".yt2009-hd").addEventListener("click", function() {
            toggleQuality("exp_hd")
        }, false)
        document.querySelector(".yt2009-hd").className = "btn hq-btn hd"
        document.body.className = "has-quality"
    }
    function addHq(url) {
        if(!url) return;
        hqUrl = url;
    }
    addHq(formatMaps["35"])
    addHq(formatMaps["22"])
    //addHq(formatMaps["37"])
    stdUrl = formatMaps["5"]
    if(hqUrl) {
        hqExists()
    }
}, false)
function toggleQuality() {
    showLoadingSprite()
	if(window.sabrBase) {
		hqEnabled = !hqEnabled
		window.sabrHd = !window.sabrHd
		if(window.sabrData.currentRequest) {
			try {
				window.sabrData.currentRequest.abort()
			}
			catch(error){}
		}
		if(sabrData.videoBuffer.updating) {
			try {sabrData.videoBuffer.abort()}catch(error){}
		}
		if(sabrData.audioBuffer.updating) {
			try {sabrData.audioBuffer.abort()}catch(error){}
		}
		try {
			sabrData.videoBuffer.remove(0,video.duration)
			sabrData.audioBuffer.remove(0,video.duration)
		}
		catch(error) {}
		requestSabr(
			Math.floor(video.currentTime * 1000), "FORCE"
		)
		var hqBtn = document.querySelector(".hq-btn")
		if(hqEnabled) {
			hqBtn.className += " active"
		} else {
			hqBtn.className = hqBtn.className.split("active").join("")
		}
		return;
	}
    if(!hqEnabled) {
        v.src = hqUrl;
        document.querySelector(".hq-btn").className += " active"
        hqEnabled = true
        v.play()
    } else {
        v.src = stdUrl;
        var c = document.querySelector(".hq-btn").className
        document.querySelector(".hq-btn").className = c.split("active").join("")
        hqEnabled = false
        v.play()
    }
}

// sabr support
function addToSabrQueue(data) {
	if(sabrData.addedSegments.indexOf(data.id) == -1
	|| video.currentTime <= 20) {
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
		sabrBase,
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
if(window.sabrBase) {
	var ms = new MediaSource();
    var vStream;
    var aStream;
    video.src = URL.createObjectURL(ms);

    sabrData = {
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
	window.sabrHd = false;
	
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
                    try{video.play()}catch(error){}
                }, 500)
            }
        }
    }, 250)
	
	// watch for new buffer fetches
    video.addEventListener("timeupdate", function() {
        if(video.currentTime > 120
        && !sabrData.videoBuffer.updating
        && !sabrData.audioBuffer.updating) {
            // don't keep much backwards buffer to not overfill
            try {
                sabrData.videoBuffer.remove(0, video.currentTime - 120)
                sabrData.audioBuffer.remove(0, video.currentTime - 120)
            }
            catch(error){console.log(error)}
        }

        if(sabrData.waitingSabrFetch || sabrData.timedCooldown) return;
        var c = video.currentTime;
        var arrayedRanges = []
        for (var k = 0; k < video.buffered.length; k++) {
            arrayedRanges.push({
                "start": video.buffered.start(k),
                "end": video.buffered.end(k)
            })
        }
        var currentRange = arrayedRanges.filter(function(s) {
            return (s.start <= c && s.end >= c)
        })[0]
        if(currentRange && ((currentRange.end - c) < sabrData.readAhead
        && (currentRange.end - c) > 0.1
        && !(video.duration - currentRange.end <= 0.3))
        && !sabrData.appendQueue[0]) {
            sabrData.sabrTimedCooldown = true;
            sabrData.waitingSabrFetch = true;
            requestSabr(Math.floor(currentRange.end * 1000), "TIMED")
            setTimeout(function() {
                sabrData.sabrTimedCooldown = false;
            }, 2000)
        }

        if(video.duration - video.currentTime <= 0.4) {
            var t = 0;
            while(t !== 3) {
                sabrData.fEnd = true;
				video.pause()
				console.log("end")
                t++
            }
        } else {
            sabrData.fEnd = false;
        }
    }, false)

    video.addEventListener("seeking", function(s) {
        var vc = video.currentTime
        var arrayedRanges = []
        for (var k = 0; k < video.buffered.length; k++) {
            arrayedRanges.push({
                "start": video.buffered.start(k),
                "end": video.buffered.end(k)
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
}