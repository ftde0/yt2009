// at one point i was writing this code to be compatible with everything
// but realized on testing that ie doesn't even want to connect to relay
// so you'll be seeing a mix of both while browsing.
// gl!
var cookies = document.cookie.split(";")
var relayKey = ""
var relayPort = "6547"
var notificationCount = 0;
for(var name in cookies) {
    switch(cookies[name].split("=")[0].replace(" ", "")) {
        case "relay_key": {
            relayKey = cookies[name].split("=")[1]
            break;
        }
        case "relay_port": {
            relayPort = cookies[name].split("=")[1]
            break;
        }
    }
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

// notification count request
var r = new XMLHttpRequest()
r.open("GET", "http://127.0.0.1:" + relayPort + "/get_notification_count")
r.setRequestHeader("auth", relayKey)
r.send(null)
r.onreadystatechange = function(e) {
    if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)
    && (r.status == 200 || r.status == 304)) {
        notificationCount = r.responseText

        // show a red point next to the inbox icon
        var buttons = document.getElementsByTagName("button")
        for(var b in buttons) {
            if(buttons[b].className
            && buttons[b].className.indexOf("img-general-messages") !== -1
            && buttons[b].parentNode.className == "utility-item"
            && parseInt(notificationCount) > 0) {
                buttons[b].className = buttons[b].className.replace(
                    "img-general-messages",
                    "img-star-general-messages"
                )
                document.querySelector(".notif-count").className = "notif-count"
                document.querySelector(".notif-count").innerHTML = "(" + r.responseText + ")"
                if(location.pathname == "/") {
                    getNewNotificationsHP()
                }
            }
        }
    }
}

if(location.pathname == "/inbox") {
    getNewNotificationsInbox()
}

// update notifications json if new notifications and applicable page
var notifications = ""
function getNewNotificationsInbox() {
    r = new XMLHttpRequest()
    r.open("GET", "http://127.0.0.1:" + relayPort + "/get_notifications")
    r.setRequestHeader("auth", relayKey)
    r.send(null)
    r.onreadystatechange = function(e) {
        if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)
        && (r.status == 200 || r.status == 304)) {
            // create notificationFilter storage for deleting notifications
            if(localStorage
            && !localStorage.filtered) {
                localStorage.filtered = ""
            }

            // parse and put in numbers
            notifications = JSON.parse(r.responseText)
            var total = 0;
            var uploads = 0;
            var comments = 0;
            notifications.forEach(function(n) {
                if(localStorage.filtered.indexOf(n.notificationId) !== -1) return;
                switch(n.type) {
                    case "comment": {
                        comments++;
                        total++
                        break;
                    }
                    case "upload": {
                        uploads++;
                        total++
                        break;
                    }
                }
            })

            // last seen notification for homepage
            var lastSeen = notifications[0]
            if(lastSeen.notificationId) {
                localStorage.lastNotif = lastSeen.notificationId
            }

            function cHide(f) {
                f.querySelector(".no-msgs").className += " hid"
                var c = f.querySelector(".msgs").className
                f.querySelector(".msgs").className = c.replace("hid", "")
            }

            if(total > 0) {
                var gen = document.querySelector(".folder.general")
                cHide(gen)
                gen.querySelector(".msgs .count").innerHTML = "(" + total + ")"
            }

            if(uploads > 0) {
                var gen = document.querySelector(".folder.shared")
                cHide(gen)
                gen.querySelector(".msgs .count").innerHTML = "(" + uploads + ")"
            }

            if(comments > 0) {
                var gen = document.querySelector(".folder.comments")
                cHide(gen)
                gen.querySelector(".msgs .count").innerHTML = "(" + comments + ")"
            }

            renderNotifications("general")
        }
    }
}

// inbox: render notifications by type
function renderNotifications(type) {
    document.querySelector("#message-pane tbody").innerHTML = ""
    if(type == "e") {
        // render empty notification
        document.querySelector("#message-pane tbody").innerHTML = '\
        <h1 class="empty">There are no messages in this folder.</h1>'
        return;
    }
    var index = 0;
    notifications.forEach(function(n) {
        if(!n.type) return;
        if((n.type == type
        || type == "general")
        && localStorage.filtered.indexOf(n.notificationId) == -1) {
            // create tr
            var msg = document.createElement("tr")
            var msgExpanded = false;
            msg.setAttribute("colspan", "5")
            msg.setAttribute("data-id", n.notificationId)
            msg.className = "message closed"
            if(index % 2 == 0) {
                msg.className += " even"
            }

            // fill values
            var filler = document.createElement("td")
            filler.innerHTML = '<input id="all-items-checkbox" type="checkbox">'
            filler.className = "check"
            msg.appendChild(filler)

            // from
            var from = document.createElement("td")
            from.className = "from collapsed"
            from.innerHTML = n.defaultText
                             .split(" uploaded:")[0]
                             .split(" commented:")[0]
                             .split(" replied:")[0]
                             .split(" is live:")[0]
                             .split(" ").join("")
                             .substring(0, 20)
            msg.appendChild(from)
            
            // subject
            var text = ""
            var uploadTitle = ""
            switch(n.type) {
                case "comment": {
                    text = "Comment on your video: " + n.title
                    if(text.length > 64) {
                        text = text.substring(0, 64) + "..."
                    }
                    break;
                }
                case "upload": {
                    var title = ""
                    if(n.defaultText.indexOf("uploaded:") !== -1) {
                        title = n.defaultText.split(" uploaded:")[1]
                    } else if(n.defaultText.indexOf("is live:") !== -1) {
                        title = n.defaultText.split(" is live:")[1]
                    }
                    text = from.innerHTML + " sent you a video: " + title
                    uploadTitle = title;
                    if(text.length > 64) {
                        text = text.substring(0, 64) + "..."
                    }
                    break;
                }
            }
            var sub = document.createElement("td")
            sub.className = "subject collapsed"
            sub.innerHTML = text
            msg.appendChild(sub)

            // date
            var date = document.createElement("td")
            date.className = "date collapsed"
            date.innerHTML = n.date
            msg.appendChild(date)

            // expand data
            var expandFrom = document.createElement("td")
            expandFrom.innerHTML = '\
            <img src="' + n.thumbnail + '"/>'
            + msg.querySelector(".from.collapsed").innerHTML 
            expandFrom.className = "from expanded"
            msg.appendChild(expandFrom)

            var expandContent = document.createElement("td")
            expandContent.innerHTML = '\
            <b>' + msg.querySelector(".subject.collapsed").innerHTML + '</b>\
            <br><br>'
            expandContent.className = "subject expanded"
            msg.appendChild(expandContent)

            // specific expand content for each type
            switch(n.type) {
                case "comment": {
                    // comment content pulled from notif text
                    var comment = n.defaultText.split(" commented:")[1]
                                               .replace("\"", "");
                    comment = comment.substring(0, comment.length - 1)
                    expandContent.innerHTML += comment + "<br><br>"

                    // video from its data
                    expandContent.appendChild(renderVideoByData(
                        n.id, n.title, n.description
                    ))
                    
                    break;
                }
                case "upload": {
                    // append video data
                    expandContent.appendChild(renderVideoByData(
                        n.id, uploadTitle, ""
                    ))
                    break;
                }
            }

            var expandDate = document.createElement("td")
            expandDate.innerHTML = date.innerHTML;
            expandDate.className = "date expanded"
            msg.appendChild(expandDate)

            // expand on click
            msg.onclick = function() {
                if(!msgExpanded) {
                    msg.className = msg.className.replace("closed", "open")
                    msgExpanded = true;
                } else {
                    msg.className = msg.className.replace("open", "closed")
                    msgExpanded = false;
                }
            }

            // delete button at the bottom
            var deleteBtn = document.querySelector("#button-delete")
                                    .cloneNode(true);
            deleteBtn.onclick = function() {
                localStorage.filtered += n.notificationId
                msg.parentNode.removeChild(msg)
            }
            expandContent.appendChild(deleteBtn)

            // add!!
            index++
            document.querySelector("#message-pane tbody").appendChild(msg)
        }
    })

    // if no notifications were rendered, render empty
    if(index == 0) {
        renderNotifications("e")
    }
}

// inbox: change folders
function chFolder(e) {
    nlToArray(document.querySelectorAll(".folder")).forEach(function(f) {
        f.className = f.className.replace("selected", "")
    })
    e.className += " selected"
}

function openEmpty(e) {
    chFolder(e)
    renderNotifications("e")
}

function openGeneral(e) {
    chFolder(e)
    renderNotifications("general")
}

function openShared(e) {
    chFolder(e)
    renderNotifications("upload")
}

function openComments(e) {
    chFolder(e)
    renderNotifications("comment")
}

// inbox: render video element
function renderVideoByData(id, title, description) {
    // video data
    var video = document.createElement("div")
    video.className = "video-entry video-bar-container-box"

    // thumbnail
    var thumb = document.createElement("div")
    thumb.className = "v120WideEntry"
    var watchUrl = '/watch?v=' + id
    var thumbUrl = "//i.ytimg.com/vi/" + id + "/hqdefault.jpg"
    thumb.innerHTML = '\
    <div class="v120WrapperOuter">\
        <div class="v120WrapperInner">\
            <a class="video-thumb-link" href="' + watchUrl + '">\
                <img class="vimg120" src="' + thumbUrl + '"/>\
            </a>\
        </div>\
    </div>'
    video.appendChild(thumb)

    // title and description
    var vData = document.createElement("div")
    vData.className = "video-main-content"
    vData.innerHTML = '\
    <div class="video-mini-title">\
        <a href="' + watchUrl + '" rel="nofollow">' + title + '</a>\
    </div>\
    <div class="video-description">' + (description || "") + '</div>'
    video.appendChild(vData)

    return video;
}

// inbox: delete selected
function selectAllItems() {
    nlToArray(
        document.querySelectorAll("input[type=\"checkbox\"]")
    ).forEach(function(c) {
        c.checked = true
    })
}
function deselectAllItems() {
    nlToArray(
        document.querySelectorAll("input[type=\"checkbox\"]")
    ).forEach(function(c) {
        c.checked = false
    })
}
function deleteSelected() {
    nlToArray(document.querySelectorAll(".message")).forEach(function(c) {
        if(c.querySelector("input[type=\"checkbox\"]").checked) {
            // filter
            localStorage.filtered += c.getAttribute("data-id") + ","
            c.parentNode.removeChild(c)
        }
    })
}

// homepage new notifications
function getNewNotificationsHP() {
    r = new XMLHttpRequest()
    r.open("GET", "http://127.0.0.1:" + relayPort + "/get_notifications")
    r.setRequestHeader("auth", relayKey)
    r.send(null)
    r.onreadystatechange = function(e) {
        if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)
        && (r.status == 200 || r.status == 304)) {
            // create notificationFilter storage for deleting notifications
            if(localStorage
            && !localStorage.filtered) {
                localStorage.filtered = ""
            }

            // only include unread notifications in inbox
            var point = localStorage.lastNotif || 0

            // parse and put in numbers
            notifications = JSON.parse(r.responseText)
            var uploads = 0;
            var comments = 0;
            notifications.forEach(function(n) {
                if(localStorage.filtered.indexOf(n.notificationId) !== -1
                || parseInt(n.notificationId) <= point) return;
                switch(n.type) {
                    case "comment": {
                        comments++;
                        break;
                    }
                    case "upload": {
                        uploads++;
                        break;
                    }
                }
            })

            if(uploads > 0) {
                var rIcon = document.querySelector(".img-received-videos")
                rIcon.className = rIcon.className.replace(
                    "img-received-videos",
                    "img-star-received-videos"
                )
                var text = rIcon.parentNode.querySelector("a")
                text.innerHTML = uploads + " Shared with you"
            }

            if(comments > 0) {
                var rIcon = document.querySelector(".img-comments")
                rIcon.className = rIcon.className.replace(
                    "img-comments",
                    "img-star-comments"
                )
                var text = rIcon.parentNode.querySelector("a")
                text.innerHTML = comments + " Comment"
                if(comments > 1) {
                    text.innerHTML += "s"
                }
            }
        }
    }
}