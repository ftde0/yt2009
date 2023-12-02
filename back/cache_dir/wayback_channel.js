const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("../yt2009utils")
const html = require("node-html-parser")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(
            fs.readFileSync(`${__dirname}/wayback_channel_cache.json`).toString()
        )
    }
    catch(error) {}
} 

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },
    "read": function(url, callback, resetCache) {
        let empty = {
            "avatarUrl": "", 
            "customTitle": "",
            "fields": [],
            "comments": [],
            "feed": [],
            "subscribers": [],
            "subscriptions": [],
            "friends": [],
            "user-branding": []
        }
        if(!url.includes("user/")) return;
        // get from cache or clean fetch a closest save to 2009-11-11, then parse with this.parse()
        if(cache[url] && !resetCache) {
            callback(cache[url])
        } else {
            console.log("clean")
            fetch(`http://web.archive.org/web/20091111/http://www.youtube.com/${url}`, {
                "headers": {
                    "user-agent": "yt2009 / twt@ybnn670"
                }
            }).catch(error => {
                callback(empty)
            }).then(r => {
                if(!r) {
                    console.log("wayback fail")
                    callback(empty)
                    this.write(url, empty)
                    return;
                }
                r.text().then(res => {
                // if the save is from 2014 or later, don't use
                    try {
                        if(res.split("FILE ARCHIVED ON ")[1]) {
                            let archiveDate = new Date(res.
                                split("FILE ARCHIVED ON ")[1]
                                .split(" AND")[0]);
                            empty.archiveYear = archiveDate.getFullYear()
                            if(archiveDate.getFullYear() >= 2014) {
                                this.write(url, empty)
                                callback(empty)
                            } else {
                                this.parse(html.parse(res), archiveDate.getFullYear(),
                                            (waybackData) => {
                                    this.write(url, waybackData)
                                    callback(waybackData)
                                }, res)
                            }
                        } else {
                            this.write(id, empty)
                            callback(empty)
                        }
                    }
                    catch(error) {
                        console.log(error)
                        this.parse(html.parse(res), archiveDate.getFullYear(),
                                    (waybackData) => {
                            this.write(url, waybackData)
                            callback(waybackData)
                        }, res)
                    }
                })
            })
        }
    },
    "parse": function(data, archiveYear, callback, rawHTML) {
        let callbackMade = false;
        let waybackData = {
            "avatarUrl": "", 
            "customTitle": "",
            "fields": [],
            "comments": [],
            "feed": [],
            "subscribers": [],
            "subscriptions": [],
            "friends": [],
            "user-branding": "",
            "customCSS": "",
            "archiveYear": archiveYear
        }

        // 5sec fallback
        setTimeout(function() {
            if(!callbackMade) {
                callback(waybackData)
            }
        }, 5000)

        // basic
        let avatarImg = data.querySelector(`
        .profileLeftCol img,
        .user-thumb-xlarge img,
        .profile-thumb img,
        .channel-header-profile-image`)
        waybackData.avatarUrl = avatarImg.getAttribute("src")

        let customTitle = data.querySelector(`
        #channel_title,
        #headerTitleEdit,
        .upper-left-section h1`)
        waybackData.customTitle = customTitle ? customTitle.innerHTML : false;

        let userBranding = data.querySelector(`
        #user_branding`)
        waybackData["user-branding"] = userBranding
        ? userBranding.innerHTML : false;

        let customCSS = data.querySelector(`
        #channel-theme-css`)
        waybackData.customCSS = customCSS ? customCSS.innerHTML : false;

        // fields
        if(data.querySelector(".profile_info .show_info")
        || data.querySelector(`[data-view-module-class-id="profile-view"]`)) {
            // channel 2.0
            data.querySelectorAll(".profile_info .show_info").forEach(field => {
                try {
                    waybackData.fields.push({
                        "name": field.querySelector(`*[style*="float:left"]`)
                                .innerHTML,
                        "value": field.querySelector(`*[style*="float:right"]`) ?
                                field.querySelector(`*[style*="float:right"]`)
                                .innerHTML : field.innerHTML,
                    })
                }
                catch(error) {}
            })
            // channel 3.0
            data.querySelectorAll(".user-profile-item").forEach(field => {
                if(field.querySelector("h5")) {
                    waybackData.fields.push({
                        "name": field.querySelector("h5").innerHTML,
                        "value": field.querySelector(".value, p").innerHTML
                    })
                }
            })
        }

        // subscribers
        if(data.querySelector("#user_subscribers-body")) {
            data.querySelector("#user_subscribers-body")
                .querySelectorAll(".user-peep").forEach(user => {
                waybackData.subscribers.push({
                    "icon": user.querySelector("img").getAttribute("src"),
                    "link": user.querySelectorAll("a")[1].getAttribute("href")
                })
            })
        }

        // subscriptions
        if(data.querySelector("#user_subscriptions-body")) {
            data.querySelector("#user_subscriptions-body")
                .querySelectorAll(".user-peep").forEach(user => {
                waybackData.subscriptions.push({
                    "icon": user.querySelector("img").getAttribute("src"),
                    "link": user.querySelectorAll("a")[1].getAttribute("href")
                })
            })
        }

        // friends
        if(data.querySelector("#user_friends-body")) {
            data.querySelector("#user_friends-body")
                .querySelectorAll(".user-peep").forEach(user => {
                waybackData.friends.push({
                    "icon": user.querySelector("img").getAttribute("src"),
                    "link": user.querySelectorAll("a")[1].getAttribute("href")
                })
            })
        }
        
        // comments
        if(data.querySelector(`#user_comments-body`)) {
            data.querySelector("#user_comments-body")
                .querySelectorAll(".commentsTableFull").forEach(comment => {
                let commentAuthor = comment.querySelector(
                    `[name="profile-comment-username"]`
                )
                waybackData.comments.push({
                    "icon": comment.querySelector("img").getAttribute("src"),
                    "name": commentAuthor.innerText,
                    "link": commentAuthor.getAttribute("href")
                                        .split("youtube.com/")[1],
                    "time": comment.querySelector(".profile-comment-time-created")
                                .innerHTML,
                    "content": comment.querySelector(".profile-comment-body")
                                    .innerHTML
                })
            })
        }
        callback(waybackData);
        callbackMade = true;
    }
}

// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/wayback_channel_cache.json`, JSON.stringify(cache))
}, 3600000)