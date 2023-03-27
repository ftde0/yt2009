const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const ytdl = require("ytdl-core")
const videoDataCache = require("./cache_dir/video_cache_manager")
const waybackFeatures = require("./cache_dir/wayback_watchpage")
const exists = require("./cache_dir/video_exists_cache_mgr")
const search = require("./yt2009search")
const html = require("./yt2009html")
const channels = require("./yt2009channels")
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
            "pretotal": 40,
            "total": 40,
            "return": 0
        }
        html.featured().slice(0, 40).forEach(video => {
            response.content.push(templates.XLFormatVideo(video, req.protocol))
        })
        res.send(response)
    },
    "get_related": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }
        /*
        =======
        create the related JSON
        =======
        */

        // use exp_related and wayback_features if flags enabled
        let response = {
            "content": [],
            "start": 1,
            "total": 0,
            "return": 0
        }
        let relatedSources = ["default-yt"]
        if(req.headers["cookie"].includes("exp_related")) {
            relatedSources = ["exp_related"]
        }
        if(req.headers["cookie"].includes("watch_flags") &&
            req.headers["cookie"]
            .split("watch_flags=")[1]
            .split(";")[0]
            .includes("wayback_features")) {
            relatedSources.unshift("wayback_features")
        }
        let callbackRequiredCount = 0;
        let callbacksMade = 0;
        relatedSources.forEach(source => {
            callbackRequiredCount++;
            switch(source) {
                case "default-yt": {
                    // use default YouTube "related" videos
                    html.get_related_videos(
                    req.query.video_id || "",
                    (videos => {
                        videos.forEach(video => {
                            response.content.unshift(
                                templates.XLFormatVideo(video, req.protocol)
                            )
                        })

                        callbacksMade++;
                        if(callbacksMade == callbackRequiredCount) {
                            response.total = response.content.length
                            res.send(response)
                        }
                    }),
                    "xl-related")
                    break;
                }
                case "exp_related": {
                    // use exp_related flag
                    let lookup_keyword = ""
                    let data = videoDataCache.read()[req.query.video_id || ""]
                                || {"tags": [], "title": ""}
                    // tags
                    data.tags.forEach(tag => {
                        if(lookup_keyword.length < 9) {
                            lookup_keyword += `${tag.toLowerCase()} `
                        }
                    })
                    // first word from the title as a backup
                    if(lookup_keyword.length < 9) {
                        lookup_keyword = data.title.split(" ")[0]
                    }

                    /*let flags = ""
                    if(req.headers["cookie"].includes("watch_flags=")) {
                        flags = req.headers["cookie"]
                                    .split("watch_flags=")[1]
                                    .split(";")[0]
                    }*/
                    search.get_search(
                        lookup_keyword,
                        "only_old",
                        "",
                        (videos => {
                            videos.forEach(video => {
                                if(video.type !== "video") return;
                                response.content.unshift(
                                    templates.XLFormatVideo(video, req.protocol)
                                )
                            })

                            setTimeout(function() {
                                callbacksMade++;
                                if(callbacksMade == callbackRequiredCount) {
                                    response.total = response.content.length
                                    res.send(response)
                                }
                            }, 150)
                        }),
                        utils.get_used_token(req),
                        false
                    )
                    break;
                }
                case "wayback_features": {
                    // use wayback_features data
                    waybackFeatures.read(
                        req.query.video_id || "",
                        (data => {
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

                                        check_table = check_table
                                                    .filter(s => s !== video)
                                        if(check_table.length == 0) {
                                            onActualExistFill();
                                        }
                                    }))
                                }, 150 + Math.floor(Math.random() * 2500))
                            })

                            function onActualExistFill() {
                                actual_exist.forEach(video => {
                                    response.content.unshift(
                                        templates.XLFormatVideo(video,
                                                                req.protocol)
                                    )
                                })

                                callbacksMade++;
                                if(callbacksMade == callbackRequiredCount) {
                                    response.total = response.content.length
                                    res.send(response)
                                }
                            }
                        }),
                        false
                    )
                    break;
                }
            }
        })
    },
    "get_search": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send({})
            return;
        }

        let flags = ""
        if(req.headers.cookie.includes("search_flags")) {
            flags = req.headers.cookie.split("search_flags=")[1].split(";")[0]
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

        search.get_search(
            req.query.vq || "",
            flags,
            "",
            (data => {
                data.forEach(video => {
                    if(video.type !== "video") return;
                    response.content.push(
                        templates.XLFormatVideo(video, req.protocol)
                    )
                })

                response.total = response.content.length;
                res.send(response)
            }),
            utils.get_used_token(req),
            false
        )
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
            path: "/user/" + req.query.user,
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

        // jeśli mamy do czynienia z firefoxem <=25, czekamy na ogg, inaczej callbackujemy mp4
        if(req.headers["user-agent"].includes("Firefox/")) {
            let ffVersion = parseInt(req.headers["user-agent"].split("Firefox/")[1].split(" ")[0])
            if(ffVersion <= 25) {
                waitForOgv = true;
            }
        }

        // pobieranie
        if(fs.existsSync(`../assets/${id}.mp4`)
        && !fs.existsSync(`../assets/${id}.ogg`)
        && waitForOgv) {
            // ogg wymagane
            child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
                res.redirect(`/xl/html5-embed/?video_id=${id}&v=ogg`)
            })
        }
        if(!fs.existsSync(`../assets/${id}.mp4`)) {
            let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)
            
            writeStream.on("finish", () => {
                setTimeout(function() {
                    if(waitForOgv) {
                        child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
                            res.redirect(`/xl/html5-embed/?video_id=${id}&v=ogg`)
                        })
                    } else {
                        res.redirect(`/xl/html5-embed/?video_id=${id}`)
                    }
                    
                }, 250)
            })

            ytdl(`https://youtube.com/watch?v=${id}`, {
                "quality": 18
            })
            .on("error", (error) => {
                res.send("[yt2009] nie można pobrać filmu / can't download the video")
                console.log(error)
            })
            .pipe(writeStream)
        } else {
            if(waitForOgv) {
                child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
                    res.redirect(`/xl/html5-embed/?video_id=${id}&v=ogg`)
                })
            } else {
                res.redirect(`/xl/html5-embed/?video_id=${id}`)
            }
        }
    }
}