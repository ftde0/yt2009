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
var fullscreen_anim_playing = false;
var fullscreen_btn = $(".video_controls .fullscreen");
var fullscreen_btn_hovered = false;
var videoStartedPlaying = false;

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
        // button
        fullscreen_btn.addEventListener("mouseover", function() {
            if(fullscreen_anim_playing || player_fullscreen) return;
            fullscreen_btn_hovered = true;
            fullscreen_anim_playing = true;
            function showFullscreenAnim() {
                if(!fullscreen_btn_hovered) return;
                var anim_frame = 0;
                var anim = setInterval(function() {
                    if(player_fullscreen) return;
                    anim_frame++;
                    var xPos = "0px"
                    if(!fullscreen_btn_hovered) {
                        xPos = "-28px"
                    }
                    fullscreen_btn.style.backgroundPosition
                    = xPos + " -" + (anim_frame * 22) + "px"
                    if(anim_frame * 22 == 220) {
                        clearInterval(anim);
                        fullscreen_anim_playing = false;
                    }
                }, 25)
            }
            showFullscreenAnim();
            var animLoop = setInterval(function() {
                if(fullscreen_btn_hovered) {
                    retractFullscreen(true)
                    setTimeout(function() {
                        showFullscreenAnim();
                    }, 600)
                } else {
                    clearInterval(animLoop);
                }
            }, 1000)
        }, false)

        fullscreen_btn.addEventListener("mouseout", function() {
            setTimeout(function() {
                if(player_fullscreen) return;
                retractFullscreen()
            }, 420)
            fullscreen_btn_hovered = false;
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
                    if(window.modifiersAdded) {
                        adjustModifiers("FULLSCREEN_CLOSED")
                    }
                } else {
                    $(".embed-container").requestFullscreen();
                    fullscreen_btn.className = "fullscreen opened"
                    fullscreen_btn.style.backgroundPosition = ""
                    player_fullscreen = true;
                    if(window.modifiersAdded) {
                        adjustModifiers("FULLSCREEN_OPENED")
                    }
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
                    if(window.modifiersAdded) {
                        adjustModifiers("FULLSCREEN_CLOSED")
                    }
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
                    if(window.modifiersAdded) {
                        adjustModifiers("FULLSCREEN_OPENED")
                    }
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
                    retractFullscreen()
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
                non_css_anim_remove(player_add_popout, "bottom", 25, -59)
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
            if(videoEnded
            || checkBounds($("#watch-player-div"), mouse_left, mouse_top))
            return;
            setTimeout(function() {
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
                    non_css_anim_remove(player_add_popout, "bottom", 25, -59)
                    $(".annotations-tooltip").className
                    = "annotations-tooltip player-tooltip hid"
                    $(".captions_popup").style.display = "none"
                }
            }, 250)

            if(fadeControlsEnable
            && !controlsFadeProgress) {
                controlsFadeProgress = true;
                non_css_anim_remove($(".video_controls"), "bottom", 0, -23);
                setTimeout(function () {
                    videoControlsShown = false;
                    controlsFadeProgress = false;
                }, 250)
            }
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

    setTimeout(function() {
        createPlaybackModePickr(parent)
    }, 50)
}

// reversed fullscreen anim
function retractFullscreen(skipLastFrame) {
    if(fullscreen_anim_playing || player_fullscreen) return;
    var lastFrame = 0;
    if(skipLastFrame) {
        lastFrame = 1;
    }
    fullscreen_anim_playing = true
    var anim_frame = 10;
    var anim = setInterval(function() {
        if(player_fullscreen) return;
        anim_frame--;
        var xPos = "0px"
        if(!fullscreen_btn_hovered) {
            xPos = "-28px"
        }
        fullscreen_btn.style.backgroundPosition
        = xPos + " -" + (anim_frame * 22) + "px"
        if(anim_frame <= lastFrame) {
            clearInterval(anim);
            fullscreen_anim_playing = false;
        }
    }, 25)
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
var animationDebounces = {}
var upAnimationDebounce = false;
var downAnimationDebounce = false;
function non_css_anim_add(element, cssProperty, from, to) {
    if(animationDebounces[element.className]
    || element.style[cssProperty] == to + "px") return;
    animationDebounces[element.className] = true;
    /*setTimeout(function() {
        upAnimationDebounce = false
    }, 200)*/
    element.style[cssProperty] = from + "px"
    var current = from;
    var ff = false;
    if(navigator.userAgent.indexOf("Firefox") !== -1) {
        ff = true
    }
    var x = setInterval(function() {
        current += 11;
        if(current / to > 0.6) {
            current -= 11
            current += 5
        }
        element.style[cssProperty] = current + "px"
        if(current >= to) {
            element.style[cssProperty] = to + "px"
            clearInterval(x);
            animationDebounces[element.className] = false;
        }
    }, ff ? 20 : 33)
}
function non_css_anim_remove(element, cssProperty, from, to) {
    if(element.style[cssProperty] == to + "px"
    || animationDebounces[element.className]) return;
    element.style[cssProperty] = from + "px"
    animationDebounces[element.className] = true;
    var current = from;
    var ff = false;
    if(navigator.userAgent.indexOf("Firefox") !== -1) {
        ff = true
    }
    var x = setInterval(function() {
        current -= 12;
        element.style[cssProperty] = current + "px"
        if(current <= to) {
            clearInterval(x);
            animationDebounces[element.className] = false;
        }
    }, ff ? 20 : 33)
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
    //console.log("play")
    if(window.sabrData && window.sabrData.fEnd) {
        video.currentTime = 0;
    }
    video.play();
    videoPauseOverride = true
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
    btn.style.opacity = 0.9;
    setTimeout(function() {
        btn.style.width = "100px"
        btn.style.height = "100px"
        btn.style.opacity = 0;
    }, 10)
    setTimeout(function() {
        btn.className += " hid"
        btn.style.width = "75px"
        btn.style.height = "75px"
        btn.style.opacity = 0.9;
    }, 550)
}



// progress bar
var seekbar = $(".video_controls .seek");
var elapsedbar = $(".video_controls .elapsed");
var loadedbar = $(".video_controls .loaded");

// going forward within the video
function timeUpdate() {
    // hide loading sprite if needed (i mean, we're progressing with the video)
    if(document.querySelector(".html5-loading")
                .className.indexOf("hid") == -1) {
        $(".html5-loading").className += " hid"
        stopLoadingRototo()
    }
    if(window.pickrLastState && window.pickrLastState.ongoing) {
        video.pause()
        return;
    }
    if(window.usingModifiers && !window.modifiersAdded) {
        loadModifierTags()
    }
    if(playingAsLive) return;
    elapsedbar.style.width = (video.currentTime / video.duration) * 100 + "%"
    if(video.duration <= video.currentTime) {
        // ??
        video_pause();
        showEndscreen();
    }
    if(video.buffered && !isNaN(video.duration)) {
        try {
            var rIndex = 0;
            if(window.sabrData) {
                var cr = video.currentTime;
                var ranges = video.buffered.length;
                var i = 0;
                while(i !== ranges) {
                    try {
                        if(video.buffered.end(i) >= cr
                        && video.buffered.start(i) <= cr) {
                            rIndex = i;
                        }
                    }
                    catch(error){console.log(error,i)}
                    i++
                }
            }
            loadedbar.style.width = (video.buffered.end(rIndex) / video.duration)
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

    // hide endscreen if shown while video is playing
    if(video.currentTime !== video.duration
    && $(".endscreen").className.indexOf("hid") == -1) {
        $("video").className = "html5_video"
        $(".endscreen").className = "endscreen hid"
    }

    annotation43()
    videoStartedPlaying = true;
}
video.addEventListener("timeupdate", timeUpdate, false)

// annotations container sizing
function sizeAnnotationsContainer() {
    if(!fadeControlsEnable
    && browserModernFeatures
    && document.querySelector(".annotations_container")) {
        $(".annotations_container").style.height = "calc(100% - 25px)"
        annotation43()
    } else if(browserModernFeatures
    && document.querySelector(".annotations_container")) {
        var vHeight = video.getBoundingClientRect().height
        $(".annotations_container").style.height = vHeight + "px"
        annotation43()
    }
}

// annotation fix for 4:3 videos
var fourthreechecked = false;
var fourthree = false;
function annotation43() {
    if(fourthreechecked) return;
    if(!video.paused && !fourthreechecked) {
        if(video.videoWidth / video.videoHeight == 4 / 3) {
            fourthree = true;
            annotation43force()
        }
        fourthreechecked = true;
    }
}

function annotation43force() {
    if(!document.querySelector(".annotations_container")) return;
    fourthree = true
    var vWidth = video.getBoundingClientRect().width
    if((window.modifierTags
    && window.modifierTags.indexOf("yt:crop=16:9") !== -1)
    && mainElement.getBoundingClientRect) {
        vWidth = Math.floor(mainElement.getBoundingClientRect().width)
    }
    var width = vWidth / (4 / 3)
    $(".annotations_container").style.width = width + "px"
    var left = (vWidth - width) / 2
    $(".annotations_container").style.left = left + "px"

    if(window.modifierTags
    && window.modifierTags.indexOf("yt:stretch=16:9") !== -1) {
        $(".annotations_container").style.left = "0px"
    }

    if(window.modifierTags
    && window.modifierTags.indexOf("yt:crop=16:9") !== -1
    && video.videoWidth) {
        var scale = (
            video.videoWidth / (video.videoWidth / video.videoHeight) * (16 / 9)
        )
        scale = (scale / video.videoWidth)
        scale = scale.toFixed(2)
        $(".annotations_container").style.transform = "scale(" + scale + ")"
    }
}

// fix video height if old browser
function setVidHeight() {
    // also adjust the video size if no_controls_fade
    if(!browserModernFeatures && !fadeControlsEnable
    && document.getElementById("watch-this-vid")) {
        var h = document.getElementById("watch-this-vid")
                        .getBoundingClientRect().height
        video.style.height = (h - 25) + "px"
    }
}
setTimeout(setVidHeight, 100)

var progressContainer = $(".progress_container")
// set the width of the seekbar
// use calc() for modern browsers, the classic pixel method for older ones
function adjustSeekbarWidth() {
    if(!window.sabrData) {
        timeUpdate();
    }
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
        var vidBounds = video.getBoundingClientRect()
        if(window.modifiersAdded && mainElement.getBoundingClientRect) {
            vidBounds = mainElement.getBoundingClientRect()
        }
        $(".html5-loading").style.left = vidBounds.width / 2 - 16 + "px"
        $(".html5-loading").style.top = vidBounds.height / 2 - 16 + "px"; 
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

    sizeAnnotationsContainer()
    setVidHeight()
    resizeCaptions()
    if(mainElement.querySelector
    && mainElement.querySelector(".unrecoverable-error-msg")
    && !browserModernFeatures) {
        positionUnrecoverable(
            mainElement.querySelector(".unrecoverable-error-msg")
        )
    }
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

var seekTimeout = false;
function videoSeek(e) {
    if(mousedown) {
        if(seekTimeout) return;
        seekTimeout = true;
        setTimeout(function() {
            seekTimeout = false;
        }, 40)
        $(".seek_btn").className = "seek_btn hovered"
        var offsetX = e.pageX - seekbar.getBoundingClientRect().left;
        video.currentTime = (offsetX / seekbar.getBoundingClientRect().width)
                            * video.duration
    } else {
        $(".seek_btn").className = "seek_btn"
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
    setTimeout(function() {
        non_css_anim_remove(volume_panel, "bottom", 25, -64)
    }, 200)    
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
// (use the same function to unbug seeker)
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

    mousedown = false;
    $(".seek_btn").className = "seek_btn"
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

        non_css_anim_remove(player_add_popout, "bottom", 25, -59)
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
    autofixVolumeBtn()

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
        autofixVolumeBtn()
    }
})

function autofixVolumeBtn() {
    if(parseInt($(".volume_button").style.width) > 28) {
        $(".volume_button").style.width = "28px"
    }

    if(video.volume == 0) {
        $(".volume_button").className = "volume_button muted"
        $(".volume_button").style.width = "29px"
    } else if(video.volume !== 0
    && $(".volume_button").className.indexOf("muted") !== -1) {
        $(".volume_button").className = "volume_button"
    }
}

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

// animated seeker
function animSeek(point, callback) {
    var current = parseInt(
        $(".progress_container .elapsed").style.width || "0%"
    )
    var x = setInterval(function() {
        current -= 20
        if(current - point <= 20) {
            current += 10
        }
        if(current <= point) {
            current = point;
            clearInterval(x)
            callback()
        }
        $(".progress_container .elapsed").style.width = current + "%"
    }, 20)
}


// endscreen
var videoEnded = false;
var openSectionIndex = 0;
function showEndscreen() {
    var sections = document.querySelectorAll(".endscreen-section")
    videoEnded = true;
    if(video.className && video.className.indexOf("showing-endscreen") == -1) {
        video.className += " showing-endscreen"
    }
    $(".endscreen").className = "endscreen"
    //non_css_anim_remove($(".video_controls"), "bottom", 0, -23);
    if(volume_up) {
        volume_up = false;
        non_css_anim_remove(volume_panel, "bottom", 25, -64)
    }

    setTimeout(function() {
        if(!sections[endscreen_section_index]) return;
        var c = sections[endscreen_section_index].querySelectorAll(
            ".endscreen-title-container, .video-from, .video-views"
        )
        for(var sel in c) {
            try {
                if(c[sel].className.indexOf("title") !== -1) {
                    c[sel].style.width = "300px"
                } else {
                    c[sel].style.width = "255px"
                }
                
            }
            catch(error) {}
        }
    }, 100);
    setTimeout(function() {
        var stars = sections[endscreen_section_index].querySelectorAll(
            ".endscreen-video-star"
        )
        for(var s in stars) {
            try {
                s = stars[s]
                s.style.backgroundPosition = "-75px 0px"
                var rating = s.className.split("rating-")[1]
                animatedStars(s, parseInt(rating))
            }
            catch(error) {}
        }
    }, 90)

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
    //console.log("replay")
    videoEnded = false;
    video.className = video.className.split(" showing-endscreen").join("")
    $(".endscreen").className = "endscreen hid"
    animSeek(0, function() {
        video.currentTime = 0;
        video.play()
    })

    setTimeout(function() {
        mousein = true;
    }, 400)
}

var endscreen_section_index = 0;
var timeouts = []

function animatedStars(e, rating) {
    var targetX = {
        0: -75,
        1: -60,
        2: -45,
        3: -30,
        4: -15,
        5: 0
    }
    targetX = targetX[Math.floor(rating) || 5]
    var currentX = -75
    var x = setInterval(function() {
        currentX += 15
        if(currentX >= targetX) {
            currentX = targetX;
            clearInterval(x)
        }
        e.style.backgroundPosition = currentX + "px 0px"
    }, 66)
}

function endscreen_section_change(value) {
    var sections = document.querySelectorAll(".endscreen-section")
    clearEndscreenTimeouts();
    // initial
    if(!sections[endscreen_section_index]) return;
    var currentSection = sections[endscreen_section_index]
    endscreen_section_index += value;
    if(!sections[endscreen_section_index]) {
        endscreen_section_index = 0;
    }
    var newSection = sections[endscreen_section_index]

    // w tle zwiń tytuły z newSection aby rozwinąć je przy użytkowniku
    // wrap back the newSection titles
    // to unwrap them in front of the user later
    var s = newSection.querySelectorAll(
        ".endscreen-title-container, .video-from, .video-views"
    )
    for(var sel in s) {
        try {
            switch(s[sel].className) {
                case "gr video-from": {
                    s[sel].style.width = "40px"
                    break;
                }
                case "gr video-views": {
                    s[sel].style.width = "45px"
                    break;
                }
                default: {
                    s[sel].style.width = "0px"
                    break;
                }
            }
        }
        catch(error) {}
    }

    // ukryj poprzednią sekcję, pokaż nową
    // hide the previous section, show the new one
    currentSection.style.opacity = "0";
    setTimeout(function() {
        currentSection.className = "endscreen-section hid"
        newSection.className = "endscreen-section fi"
    }, 1000)
    setTimeout(function() {
        newSection.style.opacity = "1"
    }, 1100)
    setTimeout(function() {
        for(var sel in s) {
            try {
                switch(s[sel].className) {
                    case "gr video-from":
                    case "gr video-views": {
                        s[sel].style.width = "255px"
                        break;
                    }
                    default: {
                        s[sel].style.width = "300px"
                        break;
                    }
                }
            }
            catch(error) {}
        }
        newSection.className = "endscreen-section"
    }, 1200)
    setTimeout(function() {
        var stars = newSection.querySelectorAll(".endscreen-video-star")
        for(var s in stars) {
            try {
                s = stars[s]
                s.style.backgroundPosition = "-75px 0px"
                var rating = s.className.split("rating-")[1]
                animatedStars(s, parseInt(rating))
            }
            catch(error) {}
        }
    }, 1100)

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
    non_css_anim_add(player_add_popout, "bottom", -59, 25)
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
    setTimeout(function() {
        non_css_anim_remove(player_add_popout, "bottom", 25, -59)
    }, 200)
    setTimeout(function() {
        player_add_popout_debounce = false;
    }, 500)
}, false)

function initPopoutFadeout() {
    // further make sure popout menus (volume, additions) are removed
    var ac = document.querySelector(".annotations_container") || mainElement
    ac.addEventListener("mousemove", function(e) {
        var mouse_left = e.pageX || e.clientX;
        var mouse_top = e.pageY || e.clientY;

        // ADDITIONS CONTAINER
        if(!checkBounds(player_add_popout, mouse_left, mouse_top)
        && !checkBounds($(".captions_popup"), mouse_left, mouse_top)
        && parseInt(player_add_popout.style.bottom) >= 25
        && !player_add_popout_debounce) {
            $(".captions_popup").style.display = "none"
            player_add_popout_debounce = true;
            setTimeout(function() {
                non_css_anim_remove(player_add_popout, "bottom", 25, -59)
            }, 200)
            setTimeout(function() {
                player_add_popout_debounce = false;
            }, 300)
        }

        // VOLUME PANEL
        if(!checkBounds(volume_panel, mouse_left, mouse_top)
        && parseInt(volume_panel.style.bottom) >= 25
        && !volume_popping) {
            volume_up = false;
            volume_popping = true;
            setTimeout(function() {
                non_css_anim_remove(volume_panel, "bottom", 25, -64)
            }, 200)
            setTimeout(function() {
                volume_popping = false;
            }, 500)
        }
        
        // SEEK BAR (unhover)
        mousedown = false;
        $(".seek_btn").className = "seek_btn"
    }, false)
}
setTimeout(function() {
    initPopoutFadeout();
}, 1000)

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
    if(annotation.style == "pause"
    && !pauseAnnotationOngoing
    && video.currentTime.toFixed(1) == annotation.fromTime.toFixed(1)) {
        pauseAnnotationHandle(annotation)
        return;
    } else if(annotation.style == "pause") return;
    if(document.querySelector(
        "[from=\"" + annotation.fromTime.toFixed(1) + "\"]"
    )) return;
    var ac = document.querySelector(".annotations_container") || mainElement
    var element = document.createElement("div")
    var container = mainElement;
    if(mainElement == document) {
        $(".embed-container").appendChild(element)
        container = $(".embed-container")
    } else {
        ac.appendChild(element)
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
    if(annotation.style !== "highlight") {
        element.style.background = bgColor
    }
    element.style.color = annotation.textColor || "rgb(0, 0, 0)"
    element.style.fontSize = (Math.floor(annotation.textSize * 5) || 14) + "px"
    element.style.left = annotation.leftPercent + "%"
    element.style.top = annotation.topPercent + "%"
    if(annotation.border) {
        var borderWidth = annotation.borderWidth + "px"
        element.style.borderColor = annotation.border;
        element.style.borderStyle = "solid"
        element.style.borderWidth = borderWidth;
        element.addEventListener("mouseover", function() {
            element.style.borderColor = annotation.borderHover;
            element.className += " hover"
        }, false)
        element.addEventListener("mouseout", function() {
            element.style.borderColor = annotation.border;
            element.className = element.className.replace(" hover", "")
        }, false)
    }
    if(browserModernFeatures) {
        element.style.width = "calc(" + annotation.widthPercent + "% - 14px)"
    } else {
        element.style.width = (
            ac.getBoundingClientRect().width / 100
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
        if(annotation.hoverOpacity) {
            var ogOpacity = annotation.bgColor.legacy
                            .split(", ")[3].split(")")[0]
            annotation.hoverBg = annotation.bgColor.legacy.replace(
                ogOpacity, annotation.hoverOpacity
            )
            element.addEventListener("mouseover", function() {
                element.style.background = annotation.hoverBg
            }, false)
            element.addEventListener("mouseout", function() {
                element.style.background = annotation.bgColor.legacy
            }, false)
        }
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
            annotation43()
            var bounds = ac.getBoundingClientRect()

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

                if(speechPoints.direction == "left"
                || speechPoints.direction == "right") {
                    relativeStart[1] = Math.max(start[1], end[1], endPoint[1])
                }

                var svgViewbox = [
                    bounds.width / 100 * Math.abs(end[0] - relativeStart[0]),
                    Math.abs(endPoint[1] - relativeStart[1])
                ]

                var relativePoints = [
                    Math.floor(bounds.width / 100
                            * Math.floor(start[0] - relativeStart[0]))
                            + "," + Math.abs(Math.floor(start[1] - relativeStart[1])),
                    Math.floor(bounds.width / 100
                            * Math.floor(end[0] - relativeStart[0]))
                            + "," + Math.abs(Math.floor(end[1] - relativeStart[1])),
                    Math.floor(endPoint[0] - relativeStart[0])
                                + ","
                                + Math.abs(Math.floor(endPoint[1] - relativeStart[1]))
                ]
                
                // tip svg element
                var tip = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                )
                tip.setAttribute("from", annotation.fromTime.toFixed(1))
                tip.setAttribute("to", annotation.toTime.toFixed(1))
                tip.className = "speech-point"
                tip.style.position = "absolute"
                tip.style.left = relativeStart[0] + "%"
                if(speechPoints.direction == "left"
                || speechPoints.direction == "right") {
                    tip.style.left = (parseInt(relativeStart[0]) + 1) + "%"
                }
                tip.style.top = relativeStart[1] + "px"
                tip.style.width = (svgViewbox[0] / bounds.width) * 100 + "%"
                tip.style.height = Math.floor(
                    parseFloat(relativePoints[2].split(",")[1])
                                / bounds.height * 100
                ) + "%"
                tip.setAttribute("viewBox", "0 0 "
                                            + Math.floor(svgViewbox[0])
                                            + " " + Math.floor(svgViewbox[1]))
                ac.appendChild(tip)
                
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
                                            - 1 - bounds.top + "px"
                                break;
                            }
                            case "top": {
                                tip.style.top = annotationBounds.top
                                            - annotationBounds.height
                                            - 1 - bounds.top + "px"
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
        element.style.top = "calc(" + annotation.topPercent + "%)"
    }

    // remove later mark
    annotationsRemoveTime[annotation.toTime.toFixed(1)] = element

    // gradient for older browsers
    if((!browserModernFeatures
    && annotation.style == "speech")
    || document.cookie.indexOf("annotation_gradients") !== -1) {
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
        var TARGET_H = 5;
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

// pause annotation
var pauseAnnotationOngoing = false;
var videoPauseOverride = false;
var pauseDebug = false;
function pauseAnnotationHandle(annotation) {
    // cleanup - remove when needed
    function annotationCleanup() {
        try {
            pause.style.display = "none"
            pause.parentNode.removeChild(pause)
            video.currentTime += 0.2
        }
        catch(error) {}
        setTimeout(function() {
            pauseAnnotationOngoing = false;
        }, 300)
    }

    if(pauseAnnotationOngoing) return;
    // make sure vid's paused
    videoPauseOverride = false
    pauseAnnotationOngoing = true;
    video_pause()
    while(!video.paused && pauseAnnotationOngoing && !videoPauseOverride) {
        video_pause()
    }

    // add the pause ticker
    var ac = document.querySelector(".annotations_container") || mainElement
    var pause = document.createElement("span")
    pause.setAttribute("from", annotation.fromTime.toFixed(1))
    pause.className = "pause-annotation"
    var pauseBg = -35
    ac.appendChild(pause)

    // scroll the pause ticker

    var interval = (annotation.pauseTime * 1000) / 59

    pause.style.backgroundPosition = "0px 0px"

    if(pauseDebug) return;

    var x = setInterval(function() {
        pauseBg -= 35
        pause.style.backgroundPosition = "0px " + pauseBg + "px"

        if(videoPauseOverride) {
            annotationCleanup()
        }
    }, interval)

    setTimeout(annotationCleanup, (annotation.pauseTime * 1000) + 100)
}

function dbg_stepFrame() {
    var pause = document.querySelector(".pause-annotation")
    var bg = parseInt(
        pause.style.backgroundPosition.split("px ")[1].replace("px", "")
    )
    bg -= 35
    pause.style.backgroundPosition = "0px " + bg + "px"
}

// annotation functions end

var annotationsSwitch = $(".player_additions_popout .annotations")

function annotationsMain() {
    annotationsEnabled = !annotationsEnabled;

    if(!document.querySelector(".annotations_container")) {
        var ac = document.createElement("div")
        ac.className = "annotations_container"
        try {
            mainElement.appendChild(ac)
        }
        catch(error) {document.body.appendChild(ac);}
        ac.addEventListener("click", function() {
            if(!video.paused) {
                video_pause();
                flash_middle_btn("pause")
            } else {
                video_play();
                flash_middle_btn("play")
            }
        }, false)
        sizeAnnotationsContainer()
        annotation43()
    }

    if(annotationsEnabled) {
        // request
        var r = new XMLHttpRequest();
        r.open("GET", "/json_annotations")
        r.setRequestHeader("source", location.href)
        r.send(null)
        r.addEventListener("load", function(e) {
            // index the received annotations
            // for easier checking based on start time
            var annotations = JSON.parse(r.responseText)
            var annotationsExist = false;
            annotations.forEach(function(annotation) {
                if(!annotation.fromTime) return;
                annotationsTimeIndex[annotation.fromTime.toFixed(1)]
                                                        = annotation;
                annotationsExist = true;
            })

            if(annotationsExist) {
                // proper icon if at least 1 annotation
                annotationsSwitch.className = "annotations"
            } else {
                // show paTooltip if no annotations
                // (use annotationsPaHovered for delay)
                var annotationsPaHovered = false;
                annotationsSwitch.addEventListener("mousemove", function() {
                    annotationsPaHovered = true;
                    setTimeout(function() {
                        if(annotationsPaHovered) {
                            updatePaTooltip("Annotations are not available")
                            showPaTooltip()
                            paTooltipContainer.style.top = "0px"
                        }
                    }, 500)
                }, false)
                annotationsSwitch.addEventListener("mouseout", function() {
                    hidePaTooltip()
                    annotationsPaHovered = false;
                }, false)
            }

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
        var s = mainElement.querySelectorAll(
            ".annotation, .speech-point, .annotations_container svg"
        )
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
function captionsMain(source) {
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
            var captionsFound = false;
            captionsLangIndex = langs;

            // load english captions as default
            if(langs["en"]) {
                var autoGenerated = (
                    langs["en"]
                    && langs["en"].name.indexOf("auto-generated") !== -1
                )
                if(autoGenerated && source && source == "auto"
                && document.cookie
                && document.cookie.indexOf("disable_autocc") !== -1) {
                    captionsEnabled = false;
                    return;
                }

                loadCaptions(videoId, "en")
                placeCaptions();
                captionsFound = true;
            } else {
                var i = 0;
                var firstLang = ""
                for(var h in langs) {
                    if(i == 0) {
                        firstLang = h;
                    }
                    i++;
                }

                var autoGenerated = (
                    langs[firstLang]
                    && langs[firstLang].name.indexOf("auto-generated") !== -1
                )
                if(autoGenerated && source && source == "auto"
                && document.cookie
                && document.cookie.indexOf("disable_autocc") !== -1) {
                    captionsEnabled = false;
                    return;
                }

                if(firstLang) {
                    loadCaptions(videoId, firstLang)
                    placeCaptions();
                    captionsFound = true;
                }
            }

            if(!captionsFound) {
                var captionsPaHovered = false;
                captionsSwitch.addEventListener("mousemove", function() {
                    captionsPaHovered = true;
                    setTimeout(function() {
                        if(captionsPaHovered) {
                            updatePaTooltip("Captions are not available")
                            showPaTooltip()
                            paTooltipContainer.style.top = "25px"
                        }
                    }, 500)
                }, false)
                captionsSwitch.addEventListener("mouseout", function() {
                    hidePaTooltip()
                    captionsPaHovered = false;
                }, false)
            }
        }, false)
    } else {
        // show ui disabled and remove previous captions
        $(".player_additions_popout .cc").className += " none"
        $(".captions_popup").style.display = "none"
        var s = document.querySelectorAll(".caption")
        for(var e in s) {
            try {
                s[e].parentNode.removeChild(s[e])
            }
            catch(error) {}
        }
        s = document.querySelectorAll(".captions-page")
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
    var langArray = []
    for(var lang in captionsLangIndex) {
        captionsLangIndex[lang].code = lang
        langArray.push(captionsLangIndex[lang])
    }
    var langPages = []
    var index = 0;
    var englishCcElement = false;
    var pagesCount = Math.floor(langArray.length / 8) + 1
    var c = 0
    while(c !== pagesCount) {
        var e = document.createElement("div")
        e.className = "captions-page page-" + c
        if(c !== 0) {
            e.className += " hid"
        }
        langPages.push(e)
        $(".captions_selection").appendChild(e)
        var langs = langArray.slice(c * 8, (c * 8) + 8)
        langs.forEach(function(lang) {
            var li = document.createElement("li")
            li.setAttribute("lang", lang.code)
            var name = lang.name;
            if(name.length > 17) {
                name = name.substring(0, 16) + "..."
            }
            li.innerHTML = "<span class=\"circle\"></span>"
                        + "<p>" + name + "</p>";
            li.setAttribute("onclick", "loadCaptions(\"" + videoId
                                        + "\", \"" + lang.code + "\")")
            if(lang.code == "en") {
                englishCcElement = li;
            }
            e.appendChild(li)
            index++
        })
        if(langs.length >= 8 || pagesCount !== 1) {
            var li = document.createElement("li")
            li.innerHTML = "<p>(more)</p>";
            li.addEventListener("click", function() {
                scrollCaptionPage(1)
            }, false)
            e.appendChild(li)
        }
        lastCaptionsPage++
        c++
    }

    // mark english captions as selected
    // or if none, mark first captions
    if(englishCcElement) {
        englishCcElement.querySelector(".circle").className += " selected"
    } else {
        document.querySelector(".captions_selection li")
                .querySelector(".circle").className += " selected"
    }
}

// scroll between captions pages
var captionsPage = 0
var lastCaptionsPage = 0;
function scrollCaptionPage(diff) {
    captionsPage += diff
    if(captionsPage >= lastCaptionsPage
    || captionsPage < 0) {
        captionsPage = 0
    }
    var pages = document.querySelectorAll(".captions-page")
    for(var p in pages) {
        p = pages[p]
        if(p.className
        && p.className.indexOf("hid") == -1) {
            p.className += " hid"
        }
    }

    var targetPage = $(".captions-page.page-" + captionsPage)
    targetPage.className = targetPage.className.replace(" hid", "")
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

// resize captions when player resized
function resizeCaptions() {
    var m = mainElement;
    if(mainElement == document) {
        m = $(".embed-container")
    }
    var s;
    try {
        s = m.querySelectorAll(".caption")
    }
    catch(error) {
        s = document.querySelectorAll(".caption")
    }
    for(var e in s) {
        try {
            s[e].style.fontSize = m.getBoundingClientRect().width / 40 + "px"
        }
        catch(error) {}
    }
}

// hover-over caption selection ui
function captionSelectShowUi() {
    if(!ccListLoaded || !captionsEnabled) return;
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
            var f = $(".video_controls .fullscreen")
            f.className = "fullscreen"
            setTimeout(function() {
                f.style.backgroundPosition = "0px 0px"
            }, 500)
        }
    }, false)
}
catch(error) {}


// loading sprite
function showLoadingSprite() {
    var className = $(".html5-loading").className
    $(".html5-loading").className = className.replace("hid", "")
    //if(!$(".html5-loading").style.left) {
        var vidBounds = video.getBoundingClientRect()
        if(modifiersAdded && mainElement.getBoundingClientRect) {
            vidBounds = mainElement.getBoundingClientRect()
        }
        $(".html5-loading").style.left = vidBounds.width / 2 - 16 + "px";
        $(".html5-loading").style.top = vidBounds.height / 2 - 16 + "px";
    //}
    setupLoadingRototo()
}

var loadingRototo;

function setupLoadingRototo() {
    var rotate = 0
    if(loadingRototo) {
        clearInterval(loadingRototo)
    }
    loadingRototo = setInterval(function() {
        rotate += 45
        if(rotate >= 360) {
            rotate = 0
        }
        var rototoStyle = ""
        rototoStyle += "left: " + $(".html5-loading").style.left + ";"
        rototoStyle += "top: " + $(".html5-loading").style.top + ";"
        rototoStyle += "-webkit-transform: rotate(" + rotate + "deg);"
        rototoStyle += "-moz-transform: rotate(" + rotate + "deg);"
        rototoStyle += "transform: rotate(" + rotate + "deg)"
        $(".html5-loading").style = rototoStyle
    }, 125)
}

function stopLoadingRototo() {
    clearInterval(loadingRototo)
    loadingRototo = 0;
    $(".html5-loading").style = ""
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

// retry video load if stuck after 5 seconds
setTimeout(function() {
    if(!video.playing && video.buffered.length <= 0
    && !videoStartedPlaying && !window.sabrBase
    && !window.overrideFallbackC) {
        var src = video.src;
        if(!src) {
            src = video.querySelector("source").getAttribute("src")
        }
        video.src = src;
    }
}, 5000)

// video loading sprite on unloaded area
video.addEventListener("seeking", function(e) {
    var partLoaded = false
    if(!video.buffered || !video.buffered.length || !videoStartedPlaying) {
        partLoaded = true;
        return;
    }

    for (var i = 0; i < video.buffered.length; i++) {
        var start = video.buffered.start(i)
        var end = video.buffered.end(i)
        
        if(video.currentTime >= start && video.currentTime <= end) {
            partLoaded = true;
        }
    }

    if(!partLoaded) {
        showLoadingSprite()
    }
})

// space=pause
document.body.addEventListener("keydown", function(e) {
    if(e.key !== " ") return;
    if(e.target
    && e.target.nodeName.toLowerCase() !== "textarea"
    && e.target.nodeName.toLowerCase() !== "input") {
        e.preventDefault();
        if(video.ended) {
            videoReplay()
            return;
        }
        if(!video.paused) {
            video_pause()
            flash_middle_btn("pause")
        } else {
            video_play()
            flash_middle_btn("play")
        }
    }
}, false)

// unhover seeker if on pause button
$(".pause_btn").addEventListener("mousemove", function() {
    mousedown = false;
    $(".seek_btn").className = "seek_btn"
}, false)

// side tooltips for player additions
var paTooltipContainer = document.createElement("div")
paTooltipContainer.style.display = "none"
paTooltipContainer.className = "player_additions_tooltip"
paTooltipContainer.innerHTML = '<span id="tooltip-entry"></span>\
<span id="tooltip-text-container"><span id="tooltip-text"></span></span>\
<span id="tooltip-end"></span>'
player_add_popout.appendChild(paTooltipContainer)

function updatePaTooltip(text) {
    paTooltipContainer.querySelector("#tooltip-text").innerHTML = text;
    var approxTextLength = Math.floor(text.length * 5)
    paTooltipContainer.querySelector("#tooltip-text-container")
    .style.width = approxTextLength + "px"
    
    var startInsideWidth = 7;
    startInsideWidth += paTooltipContainer
                        .querySelector("#tooltip-text-container")
                        .getBoundingClientRect().width;
    paTooltipContainer.querySelector("#tooltip-end").style.left = startInsideWidth + "px"
    paTooltipContainer.style.right = startInsideWidth + 14 + 45 + "px"
}

function showPaTooltip() {
    paTooltipContainer.style.display = "block"
}

function hidePaTooltip() {
    paTooltipContainer.style.display = "none"
    paTooltipContainer.style.right = "0px"
    paTooltipContainer.style.top = "0px"
}

// unrecoverable (message in the middle) error

// position in middle if not browserModernFeatures
function positionUnrecoverable(errorMessage) {
    var eWidth = errorMessage.getBoundingClientRect().width;
    var eHeight = errorMessage.getBoundingClientRect().height;
    var fWidth = mainElement.getBoundingClientRect().width;
    var fHeight = mainElement.getBoundingClientRect().height;
    errorMessage.style.left = ((fWidth / 2) - (eWidth / 2)) + "px"
    errorMessage.style.top = ((fHeight / 2) - (eHeight / 2)) + "px"
}

// show func
function showUnrecoverableError(message) {
    video.volume = 0;
    video.src = ""
    video.pause()
    video.parentNode.removeChild(video)
    var overlay = document.createElement("div")
    overlay.className = "video-player-overlay"
    mainElement.appendChild(overlay)
    var errorMessage = document.createElement("span")
    errorMessage.innerHTML = message;
    errorMessage.className = "unrecoverable-error-msg"
    overlay.appendChild(errorMessage)
    if(browserModernFeatures) {
        errorMessage.className += " error-msg-modern"
    } else {
        positionUnrecoverable(errorMessage)
    }
}

// patch as LIVE player
var playingAsLive = false;
function initAsLive(id) {
    video.src = ""
    if(!window.MediaSource) {
        showUnrecoverableError(
            "Your browser does not support playing live streams."
        )
        return;
    }
    var streamSequence = 0;
    var iTime = 0;
    var firstPulled = false;
    var ms = new MediaSource();
    var partUrl = "/stream_get_fragment?video_id=" + id
    var vStream;
    var aStream;
    var vFirstAdded = false;
    var aFirstAdded = false;
    var vf = false;
    var af = false;
    var dbg = false;

    if(dbg) {
        video.addEventListener("stalled", function() {
            console.log("dbg/stream/stalled")
        }, false)
        video.addEventListener("waiting", function() {
            console.log("dbg/stream/waiting")
        }, false)
        video.addEventListener("suspend", function() {
            console.log("dbg/stream/suspend")
        }, false)
        
    }

    var lastTimestamp = 0;
    var lastPaused = false;
    var liveHeartbeat = setInterval(function() {
        if(lastTimestamp && video.currentTime == lastTimestamp
        && !video.paused && !lastPaused && vFirstAdded && aFirstAdded) {
            // live stuck -- reset!!
            initAsLive(id)
            //console.log("dbg/stream/stuck!!")
        } else {
            lastTimestamp = video.currentTime;
            lastPaused = video.paused;
        }
    }, 3000)

    video.src = URL.createObjectURL(ms);
    function rmFar() {
        // remove too far off segments to avoid exhausted buffer
        try {
            if(video.buffered.end(0) && video.buffered.start(0)
            && video.buffered.end(0) - 120 >= video.buffered.start(0)) {
                var o = video.buffered.end(0) - 120
                vStream.remove(0, o)
                aStream.remove(0, o)
            }
        }
        catch(error) {}
    }
    function pullBoth() {
        // actually pull and add fragments
        if(streamSequence) {
            streamSequence++
        }
        vf = false;af = false;
        pullPart(false);pullPart(true);
    }
    function pullPart(isAudio) {
        var url = partUrl;
        if(streamSequence) {
            url += "&sq=" + streamSequence
        }
        if(isAudio) {
            url += "&type=aud"
        } else {
            if(!liveHd) {
                url += "&type=360"
            } else {
                url += "&type=hq"
            }
        }
        var r = new XMLHttpRequest();
        r.open("GET", url)
        r.responseType = "arraybuffer"
        r.send(null)
    
        // retry request on network error
        r.addEventListener("abort", function() {
            pullPart(isAudio)
        }, false)
        r.addEventListener("error", function() {
            pullPart(isAudio)
        }, false)

        // append data
        r.addEventListener("load", function(e) {
            try {
                if(!isAudio) {
                    vStream.appendBuffer(r.response);
                    if(!vFirstAdded) {
                        vFirstAdded = true;
                        if(aFirstAdded) {
                            video.currentTime = Math.floor(iTime / 1000) + 1
                            video.play();
                        }
                    }
                    vf = true;
                    if(vf && af) {
                        setTimeout(function() {
                            pullBoth()
                            rmFar()
                        }, 500)
                    }
                } else {
                    aStream.appendBuffer(r.response)
                    if(!aFirstAdded) {
                        aFirstAdded = true;
                        if(vFirstAdded) {
                            video.currentTime = Math.floor(iTime / 1000) + 1
                            video.play();
                        }
                    }
                   af = true;
                    if(vf && af) {
                        setTimeout(function() {
                            pullBoth()
                            rmFar()
                        }, 500)
                    }
                }
            }
            catch(e) {
                //console.log(e)
            }
        }, false)
    }
    // start once ready
    function readyStart() {
        vStream = ms.addSourceBuffer("video/mp4; codecs=\"avc1.4D4028\"")
        aStream = ms.addSourceBuffer("audio/mp4; codecs=\"mp4a.40.2\"")
        pullBoth()
    }

    // init -- pull first seq and pull back a little to avoid lag
    ms.addEventListener("sourceopen", function() {
        var r = new XMLHttpRequest();
        r.open("GET", "/stream_get_fragment?video_id=" + id + "&type=aud")
        r.responseType = "arraybuffer"
        r.send(null)
        r.addEventListener("load", function(e) {
            if(r.getResponseHeader("x-sequence-num")
            && !firstPulled) {
                firstPulled = true;
                streamSequence = parseInt(r.getResponseHeader("x-sequence-num"))
            }
            if(r.getResponseHeader("x-head-time-millis")) {
                iTime = parseInt(r.getResponseHeader("x-head-time-millis"))
            }

            streamSequence -= 5
            iTime -= 25
            readyStart()
        }, false)
        playingAsLive = true;
    }, false)

    // mark live in html5player
    $(".video_controls .timer").innerHTML = "LIVE"
    $(".progress_container").className += " hid"
}


// SABR playback
var sabrData = false;
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
            showUnrecoverableError(
                "there was a problem with the network response."
                +" try reloading the page."
            )
            return;
        }

        // parse x-yt2009-saber
        var partsExtracted = 0;
        var partsInResponse = parseInt(r.getResponseHeader("x-part-count"))
        var s = r.response;
        var cursor = 14 // SABER-START

        if(partsInResponse == 0) {
            // something might have gone terribly wrong
            retryRequest(true)
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
            var pdata = s.slice(cursor + headerLength, cursor + headerLength + plen)
            var ptype = "video"
            if(sabrData.audioItags.indexOf(parseInt(partId.split("-")[0])) !== -1) {
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

function initAsSabr() {
    if(!window.MediaSource) {
        showUnrecoverableError(
            "your browser does not support MediaSource. turn off the exp_sabr flag."
        )
        return;
    }

    var ms = new MediaSource();
    var vStream;
    var aStream;
    video.src = URL.createObjectURL(ms);

    sabrData = {
        "offset": 0,
        "addedSegments": [],
        "audioItags": [139, 140],
        "appendQueue": [],
        "waitingSabrFetch": false,
        "timedCooldown": false,
        "timedSabrFetchAborted": false,
        "lastRequestFailCount": 0,
        "readAhead": 14,
        "defaultLongReadaheadSet": false
    }

    // start once ready
    function readyStart() {
        vStream = ms.addSourceBuffer("video/mp4; codecs=\"avc1.4D4028\"")
        aStream = ms.addSourceBuffer("audio/mp4; codecs=\"mp4a.40.2\"")
        sabrData.videoBuffer = vStream
        sabrData.audioBuffer = aStream
        requestSabr(0, "TIMED")
    }

    // init
    ms.addEventListener("sourceopen", function() {
        readyStart()
    }, false)

    // buffer queue
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
                    console.log("VID", error)
                    clearInterval(vbq)
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
                    console.log("AUD", error)
                    clearInterval(vbq)
                }
                sabrData.appendQueue.shift()
            }
        }
    }, 250)

    // watch for new buffer fetches
    video.addEventListener("timeupdate", function() {
        if(!sabrData.defaultLongReadaheadSet
        && video.duration >= (60 * 3)) {
            sabrData.defaultLongReadaheadSet = true;
            sabrData.readAhead = 50
        }

        if(video.currentTime > 120
        && !sabrData.videoBuffer.updating
        && !sabrData.audioBuffer.updating) {
            // don't keep much backwards buffer to not overfill
            try {
                sabrData.videoBuffer.remove(0, video.currentTime - 90)
                sabrData.audioBuffer.remove(0, video.currentTime - 90)
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
            //console.log("pull more sabr", Math.floor(currentRange.end * 1000))
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
                video_pause();
                showEndscreen()
                if(sabrData.fEndCallback) {
                    sabrData.fEndCallback()
                }
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

    video.addEventListener("waiting", function() {
        showLoadingSprite()

        setTimeout(function() {
            if(Math.floor(video.currentTime) == Math.floor(video.duration)) {
                video_pause()
            }
        }, 1000)
    })
}

function sabrQualityChanged() {
    // force refetch for new quality
    sabrData.addedSegments = []
    //v.pause()
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
    sabrData.waitingSabrFetch = false;
    sabrData.timedSabrFetchAborted = true;
    var c = video.currentTime
    requestSabr(Math.floor(c * 1000), "FORCE")
}

var pickrLastState = {
    "volume": video.volume,
    "ongoing": false
}
var shouldShowSaberPickr = false;
var overrideFallbackC = false;
function markPlaybackModeDone() {
    document.cookie = "saber_playback_mode_picked=1; " 
                    + "Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                    + "SameSite=Lax"
}
function createPlaybackModePickr(parent) {
    // show playback mode pickr
    if(document.cookie.indexOf("saber_playback_mode_picked=") == -1
    && document.cookie.indexOf("exp_sabr") !== -1
    && window.sabrHostUnsupported) {
        markPlaybackModeDone()
        //return;
    }

    function createOption(title, description, onClick, first) {
        var o = document.createElement("div")
        o.className = "pickr-option-main"
        if(first) {
            o.className += " pickr-option-first"
        }
        var btn = document.createElement("img")
        btn.src = "/assets/site-assets/pixel-vfl73.gif"
        btn.className = "pickr-btn"
        o.appendChild(btn)
        var oc = document.createElement("div")
        oc.className = "pickr-subs-c-container"
        var titleE = document.createElement("h1")
        titleE.innerHTML = title;
        oc.appendChild(titleE)
        var desc = document.createElement("p")
        desc.innerHTML = description;
        oc.appendChild(desc)
        o.appendChild(oc)
        o.addEventListener("click", onClick)
        return o;
    }

    function createCheckbox(title, onClick, first) {
        var o = document.createElement("div")
        o.className = "pickr-checkboxs-main"
        if(first) {
            o.className += " pickr-checkboxs-first"
        }
        var c = document.createElement("img")
        c.src = "/assets/site-assets/pixel-vfl73.gif"
        c.className = "pickr-checkbox"
        o.appendChild(c)
        var titleE = document.createElement("h1")
        titleE.className = "pickr-c-h1"
        titleE.innerHTML = title;
        o.appendChild(titleE)
        o.addEventListener("click", onClick)
        return o;
    }

    function classic_continue() {
        markPlaybackModeDone()
        $(".video-player-overlay").parentNode.removeChild(
            $(".video-player-overlay")
        )
        pickrLastState.ongoing = false;
        video.volume = pickrLastState.volume
        video.play()
    }

    function modern_showSubscreen() {
        pickrLastState.firstStateComplete = true;
        $(".saber-pickr-container").innerHTML = ""
        var container = $(".saber-pickr-container")

        var titleLabel = document.createElement("h1")
        titleLabel.className = "main-title"
        titleLabel.innerHTML = "any additional preferences?"
        container.appendChild(titleLabel)

        var o1 = createCheckbox("auto-enable HD", function() {
            if(pickrLastState.autohd == undefined
            || pickrLastState.autohd == null) {
                pickrLastState.autohd = false;
            }
            pickrLastState.autohd = !pickrLastState.autohd
            if(pickrLastState.autohd) {
                o1.className += " enabled"
            } else {
                o1.className = o1.className.split(" enabled").join("")
            }
        }, true)
        container.appendChild(o1)

        if(document.cookie
        && document.cookie.indexOf("playback_quality=2") !== -1) {
            pickrLastState.autohd = true;
            pickrLastState.initialAutoHd = true;
            o1.className += " enabled"
        }

        var o2 = createCheckbox("default HD to 1080p", function() {
            if(pickrLastState.def1080 == undefined
            || pickrLastState.def1080 == null) {
                pickrLastState.def1080 = false;
            }
            pickrLastState.def1080 = !pickrLastState.def1080
            if(pickrLastState.def1080) {
                o2.className += " enabled"
            } else {
                o2.className = o2.className.split(" enabled").join("")
            }
        })
        container.appendChild(o2)

        if(document.cookie
        && document.cookie.indexOf("hd_1080") !== -1) {
            pickrLastState.def1080 = true;
            pickrLastState.initialDef1080 = true;
            o2.className += " enabled"
        }

        var notice = document.createElement("span")
        notice.className = "pckr-int-notice"
        notice.innerHTML = "recommended internet speeds: 25Mbps+ for 720p, 55Mbps+ for 1080p<br>\
<br>\
those can be changed at any time:<br>\
- <a href=\"/account\" target=\"_blank\">auto-enable HD in Playback Setup tab</a>,<br>\
- <a href=\"/yt2009_flags.htm\" target=\"_blank\">hd_1080 in flags</a>."
        container.appendChild(notice)

        var saveBtnContainer = document.createElement("div")
        saveBtnContainer.style.textAlign = "center"
        var saveBtn = document.createElement("a")
        saveBtn.className = "yt-button yt-button-primary"
        var saveSpan = document.createElement("span")
        saveSpan.innerHTML = "save and refresh"
        saveBtn.appendChild(saveSpan)
        saveBtnContainer.appendChild(saveBtn)
        container.appendChild(saveBtnContainer)

        saveBtn.addEventListener("click", function() {
            var addAutohd = (
                pickrLastState.autohd
                && !pickrLastState.initialAutoHd
            )
            var add1080 = (
                pickrLastState.def1080
                && !pickrLastState.initialDef1080
            )
            var removeAutohd = (
                !pickrLastState.autohd
            )
            var remove1080 = (
                !pickrLastState.def1080
            )

            var wf = ""
            if(document.cookie
            && document.cookie.indexOf("; watch_flags=") !== -1) {
                wf = " " + document.cookie
                     .split(" watch_flags=")[1]
                     .split(";")[0]
            }
            wf += "exp_sabr:"
            document.cookie = " watch_flags=" + wf + "; " 
                              + "Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                              + "SameSite=Lax"

            if(removeAutohd) {
                document.cookie = "playback_quality=1; " 
                                + "Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                                + "SameSite=Lax"
            }
            if(remove1080) {
                var watchFlags = " " + document.cookie
                                 .split(" watch_flags=")[1]
                                 .split(";")[0]
                watchFlags = watchFlags.replace(":hd_1080:", "")
                watchFlags = watchFlags.replace("hd_1080:", "")
                watchFlags = watchFlags.replace(":hd_1080", "")
                document.cookie = "watch_flags=" + watchFlags + "; " 
                                + "Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                                + "SameSite=Lax"
            }
            if(addAutohd) {
                document.cookie = "playback_quality=2; " 
                                + "Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                                + "SameSite=Lax"
            }
            if(add1080) {
                var watchFlags = ""
                if(document.cookie
                && document.cookie.indexOf("watch_flags=") !== -1) {
                    watchFlags = document.cookie
                                    .split(" watch_flags=")[1]
                                    .split(";")[0];
                }
                watchFlags += "hd_1080:"
                document.cookie = "watch_flags=" + watchFlags + "; " 
                                + "Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT; "
                                + "SameSite=Lax"
            }
            markPlaybackModeDone()
            setTimeout(function() {
                var l = location.href.split("#")[0].split("&refreshed=1").join("")
                location.href = l + "&refreshed=1"
            }, 500)
        }, false)

        setTimeout(function() {
            positionPrompt2ndElements(o1, o2, parent)
            pickrLastState.w = parent.getBoundingClientRect().width
            var watcher = setInterval(function() {
                if(!pickrLastState.ongoing
                || pickrLastState.secondStateComplete) {
                    clearInterval(watcher)
                    return;
                }
                if(parent.getBoundingClientRect().width !== pickrLastState.w) {
                    positionPrompt2ndElements(o1, o2, parent)
                }
                pickrLastState.w = parent.getBoundingClientRect().width
            }, 250)
        }, 10)
    }

    function positionPromptFirstElements(o1, o2, parent) {
        var fw = parent.getBoundingClientRect().width

        var o1w = o1.getElementsByClassName("pickr-subs-c-container")[0]
                    .getBoundingClientRect().width
        o1w = Math.round(o1w) + 60
        var o1l = Math.floor((fw - o1w) / 2)
        o1.style.left = o1l + "px"

        
        var o2w = o2.getElementsByClassName("pickr-subs-c-container")[0]
                    .getBoundingClientRect().width
        o2w = Math.round(o2w) + 60
        var o2l = Math.floor((fw - o2w) / 2)
        o2.style.left = o2l + "px"
    }

    function positionPrompt2ndElements(o1, o2, parent) {
        var fw = parent.getBoundingClientRect().width

        var o1w = o1.getElementsByTagName("h1")[0]
                    .getBoundingClientRect().width
        o1w = Math.round(o1w) + 35
        var o1l = Math.floor((fw - o1w) / 2)
        o1.style.left = o1l + "px"

        
        var o2w = o2.getElementsByTagName("h1")[0]
                    .getBoundingClientRect().width
        o2w = Math.round(o2w) + 35
        var o2l = Math.floor((fw - o2w) / 2)
        o2.style.left = o2l + "px"
    }
    
    if(!playingAsLive && window.MediaSource
    && window.MediaSource.isTypeSupported("video/mp4; codecs=\"avc1.4D4028\"")
    && window.MediaSource.isTypeSupported("audio/mp4; codecs=\"mp4a.40.2\"")
    && document.cookie.indexOf("saber_playback_mode_picked=") == -1
    && document.cookie.indexOf("exp_sabr") == -1
    && parent !== document) {
        // show
        video.pause()
        video.volume = 0;
        overrideFallbackC = true;
        pickrLastState.ongoing = true;

        // generate pickr notice
    
        var overlay = document.createElement("div")
        overlay.className = "video-player-overlay"
        mainElement.appendChild(overlay)

        var container = document.createElement("div")
        container.className = "saber-pickr-container"
        overlay.appendChild(container)

        var titleLabel = document.createElement("h1")
        titleLabel.className = "main-title"
        titleLabel.innerHTML = "yt2009: pick playback type"
        container.appendChild(titleLabel)

        var subtitle = document.createElement("p")
        subtitle.innerHTML = "with the new yt2009 update, your browser can now\
        fully stream<br>videos on watchpages, without the need to store them."
        container.appendChild(subtitle)

        var o1 = createOption(
            "classic",
            "all videos need to be stored on the instance locally before playing them.<br>\
            preferable for old (approx. 2008 and older) hardware.<br>\
            more compatible but results in longer load times.",
            classic_continue,
            true
        )
        container.appendChild(o1)

        var o2 = createOption(
            "modern -- SABR",
            "videos are streamed directly in chunks without downloading.<br>\
            playback will start way faster, especially for longer videos.",
            modern_showSubscreen
        )
        container.appendChild(o2)

        var notice = document.createElement("span")
        notice.className = "pckr-int-notice"
        notice.innerHTML = "this can be changed at any time with the<br>\
<a href=\"/yt2009_flags.htm\" target=\"_blank\">exp_sabr flag.</a>"
        container.appendChild(notice)

        setTimeout(function() {
            positionPromptFirstElements(o1, o2, parent)
            pickrLastState.w = parent.getBoundingClientRect().width
            var watcher = setInterval(function() {
                if(!pickrLastState.ongoing
                || pickrLastState.firstStateComplete) {
                    clearInterval(watcher)
                    return;
                }
                if(parent.getBoundingClientRect().width !== pickrLastState.w) {
                    positionPromptFirstElements(o1, o2, parent)
                }
                pickrLastState.w = parent.getBoundingClientRect().width
            }, 250)
        }, 10)
    }
}


// caption time marks
function initChapterMarks(timeStamps, duration, labels) {
    if(document.cookie
    && document.cookie.indexOf("disable_chapters") !== -1) return;
    var stamps = document.createElement("div")
    stamps.className = "chapters-container"
    progressContainer.appendChild(stamps)
    var i = 0;
    timeStamps.forEach(function(t) {
        var c = document.createElement("div")
        c.className = "chapter"
        c.setAttribute("data-label", labels[i])
        var ownPopout = false;
        function createPopout() {
            if(ownPopout) return;
            ownPopout = document.createElement("span")
            ownPopout.className = "chapter-popout"
            ownPopout.innerHTML = c.getAttribute("data-label")
            mainElement.appendChild(ownPopout)
            var w = Math.floor(ownPopout.getBoundingClientRect().width);
            var x = Math.floor(c.getBoundingClientRect().left) + 3
            var relative = 0;
            if(mainElement.getBoundingClientRect) {
                relative = Math.floor(mainElement.getBoundingClientRect().left)
            }
            var left = Math.floor(x - (w / 2) - relative)
            if(left < 0) {
                left = 5;
            }
            ownPopout.style.left = left + "px"
        }
        function removePopout() {
            try {
                mainElement.removeChild(ownPopout)
                ownPopout = false;
            }
            catch(error) {}
        }
        c.addEventListener("mousemove", createPopout, false)
        c.addEventListener("mouseover", createPopout, false)
        c.addEventListener("mouseleave", removePopout, false)
        c.addEventListener("mouseout", removePopout, false)
        c.addEventListener("click", function() {
            skipAhead(t)
        })
        var left = Math.floor((t / duration) * 100)
        if(left > 100 || left < 0) return;
        c.style.left = left + "%"
        stamps.appendChild(c)
        i++
    })
}


// tag support
var modifierTags = ""
var usingModifiers = false;
var modifiersAdded = false;
// initModifiers is initially called and marks some values
// to apply mods on timeupdate (video is playing by then)
// otherwise videoWidth and videoHeight are 0 and can't apply mods
function initModifiers(modifiers) {
    modifierTags = modifiers;
    usingModifiers = true;
}
function loadModifierTags(source) {
    if(!video.videoWidth
    || !video.videoHeight) return;
    var modifiers = modifierTags.split(",")
    modifiersAdded = true;
    var vw = video.videoWidth;
    var vh = video.videoHeight;
    
    var transforms = []
    modifiers.forEach(function(tag) {
        switch(tag.split("#")[0]) {
            case "yt:stretch=4:3": {
                // squishes the vid to 4:3
                var newWidthPx = vh * (4 / 3)
                var scale = ((newWidthPx) / vw)
                scale = scale.toFixed(2)
                transforms.push("scaleX(" + scale + ")")
                break;
            }
            case "yt:stretch=16:9": {
                // stretches a vid to 16:9
                var newWidthPx = vh * (16 / 9)
                var scale = ((newWidthPx) / vw)
                scale = scale.toFixed(2)
                transforms.push("scaleX(" + scale + ")")
                break;
            }
            case "yt:crop=16:9": {
                // crops a 4:3 to fill the entire 16:9 view
                var newWidthPx = vw / (vw / vh) * (16 / 9)
                var scale = (newWidthPx / vw)
                scale = scale.toFixed(2)
                transforms.push("scale(" + scale + ")")
                break;
            }
            case "yt:cc=on": {
                // autoenable captions
                if(!captionsEnabled
                && (!source || source !== "autoadjust")) {
                    captionsMain()
                }
                break;
            }
            case "yt:quality=high": {
                // auto switch to high quality
                if((!window.hqPlaying
                && mainElement.querySelector(".hq")
                && !playingAsLive
                && !window.sabrData)
                || (window.sabrData && !window.sabrHd)
                && (!source || source !== "autoadjust")) {
                    // normal playback
                    try {
                        $(".video_controls .hq").click()
                    }
                    catch(error) {}
                }
                break;
            }
            case "yt:bgcolor=": {
                // set video element's bgcolor
                var ttag = tag;
                var colorHex = ttag.split("=#")[1]
                if(colorHex.length > 8) return;
                video.style.backgroundColor = "#" + colorHex
                break;
            }
        }
    })

    if(transforms.length >= 1) {
        video.style.transform = transforms.join(" ")
    }
}

function adjustModifiers(source) {
    switch(source) {
        case "FULLSCREEN_OPENED": {
            // letterbox stretched video if on a non-matching aspect ratio
            if(modifierTags && modifierTags.indexOf("yt:stretch=16:9") !== -1
            && (window.innerWidth / window.innerHeight) < 1.5) {
                var scale = (video.videoHeight / video.videoWidth)
                scale = scale.toFixed(2)
                video.style.transform = "scaleY(" + scale + ")"
            }
            break;
        }
        case "FULLSCREEN_CLOSED":
        default: {
            loadModifierTags("autoadjust")
            break;
        }
    }
}