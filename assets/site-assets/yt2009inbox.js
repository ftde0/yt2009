// yt2009inbox
// a good portion of this code was initially in relay-notifications.js,
// but since relay isn't much of a thing anymore it's been moved
// and is now used as cross-instance sync

var ogRelay = false;

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

var r = new XMLHttpRequest()
r = new XMLHttpRequest()
if(ogRelay) {
    r.open("GET", "http://127.0.0.1:" + relayPort + "/get_notifications")
    r.setRequestHeader("auth", relayKey)
} else {
    r.open("GET", "/get_notifications")
}
r.send(null)
r.onreadystatechange = function(e) {
    if((r.readyState == 4 || this.readyState == 4 || e.readyState == 4)
    && (r.status == 200 || r.status == 304)) {
        // create notificationFilter storage for deleting notifications
        if(localStorage
        && !localStorage.filtered) {
            localStorage.filtered = ""
        }
        if(localStorage
        && !localStorage.msgCache) {
            localStorage.msgCache = "[]"
        }
        var point = localStorage.lastNotif || 0
        var msgCache = JSON.parse(localStorage.msgCache)
        // parse and put in numbers
        notifications = JSON.parse(r.responseText)

        // also render cached messages if not within notifications resp
        msgCache.forEach(function(n) {
            if(n.time && r.responseText.indexOf(n.time) == -1) {
                n.type = "message"
                notifications.push(n)
            }
        })

        var total = 0;
        var uploads = 0;
        var comments = 0;
        var messages = 0;
        notifications.forEach(function(n) {
            if(n.time) {
                n.notificationId = n.time;
            }
            if(localStorage.filtered.indexOf(n.notificationId) !== -1
            || parseInt(n.time || n.notificationId) <= point) return;
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
                case "message": {
                    if(JSON.stringify(msgCache).indexOf(n.time) == -1) {
                        msgCache.unshift(n)
                    }
                    messages++
                    total++
                    break;
                }
            }
        })
        localStorage.msgCache = JSON.stringify(msgCache)
        // last seen notification for homepage
        var lastSeen = notifications[0]
        if(lastSeen && lastSeen.notificationId) {
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
        if(messages > 0) {
            var gen = document.querySelector(".folder.messages")
            cHide(gen)
            gen.querySelector(".msgs .count").innerHTML = "(" + messages + ")"
        }
        renderNotifications("general")
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
    var notificationsSource = notifications
    if(type == "sent") {
        notificationsSource = JSON.parse(localStorage.sent || "[]")
    }
    notificationsSource.forEach(function(n) {
        if(!n.type) return;
        if((n.type == type
        || type == "general"
        || type == "sent")
        && localStorage.filtered.indexOf(n.notificationId) == -1
        && (n.from
        && !localStorage.userFilter
        || (localStorage.userFilter
        && localStorage.userFilter.indexOf(n.from) == -1))) {
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
            from.innerHTML = n.from
                          || n.defaultText
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
                case "message": {
                    text = n.content;
                    break;
                }
            }
            var sub = document.createElement("td")
            sub.className = "subject collapsed"
            sub.innerHTML = n.subject || text
            msg.appendChild(sub)

            // date
            var date = document.createElement("td")
            date.className = "date collapsed"
            date.innerHTML = n.time ? renderDateFromUnix(n.time) : n.date
            msg.appendChild(date)

            // expand data
            var expandFrom = document.createElement("td")
            expandFrom.innerHTML = '\
            <img src="' + (n.thumbnail || "/assets/site-assets/default.png") + '"/>'
            + msg.querySelector(".from.collapsed").innerHTML 
            expandFrom.className = "from expanded"
            msg.appendChild(expandFrom)

            var expandContent = document.createElement("td")
            expandContent.innerHTML = '\
            <b>' + msg.querySelector(".subject.collapsed").innerHTML + '</b>\
            <br><br>'
            if(n.from) {
                expandContent.innerHTML += text + "<br><br>"
                
                // reply button
                var replyBtn = document.querySelector("#button-reply")
                                       .cloneNode(true);
                replyBtn.style.display = "block"
                expandContent.appendChild(replyBtn)
            } else {
                expandContent.innerHTML += '<br>'
            }
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
            if(n.from) {
                var actions = document.createElement("div")
                actions.style.float = "left"
                actions.style.marginTop = "55px"
                actions.style.textAlign = "right"
                actions.innerHTML = "\
                <a href=\"#\" onclick=\"blockUser('" + n.from + "');return false;\">(block user)</a><br>\
                <a href=\"#\" onclick=\"markSpam(this.parentNode.parentNode.parentNode);return false;\">(mark as spam)</a>\
                "
                expandDate.appendChild(actions)
            }
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

function openMsgs(e) {
    chFolder(e)
    renderNotifications("message")
}

function openSent(e) {
    chFolder(e)
    renderNotifications("sent")
}

// render date
function renderDateFromUnix(d) {
    d = new Date(d)
    var months = ["Jan", "Feb", "Mar",
                  "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep",
                  "Oct", "Nov", "Dec"]
    var fullString = months[d.getMonth()] + " "
    var day = d.getDate()
    if(day < 10) {
        day = "0" + day
    }
    fullString += day + ", " + d.getFullYear()
    return fullString;
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

// message
function showBannerMsg(message, green) {
    var e = document.getElementById("error-box")
    if(green) {
        e.className = "confirmBox"
    } else {
        e.className = "errorBox"
    }
    e.innerHTML = message
    document.getElementById("inbox_error_container").style.display = "block"
}

// compose button
var username = ""
try {
    username = document.getElementById("masthead-utility-menulink-long")
                       .getElementsByTagName("a")[0].innerHTML
}
catch(error) {}
var hasSession = false;
if(document.cookie
&& document.cookie.indexOf("syncses=") !== -1) {
    hasSession = true
}
var composeOpen = false;
function openCompose() {
    composeOpen = !composeOpen;
    if(composeOpen) {
        document.getElementById("message_reading").className = "hid"
        document.getElementById("headings").style.display = "none"
        document.getElementById("message_composing").className = ""
    } else {
        document.getElementById("message_reading").className = ""
        document.getElementById("headings").style.display = "block"
        document.getElementById("message_composing").className = "hid"
    }

    if(username && hasSession) {
        document.getElementById("compose_from").innerHTML = username;
    } else {
        showBannerMsg("No session token set.", false)
        document.getElementById("message_composing").className += " not_allowed"
        var tb = document.getElementById("message_composing")
                         .getElementsByTagName("input")
        for(var t in tb) {
            t = tb[t]
            if(t.className) {
                t.setAttribute("disabled", "true")
            }
        }
        document.getElementById("compose_message").setAttribute("disabled", "true")
    }
}
if(location.href.indexOf("action_compose=1") !== -1) {
    openCompose()
}

// submit form
function sendMsg() {
    if(localStorage
    && !localStorage.sent) {
        localStorage.sent = "[]"
    }
    if(localStorage) {
        var sent = JSON.parse(localStorage.sent)
        sent.unshift({
            "from": username,
            "subject": document.getElementById("compose_subject").value,
            "content": document.getElementById("compose_message").value,
            "time": Date.now(),
            "type": "message",
            "notificationId": Date.now()
        })
        localStorage.sent = JSON.stringify(sent)
    }
    document.getElementById("composeform").submit()
}

// onload messages
if(location.href.indexOf("msg=") !== -1) {
    var msg = location.href.split("msg=")[1].split("&")[0]
    switch(msg) {
        case "1": {
            showBannerMsg("Inbox server not responding. Try again later.", false)
            break;
        }
        case "2": {
            showBannerMsg("Invalid session token.", false)
            break;
        }
        case "3": {
            showBannerMsg("// UNDER CONSTRUCTION //", false)
            break;
        }
        case "4": {
            showBannerMsg("Can't find this user.", false)
            break;
        }
        case "5": {
            showBannerMsg("Your message has been sent!", true)
            break;
        }
    }
}

// reply button
function replyTo(e) {
    var msg = e.parentNode.parentNode.parentNode
    var from = msg.querySelector(".from.collapsed").innerHTML;
    var subject = msg.querySelector(".subject.collapsed").innerHTML;

    openCompose()
    document.getElementById("compose_to").value = from;
    document.getElementById("compose_subject").value = "Re: " + subject
}

// message actions
function blockUser(user) {
    if(localStorage
    && !localStorage.userFilter) {
        localStorage.userFilter = "[]"
    }

    if(localStorage) {
        var u = JSON.parse(localStorage.userFilter)
        u.push(user)
        localStorage.userFilter = JSON.stringify(u)
        location.href = "/inbox"
    }
}

function markSpam(msg) {
    console.log(msg)
    var from = msg.querySelector(".from.collapsed").innerHTML
    var sub = msg.querySelector(".subject.collapsed").innerHTML
    var content = msg.querySelector(".subject.expanded").innerText


    var sr = new XMLHttpRequest()
    sr = new XMLHttpRequest()
    sr.open("POST", "/mark_spam")
    sr.send(JSON.stringify({
        "from": from,
        "subject": sub,
        "content": content
    }))
    sr.onreadystatechange = function(e) {
        switch(sr.status) {
            case 200: {
                showBannerMsg("Message marked as spam.", true)
                break;
            }
            case 503: {
                showBannerMsg("An error has occured. Try again later.", false)
                break;
            }
        }
    }
}