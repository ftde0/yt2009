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
    video.play()
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
r.addEventListener("load", function(e) {
    if(r.responseText.indexOf("exp_hd") !== -1) {
        // hd
        document.querySelector(".yt2009-hd")
        .addEventListener("click", function() {
            toggleQuality("exp_hd")
        }, false)
        document.querySelector(".yt2009-hd").className = "btn hq-btn hd"
        document.body.className = "has-quality"
    } else if(r.responseText.indexOf("get_480") !== -1) {
        // hq
        document.querySelector(".yt2009-hd")
        .addEventListener("click", function() {
            toggleQuality("get_480")
        }, false)
        document.querySelector(".yt2009-hd").className = "btn hq-btn"
        document.body.className = "has-quality"
    }
}, false)
function toggleQuality(endpoint) {
    showLoadingSprite()
    if(!hqEnabled) {
        v.src = "/" + endpoint + "?video_id=" + id;
        document.querySelector(".hq-btn").className += " active"
        hqEnabled = true
        v.play()
    } else {
        v.src = "/get_video?video_id=" + id + "/mp4";
        var c = document.querySelector(".hq-btn").className
        document.querySelector(".hq-btn").className = c.split("active").join("")
        hqEnabled = false
        v.play()
    }
    
}