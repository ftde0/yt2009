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
    "fetch_video_data": function(id, callback, userAgent, userToken, useFlash, resetCache) {
        let waitForOgv = false;

        // jeśli mamy do czynienia z firefoxem <=25, czekamy na ogg, inaczej callbackujemy mp4
        if(userAgent.includes("Firefox/")) {
            let ffVersion = parseInt(userAgent.split("Firefox/")[1].split(" ")[0])
            if(ffVersion <= 25 && !useFlash) {
                waitForOgv = true;
            }
        }
        // jeśli zapisane przekazujemy lokalne dane
        if(cache.read()[id] && !waitForOgv && !resetCache) {
            let v = cache.read()[id]
            console.log(`(${userToken}) ${id} z cache (${Date.now()})`)

            if(!fs.existsSync(`../assets/${id}.mp4`)) {
                let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)
                writeStream.on("finish", () => {
                    callback(v)
                })
                
                
                ytdl(`https://youtube.com/watch?v=${id}`, {
                    "quality": 18
                })
                .on("error", (error) => {
                     callback(false)
                     return;
                 })
                .pipe(writeStream)
            } else {
                callback(v)
            }
            
        } else if(cache.read()[id] && waitForOgv && !resetCache) {
            if(!fs.existsSync(`../assets/${id}.ogg`)) {
                // robimy ogg przed callbackiem
                child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
                    let v = cache.read()[id]
                    console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
                    callback(v)
                })
            } else {
                // mamy ogg, możemy spokojnie callbackować
                let v = cache.read()[id]
                console.log(`(${userToken}) ${id} z cache (${Date.now()})`)
                callback(v)
            }
        } else {
            // w przeciwnym wypadku fetch
            console.log(`(${userToken}) ${id} clean fetch ${Date.now()} ${resetCache ? "(cache reset)" : ""}`)
            fetch("https://youtube.com/watch?v=" + id, {
                "headers": constants.headers
            }).then(r => {
                // parse danych z yt i wrzucanie ich do watchpage
                r.text().then(response => {
                    let ytInitialPlayerResponse;
                    try {
                        // i hate this way and i have to fix it one day
                        if(response.includes(";var head ")) {
                            ytInitialPlayerResponse = JSON.parse(response.split(`ytInitialPlayerResponse = `)[1].split(`;var head`)[0])
                        } else {
                            ytInitialPlayerResponse = JSON.parse(response.split(`ytInitialPlayerResponse = `)[1].split(`;var meta`)[0])
                        }
                    }
                    catch(error) {
                        callback(false)
                        console.log(error);
                    }
                    let ytInitialData = JSON.parse(response.split(`ytInitialData = `)[1].split(";</script>")[0])

                    api_key = response.split(`"INNERTUBE_API_KEY":"`)[1].split(`"`)[0]
                    innertube_context = JSON.parse(response.split(`"INNERTUBE_CONTEXT":`)[1].split(`,"user":{"lockedSafetyMode":`)[0] + "}")
                    yt2009exports.writeData("context", innertube_context);
                    yt2009exports.writeData("api_key", api_key)

                    fs.writeFileSync("./cache_dir/innertube_context.json", JSON.stringify(innertube_context))

                    let fetchesCompleted = 0;

                    let data = {}
                    try {
                        data["title"] = ytInitialPlayerResponse.videoDetails.title
                    }
                    catch(error) {
                        callback(false)
                        return;
                    }

                    if(ytInitialPlayerResponse.videoDetails.isLive) {
                        callback(false)
                        return;
                    }

                    // podstawowe dane
                    data["description"] = ytInitialPlayerResponse.videoDetails.shortDescription
                    data["viewCount"] = ytInitialPlayerResponse.videoDetails.viewCount
                    data["author_name"] = ytInitialPlayerResponse.videoDetails.author;
                    data["id"] = id;
                    data["author_url"] = ""
                    try {
                        data["author_url"] = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl
                    }
                    catch(error) {
                        data["author_url"] = "/channel/" + ytInitialPlayerResponse.videoDetails.channelId
                    }

                    if(!data.author_url.startsWith("/c/") && !data.author_url.startsWith("/user/") && !data.author_url.startsWith("/channel/")) {
                        // niefajny uploader url, fallbackujemy na /channel/id
                        data.author_url = "/channel/" + ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.navigationEndpoint.browseEndpoint.browseId
                    }

                    // reszta podstawowych danych
                    data["author_img"] = ""
                    try {
                        data["author_img"] = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.thumbnail.thumbnails[1].url
                    }
                    catch(error) {
                        data["author_img"] = "default"
                    }
                    data["upload"] = ""
                    try {
                        data["upload"] = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText
                    }
                    catch(error) {
                        data["upload"] = ytInitialPlayerResponse.microformat.playerMicroformatRenderer.uploadDate
                    }
                    data["tags"] = ytInitialPlayerResponse.videoDetails.keywords || [];
                    data["related"] = []
                    data["length"] = parseInt(ytInitialPlayerResponse.microformat.playerMicroformatRenderer.lengthSeconds)
                    data["category"] = ytInitialPlayerResponse.microformat.playerMicroformatRenderer.category

                    // related filmy

                    let related = []
                    try {
                        related = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results || ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents
                    }
                    catch(error) {}
                    related.forEach(video => {
                        if(!video.compactVideoRenderer) return;

                        video = video.compactVideoRenderer;

                        let creatorName = ""
                        let creatorUrl = ""
                        video.shortBylineText.runs.forEach(run => {
                            creatorName += run.text;
                            creatorUrl += run.navigationEndpoint.browseEndpoint.canonicalBaseUrl
                        })

                        if(!creatorUrl.startsWith("/c/") && !creatorUrl.startsWith("/user/") && !creatorUrl.startsWith("/channel/")) {
                            creatorUrl = "/channel/" + video.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId
                        }
                        try {
                            data.related.push({"title": video.title.simpleText, "id": video.videoId, "views": video.viewCountText.simpleText, "length": video.lengthText.simpleText, "creatorName": creatorName, "creatorUrl": creatorUrl, "uploaded": video.publishedTimeText.simpleText})
                        }
                        catch(error) {
                            
                        }
                    })

                    // zapisujemy zdjęcie kanału

                    let fname = data.author_img.split("/")[data.author_img.split("/").length - 1]
                    if(!fs.existsSync(`../assets/${fname}.png`) && data.author_img !== "default") {
                        fetch(data.author_img, {
                            "headers": {
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
                            }
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
                        let sections = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents
                        sections.forEach(section => {
                            if(section.itemSectionRenderer) {
                                if(section.itemSectionRenderer.sectionIdentifier !== "comment-item-section") return;
                                
                                let token = section.itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token
                                this.request_continuation(token, id, "", (comment_data) => {
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

                    if(!fs.existsSync(`../assets/${id}.mp4`)) {
                        function on_mp4_save_finish() {
                            setTimeout(function() {
                                if(waitForOgv) {
                                    child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {
                                        data["mp4"] = `/assets/${id}`
                                        fetchesCompleted++;
                                        if(fetchesCompleted == 3) {
                                            callback(data)
                                        }
                                        
                                    })
                                } else {
                                    data["mp4"] = `/assets/${id}`
                                    fetchesCompleted++;
                                    if(fetchesCompleted == 3) {
                                        callback(data)
                                    }
                                    cache.write(id, data)
                                    
                                }
                                
                            }, 250)
                        }

                       // ytdl
                       let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)
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
                       .pipe(writeStream)
                        
                    } else {
                        data["mp4"] = `/assets/${id}`
                        fetchesCompleted++;
                        if(fetchesCompleted == 3) {
                            callback(data)
                        }
                        cache.write(id, data);
                    }
                })
            })
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
                                flags
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
                            let views = yt2009utils.countBreakup(
                                parseInt(video.viewCount.replace(/[^0-9]/g, ""))
                            ) + " views"
                            if(isNaN(
                                parseInt(video.viewCount.replace(/[^0-9]/g, "")))
                            ) {
                                views = ""
                            }
                                        
                            // apply
                            /*endscreen_queue.push({
                                "title": video.title,
                                "id": video.id,
                                "length": yt2009utils.time_to_seconds(video.time),
                                "url": encodeURIComponent(`http://ftde-projects.tk:5316/watch?v=${video.id}&f=1`),
                                "views": video.viewCount,
                                "creatorUrl": video.creatorUrl,
                                "creatorName": video.uploaderName
                            })*/
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
        if(flags.includes("fake_upload_dateadapt") && new Date(uploadDate).getTime() > 1272664800000) {
            uploadDate = `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(Math.random() * 12)] || "Feb"} ${Math.floor(Math.random() * 26) + 1}, 2009`
        } else if(flags.includes("fake_upload_date") && !flags.includes("fake_upload_dateadapt")) {
            uploadDate = `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(Math.random() * 12)] || "Feb"} ${Math.floor(Math.random() * 26) + 1}, 2009`
        }

        uploadDate = uploadDate.replace("Streamed live on ", "").replace("Premiered ", "")
        if(uploadDate.includes("-")) {
            // fallback format
            let temp = new Date(uploadDate)
            uploadDate = `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][temp.getMonth()]} ${temp.getDate()}, ${temp.getFullYear()}`
        }


        let channelIcon = data.author_img;
        if(flags.includes("default_avataradapt")) {
            if(yt2009defaultavatarcache.use(`../${channelIcon}`)) {
                channelIcon = "/assets/site-assets/default.png"
            }
        } else if(flags.includes("default_avatar") && !flags.includes("default_avataradapt")) {
            channelIcon = "/assets/site-assets/default.png"
        }


        let views = yt2009utils.countBreakup(data.viewCount)
        if(flags.includes("realistic_view_count")) {
            if(parseInt(data.viewCount) > 100000) {
                views = yt2009utils.countBreakup(Math.floor(parseInt(data.viewCount) / 90))
            }
        }

        let ratings_estimate_power = 15
        let ratings = "";
        if(parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
            ratings_estimate_power = 150
        }
        ratings = yt2009utils.countBreakup(Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / ratings_estimate_power))
        

        // sekcja "more from" jak mamy zfetchowany już kanał / flaga always_morefrom
        if(yt2009channelcache.read("main")[data.author_url.replace("/", "")] || flags.includes("always_morefrom")) {
            let moreFromCode = `
            <div id="watch-channel-videos-panel" class="watch-discoverbox-wrapper yt-uix-expander " data-expander-action="watchTogglePanel" data-discoverbox-type="channel">
                <h2 class="yt-uix-expander-head yt-uix-expander-collapsed" onclick="toggleExpander(this)">
                    <button title="" class="yt-uix-expander-arrow master-sprite"></button>
                    <span>
                        More From: ${author_name}
                    </span>
                </h2>
                <div id="watch-channel-vids-body" class="watch-discoverbox-body mini-list-view yt-uix-expander-body hid">
                    <div id="watch-channel-discoverbox" class="watch-discoverbox" style="height:432px">`

            try {
                yt2009channelcache.read("main")[data.author_url.replace("/", "")].videos.splice(0, 11).forEach(video => {
                    if(video.id == data.id) return;
                    moreFromCode += `
                        <div class="video-entry">
                            <div class="v90WideEntry">
                                <div class="v90WrapperOuter">
                                    <div class="v90WrapperInner">
                                        <a href="/watch?v=${video.id}" class="video-thumb-link" rel="nofollow"><img title="${video.title}" thumb="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" src="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" class="vimg90" qlicon="${video.id}" alt="${video.title}}"></a>
                
                                        <div class="addtoQL90"><a href="#" ql="${video.id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg"></button></a>
                                            <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="video-main-content">
                                <div class="video-mini-title">
                                <a href="/watch?v=${video.id}" rel="nofollow">${video.title}</a></div>
                                <div class="video-view-count">${flags.includes("realistic_view_count") && parseInt(video.views.replace(/[^0-9]/g, "")) >= 100000 ? yt2009utils.countBreakup(Math.floor(parseInt(video.views.replace(/[^0-9]/g, "")) / 90)) + " views" : video.views}</div>
                            </div>
                            <div class="video-clear-list-left"></div>
                        </div>`
                })
            }
            catch(error) {moreFromCode += `<div class="yt2009-mark-morefrom-fetch">Loading...</div>`}
            

            moreFromCode += `
				        <div class="clearL"></div>
			        </div>
                </div>
            </div>`


            code = code.replace(`<!--yt2009_more_from_panel-->`, moreFromCode)
        }

        // jak używamy flasha wywalamy pliki playera html5, naprawiamy layout i podkładamy embed flashowy
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
        let flash_url = `${swfFilePath}?${swfArgPath}=${data.id}&iv_module=http%3A%2F%2F${env == "dev" ? "192.168.1.4%3A82" : "ftde-projects.tk%3A5316"}%2Fiv_module-${env}.swf`
        if(useFlash) {
            code = code.replace(
                `<!DOCTYPE HTML>`,
                `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">`
            )
            code = code.replace(
                `<!DOCTYPE html>`,
                `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">`
            )
            if(userAgent.includes("Firefox/") || userAgent.includes("MSIE")) {
                code = code.replace(`><span style="display: block;">lang_search`, ` style="width: 40px;"><span>lang_search`)
            }
            code = code.replace(`<script src="/assets/site-assets/html5-player.js"></script>`, `<!--<script src="/assets/site-assets/html5-player.js"></script>-->`)
            code = code.replace(`initPlayer(`, `//initPlayer(`)
            code = code.replace(`class="flash-player"`, `class="flash-player hid"`)
            code = code.replace(`<!--hook /assets/site-assets/f_script.js -->`, `<script src="/assets/site-assets/f_script.js"></script>`)
            code = code.replace(`<script src="nbedit_watch.js"></script>`, `<!--<script src="nbedit_watch.js"></script>-->`)
        }

        if(!userAgent.includes("MSIE") && !userAgent.includes("Chrome/")) {
            code = code.replace(`id="watch-longform-player" class="master-sprite"`, `id="watch-longform-player" class="master-sprite not-pos-exclude"`)
            code = code.replace(`id="watch-longform-popup" class="master-sprite"`, `id="watch-longform-popup" class="master-sprite not-pos-exclude"`)
        }

        // podkładanie pod html podstawowych danych
        code = code.split("video_title").join(data.title)
        code = code.replace("video_view_count", views)
        code = code.replace("channel_icon", channelIcon)
        code = code.replace("channel_name", author_name)
        code = code.split("channel_url").join(data.author_url)
        code = code.replace("upload_date", uploadDate)
        code = code.replace("yt2009_ratings_count", ratings)
        code = code.replace("mp4_files", `
        <source src="${data.mp4}.mp4" type="video/mp4"></source>
        <source src="${data.mp4}.ogg" type="video/ogg"></source>`)
        code = code.replace("video_url", `http://youtube.com/watch?v=${data.id}`)
        code = code.replace("video_embed_link", `<object width=&quot;425&quot; height=&quot;344&quot;><param name=&quot;movie&quot; value=&quot;http://ftde-projects.tk:5316/watch.swf?video_id=${data.id}&quot;></param><param name=&quot;allowFullScreen&quot; value=&quot;true&quot;></param><param name=&quot;allowscriptaccess&quot; value=&quot;always&quot;></param><embed src=&quot;http://ftde-projects.tk:5316/watch.swf?video_id=${data.id}&quot; type=&quot;application/x-shockwave-flash&quot; allowscriptaccess=&quot;always&quot; allowfullscreen=&quot;true&quot; width=&quot;425&quot; height=&quot;344&quot;></embed></object>`)

        // parsing opisów - treating http:// i https:// jako linki
        let shortDescription = data.description.split("\n").slice(0, 3).join("<br>")
        let fullDescription = data.description.split("\n").join("<br>")
        let shortDescriptionParsed = ``
        let fullDescriptionParsed = ``

        // krótki opis
        shortDescription.split("<br>").forEach(part => {
            part.split(" ").forEach(word => {
                if(word.startsWith("http://") || word.startsWith("https://")) {
                    shortDescriptionParsed += `<a href="${word}" target="_blank">${word.length > 40 ? word.substring(0, 40) + "..." : word}</a> `
                } else {
                    shortDescriptionParsed += `${word} `
                }
            })
            shortDescriptionParsed += "<br>"
        })
        code = code.replace("video_short_description", shortDescriptionParsed)

        // pełny opis
        fullDescription.split("<br>").forEach(part => {
            part.split(" ").forEach(word => {
                if(word.startsWith("http://") || word.startsWith("https://")) {
                    fullDescriptionParsed += `<a href="${word}" target="_blank">${word.length > 40 ? word.substring(0, 40) + "..." : word}</a> `
                } else {
                    fullDescriptionParsed += `${word} `
                }
            })
            fullDescriptionParsed += "<br>"
        })
        code = code.replace("video_full_description", fullDescriptionParsed)

        // ukryj widoczne od razu przyciski sign in jak jesteśmy zalogowani
        if(code.includes("Sign Out")) {
            code = code.split("yt2009-signin-hide").join("hid")
        }

        // podkładanie komentarzy
        let comments_html = ""
        let unfilteredCommentCount = 0;
        if(data.comments) {
            
            // ukryj show more comments jak mniej niż 21 (20 defaultowych + continuation)
            if(data.comments.length !== 21) {
                code = code.replace("yt2009_hook_more_comments", "hid")
            }


            // podłóż html

            data.comments.forEach(comment => {
                if(comment.continuation) {
                    continuationFound = true;
                    code = code.replace("yt2009_comments_continuation_token", comment.continuation)
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
    
                if(flags.includes("author_old_names") && comment.authorUrl.includes("/user/")) {
                    commentPoster = comment.authorUrl.split("/user/")[1]
                }
    
                let future = constants.comments_remove_future_phrases
                let futurePass = true;
                if(flags.includes("comments_remove_future")) {
                    future.forEach(futureWord => {
                        if(comment.content.toLowerCase().includes(futureWord)) {
                            futurePass = false;
                        }
                    })
                }
    
                if(!futurePass) return;
                // sam html
                comments_html += yt2009templates.videoComment(
                    comment.authorUrl,
                    commentPoster,
                    commentTime,
                    comment.content,
                    flags
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

            let relatedViewCount = video.views
            if(flags.includes("realistic_view_count") && parseInt(relatedViewCount.replace(/[^0-9]/g, "")) >= 1000) {
                relatedViewCount = yt2009utils.countBreakup(Math.floor(parseInt(relatedViewCount.replace(/[^0-9]/g, "")) / 90)) + " views"
            }

            /*let uploaded = video.uploaded;
            if(uploaded.toLowerCase().includes("lat") || uploaded.toLowerCase().includes("years")) {
                if(new Date().getFullYear() - 2010 >= parseInt(uploaded.replace(/[^0-9]/g, ""))) return;
            }*/

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
                /*related_html += `<div class="video-entry">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner">
                                <a href="/watch?v=${video.id}" class="video-thumb-link" rel="nofollow"><img title="${video.title.split('"').join("&quot;")}" thumb="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" src="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" class="vimg90" qlicon="${video.id}" alt="${video.title.split('"').join("&quot;")}}"></a>
        
                                <div class="addtoQL90"><a href="#" ql="${video.id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg"></button></a>
                                    <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</a></div>
                                </div>
        
                                <div class="video-time"><a href="/watch?v=${video.id}" rel="nofollow">${video.length}</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="video-main-content">
                        <div class="video-mini-title">
                        <a href="/watch?v=${video.id}" rel="nofollow">${video.title}</a></div>
                        <div class="video-view-count">${relatedViewCount}</div>
                        <div class="video-username"><a href="${video.creatorUrl}">${video.creatorUrl.includes("/user/") && flags.includes("author_old_names") ? video.creatorUrl.split("/user/")[1] : uploader}</a>
                        </div>
                    </div>
                    <div class="video-clear-list-left"></div>
                </div>`*/

                endscreen_queue.push({
                    "title": video.title,
                    "id": video.id,
                    "length": yt2009utils.time_to_seconds(video.length),
                    "url": encodeURIComponent(`http://ftde-projects.tk:5316/watch?v=${video.id}&f=1`),
                    "views": relatedViewCount,
                    "creatorUrl": video.creatorUrl,
                    "creatorName": uploader
                })
            }

            
        })

        /*
        if(!flags.includes("exp_related")) {
            // render endscreena na podstawie related filmów od yt
            render_endscreen(data.related)
        }*/

        code = code.replace(`<!--yt2009_add_marking_related-->`, related_html)

        // playlista jak mamy
        if(playlistId) {
            let index = 0;
            let playlistsHTML = `
            <div id="watch-playlist-videos-panel" class="watch-discoverbox-wrapper yt-uix-expander" data-expander-action="watchTogglePanel" data-discoverbox-type="playlist" data-discoverbox-username="">
                <h2 class="yt-uix-expander-head">
                    <span>Playlist</span>
                </h2>
                <div id="watch-playlist-vids-body" class="watch-discoverbox-body mini-list-view yt-uix-expander-body">
                    <div id="watch-playlist-discoverbox" class="watch-discoverbox" style="height:432px">`

            
            try {
                yt2009playlists.parsePlaylist(playlistId, () => {}).videos.forEach(video => {
                    playlistsHTML += `
                <div class="video-entry ${video.id == data.id ? "watch-ppv-vid" : ""}">
                    <div class="v90WideEntry">
                        <div class="v90WrapperOuter">
                            <div class="v90WrapperInner">
                                <a href="/watch?v=${video.id}&list=${playlistId}" class="video-thumb-link" rel="nofollow"><img title="${video.title.split('"').join("&quot;")}" thumb="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" src="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" class="vimg90" qlicon="${video.id}" alt="${video.title.split('"').join("&quot;")}}"></a>
        
                                <div class="addtoQL90"><a href="#" ql="${video.id}" title="Add Video to QuickList"><button title="" class="master-sprite QLIconImg"></button></a>
                                    <div class="hid quicklist-inlist"><a href="#">Added to Quicklist</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="video-main-content">
                        <div class="video-mini-title">
                        <a href="/watch?v=${video.id}&list=${playlistId}" rel="nofollow">${video.title}</a></div>
                        <div class="video-username"><a href="${video.uploaderUrl}">${video.uploaderName}</a>
                        </div>
                    </div>
                    <div class="video-clear-list-left"></div>
                </div>`
                    index++;
                })
            }
            catch(error) {playlistsHTML += `<div class="hid yt2009_marking_fetch_playlist_client"></div>`}

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
            let endscreen_html = `
                        <span class="endscreen-arrow-left" onclick="endscreen_section_change(-1)"></span>
                        <span class="endscreen-arrow-right" onclick="endscreen_section_change(1)"></span>
                        <div class="buttons yt-center">
                            <div class="button-share">
                                <img src="/player-imgs/share.png"/>
                                <h2>Share</h2>
                            </div>
                            <div class="button-replay" onclick="videoReplay();">
                                <img src="/player-imgs/replay.png"/>
                                <h2>Replay</h2>
                            </div>
                        </div>
            `

            let endscreen_section_index = 0;
            let endscreen_section_html = `              <div class="endscreen-section" style="opacity: 1;">
            `
            endscreen_queue.forEach(video => {
                if(video.length >= 1800) return;
                endscreen_section_html += `
                                <div class="endscreen-video" onclick="videoNav('${video.id}')">
                                    <div class="endscreen-video-thumbnail">
                                        <img src="${protocol}://i.ytimg.com/vi/${video.id}/hqdefault.jpg" width="80" height="65"/>
                                        ${endscreen_version !== 1 ? `<div class="video-time" style="float: right;"><a href="">${yt2009utils.seconds_to_time(video.length)}</a></div>` : ""}
                                    </div>
                                    <div class="endscreen-video-info">
                                        <h3 style="max-width: 0px;overflow: hidden;" class="endscreen-video-title">${video.title.length > 80 ? video.title.substring(0, 80) + "..." : video.title}</h3>
                                        <h3 class="gr" ${endscreen_version !== 1 ? `style="height: 17px"` : ""}>${endscreen_version == 1 ? `<span>${video.length}</span>` : ""}</h3>
                                        <h3 class="gr">From: <span class="text-light">${(video.creatorUrl || "").includes("/user/") && flags.includes("author_old_names") ? (video.creatorUrl || "").split("/user/")[1] : video.creatorName}</span></h3>
                                        <h3 class="gr" ${endscreen_version !== 1 ? `style="margin-top: 2px !important;"` : ""}>Views: <span class="text-light">${video.views.replace(/[^0-9]/g, "")}</span></h3>
                                        ${endscreen_version !== 1 ? `<span class="endscreen-video-star rating-${yt2009ryd.readCache(video.id) ? yt2009ryd.readCache(video.id).toString().substring(0, 1) : "5"}"></span>` : ""}
                                    </div>
                                </div>`


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
                // wrzucamy cssa pod alt wersję endscreena
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
            code = code.replace(`<!--yt2009_endscreen_html_insert-->`, endscreen_html)
        }

        // endscreen dla fmode
        function render_endscreen_f() {
            if(req.headers["user-agent"].includes("MSIE")
            || req.headers["user-agent"].includes("Goanna")) return "";
            let rv_url = ""
            let related_index = 0;
            endscreen_queue.forEach(video => {
                if(related_index <= 7) {
                    rv_url += `&rv.${related_index}.title=${encodeURIComponent(video.title)}`
                    rv_url += `&rv.${related_index}.thumbnailUrl=${encodeURIComponent(`http://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)}`
                    rv_url += `&rv.${related_index}.length_seconds=${video.length}`
                    rv_url += `&rv.${related_index}.url=${video.url}`
                    rv_url += `&rv.${related_index}.view_count=${video.views.replace(/[^0-9]/g, "")}`
                    rv_url += `&rv.${related_index}.rating=5`
                    rv_url += `&rv.${related_index}.id=${video.id}`
                    rv_url += `&rv.${related_index}.author=${video.creatorName}`
                    related_index++;
                }
            })

            return rv_url;
        }
        


        // tagi
        let tags_html = ""
        data.tags.forEach(tag => {
            tags_html += `<a href="#" class="hLink" style="margin-right: 5px;">${tag.toLowerCase()}</a>\n                                   `
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
            code = code.replace(`data-yt2009-unsubscribe-button`, "")
            code = code.replace(`data-yt2009-subscribe-button`, `class="hid"`)
        } else {
            // na odwrót
            code = code.replace(`data-yt2009-unsubscribe-button`, `class="hid"`)
            code = code.replace(`data-yt2009-subscribe-button`, ``)
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
                console.log(userRating, useRydRating, parseFloat(useRydRating))
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
                //code = code.replace(`<button class="master-sprite ratingL ratingL-4.5" title="4.5"></button>`, `<button class="master-sprite ratingL ratingL-${rating}" title="${rating}"></button>`)

                
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
        let shareBehaviorServices = {
            "default": {
                "MySpace": "http://www.myspace.com/Modules/PostTo/Pages/?t=%title%&u=%url%",
                "Facebook": "http://www.facebook.com/sharer.php?u=%url%&t=%title%",
                "Twitter": "http://www.twitter.com/intent/tweet?text=Check%20this%20video%20out%20--%20%title%%20%url%",
                "Digg": "http://digg.com/submit?phase=2&url=%url%&title=%title%",
                "orkut": "http://www.orkut.com/FavoriteVideos.aspx?u=%url%",
                "Live Spaces": "http://spaces.live.com/BlogIt.aspx?Title=YouTube%20-%20%title%&SourceURL=%url%",
                "Bebo": "http://www.bebo.com/c/share?Url=%url%&Title=%title%",
                "hi5": "http://www.hi5.com/friend/checkViewedVideo.do?t=%title%&url=%url%"
            },
            "only_remove": {
                "Facebook": "http://www.facebook.com/sharer.php",
                "Twitter": "http://www.twitter.com/intent/tweet?text=Check%20this%20video%20out%20--%20%title%%20%url%",
                "hi5": "http://www.hi5.com/friend/checkViewedVideo.do?t=%title%&url=%url%"
            },
            "only_add": {
                "MySpace": "http://www.myspace.com/Modules/PostTo/Pages/?t=%title%&u=%url%",
                "Facebook": "http://www.facebook.com/sharer.php?u=%url%&t=%title%",
                "Twitter": "http://www.twitter.com/intent/tweet?text=Check%20this%20video%20out%20--%20%title%%20%url%",
                "Digg": "http://digg.com/submit?phase=2&url=%url%&title=%title%",
                "orkut": "http://www.orkut.com/FavoriteVideos.aspx?u=%url%",
                "Live Spaces": "http://spaces.live.com/BlogIt.aspx?Title=YouTube%20-%20%title%&SourceURL=%url%",
                "Bebo": "http://www.bebo.com/c/share?Url=%url%&Title=%title%",
                "hi5": "http://www.hi5.com/friend/checkViewedVideo.do?t=%title%&url=%url%",
                "Reddit": "http://www.reddit.com/submit?url=%url%&title=%title%",
                "Pinterest": "http://pinterest.com/pin/create/button/?url=%url%&description=%title%&is_video=true&media=https%3A//i.ytimg.com/vi/%id%/hqdefault.jpg",
                "mailto": "mailto:?body=%url%",
                "Blogger": "http://www.blogger.com/blog-this.g?n=%title%&source=youtube&b=%3Ciframe%20width%3D%22480%22%20height%3D%22270%22%20src%3D%22https%3A//youtube.com/embed/%id%%22%20frameborder%3D%220%22%20allow%3D%22accelerometer%3B%20autoplay%3B%20clipboard-write%3B%20encrypted-media%3B%20gyroscope%3B%20picture-in-picture%22%20allowfullscreen%3E%3C/iframe%3E&eurl=https%3A//i.ytimg.com/vi/%id%/hqdefault.jpg"
            },
            "both": {
                "Reddit": "http://www.reddit.com/submit?url=%url%&title=%title%",
                "Facebook": "http://www.facebook.com/sharer.php",
                "Twitter": "http://www.twitter.com/intent/tweet?text=Check%20this%20video%20out%20--%20%title%%20%url%",
                "mailto": "mailto:?body=%url%",
                "Pinterest": "http://pinterest.com/pin/create/button/?url=%url%&description=%title%&is_video=true&media=https%3A//i.ytimg.com/vi/%id%/hqdefault.jpg",
                "hi5": "http://www.hi5.com/friend/checkViewedVideo.do?t=%title%&url=%url%",
                "Blogger": "http://www.blogger.com/blog-this.g?n=%title%&source=youtube&b=%3Ciframe%20width%3D%22480%22%20height%3D%22270%22%20src%3D%22https%3A//youtube.com/embed/%id%%22%20frameborder%3D%220%22%20allow%3D%22accelerometer%3B%20autoplay%3B%20clipboard-write%3B%20encrypted-media%3B%20gyroscope%3B%20picture-in-picture%22%20allowfullscreen%3E%3C/iframe%3E&eurl=https%3A//i.ytimg.com/vi/%id%/hqdefault.jpg"
            }
        }
        
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
                code = code.replace(`<!--yt2009_f-->`, `<object width="640" height="385" class="fl"><param name="movie" value="${flash_url}"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="${flash_url}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385" class="fl"></embed></object>`)
                code = code.replace(`<!--yt2009_style_fixes_f-->`, `<link rel="stylesheet" href="/assets/site-assets/f.css">`)
            }
        }
        
        // no_controls_fade
        if(flags.includes("no_controls_fade") && !useFlash) {
            code = code.replace(`//yt2009-no-controls-fade`, `
            fadeControlsEnable = false;
            var s = document.createElement("style")
            s.innerHTML = "video:not(.showing-endscreen) {height: calc(100% - 25px) !important;}#watch-player-div {background: black !important;}"
            document.body.appendChild(s)`)
        }

        // exp_hq
        if(!useFlash
        && (qualityList.includes("720p")
        || qualityList.includes("480p"))) {
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
                        $(".video_controls .timer").innerHTML = "0:00 / " + length
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
            code = code.replace(`//yt2009-annotation-redirect`, `annotationsRedirect = true;`)
        }

        // shows tab
        if(flags.includes("shows_tab")) {
            code = code.replace(`<a href="/channels">lang_channels</a>`, `<a href="/channels">lang_channels</a><a href="#">Shows</a>`)
        }
        
        // always_annotations
        if(flags.includes("always_annotations") && !useFlash) {
            code = code.replace("//yt2009-always-annotations", "annotationsMain();")
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
            yt2009search.related_from_keywords(lookup_keyword, data.id, flags, (html, rawData) => {
                rawData.forEach(video => {
                    endscreen_queue.push({
                        "title": video.title,
                        "id": video.id,
                        "length": yt2009utils.time_to_seconds(video.length),
                        "url": encodeURIComponent(`http://ftde-projects.tk:5316/watch?v=${video.id}&f=1`),
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
                        // tylko filmy wrzucone 12 lat temu lub później & nie filmy które się już powtórzyły

                        // handle flag
                        // author name flags
                        let authorName = video.creatorName;
                        if(flags.includes("remove_username_space")) {
                            authorName = authorName.split(" ").join("")
                        }
                        if(flags.includes("username_asciify")) {
                            authorName = yt2009utils.asciify(authorName)
                        }
                        if(flags.includes("author_old_names") && video.creatorUrl.includes("/user/")) {
                            authorName = video.creatorUrl.split("/user/")[1].split("?")[0]
                        }
        
                        // view count flags
                        let viewCount = video.views;
                        if(flags.includes("realistic_view_count") && parseInt(viewCount.replace(/[^0-9]/g, "")) >= 100000) {
                            viewCount = yt2009utils.countBreakup(Math.floor(parseInt(viewCount.replace(/[^0-9]/g, "")) / 90)) + " views"
                        }

                        endscreen_queue.push({
                            "title": video.title,
                            "id": video.id,
                            "length": yt2009utils.time_to_seconds(video.length),
                            "url": encodeURIComponent(`http://ftde-projects.tk:5316/watch?v=${video.id}&f=1`),
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

                code = code.replace(`<!--yt2009_exp_related_marking-->`, exp_related_html)
                callbacksMade++;
                if(requiredCallbacks == callbacksMade) {
                    render_endscreen();
                    fillFlashIfNeeded();
                    callback(code)
                }
            }, req.protocol)
        }

        // banery kanałów
        yt2009channelcache.getSmallBanner(data.author_url, (file => {
            if(file && file !== "no") {
                code = code.replace(`<!--yt2009_bannercard-->`, `
                <div id="watch-channel-brand-cap">
                    <a href="${data.author_url}"><img src="/assets/${file}" width="300" height="50" border="0"></a>
                </div>`)
            }
            callbacksMade++;
            if(requiredCallbacks == callbacksMade) {
                render_endscreen()
                fillFlashIfNeeded();
                callback(code)
            }
        }))

        // relay
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

        if(requiredCallbacks == 0) {
            render_endscreen()
            fillFlashIfNeeded();
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
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
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
                    callback(yt2009utils.comments_parser(response, comment_flags))
                    continuations_cache[token] = JSON.parse(JSON.stringify(yt2009utils.comments_parser(response, comment_flags)))
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
            fetch("https://youtube.com/watch?v=" + id, {
                "headers": constants.headers
            }).then(r => {
                // parse danych z yt i wrzucanie ich do watchpage
                r.text().then(response => {
                    let ytInitialData = JSON.parse(response.split(`ytInitialData = `)[1].split(";</script>")[0])

                    api_key = response.split(`"INNERTUBE_API_KEY":"`)[1].split(`"`)[0]
                    innertube_context = JSON.parse(response.split(`"INNERTUBE_CONTEXT":`)[1].split(`,"user":{"lockedSafetyMode":`)[0] + "}")

                    // fetch komentarzy

                    try {
                        let sections = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents
                        sections.forEach(section => {
                            if(section.itemSectionRenderer) {
                                if(section.itemSectionRenderer.sectionIdentifier !== "comment-item-section") return;
                                
                                let token = section.itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token
                                this.request_continuation(token, id, "", (comment_data) => {
                                    callback(comment_data)
                                })
                            }
                        })
                    }
                    catch(error) {
                        callback([])
                    }
                })
            })
        }
    },



    "get_related_videos": function(id, callback, source) {
        if(cache.read()[id]) {
            callback(cache.read()[id].related);
        } else if(saved_related_videos[id]) {
            callback(saved_related_videos[id])
        } else {
            fetch("https://youtube.com/watch?v=" + id, {
                "headers": constants.headers
            }).then(r => {
                // parse danych z yt i wrzucanie ich do watchpage
                r.text().then(response => {
                    let ytInitialData = JSON.parse(response.split(`ytInitialData = `)[1].split(";</script>")[0])

                    api_key = response.split(`"INNERTUBE_API_KEY":"`)[1].split(`"`)[0]
                    innertube_context = JSON.parse(response.split(`"INNERTUBE_CONTEXT":`)[1].split(`,"user":{"lockedSafetyMode":`)[0] + "}")

                    // related filmy

                    let relatedParsed = []
                    let related = []
                    try {
                        related = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results || ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents
                    }
                    catch(error) {}
                    related.forEach(video => {
                        if(!video.compactVideoRenderer) return;

                        video = video.compactVideoRenderer;

                        let creatorName = ""
                        let creatorUrl = ""
                        video.shortBylineText.runs.forEach(run => {
                            creatorName += run.text;
                            creatorUrl += run.navigationEndpoint.browseEndpoint.canonicalBaseUrl
                        })
                        try {
                            relatedParsed.push({"title": video.title.simpleText, "id": video.videoId, "views": video.viewCountText.simpleText, "length": video.lengthText.simpleText, "creatorName": creatorName, "creatorUrl": creatorUrl, "uploaded": video.publishedTimeText.simpleText})
                        }
                        catch(error) {}
                    })

                    callback(relatedParsed)
                    saved_related_videos[id] = JSON.parse(JSON.stringify(relatedParsed))
                })
            })
        }
    },

    "720p_available": function(id, callback) {
        if(hd_availability_cache.read()[id] !== undefined && 
        hd_availability_cache.read()[id] !== null) {
            callback(hd_availability_cache.read()[id])
        } else {
            fetch("https://youtube.com/watch?v=" + id, {
                "headers": constants.headers
            }).then(r => {
                // parse danych z yt i wrzucanie ich do watchpage
                let hd_available = false;
                r.text().then(response => {
                    try {
                        let ytInitialPlayerResponse = JSON.parse(response.split(`ytInitialPlayerResponse = `)[1].split(`;var meta`)[0])
    
                        ytInitialPlayerResponse.streamingData.adaptiveFormats.forEach(quality => {
                            if(quality.qualityLabel == "720p") {
                                hd_available = true;
                            }
                        })

                        callback(hd_available)
                        hd_availability_cache.write(id, hd_available)
                    }
                    catch(error) {
                        console.log(error)
                        hd_available = false;
                        callback(hd_availability_cache)
                        hd_availability_cache.write(id, false)
                    }
                })
            })
        }
    },

    "get_qualities": function(id, callback) {
        if(yt2009qualitycache.read()[id]) {
            callback(yt2009qualitycache.read()[id])
        } else {
            // clean fetch if we don't have cached data
            fetch("https://youtube.com/watch?v=" + id, {
                "headers": constants.headers
            }).then(r => {
                // parse danych z yt i wrzucanie ich do watchpage
                let qualityList = []
                r.text().then(response => {
                    try {
                        let ytInitialPlayerResponse = JSON.parse(
                            response.split(`ytInitialPlayerResponse = `)[1]
                                    .split(`;var meta`)[0]
                            )
    
                        ytInitialPlayerResponse.streamingData.adaptiveFormats
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