/*
=======
/my_subscriptions handler
=======

yt2009, 2022
*/

const utils = require("./yt2009utils")
const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const fs = require("fs")
const page = fs.readFileSync("../subscriptions.htm").toString()
const config = require("./config.json")

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
            code = code.replace(`<a href="/channels">Channels</a>`, `<a href="/channels">Channels</a><a href="#">Shows</a>`)
        }

        // czytamy sub
        let subList = utils.get_subscriptions(req)
        let sidebarSubList = ``

        subList.forEach(sub => {
            // !sub.name nie działało. czm? nie wiem.
            if(sub.name.toString() !== "undefined") {
                sidebarSubList += `<div class="subfolder channel-subfolder" onclick="switchChannel(this)" data-url="${sub.url}"><a class="name" href="#">${sub.name}</a></div>`
            }
        })
        sidebarSubList += `<div class="secondary-subscription-list"></div>`

        code = code.replace(`<!--yt2009_subscriptions_insert-->`, sidebarSubList)
        code = require("./yt2009loginsimulate")(req, code);

        res.send(code);
    },



    "fetch_new_videos": function(req, res) {
        let url = req.headers.url;

        // pierwotne checki
        if(!url.startsWith("/channel/")
        && !url.startsWith("/user/")
        && !url.startsWith("/c/")
        && !url.startsWith("/@")) {
            res.send("[yt2009] niepoprawny url kanału")
            return;
        }

        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        let flags = req.query.flags || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("mainpage_flags")) {
                    flags += cookie.trimStart().replace("mainpage_flags=", "").split(":").join(";")
                }
            })
        }
        catch(error) {}

        if(saved_subscription_data[url] && Math.floor(Date.now() / 1000) - saved_subscription_data[url].time <= 86400) {
            res.send(this.parse_new_videos(JSON.parse(JSON.stringify(saved_subscription_data[url])), flags))
        } else {
            // clean fetch
            if(config.env == "dev") {
                console.log(`(${utils.get_used_token(req)}) /my_subscriptions navigate (${url})`)
            }

            fetch("https://youtube.com/" + url + "/videos?view=0&sort=dd&flow=grid", {
                "headers": constants.headers
            }).then(r => {r.text().then(response => {
                // parse danych
                let ytInitialData;
                try {
                    ytInitialData = JSON.parse(response.split("var ytInitialData = ")[1].split(";</script>")[0])
                }
                catch(error) {
                    res.send(`[yt2009] an error has occured while fetching`)
                    return;
                }
                let data = {}
                data.time = Math.floor(Date.now() / 1000)

                data.videos = []
                // lista filmów
                try {
                    ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items.forEach(video => {
                        if(video.gridVideoRenderer) {
                            video = video.gridVideoRenderer
                            data.videos.push({"id": video.videoId, "title": video.title.runs[0].text, "views": video.viewCountText.simpleText, "upload": video.publishedTimeText.simpleText, "thumbnail": req.protocol + "://i.ytimg.com/vi/" + video.videoId + "/hqdefault.jpg"})
                        }
                    })
                }
                catch(error) {
                    ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.richGridRenderer.contents.forEach(video => {
                        if(video.richItemRenderer) {
                            video = video.richItemRenderer.content.videoRenderer
                            data.videos.push({"id": video.videoId, "title": video.title.runs[0].text, "views": video.viewCountText.simpleText, "upload": video.publishedTimeText.simpleText, "thumbnail": "http://i.ytimg.com/vi/" + video.videoId + "/hqdefault.jpg"})
                        }
                    })
                }

                saved_subscription_data[url] = JSON.parse(JSON.stringify(data))
                res.send(this.parse_new_videos(data, flags))
            })})
        }
    },


    "parse_new_videos": function(data, flags) {
        let html = ``
        let fakeViewIndex = 0;
        data.videos.forEach(video => {
            html += `
            <div class="video" style="float: left; margin: 15px 0 0 0; padding: 10px 0 10px 10px; width: 150px;">
                <div style="float: left;">
                    <div style="float: left;">
                        <input type="checkbox" class="checkbox" value="${video.id}" />
                    </div>
                </div>
                <div style="float: left; width: 120px;">
                    <a href="/watch?v=${video.id}" class="video-thumb"><img src="${video.thumbnail}"/></a>
                    <a href="/watch?v=${video.id}" class="title" style="display: block; color: #03c;">${video.title}</a>
                    <div class="video-stats">
                        <div class="video-stat"><span class="stat-upload">Added: ${video.upload}</span></div>
                        <div class="video-stat"><span class="stat-views">Views: ${flags.includes("realistic_view_count") && parseInt(video.views.replace(/[^0-9]/g, "")) >= 100000 ? utils.countBreakup(Math.floor(parseInt(video.views.replace(/[^0-9]/g, "")) / 90)) + " views" : video.views}</span></div>
                        <div class="video-stat"><span class="stat-rating"><img class="yt-rating-5.0" src="/assets/site-assets/pixel-vfl73.gif" alt="5.0" /></span></div>
                    </div>
                </div>
            </div>`
            fakeViewIndex++;
            if(fakeViewIndex >= 12) {
                fakeViewIndex = 11;
            }
        })

        return html;
    }
}