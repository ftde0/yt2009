var mainElement = document;
var controlsFadeProgress = false;
var fadeControlsEnable = true;
var seekbarRemoveWidth = 215;
var fullscreenUnsupportedEnabled = false;
var player_fullscreen = false;
var lastMouseMovement = 0;
var annotationsTimeIndex = {}
var annotationsRemoveTime = {}
var annotationsEnabled = false;
var annotationsRedirect = false;
var captionsTimeIndex = {};
var captionsLangIndex = {};
var captionsEnabled = false;
var browserModernFeatures = false;

function initPlayer(parent, fullscreenEnabled) {
    mainElement = parent;

    // determine if we have a modern browser to use newer css stuff
    var ua = navigator.userAgent;
    var browserVersion = 1;
    if(ua.indexOf("Firefox/") !== -1) {
        browserVersion = parseInt(ua.split("Firefox/")[1].split(" ")[0])
    } else if(ua.indexOf("Chrome/") !== -1) {
        browserVersion = parseInt(ua.split("Chrome/")[1].split(" ")[0])
    }
    if(browserVersion >= 40) {
        browserModernFeatures = true;
    }

    // modern-exclusive
    if(browserModernFeatures) {
        $(".flashing-btn.play").className += " modern"
        $(".flashing-btn.pause").className += " modern"
    }

    if(fullscreenEnabled) {
        // fullscreen
        var fullscreen_btn = $(".video_controls .fullscreen");
        var fullscreen_anim_playing = false;

        // button
        fullscreen_btn.addEventListener("mouseover", function() {
            if(fullscreen_anim_playing || player_fullscreen) return;
            fullscreen_anim_playing = true;
            var anim_frame = 0;
            var anim = setInterval(function() {
                if(player_fullscreen) return;
                anim_frame++;
                fullscreen_btn.style.backgroundPosition
                = "0px -" + (anim_frame * 22) + "px"
                if(anim_frame * 22 == 220) {
                    clearInterval(anim);
                    fullscreen_anim_playing = false;
                }
            }, 40)
        }, false)

        fullscreen_btn.addEventListener("mouseout", function() {
            setTimeout(function() {
                if(player_fullscreen) return;
                fullscreen_btn.style.backgroundPosition = "0px 0px"
            }, 420)
        }, false)

        // the whole thing functioning
        // if an embed, only use requestFullscreen(),
        // otherwise try requestFullscreen() then do fullscreen-unsupported
        if(parent == document) {
            fullscreen_btn.addEventListener("click", function() {
                if(player_fullscreen) {
                    player_fullscreen = false;
                    fullscreen_btn.className = "fullscreen"
                    document.exitFullscreen();
                } else {
                    $(".embed-container").requestFullscreen();
                    fullscreen_btn.className = "fullscreen opened"
                    fullscreen_btn.style.backgroundPosition = ""
                    player_fullscreen = true;
                }
                
            }, false)
        } else {

            var player_overlay = $("#watch-this-vid");
            var player_element = $("#watch-this-vid #watch-player-div");
            var base = $("#baseDiv")
            fullscreen_btn.addEventListener("click", function() {
                if(player_fullscreen) {
                    player_fullscreen = false;
                    fullscreen_btn.className = "fullscreen"
                    try {
                        document.exitFullscreen()
                    }
                    catch(error) {
                        fullscreenUnsupportedEnabled = false;
                        base.className = "date-20090927 video-info"
                        player_overlay.className = "yt-rounded"
                        player_element.className = "flash-player"
                        document.body.style.overflow = "scroll"
                        player_overlay.style.height = ""
                        player_overlay.style.width = ""
                    }
                    adjustSeekbarWidth()
                } else {
                    player_fullscreen = true;
                    fullscreen_btn.className = "fullscreen opened"
                    fullscreen_btn.style.backgroundPosition = ""
                    try {
                        player_element.requestFullscreen();
                    }
                    catch(error) {
                        fullscreenUnsupportedEnabled = true;
                        base.className
                        = "date-20090927 video-info fullscreen-unsupported"
                        document.body.style.overflow = "hidden"
                        player_overlay.style.height
                        = (window.innerHeight) + "px"
                        player_overlay.style.width
                        = (window.innerWidth) + "px !important"
                        player_overlay.className
                        = "yt-rounded fullscreen-unsupported"
                        player_element.className
                        = "flash-player fullscreen-unsupported"
                    }
                    adjustSeekbarWidth()
                }
            }, false)
        }
        
    }

    if(parent == document) {
        // mouse out of the player
        var mousein = true;
        mainElement.addEventListener("mouseout", function(e) {
            var x = e.pageX || e.clientX;
            var y = e.pageY || e.clientY;
            if(!mousein
            || !fadeControlsEnable
            || videoEnded
            || controlsFadeProgress
            || (x >= 0 &&
               x <= window.innerWidth &&
               y >= 0 &&
               y <= window.innerHeight)) return;
            controlsFadeProgress = true;
            non_css_anim_remove($(".video_controls"), "bottom", 0, -23);
            setTimeout(function() {
                mousein = false;
                controlsFadeProgress = false;
                // revert fullscreen animation to 1st frame
                if(fullscreenEnabled) {
                    $(".video_controls .fullscreen")
                    .style.backgroundPosition = "0px 0px"
                }
            }, 400)

            if(volume_up) {
                volume_up = false;
                volume_popping = true;
                non_css_anim_remove(volume_panel, "bottom", 25, -64)
                setTimeout(function() {
                    volume_popping = false;
                }, 500)
                volume_panel_mousedown = false;
            }

            if(player_add_popout.style.bottom == "25px") {
                non_css_anim_remove(player_add_popout, "bottom", 25, -51)
            }
        }, false)

        // mouse on the player
        non_css_anim_add($(".video_controls"), "bottom", -23, 0);
        mainElement.addEventListener("mouseover", function() {
            lastMouseMovement = Math.floor(Date.now() / 1000)
            if(mousein || controlsFadeProgress || videoEnded) return;
            non_css_anim_add($(".video_controls"), "bottom", -23, 0);
            setTimeout(function() {
                controlsFadeProgress = false;
                mousein = true;
            }, 400)
        }, false)
    } else {
        // hide/show controls on mousein/mouseout
        var controlsFadeProgress = false;
        var videoControlsShown = true;
        $("#watch-player-div").addEventListener("mouseout", function(e) {
            var mouse_left = e.pageX || e.clientX;
            var mouse_top = e.pageY || e.clientY;
            if(controlsFadeProgress
            || !fadeControlsEnable
            || videoEnded
            || checkBounds($("#watch-player-div"), mouse_left, mouse_top))
            return;
            controlsFadeProgress = true;
            non_css_anim_remove($(".video_controls"), "bottom", 0, -23);
            setTimeout(function() {
                videoControlsShown = false;
                controlsFadeProgress = false;
                mousedown = false;

                // hide volume if it were to get glitched
                
                if(volume_up) {
                    volume_up = false;
                    volume_popping = false;
                    volume_panel_mousedown = false;
                    non_css_anim_remove(volume_panel, "bottom", 25, -64)
                }

                // player_additions
                if(player_add_popout.style.bottom == "25px") {
                    non_css_anim_remove(player_add_popout, "bottom", 25, -51)
                    $(".annotations-tooltip").className
                    = "annotations-tooltip player-tooltip hid"
                    $(".captions_popup").style.display = "none"
                }

                // revert fullscreen animation to 1st frame
                if(fullscreenEnabled) {
                    $(".video_controls .fullscreen")
                    .style.backgroundPosition = "0px 0px"
                }
            }, 250)
        }, false)



        $("#watch-player-div").addEventListener("mouseover", function() {
            lastMouseMovement = Math.floor(Date.now() / 1000)
            if(controlsFadeProgress
            || videoControlsShown
            || videoEnded) return;
            controlsFadeProgress = true;
            non_css_anim_add($(".video_controls"), "bottom", -23, 0);
            setTimeout(function() {
                controlsFadeProgress = false;
                videoControlsShown = true;
            }, 250)
        }, false)
    }
}

// sprawdzanie boundsów
function checkBounds(element, mouse_left, mouse_top) {
    var bounds = element.getBoundingClientRect()
    var y = window.scrollY
    if(mouse_left >= bounds.left &&
    mouse_left <= bounds.left + bounds.width &&
    mouse_top - y >= bounds.top &&
    mouse_top - y <= bounds.top + bounds.height) {
        return true;
    }
    return false;
}


// player
var upAnimationDebounce = false;
function non_css_anim_add(element, cssProperty, from, to) {
    if(upAnimationDebounce
    && element.className !== "volume_popout"
    || element.style[cssProperty] == to + "px") return;
    upAnimationDebounce = true;
    setTimeout(function() {
        upAnimationDebounce = false
    }, 200)
    element.style[cssProperty] = from + "px"
    var current = from;
    var x = setInterval(function() {
        current += 4;
        element.style[cssProperty] = current + "px"
        if(current >= to) {
            element.style[cssProperty] = to + "px"
            clearInterval(x);
        }
    }, 5)
}
function non_css_anim_remove(element, cssProperty, from, to) {
    if(element.style[cssProperty] == to + "px") return;
    element.style[cssProperty] = from + "px"
    upAnimationDebounce = false;
    var current = from;
    var x = setInterval(function() {
        current -= 4;
        element.style[cssProperty] = current + "px"
        if(current <= to) {
            clearInterval(x);
        }
    }, 5)
}
function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}
var video = $("video")

function video_show_play_btn() {
    $(".play_btn").style.display = "none"
    $(".pause_btn").style.display = "block"

    // embed: hide play button
    if(document.querySelector(".embed-play-btn")) {
        $(".embed-play-btn").style.display = "none"
    }
}

function video_play() {
    video.play();
}

function video_show_pause_btn() {
    $(".pause_btn").style.display = "none"
    $(".play_btn").style.display = "block"

    // play button for embeds
    if(document.querySelector(".embed-play-btn") && !video.ended) {
        $(".embed-play-btn").style.display = "block"
    }
}

function video_pause() {
    video.pause();
}

// play/pause
video.addEventListener("click", function() {
    if(!video.paused) {
        video_pause();
        flash_middle_btn("pause")
    } else {
        video_play();
        flash_middle_btn("play")
    }
}, false)

$(".play_btn").addEventListener("click", video_play, false)

$(".pause_btn").addEventListener("click", video_pause, false)

video.addEventListener("ended", function() {
    video_pause();
    showEndscreen()
}, false);

// external play/pause
video.addEventListener("pause", function() {
    video_show_pause_btn()
}, false)

video.addEventListener("play", function() {
    video_show_play_btn()
}, false)

// play/pause animation
function flash_middle_btn(buttonType) {
    if(mainElement == document) return;
    var btn = $(".flashing-btn." + buttonType)
    btn.className = btn.className.split(" hid").join("")
    btn.style.opacity = 0.7;
    setTimeout(function() {
        btn.style.width = "100px"
        btn.style.height = "100px"
        btn.style.opacity = 0;
    }, 10)
    setTimeout(function() {
        btn.className += " hid"
        btn.style.width = "0px"
        btn.style.height = "0px"
        btn.style.opacity = 0.7;
    }, 550)
}



// progress bar
var seekbar = $(".video_controls .seek");
var elapsedbar = $(".video_controls .elapsed");
var loadedbar = $(".video_controls .loaded");

// going forward within the video
function timeUpdate() {
    elapsedbar.style.width = (video.currentTime / video.duration) * 100 + "%"
    if(video.buffered && !isNaN(video.duration)) {
        try {
            loadedbar.style.width = (video.buffered.end(0) / video.duration)
                                    * 100 + "%"
        }
        catch(error) {}
    }

    if(isNaN(video.duration)) return;
    $(".video_controls .timer").innerHTML =
                                seconds_to_time(Math.floor(video.currentTime))
                                + " / "
                                + seconds_to_time(Math.floor(video.duration))

    // check if all annotations that were supposed to get removed did get removed
    var c = document.querySelectorAll(".annotation, svg")
    for(var sel in c) {
        try {
            var endTime = parseFloat(c[sel].getAttribute("to"))
            var startTime = parseFloat(c[sel].getAttribute("from"))
            if(video.currentTime >= endTime) {
                c[sel].parentNode.removeChild(c[sel])
            }

            if(startTime - video.currentTime >= 10) {
                // remove an annotation that somehow got into the past
                c[sel].parentNode.removeChild(c[sel])
            }
        }
        catch(error) {}
    }
    
    // and the same with adding
    for(var i in annotationsTimeIndex) {
        if(parseFloat(i) <= video.currentTime
        && annotationsTimeIndex[i].toTime >= video.currentTime
        && annotationsEnabled) {
            var annotation = annotationsTimeIndex[i]

            if(!document.querySelector(
                "[from=\"" + annotation.fromTime.toFixed(1) + "\"]"
            )) {
                annotationRender(annotation)
            }
        }
    }

    // hide loading sprite if needed (i mean, we're progressing with the video)
    if(document.querySelector(".html5-loading")
                .className.indexOf("hid") == -1) {
        $(".html5-loading").className += " hid"
    }
}
video.addEventListener("timeupdate", timeUpdate, false)

var progressContainer = $(".progress_container")
// set the width of the seekbar
// use calc() for modern browsers, the classic pixel method for older ones
function adjustSeekbarWidth() {
    timeUpdate();
    if(browserModernFeatures) {
        $(".player_auto_css").innerHTML =
                                    ".progress_container {width: calc(100% - "
                                    + seekbarRemoveWidth + "px);}"
    } else {
        var videoWidth = video.getBoundingClientRect().width
                        - seekbarRemoveWidth
        //progressContainer.style.width = videoWidth + "px"
        $(".player_auto_css").innerHTML = ".progress_container {width: "
                                        + videoWidth
                                        + "px;}"
    }
    
    // loading gif
    if(document.querySelector(".html5-loading")) {
        // -16 from half the gif size (32x32)
        $(".html5-loading").style.left = video.getBoundingClientRect().width / 2
                                            - 16 + "px"
        $(".html5-loading").style.top = video.getBoundingClientRect().height / 2
                                            - 16 + "px"; 
    }


    // fullscreen-unsupported
    if(fullscreenUnsupportedEnabled) {
        var player_overlay = $("#watch-this-vid")
        player_overlay.style.height = (window.innerHeight) + "px"
        player_overlay.style.width = (window.innerWidth) + "px !important"
    }


    // update css measurements to center the embed play btn
    var embedPlayX = video.getBoundingClientRect().width / 2 - 50;
    var embedPlayY = video.getBoundingClientRect().height / 2 - 37.5;
    $(".player_auto_css").innerHTML += ".embed-play-btn {left: "
                                        + embedPlayX + "px;top: " 
                                        + embedPlayY + "px;}"
}

window.addEventListener("resize", adjustSeekbarWidth, false);
video.addEventListener("resize", adjustSeekbarWidth, false);
adjustSeekbarWidth();

// seconds to time (300 -> 5:00)
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


// scrolling through the video
var mousedown = false;
// someone thought that e.button on mousemove should return 0 regardless if
// a button is pressed or not

function mousedownf() {
    mousedown = true;
}

function mouseup() {
    mousedown = false;
}

function videoSeek(e) {
    if(mousedown) {
        var offsetX = e.pageX - seekbar.getBoundingClientRect().left;
        video.currentTime = (offsetX / seekbar.getBoundingClientRect().width)
                            * video.duration
    }
}

seekbar.addEventListener("mousemove", videoSeek, false)
elapsedbar.addEventListener("mousemove", videoSeek, false)
loadedbar.addEventListener("mousemove", videoSeek, false)
$(".video_controls .seek_btn").addEventListener("mousemove", videoSeek, false)

seekbar.addEventListener("mousedown", mousedownf, false)
elapsedbar.addEventListener("mousedown", mousedownf, false)
loadedbar.addEventListener("mousedown", mousedownf, false)
$(".video_controls .seek_btn").addEventListener("mousedown", mousedownf, false)

seekbar.addEventListener("mouseup", mouseup, false)
elapsedbar.addEventListener("mouseup", mouseup, false)
loadedbar.addEventListener("mousedown", mousedownf, false)
$(".video_controls .seek_btn").addEventListener("mouseup", mouseup, false)

// normal click
function click_seek(e) {
    mousedown = true;
    videoSeek(e)
    mousedown = false;
}

seekbar.addEventListener("click", click_seek, false)
elapsedbar.addEventListener("click", click_seek, false)
loadedbar.addEventListener("click", click_seek, false)

// volume

// hovering over the volume icon show (using an "animation" .volume_popout
video.volume = 1;
var volume_btn = $(".video_controls .volume_container")
var volume_panel = $(".volume_popout")
var volume_head = $(".volume_popout .volume_head")
var volume_popping = false;
var volume_up = false;

volume_btn.addEventListener("mouseover", function() {
    if(volume_up || volume_popping) return;
    volume_popping = true;
    volume_up = true;
    non_css_anim_add(volume_panel, "bottom", -64, 25);
    setTimeout(function() {
        volume_popping = false;
    }, 500)
    try {
        $(".video_controls .fullscreen").style.backgroundPosition = "0px 0px"
    }
    catch(error) {}
}, false)

// show the animation again when mouse out of the volume
// (unless that fired because the user hovered over the volume head,
// which we check by bounds)
volume_panel.addEventListener("mouseout", function(e) {
    var mouse_left = e.pageX || e.clientX;
    var mouse_top = e.pageY || e.clientY;
    if(volume_popping
    || checkBounds(volume_panel, mouse_left, mouse_top)) return;
    volume_up = false;
    volume_popping = true;
    non_css_anim_remove(volume_panel, "bottom", 25, -64)
    setTimeout(function() {
        volume_popping = false;
    }, 500)
    volume_panel_mousedown = false;

    // save the volume
    document.cookie = "volume=" 
                    + video.volume 
                    + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; SameSite=Lax"
}, false)

// check if the cursor went to the left (.timer)
$(".timer").addEventListener("mouseover", function() {
    if(parseInt(volume_panel.style.bottom) >= 10) {
        volume_up = false;
        volume_popping = true;
        non_css_anim_remove(volume_panel, "bottom", 25, -64)
        setTimeout(function() {
            volume_popping = false;
        }, 500)
        volume_panel_mousedown = false;
    }
}, false)

// or the right (fullscreen)
// or just in case .player_additions
if(document.querySelector(".fullscreen")) {
    $(".fullscreen").addEventListener("mouseover", function() {
        volume_up = false;
        volume_popping = true;
        if(parseInt(volume_panel.style.bottom) >= -63) {
            non_css_anim_remove(volume_panel, "bottom", 25, -64)
        }
        setTimeout(function() {
            volume_popping = false;
        }, 500)
        volume_panel_mousedown = false;

        non_css_anim_remove(player_add_popout, "bottom", 25, -51)
    }, false)
}

// volume control - hook up to .volume_panel and move there
// doesn't require the user to hold the volume head at all times
var volume_panel_mousedown = false;

volume_panel.addEventListener("mousedown", function() {
    volume_panel_mousedown = true;
}, false)
volume_panel.addEventListener("mouseup", function() {
    volume_panel_mousedown = false;
}, false)

volume_panel.addEventListener("mousemove", function(e) {
    var mouseY = e.pageY
                - window.scrollY 
                - volume_panel.getBoundingClientRect().top;
    if(!volume_panel_mousedown) return;
    if(mouseY <= 10 || mouseY >= 54) return;

    volume_head.style.top = mouseY - 5 + "px";
    video.volume = Math.max(1 - ((mouseY - 10) / 40), 0)

    if(mouseY >= 55) {
        video.volume = 0;
    }

    // unmute
    if(muted) {
        $(".volume_button").className = "volume_button"
    }

    // volume icon width based on volume
    $(".volume_button").style.width = (16 + (16 * video.volume)) + "px"
}, false)

// auto-set last saved volume
var volume = 1;
document.cookie.split(";").forEach(function(cookie) {
    if(cookie.indexOf("volume=") !== -1) {
        volume = parseFloat(cookie.trimLeft().replace("volume=", ""))
        volume_head.style.top = (40 - (volume * 40) + 5) + "px";
        if(volume == 0) {
            volume_head.style.top = "48px"
        }
        video.volume = volume;
        $(".volume_button").style.width = (16 + (16 * video.volume)) + "px"
    }
})

// mute after volume button click
// save the last volume before the mute so the volume is the same after unmute
var muted = false;
volume_btn.addEventListener("click", function() {
    muted = !muted;
    if(muted) {
        // mute
        volume = video.volume;

        volume_head.style.top = "49px"
        video.volume = 0;
        $(".volume_button").style.width = "29px"
        $(".volume_button").className += " muted"
    } else {
        // unmute
        $(".volume_button").className = "volume_button"
        video.volume = volume;
        volume_head.style.top = 50 - (volume * 50) + "px";
        video.volume = volume;
        $(".volume_button").style.width = (16 + (10 * video.volume)) + "px"
    }
}, false)

// timeupdate emit once a bit of the video is loaded
video.addEventListener("canplay", function() {
    setTimeout(function() {
        timeUpdate();
    }, 100)
}, false)
if(video.readyState >= 3) {
    timeUpdate();
}


// endscreen
var videoEnded = false;
var openSectionIndex = 0;
function showEndscreen() {
    videoEnded = true;
    video.className += " showing-endscreen"
    $(".endscreen").className = "endscreen"
    non_css_anim_remove($(".video_controls"), "bottom", 0, -23);
    if(volume_up) {
        volume_up = false;
        non_css_anim_remove(volume_panel, "bottom", 25, -64)
    }

    setTimeout(function() {
        if(!document.querySelectorAll(".endscreen-section")
            [endscreen_section_index]) return;
        var c = document.querySelectorAll(".endscreen-section")
                [endscreen_section_index]
                .querySelectorAll(".endscreen-video-title")
        for(var sel in c) {
            try {c[sel].style.maxWidth = "300px"}
            catch(error) {}
        }
    }, 100);

    var timeout_switch = setTimeout(function() {
        if(timeouts.indexOf(timeout_switch) !== -1) {
            endscreen_section_change(1)
        }
    }, 7500)
    timeouts.push(timeout_switch)
}

function videoNav(id) {
    location.href = "/watch?v=" + id
}

function videoReplay() {
    videoEnded = false;
    video.className = video.className.replace(" showing-endscreen", "")
    $(".endscreen").className = "endscreen hid"
    video.currentTime = 0;
    video.play()

    non_css_anim_add($(".video_controls"), "bottom", -23, 0);
    setTimeout(function() {
        mousein = true;
    }, 400)
}

var endscreen_section_index = 0;
var timeouts = []

function endscreen_section_change(value) {
    clearEndscreenTimeouts();
    // initial
    if(!document.querySelectorAll(".endscreen-section")
        [endscreen_section_index]) return;
    var currentSection = document.querySelectorAll(".endscreen-section")
                        [endscreen_section_index]
    endscreen_section_index += value;
    if(!document.querySelectorAll(".endscreen-section")
        [endscreen_section_index]) {
        endscreen_section_index = 0;
    }
    var newSection = document.querySelectorAll(".endscreen-section")
                    [endscreen_section_index]

    // w tle zwiń tytuły z newSection aby rozwinąć je przy użytkowniku
    // wrap back the newSection titles
    // to unwrap them in front of the user later
    var s = newSection.querySelectorAll(".endscreen-video-title")
    for(var sel in s) {
        try {s[sel].style.maxWidth = "0px"}
        catch(error) {}
    }

    // ukryj poprzednią sekcję, pokaż nową
    // hide the previous section, show the new one
    currentSection.style.opacity = "0";
    setTimeout(function() {
        currentSection.className = "endscreen-section hid"
        newSection.className = "endscreen-section"
    }, 1000)
    setTimeout(function() {
        newSection.style.opacity = "1"
    }, 1100)
    setTimeout(function() {
        for(var sel in s) {
            try {s[sel].style.maxWidth = "300px"}
            catch(error) {}
        }
    }, 1750)

    // go 1 section next after 7500ms
    var timeout_switch = setTimeout(function() {
        if(timeouts.indexOf(timeout_switch) !== -1) {
            endscreen_section_change(1)
        }
    }, 7500)
    timeouts.push(timeout_switch)
}

// clear scheduled timeouts
function clearEndscreenTimeouts() {
    timeouts.forEach(function(timeout) {
        clearTimeout(timeout)
    })
    timeouts = []
}

// player_additions

var player_add_btn = $(".player_additions")
var player_add_popout = $(".player_additions_popout")
var player_add_popout_debounce = false;
// najeżdżanie na dodatki
player_add_btn.addEventListener("mouseover", function() {
    if(player_add_popout_debounce) return;
    non_css_anim_add(player_add_popout, "bottom", -51, 25)
    player_add_popout_debounce = true;
    setTimeout(function() {
        player_add_popout_debounce = false;
    }, 400)
}, false)

// mouse out of the additions
player_add_popout.addEventListener("mouseout", function(e) {
    var mouse_left = e.pageX || e.clientX;
    var mouse_top = e.pageY || e.clientY;
    if(player_add_popout_debounce
    || checkBounds(player_add_popout, mouse_left, mouse_top)
    || (checkBounds($(".captions_popup"), mouse_left, mouse_top)
    && $(".captions_popup").style.display == "block")) return;
    $(".captions_popup").style.display = "none"
    player_add_popout_debounce = true;
    non_css_anim_remove(player_add_popout, "bottom", 25, -51)
    setTimeout(function() {
        player_add_popout_debounce = false;
    }, 400)
}, false)



var seekMoveDebounce = false
var seekbarElements = $(".seek, .elapsed, .loaded, .seek_btn")
for(var s in seekbarElements) {
    if(seekbarElements[s].className) {

        // show the time popup after seekbar hover
        seekbarElements[s].addEventListener("mousemove", function(e) {
            if(seekMoveDebounce) return;
            seekMoveDebounce = true;
            setTimeout(function() {
                seekMoveDebounce = false;
            }, 25)
            
            var offsetX = e.pageX || e.clientX
            var offsetY = $(".seek").getBoundingClientRect().top - 31

            // if someone asks me why 16 i'll tell them idk but it works
            if(mainElement !== document) {
                offsetX -= mainElement.getBoundingClientRect().left + 16
                offsetY -= mainElement.getBoundingClientRect().top

            } else {
                offsetX -= 16
            }
        
            $(".seek_time").className = "seek_time"
            $(".seek_time").style.top = offsetY + "px"
            $(".seek_time").style.left = offsetX + "px"
            
            // time to innerHTML
            var time_hovered = (
                (e.pageX - seekbar.getBoundingClientRect().left)
                / seekbar.getBoundingClientRect().width
            ) * video.duration
            time_hovered = seconds_to_time(Math.floor(time_hovered))
            if(time_hovered.indexOf("-") == 0) {
                time_hovered = "0:00"
            }
            $(".seek_time_text").innerHTML = time_hovered
        }, false)


        // hide the time popup
        seekbarElements[s].addEventListener("mouseout", function(e) {
            $(".seek_time").className = "seek_time hid"
        }, false)
    }
}

// adnotacje/annotations
function annotationRender(annotation) {
    if(document.querySelector(
        "[from=\"" + annotation.fromTime.toFixed(1) + "\"]"
    )) return;
    var element = document.createElement("div")
    var container = mainElement;
    if(mainElement == document) {
        $(".embed-container").appendChild(element)
        container = $(".embed-container")
    } else {
        mainElement.appendChild(element)
    }
    

    // setting css for our annotation element
    element.className = "annotation"
    element.setAttribute("from", annotation.fromTime.toFixed(1))
    element.setAttribute("to", annotation.toTime.toFixed(1))
    var bgColor = "rgba(255, 255, 255, 0.7)"
    if(annotation.bgColor) {
        bgColor = annotation.bgColor.legacy;
        if(browserModernFeatures) {
            bgColor = annotation.bgColor.modern;
        }
    }
    element.style.background = bgColor
    element.style.color = annotation.textColor || "rgb(0, 0, 0)"
    element.style.fontSize = (Math.floor(annotation.textSize * 5) || 14) + "px"
    element.style.left = annotation.leftPercent + "%"
    element.style.top = annotation.topPercent + "%"
    if(browserModernFeatures) {
        element.style.width = "calc(" + annotation.widthPercent + "% - 14px)"
    } else {
        element.style.width = (
            video.getBoundingClientRect().width / 100
            * annotation.widthPercent - 14
        ) + "px"
    }
    element.style.height = annotation.heightPercent + "%"

    // targetUrl to open a URL when clicked
    if(annotation.targetUrl) {
        element.style.zIndex = 2;
        element.style.cursor = "pointer"
        element.addEventListener("click", function() {
            video_pause()
            var url = annotation.targetUrl;
            if(annotationsRedirect && url.indexOf("youtube.com") !== -1) {
                url = location.protocol + "//"
                    + location.host
                    + url.split("youtube.com")[1].split("&amp;").join("&")
            }
            window.open(url);
        }, false)
    }

    // annotation content
    switch(annotation.style) {
        // standard text
        case "popup":
        case "speech":
        case "anchored": {
            element.innerHTML = "<span>"
                            + annotation.text.split("\n").join("<br>")
                            + "</span>"
            element.style.height = ""
            var bounds = video.getBoundingClientRect()
            var mainBounds = {}
            try {
                mainBounds = mainElement.getBoundingClientRect()
            }
            catch(error) {mainBounds = document.body.getBoundingClientRect();}

            // calculate text size
            // rewritten based on the original swf
            function percentsToPixelsX(i, w) {
                return Math.round(w / 100 * i)
            }
            var text_size_ratio = 4 / 3;
            var text_size_prec = 2.708;
            var s = text_size_ratio * (bounds.height / bounds.width)
            var textSize = percentsToPixelsX(text_size_prec * s, bounds.width)
            element.style.fontSize = textSize + "px"

            // speech-specific things
            if(annotation.style == "speech") {
                element.className += " speech"
                if(browserModernFeatures) {
                    element.style.width = "calc("
                                        + annotation.widthPercent
                                        + "% - 26px)"
                } else {
                    element.style.width = (bounds.width / 100
                                        * annotation.widthPercent - 26) + "px"
                }

                // speech tip
                // it takes quite a bit of work because we only have 1 point
                // (speechPointX / sx, speechPointY / sy) to go from

                // coordinate calculation
                var speechPoints = bubbleSpecs(
                    parseFloat(annotation.leftPercent),
                    parseFloat(annotation.topPercent),
                    parseFloat(element.getBoundingClientRect().width
                            / bounds.width * 100),
                    parseFloat(element.getBoundingClientRect().height
                            / bounds.height * 100),
                    parseFloat(annotation.speechPointX),
                    parseFloat(annotation.speechPointY),
                    [2, 2, 2, 2],
                    16
                )

                var start = [
                    speechPoints.startX,
                    (bounds.height / 100 * speechPoints.startY - 25)
                ];
                var end = [
                    speechPoints.endX,
                    (bounds.height / 100 * speechPoints.endY - 25)
                ]
                var endPoint = [
                    parseFloat(annotation.speechPointX),
                    (bounds.height / 100
                    * parseFloat(annotation.speechPointY) - 25)
                ]

                var relativeStart = [
                    Math.min(start[0], end[0], endPoint[0]),
                    Math.min(start[1], end[1], endPoint[1])
                ];
                var svgViewbox = [
                    bounds.width / 100 * Math.abs(end[0] - relativeStart[0]),
                    Math.abs(endPoint[1] - relativeStart[1])
                ]
                var relativePoints = [
                    Math.floor(bounds.width / 100
                            * Math.floor(start[0] - relativeStart[0]))
                            + "," + Math.floor(start[1] - relativeStart[1]),
                    Math.floor(bounds.width / 100
                            * Math.floor(end[0] - relativeStart[0]))
                            + "," + Math.floor(end[1] - relativeStart[1]),
                    Math.floor(endPoint[0] - relativeStart[0])
                                + ","
                                + Math.floor(endPoint[1] - relativeStart[1])
                ]
                
                // tip svg element
                var tip = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                )
                tip.setAttribute("from", annotation.fromTime.toFixed(1))
                tip.setAttribute("to", parseFloat(
                    annotation.toTime.toFixed(1) - 0.1).toFixed(1)
                )
                tip.className = "speech-point"
                tip.style.position = "absolute"
                tip.style.left = relativeStart[0] + "%"
                tip.style.top = relativeStart[1] + "px"
                tip.style.width = (svgViewbox[0] / bounds.width) * 100 + "%"
                tip.style.height = Math.floor(
                    parseFloat(relativePoints[2].split(",")[1])
                                / mainBounds.height * 100
                ) + "%"
                tip.setAttribute("viewBox", "0 0 "
                                            + Math.floor(svgViewbox[0])
                                            + " " + Math.floor(svgViewbox[1]))
                mainElement.appendChild(tip)
                
                var path = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                )
                path.setAttributeNS(null, "fill", annotation.bgColor
                                                ? annotation.bgColor.legacy 
                                                : "rgba(255, 255, 255, 0.7)")
                path.setAttributeNS(null, "d", "M "
                                            + relativePoints[0].toString()
                                            + " L " + relativePoints[1]
                                                    .toString()
                                            + " L " + relativePoints[2]
                                                    .toString() + " Z")
                tip.appendChild(path)

                // correct tip overflowing into the annotation itself
                setTimeout(function() {
                    if(speechPoints.direction == "top"
                    || speechPoints.direction == "bottom") {
                        var annotationBounds = element.getBoundingClientRect()
                        switch(speechPoints.direction) {
                            case "bottom": {
                                tip.style.top = annotationBounds.top
                                            + annotationBounds.height
                                            - 1 - mainBounds.top + "px"
                                break;
                            }
                            case "top": {
                                tip.style.top = annotationBounds.top
                                            - annotationBounds.height
                                            - 1 - mainBounds.top + "px"
                                break;
                            }
                        }
                    }
                }, 10)
            }

            // set proper min-height
            var paddingY = parseInt(
                getComputedStyle(element, null).paddingTop
            ) * 2;
            var height = Math.round(
                (bounds.height / 100)
                * parseFloat(annotation.heightPercent)
                - paddingY
            )
            element.style.minHeight = height + "px"
            break;
        }
        // empty highlight
        case "highlight": {
            element.className += " highlight"
            if(annotation.text) {
                element.innerHTML = "<span>" + annotation.text + "</span>"
            }
            break;
        }
    }

    // fix top without calc (if it's not overflowing to the top)
    if(!fadeControlsEnable
    && !browserModernFeatures
    && annotation.topPercent >= 5) {
        var top = element.getBoundingClientRect().top
                - container.getBoundingClientRect().top;
        top -= 20;
        element.style.top = top + "px"
    } else if(!fadeControlsEnable
            && browserModernFeatures
            && annotation.topPercent >= 5) {
        // use calc
        element.style.top = "calc(" + annotation.topPercent + "% - 25px)"
    }

    // fix overflowing into controls with no_controls_fade
    var elementTop = element.getBoundingClientRect().top
                    + element.getBoundingClientRect().height
    var controlsTop = $(".video_controls").getBoundingClientRect().top
    if(!fadeControlsEnable && elementTop >= controlsTop) {
        var overflow = elementTop - controlsTop;
        var top = element.getBoundingClientRect().top
                - container.getBoundingClientRect().top;
        top -= overflow
        if(top <= 0) {
            top = 0
        }
        element.style.top = top + "px"
    }

    // remove later mark
    annotationsRemoveTime[annotation.toTime.toFixed(1)] = element


    // gradient for older browsers
    if(!browserModernFeatures) {
        var gradient = document.createElement("span")
        gradient.className = "annotation-gradient"
        element.appendChild(gradient)
    }
}

// annotation functions start, ported from swf
// annotation speech: bubble point direction
// please let me know if there is a better way of doing this nowadays
function bubbleDirection(x, y, width, height, sx, sy) {
    if(sx < x) {
        if(sy < y) {
            return x - sx <= y - sy ? "top" : "left";
        }
        if(sy > y + height) {
            return x - sx <= sy - (y + height) ? "bottom" : "left";
        }
        return "left";
    }
    if(sx > x + width) {
        if(sy < y) {
            return sx - (x + width) <= y - sy ? "top" : "right";
        }
        if(sy > y + height) {
            return sx - (x + width) <= sy - (y + height) ? "bottom" : "right";
        }
        return "right";
    }
    if(sy < y) {
        return "top";
    }
    if(sy > y + height) {
        return "bottom";
    }
}

// speech: bubble specs - ported over from flash.
// don't ask me what's going on here, I don't know either.
function bubbleSpecs(x, y, width, height, sx, sy, radii, gap) {
    var direction = bubbleDirection(x, y, width, height, sx, sy);
    var g = gap / 2;
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    switch(direction) {
       case "top":
           var _loc16_ = 1 / 4 * width;
           if(sx < x + width / 2) {
               startX = x + Math.max(_loc16_ - g, radii[0]);
               endX = Math.min(startX + gap,x + width - radii[1]);
           } else {
               endX = x + width - Math.max(_loc16_ - g, radii[1]);
               startX = Math.max(endX - gap,x + radii[0]);
           }
           endY = null;
           startY = endY = y;
           break;
       case "bottom":
           var _loc17_ = 1 / 4 * width;
           if(sx < x + width / 2) {
               startX = x + Math.max(_loc17_ - g, radii[3]);
               endX = Math.min(startX + gap,x + width - radii[2]);
           } else {
               endX = x + width - Math.max(_loc17_ - g, radii[2]);
               startX = Math.max(endX - gap,x + radii[3]);
           }
           startY = endY = y + height;
           break;
       case "left":
           var _loc18_ = 1 / 4 * height;
           if(sy < y + height / 2) {
               startY = y + Math.max(_loc18_ - g, radii[0]);
               endY = Math.min(startY + gap,y + height - radii[3]);
           } else {
             endY = y + height - Math.max(_loc18_ - g, radii[3]);
               startY = Math.max(endY - gap,y + radii[0]);
           }
           startX = endX = x;
           break;
       case "right":
           var _loc19_ = 1 / 4 * height;
           if(sy < y + height / 2) {
               startY = y + Math.max(_loc19_ - g, radii[1]);
               endY = Math.min(startY + gap,y + height - radii[2]);
           } else {
               endY = y + height - Math.max(_loc19_ - g, radii[2]);
               startY = Math.max(endY - gap,y + radii[1]);
           }
           startX = endX = x + width;
           break;
    }

    if(direction == "bottom" || direction == "top") {
        var TARGET_W = 2.5;
        var av = (startX + endX) / 2;
        startX = av - (TARGET_W / 2);
        endX = av + (TARGET_W / 2);
    }

    if(direction == "left" || direction == "right") {
        var TARGET_H = 2.5;
        var av = (startY + endY) / 2;
        startY = av - (TARGET_H / 2);
        endY = av + (TARGET_H / 2)
    }
    
    return {direction: direction,
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY};
}

// annotation functions end

var annotationsSwitch = $(".player_additions_popout .annotations")

function annotationsMain() {
    annotationsEnabled = !annotationsEnabled;

    if(annotationsEnabled) {
        // set z-index for controls to prevent stuff like
        // volume popout being covered by annotations
        $(".video_controls").style.zIndex = 4;
        $(".player_additions_popout").style.zIndex = 3;
        $(".volume_popout").style.zIndex = 3;
        $(".seek_time").style.zIndex = 5;
        $(".endscreen").style.zIndex = 5;

        // show loading tooltip
        /*$(".annotations-tooltip").className = "annotations-tooltip player-tooltip"
        $(".annotations-tooltip .main-text").innerHTML = "Loading..."*/

        // request
        var r = new XMLHttpRequest();
        r.open("GET", "/json_annotations")
        r.setRequestHeader("source", location.href)
        r.send(null)
        r.addEventListener("load", function(e) {
            // proper icon
            $(".player_additions_popout .annotations").className = "annotations"
            // index the received annotations
            // for easier checking based on start time
            var annotations = JSON.parse(r.responseText)
            annotations.forEach(function(annotation) {
                if(!annotation.fromTime) return;
                annotationsTimeIndex[annotation.fromTime.toFixed(1)]
                                                        = annotation
            })

            // interval for annotations checking
            // (timeUpdate doesn't fire quick enough)
            var annotationsInterval = setInterval(function() {
                // if annotations are turned off, don't proceed
                if(!annotationsEnabled) {
                    clearInterval(annotationsInterval)
                    return;
                }

                // adding new ones
                if(annotationsEnabled
                && (annotationsTimeIndex[video.currentTime.toFixed(1)])) {
                    var annotation = annotationsTimeIndex
                                        [video.currentTime.toFixed(1)]
                    annotationRender(annotation)
                }

                // removing existing annotations on their correct time
                if(annotationsEnabled
                && annotationsRemoveTime[video.currentTime.toFixed(1)]) {
                    var element = annotationsRemoveTime
                                    [video.currentTime.toFixed(1)]
                    try {
                        element.parentNode.removeChild(element)
                    }catch(error) {}
                }
            }, 100)
        }, false)
    } else {
        // turned off annotations, cleanup
        $(".player_additions_popout .annotations")
        .className = "annotations none"
        var s = mainElement.querySelectorAll(".annotation, .speech-point")
        for(var sel in s) {
            try {s[sel].parentNode.removeChild(s[sel])}
            catch(error) {}
        }
    }
}
annotationsSwitch.addEventListener("click", annotationsMain, false)

// captions
var captionsSwitch = $(".player_additions_popout .cc")
var ccListLoaded = false;

// main function to fetch available caption languages
function captionsMain() {
    var videoId = ""
    if(location.href.indexOf("v=") !== -1) {
        videoId = location.href.split("v=")[1].split("#")[0].split("&")[0]
    } else if(location.href.indexOf("embed/") !== -1) {
        videoId = location.href.split("embed/")[1].split("?")[0].split("#")[0]
    }
    captionsEnabled = !captionsEnabled
    if(captionsEnabled) {
        // fetch captions list
        var r = new XMLHttpRequest();
        r.open("GET", "/timedtext?v=" + videoId + "&type=list&json=1")
        r.setRequestHeader("is-embed", location.href.indexOf("embed") !== -1)
        r.send(null)
        r.addEventListener("load", function(e) {
            var langs = JSON.parse(r.responseText)
            captionsLangIndex = langs;

            // load english captions as default
            if(langs["en"]) {
                loadCaptions(videoId, "en")
                placeCaptions();
            } else {
                var i = 0;
                var firstLang = ""
                for(var h in langs) {
                    if(i == 0) {
                        firstLang = h;
                    }
                    i++;
                }
                if(firstLang) {
                    loadCaptions(videoId, firstLang)
                    placeCaptions();
                }
            }
        }, false)
    } else {
        // show ui disabled and remove previous captions
        $(".player_additions_popout .cc").className += " none"
        var s = document.querySelectorAll(".caption")
        for(var e in s) {
            try {
                s[e].parentNode.removeChild(s[e])
            }
            catch(error) {}
        }
    }
}

// place all captions into menu
function placeCaptions() {
    var videoId = ""
    if(location.href.indexOf("v=") !== -1) {
        videoId = location.href.split("v=")[1].split("#")[0].split("&")[0]
    } else if(location.href.indexOf("embed/") !== -1) {
        videoId = location.href.split("embed/")[1].split("?")[0].split("#")[0]
    }
    var s = $(".captions_selection")
    var index = 0;
    for(var lang in captionsLangIndex) {
        if(document.querySelector("li[lang=\"" + lang + "\"]")) return;
        var li = document.createElement("li")
        li.setAttribute("lang", lang)
        var name = captionsLangIndex[lang].name;
        if(name.length > 17) {
            name = name.substring(0, 16) + "..."
        }
        li.innerHTML = "<span class=\"circle\"></span>"
                     + "<p>" + name + "</p>";
        li.setAttribute("onclick", "loadCaptions(\"" + videoId
                                    + "\", \"" + lang + "\")")
        if(lang == "en" || index == 0) {
            li.querySelector(".circle").className += " selected"
        }
        s.appendChild(li)
        index++;
    }
}

// fetch captions and place them with interval
var currentCaptionInterval;
function loadCaptions(id, language) {
    try {
        // cleanup from previous captions
        clearInterval(currentCaptionInterval);
        var currentCaptions = mainElement.querySelectorAll(".caption");
        for(var c in currentCaptions) {
            try {
                currentCaptions[c].parentNode.removeChild(currentCaptions[c])
            }
            catch(error) {}
        }
        try {
            if(mainElement.querySelector(".circle.selected")) {
                mainElement.querySelector(".circle.selected")
                           .className = "circle"
                mainElement.querySelector("[lang=\"" + language + "\"] .circle")
                           .className += " selected"
            }
        }
        catch(error) {}
    }
    catch(error) {}
    ccListLoaded = true;
    var m = mainElement;
    if(mainElement == document) {
        m = $(".embed-container")
    }
    var r = new XMLHttpRequest();
    r.open("GET", "/timedtext?v=" + id + "&type=track&lang=" + language + "&json=1")
    r.setRequestHeader("is-embed", location.href.indexOf("embed") !== -1)
    r.send(null)
    r.addEventListener("load", function(e) {
        // captions loaded, proper icon
        $(".player_additions_popout .cc").className = "cc"

        // show language name on top left
        var langElement = document.createElement("p")
        langElement.className = "caption topleft"
        langElement.innerHTML = captionsLangIndex[language].name;
        langElement.style.fontSize = m.getBoundingClientRect()
                                    .width / 40 + "px";
        m.appendChild(langElement);
        setTimeout(function() {
            langElement.parentNode.removeChild(langElement)
        }, 3000)

        // renderer main
        var cc = JSON.parse(r.responseText)
        captionsTimeIndex = cc;

        currentCaptionInterval = setInterval(function() {
            if(!captionsEnabled) {
                clearInterval(currentCaptionInterval)
                return;
            }

            var videoTime = Math.floor(video.currentTime * 10) / 10;
            for(var c in cc) {
                if(cc[c].start <= videoTime
                && cc[c].end >= videoTime) {
                    renderCaption(cc[c])
                }
            }
        }, 50)
    }, false)
}

// render caption
function renderCaption(caption) {
    var m = mainElement;
    if(mainElement == document) {
        m = $(".embed-container")
    }
    // create a caption container where lines are individually placed
    // that removes unnecessary background color on multiline text
    // just like on flash player
    if(document.querySelector("[start=\"" + caption.start + "\"]")) return;
    var captionContainer = document.createElement("div")
    captionContainer.className = "caption-container"
    captionContainer.setAttribute("start", caption.start)
    captionContainer.setAttribute("end", caption.end)
    caption.text.split("<br>").forEach(function(text) {
        var c = document.createElement("p")
        c.className = "caption"
        c.innerHTML = text;
        captionContainer.appendChild(c)
        c.style.fontSize = m.getBoundingClientRect().width / 40 + "px"
    })

    // append container
    m.appendChild(captionContainer)

    if(browserModernFeatures) {
        captionContainer.className += " modern"
    } else {
        captionContainer.style.left = 
                    (m.getBoundingClientRect().width / 2)
                    - (captionContainer.getBoundingClientRect().width / 2) + "px"
    }

    // remove on end time
    var x = setInterval(function() {
        var videoTime = Math.floor(video.currentTime * 10) / 10;
        if(!captionsEnabled) {
            clearInterval(x)
            return;
        }
        if(videoTime > caption.end
        || videoTime < caption.start) {
            captionContainer.parentNode.removeChild(captionContainer);
            clearInterval(x);
            return;
        }
    }, 100)
}

// hover-over caption selection ui
function captionSelectShowUi() {
    if(!ccListLoaded) return;
    $(".captions_popup").style.display = "block"
}

$(".cc .triangle-container").addEventListener("mouseover", captionSelectShowUi, false)
$(".cc .triangle").addEventListener("mouseover", captionSelectShowUi, false)
captionsSwitch.addEventListener("click", captionsMain, false)

// switch back fullscreen sprite when exited externally
try {
    document.addEventListener("fullscreenchange", function() {
        if(!document.fullscreenElement) {
            // exited
            player_fullscreen = false;
            $(".video_controls .fullscreen").className = "fullscreen"
            setTimeout(function() {
                $(".video_controls .fullscreen").style
                                                .backgroundPosition = "0px 0px"
            }, 500)
        }
    }, false)
}
catch(error) {}


// loading sprite
function showLoadingSprite() {
    mainElement
    .querySelector(".html5-loading")
    .className = mainElement.querySelector(".html5-loading").className
                                                            .replace("hid", "")
}


// skipping
var flashSkip = false;
try {
    mainElement.addEventListener("keydown", function(e) {
        var skipAmount = 5;
        if(flashSkip) {
            skipAmount = video.duration / 10;
        }
        switch(e.keyCode) {
            // arrow right
            case 39: {
                video.currentTime += skipAmount
                break;
            }
            // arrow left
            case 37: {
                video.currentTime -= skipAmount
            }
        }
    }, false)
}
catch(error) {}

// on mp4 error redirect to retryVideo
video.querySelector("source").addEventListener("error", function() {
    var videoId = video.querySelector("source").src
                       .split("assets/")[1]
                       .split(".mp4")[0]
    video.src = "/retry_video?video_id=" + videoId
    showLoadingSprite();

    video.addEventListener("error", function() {
        $(".html5-loading").className += " hid"
    }, false)
}, false)