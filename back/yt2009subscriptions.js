/*
=======
/my_subscriptions handler
=======

yt2009, 2022-2023
*/

const utils = require("./yt2009utils")
const fetch = require("node-fetch")
const yt2009exports = require("./yt2009exports")
const templates = require("./yt2009templates")
const constants = require("./yt2009constants.json")
const fs = require("fs")
const page = fs.readFileSync("../subscriptions.htm").toString()
const config = require("./config.json")
const doodles = require("./yt2009doodles")

let saved_subscription_data = {}

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        req = utils.addFakeCookie(req)
        
        let code = page;

        // resetflags=1
        if(req.query.resetflags == 1) {
            flags = ""
        }

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">Channels</a>`,
                `<a href="/channels">Channels</a><a href="#">Shows</a>`
            )
        }

        // read cookie sublist
        let subList = utils.get_subscriptions(req)
        let sidebarSubList = ``

        subList.forEach(sub => {
            // !sub.name didn't work. idk why.
            // also hide duplicate entries
            if(sub.name.toString() !== "undefined"
            && !sidebarSubList.includes(sub.name.trim())) {
                sidebarSubList += templates.sidebarSub(sub)
            }
        })
        sidebarSubList += `<div class="secondary-subscription-list"></div>`

        code = code.replace(`<!--yt2009_subscriptions_insert-->`, sidebarSubList)
        code = require("./yt2009loginsimulate")(req, code);

        if(req.headers.cookie.includes("f_mode=on")) {
            code = code.replace(
                `<!--f_script-->`,
                `<script src="/assets/site-assets/yt2009_userpage_f.js"></script>`
            )
        }

        code = doodles.applyDoodle(code)

        res.send(code);
    },


    "innertube_videos": function(url, callback) {
        require("./cache_dir/userid_cache").read(url, (id) => {
            // read from cache
            // main channel clean fetch
            fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                yt2009exports.read().api_key
            }`, {
                "headers": constants.headers,
                "referrer": "https://www.youtube.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify({
                    "context": yt2009exports.read().context,
                    "browseId": id
                }),
                "method": "POST",
                "mode": "cors"
            }).then(r => {r.json().then(r => {
                // get /videos param (if exists)
                // fetch videos tab
                let videosTabAvailable = false;
                r.contents.twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
                    if(tab.tabRenderer
                    && tab.tabRenderer.title.toLowerCase() == "videos") {
                        videosTabAvailable = true;
                        setTimeout(function() {
                            let param = tab.tabRenderer.endpoint
                                        .browseEndpoint.params
                            let browseId = tab.tabRenderer.endpoint
                                            .browseEndpoint.browseId
                            getVideosByParam(param, browseId)
                        }, 162)
                    }
                })

                // if no videos, callback empty
                if(!videosTabAvailable) {
                    callback([])
                }

                // we have videos :D
                function getVideosByParam(param, browseId) {
                    fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                        yt2009exports.read().api_key
                    }`, {
                        "headers": constants.headers,
                        "referrer": "https://www.youtube.com/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": JSON.stringify({
                            "context": yt2009exports.read().context,
                            "browseId": browseId,
                            "params": param
                        }),
                        "method": "POST",
                        "mode": "cors"
                    }).then(r => {r.json().then(r => {
                        // videos tab response
                        r.contents.twoColumnBrowseResultsRenderer.tabs
                         .forEach(tab => {
                            if(tab.tabRenderer
                            && tab.tabRenderer.selected) {
                                // send those videos back to be parsed
                                let videos = tab.tabRenderer.content
                                                .richGridRenderer.contents
                                callback(videos)
                            }
                        })
                    })})
                }
            })})
        })
    },


    "fetch_new_videos": function(req, res, sendRawData) {
        let url = req.headers.url;
        if(url.startsWith("http")) {
            let prefix = url.split("/channel/")[0]
                            .split("/user/")[0]
                            .split("/c/")[0]
                            .split("/@")[0]
            url = url.replace(prefix, "")
        }

        // initial check
        if(!url.startsWith("/channel/")
        && !url.startsWith("/user/")
        && !url.startsWith("/c/")
        && !url.startsWith("/@")) {
            res.send("[yt2009] invalid channel url")
            return;
        }

        if(!utils.isAuthorized(req) && !sendRawData) {
            res.send("")
            return;
        }

        let flags = req.query.flags || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("mainpage_flags")) {
                    flags += cookie.trimStart().replace("mainpage_flags=", "")
                                   .split(":").join(";")
                }
            })
            if(req.headers.cookie.includes("fake_dates")) {
                let date = req.headers.cookie
                           .split("fake_dates")[1]
                           .split(":")[1].split(";")[0]
                flags += ";fake_dates" + date
            }
        }
        catch(error) {}

        let thumbUrl = "/hqdefault.jpg"
        if(flags.includes("autogen_thumbnail")) {
            thumbUrl = "/1.jpg"
        }

        if(saved_subscription_data[url]
        && Math.floor(Date.now() / 1000) - saved_subscription_data[url].time <= 86400) {
            if(sendRawData) {
                res.send(
                    JSON.parse(JSON.stringify(saved_subscription_data[url]))
                )
                return;
            }
            res.send(this.parse_new_videos(
                JSON.parse(JSON.stringify(saved_subscription_data[url])), flags
            ))
        } else {
            // clean fetch
            if(config.env == "dev") {
                console.log(`(${
                    utils.get_used_token(req)
                }) /my_subscriptions navigate (${url})`)
            }

            this.innertube_videos(url, (videos) => {
                let data = {}
                data.time = Math.floor(Date.now() / 1000)
                data.videos = []
                
                videos.forEach(video => {
                    if(video.richItemRenderer) {
                        video = video.richItemRenderer.content.videoRenderer
                        data.videos.push({
                            "id": video.videoId,
                            "title": video.title.runs[0].text,
                            "views": video.viewCountText.simpleText,
                            "upload": video.publishedTimeText.simpleText,
                            "thumbnail": "//i.ytimg.com/vi/"
                                        + video.videoId
                                        + thumbUrl,
                            "time": video.lengthText ?
                                    video.lengthText.simpleText : "3:52"
                        })
                    }
                })

                saved_subscription_data[url] = JSON.parse(JSON.stringify(data))
                if(sendRawData) {
                    res.send(data)
                    return;
                }
                res.send(this.parse_new_videos(data, flags))
            })
        }
    },


    "parse_new_videos": function(data, flags) {
        let html = ``
        let videoIndex = 0;
        data.videos.forEach(video => {
            html += templates.subscriptionVideo(video, flags, videoIndex)
            videoIndex++;
            if(videoIndex > 10) {
                videoIndex = 10;
            }
        })

        return html;
    }
}