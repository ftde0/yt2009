// further code quality improvements in the future,
// minor changes for now
// 2023-07-21

// one day.. 2025-03-08

// zmiana strony
// 2009 style
function switchPage(num) {
    var currentView = document.querySelector(
        "#grid-view:not(.hid), #expand-view:not(.hid)"
    )
    // currently open page
    var currentPage = 0;

    var s = currentView.querySelector(".videos-page:not(.hid)")
    var pages = nlToArray(currentView.querySelectorAll(".videos-page"))
    currentPage = parseInt(s.className.split("videos-page-")[1].split(" ")[0])

    // what page to open
    var targetPage = 0;

    if(num == "l") {
        targetPage = pages.length - 1;
    } else if(num == "f") {
        targetPage = 0;
    } else {
        targetPage = currentPage + num;
    }

    if(targetPage == -1
    || !currentView.querySelector(".videos-page-" + targetPage)) return;

    // hide other pages
    nlToArray(
        currentView.querySelectorAll(".videos-page")
    ).forEach(function(p) {
        if(p.className.indexOf("hid") !== -1) return;
        p.className += " hid"
    })

    // show target
    s = pages[targetPage]
    s.className = s.className.split("hid").join("")

    var pString = "Page " + (targetPage + 1) + " - " + nlToArray(
        currentView.querySelectorAll(".videos-page")
    ).length
    // update page numbers
    document.querySelector("#yt2009-page-n1").innerHTML = pString;
    document.querySelector("#yt2009-page-n2").innerHTML = pString;

    // other views
    switch(currentView.id) {
        case "expand-view": {
            expandViewFetchPage(targetPage)
            break;
        }
    }
}

// clear history
function viewingHistoryClear() {
    var c = "watch_history=; Path=/; expires=Fri, 31 Dec 2009 23:59:59 GMT"
    document.cookie = c;
    localStorage.watch_history = "[]"
    location.reload();
}

// browse subscribed channels
function switchChannel(element) {
    // temporarily switch to grid for fetching
    var usingOtherView = false;
    if(getCurrentView() !== "grid") {
        try {
            usingOtherView = getCurrentView()
            document.querySelector("#view-toggle .grid").click()
        }
        catch(error){}
    }

    var url = element.getAttribute("data-url")
    var username = element.querySelector(".name").innerHTML

    var videos_element = document.querySelector(".yt2009-video-list-hook")

    // classname .selected, remove from others, add to needed ones
    var s = document.querySelectorAll(".channel-subfolder.selected")
    for(var sel in s) {
        try {
            s[sel].className = s[sel].className.replace(" selected", "")
        }
        catch(error) {}
    }

    
    element.className += " selected"

    // loading anim
    videos_element.innerHTML = "<img src=\"/assets/site-assets/icn_loading_animated-vfl24663.gif\" style=\"text-align: center;padding: 50px 50px;position: relative;left: 300px;\">"


    // fetch new videos
    var r = new XMLHttpRequest();
    r.open("GET", "/subscriptions_new_videos?r=" + Math.random().toString())
    r.setRequestHeader("url", url)
    r.send(null)
    r.addEventListener("load", function(e) {
        // html sent from server
        videos_element.innerHTML = r.responseText

        document.querySelector(".yt2009-sub-header").innerHTML = "<div class=\"pager\"></div><a href=\"" + url + "\"><h2>" + username + "</h2></a>"

        // otherview adapt
        setTimeout(function() {
            switch(usingOtherView) {
                case "expand": {
                    document.querySelector("#view-toggle .expand").click()
                    break;
                }
                case "list": {
                    document.querySelector("#view-toggle .list").click()
                    break;
                }
            }
        }, 250)
    }, false)
}

// clear localstorage data
if(window.localStorage) {
    if(location.href.indexOf("my_subscriptions") !== -1) {
        subscription_handle();
    } else if(location.href.indexOf("my_playlists") !== -1) {
        playlists_handle();
    }


    var storageObject = []
    var page_html = []
    var page_index = 0;
    var current_page_item_count = 0;
    var s = document.querySelectorAll(".videos-page-0 .video")
    for(var sel in s) {
        try {
            if(s[sel].className) {
                current_page_item_count++;
            }
        }
        catch(error) {}
    }
    var current_page_items_max = 20 - current_page_item_count

    var thumbUrl = "hqdefault.jpg"
    if(document.cookie.indexOf("autogen_thumbnail") !== -1) {
        thumbUrl = "1.jpg"
    }
    
    var path = location.pathname.split("?")[0].split("&")[0]
    switch(path) {
        case "/my_favorites": {
            storageObject = JSON.parse(localStorage.favorites)
            if(storageObject[0] !== "PCHELPER_MANAGED") {
                buildList()
            } else {
                storageObject = []
                buildList()
            }
            break;
        }
        case "/my_history": {
            storageObject = JSON.parse(localStorage.watch_history)
            buildList()
            break;
        }
        case "/watch_queue":
        case "/my_quicklist": {
            storageObject = JSON.parse(localStorage.quicklistVids || "[]")
            if(!storageObject || storageObject.length == 0) {
                setTimeout(function() {
                    qlNoVidsShow()
                }, 100)
            } else {
                var nv = document.getElementById("novids-template")
                nv.parentNode.removeChild(nv)
            }
            buildList()
            break;
        }
    }

    // add html
    function buildList() {
        if(!document.querySelector(".videos-page-0")) {
            prepNewPage();
        }
    
        var viewPrefix = "Views: "
        if(window["lsViewStringPrefix"]) {
            viewPrefix = lsViewStringPrefix
        }
    
        storageObject.reverse().forEach(function(video) {
            if(!video.id) return;
            if(current_page_item_count >= current_page_items_max) {
                // create new pages
                current_page_items_max = 20;
                current_page_item_count = 0;
                prepNewPage();
            }
            var fullThumbUrl = location.protocol + '//i.ytimg.com/vi/'
                            + video.id + '/' + thumbUrl
            if(document.cookie.indexOf("thumbnail_proxy") !== -1) {
                fullThumbUrl = "/thumb_proxy?v=" + video.id
            }
    
            document.querySelector(".videos-page-0 td").innerHTML = '\
        <div class="video" style="float: left; margin: 15px 0 0 0; padding: 10px 0 10px 10px; width: 150px;">\
            <div style="float: left;">\
                <div style="float: left;">\
                    <input type="checkbox" class="checkbox" value="' + video.id + '" />\
                </div>\
            </div>\
            <div style="float: left; width: 120px;">\
                <a href="/watch?v=' + video.id + '" class="video-thumb"><img src="' + fullThumbUrl + '"/></a>\
                <a href="/watch?v=' + video.id + '" class="title" style="display: block; color: #03c;">' + video.title + '</a>\
                <div class="video-stats">\
                    ' + (video.views ? '<div class="video-stat' + (path == "/watch_queue" ? " hid" : "") + '"><span class="stat-views">' + viewPrefix + video.views + '</span></div>' : '') + '\
                    <div class="video-stat"><span class="stat-rating"><img class="yt-rating-5.0" src="/assets/site-assets/pixel-vfl73.gif" alt="5.0" /></span></div>\
                </div>\
            </div>\
        </div>' + document.querySelector(".videos-page-0 td").innerHTML
            current_page_item_count++;
        })
    
        localStoragePagingPatch()
    }
}

// new page
function prepNewPage() {
    pageShift(1)

    var newPage = document.createElement("tbody")
    newPage.className = "videos-page videos-page-0"
    newPage.id = "videos"
    newPage.innerHTML = '<tr><td colspan="2"></td></tr>'
    var html = document.querySelector("#table").innerHTML;
    html = html.split("</thead>").join(
        '</thead>\
            <tbody id="videos" class="videos-page videos-page-0">\
            <tr><td colspan="2"></td></tr>\
        </tbody>'
    )
    document.querySelector("#table").innerHTML = html

    
    // update numbers
    try {
        var s = document.querySelectorAll(".videos-page")
        var pageString = "Page 1 - " + s.length
        document.querySelector("#yt2009-page-n1").innerHTML = pageString
        document.querySelector("#yt2009-page-n2").innerHTML = pageString
    }
    catch(error) {}
}

// shift each page 1 number
function pageShift(number) {
    var s = document.querySelectorAll(".videos-page")
    for(var sel in s) {
        try {
            if(s[sel].className) {
                var pageNumber = s[sel].className
                                 .split("videos-page-")[1]
                                 .trimRight();
                s[sel].className = "videos-page videos-page-"
                                 + (parseInt(pageNumber) + number)
                                 + " hid"
            }
        }
        catch(error) {}
    }
}

// patch: if the first video page isn't full make it full
// by shifting videos between pages
function nlToArray(nl) {
    var array = []
    var s = nl
    for(var e in s) {
        if(s[e].tagName) {
            array.push(s[e])
        }
    }
    return array;
}

function localStoragePagingPatch() {
    var videoCount = nlToArray(
        document.querySelectorAll(".videos-page-0 .video")
    ).length
    var videosToShift = 20 - videoCount

    var pageCount = nlToArray(document.querySelectorAll(".videos-page")).length
    var temp = 0;
    while(temp !== pageCount) {
        shiftFromNextPage(temp, videosToShift)
        temp++;
    }

    // remove empty pages
    nlToArray(document.querySelectorAll(".videos-page")).forEach(function(p) {
        if(nlToArray(p.querySelectorAll(".video")).length <= 0) {
            p.parentNode.removeChild(p)
        }
    })
    // update numbers
    try {
        var s = document.querySelectorAll(".videos-page")
        var pageString = "Page 1 - " + s.length
        document.querySelector("#yt2009-page-n1").innerHTML = pageString
        document.querySelector("#yt2009-page-n2").innerHTML = pageString
    }
    catch(error) {}
}

function shiftFromNextPage(page, count) {
    var videosToAdd = nlToArray(document.querySelectorAll(
        ".videos-page-" + (page + 1) + " .video"
    )).slice(0, count)
    videosToAdd.forEach(function(v) {
        var vClone = v.cloneNode(true)
        document.querySelector(".videos-page-" + page + " td")
                .appendChild(vClone)
        v.parentNode.removeChild(v)
    })
}

// select/unselect all
function selectAllItems() {
    var s = document.querySelectorAll('input[type="checkbox"]')
    for(var sel in s) {
        s[sel].checked = true;
    }
}

function deselectAllItems() {
    var s = document.querySelectorAll('input[type="checkbox"]')
    for(var sel in s) {
        s[sel].checked = false;
    }
}

// localstorage subs
function subscription_handle() {
    var html = ""
    JSON.parse(localStorage.subscriptions).forEach(function(sub) {
        if(!sub.url) return;
        var url = sub.url
        if(sub.id) {
            url = "/channel/" + sub.id
        }
        html += '<div class="subfolder channel-subfolder" onclick="switchChannel(this)" data-url="' + url + '"><a class="name" href="#">' + sub.creator + '</a></div>'
    })

    document.querySelector(".secondary-subscription-list").innerHTML += html
}

// localstorage playlists
function playlists_handle() {
    // add index subfolders
    var playlistIndex = JSON.parse(localStorage.playlistsIndex)
    playlistIndex.forEach(function(playlist) {
        document.querySelector(".subfolder-container").innerHTML +=
        "<div class=\"subfolder\" data-id=\""
        + playlist.id
        + "\" onclick=\"show_playlist_localstorage(this)\"><a class=\"name\" href=\"#\">"
        + playlist.name
        + "</a></div>"
    })

    if(document.querySelector(".subfolder")) {
        document.querySelector(".subfolder").className = "subfolder selected"
        show_playlist_localstorage(document.querySelector(".subfolder"))
    }

    // list/grid switchr
    playlistsViewSwitchrs()
}

// switch playlist
function show_playlist_localstorage(playlist) {
    // show .selected
    document.querySelector(".subfolder.selected").className = "subfolder"
    playlist.className = "subfolder selected"

    // temp switch to listview for fetch
    var switchToGrid = false;
    if(getCurrentView() == "grid") {
        switchToGrid = true;
        document.querySelector("#list-view tbody").innerHTML = ""
        document.querySelector(".list").click()
    }

    // render videos
    var playlistId = playlist.getAttribute("data-id")
    var playlistVideos = []
    if(!localStorage["playlist-" + playlistId]) {
        // most likely youtube playlist, need fetch
        if(document.cookie
        && document.cookie.indexOf("pchelper_user") !== -1
        && document.cookie.indexOf("playlists_sync") !== -1) {
            // pull playlist as pchelper user in case its privat or smth
            var r = new XMLHttpRequest();
            r.open(
                "GET", 
                "/pchelper_playlist?playlist=" + playlistId + "&format=modern"
            )
            r.send(null)
            r.addEventListener("load", function(e) {
                playlistVideos = JSON.parse(r.responseText)
                onVideosReady()
            }, false)
        } else {
            // this shouldn't ever trigger but it might
            var r = new XMLHttpRequest();
            r.open(
                "GET", 
                "/nonpch_playlist?playlist=" + playlistId + "&format=modern"
            )
            r.send(null)
            r.addEventListener("load", function(e) {
                playlistVideos = JSON.parse(r.responseText)
                onVideosReady()
            }, false)
        }
    } else {
        playlistVideos = JSON.parse(localStorage["playlist-" + playlistId])
        onVideosReady()
    }
    
    function onVideosReady() {
        var playlistVideosHTML = ""
        var playlistVideoIndex = 0;

        var thumbUrl = "hqdefault.jpg"
        if(document.cookie.indexOf("autogen_thumbnail") !== -1) {
            thumbUrl = "1.jpg"
        }

        playlistVideos.forEach(function(video) {
            if(yt2009_used_lang !== "English") {
                try {
                    var temp = new Date(video.date)
                    var y = temp.getFullYear()
                    var m = temp.getMonth() + 1
                    if(m < 10) {
                        m = "0" + m
                    }
                    var d = temp.getDate()
                    if(d < 10) {
                        d = "0" + d
                    }
                    video.date = y + "-" + m + "-" + d
                }
                catch(error) {}
            }
            var fullThumbUrl = location.protocol + '//i.ytimg.com/vi/'
                                + video.id + '/' + thumbUrl
            if(document.cookie.indexOf("thumbnail_proxy") !== -1) {
                fullThumbUrl = "/thumb_proxy?v=" + video.id
            }
            playlistVideosHTML += '\
            <tr class="video ' + (playlistVideoIndex % 2 == 0 ? "even" : "odd") + '" data-videoid="' + video.id + '">\
                <td id="heading-check" class="first heading">\
                    <div><input id="all-items-checkbox" type="checkbox" onclick="" data-videoid="' + video.id + '"/></div>\
                </td>\
                <td id="heading-position" class="heading">\
                    <div style="text-align: center;"><a href="#" style="text-align: center;font-size: 14px;"><b>' + (playlistVideoIndex + 1) + '</b></a></div>\
                </td>\
                <td id="heading-title" class="heading">\
                    <button title="" class="master-sprite"></button>\
                    <a href="/watch?v=' + video.id + '" style="height: 40px;overflow: hidden;" rel="nofollow"><img src="' + fullThumbUrl + '"></a>\
                    <a href="/watch?v=' + video.id + '" class="video-title">' + video.title + '</a>\
                </td>\
                <td id="heading-time" class="heading">\
                    <div>' + video.time + '</div>\
                </td>\
                <td id="heading-date" class="heading">\
                    <div>' + video.date + '</div>\
                </td>\
                <td id="heading-views" class="heading">\
                    <div>' + video.viewCount + '</div>\
                </td>\
                <td id="heading-rating" class="heading">\
                    <div><div class="video-stat"><span class="stat-rating"><img class="yt-rating-' + video.rating + '" src="/assets/site-assets/pixel-vfl73.gif" alt="' + video.rating + '" /></span></div></div>\
                </td>\
            </tr>'
            playlistVideoIndex++;
        })

        document.querySelector(".yt2009-videos-insert").innerHTML = playlistVideosHTML

        if(switchToGrid) {
            setTimeout(function() {
                document.querySelector(".grid").click()
            }, 100)
        }
    }
}

// play all
// create a playlist with our videos with the server

var pchelperFavPage = (
    location.href.indexOf("my_favorites") !== -1
    && document.cookie
    && document.cookie.indexOf("playlists_sync") !== -1
)

var pchelper_global_playlist_id = ""
if(pchelperFavPage) {
    pchelper_global_playlist_id = document.getElementById("pchelper-fav-id").innerHTML
}

if(document.querySelector("#playlist-btn-play")) {
    document.querySelector("#playlist-btn-play")
    .addEventListener("click", function() {
        // request data
        var playlistName = document.querySelector(".subfolder.selected")
                            .innerHTML;
        var videos = ""
    
        var s = document.querySelectorAll(".video")
        for(var sel in s) {
            try {
                videos += s[sel].getAttribute("data-videoid") + ";"
            }
            catch(error) {}
        }
    
        // a request creating a playlist ID. once we get that,
        // redirect to the watchpage with a
        // &list= parameter containing our custom ID
        var r = new XMLHttpRequest();
        r.open("POST", "/create_playlist")
        r.setRequestHeader("videos", videos)
        r.setRequestHeader("playlist_name", playlistName)
        r.send(null)
        r.addEventListener("load", function(e) {
            // dopełnianie htmla wysłanego z serwera
            location.href = "/watch?v=" + videos.split(";")[0]
                            + "&list=" + r.responseText
        }, false)
    }, false)
    
    // remove picked video(s) from the playlist
    document.querySelector("#playlist-btn-remove")
            .addEventListener("click", function() {
        var playlistId = ""
        if(!pchelperFavPage) {
            playlistId = document.querySelector(".subfolder.selected")
                                 .getAttribute("data-id")
        } else {
            playlistId = pchelper_global_playlist_id;
        }
        var s = document.querySelectorAll('input[type="checkbox"]')
        var videoQueue = [] //pchelper only
        for(var sel in s) {
            if(s[sel].checked && s[sel].getAttribute("data-videoid")) {
                if(document.cookie
                && document.cookie.indexOf("playlists_sync") !== -1) {
                    // pchelper -- push to queue
                    videoQueue.push(s[sel].getAttribute("data-videoid"))
                } else {
                    // non-pchelper -- delete as it goes
                    var videoElement = {}
                    var playlistVideos = JSON.parse(
                        localStorage["playlist-" + playlistId]
                    )
                    playlistVideos.forEach(function(video) {
                        if(video.id == s[sel].getAttribute("data-videoid")) {
                            videoElement = video;
                        }
                    })
        
                    localStorage["playlist-" + playlistId] = localStorage[
                        "playlist-" + playlistId
                    ].replace(JSON.stringify(videoElement), "")
        
                    // poprawianie jsona
                    localStorage["playlist-" + playlistId] = localStorage[
                        "playlist-" + playlistId
                    ].replace("[,", "[").replace(",]", "]")
                }
            }
        }

        function onDelete() {
            // update the playlist
            if(pchelperFavPage) {
                location.reload()
                return;
            }

            show_playlist_localstorage(
                document.querySelector(".subfolder.selected")
            )
        }

        // request delete with pchelper
        if(videoQueue.length >= 1) {
            var pchelperRequest = [
                "method=remove_videos",
                "playlist_id=" + playlistId,
                "video_ids=" + videoQueue.join(",")
            ].join("&")

            var r = new XMLHttpRequest();
            r.open("POST", "/pchelper_playlists")
            r.send(pchelperRequest)
            r.addEventListener("load", function(e) {
                onDelete()
            }, false)
        } else {
            onDelete()
        }
    }, false)
}

// clear quicklist
function quicklistClear() {
    localStorage.quicklistVids = "[]"
    location.reload()
}

function removeSelectedFromQuicklist() {
    // get the list of selected videos
    var videoIds = []
    var s = document.querySelectorAll(".video")
    for(var e in s) {
        try {
            if(s[e].querySelector(".checkbox").checked) {
                videoIds.push(s[e].querySelector(".checkbox").value)
            }
        }
        catch(error) {}
    }

    // remove em
    var ql = JSON.parse(localStorage.quicklistVids)
    ql.forEach(function(vid) {
        if(videoIds.indexOf(vid.id) !== -1) {
            ql = ql.filter(function(s) {
                return s !== vid
            })
        }
    })
    localStorage.quicklistVids = JSON.stringify(ql)
    location.reload()
}

// expand view
// create a server request that returns html and fill that in
if(document.querySelector("#view-toggle .expand")) {
    document.querySelector("#view-toggle .expand")
            .addEventListener("click", function() {
        var currentPage;
        var pageIndex = 0;
        try {
            currentPage = document.querySelector(".videos-page:not(.hid)")
            pageIndex = currentPage.className
                            .split("videos-page-")[1]
                            .split(" ")[0]
        }
        catch(error) {
            try {
                currentPage = document.querySelector("#videos")
                if(document.querySelector("#expand-view tbody")) {
                    document.querySelector("#expand-view table").removeChild(
                        document.querySelector("#expand-view tbody")
                    )
                }
            }
            catch(e) {}
        }
        // create expand view container if needed
        if(!document.querySelector("#expand-view")) {
            var e = document.createElement("div")
            e.id = "expand-view"
            document.querySelector(".view").appendChild(e)

            // create table as container
            var table = document.createElement("table")
            table.id = "table"
            e.appendChild(table)
            
            // create thead and tbody for all pages
            var thead = document.querySelector("#grid-view thead")
                                .cloneNode(true)
            table.appendChild(thead)
            var pageCount = nlToArray(document.querySelectorAll(".videos-page"))
                            .length
            var temp = 0;
            while(temp !== pageCount) {
                var tbody = document.createElement("tbody")
                tbody.id = "videos"
                tbody.className = "videos-page videos-page-" + temp
                if(pageIndex !== temp.toString()) {
                    tbody.className += " hid"
                }
                temp++;
                table.appendChild(tbody)

                // tbody tr & td containing videos
                var tr = document.createElement("tr")
                tbody.appendChild(tr)

                var td = document.createElement("td")
                td.setAttribute("colspan", "2")
                tr.appendChild(td)
            }

            // move footer
            var footerP = document.querySelector(".view")
            var footerC = document.querySelector(".view .footer").cloneNode(true)
            footerP.appendChild(footerC)
            footerP.removeChild(footerP.querySelector(".footer"))
        }

        // hide other view(s)
        document.querySelector("#grid-view").className += " hid"
        if(document.querySelector("#list-view")
        && document.querySelector("#list-view").className.indexOf(" hid") == -1) {
            document.querySelector("#list-view").className += " hid"
        }
        var expand = document.querySelector("#expand-view")
        expand.className = expand.className.split("hid").join("")
        document.querySelector("#view-toggle .expand")
                .className = "expand-selected"
        if(document.querySelector(".grid-selected")) {
            document.querySelector("#view-toggle .grid-selected")
                    .className = "grid"
        }

        // get videos to be fetched for a page
        var videos = nlToArray(currentPage.querySelectorAll(".video"))
        var videoIds = ""
        videos.forEach(function(v) {
            if(v.querySelector(".title")) {
                videoIds += v.querySelector(".title").href.split("?v=")[1] + ","
            } else if(v.querySelector(".video-title")) {
                videoIds += v.querySelector(".video-title").href.split("?v=")[1] + ","
            }
        })

        // request expand view html for selected page
        var r = new XMLHttpRequest();
        r.open("GET", "/userpage_view?r=" + Math.random())
        r.setRequestHeader("videos", videoIds)
        r.setRequestHeader("view", "expand")
        r.send(null)
        r.addEventListener("load", function(e) {
            var page = document.querySelector(
                "#expand-view .videos-page-" + pageIndex
            )
            if(page) {
                page.innerHTML = r.responseText
            } else {
                document.querySelector("#expand-view table").innerHTML = ""
                var vdata = document.createElement("tbody")
                vdata.innerHTML = r.responseText
                document.querySelector("#expand-view table").appendChild(vdata)
            }
        }, false)
    }, false)
}

function expandViewFetchPage(page) {
    var pageIndex = page;
    page = document.querySelector("#expand-view .videos-page-" + page)
    var videoIds = ""
    nlToArray(document.querySelectorAll(
        "#grid-view .videos-page-" + pageIndex + " .video"
    )).forEach(function(v) {
        videoIds += v.querySelector(".title").href.split("?v=")[1] + ","
    })
    if(!page.querySelector(".video")) {
        var r = new XMLHttpRequest();
        r.open("GET", "/userpage_view?r=" + Math.random())
        r.setRequestHeader("videos", videoIds)
        r.setRequestHeader("view", "expand")
        r.send(null)
        r.addEventListener("load", function(e) {
            page.innerHTML = r.responseText
        }, false)
    }
}

// list view if available (unpaged only)
if(document.querySelector("#view-toggle .list")) {
    document.querySelector("#view-toggle .list")
            .addEventListener("click", function() {
        var currentPage = document.querySelector("#grid-view")
        var pageIndex = 0;
        // create expand view container if needed
        if(!document.querySelector("#list-view")) {
            var e = document.createElement("div")
            e.id = "list-view"
            document.querySelector(".view").appendChild(e)

            // create table as container
            var table = document.createElement("table")
            table.id = "table"
            e.appendChild(table)
            
            // create thead and tbody for all pages
            var thead = document.querySelector("#grid-view thead")
                                .cloneNode(true)
            thead.innerHTML = '<tr id="headings"><td id="heading-check" class="first heading"><div><input id="all-items-checkbox" type="checkbox" onclick="if (this.checked == true) { selectAllItems(\'videos\'); } else { deselectAllItems(\'videos\'); };"></div></td><td id="heading-position" class="heading"><div><a href="#">Position</a></div></td><td id="heading-title" class="heading"><div><a href="#">Title</a></div></td><td id="heading-time" class="heading"><div><a href="#">Time</a></div></td><td id="heading-date" class="heading"><div><a href="#">Date Added</a></div></td><td id="heading-views" class="heading"><div><a href="#">Views</a></div></td><td id="heading-rating" class="heading"><div><a href="#">Rating</a></div></td></tr>'
            table.appendChild(thead)

            var tbody = document.createElement("tbody")
            tbody.id = "videos"
            tbody.className = "videos-page videos-page-0"
            table.appendChild(tbody)

            // tbody tr & td containing videos
            var tr = document.createElement("tr")
            tbody.appendChild(tr)

            var td = document.createElement("td")
            td.setAttribute("colspan", "2")
            tr.appendChild(td)

            // move footer
            var footerP = document.querySelector(".view")
            var footerC = document.querySelector(".view .footer").cloneNode(true)
            footerP.appendChild(footerC)
            footerP.removeChild(footerP.querySelector(".footer"))
        }

        // hide other view(s)
        document.querySelector("#grid-view").className += " hid"
        if(document.querySelector("#expand-view")
        && document.querySelector("#expand-view").className.indexOf(" hid") == -1) {
            document.querySelector("#expand-view").className += " hid"
        }
        var list = document.querySelector("#list-view")
        list.className = list.className.split("hid").join("")
        document.querySelector("#view-toggle .list")
                .className = "list-selected"
        if(document.querySelector(".grid-selected")) {
            document.querySelector("#view-toggle .grid-selected")
                    .className = "grid"
        }
        if(document.querySelector(".expand-selected")) {
            document.querySelector("#view-toggle .expand-selected")
                    .className = "expand"
        }

        // get videos to be fetched for a page
        var videos = nlToArray(currentPage.querySelectorAll(".video"))
        var videoIds = ""
        videos.forEach(function(v) {
            if(v.querySelector(".title")) {
                videoIds += v.querySelector(".title").href.split("?v=")[1] + ","
            } else if(v.querySelector(".video-title")) {
                videoIds += v.querySelector(".video-title").href.split("?v=")[1] + ","
            }
        })

        // request expand view html for selected page
        var r = new XMLHttpRequest();
        r.open("GET", "/userpage_view?r=" + Math.random())
        r.setRequestHeader("videos", videoIds)
        r.setRequestHeader("view", "list")
        r.send(null)
        r.addEventListener("load", function(e) {
            var page = document.querySelector(
                "#list-view .videos-page-" + pageIndex
            )
            if(page) {
                page.innerHTML = r.responseText
            } else {
                var vdata = document.createElement("tbody")
                vdata.innerHTML = r.responseText
                document.querySelector("#expand-view table").appendChild(vdata)
            }
        }, false)
    }, false)
}

// switch back to grid view
if(document.querySelector("#view-toggle .grid-selected")) {
    document.querySelector("#view-toggle .grid-selected")
            .addEventListener("click", function() {
        // get currently open page
        var currentView = document.querySelector(
            "#expand-view:not(.hid)"
        )
        var s;
        var currentPage;
        var targetPage;
        try {
            s = currentView.querySelector(".videos-page:not(.hid)")
            currentPage = s.className.split("videos-page-")[1].split(" ")[0]
            targetPage = document.querySelector(
                "#grid-view .videos-page-" + currentPage
            )
            // hide the previously open pages on grid-view
            // show the needed one
            nlToArray(
                document.querySelectorAll("#grid-view .videos-page")
            ).forEach(function(p) {
                if(p.className.indexOf("hid") !== -1) return;
                p.className += " hid"
            })
        }
        catch(error) {
            // unpaged view
            currentPage = currentView
            targetPage = document.querySelector("#grid-view")
        }

        if(targetPage) {
            targetPage.className = targetPage.className.split("hid").join("")
        }
        // hide other view(s)
        if(document.querySelector("#list-view")
        && document.querySelector("#list-view").className.indexOf(" hid") == -1) {
            document.querySelector("#list-view").className += " hid"
        }
        if(document.querySelector("#expand-view")
        && document.querySelector("#expand-view").className.indexOf(" hid") == -1) {
            document.querySelector("#expand-view").className += " hid"
        }
        document.querySelector("#grid-view").className = ""
        document.querySelector("#view-toggle .grid")
                .className = "grid-selected"
        if(document.querySelector(".expand-selected")) {
            document.querySelector("#view-toggle .expand-selected")
                    .className = "expand"
        }
        if(document.querySelector(".list-selected")) {
            document.querySelector("#view-toggle .list-selected")
                    .className = "list"
        }

    }, false)
}

// using with unpaged: get current view
function getCurrentView() {
    try {
        if(document.getElementById("expand-view").className.indexOf("hid") == -1) {
            return "expand"
        }
    }
    catch(error){}
    try{
        if(document.getElementById("list-view").className.indexOf("hid") == -1) {
            return "list"
        }
    }
    catch(error){}
    return "grid"
}

// ql: no videos notice
function qlNoVidsShow() {
    document.getElementById("novids-template").id = "videos"
    document.getElementById("videos").className = ""
}

// my_videos: delete
function deletePrompt(videoId) {
    var ans = confirm("Are you sure you want to delete the selected videos?")
    if(ans) {
        document.getElementById("video-delete-" + videoId).submit()
    }
}

function playlistsViewSwitchrs() {
    var gridBtn = document.querySelector("#view-toggle .grid")
    gridBtn.addEventListener("click", function() {
        // switch to grid view
        if(getCurrentView() == "list") {
            var completeIds = []
            var videoIds = document.querySelectorAll("#list-view .video-title")
            for(var i in videoIds) {
                try {
                    completeIds.push(
                        videoIds[i].getAttribute("href").split("?v=")[1]
                    )
                }
                catch(error) {
                    // failed == not a video link
                }
            }
            if(!document.querySelector("#grid-view")) {
                var g = document.createElement("div")
                g.id = "grid-view"
                var t = document.createElement("table")
                t.id = "table"
                var th = document.createElement("thead")
                th.innerHTML = '<tr id="headings"><td id="heading-check" class="first heading"><div><input id="all-items-checkbox" type="checkbox" onclick="if (this.checked == true) { selectAllItems(\'videos\'); } else { deselectAllItems(\'videos\'); };"></div></td><td id="heading-filter" class="heading"><div></div></td></tr>'
                t.appendChild(th)
                var tb = document.createElement("tbody")
                tb.id = "videos"
                var tr = document.createElement("tr")
                tb.appendChild(tr)
                t.appendChild(tb)
                g.appendChild(t)
                document.querySelector(".view").appendChild(g)
            }

            document.querySelector(".list-selected").className = "list"
            gridBtn.className = "grid-selected"
            document.getElementById("list-view").className += " hid"

            var c = document.getElementById("grid-view")
            c.className = c.className.split(" hid").join("")
            document.querySelector("#grid-view tbody").innerHTML = ""

            var trz = document.createElement("tr")
            var td = document.createElement("td")
            td.setAttribute("colspan", "2")
            trz.appendChild(td)
            document.querySelector("#grid-view tbody").appendChild(trz)

            var r = new XMLHttpRequest();
            r.open("GET", "/userpage_view?r=" + Math.random())
            r.setRequestHeader("videos", completeIds.join(","))
            r.setRequestHeader("view", "grid")
            r.send(null)
            r.addEventListener("load", function(e) {
                td.innerHTML = r.responseText
            }, false)
        }
    }, false)
    var listBtn = document.querySelector("#view-toggle .list-selected")
    listBtn.addEventListener("click", function() {
        // switch to list view
        if(getCurrentView() == "grid") {
            gridBtn.className = "grid"
            listBtn.className = "list-selected"
            document.getElementById("list-view").className = ""
            document.getElementById("grid-view").className += " hid"
        }
    }, false)
}