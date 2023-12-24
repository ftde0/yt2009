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

var ntf_r = new XMLHttpRequest()
ntf_r.open("GET", "/get_notifications")
ntf_r.send(null)
ntf_r.onreadystatechange = function(e) {
    if((ntf_r.readyState == 4 || this.readyState == 4 || e.readyState == 4)
    && (ntf_r.status == 200 || ntf_r.status == 304)) {
        // create notificationFilter storage for deleting notifications
        if(localStorage
        && !localStorage.filtered) {
            localStorage.filtered = ""
        }
        if(localStorage
        && !localStorage.msgCache) {
            localStorage.msgCache = "[]"
        }
        
        // only include unread notifications in inbox
        var point = localStorage.lastNotif || 0
        // parse and put in numbers
        notifications = JSON.parse(ntf_r.responseText)
        var uploads = 0;
        var comments = 0;
        var messages = 0;
        notifications.forEach(function(n) {
            if(localStorage.filtered.indexOf(n.time || n.notificationId) !== -1
            || parseInt(n.time || n.notificationId) <= point) return;
            switch(n.type) {
                case "comment": {
                    comments++;
                    break;
                }
                case "upload": {
                    uploads++;
                    break;
                }
                case "message": {
                    messages++
                    break;
                }
            }
        })

        // counter next to username
        var notificationCount = comments + uploads + messages
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
                document.querySelector(".notif-count").innerHTML = "(" + notificationCount + ")"
            }
        }

        // homepage-specifics
        if(location.pathname !== "/") return;
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
        if(messages > 0) {
            var rIcon = document.querySelector(".img-general-messages")
            rIcon.className = rIcon.className.replace(
                "img-general-messages",
                "img-star-general-messages"
            )
            var text = rIcon.parentNode.querySelector("a")
            text.innerHTML = messages + " Personal Message"
            if(comments > 1) {
                text.innerHTML += "s"
            }
        }
    }
}