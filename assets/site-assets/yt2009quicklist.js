// yt2009 common quicklist functionality.
// surprisingly, this frontend has been working
// for longer than i thought it would.
// just a random thought.
function addToQuicklist(videoId, videoTitle, videoAuthor) {
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
if(localStorage && localStorage.quicklistVids) {
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
        if(localStorage
        && localStorage.quicklistVids
        && JSON.parse(localStorage.quicklistVids).length == 0) {
            document.querySelector(".yt2009-ql-top").innerHTML = ""
            return;
        }
        document.querySelector(".yt2009-ql-top").innerHTML = r.responseText
        var videoIndex = 0;
        JSON.parse(localStorage.quicklistVids).forEach(function(video) {
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
&& JSON.parse(localStorage.quicklistVids).length > 0) {
    createQuicklistPanel();
}

// remove from quicklist
function removeFromQuicklist(element) {
    var a = element.parentNode.parentNode.querySelector("a")
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