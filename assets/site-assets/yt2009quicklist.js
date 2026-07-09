// yt2009 common quicklist functionality

var usesPchelper = (
    document.cookie
 && document.cookie.indexOf
 && document.cookie.indexOf("watchlater_sync") !== -1
)
var pchelperWl = []
var pchelperWlCallbacks = []
var pchelperWlFetching = false;

function addToQuicklist(videoId, videoTitle, videoAuthor) {
    if(usesPchelper) {
        var pchmr = new XMLHttpRequest();
        pchmr.open("POST", "/pchelper_playlists")
        pchmr.send("video=" + videoId + "&method=add_existing&playlist_id=WL")
        
        var video = {
            "title": decodeURIComponent(videoTitle),
            "id": videoId,
            "author": decodeURIComponent(videoAuthor)
        }
        pchelperWl.push(video)
        var qlNotification = document.querySelector("[data-id=\"" + videoId + "\"] .quicklist-inlist")
        qlNotification.className = qlNotification.className.replace("hid", "")

        // show quicklist on the sidebar
        if(location.href.indexOf("/watch") !== -1) {
            createQuicklistPanel();
        }

        // masthead functions
        updateQuicklistMasthead(pchelperWl.length);
        flashQuicklistMasthead();
        return;
    }
    if(window.localStorage) {
        var quicklistVids = []
        if(!localStorage.quicklistVids) {
            localStorage.quicklistVids = "[]"
        }
        var video = {
            "title": decodeURIComponent(videoTitle),
            "id": videoId,
            "author": decodeURIComponent(videoAuthor)
        }
        quicklistVids = JSON.parse(localStorage.quicklistVids)
        if(localStorage.quicklistVids.indexOf(videoId) !== -1) return;
        quicklistVids.push(video)
        localStorage.quicklistVids = JSON.stringify(quicklistVids)
        var qlNotification = document.querySelector("[data-id=\"" + videoId + "\"] .quicklist-inlist")
        qlNotification.className = qlNotification.className.replace("hid", "")

        // show quicklist on the sidebar
        if(location.href.indexOf("/watch") !== -1) {
            createQuicklistPanel();
        }

        // masthead functions
        updateQuicklistMasthead(quicklistVids.length);
        flashQuicklistMasthead();
        localStorage.quicklistVids = localStorage.quicklistVids
                                                .replace(",]", "]")
    } else {
        alert("quicklist not yet supported without localstorage. please remind me so i can get this done in the future!")
    }
}

function updateQuicklistMasthead(vidCount) {
    if(vidCount !== 0) {
        document.querySelector("#quicklist-nav").className
        = document.querySelector("#quicklist-nav").className
                    .split("hid").join("")
    } else {
        document.querySelector("#quicklist-nav").className += " hid"
    }
    document.querySelector("#quicklist-nav-count").innerHTML = vidCount;
}

// show the video count on masthead
if(usesPchelper) {
    pchelperWlCallbacks.push(function() {
        updateQuicklistMasthead(pchelperWl.length)
    })
} else if(window.localStorage && window.localStorage.quicklistVids) {
    var l = JSON.parse(localStorage.quicklistVids).length
    updateQuicklistMasthead(l)
}

function flashQuicklistMasthead() {
    var t = 0;
    var x = setInterval(function() {
        if(t % 2 == 0) {
            document.querySelector("#quicklist-nav").style
                    .backgroundColor = "rgb(255, 255, 255)"
        } else {
            document.querySelector("#quicklist-nav").style
                    .backgroundColor = "rgb(255, 255, 0)"
        }
        t++;
        if(t > 10) {
            clearInterval(x)
        }
    }, 500)
}

// if watchpage and there are quicklist videos,
// show the quicklist on the sidebar
function createQuicklistPanel() {
    var r = new XMLHttpRequest();
    r.open("GET", "/ql_html_template")
    r.send(null)
    r.addEventListener("load", function(e) {
        if((localStorage
        && localStorage.quicklistVids
        && JSON.parse(localStorage.quicklistVids).length == 0)
        || (usesPchelper && pchelperWl.length == 0)) {
            document.querySelector(".yt2009-ql-top").innerHTML = ""
            return;
        }
        if(!document.querySelector(".yt2009-ql-top")) return;
        document.querySelector(".yt2009-ql-top").innerHTML = r.responseText
        var videoIndex = 0;
        var videoSource = (
            usesPchelper
          ? pchelperWl
          : JSON.parse(localStorage.quicklistVids)
        ) || []
        videoSource.forEach(function(video) {
            document.querySelector(".yt2009-ql-videos").innerHTML += '\
            <div id="playlistRow_QL_' + videoIndex + '"\
                class="watch-playlist-row loading">\
				<a href="/watch?v=' + video.id + '" class="watch-playlist-row-link">\
					<div class="watch-playlist-index">\
						<span id="playlistRowIndex_QL_' + videoIndex + '"\
                            class="phIndex">' + (videoIndex + 1) + '</span>\
					</div>\
					<div class="watch-playlist-row-left">\
						<div class="v50WrapperOuter">\
							<div class="v50WrapperInner">\
								<img class="vimg50" \
                                    src="//i.ytimg.com/vi/' + video.id + '/hqdefault.jpg"\
                                    alt="" title="' + video.title + '"/>\
							</div>\
						</div>\
					</div>\
					<div class="watch-playlist-row-middle">\
						<div class="vtitle" title="' + video.title + '"\
                            style="text-decoration: underline;">\
                            ' + video.title + '</div>\
						<div class="vfacets phUsername"\
                            style="color: #000;">' + video.author + '</div>\
					</div>\
				</a>\
				<div class="watch-playlist-row-right">\
					<span class="watch-playlist-item-duration"></span>\
					<img class="watch-playlist-row-deleter"\
                        src="/assets/site-assets/pixel-vfl73.gif"\
                        onclick="removeFromQuicklist(this)" alt="">\
				</div>\
			</div>'
            videoIndex++;
        })
        document.querySelector("#playlistVideoCount_QL").innerHTML = videoIndex;
        updateQuicklistMasthead(videoIndex)
    }, false)
}
if(location.href.indexOf("/watch") !== -1
&& window.localStorage
&& localStorage.quicklistVids
&& JSON.parse(localStorage.quicklistVids).length > 0
&& !usesPchelper) {
    createQuicklistPanel();
} else if(usesPchelper
&& location.href.indexOf("/watch") !== -1) {
    pchelperWlCallbacks.push(function() {
        createQuicklistPanel();
    })
}

// remove from quicklist
function removeFromQuicklist(element) {
    var a = element.parentNode.parentNode.querySelector("a")
    if(usesPchelper) {
        var id = a.getAttribute("href").split("?v=")[1]
        var pchrr = new XMLHttpRequest();
        pchrr.open("POST", "/pchelper_playlists")
        pchrr.send("video_ids=" + id + "&method=remove_videos&playlist_id=WL")
        pchelperWl = pchelperWl.filter(function(e) {
            return e && e.id !== id
        })
        createQuicklistPanel();
        updateQuicklistMasthead(pchelperWl.length)
        return;
    }
    var videoElement = {
        "title": a.querySelector(".vtitle").innerHTML.trimLeft(),
        "id": a.getAttribute("href").split("?v=")[1],
        "author": a.querySelector(".phUsername").innerHTML
    }
    var v = JSON.stringify(videoElement)
    if(localStorage.quicklistVids.indexOf(v + ",") !== -1) {
        localStorage.quicklistVids = localStorage.quicklistVids
                                                    .replace(v + ",", "")
    } else {
        localStorage.quicklistVids = localStorage.quicklistVids
                                                    .replace(v, "")
    }
    localStorage.quicklistVids = localStorage.quicklistVids.replace(",]", "]")
    createQuicklistPanel();
    updateQuicklistMasthead(JSON.parse(localStorage.quicklistVids).length)
}


// pchelper get watchlater
if(usesPchelper) {
    pchelperWlFetching = true;
    var pwr = new XMLHttpRequest();
    pwr.open("GET", "/pchelper_wl?r=" + Math.random())
    pwr.send(null)
    pwr.addEventListener("load", function(e) {
        try {
            pchelperWl = JSON.parse(pwr.responseText)
        }
        catch(error) {pchelperWl = [];}
        if(pchelperWlCallbacks.length >= 1) {
            pchelperWlCallbacks.forEach(function(c) {
                c()
            })
        }
    }, false)
}

// clear ql
function clearQuicklist() {
    if(usesPchelper) {
        var ids = pchelperWl.map(function(s) {
            return s && s.id
        }).filter(function(s) {return s})
        var pcrmr = new XMLHttpRequest();
        pcrmr.open("POST", "/pchelper_playlists")
        var requestData = [
            "video_ids=" + ids.join(","),
            "method=remove_videos",
            "playlist_id=WL"
        ].join("&")
        pcrmr.send(requestData)
        pcrmr.addEventListener("load", function() {
            if(window.quicklistClear) {
                location.reload()
            }
        }, false)
        pchelperWl = []

        // show quicklist on the sidebar
        if(location.href.indexOf("/watch") !== -1) {
            createQuicklistPanel();
        }

        // masthead functions
        updateQuicklistMasthead(pchelperWl.length);
        flashQuicklistMasthead();
        return;
    }
}

// yt2009-local playlist from quicklist
function playlistCreateYT9(videos) {
    var ids = videos.map(function(s) {
        return s && s.id
    }).filter(function(s) {return s})
    if(!ids[0]) {
        alert("No videos in your QuickList!")
        return;
    }
    var yt9r = new XMLHttpRequest();
    yt9r.open("POST", "/create_playlist?r=" + Math.random())
    yt9r.setRequestHeader("videos", ids.join(";"))
    yt9r.setRequestHeader("playlist_name", "Saved QuickList")
    yt9r.send(null)
    yt9r.addEventListener("load", function() {
        var pid = yt9r.responseText;
        location.href = "/watch?v=" + ids[0] + "&list=" + pid
    }, false)
}
function createWlPl() {
    // general
    if(usesPchelper) {
        playlistCreateYT9(pchelperWl)
    } else {
        playlistCreateYT9(JSON.parse(localStorage.quicklistVids))
    }
}
function playFirstVideo() {
    // ql page
    createWlPl()
}
function createPlaylistFromQuicklist() {
    // watchpage
    createWlPl()
}