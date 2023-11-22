const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const ytdl = require("ytdl-core")
const videoDataCache = require("./cache_dir/video_cache_manager")
const waybackFeatures = require("./cache_dir/wayback_watchpage")
const exists = require("./cache_dir/video_exists_cache_mgr")
const search = require("./yt2009search")
const html = require("./yt2009html")
const channels = require("./yt2009channels")
const playlists = require("./yt2009playlists")
const videospage = require("./yt2009videos")
const fs = require("fs")
const child_process = require("child_process")

module.exports = {
    "get_mainpage": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }
        /*
        =======
        create the homepage JSON
        =======
        */
        let response = {
            "content": [],
            "start": 1,
            "pretotal": 0,
            "total": 0,
            "return": 0
        }

        let category = "0";
        // custom categories (music, education)
        // edu = education
        // mpt = music
        if(req.query.feed && req.query.feed.includes("mpt_")) {
            category = "31";
        } else if(req.query.feed && req.query.feed.includes("edu")) {
            category = "34"
        }

        let categoryTable = {
            "vehicles": "2",
            "comedy": "35",
            "education": "34",
            "entertainment": "24",
            "film": "1",
            "gadgets": "33",
            "howto": "26",
            "music": "31",
            "news": "32",
            "nonprofits": "29",
            "people": "22",
            "animals": "15",
            "sports": "30",
            "travel": "19"
        }
        if(req.query.c) {
            category = categoryTable[req.query.c] || "0"
        }
        let useSmallThumbs = false;
        if(req.headers.referer
        && req.headers.referer.includes("leanback")) {
            useSmallThumbs = true
        }

        if(req.query.c == "you") {
            res.redirect("/xl/console_profile_recommendation?source=leanback")
            return;
        }

        let videos = videospage.internal_getVideos({
            "query": {
                "c": category,
                "s": "mr"
            }
        }, "")

        function sortPopularVids() {
            videos = videos.sort((a, b) => {
                return utils.bareCount(b.views) - utils.bareCount(a.views)
            })
        }

        switch(req.query.feed) {
            // rising videos
            case "buzz_browse_today": {
                videos = videos.slice(0, 10)
                sortPopularVids()
                break;
            }
            // top rated/most viewed
            case "videos_top_rated_today":
            case "videos_views_today": {
                videos = videos.slice(0, 20)
                sortPopularVids()
                break;
            }
            case "videos_top_rated_week":
            case "videos_views_week": {
                videos = videos.slice(10, 30)
                sortPopularVids()
                break;
            }
            case "videos_top_rated": {
                sortPopularVids()
                break;
            }
            // most viewed/most popular
            case "videos_views":
            case "videos_most_popular_today": {
                videos = videospage.internal_getVideos({
                    "query": {
                        "c": category,
                        "s": "mp"
                    }
                }, "")
                break;
            }
        }

        // finalize request
        videos.forEach(vid => {
            response.content.push(
                templates.XLFormatVideo(vid, req.protocol, useSmallThumbs)
            )
        })

        videos = videos.slice(0, 40)
        response.pretotal = videos.length
        response.total = videos.length
        res.send(response)
    },

    "get_related": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }
        let v = (req.query.video_id || "")
                .replace(/[^a-zA-Z0-9+\-+\_]/g, "")
                .substring(0, 11)
        /*
        =======
        create the related JSON
        =======
        */

        let response = {
            "content": [],
            "start": 1,
            "total": 0,
            "return": 0
        }
        let relatedSource = "default"
        if(req.headers.cookie.includes("exp_related")) {
            relatedSource = "exp_related"
        }
    
        let flags = ""
        if(req.headers.cookie.includes("watch_flags")) {
            flags = req.headers.cookie
                    .split("watch_flags=")[1]
                    .split(";")[0]
            if(flags.includes("wayback_features")) {
                relatedSource = "wayback"
            }
        }

        switch(relatedSource) {
            // use default YouTube "related" videos
            case "default": {
                html.get_related_videos(
                    v, (videos => {
                        videos.forEach(video => {
                            response.content.unshift(
                                templates.XLFormatVideo(video, req.protocol)
                            )
                        })

                        response.total = videos.length
                        res.send(response)
                    }),
                    "xl-related")
                break;
            }

            // use exp_related
            case "exp_related": {
                let lookupKeyword = ""

                html.fetch_video_data(v, (data) => {
                    lookupKeyword = utils.exp_related_keyword(
                        data.tags, data.title
                    )

                    search.related_from_keywords(lookupKeyword, v, "",
                    ((html, rawData) => {
                        rawData.forEach(video => {
                            response.content.unshift(
                                templates.XLFormatVideo(video, req.protocol)
                            )
                        })

                        response.total = rawData.length
                        res.send(response)
                    }), req.protocol, false)

                }, "", "xl_related", false, false, true)
                break;
            }

            // use wayback_features
            // put all wayback videos into a "check_table",
            // which checks if the videos actually exist and are up.
            // if so, put them into the "actual_exist" array.
            case "wayback": {
                waybackFeatures.read(v, (data => {
                    let actual_exist = []
                    let check_table = []
                    if(data.related) {
                        data.related.forEach(video => {
                            check_table.push(video)
                        })
                    }

                    check_table.forEach(video => {
                        setTimeout(function() {
                            exists.read(video.id, (exist => {
                                if(exist) {
                                    actual_exist.push(video)
                                }

                                check_table = check_table.filter(s => s !== video)
                                if(check_table.length == 0) {
                                    onActualExistFill();
                                }
                            }))
                        }, 150 + Math.floor(Math.random() * 1000))
                    })

                    function onActualExistFill() {
                        actual_exist.forEach(video => {
                            response.content.unshift(
                                templates.XLFormatVideo(video, req.protocol)
                            )
                        })

                        response.total = actual_exist.length
                        res.send(response)
                    }
                }), false)
                break;
            }
        }
    },

    "get_search": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }

        let flags = ""
        if(req.headers.cookie.includes("results_flags")) {
            flags = req.headers.cookie.split("results_flags=")[1].split(";")[0]
        }
        /*
        =======
        create the search JSON
        =======
        */

        let response = {
            "content": [],
            "start": 1,
            "total": 0,
            "return": 0
        }

        let useSmallThumbs = false;
        if(req.headers.referer
        && req.headers.referer.includes("leanback")) {
            useSmallThumbs = true
        }

        search.get_search(req.query.vq || "", flags, "", (data => {
            data.forEach(video => {
                if(video.type !== "video") return;
                response.content.push(
                    templates.XLFormatVideo(video, req.protocol, useSmallThumbs)
                )
            })

            response.total = response.content.length;
            res.send(response)
        }), utils.get_used_token(req), false)
    },

    "get_profile": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }

        let flags = ""
        if(req.headers.cookie.includes("channel_flags")) {
            flags = req.headers.cookie.split("channel_flags=")[1].split(";")[0]
        }
        /*
        =======
        create the profile JSON
        =======
        */

        let response = {
            "content": [],
            "return": 0
        }

        channels.main({
            path: "/@" + req.query.user,
            query: {
                "resetcache": "0"
            },
            headers: req.headers,
            log: false
        }, {
            "send": function(data) {
                if(req.originalUrl.includes("profile_videos")) {
                    let videosXLFormat = []
                    data.videos.forEach(video => {
                        videosXLFormat.push(
                            templates.XLFormatVideo(video, req.protocol)
                        )
                    })
                    response.start = 1;
                    response.pretotal = videosXLFormat.length;
                    response.total = videosXLFormat.length;
                    response.content = videosXLFormat
                } else {
                    response.content[0] = {
                        "description": data.properties.description,
                        "image_url": data.avatar
                    }
                }
                res.send(response)
            }
        }, flags, true)
    },

    "xl_embed": function(req, res) {
        let waitForOgv = false;
        let id = req.query.video_id || ""

        // if firefox <= 25 wait for ogg, otherwise callback mp4
        if(req.headers["user-agent"].includes("Firefox/")) {
            let ffVersion = parseInt(req.headers["user-agent"].split("Firefox/")[1].split(" ")[0])
            if(ffVersion <= 25) {
                waitForOgv = true;
            }
        }

        // download
        let ffmpegCommand = [
            "ffmpeg",
            `-i ${__dirname}/../assets/${id}.mp4`,
            ` -b 1500k -ab 128000 -speed 2`,
            `${__dirname}/../assets/${id}.ogg`
        ]
        if(fs.existsSync(`../assets/${id}.mp4`)
        && !fs.existsSync(`../assets/${id}.ogg`)
        && waitForOgv) {
            // ogg required
            child_process.exec(ffmpegCommand.join(" "),
            (error, stdout, stderr) => {
                res.redirect(`/xl/html5-embed/?video_id=${id}&v=ogg`)
            })
        }
        if(!fs.existsSync(`../assets/${id}.mp4`)) {
            utils.saveMp4(id, (data) => {
                if(!data) {
                    res.send("[yt2009] can't download the video")
                    return;
                }
                if(waitForOgv) {
                    child_process.exec(ffmpegCommand.join(" "),
                    (error, stdout, stderr) => {
                        res.redirect(`/xl/html5-embed/?video_id=${id}&v=ogg`)
                    })
                } else {
                    try {
                        res.redirect(`/xl/html5-embed/?video_id=${id}`)
                    }
                    catch(error) {}
                }
            })
        } else {
            if(waitForOgv) {
                child_process.exec(ffmpegCommand.join(" "),
                (error, stdout, stderr) => {
                    res.redirect(`/xl/html5-embed/?video_id=${id}&v=ogg`)
                })
            } else {
                try {
                    res.redirect(`/xl/html5-embed/?video_id=${id}`)
                }
                catch(error) {}
            }
        }
    },

    // add a video to favorites through xl
    "add_favorites": function(req, res) {
        let videoId = ""
        if(req.body
        && req.body.toString().includes("&video_id=")) {
            videoId = req.body.toString()
                    .split("video_id=")[1]
                    .split("&")[0]
            
            // get xl favorites if exist
            let favorites = ""
            if(req.headers.cookie.includes("xl_favs=")) {
                favorites = req.headers.cookie
                            .split("xl_favs=")[1]
                            .split(";")[0]
            }
            if(!favorites.includes(videoId)) {
                favorites += videoId + ":"
            }
            let cookie = [
                `xl_favs=${favorites}; `,
                `Path=/xl; `,
                `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
            ].join("")
            res.status(200)
            res.set("set-cookie", cookie)
            res.send({
                "content": [],
                "start": 1,
                "total": 0,
                "return": 0
            })
        }
    },

    // get channel's playlists
    "get_channel_playlists": function(req, callback) {
        let vlist = []
        if(!req.query.user) {
            callback(vlist)
            return;
        }
        channels.main({
            path: "/@" + req.query.user,
            query: {
                "resetcache": "0"
            },
            headers: req.headers,
            log: false
        }, {
            "send": function(data) {
                channels.get_additional_sections(
                data, "exp_playlists", () => {
                    let p = channels.get_cache.read("playlist")[data.id]
                    p.forEach(playlist => {
                        vlist.push({
                            "title": playlist.name,
                            "playlist_id": playlist.id,
                            "image_url": playlist.thumbnail,
                            "video_id": playlist.thumbnail.split("vi/")[1].split("/")[0]
                        })
                    })

                    callback(vlist)
                })
            }
        }, "", true)
    },

    // get favorites
    "get_favorites": function(req, res) {
        if(!req.query.user) {
            res.sendStatus(400)
            return;
        }
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }
        let response = {
            "content": [],
            "return": 0,
            "start": 1
        }
        // check if we need to use login_simulate (local) favs
        // or actually get the user's favorites playlist
        let loginSim = false;
        if(req.headers.cookie.includes("login_simulate")) {
            loginSim = req.headers.cookie
                       .split("login_simulate")[1]
                       .split(":")[0]
                       .split(";")[0]
        }

        if(loginSim && loginSim == req.query.user) {
            // use login_simulate favorites
            let videoIds = []
            if(req.headers.cookie.includes("xl_favs=")) {
                videoIds = req.headers.cookie
                           .split("xl_favs=")[1]
                           .split(";")[0]
                           .split(":")
                videoIds = videoIds.filter(s => s !== "")
            }

            html.bulk_get_videos(videoIds, () => {
                videoIds.forEach(id => {
                    let v = html.get_cache_video(id)
                    response.content.push(templates.XLFormatVideo(v, req.protocol))
                })

                response.pretotal = videoIds.length;
                response.total = videoIds.length;

                res.send(response)
            })
        } else {
            // try getting the channel's "Favorites" playlist
            this.get_channel_playlists(req, (data) => {
                data.forEach(p => {
                    if(p.title !== "Favorites") return;
                    playlists.parsePlaylist(p.playlist_id, (data) => {
                        data.videos.forEach(video => {
                            response.content.push(
                                templates.XLFormatVideo(video, req.protocol)
                            )
                        })
                    })
                })

                response.pretotal = response.content.length;
                response.total = response.content.length;
                res.send(response)
            })
        }
        
    },

    "get_playlists": function(req, res) {
        if(!req.query.user) {
            res.sendStatus(400)
            return;
        }
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }
        let response = {
            "content": [],
            "return": 0,
            "start": 1
        }

        let loginSim = false;
        if(req.headers.cookie.includes("login_simulate")) {
            loginSim = req.headers.cookie
                       .split("login_simulate")[1]
                       .split(":")[0]
                       .split(";")[0]
        }

        if(loginSim && loginSim == req.query.user) {
            res.send(response)
        } else {
            this.get_channel_playlists(req, (data) => {
                response.content = data
                response.pretotal = data.length;
                response.total = data.length;
                res.send(response)
            })
        }
    },

    "get_recommendations": function(req, res) {
        // get videos to base our recommendations on
        let sourceVids = []
        let processedVideos = 0;
        let videoSuggestions = []
        let results = []
        let smallThumbs = false
        let cookieName = "xl_history="
        if(req.query.source == "leanback") {
            cookieName = "leanback_history="
            smallThumbs = true
        }
        if(req.headers.cookie
        && req.headers.cookie.includes(cookieName)) {
            sourceVids = req.headers.cookie
                         .split(cookieName)[1]
                         .split(";")[0]
                         .split(":")
        }
        sourceVids = sourceVids.filter(s => s !== "")
        if(sourceVids.length == 0) {
            res.sendStatus(404)
            return;
        }

        // get base videos' keywords
        // i did not partially reuse the code from homepage recommendations
        // i swear
        html.bulk_get_videos(sourceVids, () => {
            sourceVids.forEach(vid => {
                vid = html.get_cache_video(vid)
                let keyword = utils.exp_related_keyword(vid.tags, vid.title)
                search.related_from_keywords(keyword, vid.id, "",
                (html, rawData) => {
                    rawData.forEach(video => {
                        videoSuggestions.push(video)
                    })
                    processedVideos++;
                    if(processedVideos == sourceVids.length) {
                        createSuggestionsResponse();
                        return;
                    }
                }, req.protocol, false)
            })
        })

        function createSuggestionsResponse() {
            // get 8 random videos from videoSuggestions
            let results = []
            while(results.length !== 15) {
                let randomVideo = videoSuggestions[
                    Math.floor(Math.random() * videoSuggestions.length)
                ]
                if(!randomVideo) break;

                let loopCount = 0;
                let loopLimit = 30;
                let s = JSON.stringify(results)
                while(s.includes(randomVideo.id) && loopCount !== loopLimit) {
                    randomVideo = videoSuggestions[
                        Math.floor(Math.random() * videoSuggestions.length)
                    ]
                    loopCount++;
                }

                
                results.push(templates.XLFormatVideo(
                    randomVideo, req.protocol, smallThumbs
                ))
            }

            // XL RESPONSE
            res.send({
                "content": results,
                "start": 1,
                "pretotal": results.length,
                "total": results.length,
                "return": 0
            })
        }
    }
}