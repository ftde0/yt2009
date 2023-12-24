const fs = require("fs");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core")
const child_process = require("child_process");

const yt2009utils = require("./yt2009utils")
const yt2009playlists = require("./yt2009playlists")
const yt2009defaultavatarcache = require("./cache_dir/default_avatar_adapt_manager");
const yt2009search = require("./yt2009search");
const yt2009ryd = require("./cache_dir/ryd_cache_manager");
const yt2009waybackwatch = require("./cache_dir/wayback_watchpage")
const yt2009templates = require("./yt2009templates");
const yt2009languages = require("./language_data/language_engine")
const yt2009exports = require("./yt2009exports")
const constants = require("./yt2009constants.json")
const config = require("./config.json")
const userid = require("./cache_dir/userid_cache")
const crypto = require("crypto")

const watchpage_code = fs.readFileSync("../watch.html").toString();
const watchpage_feather = fs.readFileSync("../watch_feather.html").toString()
let cache = require("./cache_dir/video_cache_manager")
let yt2009userratings = require("./cache_dir/rating_cache_manager")
let innertube_context = {}
let api_key = ""
let featured_videos = []
try {
    featured_videos = require("./cache_dir/watched_now.json")
}
catch(error) {}
let videos_page = []
let continuations_cache = {}
let comment_page_cache = {}
let saved_related_videos = {}
let custom_comments = {}
if(fs.existsSync("./cache_dir/comments.json")) {
    try {
        custom_comments = require("./cache_dir/comments.json")
    }
    catch(error) {}
}

let oldCommentsCache = {}
if(fs.existsSync("./cache_dir/old_comments.json")) {
    try {
        oldCommentsCache = require("./cache_dir/old_comments.json")
    }
    catch(error) {oldCommentsCache = {}}
} else {
    fs.writeFileSync("./cache_dir/old_comments.json", "{}")
}
let oldCommentsWrite = setInterval(function() {
    fs.writeFileSync(
        "./cache_dir/old_comments.json",
        JSON.stringify(oldCommentsCache)
    )
}, 1000 * 60 * 60)

module.exports = {
    "innertube_get_data": function(id, callback) {
        if(JSON.stringify(innertube_context) == "{}") {
            innertube_context = constants.cached_innertube_context
            api_key = this.get_api_key()
        }

        let callbacksRequired = 2;
        let callbacksMade = 0;
        let combinedResponse = {}
        fetch(`https://www.youtube.com/youtubei/v1/next?key=${api_key}`, {
            "headers": constants.headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "autonavState": "STATE_OFF",
                "captionsRequested": false,
                "contentCheckOk": false,
                "context": innertube_context,
                "playbackContext": {"vis": 0, "lactMilliseconds": "1"},
                "racyCheckOk": false,
                "videoId": id
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            for(let i in r) {
                combinedResponse[i] = r[i]
            }
            callbacksMade++
            if(callbacksMade == callbacksRequired) {
                callback(combinedResponse)
            }
        })})

        fetch(`https://www.youtube.com/youtubei/v1/player?key=${api_key}`, {
            "headers": constants.headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "contentCheckOk": false,
                "context": innertube_context,
                "playbackContext": {"vis": 0, "lactMilliseconds": "1"},
                "racyCheckOk": false,
                "videoId": id
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            for(let i in r) {
                combinedResponse[i] = r[i]
            }
            callbacksMade++
            if(callbacksMade == callbacksRequired) {
                callback(combinedResponse)
            }
        })})
    },

    "fetch_video_data": function(id, callback, userAgent, userToken, useFlash, resetCache, disableDownload) {
        let waitForOgv = false;

        // if firefox<=25 wait for ogg, otherwise callback mp4
        if(userAgent.includes("Firefox/")) {
            let ffVersion = parseInt(userAgent.split("Firefox/")[1].split(" ")[0])
            if(ffVersion <= 25 && !useFlash) {
                waitForOgv = true;
            }
        }
        // callback local data if saved
        if(cache.read()[id] && !waitForOgv && !resetCache) {
            let v = cache.read()[id]
            if(config.env == "dev") {
                console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
            }

            if(!fs.existsSync(`../assets/${id}.mp4`) && !disableDownload) {
                yt2009exports.updateFileDownload(id, 1)
                yt2009utils.saveMp4(id, (path => {
                    yt2009exports.updateFileDownload(id, 2)
                }))
                callback(v)
            } else {
                callback(v)
            }
            
        } else if(cache.read()[id] && waitForOgv && !resetCache) {
            if(!fs.existsSync(`../assets/${id}.ogg`)) {
                // if needed, export to ogv before callback
                child_process.exec(yt2009templates.createFffmpegOgg(id),
                (error, stdout, stderr) => {
                    let v = cache.read()[id]
                    if(config.env == "dev") {
                        console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
                    }
                    callback(v)
                })
            } else {
                // if ogg needed but already there, callback
                let v = cache.read()[id]
                if(config.env == "dev") {
                    console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
                }
                callback(v)
            }
        } else {
            // fetch otherwise
            if(config.env == "dev") {
                console.log(`(${userToken}) ${id} clean fetch ${Date.now()} ${resetCache ? "(cache reset)" : ""}`)
            }
            this.innertube_get_data(id, (videoData => {
                let fetchesCompleted = 0;

                let data = {}
                try {
                    data.title = videoData.videoDetails.title
                }
                catch(error) {
                    callback(false)
                    return;
                }

                if(videoData.videoDetails.isLive) {
                    callback(false)
                    return;
                }

                // basic data
                data.description = videoData.videoDetails.shortDescription
                data.viewCount = videoData.videoDetails.viewCount
                data.author_name = videoData.videoDetails.author;
                data.id = id;
                data.author_url = ""
                try {
                    data.author_url = videoData.contents
                                        .twoColumnWatchNextResults
                                        .results.results.contents[1]
                                        .videoSecondaryInfoRenderer.owner
                                        .videoOwnerRenderer.navigationEndpoint
                                        .browseEndpoint.canonicalBaseUrl
                }
                catch(error) {
                    data.author_url = "/channel/" + videoData.videoDetails.channelId
                }

                if(data.author_url.startsWith("/@")) {
                    data.author_handle = data.author_url.replace("/@", "");
                }

                if(!data.author_url.startsWith("/c/")
                && !data.author_url.startsWith("/user/")
                && !data.author_url.startsWith("/channel")) {
                    // fallback to /channel/ (may get changed in the future)
                    data.author_url = "/channel/" + videoData.contents
                                                    .twoColumnWatchNextResults
                                                    .results.results
                                                    .contents[1]
                                                    .videoSecondaryInfoRenderer
                                                    .owner.videoOwnerRenderer
                                                    .navigationEndpoint
                                                    .browseEndpoint.browseId
                }

                data.author_id = videoData.videoDetails.channelId
                if(data.author_handle) {
                    userid.write("/@" + data.author_handle, data.author_id)
                }

                // more basic data
                data.author_img = ""
                try {
                    data.author_img = videoData.contents
                                      .twoColumnWatchNextResults
                                      .results.results.contents[1]
                                      .videoSecondaryInfoRenderer
                                      .owner.videoOwnerRenderer
                                      .thumbnail.thumbnails[1].url
                }
                catch(error) {
                    data.author_img = "default"
                }
                data.upload = videoData.microformat
                              .playerMicroformatRenderer.uploadDate
                data.tags = videoData.videoDetails.keywords || [];
                data.related = []
                data.length = parseInt(videoData.microformat
                                       .playerMicroformatRenderer
                                       .lengthSeconds)
                data.category = videoData.microformat
                                .playerMicroformatRenderer.category

                // "related" videos

                let related = []
                try {
                    related = videoData.contents.twoColumnWatchNextResults
                            .secondaryResults.secondaryResults.results
                            || videoData.contents.twoColumnWatchNextResults
                                .secondaryResults.secondaryResults.results[1]
                                .itemSectionRenderer.contents
                }
                catch(error) {}
                related.forEach(video => {
                    if(!video.compactVideoRenderer) return;

                    video = video.compactVideoRenderer;

                    let creatorName = ""
                    let creatorUrl = ""
                    video.shortBylineText.runs.forEach(run => {
                        creatorName += run.text;
                        creatorUrl += run.navigationEndpoint
                                        .browseEndpoint.canonicalBaseUrl
                    })

                    if(!creatorUrl.startsWith("/c/")
                    && !creatorUrl.startsWith("/user/")
                    && !creatorUrl.startsWith("/channel/")) {
                        creatorUrl = "/channel/" + video.shortBylineText.runs[0]
                                                    .navigationEndpoint
                                                    .browseEndpoint.browseId
                    }
                    try {
                        data.related.push({
                            "title": video.title.simpleText,
                            "id": video.videoId,
                            "views": video.viewCountText.simpleText,
                            "length": video.lengthText.simpleText,
                            "creatorName": creatorName,
                            "creatorUrl": creatorUrl,
                            "uploaded": video.publishedTimeText.simpleText
                        })
                    }
                    catch(error) {
                        
                    }
                })

                // save channel image

                let fname = data.author_img.split("/")
                            [data.author_img.split("/").length - 1]
                if(!fs.existsSync(`../assets/${fname}.png`)
                && data.author_img !== "default") {
                    fetch(data.author_img, {
                        "headers": constants.headers
                    }).then(r => {
                        r.buffer().then(buffer => {
                            fs.writeFileSync(`../assets/${fname}.png`, buffer)
                            fetchesCompleted++;
                            if(fetchesCompleted >= 3) {
                                callback(data)
                            }
                            
                        })
                    })
                } else {
                    fetchesCompleted++;
                    if(fetchesCompleted >= 3) {
                        callback(data)
                    }
                }
                data.author_img = `/assets/${fname}.png`
            

                // fetch comments
                const pb = require("./proto/cmts_pb")
                let commentRequest = new pb.comments()

                let videoMsg = new pb.comments.video()
                videoMsg.setVideoid(id)
                commentRequest.addVideomsg(videoMsg)

                commentRequest.setType(6)

                let commentsReqParamsMain = new pb.comments.commentsReq()
                commentsReqParamsMain.setSectiontype("comments-section")
                let crpChild = new pb.comments.commentsReq.commentsData()
                crpChild.setVideoid(id)
                commentsReqParamsMain.addCommentsdatareq(crpChild)
                commentRequest.addCommentsreqmsg(commentsReqParamsMain)

                let token = encodeURIComponent(Buffer.from(
                    commentRequest.serializeBinary()
                ).toString("base64"))
                
                this.request_continuation(token, id, "",
                    (comment_data) => {
                        data.comments = comment_data
                        fetchesCompleted++;
                        if(fetchesCompleted >= 3) {
                            callback(data)
                        }
                    }
                )

                // qualities
                data.qualities = []
                if(!videoData.streamingData.adaptiveFormats) {
                    videoData.streamingData.adaptiveFormats = [{"qualityLabel": "360p"}]
                }
                videoData.streamingData.adaptiveFormats.forEach(quality => {
                    if(quality.qualityLabel
                    && !data.qualities.includes(quality.qualityLabel)) {
                        data.qualities.push(quality.qualityLabel)
                    }
                })
                
                // save mp4/ogv

                if((!fs.existsSync(`../assets/${id}.mp4`) && !disableDownload)) {
                    function on_mp4_save_finish(path) {
                        if(waitForOgv) {
                            child_process.exec(
                                yt2009templates.createFffmpegOgg(id),
                                (error, stdout, stderr) => {
                                    data.mp4 = `/assets/${id}`
                                    fetchesCompleted++;
                                    if(fetchesCompleted >= 3) {
                                        callback(data)
                                    }  
                                }
                            )
                        } else {
                            if((path || "").includes("googlevideo")) {
                                data.mp4 = path;
                            } else {
                                data.mp4 = `/assets/${id}`
                            }
                            fetchesCompleted++;
                            if(fetchesCompleted >= 3) {
                                callback(data)
                            }
                            cache.write(id, data)
                        }
                    }

                    // ytdl
                    yt2009exports.updateFileDownload(id, 1)
                    if(!waitForOgv) {
                        data.pMp4 = "/get_video?video_id=" + id + "/mp4"
                        yt2009utils.saveMp4(id, (path => {
                            yt2009exports.updateFileDownload(id, 2)
                        }))
                        on_mp4_save_finish(`../assets/${id}`)
                    } else {
                        yt2009utils.saveMp4(id, (path => {
                            on_mp4_save_finish(path)
                        }))
                    }
                    
                    
                } else {
                    data.mp4 = `/assets/${id}`
                    fetchesCompleted++;
                    if(fetchesCompleted >= 3) {
                        callback(data)
                    }
                    cache.write(id, data);
                }
            }))
        }
    },



    "applyWatchpageHtml": function(data, req, callback, qualityList) {
        // apply data from fetch_video_data to html
        let code = watchpage_code;
        let requiredCallbacks = 1;
        let callbacksMade = 0;
        let endscreen_queue = []
        let commentId = this.commentId
        let hasComment = this.hasComment

        // basic data
        // flags
        flags = ""
        try {
            if(req.query.flags) {
                flags += decodeURIComponent(req.query.flags)
            }
            flags += req.headers.cookie
                    .split("watch_flags=")[1]
                    .split(";")[0]
            flags += ";" + req.headers.cookie.split("global_flags")[1]
                                                .split(";")[0]
        }
        catch(error) {}

        // modern qualitylist
        if(data.qualities) {
            qualityList = data.qualities;
        } else {
            qualityList = []
        }

        // playlist
        let playlistId = req.query.list

        // feather mode
        let isFeather = false;
        if(req.headers.cookie.includes("useFeather")) {
            isFeather = true;
        }

        // subscribe list
        let subscribeList = yt2009utils.get_subscriptions(req);

        // protocol
        let protocol = req.protocol

        // flash
        let useFlash = false;
        if(req.originalUrl.includes("&f=1") ||
            req.headers.cookie.includes("f_mode")) {
            useFlash = true;
        }

        // useragent
        let userAgent = req.headers["user-agent"]

        // quality list
        let showHQ = false;

        if(isFeather && !useFlash) {
            code = watchpage_feather;
            code = code.replace("/embed/video_id", `/embed/${data.id}`)
        } else if(isFeather && useFlash) {
            code = watchpage_feather;
            code = code.replace(
                `<iframe class="html5_video" src="/embed/video_id"></iframe>`,
                ``)
        }

        code = require("./yt2009loginsimulate")(flags, code, true)

        // handling flag
        
        let author_name = data.author_name;
        if(flags.includes("remove_username_space")) {
            author_name = author_name.split(" ").join("")
        }

        if(flags.includes("username_asciify")) {
            author_name = yt2009utils.asciify(author_name, true, true)
            if(author_name == "") {
                author_name = data.author_handle
                              || yt2009utils.asciify(author_name)
            }
        }

        if(data.author_url.includes("/user/")) {
            author_name = data.author_url.split("/user/")[1]
        }

        let uploadJS = new Date(data.upload)

        
        // login_simulate comments
        if(req.headers.cookie.includes("login_simulate")
        && !req.headers.cookie.includes("relay_key")) {
            code = code.replace(
                `<!--yt2009_relay_comment_form-->`,
                yt2009templates.videoCommentPost(false, null, data.id)
            )
        }

        let totalCommentCount = 0;
        if(custom_comments[data.id]) {
            let commentsHTML = ""
            custom_comments[data.id].forEach(comment => {
                if(!comment.time || !comment.text) return;
                let commentTime = yt2009utils.unixToRelative(comment.time)
                commentTime = yt2009utils.relativeTimeCreate(
                    commentTime, yt2009languages.get_language(req)
                )
                let commentHTML = yt2009templates.videoComment(
                    "#", comment.author, commentTime,
                    comment.text, flags, true, comment.rating,
                    comment.id
                )

                // get liked/disliked status by user
                let token = yt2009utils.get_used_token(req)
                if(token == "") {
                    token = "dev"
                }
                if(comment.ratingSources[token] == 1) {
                    commentHTML = commentHTML.replace(
                        "watch-comment-up-hover",
                        "watch-comment-up-on"
                    )
                } else if(comment.ratingSources[token] == -1) {
                    commentHTML = commentHTML.replace(
                        "watch-comment-down-hover",
                        "watch-comment-down-on"
                    )
                }

                totalCommentCount++
                commentsHTML += commentHTML
            })

            code = code.replace(
                `<!--yt2009_custom_comments-->`, commentsHTML
            )
        }

        // wayback_features
        if(flags.includes("wayback_features") &&
            uploadJS.getFullYear() <= 2013) {

            let waybackProtocol = `=== wayback_features ===`
            // get features to be applied
            let requiredFeatures = []
            decodeURIComponent(flags.split("wayback_features")[1].split(":")[0])
            .split("+").forEach(feature => {
                requiredFeatures.push(feature)
            })
            waybackProtocol += `\nrequested features: ${requiredFeatures.join()}`

            if(requiredFeatures.join() == "all") {
                requiredFeatures = ["metadata", "comments", "related", "author"]
            }
            
            requiredCallbacks++;
            setTimeout(function() {
                yt2009waybackwatch.read(data.id, (waybackData) => {
                    // data
                    waybackProtocol += `\narchive year: ${waybackData.archiveYear}
                    (archives 2014 and later are not used)`

                    if(!waybackData.title && waybackData.archiveYear < 2014) {
                        waybackProtocol += `
                        
possibly an empty/failed archive!
wayback save url:
https://web.archive.org/web/20091111/http://www.youtube.com/watch?v=${data.id}`
                    }
                    // video metadata
                    if(requiredFeatures.includes("metadata")) {
                        // html prep

                        // tags
                        if(waybackData.tags) {
                            code = code.replace(
                            `<div id="watch-video-tags" class="floatL">`,
                            `<div id="watch-video-tags" class="floatL wayback">
                                <!--yt2009_wayback_tags-->
                             </div>
                             <div id="original-watch-video-tags"
                                    class="floatL hid">`)
                        }
                        let tagsHTML = ""
                        waybackData.tags.forEach(tag => {
                            tagsHTML += `<a href="#" class="hLink" style="margin-right: 5px;">${tag}</a>`
                        })

                        code = code.replace(`<!--yt2009_wayback_tags-->`,
                                            tagsHTML)

                        // title
                        if(waybackData.title) {
                            code = code.replace(
                                `<h1 class="watch-vid-ab-title">`,
                                `<h1 class="watch-vid-ab-title">
                                    <!--yt2009_wayback_title-->
                                 </h1>
                                 <h1 class="original-watch-vid-ab-title hid">`
                            )
                        }
                        code = code.replace(`<!--yt2009_wayback_title-->`,
                                            waybackData.title)
                        
                        // description
                        if(waybackData.description) {
                            code = code.replace(
                                `<!--yt2009_wayback_short_desc--><span class="description">`,
                                `<!--yt2009_wayback_short_desc--><span class="original-short-description hid">`
                            )
                            code = code.replace(
                                `<!--yt2009_wayback_full_desc--><span>`,
                                `<!--yt2009_wayback_full_desc--><span class="original-full-desc hid">`
                            )
                        }
                        let shortDescription = waybackData.description
                                                .split("<br>")
                                                .slice(0, 3)
                        let fullDescription = waybackData.description
                        let shortDescriptionParsed = ``
                        let fullDescriptionParsed = ``

                        shortDescription.forEach(part => {
                            part.split(" ").forEach(word => {
                                if(word.startsWith("http://")
                                    || word.startsWith("https://")) {
                                    shortDescriptionParsed += `
                                    <a href="${word}" target="_blank">
                                        ${word.length > 40 ?
                                            word.substring(0, 40) + "..."
                                            : word}
                                    </a> `
                                } else {
                                    shortDescriptionParsed += `${word} `
                                }
                            })
                            shortDescriptionParsed += "<br>"
                        })
                        
                        fullDescription.split("<br>").forEach(part => {
                            part.split(" ").forEach(word => {
                                if(word.startsWith("http://")
                                || word.startsWith("https://")) {
                                    fullDescriptionParsed += `
                                    <a href="${word}" target="_blank">
                                        ${word.length > 40 ?
                                            word.substring(0, 40) + "..."
                                            : word}
                                    </a> `
                                } else {
                                    fullDescriptionParsed += `${word} `
                                }
                            })
                            fullDescriptionParsed += "<br>"
                        })
                        
                        if(shortDescriptionParsed.trimStart()
                                                .startsWith("<br>")) {
                            shortDescriptionParsed = shortDescriptionParsed
                                                        .replace("<br>", "")
                            fullDescriptionParsed = fullDescriptionParsed
                                                        .replace("<br>", "")
                        }

                        code = code.replace(`<!--yt2009_wayback_short_desc-->`,
                                            shortDescriptionParsed)
                        code = code.replace(`<!--yt2009_wayback_full_desc-->`,
                                            fullDescriptionParsed)
                    }

                    // video author data
                    if(requiredFeatures.includes("author")) {
                        // avatar
                        if(waybackData.authorAvatar) {
                            code = code.replace("yt2009-channel-avatar",
                                                "yt2009-channel-avatar hid")
                            code = code.replace(
                                "<!--yt2009_authorpic-wayback-->",
                                `<a class="url yt2009-channel-avatar"
                                    href="
                                        ${data.author_url}">
                                        <img src="${waybackData.authorAvatar
                                                    .replace("http://",
                                                    req.protocol + "://")}"
                                            loading="lazy"
                                            onerror="this.parentNode.removeChild(this)"
                                        class="photo"/>
                                </a>`)
                        }

                        // name
                        if(waybackData.authorName
                        && !waybackData.authorName
                            .toLowerCase().includes("subscribe")
                        && waybackData.authorName
                           .replace(/[^a-zA-Z0-9]/g, "").trim()) {
                            code = code.replace(`yt2009-channel-link`,
                                            `original-yt2009-channel-link hid`)
                            code = code.replace(`<!--yt2009_author_wayback-->`, `
                            <a href="${data.author_url}"
                                class="hLink fn n contributor yt2009-channel-link">
                                ${waybackData.authorName}
                            </a>`)

                            // more from
                            if(code.split("lang_morefrom").length >= 2) {
                                let currentUsername = code.
                                                    split("lang_morefrom")[1].
                                                    split("\n")[0]
                                code = code.replace(
                                    `lang_morefrom${currentUsername}`,
                                    `lang_morefrom${waybackData.authorName}`
                                )
                            }
                        }

                        // banner
                        if(waybackData.authorBanner) {
                            code = code.replace(`<div id="watch-channel-brand-cap">`, `
                            <div id="watch-channel-brand-cap">
                                <a href="${data.author_url}"><img src="${waybackData.authorBanner}" width="300" height="50" border="0"></a>
                            </div>
                            <div id="original-watch-channel-brand-cap" class="hid">`)
                            code = code.replace(`<!--yt2009_bannercard-->`, `
                            <div id="watch-channel-brand-cap">
                                <a href="${data.author_url}"><img src="${waybackData.authorBanner}" width="300" height="50" border="0"></a>
                            </div>`)
                        } else {
                            code = code.replace(`<div id="watch-channel-brand-cap">`,
                            `<div id="watch-channel-brand-cap" class="wayback_not_found">`)
                        }
                    }

                    // video comments
                    if(requiredFeatures.includes("comments")
                        && waybackData.comments.length > 0) {
                        let commentsLength = waybackData.comments.length
                        let commentsHTML = `<!--wayback_features comments-->`
                        waybackData.comments.forEach(comment => {
                            if(!comment.authorName ||
                                !comment.content ||
                                code.includes(comment.authorName)) return;
                            let commentTime = comment.time.split("\n").join("")
                                                        .split("  ").join("")
                                                        .replace(" (", "")
                                                        .replace(") ", "")
                            // time in a different language
                            let englishTimeWords = [
                                "year",
                                "month",
                                "day",
                                "hour",
                                "minute",
                                "second"
                            ]
                            let englishLanguageComment = false;
                            englishTimeWords.forEach(word => {
                                if(commentTime.toLowerCase().includes(word)) {
                                    englishLanguageComment = true
                                }
                            })
                            if(!englishLanguageComment) {
                                commentTime = commentTime.replace(/[^0-9]/g, "") + " months ago"
                            }
                            commentTime = yt2009utils.relativeTimeCreate(
                                commentTime, yt2009languages.get_language(req)
                            )

                            let id = commentId(comment.authorUrl, comment.content)

                            let likes = comment.likes || Math.floor(Math.random() * 2)
                            let customRating = 0;
                            let customData = hasComment(data.id, id)
                            if(customData) {
                                likes += customData.rating
                                let token = yt2009utils.get_used_token(req)
                                token == "" ? token = "dev" : ""
                                if(customData.ratingSources[token]) {
                                    customRating = customData.ratingSources[token]
                                }
                            }

                            // add comment
                            let commentHTML = yt2009templates.videoComment(
                                comment.authorUrl,
                                comment.authorName,
                                commentTime,
                                comment.content,
                                flags,
                                true,
                                likes,
                                id
                            )
                            if(customRating == 1) {
                                commentHTML = commentHTML.replace(
                                    "watch-comment-up-hover",
                                    "watch-comment-up-on"
                                )
                            } else if(customRating == -1) {
                                commentHTML = commentHTML.replace(
                                    "watch-comment-down-hover",
                                    "watch-comment-down-on"
                                )
                            }
                            commentsHTML += commentHTML
                        })
                        commentsHTML += `<!--Default YT comments below.-->`
                        code = code.replace(`<!--yt2009_wayback_comments-->`,
                                            commentsHTML)

                        let defaultCommentCount = parseInt(
                            code
                            .split(`id="watch-comment-count">`)[1]
                            .split("</span>")[0]
                        )

                        let newCommentCount = 
                        defaultCommentCount + commentsLength;

                        code = code
                        .replace(
                            `id="watch-comment-count">${defaultCommentCount}`,
                            `id="watch-comment-count">${newCommentCount}`
                        )
                    }

                    // related
                    if(requiredFeatures.includes("related")
                        && waybackData.related.length > 0) {
                        let relatedHTML = `<!--See a hidden video (.hid)?
                                            It was most likely hidden because
                                            it's a dead link.-->`;
                        // try to get author prefix for related ("by ...") to rm
                        let authorPrefix = ""
                        // add shortened author names as "prefixes"
                        let prefixes = []
                        waybackData.related.forEach(video => {
                            if(video.uploaderName.includes(" views")) {
                                let viewCount = video.uploaderName
                                let uploaderName = video.viewCount
                                video.uploaderName = uploaderName;
                                video.viewCount = viewCount;
                            }
                            prefixes.push(video.uploaderName.substring(0, 7))
                        })
                        let i = 0;
                        // filter out EXACT same author names
                        // (prevents author names being considered prefixes)
                        prefixes.forEach(p => {
                            i++;
                            if(prefixes[i] == prefixes[i - 1]) {
                                prefixes = prefixes.filter(s => s !== prefixes[i])
                            }
                        })
                        // foreach and compare previous "prefix"
                        // to narrow down the prefix's length and the actual value
                        i = 0;
                        prefixes.forEach(p => {
                            i++;
                            if(!prefixes[i]) return;
                            let prefixLength = 7;
                            while(prefixLength >= 2) {
                                let u0Prefix = prefixes[i].substring(
                                    0, prefixLength
                                )
                                let u1Prefix = prefixes[i - 1].substring(
                                    0, prefixLength
                                )
                                if(u0Prefix == u1Prefix) {
                                    authorPrefix = u0Prefix;
                                    break;
                                } else {
                                    authorPrefix = ""
                                }
                                prefixLength--
                            }
                        })
                        // continue as normal
                        waybackData.related.forEach(video => {
                            // check if uploadername and viewcount
                            // aren't swapped for whatever reason
                            if(video.uploaderName.includes(" views")) {
                                let viewCount = video.uploaderName
                                let uploaderName = video.viewCount
                                video.uploaderName = uploaderName;
                                video.viewCount = viewCount;
                            }
                            // don't show mixes/filter out already added videos
                            if(code.includes(`data-id="${video.id}"`) ||
                                video.viewCount
                                .toLowerCase()
                                .includes("playlist") ||
                                video.uploaderName
                                .toLowerCase()
                                .includes("playlist")) return;
                            let views = "lang_views_prefix" + yt2009utils.countBreakup(
                                parseInt(yt2009utils.bareCount(video.viewCount))
                            ) + "lang_views_suffix"
                            if(isNaN(
                                parseInt(yt2009utils.bareCount(video.viewCount))
                            )) {
                                views = ""
                            }

                            // apply
                            relatedHTML += yt2009templates.relatedVideo(
                                video.id,
                                video.title,
                                req.protocol,
                                video.time,
                                views,
                                video.uploaderUrl ? video.uploaderUrl : "#",
                                video.uploaderName.replace(authorPrefix, ""),
                                flags + "/wayback"
                            )
                        })

                        code = code.replace(
                            `<!--yt2009_wayback_related_features_marking-->`,
                            relatedHTML)
                    }


                    code = code.replace(`<!--yt2009_wayback_protocol-->`,
                    `<div class="yt2009-wayback-protocol hid">${waybackProtocol}</div>`)
                    callbacksMade++;
                    if(requiredCallbacks == callbacksMade) {
                        render_endscreen();
                        fillFlashIfNeeded();
                        genRelay();
                        callback(code)
                    }
                }, req.query.resetcache == 1)
            }, 500)
        }
        if(flags.includes("homepage_contribute")
        && uploadJS.getFullYear() <= 2010) {
            // add to "videos being watched now" and /videos
            let go = true;
            featured_videos.slice(0, 23).forEach(vid => {
                if(vid.id == data.id) {
                    go = false;
                }
            })

            if(yt2009exports.read().masterWs) {
                try {
                    yt2009exports.read().masterWs.send(JSON.stringify({
                        "type": "vid-watched",
                        "id": data.id
                    }))
                }
                catch(error) {}
            }

            if(go) {
                featured_videos.forEach(vid => {
                    if(vid.id == data.id) {
                        // remove the previous entry for that video
                        featured_videos = featured_videos
                                            .filter(s => s !== vid)
                    }
                })
                featured_videos.unshift({
                    "id": data.id,
                    "title": data.title,
                    "views": yt2009utils.countBreakup(data.viewCount) + " views",
                    "uploaderHandle": data.author_handle || false,
                    "uploaderName": data.author_name,
                    "uploaderUrl": data.author_url,
                    "time": data.length,
                    "category": data.category,
                    "qualities": data.qualities || false,
                    "upload": data.upload
                })
                videos_page.unshift({
                    "id": data.id,
                    "title": data.title,
                    "views": yt2009utils.countBreakup(data.viewCount) + " views",
                    "uploaderHandle": data.author_handle || false,
                    "uploaderName": data.author_name,
                    "uploaderUrl": data.author_url,
                    "time": data.length,
                    "category": data.category,
                    "qualities": data.qualities || false,
                    "upload": data.upload
                })
                fs.writeFileSync("./cache_dir/watched_now.json",
                                JSON.stringify(featured_videos))
            }
        }

        let uploadDate = data.upload

        uploadDate = uploadDate.replace("Streamed live on ", "")
                                .replace("Premiered ", "")
        if(uploadDate.includes("-")) {
            // fallback format
            let temp = new Date(uploadDate)
            uploadDate = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"][temp.getMonth()]
                        + " " + temp.getDate()
                        + ", " + temp.getFullYear()
        }

        if(flags.includes("fake_upload_dateadapt")
        && new Date(uploadDate).getTime() > 1272664800000) {
            uploadDate = yt2009utils.genAbsoluteFakeDate(uploadDate)
        } else if(flags.includes("fake_upload_date")
        && !flags.includes("fake_upload_dateadapt")) {
            uploadDate = yt2009utils.genAbsoluteFakeDate(uploadDate)
        }

        // upload date language handle
        let userLang = yt2009languages.get_language(req)
        let upDateDay = uploadDate.split(" ")[1].replace(",", "")
        let upDateMonth = uploadDate.split(" ")[0]
        let upDateYear = uploadDate.split(" ")[2]
        let languageUpDateRule = yt2009languages.raw_language_data(userLang)
                                                .watchpageUploadDate

        if(!languageUpDateRule) {
            languageUpDateRule = yt2009languages.raw_language_data("en")
                                                .watchpageUploadDate
        }
        uploadDate = languageUpDateRule.dateFormat.replace(
            "[day]", upDateDay
        ).replace(
            "[monthcode]", languageUpDateRule.monthcodes[upDateMonth]
        ).replace(
            "[year]", upDateYear
        )


        let channelIcon = data.author_img;
        if(flags.includes("default_avataradapt")) {
            if(yt2009defaultavatarcache.use(`../${channelIcon}`)) {
                channelIcon = "/assets/site-assets/default.png"
            }
        } else if(flags.includes("default_avatar")
            && !flags.includes("default_avataradapt")) {
            channelIcon = "/assets/site-assets/default.png"
        }
        if(channelIcon == "default"
        || channelIcon == "/assets/default.png") {
            channelIcon = "/assets/site-assets/default.png"
        }

        function setChannelIcon() {
            code = code.replace("channel_icon", channelIcon)
        }


        let views = yt2009utils.countBreakup(data.viewCount)
        if(flags.includes("realistic_view_count")) {
            if(parseInt(data.viewCount) > 100000) {
                views = yt2009utils.countBreakup(
                    Math.floor(parseInt(data.viewCount) / 90)
                )
            }
        }

        let ratings_estimate_power = 15
        let ratings = "";
        if(parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
            ratings_estimate_power = 150
        }
        ratings = yt2009utils.countBreakup(
            Math.floor(
                parseInt(views.replace(/[^0-9]/g, ""))
                / ratings_estimate_power
            )
        )
        

        // "more from" section
        let authorUrl = data.author_url
        if(authorUrl.startsWith("/")) {
            authorUrl = authorUrl.replace("/", "")
        }
        let moreFromCode = yt2009templates.morefromEntry(author_name)
        moreFromCode += `
                    <div class="yt2009-mark-morefrom-fetch">Loading...</div>
			        <div class="clearL"></div>
		        </div>
            </div>
        </div>`
        code = code.replace(`<!--yt2009_more_from_panel-->`, moreFromCode)

        // if flash player is used
        // hide the html5 js, fix the layout, put a flash player
        let env = config.env
        let swfFilePath = "/watch.swf"
        let swfArgPath = "video_id"
        if(req.headers.cookie.includes("alt_swf_path")) {
            swfFilePath = decodeURIComponent(
                req.headers.cookie.split("alt_swf_path=")[1].split(";")[0]
            )
            if(!swfFilePath) {swfFilePath = "/watch.swf"}
        }
        if(req.headers.cookie.includes("alt_swf_arg")) {
            swfArgPath = decodeURIComponent(
                req.headers.cookie.split("alt_swf_arg=")[1].split(";")[0]
            )
        }
        let flash_url = `${swfFilePath}?${swfArgPath}=${data.id}`
        if((req.headers["cookie"] || "").includes("f_h264")) {
            flash_url += "%2Fmp4"
        }
        flash_url += `&iv_module=http%3A%2F%2F${config.ip}%3A${config.port}%2Fiv_module.swf`
        if(useFlash) {
            code = code.replace(
                `<!DOCTYPE HTML>`,
                yt2009templates.html4
            )
            code = code.replace(
                `<!DOCTYPE html>`,
                yt2009templates.html4
            )
            if(userAgent.includes("Firefox/") || userAgent.includes("MSIE")) {
                code = code.replace(
                    `><span style="display: block;">lang_search`,
                    ` style="width: 40px;"><span>lang_search`
                )
            }
            code = code.replace(
                `<script src="/assets/site-assets/html5-player.js"></script>`,
                ``
            )
            code = code.replace(`initPlayer(`, `//initPlayer(`)
            let removePart = code.split(`<!--yt2009_html5_rm_1-->`)[1]
                                 .split(`<!--yt2009_html5_rm_2-->`)[0]
            code = code.replace(removePart, "")
            code = code.replace(
                `class="flash-player"`,
                `class="flash-player hid"`
            )
            code = code.replace(
                `<!--hook /assets/site-assets/f_script.js -->`,
                `<script src="/assets/site-assets/f_script.js"></script>`
            )
            code = code.replace(
                `<script src="nbedit_watch.js"></script>`,
                `<!--<script src="nbedit_watch.js"></script>-->`
            )
        }

        code = code.replace(`<!--yt2009_html5_rm_1-->`, "")
                   .replace(`<!--yt2009_html5_rm_2-->`, "")

        if(!userAgent.includes("MSIE") && !userAgent.includes("Chrome/")
        && !useFlash) {
            code = code.replace(
                `id="watch-longform-player" class="master-sprite"`,
                `id="watch-longform-player" class="master-sprite not-pos-exclude"`
            )
            code = code.replace(
                `id="watch-longform-popup" class="master-sprite"`,
                `id="watch-longform-popup" class="master-sprite not-pos-exclude"`
            )
        }
        if(!useFlash) {
            code = code.replace("yt2009_ch5", "yt2009_html5")
        }

        // podkładanie pod html podstawowych danych
        code = code.split("video_title").join(yt2009utils.xss(data.title).trim())
        code = code.replace("video_view_count", views)
        if(!flags.includes("author_old_avatar")) {
            setChannelIcon()
        } else {
            requiredCallbacks++
        }
        code = code.replace("channel_name", yt2009utils.xss(author_name))
        code = code.split("channel_url").join(data.author_url)
        code = code.replace("upload_date", uploadDate)
        code = code.replace("yt2009_ratings_count", ratings)
        if(!useFlash) {
            code = code.replace(
                "mp4_files", 
                `<source src="${data.pMp4 || (data.mp4 + ".mp4")}" type="video/mp4"></source>
                <source src="${data.mp4}.ogg" type="video/ogg"></source>`
            )
            if(data.pMp4) {
                code = code.replace(
                    "//yt2009-pmp4",
                    "showLoadingSprite()"
                )
                code = code.replace(
                    `0:00 / 0:00`,
                    `0:00 / ${yt2009utils.seconds_to_time(data.length)}`
                )
            }
        }
        code = code.replace(
            "video_url",
            `http://youtube.com/watch?v=${data.id}`
        )
        code = code.replace(
            "video_embed_link",
            `<object width=&quot;425&quot; height=&quot;344&quot;><param name=&quot;movie&quot; value=&quot;http://${config.ip}%3A${config.port}/watch.swf?video_id=${data.id}&quot;></param><param name=&quot;allowFullScreen&quot; value=&quot;true&quot;></param><param name=&quot;allowscriptaccess&quot; value=&quot;always&quot;></param><embed src=&quot;http://${config.ip}%3A${config.port}/watch.swf?video_id=${data.id}&quot; type=&quot;application/x-shockwave-flash&quot; allowscriptaccess=&quot;always&quot; allowfullscreen=&quot;true&quot; width=&quot;425&quot; height=&quot;344&quot;></embed></object>`
        )

        let description = yt2009utils.descriptionDistill(data.description, req);

        // markup descriptions - treat http and https as links
        let shortDescription = description.split("\n").slice(0, 3).join("<br>")
        let fullDescription = description.split("\n").join("<br>")

        // descriptions
        code = code.replace(
            "video_short_description",
            yt2009utils.markupDescription(shortDescription)
        )
        code = code.replace(
            "video_full_description",
            yt2009utils.markupDescription(fullDescription)
        )

        // hide signin buttons if logged in
        if(code.includes("Sign Out") || code.includes("lang_signout")) {
            code = code.split("yt2009-signin-hide").join("hid")
        }

        // comments
        let comments_html = ""
        let unfilteredCommentCount = 0;
        let topLike = 0;
        if(data.comments
        && !flags.includes("comments_remove_future")) {

            // hide show more comments if less than 21
            // (20 standard + continuation token)
            if(data.comments.length !== 21) {
                code = code.replace("yt2009_hook_more_comments", "hid")
            }

            // top like count
            let likeCounts = []
            data.comments.forEach(c => {
                if(c.likes) {
                    likeCounts.push(c.likes)
                }
            })
            likeCounts = likeCounts.sort((a, b) => b - a)
            topLike = likeCounts[0]


            // add html
            let commentTimes = []
            data.comments.forEach(comment => {
                if(comment.continuation || !comment.time) return;
                commentTimes.push(new Date(
                    yt2009utils.relativeToAbsoluteApprox(comment.time)
                ).getTime())
            })
            commentTimes = commentTimes.sort((a, b) => b - a)
            // find the difference between oldest and newest comment
            // and scale it down to a smaller difference
            let i = 0;
            let displayDates = yt2009utils.fakeDatesScale(commentTimes)

            data.comments.forEach(comment => {
                if(comment.continuation) {
                    continuationFound = true;
                    code = code.replace(
                        "yt2009_comments_continuation_token",
                        comment.continuation
                    )
                    return;
                }
                // flags
                let commentTime = comment.time;
                if(flags.includes("fake_dates")) {
                    commentTime = displayDates[i]
                    i++
                }
                let commentPoster = comment.authorName || "";
                if(flags.includes("remove_username_space")) {
                    try {
                        commentPoster = commentPoster.split(" ").join("")
                    }
                    catch(error) {
                        commentPoster = "deleted"
                    }
                }

                if(flags.includes("username_asciify")) {
                    commentPoster = yt2009utils.asciify(commentPoster)
                }
    
                if(comment.authorUrl.includes("/user/")) {
                    commentPoster = comment.authorUrl.split("/user/")[1]
                }

                let commentContent = comment.content
    
                let future = constants.comments_remove_future_phrases
                let futurePass = true;
                if(flags.includes("comments_remove_future")) {
                    commentContent = commentContent.replace(/\p{Other_Symbol}/gui, "") 
                    // whatever THIS character is, displays sometimes on ff
                    commentContent = commentContent.split("🏻").join("")
                    future.forEach(futureWord => {
                        if(commentContent.toLowerCase().includes(futureWord)) {
                            futurePass = false;
                        }
                    })
                    if(commentContent.trim().length == 0
                    || commentContent.trim().length > 500) {
                        futurePass = false;
                    }
                }
    
                if(!futurePass) return;
                // sam html
                commentTime = yt2009utils.relativeTimeCreate(
                    commentTime, yt2009languages.get_language(req)
                )
                // like count clarif
                let presentedLikeCount = Math.floor((comment.likes / topLike) * 10)
                if(topLike < 10) {
                    presentedLikeCount = comment.likes
                }

                if(isNaN(presentedLikeCount)) {presentedLikeCount = 0;}

                // comment id
                let id = commentId(comment.authorUrl, comment.content)

                let customRating = 0;
                let customData = hasComment(data.id, id)
                if(customData) {
                    presentedLikeCount += customData.rating
                    let token = yt2009utils.get_used_token(req)
                    token == "" ? token = "dev" : ""
                    if(customData.ratingSources[token]) {
                        customRating = customData.ratingSources[token]
                    }
                }

                if(!commentContent) return;

                let commentHTML = yt2009templates.videoComment(
                    comment.authorUrl,
                    commentPoster,
                    commentTime,
                    commentContent,
                    flags,
                    true,
                    presentedLikeCount,
                    id
                )

                if(customRating == 1) {
                    commentHTML = commentHTML.replace(
                        "watch-comment-up-hover",
                        "watch-comment-up-on"
                    )
                } else if(customRating == -1) {
                    commentHTML = commentHTML.replace(
                        "watch-comment-down-hover",
                        "watch-comment-down-on"
                    )
                }

                comments_html += commentHTML
    
                totalCommentCount++
                
            })
            code = code.replace(`yt2009_comment_count`, totalCommentCount)
            code = code.replace(`<!--yt2009_add_comments-->`, comments_html)
        } else if(flags.includes("comments_remove_future")) {
            requiredCallbacks++
            this.get_old_comments(data, (comments) => {
                let index = 0;
                comments.forEach(comment => {
                    if(comment.continuation
                    || comment.pinned
                    || comment.content.trim().length == 0
                    || comment.content == "<br>") return;
                    // flags
                    totalCommentCount++
                    let commentTime = comment.time;
                    if(flags.includes("fake_dates")) {
                        commentTime = yt2009utils.fakeDateSmall(index)
                    }

                    let id = commentId(comment.authorUrl, comment.content)

                    let likes = comment.likes > 10
                              ? Math.floor(Math.random() * 15) : comment.likes
                    let customRating = 0;
                    let customData = hasComment(data.id, id)
                    if(customData) {
                        likes += customData.rating
                        let token = yt2009utils.get_used_token(req)
                        token == "" ? token = "dev" : ""
                        if(customData.ratingSources[token]) {
                            customRating = customData.ratingSources[token]
                        }
                    }

                    // add html
                    let commentHTML = yt2009templates.videoComment(
                        comment.authorUrl,
                        yt2009utils.asciify(comment.authorName),
                        commentTime,
                        comment.content,
                        flags,
                        true,
                        likes,
                        id
                    )

                    if(customRating == 1) {
                        commentHTML = commentHTML.replace(
                            "watch-comment-up-hover",
                            "watch-comment-up-on"
                        )
                    } else if(customRating == -1) {
                        commentHTML = commentHTML.replace(
                            "watch-comment-down-hover",
                            "watch-comment-down-on"
                        )
                    }

                    comments_html += commentHTML
                    index++
                })
                if(data.comments.length !== 21) {
                    code = code.replace("yt2009_hook_more_comments", "hid")
                }
                code = code.replace(`yt2009_comment_count`, totalCommentCount)
                code = code.replace(`<!--yt2009_add_comments-->`, comments_html)
                callbacksMade++
                if(requiredCallbacks == callbacksMade) {
                    render_endscreen();
                    fillFlashIfNeeded();
                    genRelay();
                    callback(code)
                }
            })
        } else {
            code = code.replace("yt2009_hook_more_comments", "hid")
            code = code.replace(`yt2009_comment_count`, totalCommentCount)
            code = code.replace(`<!--yt2009_add_comments-->`, comments_html)
        }
        
        // add related videos
        let related_html = ""
        let related_index = 0;
        data.related.forEach(video => {
            if(yt2009utils.time_to_seconds(video.length) >= 1800) return;

            // flagi
            let uploader = video.creatorName
            if(flags.includes("remove_username_space")) {
                uploader = uploader.split(" ").join("")
            }

            if(flags.includes("username_asciify")) {
                uploader = yt2009utils.asciify(uploader)
            }

            let relatedViewCount = parseInt(video.views.replace(/[^0-9]/g, ""))
            relatedViewCount = "lang_views_prefix"
                             + yt2009utils.countBreakup(relatedViewCount)
                             + "lang_views_suffix"
            if(flags.includes("realistic_view_count")
            && parseInt(relatedViewCount.replace(/[^0-9]/g, "")) >= 1000) {
                relatedViewCount = "lang_views_prefix" + 
                yt2009utils.countBreakup(
                    Math.floor(
                        parseInt(relatedViewCount.replace(/[^0-9]/g, "")) / 90
                    )
                ) + "lang_views_suffix"
            }

            // sam html
            if(!flags.includes("exp_related")) {
                related_html += yt2009templates.relatedVideo(
                    video.id,
                    video.title,
                    protocol,
                    video.length,
                    relatedViewCount,
                    video.creatorUrl,
                    uploader,
                    flags
                )

                endscreen_queue.push({
                    "title": video.title,
                    "id": video.id,
                    "length": yt2009utils.time_to_seconds(video.length),
                    "url": encodeURIComponent(
                        `http://${config.ip}:${config.port}/watch?v=${video.id}&f=1`
                    ),
                    "views": relatedViewCount,
                    "creatorUrl": video.creatorUrl,
                    "creatorName": uploader
                })
            }

            
        })


        code = code.replace(`<!--yt2009_add_marking_related-->`, related_html)

        // playlist if used
        if(playlistId) {
            let index = 0;
            let playlistsHTML = yt2009templates.watchpagePlaylistPanelEntry
            
            try {
                yt2009playlists.parsePlaylist(
                    playlistId, () => {}
                ).videos.forEach(video => {
                    let playlistVideoHTML = yt2009templates.relatedVideo(
                        video.id,
                        video.title,
                        protocol,
                        "",
                        "",
                        video.uploaderUrl,
                        video.uploaderName,
                        flags,
                        playlistId
                    )
                    if(data.id == video.id) {
                        playlistVideoHTML = playlistVideoHTML.replace(
                            `"video-entry"`,
                            `"video-entry watch-ppv-vid"`
                        )
                    }
                    playlistsHTML += playlistVideoHTML
                    index++;
                })
            }
            catch(error) {
                playlistsHTML += `<div class="hid yt2009_marking_fetch_playlist_client"></div>`
            }

            playlistsHTML += `
                    </div>
                </div>
                <div class="clearL"></div>
            </div>`

            code = code.replace(`<!--yt2009_playlist_panel-->`, playlistsHTML)
        }

        // endscreen w <video>
        function render_endscreen() {
            if(useFlash) return;
            let endscreen_version = 2;
            let endscreen_html = yt2009templates.html5Endscreen

            let endscreen_section_index = 0;
            let endscreen_section_html = 
            `              <div class="endscreen-section" style="opacity: 1;">
            `
            endscreen_queue.forEach(video => {
                if(video.length >= 1800) return;
                endscreen_section_html += yt2009templates.endscreenVideo(
                    video.id,
                    protocol,
                    video.length,
                    video.title,
                    endscreen_version,
                    video.creatorUrl,
                    video.creatorName,
                    video.views,

                    yt2009ryd.readCache(video.id)
                    ? yt2009ryd.readCache(video.id).toString().substring(0, 1)
                    : "5",

                    flags
                )


                endscreen_section_index++;
                if(endscreen_section_index % 2 == 0) {
                    endscreen_section_html += `
                        </div>`
                    endscreen_html += endscreen_section_html;
                    endscreen_section_html = `    
                        <div class="endscreen-section hid"  style="opacity: 0;">
            `
                }
            })

            if(endscreen_version !== 1) {
                // alt endscreen css
                // the endsceen currently seen on the html5 player was initially
                // a "alt" endscreen, the primary one being the 2008 endscreen.
                // may be enabled by setting endscreen_version to 1
                // but i haven't touched it since aug 2022 so no promises
                endscreen_html += `
                
                <style>
                /*endscreen-alt css*/

                .endscreen-video, .gr {
                    color: #4d4b46 !important;
                }

                .endscreen-video {
                    background-image: url(/player-imgs/darker-bg.png);
                    background-size: contain;
                    -moz-background-size: contain;
                }
                </style>
                `
            }
            code = code.replace(
                `<!--yt2009_endscreen_html_insert-->`,
                endscreen_html
            )
        }

        // fmode endscreen
        function render_endscreen_f() {
            if(!flash_url.includes("/watch.swf")) return "";
            let rv_url = ""
            let related_index = 0;
            endscreen_queue.forEach(video => {
                if(related_index <= 7
                && encodeURIComponent(rv_url).length < 1700) {
                    let thumbUrl = "hqdefault.jpg"
                    if(flags.includes("autogen_thumbnails")) {
                        thumbUrl = "hq1.jpg"
                    }
                    rv_url += `&rv.${related_index}.title=${
                        encodeURIComponent(video.title)
                    }`
                    rv_url += `&rv.${related_index}.thumbnailUrl=${
                        encodeURIComponent(
                            `http://i.ytimg.com/vi/${video.id}/${thumbUrl}`
                        )
                    }`
                    rv_url += `&rv.${related_index}.length_seconds=${
                        video.length
                    }`
                    rv_url += `&rv.${related_index}.url=${video.url}`
                    rv_url += `&rv.${related_index}.view_count=${
                        video.views.replace(/[^0-9]/g, "")
                    }`
                    rv_url += `&rv.${related_index}.rating=5`
                    rv_url += `&rv.${related_index}.id=${video.id}`
                    rv_url += `&rv.${related_index}.author=${
                        video.creatorName
                    }`
                    related_index++;
                }
            })

            return rv_url;
        }
        


        // tags
        let tags_html = ""
        data.tags.forEach(tag => {
            tags_html += `<a href="#" class="hLink" style="margin-right: 5px;">${
                tag.toLowerCase()
            }</a>\n                                   `
        })
        code = code.replace("video_tags_html", tags_html)
        
        // category
        const category_numbers = {
            "Autos & Vehicles": 2,
            "Comedy": "35",
            "Education": "34",
            "Entertainment": "24",
            "Film & Animation": "1",
            "Gaming": "33",
            "Howto & Style": "26",
            "Music": "31",
            "News & Politics": "32",
            "Nonprofits & Activism": "29",
            "People & Blogs": "22",
            "Pets & Animals": "15",
            "Science & Technology": "28",
            "Sports": "30",
            "Travel & Events": "19"
        }
        code = code.replace(`category_name`, data.category)
        code = code.replace(
            `category_link`,
            "/videos?c=" + (category_numbers[data.category] || 0)
        )

        // sub button
        let subscribed = false;
        subscribeList.forEach(sub => {
            if(data.author_url == sub.url) {
                subscribed = true;
            }
        })

        if(subscribed) {
            // show unsubscribe
            code = code.replace(
                `data-yt2009-unsubscribe-button`,
                ""
            )
            code = code.replace(
                `data-yt2009-subscribe-button`,
                `class="hid"`
            )
        } else {
            // show subscribe
            code = code.replace(
                `data-yt2009-unsubscribe-button`,
                `class="hid"`
            )
            code = code.replace(
                `data-yt2009-subscribe-button`,
                ``
            )
        }

        // autoplay
        if(!useFlash) {
            code = code.replace(`<!--yt2009_hook_autoplay_flag-->`, `
            
            <script>
                // autoplay
                
                document.querySelector("video").addEventListener("canplay", function() {
                    setTimeout(function() {
                        document.querySelector("video").play()
                    }, 100)
                }, false)
                if(document.querySelector("video").readyState >= 3) {
                    document.querySelector("video").play();
                }
            </script>`)
        }

        // exp_ryd / use_ryd / merged
        let useRydRating = "4.5"
        let endRating = "4.5"
        requiredCallbacks++;
        yt2009ryd.fetch(data.id, (rating) => {
            if(!rating.toString().includes(".5")) {
                rating = rating.toString() + ".0"
            }
            useRydRating = rating;

            let userRating = yt2009userratings.read(data.id, true)
            let avgRating = yt2009utils.custom_rating_round(
                (userRating + parseFloat(useRydRating)) / 2
            )
            if(userRating == 0) {
                avgRating = useRydRating;
            }
            endRating = avgRating
            if(!avgRating.toString().endsWith(".5")
            && !avgRating.toString().endsWith(".0")) {
                avgRating = avgRating.toString() + ".0"
            }
            code = code.replace(
                yt2009templates.oneLineRating("4.5"),
                yt2009templates.oneLineRating(avgRating)
            )
            
            if(rating == "0.0") {
                // if no actual ratings, change onsite rating number to 0
                let ratingCount = 
                code.split(
                    `id="defaultRatingMessage"><span class="smallText">`
                    )[1]
                    .split(` lang_ratings_suffix`)[0]
                code = code.replace(
                    `id="defaultRatingMessage"><span class="smallText">${ratingCount}`,
                    `id="defaultRatingMessage"><span class="smallText">0`
                )

            }

            useRydRating = parseFloat(rating)

            // fmode rating, more accurate to an actual page (when logged in)
            if(useFlash) {
                code = code.replace(
                    yt2009templates.oneLineRating(avgRating),
                    yt2009templates.separatedRating(avgRating)
                )
                code = code.replace(
                    `//yt2009-rating`,
                    `var fullRating = ${avgRating};`
                )
            }

            callbacksMade++;
            if(requiredCallbacks == callbacksMade) {
                render_endscreen();
                fillFlashIfNeeded();
                genRelay();
                callback(code)
            }
        })

        // sharing
        let shareBehaviorServices = constants.shareBehaviorServices
        
        function createShareHTML(sites) {
            let shareHTML = `
            <div id="watch-sharetab-options">
                <div id="more-options"><a href="#" class="hLink" rel="nofollow">(more share options)</a></div>
                <div style="display: none;" id="fewer-options"><a href="#" class="hLink" rel="nofollow">fewer share options</a></div>
            </div>
            <div id="watch-share-services-collapsed">
            `
            // 3 first
            let collapsed_index = 0;
            for(let site in sites) {
                if(collapsed_index <= 3) {
                    let link = sites[site].replace(
                        `%title%`,
                        encodeURIComponent(data.title)
                    ).split(`%id%`).join(data.id)
                    .replace(
                        `%url%`,
                        `http://www.youtube.com/watch?v=${data.id}`
                    )
                    shareHTML += `
                    <div class="watch-recent-shares-div">
                        <div class="watch-recent-share">
                            <a href="${link}" target="_blank"><span>${site}</span></a>
                        </div>
                    </div>`

                    collapsed_index++;
                }
                
            }
            shareHTML += `
                <div class="clear"></div>
			</div>
            <div id="watch-share-services-expanded" style="display: none;">
            `

            // rest
            for(let site in sites) {
                let link = sites[site].replace(
                    `%title%`, 
                    encodeURIComponent(data.title)
                ).replace(`%id%`, data.id)
                .replace(`%url%`, `http://www.youtube.com/watch?v=${data.id}`)
                shareHTML += `
                <div class="watch-recent-shares-div">
					<div class="watch-recent-share">
						<a href="${link}" target="_blank"><span>${site}</span></a>
					</div>
				</div>`
            }

            shareHTML += `
                <div class="clear"></div>
			</div>
            `

            return shareHTML;
        }
        if(flags.includes("share_behavior")) {
            if(shareBehaviorServices[
                flags.split("share_behavior")[1].split(":")[0]
            ]) {
                code = code.replace(
                    `<!--yt2009_share_insert-->`,
                    createShareHTML(shareBehaviorServices[
                        flags.split("share_behavior")[1].split(":")[0]
                    ])
                )
            } else {
                code = code.replace(
                    `<!--yt2009_share_insert-->`,
                    `[yt2009] value for share_behavior not recognized`
                )
            }
            
        } else {
            code = code.replace(
                `<!--yt2009_share_insert-->`,
                createShareHTML(shareBehaviorServices.default)
            )
        }

        function fillFlashIfNeeded() {
            // flash
            if(useFlash) {
                flash_url += render_endscreen_f()
                if(new Date().getMonth() == 3
                && new Date().getDate() == 1
                && !req.headers.cookie.includes("unflip=1")) {
                    if(req.headers["user-agent"].includes("MSIE")) {
                        code = code.replace(
                            `<!--yt2009_f_apr1-->`,
                            `<link rel="stylesheet" href="/assets/site-assets/apr1.css">`
                        )
                        flash_url += "&flip=1"
                    }
                }
                if((req.headers["cookie"] || "").includes("f_h264")
                && flash_url.includes("/watch.swf")) {
                    // create format maps and urls for the 2009 player
                    // 22 - hd720
                    // 35 - "large" - hq - 480p
                    // 5 - standard quality, other numbers may have worked too
                    let fmtMap = ""
                    let fmtUrls = ""
                    if(qualityList.includes("720p")) {
                        fmtMap += "22/2000000/9/0/115"
                        fmtUrls += `22|http://${config.ip}:${config.port}/exp_hd?video_id=${data.id}`
                    } else if(qualityList.includes("480p")) {
                        fmtMap += `35/0/9/0/115`
                        fmtUrls += `35|http://${config.ip}:${config.port}/get_480?video_id=${data.id}`
                    }
                    if(fmtMap.length > 0) {
                        fmtMap += ","
                        fmtUrls += ","
                    }
                    fmtMap += "5/0/7/0/0"
                    fmtUrls += `5|http://${config.ip}:${config.port}/assets/${data.id}.mp4`
                    flash_url += "&fmt_map=" + encodeURIComponent(fmtMap)
                    flash_url += "&fmt_url_map=" + encodeURIComponent(fmtUrls)
                }
                
                flash_url += `&cc_module=http%3A%2F%2F${config.ip}%3A${config.port}%2Fsubtitle-module.swf`

                // always_captions flash
                if(flags.includes("always_captions")) {
                    flash_url += "&cc_load_policy=1"
                } else {
                    flash_url += "&cc_load_policy=2"
                }

                flash_url += "&enablejsapi=1"

                if(req.query.resetcache) {
                    flash_url += "&resetcache=1"
                }
                
                code = code.replace(
                    `<!--yt2009_f-->`,
                    yt2009templates.flashObject(flash_url)
                )
                code = code.replace(
                    `<!--yt2009_style_fixes_f-->`,
                    `<link rel="stylesheet" href="/assets/site-assets/f.css">`
                )
            }
        }
        
        // no_controls_fade
        if(flags.includes("no_controls_fade") && !useFlash) {
            code = code.replace(
                `//yt2009-no-controls-fade`,
                `
            fadeControlsEnable = false;
            var s = document.createElement("style")
            s.innerHTML = "video {\\
                height: calc(100% - 25px) !important;\\
            }#watch-player-div {\\
                background: black !important;\\
            }"
            document.body.appendChild(s)`
            )
        }

        // exp_hq
        if(!useFlash
        && (qualityList.includes("720p")
        || qualityList.includes("480p"))) {
            let use720p = qualityList.includes("720p")
            code = code.replace(
                `<!--yt2009_style_hq_button-->`,
                yt2009templates.playerCssHDBtn   
            )
            code = code.replace(
                `//yt2009-exp-hq-btn`,
                yt2009templates.playerHDBtnJS(data.id, use720p)
            )

            // 720p
            if(use720p) {
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq hd"></span>`)
            } else {
                // 480p
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq"></span>`)
            }
        }

        // annotation_redirect
        if(flags.includes("annotation_redirect") && !useFlash) {
            code = code.replace(
                `//yt2009-annotation-redirect`,
                `annotationsRedirect = true;`
            )
        }

        // shows tab
        if(flags.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }
        
        // always_annotations
        if(flags.includes("always_annotations") && !useFlash) {
            code = code.replace(
                "//yt2009-always-annotations",
                "annotationsMain();"
            )
        }

        // always_captions
        if(flags.includes("always_captions") && !useFlash) {
            code = code.replace(
                "//yt2009-always-captions",
                "captionsMain();"
            )
        }

        // turn_down_lights
        if(flags.includes("turn_down_lights")) {
            let posExclude = (
                !userAgent.includes("MSIE")
                && !userAgent.includes("Chrome/")
                && !useFlash
            )
            code = code.replace(
                `<!--yt2009_turn_down_lights-->`,
                yt2009templates.watchpageTurn(posExclude)
            )

        }

        // exp_related
        if(flags.includes("exp_related")) {
            requiredCallbacks++;
            let exp_related_html = ""
            let lookup_keyword = ""
            // tags
            data.tags.forEach(tag => {
                if(lookup_keyword.length < 9) {
                    lookup_keyword += `${tag.toLowerCase()} `
                }
            })
            // or the first word from the title
            if(lookup_keyword.length < 9) {
                lookup_keyword = data.title.split(" ")[0]
            }
            
            // get
            yt2009search.related_from_keywords(
                lookup_keyword, data.id, flags, (html, rawData) => {
                    rawData.forEach(video => {
                        endscreen_queue.push({
                            "title": video.title,
                            "id": video.id,
                            "length": yt2009utils.time_to_seconds(video.length),
                            "url": encodeURIComponent(
                                `http://${config.ip}:${config.port}/watch?v=${video.id}&f=1`
                            ),
                            "views": video.views,
                            "creatorUrl": video.creatorUrl,
                            "creatorName": video.creatorName
                        })
                    })
                    exp_related_html += html;

                    // add old defualt "related" videos at the end
                    data.related.forEach(video => {
                        if(parseInt(video.uploaded.split(" ")[0]) >= 12
                        && video.uploaded.includes("years")
                        && !html.includes(`data-id="${video.id}"`)) {
                            // only 12 years or older & no repeats

                            // handle flag
                            // author name flags
                            let authorName = video.creatorName;
                            if(flags.includes("remove_username_space")) {
                                authorName = authorName.split(" ").join("")
                            }
                            if(flags.includes("username_asciify")) {
                                authorName = yt2009utils.asciify(authorName)
                            }
                            if(video.creatorUrl.includes("/user/")) {
                                authorName = video.creatorUrl.split("/user/")[1]
                                                            .split("?")[0]
                            }
            
                            // view count flags
                            let viewCount = video.views;
                            viewCount = parseInt(viewCount.replace(/[^0-9]/g, ""))
                            if(flags.includes("realistic_view_count")
                            && viewCount >= 100000) {
                                viewCount = Math.floor(viewCount / 90)
                            }
                            viewCount = "lang_views_prefix"
                                        + yt2009utils.countBreakup(viewCount)
                                        + "lang_views_suffix"

                            endscreen_queue.push({
                                "title": video.title,
                                "id": video.id,
                                "length": yt2009utils.time_to_seconds(video.length),
                                "url": encodeURIComponent(`http://${config.ip}:${config.port}/watch?v=${video.id}&f=1`),
                                "views": viewCount,
                                "creatorUrl": video.creatorUrl,
                                "creatorName": authorName
                            })

                            exp_related_html += yt2009templates.relatedVideo(
                                video.id,
                                video.title,
                                req.protocol,
                                video.length,
                                viewCount,
                                video.creatorUrl,
                                authorName,
                                flags
                            )
                        }
                    })

                    code = code.replace(
                        `<!--yt2009_exp_related_marking-->`,
                        exp_related_html
                    )
                    callbacksMade++;
                    if(requiredCallbacks == callbacksMade) {
                        render_endscreen();
                        fillFlashIfNeeded();
                        genRelay();
                        callback(code)
                    }
                },
                req.protocol
            )
        }

        // old_author_avatar
        if(flags.includes("author_old_avatar")
        && data.author_url.includes("channel/UC")) {
            let id = data.author_url.split("channel/UC")[1]
            let avatarUrl = `https://i3.ytimg.com/u/${id}/channel_icon.jpg`
            let fname = __dirname + "/../assets/" + id + "_old_avatar.jpg"
            let oldChannelIconPath = "/assets/" + id + "_old_avatar.jpg"

            // callback at the top
            function markAsDone() {
                callbacksMade++;
                if(requiredCallbacks <= callbacksMade) {
                    render_endscreen()
                    fillFlashIfNeeded();
                    genRelay();
                    callback(code)
                }
            }
            // exists and not there = set default
            if(fs.existsSync(fname)
            && fs.statSync(fname).size < 10) {
                setChannelIcon()
                markAsDone()
            }
            // exists and there
            else if(fs.existsSync(fname)
            && fs.statSync(fname).size > 10) {
                channelIcon = oldChannelIconPath
                setChannelIcon()
                markAsDone()
            }
            // doesn't exist
            else {
                fetch(avatarUrl, {
                    "headers": constants.headers
                }).then(r => {
                    if(r.status !== 404) {
                        r.buffer().then(buffer => {
                            fs.writeFileSync(fname, buffer)
                            channelIcon = oldChannelIconPath
                            setChannelIcon()
                            markAsDone()
                        })
                    } else {
                        // no old icon, use current
                        fs.writeFileSync(fname, "")
                        setChannelIcon()
                        markAsDone()
                    }
                })
            }
        } else if(flags.includes("author_old_avatar")
        && !data.author_url.includes("channel/UC")) {
            setChannelIcon()
            callbacksMade++;
            if(requiredCallbacks <= callbacksMade) {
                render_endscreen()
                fillFlashIfNeeded();
                genRelay();
                callback(code)
            }
        }

        // relay
        function genRelay() {
            if(req.headers.cookie.includes("relay_key")) {
                let relayKey = req.headers.cookie
                                        .split("relay_key=")[1]
                                        .split(";")[0]
                let relayPort = "6547"
                if(req.headers.cookie.includes("relay_port")) {
                    relayPort = req.headers.cookie
                                            .split("relay_port=")[1]
                                            .split(";")[0]
                }
    
                code = code.replace(
                    `<!--yt2009_relay_comment_form-->`,
                    yt2009templates.videoCommentPost(
                        true,
                        "http://127.0.0.1:" + relayPort,
                        data.id,
                        relayKey
                    )
                )
            }
        }

        // careful what yall say next time
        if(req.query.flyingelephants == 1) {
            code = code.replace(
                `<!--yt2009_fe-->`,
                `<script src="/assets/site-assets/fe.js"></script>`
            )
        }

        // channel banners
        this.getBanner(data, flags, (banner) => {
            let channelUrl = data.author_id
                           ? "/channel/" + data.author_id
                           : data.author_url
            if(banner) {
                code = code.replace(
                    `<!--yt2009_bannercard-->`,
                    yt2009templates.watchBanner(
                        channelUrl, banner
                    )
                )
            }
            callbacksMade++;
            if(requiredCallbacks <= callbacksMade) {
                render_endscreen()
                fillFlashIfNeeded();
                genRelay();
                try {
                    callback(code)
                }
                catch(error) {}
            }
        })
        

        if(requiredCallbacks == 0) {
            render_endscreen()
            fillFlashIfNeeded();
            genRelay();
            callback(code)
        }
        
        //return code;
    },



    "request_continuation": function(token, id, comment_flags, callback) {
        // continuation na komentarze
        if(!token) {
            callback([])
            return;
        }
        innertube_context = this.get_innertube_context()
        if(continuations_cache[token]) {
            callback(continuations_cache[token])
        } else {
            fetch("https://www.youtube.com/youtubei/v1/next?key=" + api_key, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "same-origin",
                    "sec-fetch-site": "same-origin",
                    "sec-gpc": "1",
                    "x-goog-eom-visitor-id": innertube_context.visitorData,
                    "x-youtube-bootstrap-logged-in": "false",
                    "x-youtube-client-name": "1",
                    "x-youtube-client-version": innertube_context.clientVersion,
                    "User-Agent": constants.headers["user-agent"]
                },
                "referrer": "https://www.youtube.com/watch?v=" + id,
                "referrerPolicy": "origin-when-cross-origin",
                "body": JSON.stringify({
                    "context": innertube_context,
                    "continuation": token
                }),
                "method": "POST",
                "mode": "cors"
            }).then(r => {
                r.json().then(response => {
                    callback(
                        yt2009utils.comments_parser(response, comment_flags)
                    )
                    continuations_cache[token] = JSON.parse(JSON.stringify(
                        yt2009utils.comments_parser(response, comment_flags)
                    ))
                })
            })
        }
    },

    "comment_paging": function(id, page, flags, callback) {
        if(!comment_page_cache[id]) {
            comment_page_cache[id] = {}
        }
        page = page + 1;

        let commentDates = Date.now() - (page * 1000 * 60 * 60 * 24 * 7)
        if(this.get_cache_video(id).upload) {
            let fourMonthsUnix = 1000 * 60 * 60 * 24 * 31 * 4
            let uploadDate = new Date(this.get_cache_video(id).upload)
            if(uploadDate.getFullYear() >= 2011) {
                commentDates = uploadDate.getTime() + ((page + 5) * fourMonthsUnix)
            } else {
                commentDates = new Date("2012").getTime()
                               + ((page + 5) * fourMonthsUnix)
            }
        }

        this.get_old_comments(
            {"id": id, "upload": "2011"},
            (comments => {
                callback(comments)
            }), commentDates
        )
    },

    "get_video_description": function(id) {
        let tr = ""
        if(cache.read()[id]) {
            tr = cache.read()[id].description;
        }

        return tr;
    },



    "get_video_comments": function(id, callback, flags) {
        if(cache.read()[id]) {
            callback(cache.read()[id].comments);
        } else {
            const pb = require("./proto/cmts_pb")
            let commentRequest = new pb.comments()

            let videoMsg = new pb.comments.video()
            videoMsg.setVideoid(id)
            commentRequest.addVideomsg(videoMsg)

            commentRequest.setType(6)

            let commentsReqParamsMain = new pb.comments.commentsReq()
            commentsReqParamsMain.setSectiontype("comments-section")
            let crpChild = new pb.comments.commentsReq.commentsData()
            crpChild.setVideoid(id)
            crpChild.setH(0)
            crpChild.setD(2)
            commentsReqParamsMain.addCommentsdatareq(crpChild)
            commentRequest.addCommentsreqmsg(commentsReqParamsMain)

            let token = encodeURIComponent(Buffer.from(
                commentRequest.serializeBinary()
            ).toString("base64"))
            
            this.request_continuation(token, id, (flags || ""),
                (comment_data) => {
                    callback(comment_data)
                }
            )
        }
    },



    "get_related_videos": function(id, callback, source, ignoreDefaultRelated) {
        if(cache.read()[id] && !ignoreDefaultRelated) {
            callback(cache.read()[id].related);
        } else if(saved_related_videos[id]) {
            callback(saved_related_videos[id])
        } else {
            this.innertube_get_data(id, (data) => {
                // related videos
                let relatedParsed = []
                let related = []
                
                // prioritize exp_related
                let lookup_keyword = ""
                // tags
                data.videoDetails.keywords.forEach(tag => {
                    if(lookup_keyword.length < 9) {
                        lookup_keyword += `${tag.toLowerCase()} `
                    }
                })
                // or the first word from the title if not enough
                if(lookup_keyword.length < 9) {
                    lookup_keyword = data.videoDetails.title.split(" ")[0]
                }
                
                // search
                yt2009search.related_from_keywords(
                    lookup_keyword, data.id, "realistic_view_count", (html, rawData) => {
                        rawData.forEach(video => {
                            relatedParsed.push({
                                "title": video.title,
                                "id": video.id,
                                "views": video.views,
                                "length": yt2009utils.time_to_seconds(video.length || 0),
                                "creatorName": video.creatorName,
                                "creatorUrl": video.creatorUrl,
                                "uploaded": ""
                            })
                        })
                        if(relatedParsed.length >= 6) {
                            callback(relatedParsed)
                            saved_related_videos[id] = JSON.parse(JSON.stringify(
                                relatedParsed
                            ))
                        } else {
                            useDefaultRelated()
                        }
                    },
                    ""
                )

                function useDefaultRelated() {
                    // add default related videos if less than 6 were added
                    // by exp_related
                    if(relatedParsed.length < 6) {
                        try {
                            related = data.contents.twoColumnWatchNextResults
                                            .secondaryResults.secondaryResults
                                            .results
                                    || data.contents.twoColumnWatchNextResults
                                            .secondaryResults.secondaryResults
                                            .results[1].itemSectionRenderer
                                            .contents
                        }
                        catch(error) {}
                        related.forEach(video => {
                            if(!video.compactVideoRenderer) return;
        
                            video = video.compactVideoRenderer;
        
                            let creatorName = ""
                            let creatorUrl = ""
                            video.shortBylineText.runs.forEach(run => {
                                creatorName += run.text;
                                creatorUrl += run.navigationEndpoint
                                                .browseEndpoint.canonicalBaseUrl
                            })
                            try {
                                relatedParsed.push({
                                    "title": video.title.simpleText,
                                    "id": video.videoId,
                                    "views": video.viewCountText.simpleText,
                                    "length": video.lengthText.simpleText,
                                    "creatorName": creatorName,
                                    "creatorUrl": creatorUrl,
                                    "uploaded": video.publishedTimeText.simpleText
                                })
                            }
                            catch(error) {}
                        })
        
                        callback(relatedParsed)
                        saved_related_videos[id] = JSON.parse(JSON.stringify(
                            relatedParsed
                        ))
                    }
                }
                
            })
        }
    },

    "get_qualities": function(id, callback) {
        if(this.get_cache_video(id).qualities) {
            callback(this.get_cache_video(id).qualities)
        } else {
            callback([])
        }
    },

    "featured": function() {
        return featured_videos;
    },


    "videos_page": function() {
        return videos_page;
    },


    "get_innertube_context": function() {
        if(JSON.stringify(innertube_context) == "{}") {
            return constants.cached_innertube_context;
        } else {
            return innertube_context;
        }
    },

    "get_api_key": function() {
        if(!api_key) {
            return "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
        } else {
            return api_key;
        }
    },

    "get_cache_video": function(id) {
        return cache.read()[id] || {}
    },

    "bulk_get_videos": function(ids, callback) {
        let processedVideos = 0;

        let videos = JSON.parse(JSON.stringify(ids))
        videos.forEach(video => {
            this.fetch_video_data(video, () => {
                processedVideos++;
                if(processedVideos >= ids.length) {
                    callback()
                }
            }, "", "", false, false, true)
        })

        if(videos.length == 0) {
            callback();
        }
    },

    "receive_update_custom_comments": function(comments) {
        custom_comments = comments;
    },

    "custom_comments": function() {
        return JSON.parse(JSON.stringify(custom_comments));
    },

    "get_old_comments": function(data, callback, overrideDate) {
        // GET_OLD_COMMENTS
        // use protobuf to generate a continuation token going
        // as far back as any date we desire.
        // for yt2009, if a video is uploaded before 2011, we're going to 2012.
        // after 2011, 8 months after from the upload date.

        let pbDate = "2012"
        if(new Date(data.upload).getFullYear() >= 2011) {
            let eightMonthsUnix = 1000 * 60 * 60 * 24 * 31 * 8
            pbDate = new Date(data.upload).getTime() + eightMonthsUnix
        }

        if(overrideDate) {pbDate = overrideDate;}

        pbDate = Math.floor(new Date(pbDate).getTime() / 1000)
        if(oldCommentsCache[data.id + "/" + pbDate]) {
            callback(oldCommentsCache[data.id + "/" + pbDate])
            return;
        }

        // generate get_newest_first token
        const pb = require("./proto/newestFirstComments_pb")
        let msg = new pb.newestComments()

        let nestedmsg1 = new pb.newestComments.pb1()
        nestedmsg1.setConstant1(512)
        nestedmsg1.setConstant2(953267991)
        msg.addNestedmsg1(nestedmsg1)

        msg.setZeroint(0)

        let nestedmsg3 = new pb.newestComments.pb3()
        let nestedmsg4 = new pb.newestComments.pb3.pb4()
        nestedmsg4.setBefore(pbDate)
        nestedmsg3.addNestedmsg4(nestedmsg4)
        msg.addNestedmsg3(nestedmsg3)

        let get_newest_first_token = Buffer.from(
            msg.serializeBinary()
        ).toString("base64")
        .split("/").join("_")
        .split("+").join("-")
        .split("=").join("")

        // generate comment continuation token
        let id = data.id

        const cmts_pb = require("./proto/cmts_pb")
        let commentRequest = new cmts_pb.comments()
        let videoMsg = new cmts_pb.comments.video()
        videoMsg.setVideoid(id)
        commentRequest.addVideomsg(videoMsg)
        commentRequest.setType(6)

        let commentsReqParamsMain = new cmts_pb.comments.commentsReq()
        commentsReqParamsMain.setRankedstreams(
            "get_newest_first--" + get_newest_first_token
        )
        commentsReqParamsMain.setSectiontype("comments-section")

        let crpChild = new cmts_pb.comments.commentsReq.commentsData()
        crpChild.setVideoid(id)
        commentsReqParamsMain.addCommentsdatareq(crpChild)
        commentRequest.addCommentsreqmsg(commentsReqParamsMain)

        let continuationToken = encodeURIComponent(Buffer.from(
            commentRequest.serializeBinary()
        ).toString("base64"))

        this.request_continuation(
            continuationToken, id, "comments_remove_future", (comments) => {
                callback(comments)
                oldCommentsCache[id + "/" + pbDate] = comments
            }
        )
    },

    "commentId": function(name, text) {
        return crypto.createHash("sha1").update(`${name}${text}`)
                     .digest("hex").substring(0, 4)
    },

    "hasComment": function(video, commentId) {
        let temp = []
        if(custom_comments[video]) {
            temp = JSON.parse(JSON.stringify(custom_comments[video]))
                   .filter(s => s.id == commentId)
        }
        if(temp[0]) {
            return temp[0]
        } else {
            return false;
        }
    },

    "masterVidsReceive": function(videos) {
        videos.forEach(v => {
            featured_videos.forEach(vid => {
                if(vid.id == v.id) {
                    featured_videos = featured_videos.filter(s => s !== vid)
                }
            })
            featured_videos.unshift(v)
        })
        if(config.env == "dev") {
            console.log("received " + videos.length + " videos from master")
        }
    },

    "getBanner": function(data, flags, callback) {
        let dataSent = false;
        const yt2009channels = require("./yt2009channels")
        let bannerUrl = ""
        function defaultBanner() {
            let channelUrl = data.author_id
                           ? "/channel/" + data.author_id
                           : data.author_url
            let identif = "source:watch"
            let id = data.author_url.split("channel/UC")[1]
            let resetcache = fs.existsSync(
                __dirname + "/../assets/" + id + "_uniq_banner.jpg"
            )
            if(resetcache) {
                identif += "+resetcache"
            }
            yt2009channels.main({"path": channelUrl, 
            "headers": {"cookie": ""},
            "query": {"f": 0}}, 
            {"send": function(data) {
                if(data.newBanner) {
                    bannerUrl = "/assets/" + (data.newBanner || data.banner)
                    dataSent = true
                    callback(bannerUrl)
                }
            }}, identif, true)
            setTimeout(() => {
                if(!dataSent) {
                    callback(null)
                }
            }, 5000)
        }
        if(flags.includes("old_banners")
        && data.author_url.includes("channel/UC")) {
            let id = data.author_url.split("channel/UC")[1]
            let header = `https://i3.ytimg.com/u/${id}/watch_header.jpg`
            let fname = __dirname + "/../assets/" + id + "_header.jpg"
            if(!fs.existsSync(fname)) {
                fetch(header, {
                    "headers": constants.headers
                }).then(r => {
                    if(r.status !== 404) {
                        r.buffer().then(buffer => {
                            fs.writeFileSync(fname, buffer)
                            bannerUrl = "/assets/" + id + "_header.jpg";
                            dataSent = true
                            callback(bannerUrl)
                        })
                    } else {
                        defaultBanner()
                        fs.writeFileSync(fname, "")
                        return;
                    }  
                })
            } else if(fs.statSync(fname).size < 5) {
                defaultBanner()
            } else {
                bannerUrl = "/assets/" + id + "_header.jpg"
                dataSent = true
                callback(bannerUrl);
            }
        } else {
            defaultBanner()
        }
    }
}