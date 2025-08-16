var targetId = "yt2009-recommended-cells-container"

// use same script for /videos?r=1
var isVideosPage = false;
if(location.href.indexOf("/videos") !== -1) {
    isVideosPage = true;
    targetId = "browse-video-data"
}

// get videos (localstorage/cookie)
var videoIdString = ""
if(window.localStorage
&& localStorage.watch_history) {
    // get localStorage videos
    var videos = JSON.parse(localStorage.watch_history)
    videos.slice(0, 3).forEach(function(video) {
        videoIdString += video.id + ","
    })
    videoIdString.substring(0, videoIdString.length - 1)
} else if(document.cookie) {
    // get cookie videos
    if(document.cookie.indexOf("watch_history=") !== -1) {
        var h = decodeURIComponent(
            document.cookie.split("watch_history=")[1]
                           .split(";")[0]
        ).split(":");
        var videoIndex = 0;
        for(var i in h) {
            if(typeof(h[i]) == "string"
            && h[i].indexOf("&") !== -1
            && videoIndex < 3) {
                var id = h[i].split("&")[2]
                videoIndex++
                videoIdString += id + ","
            }
        }
        videoIdString.substring(0, videoIdString.length - 1)
    }
}

// if video page append clientside data to rss button
if(isVideosPage) {
    var newPart = "&sv=" + videoIdString
    if(document.cookie && document.cookie.indexOf("new_recommended") !== -1) {
        newPart += "&nr=1"
    }
    
    var ae = document.getElementsByTagName("*")
    for(var e in ae) {
        e = ae[e]
        if(e.className && e.className == "rsslink") {
            var href = e.getAttribute("href")
            e.setAttribute("href", href + newPart)
        }
    }
}

// make request
function homepageRequest() {
    var isListView = false;
    if(document.cookie
    && document.cookie.indexOf("reco_homepage_style=list") !== -1) {
        isListView = true;
    }
    if(isListView && !isVideosPage) {
        document.getElementById("REC-feedmodule-body").className = "feedmodule-body list-view"
    } else if(!isVideosPage) {
        document.getElementById("REC-feedmodule-body").className = "feedmodule-body grid-view"
    }


    var r;
    if (window.XMLHttpRequest) {
        r = new XMLHttpRequest()
    } else {
        r = new ActiveXObject("Microsoft.XMLHTTP");
    }
    r.open("GET", "/yt2009_recommended?r=" + Math.random().toString())
    r.setRequestHeader("ids", videoIdString)
    if(isVideosPage) {
        r.setRequestHeader("source", "recommended_page")
    }
    try {
        r.send(null)
        r.onreadystatechange = function(e) {
            if(r.readyState == 4 || this.readyState == 4 || e.readyState == 4) {
                // fill recommended with videos from server
                if(isVideosPage) {
                    setTimeout(function() {
                        document.getElementById("recommended-loading-sprite")
                                .style.display = "none"
                    }, 250)
                } else {
                    document.getElementById("recommended-loading-sprite")
                            .style.display = "none"
                }
                document.getElementById(targetId).innerHTML = r.responseText
                if(r.responseText.indexOf("YT2009_NO_DATA") !== -1
                && !isVideosPage) {
                    document.getElementById("feedmodule-REC").style.display = "none"
                }
            }
        }
    }
    catch(error) {}
}
homepageRequest()

function hpReload() {
    document.getElementById(targetId).innerHTML = ""
    homepageRequest()
}

// learn more
if(!isVideosPage) {
    document.getElementById("yt2009-rec-learn-more").onclick = function() {
        document.getElementById("logged_out_rec_learn_more_box")
                .style.display = "block"
    }
    
    document.getElementById("yt2009-rec-more-close").onclick = function() {
        document.getElementById("logged_out_rec_learn_more_box")
                .style.display = "none"
    }
}

// clientside pages (used if more data is sent immediately, e.g. pchelper)
function navClPage(pageNumber, pageCount) {
    for (var i = 0; i < pageCount; i++) {
        if(i == pageNumber) {
            document.getElementById("footer-pager-for-" + i)
                    .className = "searchFooterBox"
            var content = document.getElementById(
                "cs-video-grid-page-" + i
            );
            var className = content.className;
            content.className = className.split(" hid").join("")
        } else {
            document.getElementById("footer-pager-for-" + i)
                    .className = "searchFooterBox hid"
            var content = document.getElementById(
                "cs-video-grid-page-" + i
            );
            content.className += " hid"
        }
    }
}