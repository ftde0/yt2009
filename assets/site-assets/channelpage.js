function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}
var use_ryd = false;
var ryd_cache = {}
var useLocalStorage = window.localStorage ? true : false;

// use_ryd na pierwszy otwarty film
function use_ryd_first_video() {
    var id = $(".playnav-video")[0].id.split("video-")[1]
    var r = new XMLHttpRequest();
    r.open("GET", "/ryd_request")
    r.setRequestHeader("source", "?v=" + id)
    r.send(null)
    r.addEventListener("load", function(e) {
        ryd_cache[id] = r.responseText
        $("#ratingStars button").className = "master-sprite ratingL ratingL-" + r.responseText
        $("#ratingStars button").setAttribute("title", r.responseText)
    }, false)
}

// playnav
function switchVideo(video) {
    playnav_view("play")
    $(".playnav-video.selected").className = "playnav-item playnav-video"

    var id = video.id.split("-").splice(2, video.id.split("-").length).join("-")

    $("#playnav-curvideo-title").innerHTML = document.querySelector(".video-title-" + id).innerHTML
    $("#playnav-curvideo-info-line").innerHTML = "From: " + $(".yt2009-name").innerHTML + " | " + document.querySelector(".video-meta-" + id).innerHTML.replace(" - ", " | ")
    $("#playnav-curvideo-description").innerHTML = ""
    $("#defaultRatingMessage").innerHTML = "<span class='smallText'>" + document.querySelector(".video-ratings-" + id).innerHTML + " ratings</span>"
    $("#yt2009_playhead").src = "/embed/" + id;
    $("#playnav-watch-link").setAttribute("href", "/watch?v=" + id)

    var e = document.querySelectorAll(".playnav-video")
    // wywal .selected z reszty
    for(var sel in e) {
        try {
            e[sel].className = "playnav-item playnav-video"
        }
        catch(error) {console.log(error)}
    }
    // dodaj .selected z powrotem do innych wystąpień tego filmu
    e = document.querySelectorAll("#playnav-video-" + id)
    for(var sel in e) {
        try {e[sel].className = "playnav-item playnav-video selected playnav-item-selected"}
        catch(error) {console.log(error)}
    }

    video.className = "playnav-item playnav-video selected playnav-item-selected"

    // zmień kartę na info
    playnav_switchPanel("info")

    // obsługa return youtube dislike
    if(use_ryd) {
        // tymczasowy cache
        if(ryd_cache[id]) {
            $("#ratingStars button").className = "master-sprite ratingL ratingL-" + ryd_cache[id]
            $("#ratingStars button").setAttribute("title", ryd_cache[id])
        } else {
            // fetch
            var r = new XMLHttpRequest();
            r.open("GET", "/ryd_request")
            r.setRequestHeader("source", "?v=" + id)
            r.send(null)
            r.addEventListener("load", function(e) {
                ryd_cache[id] = r.responseText
                $("#ratingStars button").className = "master-sprite ratingL ratingL-" + r.responseText
                $("#ratingStars button").setAttribute("title", r.responseText)
            }, false)
        }
    }
}

// karty
var currentScrollbox = "all"
function switchTab(tab_name, tabElement) {
    var e = document.querySelectorAll(".yt2009-scrollbox")
    for(var sel in e) {
        try {
            e[sel].className += " hid"
        }
        catch(error) {console.log(error)}
    }

    var s = document.querySelectorAll(".navbar-tab.inner-box-link-color")
    for(var sel in s) {
        try {
            s[sel].className = "navbar-tab inner-box-link-color"
        }
        catch(error) {}
    }

    tabElement.className = "navbar-tab inner-box-link-color navbar-tab-selected"
    $(".scrollbox-" + tab_name).className = "outer-scrollbox yt2009-scrollbox scrollbox-" + tab_name
    currentScrollbox = tab_name
    grid_fillFromScrollbox();
}

// playlisty
function openPlaylist(element, switchMode) {
    if(!switchMode) {
        switchMode = "playlists"
    }


    if(document.querySelector(".yt2009-scrollbox.scrollbox-" + element.getAttribute("data-id"))) {
        // pokaż jak już mamy
        switchTab(element.getAttribute("data-id"), $("#playnav-navbar-tab-" + switchMode))
    } else {
        var r = new XMLHttpRequest();
        r.open("GET", "/channel_get_playlist?rt=" + Date.now())
        r.setRequestHeader("id", element.getAttribute("data-id"))
        r.send(null)
        r.addEventListener("load", function(e) {
            var tab = document.createElement("div")
            tab.className = "outer-scrollbox yt2009-scrollbox scrollbox-" + element.getAttribute("data-id") + " hid"
            tab.style.overflowX = "hidden"
            tab.innerHTML += "<div id=\"playnav-play-all-items\" class=\"inner-scrollbox\"><div class=\"playnav-playlist-header\"><a style=\"text-decoration:none\" class=\"title title-text-color\"><span id=\"playnav-playlist-playlists-all-title\" class=\"title\">" + document.querySelector("[data-id=\"" + element.getAttribute("data-id") + "\"] .playnav-item-title span").innerHTML + "</span></a></div>"
            tab.innerHTML += r.responseText
            tab.innerHTML += "<div class=\"spacer\">&nbsp;</div><div class=\"scrollbox-separator\"><div class=\"outer-box-bg-as-border\"></div></div></div></div>";

            $(".scrollbox-body").appendChild(tab)

            switchTab(element.getAttribute("data-id"), $("#playnav-navbar-tab-" + switchMode))
        }, false)
    }
}

function subscribe() {
    // ukryj przyciski subscribe, pokaż przyciski unsubscribe
    var e = $(".yt2009-subscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className += " hid"}
        catch(error) {}
    }
    e = $(".yt2009-unsubscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className = "yt2009-unsubscribe-button-hook"}
        catch(error) {}
    }

    if(useLocalStorage) {
        if(!localStorage.subscriptions) {
            localStorage.subscriptions = "[]"
        }
        var url = location.pathname;
        var name = $(".yt2009-name").innerHTML
        var subList = JSON.parse(localStorage.subscriptions)
        subList.unshift({
            "url": url,
            "creator": name
        })
        localStorage.subscriptions = JSON.stringify(subList)
    } else {
        // dopisywanie do cookie
        var sub = ""
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.trimLeft().replace("sublist=", "")
            }
        })

        sub = encodeURIComponent(location.pathname) + "&" + encodeURIComponent($(".yt2009-name").innerHTML) + ":" + sub;
        document.cookie = "sublist=" + sub + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}

// unsub
function unsubscribe() {
    // ukryj przyciski unsubscribe, pokaż przyciski subscribe
    var e = $(".yt2009-unsubscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className += " hid"}
        catch(error) {}
    }
    e = $(".yt2009-subscribe-button-hook")
    for(var sel in e) {
        try {e[sel].className = "subscribe-div yt2009-subscribe-button-hook"}
        catch(error) {}
    }
    var subscribeMethod = "cookie"
    var url = location.pathname;
    var name = $(".yt2009-name").innerHTML
    JSON.parse(localStorage.subscriptions).forEach(function(sub) {
        if(sub.url == url) {
            subscribeMethod = "localStorage"
        }
    })
    
    if(useLocalStorage && subscribeMethod == "localStorage") {
        var subList = JSON.parse(localStorage.subscriptions)
        var index = 0;
        
        subList.forEach(function(sub) {
            if(sub.url == url) {
                subList[index] = {}
            }
            index++;
        })
        localStorage.subscriptions = JSON.stringify(subList)
    } else {
        // wywalanie z cookie
        var sub = ""
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("sublist=") !== -1) {
                sub = cookie.trimLeft().replace("sublist=", "")
            }
        })

        sub = sub.replace(encodeURIComponent(location.pathname) + "&" + encodeURIComponent($(".yt2009-name").innerHTML) + ":", "")
        document.cookie = "sublist=" + sub + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
}

// sprawdzamy czy twórca jest subskrybowany z localStorage
if(window.localStorage) {
    JSON.parse(localStorage.subscriptions).forEach(function(sub) {
        if(!sub.url) return;
        var url = location.pathname
        if(sub.url.indexOf(url) !== -1 || url.indexOf(sub.url) !== -1) {
            // jest zasubskrybowany już
            var e = $(".yt2009-subscribe-button-hook")
            for(var sel in e) {
                try {e[sel].className += " hid"}
                catch(error) {}
            }
            e = $(".yt2009-unsubscribe-button-hook")
            for(var sel in e) {
                try {e[sel].className = "yt2009-unsubscribe-button-hook"}
                catch(error) {}
            }
        }
    })
}

// playnav-bottom-links
function playnav_switchPanel(tabName) {
    // ukryj inne karty
    var e = $("svg")
    for(var sel in e) {
        try {
            if(e[sel].className.baseVal.indexOf("hid") == -1) {
                e[sel].className.baseVal += " hid"
            }
        }
        catch(error) {}
    }

    var currentTab = $(".panel-tab-selected")
    currentTab.className = ""
    $("#playnav-panel-" + currentTab.id.replace("playnav-panel-tab-", "")).className = "hid"

    // pokaż obecną kartę
    var tabLink = $("#playnav-panel-tab-" + tabName)
    var tabContent = $("#playnav-panel-" + tabName)
    tabLink.className = "panel-tab-selected"
    try {tabLink.querySelector("svg").className.baseVal = ""}
    catch(error) {}

    tabContent.className = ""

    // zewnętrzne funkcje żeby wypełnić html zakładki poprawnie
    switch(tabName) {
        case "comments": {
            get_video_comments();
            break;
        }
        case "favorite": {
            favorite_video();
            break;
        }
        case "flag": {
            loadFlagMenu();
            break;
        }
    }
}

// zakładka comments
function get_video_comments() {
    // obecny film
    $("#playnav-panel-comments").innerHTML = '<img src="/assets/site-assets/icn_loading_animated-vfl24663.gif">'
    var currentId = document.querySelector(".playnav-video.selected").id.replace("playnav-video-", "")

    // request
    var r = new XMLHttpRequest();
    r.open("GET", "/playnav_get_comments")
    r.setRequestHeader("id", currentId)
    r.send(null)
    r.addEventListener("load", function(e) {
        $("#playnav-panel-comments").innerHTML = r.responseText
    }, false)
}

// favorites

// dodawanie
function favorite_video() {
    var currentId = document.querySelector(".playnav-video.selected").id.replace("playnav-video-", "")
    var favorites = ""
    if(useLocalStorage) {
        // localstorage
        if(!localStorage.favorites) {
            localStorage.favorites = "[]"
        }
        favorites = JSON.parse(localStorage.favorites)
        if(JSON.stringify(favorites).indexOf(currentId) == -1) {
            favorites.unshift({
                "id": currentId,
                "title": document.querySelector(".video-title-" + currentId).innerHTML,
                "views": document.querySelector(".video-meta-" + currentId).innerHTML.split(" views - ")[0]
            })

            // przy okazji usuń puste entry (usunięte z poziomu ui)
            localStorage.favorites = JSON.stringify(favorites).split(",{}").join("")
        }
    } else {
        // cookie
        var videoString = encodeURIComponent(document.querySelector(".video-title-" + currentId).innerHTML + "&" + document.querySelector(".video-meta-" + currentId).innerHTML.split(" views - ")[0] + "&" + currentId)
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("favorites=") !== -1) {
                favorites = cookie.trimLeft().replace("favorites=", "")
            }
        })
        if(favorites.indexOf(currentId) == -1) {
            favorites = videoString + ":" + favorites
            document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
        }
    }
    $(".favorite-remove").className += " hid"
    $(".favorite-added").className = "favorite-added"
}

// usuwanie
function favorite_undo() {
    var currentId = document.querySelector(".playnav-video.selected").id.replace("playnav-video-", "")
    var favorites = ""
    if(useLocalStorage) {
        // localstorage
        favorites = JSON.parse(localStorage.favorites)
        var index = 0;
        favorites.forEach(function(favorite) {
            if(favorite.id == currentId) {
                favorites[index] = {}
            }
            index++;
        })
        localStorage.favorites = JSON.stringify(favorites)
    } else {
        // cookie
        var videoString = encodeURIComponent(document.querySelector(".video-title-" + currentId).innerHTML + "&" + document.querySelector(".video-meta-" + currentId).innerHTML.split(" views - ")[0] + "&" + currentId) + ":"
        document.cookie.split(";").forEach(function(cookie) {
            if(cookie.indexOf("favorites=") !== -1) {
                favorites = cookie.trimLeft().replace("favorites=", "")
            }
        })
        favorites = favorites.replace(videoString, "")
        document.cookie = "favorites=" + favorites + "; Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT"
    }
    $(".favorite-added").className += " hid"
    $(".favorite-remove").className = "favorite-remove"
}

// playlisty

// sprawdzanie czy mamy jakieś playlisty
var plDropdown = $(".playlists-options")
function updatePlaylists() {
    var optionsHTML = ""
    if(localStorage.playlistsIndex) {
        var playlists = JSON.parse(localStorage.playlistsIndex);
        playlists.forEach(function(playlist) {
            optionsHTML += "<option value=\"" + playlist.id + "\">" + playlist.name + "</option>"
        })
    
        // pokaż tworzenie playlist jak nie mamy żadnej
        if(optionsHTML == "") {
            $(".playlist-create").style.display = "inline-block"
            $(".playlist-add").style.display = "none"
        }
    } else {
        // tworzymy entry do localStorage jak nie mamy
        localStorage.playlistsIndex = "[]"
        $(".playlist-create").style.display = "inline-block"
        $(".playlist-add").style.display = "none"
    }

    optionsHTML += "<option value=\"override-createnew\">[ New Playlist ]</option>"
    plDropdown.innerHTML = optionsHTML
}
updatePlaylists();

var selectedOption = plDropdown.querySelectorAll("option")[0]

// pokazujemy/ukrywamy .playlist-create
plDropdown.addEventListener("change", function() {
    // które jest wybrane
    var options = plDropdown.querySelectorAll("option")

    for(var s in options) {
        if(options[s].selected) {
            selectedOption = options[s]
        }
    }

    // ukrywamy/pokazujemy
    if(selectedOption.value == "override-createnew") {
        $(".playlist-create").style.display = "inline-block"
        $(".playlist-add").style.display = "none"
    } else {
        $(".playlist-create").style.display = "none"
        $(".playlist-add").style.display = "inline-block"
    }
}, false)

// flagging
function loadFlagMenu() {
    if(!document.getElementById("watch-flag-menu")) {
        var r = new XMLHttpRequest();
        r.open("GET", "/flag_menu_template")
        r.setRequestHeader("source", "channel")
        r.send(null)
        r.addEventListener("load", function(e) {
            $("#inappropriateVidDiv").innerHTML = r.responseText
        }, false)
    }
}

var flagMenuShown = false;
function toggleFlagReason() {
    flagMenuShown = !flagMenuShown
    if(flagMenuShown) {
        $("#playnav-body").className = "flag-opened"
        $("#watch-flag-menu").className = "show y-in"
    } else {
        $("#playnav-body").className = ""
        $("#watch-flag-menu").className = "y-in"
    }
}

function toggleFlagSubdrop(element) {
    var subdrop = element.getElementsByTagName("ul")[0]
    if(subdrop.className.indexOf("show") == -1) {
        subdrop.className = "show"
    } else {
        subdrop.className = ""
    }
}

function addMouseOver(element) {
    element.className += " mouseover"
}

function hideFlagSubdrop(element) {
    var subdrop = element.getElementsByTagName("ul")[0]
    if(subdrop.className.indexOf("mouseover") == -1) {
        subdrop.className = ""
    }
}

function flagProcessSubcategory(element) {
    toggleFlagReason()
    var ul = $("#watch-flag-menu").getElementsByTagName("ul")
    for(var i in ul) {
        if(ul[i].nodeName && ul[i].className.indexOf("show") !== -1) {
            ul[i].className = ""
        }
    }
    var reasonName = element.getElementsByTagName("a")[0].innerHTML
    $("#watch-flag-menu .parent").innerHTML = reasonName
}

function flagVideoSend() {
    $("#inappropriateVidDiv").className = "watch-more-action hid"
    $("#inappropriateMsgsDiv").className = ""
}

// dodaj obecny film do playlisty
function addPlaylistVideo(playlistId) {
    var currentId = document.querySelector(".playnav-video.selected").id.split("video-")[1]
    var dateAdded = new Date().toString().split(" ")
    dateAdded.shift();
    dateAdded = dateAdded.slice(0, 3)
    dateAdded[1] += ","
    dateAdded = dateAdded.join(" ")
    var videoData = {
        "id": currentId,
        "title": $("#playnav-curvideo-title").innerText,
        "date": dateAdded,
        "rating": $("#ratingStars button").title,
        "viewCount": document.querySelector(".video-meta-" + currentId).innerHTML.split(" views")[0],
        "time": $("#yt2009_playhead").contentDocument.querySelector(".timer").innerHTML.split("/ ")[1]
    }

    var playlist = JSON.parse(localStorage["playlist-" + playlistId])
    if(JSON.stringify(playlist).indexOf(currentId) == -1) {
        playlist.unshift(videoData)
    }
    localStorage["playlist-" + playlistId] = JSON.stringify(playlist)


    // pokaż success tick
    $("#addToPlaylistResult").style.display = "block"
    $("#addToPlaylistDiv").style.display = "none"
}

// pokaż z powrotem kartę dodawania do playlisty
function playlistResultBack() {
    $("#addToPlaylistResult").style.display = "none"
    $("#addToPlaylistDiv").style.display = "block"
}

// event listener: przycisk add na istniejącej playliście
$("#playlist-add-btn").addEventListener("click", function() {
    console.log(selectedOption)
    addPlaylistVideo(selectedOption.value);
}, false)

// event listener: przycisk add na new playlist
$("#playlist-create-btn").addEventListener("click", function() {
    var playlistId = Math.floor(Date.now() / 1000)
    localStorage["playlist-" + playlistId] = "[]"
    addPlaylistVideo(playlistId)

    var index = JSON.parse(localStorage.playlistsIndex);
    index.unshift({"id": playlistId, "name": $(".playlist-name-input").value})
    localStorage.playlistsIndex = JSON.stringify(index)

    // aktualizacja opcji playlist aby pokazywała się nowa
    updatePlaylists();
    $(".playlist-create").style.display = "none"
    $(".playlist-add").style.display = "inline-block"
    selectedOption = plDropdown.querySelectorAll("option")[0]
}, false)

// switch the playnav view
var currentView = "play"
function playnav_view(view) {
    currentView = view;
    var viewNames = $("div[id*=\"playnav-\"][id$=\"view\"]")
    for(var viewName in viewNames) {
        try {
            var tView = viewNames[viewName]
            tView.style.display = "none"
            $("#" + tView.id.split("-")[1] + "-icon").className = "view-button"
        }
        catch(error) {}
    }
    $("#playnav-" + view + "view").style.display = "block"
    $("#" + view + "view-icon").className = "view-button view-button-selected"

    if(view !== "play") {
        $("#playnav-player").style.display = "none"
    } else {
        $("#playnav-player").style.display = "block"
    }

    // prepare the grid view
    if(view == "grid" && !$("#playnav-grid-content").innerText) {
        // generate the grid view contents, its empty
        // 3x8 table
        var gridViewTable = document.createElement("table")
        gridViewTable.className = "yt2009-grid-tb"
        var rows = []
        while(rows.length !== 8) {
            var tr = document.createElement("tr")
            gridViewTable.appendChild(tr)
            rows.push(tr)
        }

        $("#playnav-grid-content").appendChild(gridViewTable)
    }
    grid_fillFromScrollbox();
}

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

// fill up the grid view
function grid_fillFromScrollbox() {
    if(currentView !== "grid") return;
    var tableRowItems = {
        "0,8,16": 0,
        "1,9,17": 1,
        "2,10,18": 2,
        "3,11,19": 3,
        "4,12,20": 4,
        "5,13,21": 5,
        "6,14,22": 6,
        "7,15,23": 7
    }
    // clean up the grid
    nlToArray(document.querySelectorAll(
        ".yt2009-grid-tb tr"
    )).forEach(function(tr) {
        tr.innerHTML = ""
    })
 
    // add items to correct rows accordingly with tableRowItems
    var tItems = nlToArray(document.querySelectorAll(
        ".yt2009-scrollbox.scrollbox-" + currentScrollbox + " .playnav-item"
    ))
    for(var row in tableRowItems) {
        row.split(",").forEach(function(rowItem) {
            rowItem = parseInt(rowItem)
            if(tItems[rowItem]) {
                var e = tItems[rowItem].cloneNode(true)
                e.className += " yt2009-grid-playnav-item"
                var htmlRow = nlToArray(document.querySelectorAll(
                    ".yt2009-grid-tb tr"
                ))[tableRowItems[row]]
                htmlRow.appendChild(e)
            }
        })
    }
}

// playnav search/sort
function playnav_searchChannel() {
    if($("#upload_search_query-play").value == "") {
        $(".uploads-filtered").className = "uploads-filtered hid"
        $(".uploads").className = "uploads"
        return;
    }
    $("#playnav-play-loading").style.display = "block"
    var r = new XMLHttpRequest();
    r.open("GET", "/search_channel?rt=" + Date.now())
    r.setRequestHeader("source", location.pathname)
    r.setRequestHeader("query", $("#upload_search_query-play").value)
    r.send(null)
    r.addEventListener("load", function(e) {
        $("#playnav-play-loading").style.display = "none"
        $(".uploads").className = "uploads hid"
        $(".uploads-filtered").className = "uploads-filtered"
        $(".uploads-filtered").innerHTML = r.responseText
    }, false)
}

function playnav_sort(sortMode) {
    if(sortMode == "popularity") {
        $(".uploads-filtered").className = "uploads-filtered hid"
        $(".uploads").className = "uploads"
        return;
    }
    $("#playnav-play-loading").style.display = "block"
    var r = new XMLHttpRequest();
    r.open("GET", "/channel_sort?rt=" + Date.now())
    r.setRequestHeader("source", location.pathname)
    r.setRequestHeader("sort", sortMode)
    r.send(null)
    r.addEventListener("load", function(e) {
        $("#playnav-play-loading").style.display = "none"
        $(".uploads").className = "uploads hid"
        $(".uploads-filtered").className = "uploads-filtered"
        $(".uploads-filtered").innerHTML = r.responseText
    }, false)
}