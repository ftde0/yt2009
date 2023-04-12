const fs = require("fs");
const fetch = require("node-fetch");
const ytdl = require("ytdl-core")
const child_process = require("child_process");

const yt2009utils = require("./yt2009utils")
const yt2009playlists = require("./yt2009playlists")
const yt2009channelcache = require("./cache_dir/channel_cache");
const yt2009defaultavatarcache = require("./cache_dir/default_avatar_adapt_manager");
const yt2009qualitycache = require("./cache_dir/qualitylist_cache_manager")
const yt2009search = require("./yt2009search");
const yt2009ryd = require("./cache_dir/ryd_cache_manager");
const yt2009waybackwatch = require("./cache_dir/wayback_watchpage")
const yt2009templates = require("./yt2009templates");
const yt2009exports = require("./yt2009exports")
const constants = require("./yt2009constants.json")
const config = require("./config.json")

const watchpage_code = fs.readFileSync("../watch.html").toString();
const watchpage_feather = fs.readFileSync("../watch_feather.html").toString()
let cache = require("./cache_dir/video_cache_manager")
let hd_availability_cache = require("./cache_dir/hd_cache")
let yt2009userratings = require("./cache_dir/rating_cache_manager")
let innertube_context = {}
let api_key = ""
let featured_videos = require("./cache_dir/watched_now.json")
let videos_page = []
let continuations_cache = {}
let saved_related_videos = {}

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

    "fetch_video_data": function(id, callback, userAgent, userToken, useFlash, resetCache) {
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

            if(!fs.existsSync(`../assets/${id}.mp4`)) {
                yt2009utils.saveMp4(id, (path => {
                    callback(v)
                }))
            } else {
                callback(v)
            }
            
        } else if(cache.read()[id] && waitForOgv && !resetCache) {
            if(!fs.existsSync(`../assets/${id}.ogg`)) {
                // robimy ogg przed callbackiem
                child_process.exec(yt2009templates.createFffmpegOgg(id),
                (error, stdout, stderr) => {
                    let v = cache.read()[id]
                    if(config.env == "dev") {
                        console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
                    }
                    callback(v)
                })
            } else {
                // mamy ogg, możemy spokojnie callbackować
                let v = cache.read()[id]
                if(config.env == "dev") {
                    console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
                }
                callback(v)
            }
        } else {
            // w przeciwnym wypadku fetch
            if(config.env == "dev") {
                console.log(`(${userToken}) ${id} clean fetch ${Date.now()} ${resetCache ? "(cache reset)" : ""}`)
            }
            this.innertube_get_data(id, (videoData => {
                let fetchesCompleted = 0;

                let data = {}
                try {
                    data["title"] = videoData.videoDetails.title
                }
                catch(error) {
                    callback(false)
                    return;
                }

                if(videoData.videoDetails.isLive) {
                    callback(false)
                    return;
                }

                // podstawowe dane
                data["description"] = videoData.videoDetails.shortDescription
                data["viewCount"] = videoData.videoDetails.viewCount
                data["author_name"] = videoData.videoDetails.author;
                data["id"] = id;
                data["author_url"] = ""
                try {
                    data["author_url"] = videoData.contents
                                        .twoColumnWatchNextResults
                                        .results.results.contents[1]
                                        .videoSecondaryInfoRenderer.owner
                                        .videoOwnerRenderer.navigationEndpoint
                                        .browseEndpoint.canonicalBaseUrl
                }
                catch(error) {
                    data["author_url"] = "/channel/" + videoData.videoDetails.channelId
                }

                if(!data.author_url.startsWith("/c/")
                && !data.author_url.startsWith("/user/")
                && !data.author_url.startsWith("/channel")) {
                    // niefajny uploader url, fallbackujemy na /channel/id
                    data.author_url = "/channel/" + videoData.contents
                                                    .twoColumnWatchNextResults
                                                    .results.results
                                                    .contents[1]
                                                    .videoSecondaryInfoRenderer
                                                    .owner.videoOwnerRenderer
                                                    .navigationEndpoint
                                                    .browseEndpoint.browseId
                }

                // reszta podstawowych danych
                data["author_img"] = ""
                try {
                    data["author_img"] = videoData.contents
                                        .twoColumnWatchNextResults
                                        .results.results.contents[1]
                                        .videoSecondaryInfoRenderer
                                        .owner.videoOwnerRenderer
                                        .thumbnail.thumbnails[1].url
                }
                catch(error) {
                    data["author_img"] = "default"
                }
                data["upload"] = ""
                try {
                    data["upload"] = videoData.contents
                                    .twoColumnWatchNextResults
                                    .results.results.contents[0]
                                    .videoPrimaryInfoRenderer.dateText
                                    .simpleText
                }
                catch(error) {
                    data["upload"] = videoData.microformat
                                    .playerMicroformatRenderer.uploadDate
                }
                data["tags"] = videoData.videoDetails.keywords || [];
                data["related"] = []
                data["length"] = parseInt(videoData.microformat
                                        .playerMicroformatRenderer
                                        .lengthSeconds)
                data["category"] = videoData.microformat
                                    .playerMicroformatRenderer.category

                // related filmy

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

                // zapisujemy zdjęcie kanału

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
                        })
                    })
                } else {
                    fetchesCompleted++;
                }
                data.author_img = `/assets/${fname}.png`
            
                if(fetchesCompleted == 3) {
                    callback(data)
                }

                // fetch komentarzy

                try {
                    let sections = videoData.contents.twoColumnWatchNextResults
                                    .results.results.contents
                    sections.forEach(section => {
                        if(section.itemSectionRenderer) {
                            if(section.itemSectionRenderer.sectionIdentifier
                                !== "comment-item-section") return;
                            
                            let token = section.itemSectionRenderer.contents[0]
                                        .continuationItemRenderer
                                        .continuationEndpoint
                                        .continuationCommand.token
                            this.request_continuation(token, id, "",
                            (comment_data) => {
                                data["comments"] = comment_data
                                fetchesCompleted++;
                                if(fetchesCompleted == 3) {
                                    callback(data)
                                }
                            })
                        }
                    })
                }
                catch(error) {
                    data["comments"] = []
                    fetchesCompleted++;
                    if(fetchesCompleted == 3) {
                        callback(data)
                    }
                }
                
                // zapisujemy mp4/ogg

                if(!fs.existsSync(`../assets/${id}.mp4`) || config.fallbackMode) {
                    function on_mp4_save_finish(path) {
                        setTimeout(function() {
                            if(waitForOgv) {
                                child_process.exec(
                                    yt2009templates.createFffmpegOgg(id),
                                    (error, stdout, stderr) => {
                                        data["mp4"] = `/assets/${id}`
                                        fetchesCompleted++;
                                        if(fetchesCompleted == 3) {
                                            callback(data)
                                        }  
                                    }
                                )
                            } else {
                                if((path || "").includes("googlevideo")) {
                                    data["mp4"] = path;
                                } else {
                                    data["mp4"] = `/assets/${id}`
                                }
                                fetchesCompleted++;
                                if(fetchesCompleted == 3) {
                                    callback(data)
                                }
                                cache.write(id, data)
                                
                            }
                            
                        }, 250)
                    }

                    // ytdl
                    yt2009utils.saveMp4(id, (path => {
                        on_mp4_save_finish(path)
                    }))
                    /*let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)
                    writeStream.on("finish", () => {
                        on_mp4_save_finish();
                    })

                   
   
                    ytdl(`https://youtube.com/watch?v=${id}`, {
                        "quality": 18
                    })
                    .on("error", (error) => {
                         callback(false)
                         return;
                     })
                    .pipe(writeStream)*/
                    
                } else {
                    data["mp4"] = `/assets/${id}`
                    fetchesCompleted++;
                    if(fetchesCompleted == 3) {
                        callback(data)
                    }
                    cache.write(id, data);
                }
            }))
        }
    },



    "applyWatchpageHtml": function(data, req, callback, qualityList) {
        // dane zcallbackowane z fetch_video_data wrzucamy do odpowiednich miejsc w htmlu
        let code = watchpage_code;
        let requiredCallbacks = 1;
        let callbacksMade = 0;
        // kolejka endscreen
        let endscreen_queue = []

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

        code = require("./yt2009loginsimulate")(flags, code)

        // handling flag
        
        let author_name = data.author_name;
        if(flags.includes("remove_username_space")) {
            author_name = author_name.split(" ").join("")
        }

        if(flags.includes("username_asciify")) {
            author_name = yt2009utils.asciify(author_name)
        }

        if(flags.includes("author_old_names")
        && data.author_url.includes("/user/")) {
            author_name = data.author_url.split("/user/")[1]
        }

        let uploadJS = new Date(data.upload)

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
                            .toLowerCase().includes("subscribe")) {
                            code = code.replace(`yt2009-channel-link`,
                                            `original-yt2009-channel-link hid`)
                            code = code.replace(`<!--yt2009_author_wayback-->`, `
                            <a href="${data.author_url}"
                                class="hLink fn n contributor yt2009-channel-link">
                                ${waybackData.authorName}
                            </a>`)

                            // more from
                            if(code.split("More From: ").length >= 2) {
                                let currentUsername = code.
                                                    split("More From: ")[1].
                                                    split("\n")[0]
                                code = code.replace(
                                    `More From: ${currentUsername}`,
                                    `More From: ${waybackData.authorName}`
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
                            // add comment
                            commentsHTML += yt2009templates.videoComment(
                                comment.authorUrl,
                                comment.authorName,
                                commentTime,
                                comment.content,
                                flags,
                                true
                            )
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
                                            it's a dead link.-->`
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
                                parseInt(video.viewCount.replace(/[^0-9]/g, ""))
                            ) + "lang_views_suffix"
                            if(isNaN(
                                parseInt(video.viewCount.replace(/[^0-9]/g, "")))
                            ) {
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
                                video.uploaderName,
                                flags
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
        if(flags.includes("homepage_contribute") &&
            uploadJS.getFullYear() <= 2010) {
            // zakładka "videos being watched now" strona główna i /videos
            let go = true;
            featured_videos.slice(0, 23).forEach(vid => {
                if(vid.id == data.id) {
                    go = false;
                }
            })

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
                    "uploaderName": data.author_name,
                    "uploaderUrl": data.author_url,
                    "time": "",
                    "category": data.category
                })
                videos_page.unshift({
                    "id": data.id,
                    "title": data.title,
                    "views": yt2009utils.countBreakup(data.viewCount) + " views",
                    "uploaderName": data.author_name,
                    "uploaderUrl": data.author_url,
                    "time": "",
                    "category": data.category
                })
                fs.writeFileSync("./cache_dir/watched_now.json",
                                JSON.stringify(featured_videos))
            }
        }

        let uploadDate = data.upload
        if(flags.includes("fake_upload_dateadapt")
        && new Date(uploadDate).getTime() > 1272664800000) {
            uploadDate = yt2009utils.genAbsoluteFakeDate()
        } else if(flags.includes("fake_upload_date")
        && !flags.includes("fake_upload_dateadapt")) {
            uploadDate = yt2009utils.genAbsoluteFakeDate()
        }

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


        let channelIcon = data.author_img;
        if(flags.includes("default_avataradapt")) {
            if(yt2009defaultavatarcache.use(`../${channelIcon}`)) {
                channelIcon = "/assets/site-assets/default.png"
            }
        } else if(flags.includes("default_avatar")
            && !flags.includes("default_avataradapt")) {
            channelIcon = "/assets/site-assets/default.png"
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
        

        // "more from" section if we already have a channel fetched
        // .. or we just use always_morefrom
        let authorUrl = data.author_url
        if(authorUrl.startsWith("/")) {
            authorUrl = authorUrl.replace("/", "")
        }
        if(yt2009channelcache.read("main")[authorUrl]
        || flags.includes("always_morefrom")) {
            let moreFromCode = yt2009templates.morefromEntry(author_name)

            try {
                yt2009channelcache.read("main")[authorUrl]
                .videos.splice(0, 11).forEach(video => {
                    if(video.id == data.id) return;
                    let viewCount = parseInt(video.views.replace(/[^0-9]/g, ""))
                    if(flags.includes("realistic_view_count")
                    && viewCount >= 100000) {
                        viewCount = yt2009utils.countBreakup(
                            Math.floor(viewCount / 90)
                        )
                    } else {
                        viewCount = yt2009utils.countBreakup(viewCount)
                    }
                    viewCount = "lang_views_prefix" + viewCount + "lang_views_suffix"
                    moreFromCode += yt2009templates.relatedVideo(
                        video.id,
                        video.title,
                        protocol,
                        "",
                        viewCount,
                        "",
                        "",
                        flags
                    )
                })
            }
            catch(error) {
                moreFromCode += 
                `<div class="yt2009-mark-morefrom-fetch">Loading...</div>`
            }
            

            moreFromCode += `
				        <div class="clearL"></div>
			        </div>
                </div>
            </div>`


            code = code.replace(`<!--yt2009_more_from_panel-->`, moreFromCode)
        }

        // if flash player is used
        // hide the html5 js, fix the layout, put a flash player
        let env = process.platform == "win32" ? "dev" : "prod"
        let swfFilePath = "/watch.swf"
        let swfArgPath = "video_id"
        if(req.headers.cookie.includes("alt_swf_path")) {
            swfFilePath = decodeURIComponent(
                req.headers.cookie.split("alt_swf_path=")[1].split(";")[0]
            )
        }
        if(req.headers.cookie.includes("alt_swf_arg")) {
            swfArgPath = decodeURIComponent(
                req.headers.cookie.split("alt_swf_arg=")[1].split(";")[0]
            )
        }
        let flash_url = `${swfFilePath}?${swfArgPath}=${data.id}&iv_module=http%3A%2F%2F${config.ip}%3A${config.port}%2Fiv_module-${env}.swf`
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

        // podkładanie pod html podstawowych danych
        code = code.split("video_title").join(yt2009utils.xss(data.title))
        code = code.replace("video_view_count", views)
        code = code.replace("channel_icon", channelIcon)
        code = code.replace("channel_name", yt2009utils.xss(author_name))
        code = code.split("channel_url").join(data.author_url)
        code = code.replace("upload_date", uploadDate)
        code = code.replace("yt2009_ratings_count", ratings)
        if(!useFlash) {
            code = code.replace(
                "mp4_files", 
                `<source src="${data.mp4}${!config.fallbackMode ? ".mp4" : ""}" type="video/mp4"></source>
                <source src="${data.mp4}${!config.fallbackMode ? ".ogg" : ""}" type="video/ogg"></source>`
            )
        }
        code = code.replace(
            "video_url",
            `http://youtube.com/watch?v=${data.id}`
        )
        code = code.replace(
            "video_embed_link",
            `<object width=&quot;425&quot; height=&quot;344&quot;><param name=&quot;movie&quot; value=&quot;http://${config.ip}%3A${config.port}/watch.swf?video_id=${data.id}&quot;></param><param name=&quot;allowFullScreen&quot; value=&quot;true&quot;></param><param name=&quot;allowscriptaccess&quot; value=&quot;always&quot;></param><embed src=&quot;http://${config.ip}%3A${config.port}/watch.swf?video_id=${data.id}&quot; type=&quot;application/x-shockwave-flash&quot; allowscriptaccess=&quot;always&quot; allowfullscreen=&quot;true&quot; width=&quot;425&quot; height=&quot;344&quot;></embed></object>`
        )

        // markup descriptions - treat http and https as links
        let shortDescription = data.description.split("\n")
                                                .slice(0, 3).join("<br>")
        let fullDescription = data.description.split("\n").join("<br>")

        // descriptions
        code = code.replace(
            "video_short_description",
            yt2009utils.markupDescription(shortDescription)
        )
        code = code.replace(
            "video_full_description",
            yt2009utils.markupDescription(fullDescription)
        )

        // ukryj widoczne od razu przyciski sign in jak jesteśmy zalogowani
        if(code.includes("Sign Out")) {
            code = code.split("yt2009-signin-hide").join("hid")
        }

        // comments
        let comments_html = ""
        let unfilteredCommentCount = 0;
        if(data.comments) {

            // hide show more comments if less than 21
            // (20 standard + continuation token)
            if(data.comments.length !== 21) {
                code = code.replace("yt2009_hook_more_comments", "hid")
            }


            // podłóż html
            data.comments.forEach(comment => {
                if(comment.continuation) {
                    continuationFound = true;
                    code = code.replace(
                        "yt2009_comments_continuation_token",
                        comment.continuation
                    )
                    return;
                }
                // flagi
                let commentTime = comment.time;
                if(flags.includes("fake_comment_dates")) {
                    commentTime = yt2009utils.genFakeDate();
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
    
                if(flags.includes("author_old_names")
                && comment.authorUrl.includes("/user/")) {
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
                comments_html += yt2009templates.videoComment(
                    comment.authorUrl,
                    commentPoster,
                    commentTime,
                    commentContent,
                    flags,
                    true
                )
    
                unfilteredCommentCount++;
            })
        } else {
            code = code.replace("yt2009_hook_more_comments", "hid")
        }
        

        // token kontynuacji
        code = code.replace(`yt2009_comment_count`, unfilteredCommentCount)
        code = code.replace(`<!--yt2009_add_comments-->`, comments_html)

        // podkładanie podobnych filmów
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
                        "",
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
            if(req.headers["user-agent"].includes("MSIE")
            || req.headers["user-agent"].includes("Goanna")) return "";
            let rv_url = ""
            let related_index = 0;
            endscreen_queue.forEach(video => {
                if(related_index <= 7) {
                    rv_url += `&rv.${related_index}.title=${
                        encodeURIComponent(video.title)
                    }`
                    rv_url += `&rv.${related_index}.thumbnailUrl=${
                        encodeURIComponent(
                            `http://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
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
        


        // tagi
        let tags_html = ""
        data.tags.forEach(tag => {
            tags_html += `<a href="#" class="hLink" style="margin-right: 5px;">${
                tag.toLowerCase()
            }</a>\n                                   `
        })
        code = code.replace("video_tags_html", tags_html)

        // przycisk sub
        let subscribed = false;
        subscribeList.forEach(sub => {
            if(data.author_url == sub.url) {
                subscribed = true;
            }
        })

        if(subscribed) {
            // pokaż unsubscribe (mamy sub)
            code = code.replace(
                `data-yt2009-unsubscribe-button`,
                ""
            )
            code = code.replace(
                `data-yt2009-subscribe-button`,
                `class="hid"`
            )
        } else {
            // na odwrót
            code = code.replace(
                `data-yt2009-unsubscribe-button`,
                `class="hid"`
            )
            code = code.replace(
                `data-yt2009-subscribe-button`,
                ``
            )
        }

        // autoplay flaga
        if(flags.includes("autoplay") && !useFlash) {
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

        // flaga exp_ryd / use_ryd
        let useRydRating = "4.5"
        let endRating = "4.5"
        if(flags.includes("exp_ryd") || flags.includes("use_ryd")) {
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
                    `<button class="yt2009-stars master-sprite ratingL ratingL-4.5" title="4.5"></button>`,
                    `<button class="yt2009-stars master-sprite ratingL ratingL-${avgRating}" title="${avgRating}"></button>`
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

                callbacksMade++;
                if(requiredCallbacks == callbacksMade) {
                    render_endscreen();
                    fillFlashIfNeeded();
                    genRelay();
                    callback(code)
                }
            })
        } else {
            // oceny użytkowników
            let userRating = yt2009userratings.read(data.id, true)
            let avgRating = yt2009utils.custom_rating_round(
                (userRating + parseFloat(useRydRating)) / 2
            )
            if(userRating == 0) {
                avgRating = useRydRating
            }
            if(Math.floor(avgRating) == avgRating) {
                avgRating = avgRating.toString() + ".0"
            }
            endRating = avgRating
            code = code.replace(
                `<button class="yt2009-stars master-sprite ratingL ratingL-4.5" title="4.5"></button>`,
                `<button class="yt2009-stars master-sprite ratingL ratingL-${avgRating}" title="${avgRating}"></button>`
            )
        }

        // udostępnianie
        let shareBehaviorServices = constants.shareBehaviorServices
        
        function createShareHTML(sites) {
            let shareHTML = `
            <div id="watch-sharetab-options">
                <div id="more-options"><a href="#" class="hLink" rel="nofollow">(more share options)</a></div>
                <div style="display: none;" id="fewer-options"><a href="#" class="hLink" rel="nofollow">fewer share options</a></div>
            </div>
            <div id="watch-share-services-collapsed">
            `
            // 3 pierwsze
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

            // reszta
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
                if((req.headers["cookie"] || "").includes("f_h264")) {
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
            s.innerHTML = "video:not(.showing-endscreen) {\\
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
        || qualityList.includes("480p"))
        && !config.fallbackMode) {
            let use720p = qualityList.includes("720p")
            code = code.replace(`<!--yt2009_style_hq_button-->`, `
            <style>
            /*fixy css pod przycisk HQ*/
            .volume_container {
                right: 98px !important;
            }
            .timer {
                right: 135px !important;
            }
            .volume_popout {
                right: 98px !important;
            }
            </style>
            `)
            code = code.replace(`//yt2009-exp-hq-btn`, `
            //exp_hq
            seekbarRemoveWidth = 245;
            adjustSeekbarWidth();
            var hqPlaying = false;

            // hd/hq playback
            $(".video_controls .hq").addEventListener("click", function() {
                video_pause();

                if(!hqPlaying) {
                    hqPlaying = true;
                    $("video").innerHTML = "";
                    var length = seconds_to_time(Math.floor(video.duration))
                    $("video").src = "/${use720p ? "exp_hd" : "get_480"}?video_id=${data.id}"
                    setTimeout(function() {
                        $(".video_controls .timer").innerHTML = "0:00 / " + length;
                        showLoadingSprite();
                    }, 500)
                    $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""} enabled"
                    video_play()
                } else {
                    $("video").src = "/assets/${data.id}.mp4";
                    hqPlaying = false;
                    $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
                }
            }, false)
            
            // fallback do 360p
            $("video").addEventListener("error", function() {
                if(hqPlaying) {
                    $("video").src = "/assets/${data.id}.mp4";
                    hqPlaying = false;
                    $(".video_controls .hq").className = "hq ${use720p ? "hd" : ""}"
                }
            }, false)`)

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

        // exp_related
        if(flags.includes("exp_related")) {
            requiredCallbacks++;
            let exp_related_html = ""
            let lookup_keyword = ""
            // tagi
            data.tags.forEach(tag => {
                if(lookup_keyword.length < 9) {
                    lookup_keyword += `${tag.toLowerCase()} `
                }
            })
            // jako backup pierwsze słowo z tytułu
            if(lookup_keyword.length < 9) {
                lookup_keyword = data.title.split(" ")[0]
            }
            
            // wyszukiwanie
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

                    // na koniec stare related filmy od yt
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
                            if(flags.includes("author_old_names")
                            && video.creatorUrl.includes("/user/")) {
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

        // banery kanałów
        yt2009channelcache.getSmallBanner(data.author_url, (file => {
            if(file && file !== "no") {
                code = code.replace(
                    `<!--yt2009_bannercard-->`,`
                    <div id="watch-channel-brand-cap">
                        <a href="${data.author_url}"><img src="/assets/${file}" width="300" height="50" border="0"></a>
                    </div>`
                )
            }
            callbacksMade++;
            if(requiredCallbacks == callbacksMade) {
                render_endscreen()
                fillFlashIfNeeded();
                genRelay();
                callback(code)
            }
        }))

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



    "get_video_description": function(id) {
        let tr = ""
        if(cache.read()[id]) {
            tr = cache.read()[id].description;
        }

        return tr;
    },



    "get_video_comments": function(id, callback) {
        if(cache.read()[id]) {
            callback(cache.read()[id].comments);
        } else {
            this.innertube_get_data(id, (data) => {
                try {
                    let sections = data.contents.twoColumnWatchNextResults
                                        .results.results.contents
                    sections.forEach(section => {
                        if(section.itemSectionRenderer) {
                            if(section.itemSectionRenderer.sectionIdentifier
                                !== "comment-item-section") return;
                            
                            let token = section.itemSectionRenderer.contents[0]
                                                .continuationItemRenderer
                                                .continuationEndpoint
                                                .continuationCommand.token
                            this.request_continuation(token, id, "",
                                (comment_data) => {
                                    callback(comment_data)
                                }
                            )
                        }
                    })
                }
                catch(error) {
                    callback([])
                }
            })
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
        if(yt2009qualitycache.read()[id]) {
            callback(yt2009qualitycache.read()[id])
        } else {
            // clean fetch if we don't have cached data
            this.innertube_get_data(id, (data) => {
                let qualityList = []
                try {
                    data.streamingData.adaptiveFormats
                    .forEach(videoQuality => {
                        if(videoQuality.qualityLabel
                        && !qualityList.includes(videoQuality.qualityLabel)) {
                            qualityList.push(videoQuality.qualityLabel)
                        }
                    })

                    callback(qualityList)
                    yt2009qualitycache.write(id, qualityList)
                }
                catch(error) {
                    console.log(error)
                    callback([])
                }
            })
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
    }
}