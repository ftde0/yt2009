// zmiana strony
// 2009 style
function switchPage(num) {
    // obecna otwarta strona
    var currentPage = 0;
    var tempIndex = 0;

    var s = document.querySelectorAll(".videos-page")
    for(var sel in s) {
        try {
            if(s[sel].className.indexOf("hid") == -1) {
                currentPage = tempIndex;
            }
        }
        catch(error) {}

        tempIndex++;
    }

    // którą stronę otworzyć
    var targetPage = 0;

    if(num == "l") {
        targetPage = s.length - 1;
    } else if(num == "f") {
        targetPage = 0;
    } else {
        targetPage = currentPage + num;
    }

    if(targetPage == -1 || !document.querySelector(".videos-page-" + targetPage)) return;

    // ukryj pozostałe strony
    for(var sel in s) {
        try {
            s[sel].className += " hid"
        }
        catch(error) {}
    }

    // pokaż target
    s[targetPage].className = s[targetPage].className.split("hid").join("")

    // update numerków
    document.querySelector("#yt2009-page-n1").innerHTML = "Page " + (targetPage + 1) + " - " + s.length
    document.querySelector("#yt2009-page-n2").innerHTML = "Page " + (targetPage + 1) + " - " + s.length
}

// czyszczenie historii
function viewingHistoryClear() {
    document.cookie = "watch_history=; Path=/; expires=Fri, 31 Dec 2009 23:59:59 GMT"
    localStorage.watch_history = "[]"
    location.reload();
}

// przeglądanie sub kanałów
function switchChannel(element) {
    var url = element.getAttribute("data-url")
    var username = element.querySelector(".name").innerHTML

    var videos_element = document.querySelector(".yt2009-video-list-hook")

    // classname .selected, wywal z innych, daj na element
    var s = document.querySelectorAll(".channel-subfolder.selected")
    for(var sel in s) {
        try {
            s[sel].className = s[sel].className.replace(" selected", "")
        }
        catch(error) {}
    }

    
    element.className += " selected"

    // animacja ładowania
    videos_element.innerHTML = "<img src=\"/assets/site-assets/icn_loading_animated-vfl24663.gif\" style=\"text-align: center;padding: 50px 50px;position: relative;left: 300px;\">"


    // fetch nowych filmów dla wybranej osoby
    var r = new XMLHttpRequest();
    r.open("GET", "/subscriptions_new_videos")
    r.setRequestHeader("url", url)
    r.send(null)
    r.addEventListener("load", function(e) {
        // dopełnianie htmla wysłanego z serwera
        videos_element.innerHTML = r.responseText

        document.querySelector(".yt2009-sub-header").innerHTML = "<div class=\"pager\"></div><a href=\"" + url + "\"><h2>" + username + "</h2></a>"
    }, false)
}

// podkładanie nowych danych z localStorage
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

    var path = location.pathname.split("?")[0].split("&")[0]
    switch(path) {
        case "/my_favorites": {
            storageObject = JSON.parse(localStorage.favorites)
            break;
        }
        case "/my_history": {
            storageObject = JSON.parse(localStorage.watch_history)
            break;
        }
        case "/watch_queue":
        case "/my_quicklist": {
            storageObject = JSON.parse(localStorage.quicklistVids)
            break;
        }
    }

    // podłóż htmla
    if(!document.querySelector(".videos-page-0")) {
        prepNewPage();
    }

    storageObject.reverse().forEach(function(video) {
        if(!video.id) return;
        if(current_page_item_count >= current_page_items_max) {
            // tworzymy nową stronę na rzeczy
            current_page_items_max = 20;
            current_page_item_count = 0;
            prepNewPage();
        }
        document.querySelector(".videos-page-0 td").innerHTML = '\
    <div class="video" style="float: left; margin: 15px 0 0 0; padding: 10px 0 10px 10px; width: 150px;">\
        <div style="float: left;">\
            <div style="float: left;">\
                <input type="checkbox" class="checkbox" value="' + video.id + '" />\
            </div>\
        </div>\
        <div style="float: left; width: 120px;">\
            <a href="/watch?v=' + video.id + '" class="video-thumb"><img src="' + location.protocol + '//i.ytimg.com/vi/' + video.id + '/hqdefault.jpg"/></a>\
            <a href="/watch?v=' + video.id + '" class="title" style="display: block; color: #03c;">' + video.title + '</a>\
            <div class="video-stats">\
                <div class="video-stat' + (path == "/watch_queue" ? " hid" : "") + '"><span class="stat-views">Views: ' + video.views + '</span></div>\
                <div class="video-stat"><span class="stat-rating"><img class="yt-rating-5.0" src="/assets/site-assets/pixel-vfl73.gif" alt="5.0" /></span></div>\
            </div>\
        </div>\
    </div>' + document.querySelector(".videos-page-0 td").innerHTML
        current_page_item_count++;
    })
}

// nowa strona
function prepNewPage() {
    pageShift(1)

    var newPage = document.createElement("tbody")
    newPage.className = "videos-page videos-page-0"
    newPage.id = "videos"
    newPage.innerHTML = '<tr><td colspan="2"></td></tr>'
    newPage.parentNode = document.querySelector("#table")

    if(!document.querySelector("#table").outerHTML) {
        // jak przeglądarka nie ma outerHTML (np. stare ff) to symulujemy
        document.querySelector("#table").innerHTML = document.querySelector("#table").innerHTML.split("</thead>").join('</thead><tbody id="videos" class="videos-page videos-page-0">' + newPage.innerHTML + '</tbody>')
    } else {
        document.querySelector("#table").innerHTML = document.querySelector("#table").innerHTML.split("</thead>").join("</thead>" + newPage.outerHTML)
    }

    


    // update numerków
    try {
        var s = document.querySelectorAll(".videos-page")
        document.querySelector("#yt2009-page-n1").innerHTML = "Page 1 - " + s.length
        document.querySelector("#yt2009-page-n2").innerHTML = "Page 1 - " + s.length
    }
    catch(error) {}
}

// shift każdej strony o number w dół
function pageShift(number) {
    var s = document.querySelectorAll(".videos-page")
    for(var sel in s) {
        try {
            if(s[sel].className) {
                var pageNumber = s[sel].className.split("videos-page-")[1].trimRight();
                s[sel].className = "videos-page videos-page-" + (parseInt(pageNumber) + number) + " hid"
            }
        }
        catch(error) {}
    }
}

// wybieranie/odwybieranie wszystkiego
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

// subskrypcje z localStorage
function subscription_handle() {
    var html = ""
    JSON.parse(localStorage.subscriptions).forEach(function(sub) {
        if(!sub.url) return;
        html += '<div class="subfolder channel-subfolder" onclick="switchChannel(this)" data-url="' + sub.url + '"><a class="name" href="#">' + sub.creator + '</a></div>'
    })

    document.querySelector(".secondary-subscription-list").innerHTML += html
}

// playlisty z localStorage
function playlists_handle() {
    // dodawanie podfolderów na index
    var playlistIndex = JSON.parse(localStorage.playlistsIndex)
    playlistIndex.forEach(function(playlist) {
        document.querySelector(".subfolder-container").innerHTML += "<div class=\"subfolder\" data-id=\"" + playlist.id + "\" onclick=\"show_playlist_localstorage(this)\"><a class=\"name\" href=\"#\">" + playlist.name + "</a></div>"
    })

    if(document.querySelector(".subfolder")) {
        document.querySelector(".subfolder").className = "subfolder selected"
        show_playlist_localstorage(document.querySelector(".subfolder"))
    }
}

// zmienianie playlisty
function show_playlist_localstorage(playlist) {
    // pokaż poprawnie .selected
    document.querySelector(".subfolder.selected").className = "subfolder"
    playlist.className = "subfolder selected"

    // dodajemy filmy
    var playlistId = playlist.getAttribute("data-id")
    var playlistVideos = JSON.parse(localStorage["playlist-" + playlistId])
    var playlistVideosHTML = ""
    var playlistVideoIndex = 0;

    playlistVideos.forEach(function(video) {
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
                <a href="/watch?v=' + video.id + '" style="height: 40px;overflow: hidden;" rel="nofollow"><img src="//i.ytimg.com/vi/' + video.id + '/hqdefault.jpg"></a>\
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
}

// przycisk play all
if(document.querySelector("#playlist-btn-play")) {
    document.querySelector("#playlist-btn-play")
    .addEventListener("click", function() {
        // dane do requesta
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
        //redirect to the watchpage with a
        //&list= parameter containing our custom ID
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
    
    // usuwanie z playlisty wybranego filmu
    document.querySelector("#playlist-btn-remove")
            .addEventListener("click", function() {
        var playlistId = document.querySelector(".subfolder.selected")
                                .getAttribute("data-id")
        var s = document.querySelectorAll('input[type="checkbox"]')
        for(var sel in s) {
            if(s[sel].checked && s[sel].getAttribute("data-videoid")) {
                var videoElement = {}
    
                var playlistVideos = JSON.parse(localStorage["playlist-" + playlistId])
                playlistVideos.forEach(function(video) {
                    if(video.id == s[sel].getAttribute("data-videoid")) {
                        videoElement = video;
                    }
                })
    
                localStorage["playlist-" + playlistId] = localStorage["playlist-" + playlistId].replace(JSON.stringify(videoElement), "")
    
                // poprawianie jsona
                localStorage["playlist-" + playlistId] = localStorage["playlist-" + playlistId].replace("[,", "[").replace(",]", "]")
            }
        }
    
        // update playlisty
        show_playlist_localstorage(
            document.querySelector(".subfolder.selected")
        )
    }, false)
}