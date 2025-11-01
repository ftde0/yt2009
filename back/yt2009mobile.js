const yt2009html = require("./yt2009html")
const ytsearch = require("./yt2009search")
const channels = require("./yt2009channels")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const videostab = require("./yt2009videos")
const fs = require("fs")
const child_process = require("child_process")
const config = require("./config.json")
const constants = require("./yt2009constants.json")
const yt2009playlists = require("./yt2009playlists")
const mobileflags = require("./yt2009mobileflags")
const yt2009_exports = require("./yt2009exports")
const mobileauths = require("./yt2009mobileauths")
const yt2009jsongdata = require("./yt2009jsongdata")
const rtsp_server = `rtsp://${config.ip}:${config.port + 2}/`
const ffmpeg_process_144 = [
    "ffmpeg",
    "-i \"$1\"",
    "-ac 1",
    "-acodec aac",
    "-c:v libx264",
    "-s 256x144",
    "\"$2\""
]
const ffmpeg_process_3gp = [
    "ffmpeg",
    "-i \"$1\"",
    "-c:a libopencore_amrnb",
    "-c:v h263",
    "-ac 1",
    "-ar 8000",
    "-s 176x144",
    "\"$2\""
]
const ffmpeg_process_wmv = [
    "ffmpeg",
    "-i \"$1\"",
    "-b:a 32k",
    "-b:v 200k",
    "-s 256x192",
    "-filter:v fps=17",
    "-c:v wmv1",
    "\"$2\""
]
const ffmpeg_process_xvid = [
    "ffmpeg",
    "-i \"$1\"",
    "-c:v mpeg4",
    "-vtag xvid",
    "-vf scale=640:480",
    "\"$2\""
]
const ffmpeg_stream_mp4 = [
    "ffmpeg",
    "-re -i",
    "\"$1\"",
    "$2",
    "-pix_fmt yuv420p",
    "-f rtsp",
    "-rtsp_transport udp",
    "$3"
]
const ffmpeg_stream_3gp = [
    "ffmpeg",
    "-re -i",
    "\"$1\"",
    "$2",
    "-c:v h263",
    "-c:a libopencore_amrnb",
    "-f rtsp",
    "-rtsp_transport udp",
    "$3"
]
const categories = {
    "Autos": "2",
    "Comedy": "35",
    "Education": "34",
    "Entertainment": "24",
    "Film": "1",
    "Games": "33",
    "Music": "31",
    "News": "32",
    "Nonprofit": "29",
    "People": "22",
    "Animals": "15",
    "Tech": "28",
    "Sports": "30",
    "Travel": "19",
    "Howto": "26",
}

const watchpage_html = fs.readFileSync("../mobile/watchpage.htm").toString();
const search_html = fs.readFileSync("../mobile/search.htm").toString();
const comments_html = fs.readFileSync("../mobile/view-comment.htm").toString();
const homepage_html = fs.readFileSync("../mobile/mainpage.htm").toString()
const channelpage_html = fs.readFileSync("../mobile/channel.htm").toString()

let syncCommentCallbacks = {}

module.exports = {
    // create the watch page
    "create_watchpage": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=rtsp")
            return;
        }
        let id = req.query.v.substring(0, 11)
        yt2009html.fetch_video_data(id, (data) => {
            if(!data) {
                res.send(`[yt2009] something went wrong while getting video data`)
                return;
            }

            let code = watchpage_html;
            code = code.split(`yt2009_id`).join(data.id)
            code = code.split(`yt2009_link`).join(
                this.playback_link(req, data.id)
            )
            code = code.replace(`yt2009_title`, data.title)
            code = code.replace(`yt2009_description`, data.description)
            code = code.replace(
                `yt2009_channel`,
                "/mobile/profile?desktop_uri=" + encodeURIComponent(data.author_url)
            )
            code = code.replace(`yt2009_length`, utils.seconds_to_time(data.length))
            code = code.replace(`yt2009_views`, data.viewCount + " views")
            if((req.headers.cookie || "").includes("old_experience=1")) {
                code = code.replace(
                    `yt2009_user`, utils.asciify(data.author_name)
                )
            } else {
                code = code.replace(`yt2009_user`, data.author_name)
            }
            code = code.replace(`yt2009_upload`, data.upload)
            code = code.replace(`yt2009_thumbnail`, `http://i.ytimg.com/vi/${data.id}/hqdefault.jpg`)

            // flash players
            if(req.headers.cookie
            && (req.headers.cookie.includes("http_flash_flv")
            || req.headers.cookie.includes("http_flash_mp4"))) {
                let flashId = id;
                if(req.headers.cookie.includes("http_flash_mp4")) {
                    flashId += "/mp4"
                }
                code = code.replace(
                    `<!--yt2009_flash-->`,
                    `<div style="text-align:center;">` +
                    templates.flashObject(
                        [`/alt-swf/mp.swf`,
                        `?base_yt_url=${encodeURIComponent(
                            `http://${config.ip}:${config.port}`
                        )}`,
                        `&onFlashError=ytm.onFlashError&allowseekahead=1`,
                        `&controlssize=10`,
                        `&videoId=${flashId}`
                        ].join(""),
                        330, 278
                    ) + `</div>`
                )
                code = code.replace(
                    ` id="yt2009-watch-video-link"`,
                    ` id="yt2009-watch-video-link" style="visibility:hidden;"`
                )
                code = code.replace(
                    ` id="yt2009-video-thumbnail"`,
                    ` id="yt2009-video-thumbnail" style="display:none;"`
                )
            }

            // related
            let relatedHTML = ``
            let relatedIndex = 0;
            if((req.headers.cookie || "").includes("old_experience=1")) {
                // exp_related
                let keyword = utils.exp_related_keyword(data.tags, data.title)
                ytsearch.related_from_keywords(
                    keyword, data.id, "remove_username_space;realistic_view_count",
                    ((html, data) => {
                        create(data)
                    }), "http"
                )
                function create(data) {
                    data.forEach(video => {
                        if(utils.time_to_seconds(video.length) >= 1800
                        || relatedIndex > 4) return;
                        video.upload = utils.fakeDatesModern("2012", video.upload)

                        relatedHTML += templates.mobile_video(video)
                        relatedIndex++;
                    })
                    code = code.replace(`<!--yt2009_related-->`, relatedHTML)
                    res.send(code)
                }
            } else {
                // default related
                data.related.forEach(video => {
                    if(utils.time_to_seconds(video.length) >= 1800
                    || relatedIndex > 4) return;
    
                    relatedHTML += templates.mobile_video(video)
                    relatedIndex++;
                })
    
                code = code.replace(`<!--yt2009_related-->`, relatedHTML)
    
                res.send(code)
            }
        }, req.headers["user-agent"], utils.get_used_token(req), false)
    },

    // video searching
    "search": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=rtsp")
            return;
        }
        let code = search_html
        let query = req.query.q;

        let searchHTML = ``
        if((req.headers.cookie || "").includes("old_experience=1")) {
            query += " before:2010-04-01"
        }
        ytsearch.get_search(query, "", "", (data => {
            let videoIndex = 0;
            data.forEach(video => {
                if(videoIndex > 10 || video.type !== "video") return;
                let videoUpload = JSON.parse(JSON.stringify(video.upload))
                if((req.headers.cookie || "").includes("old_experience=1")) {
                    videoUpload = utils.fakeDatesModern("2012", video.upload)
                }

                searchHTML += templates.mobile_video(video, videoUpload)
                videoIndex++;
            })


            code = code.replace(`<!--yt2009_search-->`, searchHTML)
            res.send(code)
        }), utils.get_used_token(req))
    },

    // process video when watch requested
    // use a so-called "task list" to not repeat code and it's easier to modify
    "video_process": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=rtsp")
            return;
        }
        let cookie = req.headers.cookie || ""
        let playback = "rtsp_mp4"
        cookie.split(";").forEach(c => {
            if(c.trimStart().startsWith("mobile_playback=")) {
                playback = c.trimStart().replace(
                    "mobile_playback=", ""
                )
            }
        })

        if(req.originalUrl.split("/")[1]) {
            // url override playback method for http
            // (compatibility with cookieless)
            let method = req.originalUrl.split("/")[1]
                            .split("?")[0].split("#")[0]
            switch(method) {
                case "http_3gp":
                case "http_wmv":
                case "mp4_144":
                case "http_xvid": {
                    playback = method;
                }
            }
        }
        
        let taskLookup = {
            "rtsp_mp4": [ffmpeg_process_144, "rtsp", "id-144.mp4"],
            "rtsp_mp4_an": [ffmpeg_process_144, "mute", "rtsp", "id-144.mp4"],
            "rtsp_3gp": [ffmpeg_process_3gp, "rtsp", "id.3gp"],
            "rtsp_3gp_an": [ffmpeg_process_3gp, "mute", "rtsp", "id.3gp"],
            "http_mp4": ["id.mp4"],
            "http_mp4_144": [ffmpeg_process_144, "id-144.mp4"],
            "http_3gp": [ffmpeg_process_3gp, "id.3gp"],
            "http_wmv": [ffmpeg_process_wmv, "id.wmv"],
            "http_xvid": [ffmpeg_process_xvid, "id.avi"]
        }

        let tasks = taskLookup[playback]
        let tasksCompleted = 0;
        this.processTask(
            (req.query.v || req.query.video_id),
            tasks, tasksCompleted, res, () => {}
        )
    },

    "processTask": function(id, tasks, index, res, callback) {
        let task = tasks[index]
        let taskFilled = false
        let baseFile = __dirname + `/../assets/${id}.mp4`
        // get filename for target tasks
        let fileName = tasks[tasks.length - 1]
        let output = __dirname + `/../assets/${fileName.replace("id", id)}`
        // tasks
        if(typeof(task) == "object") {
            // array task - process command
            if(fs.existsSync(output)) {
                this.processTask(id, tasks, index + 1, res, callback)
                return;
            }
            let t = this;
            function onCanPerformTask() {
                let command = task.join(" ")
                              .replace("$1", baseFile)
                              .replace("$2", output)
                child_process.exec(command, (err, stdout, stderr) => {
                    // go with the next task
                    if(!tasks[index + 1]) return;
                    t.processTask(id, tasks, index + 1, res, callback)
                    return;
                })
                taskFilled = true
            }
            if(fs.existsSync(baseFile)) {
                onCanPerformTask()
            } else {
                utils.saveMp4(id, () => {
                    onCanPerformTask()
                })
            }
        }
        if(task == "rtsp") {
            // rtsp setup task
            let streamId = Math.floor(Math.random() * 37211)
            let path = `${rtsp_server}video/${id}-${streamId}`
            let command = ffmpeg_stream_mp4
            if(fileName.includes("3gp")) {
                command = ffmpeg_stream_3gp
            }
            command = command.join(" ")
                      .replace("$1", output)
                      .replace("$2", tasks.includes("mute") ? "-an" : "")
                      .replace("$3", path)
            child_process.exec(command, (err, stdout, stderr) => {})
            setTimeout(function() {
                res.redirect(path)
            }, 100)
            taskFilled = true;
        }
        if(typeof(task) == "string"
        && task.startsWith("id")
        && !tasks.includes("rtsp")) {
            // http task
            if(fs.existsSync(output)) {
                res.redirect(`/assets/${fileName.replace("id", id)}`)
            } else {
                if(typeof(tasks[0]) !== "object") return;
                let command = tasks[0].join(" ")
                              .replace("$1", baseFile)
                              .replace("$2", output)
                child_process.exec(command, (err, stdout, stderr) => {
                    // go with the next task
                    if(!tasks[index + 1]) return;
                    this.processTask(id, tasks, index + 1, res, callback)
                    return;
                })
            }
            
            taskFilled = true;
        }
        // default handling - go over the task
        if(!taskFilled) {
            this.processTask(id, tasks, index + 1, res, callback)
        }
    },

    // mobile homepage
    "create_homepage": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=rtsp")
            return;
        }
        let code = homepage_html;
        let index = 0;

        // get homepage videos, fill in the html template and send
        yt2009html.featured().splice(0, 4).forEach(video => {
            index++;
            code = code.split(`v${index}_id`).join(video.id)
            code = code.split(`v${index}_link`).join(
                this.playback_link(req, video.id)
            )
            code = code.split(`v${index}_time`).join(
                utils.seconds_to_time(video.time)
            )
            code = code.split(`v${index}_title`).join(video.title)
            code = code.split(`v${index}_views`).join(video.views)
            code = code.split(`v${index}_date`).join(
                video.upload && req.headers.cookie
                && req.headers.cookie.includes("old_experience=1")
                ? utils.fakeDatesModern("2012", video.upload)
                : utils.genFakeDate()
            )
        })
        res.send(code)
    },

    // comments view page
    "view_comments": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=rtsp")
            return;
        }
        let code = comments_html
        let actual_comments = ``
        req = utils.addFakeCookie(req)
        let id = req.query.v.substring(0, 11)

        yt2009html.fetch_video_data(id, (data => {
            // fill video data
            code = code.split("yt2009_id").join(data.id)
            code = code.split(`yt2009_link`).join(
                this.playback_link(req, data.id)
            )
            code = code.split("yt2009_title").join(data.title)
            code = code.split("yt2009_length").join(
                utils.seconds_to_time(data.length)
            )
            code = code.split("yt2009_publish").join(data.upload)
            code = code.split("yt2009_views").join(
                utils.countBreakup(data.viewCount) + " views"
            )
            code = code.split("yt2009_uploader").join(
                utils.asciify(data.author_name)
            )

            // fill comments and send
            data.comments.forEach(comment => {
                if(!comment.content) return;
                if(comment.content.length > 500) return;
                let commentTime = comment.time
                if(req.headers.cookie
                && req.headers.cookie.includes("old_experience=1")) {
                    commentTime = utils.fakeDatesModern("2012", comment.time)
                }
                actual_comments += `
            <div style="border-top:1px dashed #ADADAD;padding-top:8px">
                <a href="#">${utils.asciify(comment.authorName)}</a>&nbsp;&nbsp;${commentTime}
            </div>
            <div style="padding-top:3px;padding-bottom:5px">${comment.content}</div>`
            })
            code = code.replace(`<!--yt2009_comments-->`, actual_comments)
            res.send(code)
        }), "", utils.get_used_token(req), false, false)
    },

    "playback_link": function(req, id) {
        let link = "/mobile/create_rtsp?v=" + id // default
        let cookie = req.headers.cookie || ""
        let playback = "rtsp_mp4"
        cookie.split(";").forEach(c => {
            if(c.trimStart().startsWith("mobile_playback=")) {
                playback = c.trimStart().replace(
                    "mobile_playback=", ""
                )
            }
        })

        let linkLookup = {
            "rtsp_mp4_an": "/mobile/create_rtsp?v=" + id + "&muted=1",
            "rtsp_3gp": "/mobile/create_rtsp?v=" + id + "&3gp=1",
            "rtsp_3gp_an": "/mobile/create_rtsp?v=" + id + "&3gp=1&muted=1",
            "http_mp4": "/get_video?video_id=" + id + "/mp4",
            "http_mp4_144": "/mp4_144?v=" + id,
            "http_3gp": "/http_3gp?v=" + id,
            "http_wmv": "/http_wmv?v=" + id,
            "http_xvid": "/http_xvid?v=" + id,
            "http_flash_flv": "/mobile/watch?v=" + id,
            "http_flash_mp4": "/mobile/watch?v=" + id
        }

        if(linkLookup[playback]) {
            link = linkLookup[playback]
            if(playback == "http_mp4" && config.trusted_context) {
                link += "&" + require("./yt2009trustedcontext").generateContext(
                    id, "PLAYBACK_STD", false
                )
            }
        }

        return link;
    },

    // channels
    "channels": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.redirect("/auth.html?redir=rtsp")
            return;
        }
        let original = req.query.desktop_uri
        let code = channelpage_html
        if(!original) {
            res.status(400)
            res.send("no desktop_uri")
            return;
        }
        channels.main({"path": original, 
        "headers": {"cookie": ""},
        "query": {"f": 0}}, 
        {"send": function(data) {
            // metadata
            code = code.split(`yt2009_username`).join(utils.asciify(data.name))
            code = code.split(`yt2009_subcount`).join(
                (data.properties.subscribers || "")
                .replace("subscribers", "")
                .replace("subscriber", "")
                + (utils.approxSubcount(
                    (data.properties.subscribers || "0")
                ) > 1 ? " subscribers" : "subscriber")
            )
            code = code.split(`yt2009_avatar`).join(data.avatar)

            // only_old/old_experience
            if((req.headers.cookie || "").includes("old_experience=1")) {
                ytsearch.get_search(
                    `"${data.name}" before:2010-04-01`,
                    "realistic_view_count;fake_dates2012",
                    "",
                    (data) => {
                        let videoCount = 0;
                        data.forEach(d => {
                            if(d.type == "video") {
                                videoCount++
                            }
                        })

                        if(videoCount > 0) {
                            putVideos(data)
                        } else {
                            putVideos(data.videos)
                        }
                    },
                    "",
                    false
                ) 
            } else { 
                // default
                putVideos(data.videos)
            }
        }}, "", true)

        // add valid html
        function putVideos(videos) {
            // approximated channel views
            let videoViewCount = 0;
            videos.forEach(video => {
                if(!video.type || video.type == "video") {
                    videoViewCount += utils.bareCount(video.views)
                }
            })

            let channelViewCount = Math.floor(videoViewCount / 90)
            code = code.split(`yt2009_cviews`).join(
                utils.countBreakup(channelViewCount)
            )

            // videos
            let videosHTML = ``
            videos.slice(0, 10).forEach(v => {
                if(!v.type || v.type == "video") {
                    if((req.headers.cookie || "").includes("old_experience=1")) {
                        v.upload = utils.fakeDatesModern("2012", v.upload)
                    }
                    videosHTML += templates.mobile_video(v)
                }
            })

            code = code.replace(`<!--yt2009_videos-->`, videosHTML)

            res.send(code)
        }
    },

    // apk feeds
    "feeds": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        // mobileflags
        if(req.headers["x-gdata-device"]
        && req.headers["x-gdata-device"].includes("device-id=\"")) {
            let deviceId = req.headers["x-gdata-device"]
                               .split("device-id=\"")[1]
                               .split("\"")[0];
            mobileflags.write_session(req.ip, deviceId)
        }
        // rewrite urls of standardfeeds for very old android vers
        if(req.headers["user-agent"]
        && req.headers["user-agent"].includes("Android-YouTube/1.1")) {
            let endpoint = req.originalUrl.split("?")[0].split("#")[0]
            endpoint = endpoint.split("/")
            endpoint = endpoint[endpoint.length - 1]
            /*if(config.env == "dev") {
                console.log(req.originalUrl)
            }*/
            switch(endpoint.toLowerCase()) {
                case "most_viewed":
                case "top_rated": {
                    req.originalUrl = req.originalUrl.replace(
                        endpoint, "most_popular"
                    )
                    break;
                }
                case "most_discussed":
                case "most_recent": {
                    req.originalUrl = req.originalUrl.replace(
                        endpoint, "recently_featured"
                    )
                    break;
                }
            }
        }
        // handle category feeds in a separate function
        if(req.originalUrl.includes("most_viewed_")
        || req.originalUrl.includes("most_discussed_")
        || req.originalUrl.includes("top_rated_")
        || req.originalUrl.includes("top_favorites_")
        || req.originalUrl.includes("most_popular_")) {
            this.categoryFeeds(req, res)
            return;
        }
        // default feeds
        let start = parseInt(req.query["start-index"] || 1)
        if(start < 0 || isNaN(start) || start == 1) {
            start = 0;
        }
        let max = parseInt(req.query["max-results"] || 25)
        if(max < 0 || isNaN(max)) {
            max = start + 25
        }
        if(max > 100) {
            max = 100
        }
        if(req.originalUrl.includes("featured")
        || (req.originalUrl.includes("most_discussed")
        && req.headers["user-agent"]
        && req.headers["user-agent"].includes("/4.1"))) {
            // send full feed on recently_featured
            // 25 recently watched
            let response = templates.gdata_feedStart
                           .split(">1<").join(`>${start}<`)
            let videosAdded = 0;
            let vids = yt2009html.featured().slice(start, start + max)
            if(req.query.alt == "json") {
                yt2009jsongdata.standardfeed(vids, res, req.query.callback)
                return;
            }
            vids.forEach(video => {
                yt2009html.fetch_video_data(video.id, (data) => {
                    let authorName = utils.asciify(video.uploaderName)
                    if(data.author_url.includes("/@")) {
                        authorName = data.author_url.replace("/@", "")
                    }
                    response += templates.gdata_feedVideo(
                        video.id,
                        video.title,
                        video.author_handle || utils.asciify(authorName),
                        utils.bareCount(video.views),
                        utils.time_to_seconds(data.length || 0),
                        (!req.light ? data.description : ""),
                        data.upload,
                        (data.tags || []).join(),
                        data.category,
                        mobileflags.get_flags(req).watch,
                        data.qualities,
                        {"authorId": data.author_id, "omitY9": true}
                    )
                    videosAdded++;
                    if(videosAdded >= vids.length) {
                        response += templates.gdata_feedEnd
                        res.set("content-type", "application/atom+xml")
                        res.send(response)
                    }
                }, "", "", false, false, true)
            })
            response = response.split(">25<").join(`>${videosAdded}<`)
            if(vids.length == 0) {
                response += templates.gdata_feedEnd
                res.set("content-type", "application/atom+xml")
                res.send(response)
            }
        } else if(req.originalUrl.includes("most_popular")) {
            // grab popular videos (100k+ views) from featured 25-50
            // and put them into the feed
            let response = templates.gdata_feedStart
                           .split(">1<").join(`>${start}<`)
            let videosAdded = 0;
            let indexes = [start, start + max]
            if(yt2009html.featured().length > 70) {
                indexes = [start + 25, start + 25 + max]
            }
            if(req.query.alt == "json") {
                yt2009jsongdata.standardfeed(
                    yt2009html.featured().slice(indexes[0], indexes[1]), res
                )
                return;
            }
            yt2009html.featured().slice(indexes[0], indexes[1]).forEach(video => {
                yt2009html.fetch_video_data(video.id, (data) => {
                    if(utils.bareCount(video.views) > 100000) {
                        response += templates.gdata_feedVideo(
                            video.id,
                            video.title,
                            video.author_handle
                            || utils.asciify(video.uploaderName),
                            utils.bareCount(video.views),
                            utils.time_to_seconds(data.length || 0),
                            (!req.light ? data.description : ""),
                            data.upload,
                            (data.tags || []).join(),
                            data.category,
                            mobileflags.get_flags(req).watch,
                            data.qualities,
                            {"authorId": data.author_id, "omitY9": true}
                        )
                        videosAdded++
                    }
                }, "", "", false, false, true)
            })
            response = response.split(">25<").join(`>${videosAdded}<`)
            response += templates.gdata_feedEnd
            res.set("content-type", "application/atom+xml")
            res.send(response)
        } else {
            // send empty video feeds on other requests
            if(req.query.alt == "json") {
                yt2009jsongdata.standardfeed([], res)
                return;
            }
            res.set("content-type", "application/atom+xml")
            res.send(
                templates.gdata_feedStart.split(">25<").join(">0<")
                + templates.gdata_feedEnd
            )
        }
    },

    // apk videos
    "videoData": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "single")) return;
        if(req.query.alt == "json") {
            yt2009jsongdata.video(req, res)
            return;
        }
        let id = req.originalUrl.split("/videos/")[1]
                                .split("?")[0]
                                .split("#")[0]
        if(id == "12345678911" && fs.existsSync("./yt2009mobilehelper.js")) {
            require("./yt2009mobilehelper").outsourceBareVideo(req, res)
            return;
        }
        yt2009html.fetch_video_data(id, (data) => {
            if(!data.title) {
                res.sendStatus(404)
                return;
            }
            let response = "<?xml version='1.0' encoding='UTF-8'?>"
            response += templates.gdata_feedVideo(
                data.id,
                data.title,
                data.author_handle || utils.asciify(
                    data.author_name || ""
                ),
                utils.bareCount(data.viewCount || "0"),
                utils.time_to_seconds(data.length || 0),
                data.description,
                data.upload,
                (data.tags || []).join(),
                data.category,
                "",
                data.qualities,
                {"authorId": data.author_id, "omitY9": true}
            )
            res.set("content-type", "application/atom+xml")
            res.send(response)
        }, "", "", false, false, true)
    },

    // apk video related
    "apkVideoRelated": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        // apkVideoRelated use exp_related!!
        let id = req.originalUrl.split("/videos/")[1]
                                .split("/related")[0];
        yt2009html.fetch_video_data(id, (data) => {
            let response = templates.gdata_feedStart
            let relCopy = JSON.parse(JSON.stringify(data.related))

            // flags
            let passFlags = "only_old"
            let flags = mobileflags.get_flags(req).watch
            if(flags.includes("new-related")) {
                passFlags = passFlags.replace("only_old", "")
            }

            // innertube_related - discard any other algorithm work
            if(flags.includes("innertube-related")) {
                let fetchesRequired = 0;
                let fetchesCompleted = 0;

                let ids = []
                data.related.forEach(video => {
                    ids.push(video.id)
                })

                relCopy = []
                let rawData = JSON.parse(JSON.stringify(data.related))

                for (let i = 0; i < rawData.length; i++) {
                    rawData[i].type = "video"
                    rawData[i].time = rawData[i].length
                    rawData[i].author_handle = rawData[i].creatorHandle
                    rawData[i].author_name = rawData[i].creatorName
                }

                let requestedData = ["publishedAt"]

                if(config.data_api_key) {
                    fetchesRequired++
                    utils.dataApiBulk(ids, requestedData, (apidata) => {
                        for(let id in apidata) {
                            let videoData = apidata[id]
                            let rel = rawData.filter(s => {
                                return s.id == id
                            })[0]
                            let i = rawData.indexOf(rel)
                            if(i !== null && i !== undefined && i >= 0) {
                                rawData[i].upload = videoData.publishedAt
                                rawData[i].dataApi = true;
                            }
                        }
                        fetchesCompleted++
                        if(fetchesCompleted >= fetchesRequired) {
                            createResponse(rawData)
                        }
                    })
                }

                if(fetchesCompleted >= fetchesRequired) {
                    setTimeout(() => {
                        createResponse(rawData)
                    }, 50)
                }

                return;
            }

            // exp_related keyword
            let lookup_keyword = ""
            // tags
            if(data.tags) {
                data.tags.forEach(tag => {
                    if(lookup_keyword.length < 9) {
                        lookup_keyword += `${tag.toLowerCase()} `
                    }
                })
            }
            // first word from the title as backup
            if(lookup_keyword.length < 9) {
                lookup_keyword = data.title.split(" ")[0]
            }

            // actual related search && data api fetch if possible
            ytsearch.get_search(lookup_keyword, passFlags, "", (rawData => {
                // add data api for precise upload dates
                let fetchesRequired = 0;
                let fetchesCompleted = 0;
                if(config.data_api_key) {
                    fetchesRequired++

                    let ids = []
                    let idSources = {
                        "exp": [],
                        "it": []
                    }
                    rawData.forEach(video => {
                        if(video.type !== "video") return;
                        ids.push(video.id)
                        idSources.exp.push(video.id)
                    })

                    // also add bottom related to id list
                    data.related.forEach(video => {
                        if(video.uploaded
                        && parseInt(video.uploaded.split(" ")[0]) >= 12
                        && video.uploaded.includes("years")
                        && !ids.includes(video.id)) {
                            ids.push(video.id)
                            idSources.it.push(video.id)
                        }
                    })

                    let requestedData = ["publishedAt"]

                    utils.dataApiBulk(ids, requestedData, (apidata) => {
                        for(let id in apidata) {
                            let videoData = apidata[id]
                            if(idSources.exp.includes(id)) {
                                let rel = rawData.filter(s => {
                                    return s.id == id
                                })[0]
                                let i = rawData.indexOf(rel)
                                if(i !== null && i !== undefined && i >= 0) {
                                    rawData[i].upload = videoData.publishedAt
                                    rawData[i].dataApi = true;
                                }
                            } else if(idSources.it.includes(id)) {
                                let rel = relCopy.filter(s => {
                                    return s.id == id
                                })[0]
                                let i = relCopy.indexOf(rel)
                                if(i !== null && i !== undefined && i >= 0) {
                                    relCopy[i].upload = videoData.publishedAt
                                    relCopy[i].dataApi = true;
                                }
                            }
                        }
                        fetchesCompleted++
                        if(fetchesCompleted >= fetchesRequired) {
                            createResponse(rawData)
                        }
                    })
                }

                if(fetchesCompleted >= fetchesRequired) {
                    createResponse(rawData)
                }
            }), "", false)

            // create response
            function createResponse(rawData) {
                // add search videos
                rawData.forEach(video => {
                    if(video.type !== "video"
                    || utils.time_to_seconds(video.time) >= 600
                    || response.includes(video.id) || video.id == id
                    || !video.uploaded) return;
                    let cacheData = yt2009html.get_cache_video(video.id)

                    let uploadDate = cacheData.upload
                    if(!uploadDate && video.dataApi) {
                        uploadDate = video.upload
                    } else if(!uploadDate && !video.dataApi) {
                        uploadDate = utils.relativeToAbsoluteApprox(video.uploaded)
                    }

                    let authorId = false;
                    if(video.creatorUrl
                    && video.creatorUrl.startsWith("/channel/")) {
                        authorId = video.creatorUrl.split("/channel/")[1]
                    } else if(video.author_url
                    && video.author_url.startsWith("/channel/")) {
                        authorId = video.author_url.split("/channel/")[1]
                    }

                    response += templates.gdata_feedVideo(
                        video.id,
                        video.title,
                        video.author_handle || utils.asciify(video.author_name),
                        utils.bareCount(video.views),
                        utils.time_to_seconds(video.time),
                        cacheData.description || video.description || "-",
                        uploadDate,
                        (cacheData.tags || []).join() || "-",
                        cacheData.category || "-",
                        mobileflags.get_flags(req).watch,
                        null,
                        {"authorId": authorId, "omitY9": true}
                    )
                })

                // add old default related videos
                relCopy.forEach(video => {
                    if(video.uploaded
                    && parseInt(video.uploaded.split(" ")[0]) >= 12
                    && video.uploaded.includes("years")
                    && video.id !== id
                    && !response.includes(video.id)) {

                        let uploadDate = utils.relativeToAbsoluteApprox(
                            video.uploaded
                        )
                        if(video.dataApi && video.upload) {
                            uploadDate = video.upload
                        }

                        let authorId = false;
                        if(video.creatorUrl
                        && video.creatorUrl.startsWith("/channel/")) {
                            authorId = video.creatorUrl.split("/channel/")[1]
                        }

                        //let data = yt2009html.get_cache_video(video.id)
                        // only 12 years or older & no repeats
                        response += templates.gdata_feedVideo(
                            video.id,
                            video.title,
                            utils.asciify(video.creatorName),
                            utils.bareCount(video.views),
                            utils.time_to_seconds(video.length),
                            yt2009html.get_video_description(video.id),
                            uploadDate,
                            undefined, undefined, undefined, undefined,
                            {"authorId": authorId, "omitY9": true}
                        )
                    }
                })

                response += templates.gdata_feedEnd
                res.set("content-type", "application/atom+xml")
                res.send(response)
            }
        }, "", "", false, false, true)
    },

    // apk video comments
    "apkVideoComments": function(req, res, useMobileHelper) {
        if(!mobileauths.isAuthorized(req, res)) return;
        let id = req.originalUrl.split("/videos/")[1]
                                .split("/comments")[0]
        yt2009html.fetch_video_data(id, (data) => {
            let response = templates.gdata_feedStart
            let customComments = yt2009html.custom_comments()
            if(customComments[id]) {
                customComments[id].forEach(c => {
                    if(!c.author) return;
                    response += templates.gdata_feedComment(
                        id,
                        utils.asciify(c.author),
                        c.text.replace(/\p{Other_Symbol}/gui, ""),
                        c.time
                    )
                })
            }
            if(useMobileHelper) {
                let comments = require("./yt2009mobilehelper")
                               .pullCommentsByUser(req);
                comments = comments.filter(s => s.video == id)
                comments.forEach(c => {
                    response += templates.gdata_feedComment(
                        c.video,
                        c.name,
                        c.content,
                        c.date
                    )
                })
            }
            if(data.comments) {
                data.comments.forEach(comment => {
                    // check if comment has content and fits
                    // to comment_remove_future rules
                    if(!comment.content) return;
                    let futurePass = true;
                    let commentContent = comment.content
                    commentContent = commentContent.replace(/\p{Other_Symbol}/gui, "")
                    let future = constants.comments_remove_future_phrases
                    future.forEach(futureWord => {
                        if(commentContent.toLowerCase().includes(futureWord)) {
                            futurePass = false;
                        }
                    })
                    if(commentContent.trim().length == 0
                    || commentContent.trim().length > 500) {
                        futurePass = false;
                    }

                    // add comment if comment_remove_future pass
                    if(futurePass) {
                        response += templates.gdata_feedComment(
                            id,
                            utils.asciify(comment.authorName),
                            commentContent,
                            utils.relativeToAbsoluteApprox(comment.time || "1 week ago")
                        )
                    }
                })
            }
            response += templates.gdata_feedEnd
            res.set("content-type", "application/atom+xml")
            res.send(response)
        }, "", "", false, false, true)
    },

    // apk user info
    "userInfo": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        let id = req.originalUrl.split("/users/")[1]
                                .split("/")[0]
                                .split("?")[0];
        // login_simulate
        if(req.headers.authorization) {
            let auth = req.headers.authorization
            if(auth.includes(`eAhx`)
            && mobileflags.get_flags(req).login_simulate
            && mobileflags.get_flags(req).login_simulate.includes("/")) {
                id = mobileflags.get_flags(req).login_simulate.split("/")[1]
            }
        }
        let path = "/@" + id
        if(id.startsWith("UC") && id.length == 24) {
            path = "/channel/" + id
        }
        let flags = mobileflags.get_flags(req).channel
        channels.main({"path": path, 
        "headers": {"cookie": ""},
        "query": {"f": 0}}, 
        {"send": function(data) {

            if(req.query.alt == "json") {
                yt2009jsongdata.userData(data, res, req.query.callback)
                return;
            }

            let videoViewCount = 0;
            (data.videos || []).forEach(video => {
                videoViewCount += utils.bareCount(video.views)
            })

            let waitForVCount = false;

            let videoCount = (data.videos || []).length
            if(videoCount >= 30) {
                // try to get exact video count
                waitForVCount = true;
                channels.fill_videocount(path, (count) => {
                    if(count !== "") {
                        videoCount = count;
                        sendData();
                    }
                })
            }

            let user = utils.xss(data.name)
            if(!user) {
                user = data.handle || data.id
            }
            user = user.split("&").join("&amp;").split("'").join("")

            let subcount = data.properties
                        && data.properties.subscribers
                        ? data.properties.subscribers : "0"
            subcount = utils.approxSubcount(subcount)

            let channelViewCount = Math.floor(videoViewCount / 90)
            res.set("content-type", "application/atom+xml")
            function sendData() {
                res.send(templates.gdata_user(
                    id,
                    user,
                    `http://${config.ip}:${config.port}/${data.avatar}`,
                    subcount,
                    videoCount,
                    channelViewCount,
                    videoViewCount,
                    flags
                ))
            }
            if(!waitForVCount) {sendData();}
        }}, "", true)
    },

    // apk videos
    "userVideos": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        let id = req.originalUrl.split("/users/")[1]
                                .split("/uploads")[0]
        let path = "/@" + id
        if(id.startsWith("UC") && id.length == 24) {
            path = "/channel/" + id
        }
        channels.main({"path": path, 
        "headers": {"cookie": ""},
        "query": {"f": 0}}, 
        {"send": function(data) {

            if(req.query.alt == "json") {
                yt2009jsongdata.userVideos(data, res, req.query.callback)
                return;
            }

            let response = templates.gdata_feedStart;

            let videosSource = (data.videos || [])
            videosSource = videosSource.filter(s => {return !(
                s.badges
                && s.badges.includes("BADGE_STYLE_TYPE_MEMBERS_ONLY")
            )})

            function buildFeed() {
                videosSource.forEach(video => {
                    let cacheVideo = yt2009html.get_cache_video(video.id)
                    let user = data.handle ? data.handle.replace("@", "")
                             : (data.id ? data.id : utils.asciify(data.name))

                    let upload = utils.relativeToAbsoluteApprox(video.upload)
                    let description = yt2009html.get_video_description(video.id)
                    if(video.dataApi) {
                        upload = video.upload;
                        description = video.description;
                    }
    
                    response += templates.gdata_feedVideo(
                        video.id,
                        video.title,
                        user,
                        utils.bareCount(video.views),
                        utils.time_to_seconds(
                            video.length
                        ||  Math.floor(Math.random() * 240) + 60
                        ),
                        description,
                        upload,
                        (cacheVideo.tags || []).join() || "-",
                        cacheVideo.category || "-",
                        mobileflags.get_flags(req).watch,
                        undefined,
                        {"authorId": data.id, "omitY9": true}
                    )
                })

                response += templates.gdata_feedEnd;
                res.set("content-type", "application/atom+xml")
                res.send(response)
            }

            let fetchesRequired = 0;
            let fetchesCompleted = 0;

            if(config.data_api_key) {
                fetchesRequired++

                let videoIds = []
                videosSource.forEach(v => {
                    videoIds.push(v.id)
                })
                let requestedParts = ["publishedAt", "description"]
                utils.dataApiBulk(videoIds, requestedParts, (apidata) => {
                    for(let id in apidata) {
                        let videoData = apidata[id]
                        let rel = videosSource.filter(s => {
                            return s.id == id
                        })[0]
                        let i = videosSource.indexOf(rel)
                        if(i !== null && i !== undefined && i >= 0) {
                            videosSource[i].upload = videoData.publishedAt
                            videosSource[i].description = videoData.description
                            videosSource[i].dataApi = true;
                        }
                    }
                    fetchesCompleted++
                    if(fetchesCompleted >= fetchesRequired) {
                        buildFeed()
                    }
                })
            }

            if(fetchesCompleted >= fetchesRequired) {
                buildFeed()
            }
        }}, "", true)
    },

    // apk user playlists
    "userPlaylists": function(req, res, sendRawData) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        let id = req.originalUrl.split("/users/")[1]
                                .split("/playlists")[0]
        let path = "/@" + id
        if(id.startsWith("UC") && id.length == 24) {
            path = "/channel/" + id
        }
        setTimeout(function() {
            channels.main({"path": path,
            "headers": {"cookie": ""},
            "query": {"f": 0}}, 
            {"send": function(data) {
                channels.get_additional_sections(data, "", () => {
                    let response = templates.gdata_feedStart
                    let playlists = channels.get_cache.read("playlist")

                    if(req.query.alt == "json") {
                        yt2009jsongdata.userPlaylists(
                            playlists[data.id] || [],
                            res, req.query.callback,
                            data.name, data.id
                        )
                        return;
                    }

                    if(playlists[data.id]) {
                        playlists[data.id].forEach(playlist => {
                            response += templates.gdata_playlistEntry(
                                id,
                                playlist.id,
                                playlist.name,
                                playlist.videos || 1,
                                ""
                            )
                        })
                    }
                    response += templates.gdata_feedEnd;
                    res.set("content-type", "application/atom+xml")
                    res.send(response)
                })
            }}, "", true)
        }, 1000)
    },

    // apk user favorites
    "userFavorites": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        let id = req.originalUrl.split("/users/")[1]
                                .split("/playlists")[0]
        let path = "/@" + id
        if(id.startsWith("UC") && id.length == 24) {
            path = "/channel/" + id
        }
        setTimeout(function() {
            channels.main({"path": path, 
            "headers": {"cookie": ""},
            "query": {"f": 0}}, 
            {"send": function(data) {
                function pullFavoritesPlaylist(playlist) {
                    yt2009playlists.parsePlaylist(playlist.id, (data => {
                        // add videos (kinda limited data but workable)
                        let response = templates.gdata_feedStart

                        if(req.query.alt == "json") {
                            yt2009jsongdata.playlistVideos(
                                data.videos, res, req.query.callback
                            )
                            return;
                        }

                        data.videos.forEach(video => {
                            let videoCache = yt2009html.get_cache_video(video.id)
                            response += templates.gdata_feedVideo(
                                video.id,
                                video.title,
                                utils.asciify(video.uploaderName),
                                utils.bareCount(
                                    videoCache.viewCount || Math.floor(
                                        Math.random() * 20000000
                                    ).toString()
                                ),
                                videoCache.length
                                || Math.floor(Math.random() * 300),
                                "", "",
                                undefined, undefined, undefined, undefined,
                                {"authorId": data.id, "omitY9": true}
                            )
                        })
        
                        // send response
                        response += templates.gdata_feedEnd;
                        res.set("content-type", "application/atom+xml")
                        res.send(response)
                    })) 
                } 

                channels.get_additional_sections(data, "", () => {
                    let response = templates.gdata_feedStart
                    let playlists = channels.get_cache.read("playlist")
                    let hasFavoritesPlaylist = false;
                    if(playlists[data.id]) {
                        playlists[data.id].forEach(playlist => {
                            if(playlist.name == "Favorites") {
                                hasFavoritesPlaylist = true;
                                pullFavoritesPlaylist(playlist)
                            }
                        })
                    }
                    if(!hasFavoritesPlaylist) {
                        // no favorites playlist, send empty feed
                        if(req.query.alt == "json") {
                            yt2009jsongdata.sendEmptyFeed(res, req.query.callback)
                            return;
                        }
                        response += templates.gdata_feedEnd;
                        res.set("content-type", "application/atom+xml")
                        res.send(response)
                        return;
                    }
                })
            }}, "", true)
        }, 1000)
    },

    // apk events
    "apkUserEvents": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        if(!req.query.author) {
            res.send("")
            return;
        }

        // i do love being too lazy to develop this function properly
        let path = "/@" + req.query.author
        if(req.query.author.startsWith("UC")
        && req.query.author.length == 24) {
            path = "/channel/" + path
        }
        require("./yt2009subscriptions").fetch_new_videos({
            "headers": {
                "url": path
            },
            "query": {
                "flags": ""
            }
        }, {
            "send": function(data) {
                // anyway, we got videos to throw there
                let fetchesRequired = 0;
                let fetchesCompleted = 0;

                function buildResponse() {
                    let response = templates.gdata_feedStart
                    data.videos.slice(0, 7).forEach(video => {
                        let upload = video.upload
                        if(!video.dataApi) {
                            upload = utils.relativeToAbsoluteApprox(
                                video.upload
                            )
                        }
                        response += templates.gdata_activityEntry(
                            "video_uploaded",
                            req.query.author,
                            video.title,
                            video.id,
                            upload,
                            video.time,
                            video.views
                        )
                    })
                    response += templates.gdata_feedEnd
                    res.set("content-type", "application/atom+xml")
                    res.send(response)
                }
                
                if(config.data_api_key) {
                    fetchesRequired++
                    let videoIds = []
                    let requestedParts = ["publishedAt"]
                    data.videos.slice(0, 7).forEach(v => {
                        videoIds.push(v.id)
                    })

                    utils.dataApiBulk(videoIds, requestedParts, (apidata) => {
                        for(let id in apidata) {
                            let videoData = apidata[id]
                            let rel = data.videos.filter(s => {
                                return s.id == id
                            })[0]
                            let i = data.videos.indexOf(rel)
                            if(i !== null && i !== undefined && i >= 0) {
                                data.videos[i].upload = videoData.publishedAt
                                data.videos[i].dataApi = true;
                            }
                        }
                        fetchesCompleted++
                        if(fetchesCompleted >= fetchesRequired) {
                            buildResponse()
                        }
                    })
                }

                if(fetchesCompleted >= fetchesRequired) {
                    buildResponse()
                }
            }
        }, true)
    },

    // apk user playlist (/users/NAME/playlists/PLAYLISTID)
    "userPlaylistStart": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        let user = req.originalUrl.split("/users/")[1]
                                  .split("/playlists")[0]
        let playlistId = req.originalUrl.split("/playlists/")[1]
                                        .split("?")[0]
        require("./yt2009playlists").parsePlaylist(playlistId, (data) => {

            if(req.query.alt == "json") {
                yt2009jsongdata.playlistVideos(
                    data.videos, res, req.query.callback
                )
                return;
            }

            let response = templates.gdata_feedStart
            // playlist metadata
            response += templates.gdata_userPlaylistStart(
                playlistId,
                data.name,
                (data.videos[0] || {"id": ""}).id,
                user,
                utils.relativeToAbsoluteApprox(data.lastUpdate),
                utils.bareCount(data.videoCount)
            )

            // list known videos
            data.videos.forEach(video => {
                // use user handle if present
                let videoAuthor = video.uploaderName
                if(video.uploaderUrl.includes("/@")) {
                    videoAuthor = video.uploaderUrl.replace("/@", "")
                }

                // have full video data?
                let videoCacheData = yt2009html.get_cache_video(video.id)

                let authorId = false;
                if(videoCacheData && videoCacheData.author_id) {
                    authorId = videoCacheData.author_id
                } else if(video.uploaderId) {
                    authorId = video.uploaderId
                }

                // fill
                response += templates.gdata_feedVideo(
                    video.id,
                    video.title,
                    videoAuthor,
                    utils.bareCount(
                        videoCacheData.viewCount
                        || Math.floor(Math.random() * 4050200).toString()
                    ),
                    utils.time_to_seconds(video.time || "2:34"),
                    videoCacheData.description || "",
                    videoCacheData.upload || "",
                    (videoCacheData.tags || []).join() || "-",
                    videoCacheData.category || "-",
                    mobileflags.get_flags(req).watch,
                    undefined,
                    {"authorId": authorId, "omitY9": true}
                )
            })

            // finalize
            response += templates.gdata_feedEnd
            res.set("content-type", "application/atom+xml")
            res.send(response)
        })
    },

    "categoryFeeds": function(req, res) {
        if(!mobileauths.isAuthorized(req, res, "feed")) return;
        let categoryName = req.originalUrl.split("_")[2].split("?")[0]
        let categoryNumber = categories[categoryName]
        let max = req.query["max-results"] || 25
        let start = req.query["start-index"] || 0
        let videos = videostab.internal_getVideos({
            "query": {
                "c": categoryNumber,
                "s": "mr",
                "max": max,
                "index": start
            }
        }, "")
        if(req.query.alt == "json") {
            yt2009jsongdata.standardfeed(videos, res, req.query.callback)
            return;
        }
        let response = templates.gdata_feedStart
                       .split(">1<").join(`>${start}<`)
        let videosAdded = 0;
        videos.forEach(video => {
            let cacheVideo = yt2009html.get_cache_video(video.id)

            let author = cacheVideo.author_handle;
            if(!author) {
                author = cacheVideo.author_id
            }

            response += templates.gdata_feedVideo(
                video.id,
                video.title,
                author,
                utils.bareCount(video.views),
                utils.time_to_seconds(cacheVideo.length || "2:54"),
                cacheVideo.description || "",
                cacheVideo.upload || "Dec 23, 2009",
                (cacheVideo.tags || []).join() || "-",
                cacheVideo.category || "",
                mobileflags.get_flags(req).watch,
                cacheVideo.qualities,
                {"authorId": cacheVideo.author_id, "omitY9": true}
            )
            videosAdded++
        })
        response = response.split(">25<").join(`>${videosAdded}<`)
        response += templates.gdata_feedEnd
        res.set("content-type", "application/atom+xml")
        res.send(response)
    },

    // post video comments
    "videoCommentPost": function(req, res) {
        if(!mobileauths.isAuthorized(req, res)) return;
        let id = req.originalUrl.split("/videos/")[1]
                                .split("/comments")[0]
        // login simulate name
        let flags = mobileflags.get_flags(req)
        if(!flags.login_simulate
        || !flags.login_simulate.includes("/")) {
            res.sendStatus(401)
            return;
        }
        let name = utils.asciify(
            flags.login_simulate.split("/")[1], true, false
        ).substring(0, 20)
        let session = flags.login_simulate.split("/")[0]
        let body = require("node-html-parser").parse(req.body.toString())
        if(!body.querySelector("content")) {
            res.sendStatus(400);
            return;
        }

        let comments = yt2009html.custom_comments()
        if(!comments[id]) {
            comments[id] = []
        }
        let comment = utils.xss(body.querySelector("content").innerHTML)
        let commentId = Math.floor(Math.random() * 110372949)

        if(!comment || comment.length == 0 || comment.length > 500) {
            res.sendStatus(400)
            return;
        }

        let commentObject = {
            "author": name,
            "text": comment,
            "time": Date.now(),
            "token": session,
            "id": commentId,
            "rating": 0,
            "ratingSources": {}
        }

        if(yt2009_exports.read().masterWs) {
            let ws = yt2009_exports.read().masterWs
            // send & wait for synced data
            let syncSent = false;
            function bringSync(msg) {
                if(syncSent) return;
                syncSent = true
                if(!msg.syncable) {
                    name = "possibly_not_" + name
                    commentObject.author = "possibly_not_" + name
                } else {
                    name = utils.xss(msg.comment.author)
                    commentObject.author = name
                    commentObject.token = utils.get_used_token(req)
                }
                commentObject.rating = 0
                commentObject.ratingSources = {}

                if(commentObject.author.includes("possibly_not_possibly_not_")) {
                    commentObject.author = commentObject.author.replace(
                        "possibly_not_", ""
                    )
                }
    
                comments[id].push(commentObject)
    
                yt2009html.receive_update_custom_comments(comments)
    
                try {
                    res.set("content-type", "application/atom+xml")
                    res.send(templates.gdata_feedComment(
                        id,
                        commentObject.author,
                        comment,
                        new Date().toISOString()
                    ))
                }
                catch(error) {}
            }
            syncCommentCallbacks[commentId] = function(msg) {
                bringSync(msg)
            }
            setTimeout(() => {
                bringSync({"type": "comment-feedback"})
            }, 5000)
            ws.send(JSON.stringify({
                "type": "comment",
                "session": session,
                "name": name,
                "content": comment,
                "id": commentId,
                "video": id,
                "source": "m"
            }))
        } else {
            commentObject.author = name
            comments[id].push(commentObject)
    
            res.set("content-type", "application/atom+xml")
            res.send(templates.gdata_feedComment(
                id,
                commentObject.author,
                comment,
                new Date().toISOString()
            ))
            yt2009html.receive_update_custom_comments(comments)
        }
    },

    "commentCallback": function(msg) {
        if(syncCommentCallbacks[msg.id]) {
            syncCommentCallbacks[msg.id](msg)
        }
    },

    "avatarUncrop": function(req, res) {
        if(!req.query.avatar
        || !req.query.avatar.startsWith("/assets/")
        || req.query.avatar.includes("../")) {
            res.sendStatus(400)
            return;
        }
        let ftype = req.query.avatar.split(".")
        ftype = ftype[ftype.length - 1]
        let target = req.query.avatar + "_uncropped." + ftype
        if(fs.existsSync(target)) {
            res.setHeader("Content-Type", "image/png")
            res.send(fs.readFileSync("../assets/" + target))
        } else if(fs.existsSync("../" + req.query.avatar)) {
            let start = `${__dirname.split("\\").join("/")}/..`
            let command = [
                "magick -size 122x122 xc: ",
                `-draw "image over 25,25 72,72 '${start}${req.query.avatar}'"`,
                `"${start}${target}"`
            ].join(" ")
            require("child_process").exec(command, (e, so, se) => {
                if(fs.existsSync("../" + target)) {
                    res.setHeader("Content-Type", "image/png")
                    res.send(fs.readFileSync("../" + target))
                } else {
                    res.sendStatus(500)
                }
            })
        } else {
            res.sendStatus(400)
            return;
        }
    }
}