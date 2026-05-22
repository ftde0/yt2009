/*
=======
/my_subscriptions handler
=======

yt2009, 2022-2023
*/

const utils = require("./yt2009utils")
const fetch = require("node-fetch")
const search = require("./yt2009search")
const channels = require("./yt2009channels")
const yt2009exports = require("./yt2009exports")
const templates = require("./yt2009templates")
const constants = require("./yt2009constants.json")
const fs = require("fs")
const page = fs.readFileSync("../subscriptions.htm").toString()
const config = require("./config.json")
const doodles = require("./yt2009doodles")
const languages = require("./language_data/language_engine")

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
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
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

        code = doodles.applyDoodle(code, req)
        code = languages.apply_lang_to_code(code, req)

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
                if(!r.contents
                || !r.contents.twoColumnBrowseResultsRenderer) {
                    videosTabAvailable = false;
                    callback([])
                    return;
                }
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
        if(!url) {
            if(res.status) {
                res.status(400)
            }
            if(sendRawData) {
                res.send({"time": Date.now(), "videos": []})
            } else {
                res.send("")
            }
            return;
        }
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
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("channel_flags")) {
                    flags += cookie.trimStart().replace("channel_flags=", "")
                                   .split(":").join(";")
                }
            })
        }
        catch(error) {}

        let thumbUrl = "/hqdefault.jpg"
        if(flags.includes("autogen_thumbnail")) {
            thumbUrl = "/1.jpg"
        }

        // adaptive_old, fetches stuff entirely differently 
        if(req.headers.cookie && req.headers.cookie.includes("adaptive_old")
        && flags.includes("only_old")) {
            let lookupDate = search.handle_only_old(flags + ";adaptive_old")
            console.log(lookupDate, flags)
            let channelRequest = {
                "path": url,
                "headers": {},
                "query": {}
            }
            let vids = []
            let page = 1;
            function getNextPage(name, id) {
                let params = {
                    "page": page,
                    "search_sort": "video_date_uploaded"
                }
                search.get_search(
                    `${name} ${lookupDate}`,
                    "", params, (search => {
                        search.forEach(result => {
                            if(result.type == "video"
                            && result.author_url.includes(id)) {
                                vids.push(result)
                            }
                        })
                        if(vids.length <= 10 && page < 5) {
                            page++
                            params.page = page;
                            getNextPage(name, id)
                        } else {
                            render(vids)
                        }
                    }
                ), utils.get_used_token(req), false)
            }
            let parse_new_videos = this.parse_new_videos;
            function render(videos) {
                if(sendRawData) {
                    res.send({
                        "time": Math.floor(Date.now() / 1000),
                        "videos": videos
                    })
                } else {
                    res.send(parse_new_videos({"videos": videos}, flags))
                }
            }
            channels.main(channelRequest, ({"send": function(data) {
                getNextPage(data.name, data.id)
            }}), "", true)
            return;
        }

        // non-adaptive_old
        if(saved_subscription_data[url]
        && Math.floor(Date.now() / 1000) - saved_subscription_data[url].time <= 600) {
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
                        video = video.richItemRenderer.content
                        if(video && video.lockupViewModel) {
                            video = video.lockupViewModel
                            let id = video.contentId
                            let time = "00:00"
                            let badges = []
                            try {
                                let ovs = video.contentImage.thumbnailViewModel
                                               .overlays;
                                ovs.forEach(o => {
                                    if(o.thumbnailBottomOverlayViewModel) {
                                        o = o.thumbnailBottomOverlayViewModel
                                             .badges
                                        o.forEach(badge => {
                                            badge = badge.thumbnailBadgeViewModel
                                            badges.push([
                                                badge.badgeStyle, badge.text
                                            ])
                                        })
                                    }
                                })
                                badges.forEach(b => {
                                    if(b[1].includes(":")) {
                                        try {
                                            let t = yt2009utils.time_to_seconds(
                                                b[1]
                                            )
                                            if(!isNaN(t)
                                            && typeof(t) == "number") {
                                                time = b[1];
                                            }
                                        }
                                        catch(error) {}
                                    }
                                })
                            }
                            catch(error) {console.log(error)}
                            try {
                                video = video.metadata.lockupMetadataViewModel
                                let title = video.title.content
                                let views = "0 views"
                                let upload = "?"
                                let md = []
                                let mt = []
                                let badges = []
                                try {
                                    md = video.metadata.contentMetadataViewModel
                                              .metadataRows
                                    md.forEach(r => {
                                        try {
                                            r.metadataParts.forEach(p => {
                                                if(p.text) {
                                                    mt.push(p.text.content)
                                                }
                                            })
                                        }
                                        catch(error) {}
                                        if(r.badges) {
                                            try {
                                                r.badges.forEach(b => {
                                                    if(b.badgeViewModel) {
                                                        b = b.badgeViewModel;
                                                        badges.push([
                                                            b.badgeStyle,
                                                            b.badgeText
                                                        ])
                                                    }
                                                })
                                            }
                                            catch(error) {}
                                        }
                                    })
                                }
                                catch(error) {}
                                mt.forEach(text => {
                                    if(text && text.includes(" ago")) {
                                        upload = utils.backportDate(text);
                                    } else if((text && text.includes("views"))
                                    || text) {
                                        views = utils.countBreakup(
                                            utils.approxSubcount(
                                                text.split(" ")[0]
                                            )
                                        ) + " views"
                                    }
                                })
                                data.videos.push({
                                    "id": id,
                                    "badges": badges,
                                    "time": time,
                                    "thumbnail": "//i.ytimg.com/vi/"
                                               + id + "/hqdefault.jpg",
                                    "upload": upload,
                                    "views": views,
                                    "title": title
                                })
                            }
                            catch(error) {console.log(error)}
                            return;
                        }
                        if(video && video.videoRenderer) {
                            video = video.videoRenderer
                        }
                        if(!video.viewCountText) {
                            video.viewCountText = {
                                "simpleText": ""
                            }
                        }

                        let badges = []
                        if(video.badges) {
                            try {
                                video.badges.forEach(badge => {
                                    if(badge.metadataBadgeRenderer) {
                                        badge = badge.metadataBadgeRenderer
                                        badges.push(badge.style)
                                    }
                                })
                            }
                            catch(error){}
                        }

                        data.videos.push({
                            "id": video.videoId,
                            "title": video.title.runs[0].text,
                            "views": video.viewCountText.simpleText,
                            "upload": video.publishedTimeText
                                      && video.publishedTimeText.simpleText
                                      ? video.publishedTimeText.simpleText
                                      : "",
                            "thumbnail": "//i.ytimg.com/vi/"
                                        + video.videoId
                                        + thumbUrl,
                            "time": video.lengthText ?
                                    video.lengthText.simpleText : "3:52",
                            "badges": badges
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

        let videosSource = data.videos;
        videosSource = videosSource.filter(s => {return !(
            s.badges
            && (s.badges.includes("BADGE_STYLE_TYPE_MEMBERS_ONLY")
            || s.badges.includes("BADGE_MEMBERS_ONLY"))
        )})

        videosSource.forEach(video => {
            html += templates.subscriptionVideo(video, flags, videoIndex)
            videoIndex++;
            if(videoIndex > 10) {
                videoIndex = 10;
            }
        })

        return html;
    }
}