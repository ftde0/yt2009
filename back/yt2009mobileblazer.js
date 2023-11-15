// yt2009mobileblazer
// the weird webapp 2010 aimed at iphones
// https://www.youtube.com/watch?v=GGT8ZCTBoBA
const homepage = require("./yt2009videos")
const yt2009html = require("./yt2009html") 
const constants = require("./yt2009constants.json")
const search = require("./yt2009search")
const utils = require("./yt2009utils")
const defaultavatar = require("./cache_dir/default_avatar_adapt_manager");
const channels = require("./yt2009channels")
const templates = require("./yt2009templates")
const videostab = require("./yt2009videos")
const subfeed = require("./yt2009subscriptions")

module.exports = {
    // get homepage
    "homepage": function() {
        let response = {
            "result": "ok",
            "content": {
                "home_videos": []
            },
        }
        homepage.internal_getVideos({
            "query": {
                "s": "mr"
            }
        }, "").slice(0, 10).forEach(vid => {
            let tags = []
            if(yt2009html.get_cache_video(vid.id).tags) {
                let data = yt2009html.get_cache_video(vid.id)
                data.tags.forEach(tag => {
                    if(tag.length > 12) return;
                    tag = utils.asciify(tag, true).toLowerCase()
                    tags.push({
                        "url": "/results?search_query=" + tag,
                        "keyword": tag
                    })
                })
            }

            response.content.home_videos.push(templates.blazer_bareVideo(
                vid.id,
                vid.title,
                utils.seconds_to_time(vid.length),
                vid.views,
                utils.asciify(vid.uploaderName),
                tags
            ))
        })

        return response;
    },

    // get video data
    // called on video click within blazer
    "video": function(req, res) {
        let id = req.query.v
        if(!id) {
            res.sendStatus(400)
            return;
        }
        id = id.substring(0, 11)

        // only_old for related?
        // or some undefault_avatar?
        let disableOnlyOld = false;
        let undefaultAvatar = false;
        if(req.headers.cookie
        && req.headers.cookie.includes("blzr_watch_flags=")) {
            let flags = req.headers.cookie
                        .split("blzr_watch_flags=")[1]
                        .split(";")[0]
            if(flags.includes("new-related")) {
                disableOnlyOld = true
            }
            if(flags.includes("undefault-avatar")) {
                undefaultAvatar = true;
            }
        }

        // static response stuff
        let response = {
            "result": "ok",
            "content": {
                "video": {
                    "stitched_thumbnail_large": {
                        "url": "http://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
                        "width": 160,
                        "height": 120,
                        "posx": 60,
                        "posy": 25
                    },
                    "id": id,
                    "stream_url": "/get_video?video_id=" + id + "/mp4",
                    "is_playable": true
                }
            }
        }

        // fill in the rest after we get true video data
        yt2009html.fetch_video_data(id, (data) => {

            let tags = []
            data.tags.forEach(tag => {
                if(tag.length > 12) return;
                tag = utils.asciify(tag, true).toLowerCase()
                tags.push({
                    "url": "/results?search_query=" + tag,
                    "keyword": tag
                })
            })
            let shortDesc = data.description.substring(0, 40)
            if(shortDesc !== data.description) {
                shortDesc += "..."
            }
            let avatar = utils.saveAvatar(data.author_img)
            if(!undefaultAvatar
            && defaultavatar.use(`../${avatar}`)) {
                avatar = "/assets/site-assets/default.png"
            }

            let video = {
                "title": data.title,
                "username": data.author_handle || utils.asciify(data.author_name),
                "category_name": data.category,
                "tags": tags,
                "full_description": data.description,
                "short_description": shortDesc,
                "time_created_text": data.upload,
                "view_count": utils.countBreakup(
                    utils.bareCount(data.viewCount)
                ),
                "duration": utils.seconds_to_time(data.length),
                "user_image_url": avatar
            }
            for(let field in video) {
                response.content.video[field] = video[field]
            }

            // related videos
            // send video data after related done as those must be
            // within the response unlike some other yt clients
            let enableHQ = false;
            expRelated(data, (videos) => {
                response.content.related_videos = videos;
                if(enableHQ) {
                    // get qualities for an hq button
                    try {
                        yt2009html.get_qualities(id, (qualities) => {
                            if(qualities.includes("480p")) {
                                let url = "/get_480?video_id=" + id
                                response.content.video.hq_stream_url = url;
                            }
                            res.send(response)
                        })
                    }
                    catch(error) {
                        res.send(response)
                    }
                } else {
                    res.send(response)
                }
                
            })
        }, constants.headers["user-agent"], "",false, false, true)

        // blazer related (exp_related)
        function expRelated(data, callback) {
            let resultVideos = []
            search.related_from_keywords(
                utils.exp_related_keyword((data.tags || []), data.title),
                data.id, "realistic_view_count", (html, rawData) => {
                    rawData.forEach(vid => {
                        addVideo(vid)
                    })

                    callback(resultVideos)
            }, "http", disableOnlyOld)
            

            function addVideo(vid) {
                resultVideos.push(templates.blazer_bareVideo(
                    vid.id,
                    vid.title,
                    vid.length,
                    vid.views,
                    vid.creatorHandle || utils.asciify(vid.creatorName)
                ))
            }
        }
    },

    // view comments
    // called when the Comments tab is clicked on watchpage
    "get_comments": function(req, res) {
        let id = req.query.v
        if(!id) {
            res.sendStatus(400)
            return;
        }
        id = id.substring(0, 11)
        let response = {
            "result": "ok",
            "content": {
                "comments": []
            }
        }

        let fakeCommentDates = false;
        if(req.headers.cookie
        && req.headers.cookie.includes("comments-fake-dates")) {
            fakeCommentDates = true
        }

        yt2009html.get_video_comments(id, (data) => {
            data.forEach(comment => {
                if(comment.continuation) return;
                // check if matching up against comments_remove_future
                let futurePass = true;
                let future = constants.comments_remove_future_phrases
                future.forEach(futureYear => {
                    if(comment.content.toLowerCase().includes(futureYear)) {
                        futurePass = false;
                    }
                })
                if(comment.content.length >= 500) {
                    futurePass = false;
                }
                
                let commentContent = comment.content.replace(
                    /\p{Other_Symbol}/gui, ""
                ).split("🏻").join("").split("<br>").join("\n")

                if(futurePass) {
                    response.content.comments.push({
                        "author_name": utils.asciify(comment.authorName),
                        "comment": commentContent,
                        "time_ago": fakeCommentDates
                                  ? utils.fakeDatesModern("2012", comment.time)
                                  : comment.time
                    })
                }
            })

            res.send(response)
        })
    },


    // video search!!
    "search": function(req, res) {
        let q = req.query.q
        if(!q) {
            res.sendStatus(400)
            return;
        }

        let flags = ""
        if(req.headers.cookie
        && req.headers.cookie.includes("blzr_search_flags")) {
            flags = req.headers.cookie
                    .split("blzr_search_flags=")[1]
                    .split(";")[0]
        }

        if(flags.includes("only-old")) {
            q += " +only_old"
        }

        if(q.includes(" +only_old")) {
            q = q.replace(" +only_old", " before:2010-04-01")
        }

        let response = {
            "result": "ok",
            "content": {
                "videos": [],
                "results_count": ""
            }
        }

        search.get_search(q, "realistic_view_count", "", (data => {
            data.forEach(vid => {
                if(vid.type !== "video") return;
                response.content.videos.push(templates.blazer_bareVideo(
                    vid.id,
                    vid.title,
                    vid.time,
                    vid.views,
                    vid.author_handle || utils.asciify(vid.author_name)
                ))
            })
            
            res.send(response)
        }), "", false)
    },

    // user info
    "user_info": function(username, callback, subscribed, disableDefaultAvatar) {
        let response = {
            "result": "ok",
            "content": {
                "title": "[yt2009] channel not found?"
                + " report at #yt2009-feedback with original video link",
                "profile_user": {
                    "image_url": "/assets/site-assets/default.png",
                    "videos_url": "/sus",
                    "joined_date": "",
                    "subscriber_count": "0",
                    "viewed_count": "0"
                },
                "view_enabled": {}
            }
        }

        channels.main(
        {"path": `/@${username}`, "headers": {}, "query": {}},
        {"send": function(data) {
            if(typeof(data) == "string") {
                callback(response)
                return;
            }
            let videoViewCount = 0;
            (data.videos || []).forEach(video => {
                videoViewCount += utils.bareCount(video.views)
            })

            // default avatar?
            let channelAvatar = data.avatar;
            if(!disableDefaultAvatar
            && defaultavatar.use(`../${data.avatar}`)) {
                channelAvatar = "/assets/site-assets/default.png"
            }

            let c = {
                "title": utils.asciify(data.name, true),
                "profile_user": {
                    "image_url": channelAvatar,
                    "videos_url": "/",
                    "subscriber_count": utils.countBreakup(utils.approxSubcount(
                        data.properties.subscribers || "0"
                    )),
                    "viewed_count": utils.countBreakup(videoViewCount)
                },
                "view_enabled": {
                    "videos": true
                },
                "videos_url": "/profile?view=videos&user=" + username,
                "show_subscription_button": true,
                "is_subscribed": subscribed
            }
            response.content = c;
            callback(response)
        }}, "", true)
    },

    // channel's videos
    "user_videos": function(username, callback) {
        let response = {
            "result": "ok",
            "content": {
                "videos": []
            }
        }

        channels.main(
        {"path": `/@${username}`, "headers": {}, "query": {}},
        {"send": function(data) {
            if(typeof(data) == "string") {
                callback(response)
                return;
            }
            (data.videos || []).forEach(vid => {
                response.content.videos.push(templates.blazer_bareVideo(
                    vid.id,
                    vid.title,
                    (
                        vid.length
                        || utils.seconds_to_time(
                            Math.floor(Math.random() * 80) + 100
                        )
                    ),
                    vid.views,
                    username
                ))
            })
            callback(response)
        }}, "", true)
    },

    // browse menu (/videos equivalent)
    "browse": function(req, res) {
        let response = {
            "result": "ok",
            "content": {
                "list_name": " ",
                "videos": [],
                "list_options": [
                    {"value": "mp", "label": "Most popular"},
                    {"value": "mr", "label": "Most recent"}
                ],
                "category_options": [
                    {"value": "0", "label": "All categories"},
                    {"value": "2", "label": "Autos & Vehicles"},
                    {"value": "35", "label": "Comedy"},
                    {"value": "34", "label": "Education"},
                    {"value": "24", "label": "Entertainment"},
                    {"value": "1", "label": "Film & Animation"},
                    {"value": "33", "label": "Gaming"},
                    {"value": "26", "label": "Howto & Style"},
                    {"value": "31", "label": "Music"},
                    {"value": "32", "label": "News & Politics"},
                    {"value": "29", "label": "Nonprofits & Activism"},
                    {"value": "22", "label": "People & Blogs"},
                    {"value": "15", "label": "Pets & Animals"},
                    {"value": "28", "label": "Science & Technology"},
                    {"value": "30", "label": "Sports"},
                    {"value": "19", "label": "Travel & Events"}
                ],
                "split_info": {
                    "s": "mp"
                },
                "s": "mp",
                "t": "all",
                "c": "0"
            }
        }

        let s = req.query.s
        if(!s) {
            s = "mp"
        }
        let c = req.query.c
        let t = req.query.t

        // get most recent and then sort if mp selected
        let videos = videostab.internal_getVideos({
            "query": {
                "c": req.query.c,
                "s": "mr"
            }
        }, "")
        
        // approximate timing
        switch(t) {
            case "day": {
                videos = videos.slice(0, 10)
                break;
            }
            case "week": {
                videos = videos.slice(0, 40)
                break;
            }
            case "month": {
                videos = videos.slice(0, 170)
                break;
            }
        }

        // sort by most popular if needed
        if(s == "mp") {
            videos = videos.sort((a, b) => {
                return utils.bareCount(b.views) - utils.bareCount(a.views)
            })
        }
        videos = videos.slice(0, 20)

        // apply metadata
        response.content.s = s;
        response.content.split_info.s = s;
        let defines = ["mp", "mr"]
        defines.forEach(d => {
            response.content.split_info[d] = {
                "time": [
                    {"value": "day", "label": "1 day"},
                    {"value": "week", "label": "1 week"},
                    {"value": "month", "label": "1 month"},
                    {"value": "year", "label": "1 year"},
                    {"value": "all", "label": "All time"}
                ],
                "category_options": [
                    {"value": "", "label": ""}
                ],
                "category": c
            }
        })
        response.content.c = c;
        response.content.t = t;

        // apply videos
        videos.forEach(v => {
            response.content.videos.push(templates.blazer_bareVideo(
                v.id,
                v.title,
                utils.seconds_to_time(
                    v.length
                    || Math.floor(Math.random() * 80) + 100
                ),
                v.views,
                v.uploaderName,
                []
            ))
        })

        res.send(response)
    },

    // playlists-related stuff

    // read user playlists from cookies
    "inter_read_playlists": function(req) {
        let playlists = []
        if(req.headers.cookie
        && req.headers.cookie.includes("blzr_pl_index=")) {
            let cookie = decodeURIComponent(
                req.headers.cookie
                .split("blzr_pl_index=")[1]
                .split(";")[0]
            )
            cookie.split(";").forEach(p => {
                if(!p.includes("|")) return;
                playlists.push({
                    "id": p.split("|")[0],
                    "name": decodeURIComponent(p.split("|")[1])
                })
            })
        }

        return playlists;
    },

    // write user playlists
    "inter_add_playlist": function(req, name) {
        let playlists = this.inter_read_playlists(req)
        let newPlaylistId = Date.now()
        playlists.push({
            "id": newPlaylistId,
            "name": name
        })

        let finishCookie = ""
        playlists.forEach(p => {
            finishCookie += p.id + "|" + p.name.split("|").join("/") + ";"
        })
        finishCookie = encodeURIComponent(finishCookie)

        return {
            "cookie": finishCookie,
            "id": newPlaylistId
        };
    },

    // add video to playlist
    "add_to_playlist": function(req, playlistId, videoId) {
        let newCookie = ""
        if(req.headers.cookie
        && req.headers.cookie.includes("blzr_pl_" + playlistId + "=")) {
            let cookie = req.headers.cookie
                            .split("blzr_pl_" + playlistId + "=")[1]
                            .split(";")[0]
            cookie += videoId + ":"
            newCookie = cookie;
        } else if(req.headers.cookie) {
            // create the playlist cookie
            newCookie = videoId + ":"
        }

        return newCookie
    },

    // manage playlists endpoint
    "post_manage_playlist": function(req, res) {
        /*res.sendStatus(404)
        return;*/
        if(!req.body) {
            res.sendStatus(400)
            return;
        }
        let body = req.body.toString()
        let action = body.split("&")[0]
        switch(action.split("=")[0]) {
            // creating playlists
            case "action_create_playlist": {
                let playlistName = Date.now().toString()
                let videoId = ""
                body.split("&").forEach(p => {
                    if(p.split("=")[0] == "playlist_name") {
                        playlistName = p.split("=")[1]
                    } else if(p.split("=")[0] == "v") {
                        videoId = p.split("=")[1]
                    }
                })

                let cookie = this.inter_add_playlist(req, playlistName)

                let cookieParams = [
                    `blzr_pl_index=${cookie.cookie}; `,
                    `Path=/; `,
                    `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
                ]
                res.set("set-cookie", cookieParams.join(""))
                res.redirect(
                    "/mobile/blzr/patch_playlist?pid="
                    + cookie.id + "&vid=" + videoId
                )
                
                break;
            }
            // adding videos to playlists
            case "action_add_to_playlist": {
                let playlistId = ""
                let videoId = ""
                body.split("&").forEach(p => {
                    if(p.split("=")[0] == "pid") {
                        playlistId = p.split("=")[1]
                    } else if(p.split("=")[0] == "v") {
                        videoId = p.split("=")[1]
                    }
                })

                let newCookie = this.add_to_playlist(req, playlistId, videoId)
                let cookieParams = [
                    `blzr_pl_${playlistId}=${newCookie}; `,
                    `Path=/; `,
                    `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
                ]
                res.set("set-cookie", cookieParams.join(""))
                res.send({"result": "ok"})
                break;
            }
        }
    },

    // get videos by cookie
    "get_vids_from_cookie": function(req, cookiename, callback, dontFetchVids) {
        let vids = []
        if(req.headers.cookie
        && req.headers.cookie.includes(cookiename + "=")) {
            let cookie = decodeURIComponent(
                req.headers.cookie
                .split(cookiename + "=")[1]
                .split(";")[0]
            )
            cookie.split(":").forEach(v => {
                if(v.length > 0) {
                    vids.push(v)
                }
            })
        }

        let blazerVideosList = []
        vids.forEach(v => {
            // fix bronk playlists
            // turned out messier than i thought
            if(v.length > 11) {
                vids = vids.filter(s => s !== v)
                let properVidIdsAmt = Math.floor(v.length / 11)
                let vi = []
                while(vi.length !== properVidIdsAmt) {
                    if(vi.length == 0) {
                        vi.push(v.substring(0, 11))
                    } else {
                        vi.push(v.substring(
                            11 * (vi.length), 11 * (vi.length + 1)
                        ))
                    }
                }

                vi.forEach(video => {
                    vids.push(video)
                })
            }
        })
        if(dontFetchVids) {
            return vids;
        }
        yt2009html.bulk_get_videos(vids, () => {
            vids.forEach(vid => {
                vid = yt2009html.get_cache_video(vid)
                
                if(!vid.id) return;
                
                blazerVideosList.push(templates.blazer_bareVideo(
                    vid.id,
                    vid.title,
                    utils.seconds_to_time(vid.length),
                    vid.viewCount,
                    vid.author_handle || utils.asciify(vid.author_name),
                    vid.tags
                ))
            })

            callback(blazerVideosList)
        })
    },

    // favorite video
    "favorite": function(req, res) {
        if(!req.body
        || !req.body.toString().includes("v=")) {
            res.sendStatus(400)
            return;
        }
        let v = req.body.toString().split("v=")[1].split("&")[0]
        let cookie = ""
        if(req.headers.cookie
        && req.headers.cookie.includes("blzr_faves=")) {
            cookie = decodeURIComponent(
                req.headers.cookie
                .split("blzr_faves=")[1]
                .split(";")[0]
            )
        }
        if(cookie.includes(v)) {
            res.send({"result": "ok"})
            return;
        }
    
        cookie += v + ":"
        let cookieParams = [
            `blzr_faves=${cookie}; `,
            `Path=/; `,
            `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
        ]
        res.set("set-cookie", cookieParams.join(""))
        res.send({"result": "ok"})
    },

    // get user's favorites
    "get_favs": function(req, res) {
        this.get_vids_from_cookie(req, "blzr_faves", (vids) => {
            res.send({
                "result": "ok",
                "content": {
                    "videos": vids
                }
            })
        })
    },

    // get user's playlists
    "get_playlists": function(req, res) {
        // get index
        let index = this.inter_read_playlists(req)
        let fullPlaylistElement = []
        index.forEach(playlist => {
            // get videos from each playlist (their ids only needed)
            let vidList = this.get_vids_from_cookie(
                req, playlist.id, () => {}, true
            )
            playlist.video_count = vidList.length
            let t = "<img src=\"http://i.ytimg.com/vi/" + vidList[0] + "/default.jpg\"/>"
            playlist.thumbnail = t;
            playlist.url = "/view_playlist?list=" + playlist.id
            fullPlaylistElement.push(playlist)
        })
        res.send({"result": "ok", "content": {
            "playlists": fullPlaylistElement
        }})
    },

    // /view_playlist, get playlist by its cookie id
    "view_cookie_playlist": function(req, res) {
        if(!req.query.list) {
            res.sendStatus(400)
            return;
        }
        let name = "blzr_pl_" + req.query.list
        let playlistName = ""
        // get playlist name with readindex
        this.inter_read_playlists(req).forEach(p => {
            if(p.id == req.query.list) {
                playlistName = p.name
            }
        })

        // get playlist's videos
        this.get_vids_from_cookie(req, name, (vids) => {
            res.send({
                "result": "ok",
                "content": {
                    "playlist": {
                        "name": playlistName,
                        
                        "video_count": vids.length
                    },
                    "videos": vids
                }
            })
        })
    },

    // manage subscription cookie
    "toggle_sub": function(req, res) {
        let response = {
            "result": "ok",
            "content": {
                "is_subscribed": true,
                "xsrf_token": "s"
            }
        }
    
        let target = ""
        let sublist = ""
        if(req.body
        && req.body.toString().includes("&user=")) {
            target = req.body.toString().split("&user=")[1].split("&")[0]
            if(req.headers.cookie
            && req.headers.cookie.includes("blzr_sublist=")) {
                sublist = req.headers.cookie
                          .split("blzr_sublist=")[1]
                          .split(";")[0]
            }
        } else {
            res.sendStatus(400)
            return;
        }
        if(req.body.toString().includes("action_subscribe")) {
            sublist += target.split(";").join(".") + ":"
        } else if(req.body.toString().includes("action_unsubscribe")) {
            sublist = sublist.replace(target + ";", "")
                             .replace(target, "")
        }
    
        let cookieParams = [
            `blzr_sublist=${sublist}; `,
            `Path=/; `,
            `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
        ].join("")
        res.set("set-cookie", cookieParams)
        res.send(response)
    },

    // get user subscriptions
    "get_subs": function(req, callback) {
        let subs = []

        if(req.headers.cookie
        && req.headers.cookie.includes("blzr_sublist=")) {
            subs = req.headers.cookie
                   .split("blzr_sublist=")[1]
                   .split(";")[0]
                   .split(":")
        }

        let finalSubs = []
        subs = subs.filter(s => s !== "")
        subs.forEach(s => {
            this.user_info(s, (data => {
                finalSubs.push({
                    "subscription_image": data.content
                                          .profile_user.image_url,
                    "title": s,
                    "id": s,
                    "subscription_name": s
                })
                if(finalSubs.length >= subs.length) {
                    callback(finalSubs)
                }
            }), false)
        })
    },

    // manage user subscriptions
    "user_subscriptions": function(req, res) {
        this.get_subs(req, (subs) => {
            res.send({
                "result": "ok",
                "content": {
                    "subscriptions": subs
                }
            })
        })
    },

    // subscription feed
    "sub_feed": function(req, res) {
        let response = {
            "result": "ok",
            "content": {
                "subscription_name": req.query.s,
                "videos": []
            }
        }


        subfeed.fetch_new_videos({
            "headers": {
                "url": "/@" + req.query.s
            },
            "query": {"flags": "realistic_view_count"}
        }, {"send": function(feed) {
            feed.videos.forEach(vid => {
                response.content.videos.push(templates.blazer_bareVideo(
                    vid.id,
                    vid.title,
                    vid.time,
                    vid.views,
                    req.query.s,
                    []
                ))
            })

            res.send(response)
        }}, true)
    }

}