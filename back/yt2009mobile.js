const yt2009html = require("./yt2009html")
const ytsearch = require("./yt2009search")
const channels = require("./yt2009channels")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")
const fs = require("fs")
const child_process = require("child_process")
const config = require("./config.json")
const constants = require("./yt2009constants.json")
const yt2009playlists = require("./yt2009playlists")
const env = config.env
const rtsp_server = `rtsp://${config.ip}:${config.port + 2}/`
const ffmpeg_process_144 = [
    "ffmpeg",
    "-i $1",
    "-ac 1",
    "-acodec aac",
    "-c:v libx264",
    "-s 256x144",
    "$2"
]
const ffmpeg_stream = [
    "ffmpeg",
    "-re -i",
    "$1",
    "$2",
    "-f rtsp",
    "-rtsp_transport udp",
    "$3"
]

const watchpage_html = fs.readFileSync("../mobile/watchpage.htm").toString();
const search_html = fs.readFileSync("../mobile/search.htm").toString();
const comments_html = fs.readFileSync("../mobile/view-comment.htm").toString();
const homepage_html = fs.readFileSync("../mobile/mainpage.htm").toString()

module.exports = {
    // create the watch page
    "create_watchpage": function(req, res) {
        let id = req.query.v.substring(0, 11)
        yt2009html.fetch_video_data(id, (data) => {
            if(!data) {
                res.send(`[yt2009] something went wrong while getting video data`)
                return;
            }

            let code = watchpage_html;
            code = code.split(`yt2009_id`).join(data.id)
            code = code.replace(`yt2009_title`, data.title)
            code = code.replace(`yt2009_description`, data.description)
            code = code.replace(`yt2009_length`, utils.seconds_to_time(data.length))
            code = code.replace(`yt2009_views`, data.viewCount + " views")
            code = code.replace(`yt2009_user`, data.author_name)
            code = code.replace(`yt2009_upload`, data.upload)
            code = code.replace(`yt2009_thumbnail`, `http://i.ytimg.com/vi/${data.id}/hqdefault.jpg`)

            // related
            let relatedHTML = ``
            let relatedIndex = 0;
            data.related.forEach(video => {
                if(utils.time_to_seconds(video.length) >= 1800 || relatedIndex > 4) return;

                relatedHTML += templates.mobile_video(video)
                relatedIndex++;
            })

            code = code.replace(`<!--yt2009_related-->`, relatedHTML)

            res.send(code)
        }, req.headers["user-agent"], utils.get_used_token(req), false)
    },

    // video searching
    "search": function(req, res) {
        let code = search_html
        let query = req.query.q;

        let searchHTML = ``
        ytsearch.get_search(query, "", "", (data => {
            let videoIndex = 0;
            data.forEach(video => {
                if(videoIndex > 10 || video.type !== "video") return;

                searchHTML += templates.mobile_video(video)
                videoIndex++;
            })


            code = code.replace(`<!--yt2009_search-->`, searchHTML)
            res.send(code)
        }), utils.get_used_token(req))
    },

    // rtsp video watch
    "setup_rtsp": function(id, mute, res) {
        let fileName = `${id}-144.mp4`
        let streamId = Math.floor(Math.random() * 37211)

        // process requested video if needed
        if(!fs.existsSync(`../assets/${fileName}`)
        && fs.existsSync(`../assets/${id}.mp4`)) {
            // convert to 144p
            child_process.execSync(
                ffmpeg_process_144.join(" ").replace(
                    "$1", `${__dirname}/../assets/${id}.mp4`
                ).replace(
                    "$2", `${__dirname}/../assets/${fileName}`
                )
            )
        }

        // start RTSP stream of 144 file
        child_process.exec(
            ffmpeg_stream.join(" ").replace(
                "$1", `${__dirname}/../assets/${fileName}`
            ).replace(
                "$2", `${mute ? "-an" : ""}`
            ).replace(
                "$3", `${rtsp_server}video/${id}-${streamId}`
            )
        )
        res.redirect(`${rtsp_server}video/${id}-${streamId}`)
    },

    // mobile homepage
    "create_homepage": function(req, res) {
        let code = homepage_html;
        let index = 0;

        // get homepage videos, fill in the html template and send
        yt2009html.featured().splice(0, 4).forEach(video => {
            index++;
            code = code.split(`v${index}_id`).join(video.id)
            code = code.split(`v${index}_title`).join(video.title)
            code = code.split(`v${index}_views`).join(video.views)
        })
        res.send(code)
    },

    // comments view page
    "view_comments": function(req, res) {
        let code = comments_html
        let actual_comments = ``
        req = utils.addFakeCookie(req)
        let id = req.query.v.substring(0, 11)

        yt2009html.fetch_video_data(id, (data => {
            // fill video data
            code = code.split("yt2009_id").join(data.id)
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
                actual_comments += `
            <div style="border-top:1px dashed #ADADAD;padding-top:8px">
                <a href="#">${utils.asciify(comment.authorName)}</a>&nbsp;&nbsp;${comment.time}
            </div>
            <div style="padding-top:3px;padding-bottom:5px">${comment.content}</div>`
            })
            code = code.replace(`<!--yt2009_comments-->`, actual_comments)
            res.send(code)
        }), "", utils.get_used_token(req), false, false)
    },

    // apk feeds
    "feeds": function(req, res) {
        if(req.originalUrl.includes("featured")) {
            // send full feed on recently_featured
            // 25 recently watched
            let response = templates.gdata_feedStart
            let videosAdded = 0;
            yt2009html.featured().slice(0, 25).forEach(video => {
                yt2009html.fetch_video_data(video.id, (data) => {
                    let authorName = utils.asciify(video.uploaderName)
                    if(data.author_url.includes("/@")) {
                        authorName = data.author_url.replace("/@", "")
                    }
                    response += templates.gdata_feedVideo(
                        video.id,
                        video.title,
                        utils.asciify(authorName),
                        utils.bareCount(video.views),
                        utils.time_to_seconds(data.length || 0),
                        data.description,
                        data.upload,
                        (data.tags || []).join(),
                        data.category
                    )
                    videosAdded++;
                    if(videosAdded >= 25) {
                        response += templates.gdata_feedEnd
                        res.send(response)
                    }
                }, "", "", false, false, true)
            })
        } else if(req.originalUrl.includes("most_popular")) {
            // grab popular videos (100k+ views) from featured 25-50
            // and put them into the feed
            let response = templates.gdata_feedStart
            if(yt2009html.featured().length > 25) {
                yt2009html.featured().slice(25, 50).forEach(video => {
                    yt2009html.fetch_video_data(video.id, (data) => {
                        if(utils.bareCount(video.views) > 100000) {
                            response += templates.gdata_feedVideo(
                                video.id,
                                video.title,
                                utils.asciify(video.uploaderName),
                                utils.bareCount(video.views),
                                utils.time_to_seconds(data.length || 0),
                                data.description,
                                data.upload,
                                (data.tags || []).join(),
                                data.category
                            )
                        }
                    }, "", "", false, false, true)
                })
            }
            response += templates.gdata_feedEnd
            res.send(response)
        } else {
            // send empty video feeds on other requests
            res.send(templates.gdata_feedStart + templates.gdata_feedEnd)
        }
    },

    // apk videos
    "videoData": function(req, res) {
        let id = req.originalUrl.split("/videos/")[1]
                                .split("?")[0]
                                .split("#")[0]
        yt2009html.fetch_video_data(id, (data) => {
            let response = "<?xml version='1.0' encoding='UTF-8'?>"
            response += templates.gdata_feedVideo(
                data.id,
                data.title,
                utils.asciify(data.author_name),
                utils.bareCount(data.viewCount),
                utils.time_to_seconds(data.length || 0),
                data.description,
                data.upload,
                (data.tags || []).join(),
                data.category
            )
            res.send(response)
        }, "", "", false, false, true)
    },

    // apk video related
    "apkVideoRelated": function(req, res) {
        // apkVideoRelated use exp_related!!
        let id = req.originalUrl.split("/videos/")[1]
                                .split("/related")[0];
        yt2009html.fetch_video_data(id, (data) => {
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


            // lookup exp_related and put into response
            let response = templates.gdata_feedStart
            ytsearch.related_from_keywords(lookup_keyword, id,
                "fake_upload_dates:;realistic_view_count", ((html, rawData) => {
                    // add search videos
                    rawData.forEach(video => {
                        let cacheData = yt2009html.get_cache_video(video.id)

                        response += templates.gdata_feedVideo(
                            video.id,
                            video.title,
                            video.creatorHandle || utils.asciify(video.creatorName),
                            utils.bareCount(video.views),
                            utils.time_to_seconds(video.length),
                            cacheData.description || video.description || "-",
                            utils.relativeToAbsoluteApprox(video.upload),
                            (cacheData.tags || []).join() || "-",
                            cacheData.category || "-"
                        )
                    })


                    // add old default related videos
                    data.related.forEach(video => {
                        if(parseInt(video.uploaded.split(" ")[0]) >= 12
                        && video.uploaded.includes("years")
                        && video.id !== id
                        && !response.includes(video.id)) {
                            //let data = yt2009html.get_cache_video(video.id)
                            // only 12 years or older & no repeats
                            response += templates.gdata_feedVideo(
                                video.id,
                                video.title,
                                utils.asciify(video.creatorName),
                                utils.bareCount(video.views),
                                utils.time_to_seconds(video.length),
                                yt2009html.get_video_description(video.id),
                                utils.relativeToAbsoluteApprox(video.uploaded)
                            )
                        }
                    })

                    response += templates.gdata_feedEnd
                    res.send(response)
            }), "http")
        }, "", "", false, false, true)
    },

    // apk video comments
    "apkVideoComments": function(req, res) {
        let id = req.originalUrl.split("/videos/")[1]
                                .split("/comments")[0]
        yt2009html.fetch_video_data(id, (data) => {
            let response = templates.gdata_feedStart
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
            res.send(response)
        }, "", "", false, false, true)
    },

    // apk user info
    "userInfo": function(req, res) {
        let id = req.originalUrl.split("/users/")[1]
                                .split("/")[0]
                                .split("?")[0]
        channels.main({"path": "/@" + id, 
        "headers": {"cookie": ""},
        "query": {"f": 0}}, 
        {"send": function(data) {
            res.send(templates.gdata_user(
                id,
                utils.asciify(data.name),
                `http://${config.ip}:${config.port}/${data.avatar}`,
                utils.approxSubcount(data.properties.subscribers || "0"),
                (data.videos || []).length
            ))
        }}, "", true)
    },

    // apk videos
    "userVideos": function(req, res) {
        let id = req.originalUrl.split("/users/")[1]
                                .split("/uploads")[0]
        channels.main({"path": "/@" + id, 
        "headers": {"cookie": ""},
        "query": {"f": 0}}, 
        {"send": function(data) {
            let response = templates.gdata_feedStart;

            (data.videos || []).forEach(video => {
                let cacheVideo = yt2009html.get_cache_video(video.id)

                response += templates.gdata_feedVideo(
                    video.id,
                    video.title,
                    utils.asciify(data.name),
                    utils.bareCount(video.views),
                    utils.time_to_seconds(video.length || "0:00"),
                    yt2009html.get_video_description(video.id),
                    utils.relativeToAbsoluteApprox(video.upload),
                    (cacheVideo.tags || []).join() || "-",
                    cacheVideo.category || "-"
                )
            })

            response += templates.gdata_feedEnd;
            res.send(response)
        }}, "", true)
    },

    // apk user playlists
    "userPlaylists": function(req, res, sendRawData) {
        let id = req.originalUrl.split("/users/")[1]
                                .split("/playlists")[0]
        require("./cache_dir/userid_cache").read(id, (userId) => {
            // once we get the id, check if we have playlists and send those
            let response = templates.gdata_feedStart
            let playlists = require("./cache_dir/channel_cache").read("playlist")
            if(playlists[userId]) {
                playlists[userId].forEach(playlist => {
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
            res.send(response)
        })
    },

    // apk user favorites
    "userFavorites": function(req, res) {
        let id = req.originalUrl.split("/users/")[1]
                                .split("/playlists")[0]
        require("./cache_dir/userid_cache").read(id, (userId) => {
            // once we get the id, check if we have playlists and send those
            let response = templates.gdata_feedStart
            let playlists = require("./cache_dir/channel_cache").read("playlist")
            let hasFavoritesPlaylist = false;

            // check for Favorites playlist
            if(playlists[userId]) {
                playlists[userId].forEach(playlist => {
                    if(playlist.name == "Favorites") {
                        // we have one, fetch
                        hasFavoritesPlaylist = true;
                        yt2009playlists.parsePlaylist(playlist.id, (data => {
                            // add videos (kinda limited data but workable)
                            data.videos.forEach(video => {
                                response += templates.gdata_feedVideo(
                                    video.id,
                                    video.title,
                                    utils.asciify(video.uploaderName),
                                    "",
                                    "",
                                    "",
                                    ""
                                )
                            })

                            // send response
                            response += templates.gdata_feedEnd;
                            res.send(response)
                        }))
                    }
                })
            }

            if(!hasFavoritesPlaylist) {
                // no favorites playlist, send empty feed
                response += templates.gdata_feedEnd;
                res.send(response)
            }
        })
    },

    // apk events
    "apkUserEvents": function(req, res) {
        if(!req.query.author) {
            res.send("")
            return;
        }

        // i do love being too lazy to develop this function properly
        require("./yt2009subscriptions").fetch_new_videos({
            "headers": {
                "url": "/@" + req.query.author
            },
            "query": {
                "flags": ""
            }
        }, {
            "send": function(data) {
                // anyway, we got videos to throw there
                let response = templates.gdata_feedStart
                data.videos.slice(0, 7).forEach(video => {
                    response += templates.gdata_activityEntry(
                        "video_uploaded",
                        req.query.author,
                        video.title,
                        video.id,
                        utils.relativeToAbsoluteApprox(video.upload)
                    )
                })
                response += templates.gdata_feedEnd
                res.send(response)
            }
        }, true)
    },

    // apk user playlist (/users/NAME/playlists/PLAYLISTID)
    "userPlaylistStart": function(req, res) {
        let user = req.originalUrl.split("/users/")[1]
                                  .split("/playlists")[0]
        let playlistId = req.originalUrl.split("/playlists/")[1]
                                        .split("?")[0]
        require("./yt2009playlists").parsePlaylist(playlistId, (data) => {
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

                // fill
                response += templates.gdata_feedVideo(
                    video.id,
                    video.title,
                    videoAuthor,
                    utils.bareCount(
                        videoCacheData.viewCount
                        || Math.floor(Math.random() * 4050200).toString()
                    ),
                    utils.time_to_seconds(video.time),
                    videoCacheData.description || "",
                    videoCacheData.upload || "2009",
                    (videoCacheData.tags || []).join() || "-",
                    videoCacheData.category || "-"
                )
            })

            // finalize
            response += templates.gdata_feedEnd
            res.send(response)
        })
    }
}