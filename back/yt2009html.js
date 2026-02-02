const fs = require("fs");
const fetch = require("node-fetch");
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
const yt2009signin = require("./yt2009androidsignin")
const yt2009trusted = require("./yt2009trustedcontext")
const yt2009mobilehelper = require("./yt2009mobilehelper")
const yt2009sabr = require("./yt2009sabr")
const yt2009pot = require("./yt2009pot")
const constants = require("./yt2009constants.json")
const config = require("./config.json")
const userid = require("./cache_dir/userid_cache")
const playerProto = require("./proto/android_player_pb")
const crypto = require("crypto")
const signedInNext = false;
const devTimings = false;
const oneWeek = 1000 * 60 * 60 * 24 * 7

const EXTRA_RISK_BLOCK = true; //EXPERIMENT: reduce number of /player requests
// to hopefully reduce IP blocks that started happening recently
// when hosting on datacenter IPs
const ANDROID_REQ_UA = "com.google.android.youtube/20.51.39 (Linux; U; Android 14) gzip"
let visitorId = ""
if(EXTRA_RISK_BLOCK) {
    fetch("https://youtubei.googleapis.com/youtubei/v1/visitor_id", {
        "body": JSON.stringify({
            "context": {
                "client": {
                    "hl": "en",
                    "clientName": "ANDROID",
                    "clientVersion": "20.51",
                    "deviceMake": "Google",
                    "deviceModel": "Android SDK built for x86",
                    "deviceCodename": "ranchu;",
                    "osName": "Android",
                    "osVersion": "14"
                }
            }
        }),
        "method": "POST",
        "headers": {
            "user-agent": ANDROID_REQ_UA
        }
    }).then(r => {r.json().then(r => {
        try {
            visitorId = r.responseContext.visitorData
            yt2009exports.writeData("visitor", visitorId)
            if(config.env == "dev") {
                let msg = [
                    `[EXTRA_RISK EXP/DEV] got ANDROID visitor:`,
                    visitorId,
                    "\n"
                ].join(" ")
                console.log(msg)
            }
            // if not signed in, bind to visitor id
            if(!yt2009androidsignin.needed()) {
                createPot(visitorId)
            } else {
                // bind to datasyncid
                yt2009androidsignin.getDatasyncId((id) => {
                    createPot(id)
                })
            }
        }
        catch(error){}
    })})
}

function createPot(visitorId) {
    yt2009pot.generatePo(visitorId, (data) => {
        yt2009exports.writeData("potBytes", data.encryptData)
        yt2009exports.writeData("potKey", data.backup)
        if(config.env == "dev") {
            let msg = [
                "generated pot:",
                "encryptdata - " + data.encryptData.toString("hex"),
                "backup - " + data.backup.toString("hex"),
                "valid for (s) - " + data.valid
            ].join("\n")
            console.log(msg + "\n")
        }
        // regenerate pot close to end of validity
        setTimeout(() => {
            createPot(visitorId)
        }, (data.valid - 1800) * 1000)
    })
}

const watchpage_code = fs.readFileSync("../watch.html").toString();
const watchpage_feather = fs.readFileSync("../watch_feather.html").toString()
let cache = require("./cache_dir/video_cache_manager")
let yt2009userratings = require("./cache_dir/rating_cache_manager");
const yt2009androidsignin = require("./yt2009androidsignin");
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
let sups = []

module.exports = {
    "innertube_get_data": function(id, callback, pullChannelEarly) {
        let useAndroidPlayer = true;

        let timer = 0;
        let timingInterval;
        if(devTimings) {
            timingInterval = setInterval(() => {
                timer += 0.1
                if(timer >= 2) {
                    clearInterval(timingInterval)
                }
            }, 100)
        }
        function stopTimer() {
            if(devTimings) {
                clearInterval(timingInterval)
            }
        }

        if(JSON.stringify(innertube_context) == "{}") {
            innertube_context = constants.cached_innertube_context
            api_key = this.get_api_key()
        }

        let rHeaders = JSON.parse(JSON.stringify(constants.headers))
        if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
            let d = yt2009signin.getData().yAuth
            rHeaders.Authorization = `Bearer ${d}`
        }

        let callbacksRequired = 2;
        if(config.data_api_key && useAndroidPlayer) {
            callbacksRequired++
            // some category ids match 2009 ids but not all
            const dataApiCategoryIds = {
                1: "Film & Animation",
                2: "Autos & Vehicles",
                10: "Music",
                15: "Pets & Animals",
                17: "Sports",
                18: "Short Movies",
                19: "Travel & Events",
                20: "Gaming",
                21: "Videoblogging",
                22: "People & Blogs",
                23: "Comedy",
                24: "Entertainment",
                25: "News & Politics",
                26: "Howto & Style",
                27: "Education",
                28: "Science & Technology",
                29: "Nonprofits & Activism",
                30: "Movies",
                34: "Comedy"
            }
            let url = [
                `https://www.googleapis.com/youtube/v3/videos?part=snippet`,
                `&id=${id}&key=${config.data_api_key}`
            ].join("")
            fetch(url, {
                "headers": constants.headers,
                "method": "GET"
            }).then(r => {try {r.json().then(r => {
                if(!r.error && r.items && r.items[0]
                && r.items[0].snippet.categoryId) {
                    let s = r.items[0].snippet
                    let c = s.categoryId
                    combinedResponse.category = dataApiCategoryIds[c]
                                              || "People & Blogs";
                    if(s.publishedAt) {
                        combinedResponse.publishDate = s.publishedAt
                    }
                }
                callbacksMade++
                if(callbacksMade == callbacksRequired) {
                    callback(combinedResponse)
                    stopTimer()
                }
            })}catch(error){
                console.log(error)
                callbacksMade++
                if(callbacksMade == callbacksRequired) {
                    callback(combinedResponse)
                    stopTimer()
                }
            }})
        }
        let callbacksMade = 0;
        let combinedResponse = {}
        fetch(`https://www.youtube.com/youtubei/v1/next?prettyPrint=false`, {
            "headers": signedInNext ? rHeaders : constants.headers,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "autonavState": "STATE_OFF",
                "captionsRequested": false,
                "contentCheckOk": true,
                "context": innertube_context,
                "playbackContext": {"vis": 0, "lactMilliseconds": "1"},
                "racyCheckOk": true,
                "videoId": id
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            if(devTimings) {
                console.log("/next received", timer)
            }
            for(let i in r) {
                combinedResponse[i] = r[i]
            }
            callbacksMade++
            if(callbacksMade == callbacksRequired) {
                callback(combinedResponse)
                stopTimer()
            }
        })})

        let playerContext = JSON.parse(JSON.stringify(innertube_context))
        if(useAndroidPlayer) {
            playerContext = {
                "client": {
                    "hl": "en",
                    "clientName": "ANDROID",
                    "clientVersion": "20.51.39",
                    "deviceMake": "Google",
                    "deviceModel": "Android SDK built for x86",
                    "deviceCodename": "ranchu;",
                    "osName": "Android",
                    "osVersion": "10",
                    "mainAppWebInfo": {
                        "graftUrl": "/watch?v=" + id
                    }
                }
            }
        }
        rHeaders["user-agent"] = ANDROID_REQ_UA
        function onPlayerReceived(r) {
            if(devTimings) {
                console.log("/player received", timer)
            }
            if(useAndroidPlayer) {
                if(r.streamingData) {
                    yt2009exports.extendWrite("players", id, r)
                }
                setTimeout(() => {
                    if(yt2009exports.read().players[id]) {
                        yt2009exports.delete("players", id)
                    }
                }, 1000 * 60 * 60)
                combinedResponse.freezeSync = true;
                // ^ overriden when category pull done successfully
            }
            if(r.videoDetails
            && r.videoDetails.channelId
            && pullChannelEarly) {
                const yt2009channels = require("./yt2009channels")
                yt2009channels.main({
                    "path": "/channel/" + r.videoDetails.channelId,
                    "headers": {"cookie": ""},
                    "query": {"f": 0, "earlyPull": true}
                }, 
                {"send": function(data) {
                    if(devTimings) {
                        console.log("early channel fetch success", timer)
                    }
                }}, "", true)
            }
            for(let i in r) {
                combinedResponse[i] = r[i]
            }
            callbacksMade++
            if(callbacksMade == callbacksRequired) {
                callback(combinedResponse)
                stopTimer()
            }
        }
        if(config.wyjeba_typu_onesie) {
            yt2009utils.wyjebaTypuOnesie(id, (player) => {
                onPlayerReceived(player)
            })
            return;
        }
        if(EXTRA_RISK_BLOCK) {
            rHeaders = {
                "user-agent": ANDROID_REQ_UA,
                "x-goog-visitor-id": visitorId,
                "accept-encoding": "",
                "priority": "u=0, i",
                "x-goog-api-format-version": "2",
                "content-type": "application/x-protobuf"
            }
            if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
                let d = yt2009signin.getData().yAuth
                rHeaders.Authorization = `Bearer ${d}`
            }
            const url = [
                `https://youtubei.googleapis.com/youtubei/v1/player`,
                `?inline=1&id=${id}`
            ].join("")
            yt2009utils.craftPlayerProto(id, (pbmsg) => {
                fetch(url, {
                    "headers": rHeaders,
                    "method": "POST",
                    "body": pbmsg,
                    "agent": yt2009utils.createFetchAgent()
                }).then(r => {r.buffer().then(r => {
                    //fs.writeFileSync("./test", r)
                    let player = yt2009utils.protoportPlayer(r)
                    onPlayerReceived(player)
                })})
            })
            return;
        }
        fetch(`https://www.youtube.com/youtubei/v1/player?prettyPrint=false`, {
            "headers": rHeaders,
            "referrer": `https://www.youtube.com/`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "context": playerContext,
                "playbackContext": {"vis": 0, "lactMilliseconds": "1"},
                "videoId": id,
                "racyCheckOk": true,
                "contentCheckOk": true
            }),
            "method": "POST",
            "mode": "cors",
            "agent": yt2009utils.createFetchAgent()
        }).then(r => {r.json().then(r => {
            onPlayerReceived(r)
        })})
    },

    "fetch_video_data": function(
        id, callback, userAgent, userToken, useFlash,
        resetCache, disableDownload, pullChannelEarly
    ) {
        let waitForOgv = false;

        // if firefox<=25 wait for ogg, otherwise callback mp4
        if((userAgent || "").includes("Firefox/")) {
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

            if(!fs.existsSync(`../assets/${id}.mp4`)
            && !disableDownload
            && !v.live) {
                yt2009utils.saveMp4(id, (path => {}))
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

            let fetchesCompleted = 0;
            let fetchesRequired = 3;

            let data = {}

            let time = 0;
            let x;
            if(devTimings) {
                x = setInterval(function() {
                    time += 0.1
                    if(time >= 2) {
                        clearInterval(x)
                    }
                }, 100)
            }

            this.innertube_get_data(id, (videoData => {
                if(devTimings) {
                    console.log("innertube pulls", time)
                }
                try {
                    data.title = videoData.videoDetails.title
                }
                catch(error) {
                    let defaultError = "This video is unavailable."
                    let displayError = defaultError
                    if(videoData.playabilityStatus
                    && videoData.playabilityStatus.status == "ERROR") {
                        try {
                            displayError = videoData.playabilityStatus
                                           .errorScreen
                                           .playerErrorMessageRenderer
                            if(displayError.subreason) {
                                displayError = displayError.subreason
                                                           .simpleText;
                            } else if(videoData.playabilityStatus.reason) {
                                displayError = videoData.playabilityStatus
                                                        .reason
                            } else {
                                displayError = defaultError
                            }
                        }
                        catch(error) {}
                    }
                    if(!displayError) {displayError = defaultError;}
                    data.error = displayError
                    callback(data)
                    return;
                }

                let isLive = videoData.videoDetails.isLive
                data.live = isLive
                // don't cache if live playback as it could end
                if(data.live) {
                    data.freezeCache = true;
                }
                /*if(videoData.videoDetails.isLive) {
                    callback(false)
                    return;
                }*/

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
                    let secondary = videoData.contents.twoColumnWatchNextResults
                                             .results.results.contents;
                    secondary = secondary.filter(s => {
                        return s.videoSecondaryInfoRenderer
                    })[0]
                    if(secondary) {
                        // has a renderer to try and get an avatar from
                        let owner = secondary.videoSecondaryInfoRenderer.owner
                                             .videoOwnerRenderer
                        if(owner.thumbnail) {
                            // normal avatar
                            data.author_img = owner.thumbnail
                                                   .thumbnails[1].url;
                            data.author_img = yt2009utils.saveAvatar(
                                data.author_img
                            )
                        } else if(owner.avatarStack
                        && owner.avatarStack.avatarStackViewModel
                        && owner.avatarStack.avatarStackViewModel.avatars) {
                            // avatarStack comes up instead of thumbnail
                            // if multiple creators are "authors" of the video
                            // example: http://youtu.be/Ut41eePtfBk
                            try { 
                                let f = owner.avatarStack.avatarStackViewModel
                                             .avatars[0]
                                data.author_img = f.avatarViewModel.image
                                                    .sources[0].url
                            }
                            catch(error) {
                                console.log(error)
                                data.author_img = "default"
                            }
                        } else {
                            // otherwise put a default avatar
                            data.author_img = "default"
                        }
                    } else {
                        data.author_img = "default"
                    }
                    
                }
                catch(error) {
                    data.author_img = "default"
                }
                if(videoData.microformat
                && videoData.microformat.playerMicroformatRenderer
                && videoData.microformat.playerMicroformatRenderer.uploadDate) {
                    data.upload = videoData.microformat.playerMicroformatRenderer
                                           .uploadDate
                    data.confirmedTrueUpload = true;
                    // freezecache if less than a week old
                    // to allow flow of new comments and interactions
                    let dUnix = new Date(data.upload).getTime()
                    if(Date.now() - oneWeek < dUnix) {
                        data.freezeCache = true;
                    }
                } else if(videoData.publishDate) {
                    data.upload = videoData.publishDate
                    data.confirmedTrueUpload = true;
                    // freezecache same as ^^
                    let dUnix = new Date(data.upload).getTime()
                    if(Date.now() - oneWeek < dUnix) {
                        data.freezeCache = true;
                    }
                } else {
                    try {
                        let contents = videoData.contents.twoColumnWatchNextResults
                                       .results.results.contents
                                       .filter(s => {
                                           return s.videoPrimaryInfoRenderer
                                       })[0]
                        data.upload = contents.videoPrimaryInfoRenderer
                                      .dateText.simpleText
                        if(data.upload.includes(" on ")) {
                            data.upload = data.upload.split(" on ")[1]
                        }
                        if(data.upload.includes(" ago")) {
                            // relative date (streams etc)
                            data.upload = yt2009utils.relativeToAbsoluteApprox(
                                data.upload
                            )
                        }
                    }
                    catch(error) {
                        data.upload = new Date().toISOString()
                    }
                }
                data.tags = videoData.videoDetails.keywords || [];
                data.related = []
                data.length = parseInt(videoData.videoDetails.lengthSeconds)
                if(videoData.microformat) {
                    try {
                        data.category = videoData.microformat
                                        .playerMicroformatRenderer.category
                    }
                    catch(error) {
                        data.category = "People & Blogs"
                    }
                } else if(videoData.category) {
                    data.category = videoData.category;
                } else {
                    data.category = "People & Blogs"
                }
                
                if(videoData.playabilityStatus
                && videoData.playabilityStatus.status == "LOGIN_REQUIRED") {
                    data.restricted = true
                    if(config.env == "dev") {
                        console.log(`fetching ${id} returned LOGIN_REQUIRED`)
                    }
                }

                if(videoData.freezeSync && !videoData.category) {
                    data.freezeSync = true;
                }

                // unplayable check (country restriction/members only)
                // still gets data
                if(videoData.playabilityStatus
                && videoData.playabilityStatus.status == "UNPLAYABLE") {
                    data.unplayable = true;
                }

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
                if(JSON.stringify(videoData).includes("richGridRenderer")) {
                    try {
                        related = videoData.contents.twoColumnWatchNextResults
                                  .secondaryResults.secondaryResults.results[0]
                                  .richGridRenderer.contents
                    }
                    catch(error) {}
                }
                if(related[1] && related[1].itemSectionRenderer
                && related[1].itemSectionRenderer.contents) {
                    related = related[1].itemSectionRenderer.contents
                }
                let viewmodelViewCountFails = []
                related.forEach(video => {
                    if(video.lockupViewModel
                    && video.lockupViewModel.contentType == "LOCKUP_CONTENT_TYPE_VIDEO") {
                        // viewmodel related videos
                        video = video.lockupViewModel;
                        let metadata = video.metadata.lockupMetadataViewModel;
                        let id = video.contentId
                        let title = metadata.title.content
                        let creatorUrl = "UC" + JSON.stringify(video)
                                                .split(`browseId":"UC`)[1]
                                                .split(`"`)[0];
                        let creatorHandle = null;
                        try {
                            let tc = JSON.stringify(video)
                                     .split(`canonicalBaseUrl":"/@`)[1]
                                     .split(`"`)[0];
                            if(tc) {
                                creatorHandle = tc;
                            }
                        }
                        catch(error) {}
                        let metadataParts = []
                        let mrPath = metadata.metadata.contentMetadataViewModel
                                             .metadataRows;
                        mrPath.forEach(r => {
                            if(r.metadataParts) {r.metadataParts.forEach(p => {
                                try {metadataParts.push(p.text.content)}
                                catch(error){}
                            })}
                        })
                        let viewCount = metadataParts.filter(s => {
                            return s.includes(" views")
                        })[0]
                        if(viewCount) {
                            viewCount = yt2009utils.approxSubcount(
                                viewCount.split(" ")[0]
                            ) + " views"
                        } else {
                            viewCount = "0 views"
                        }
                        try {
                            let tvc = video.rendererContext
                                      .accessibilityContext.label
                                      .split(" views");
                            tvc = tvc[viewCount.length - 2].split(" ");
                            tvc = tvc[viewCount.length - 1] + " views"

                            // full viewcount in accessibility data, use that
                            if(tvc && !isNaN(parseInt(tvc.split(" ")[0]))) {
                                viewCount = tvc;
                            }
                        }
                        catch(error){
                            viewmodelViewCountFails.push(id)
                            let bvc = viewCount.split(" ")[0]
                            let count = yt2009utils.countBreakup(bvc)
                            if(bvc.includes("No")) {
                                count = "0"
                            }
                            viewCount = count + " views"
                        }
                        let creatorName = metadataParts[0]
                        let upload = metadataParts[2]
                        let time = "1:00"
                        try {
                            video.contentImage.thumbnailViewModel
                            .overlays.forEach(o => {
                                if(o.thumbnailOverlayBadgeViewModel) {
                                    time = o.thumbnailOverlayBadgeViewModel
                                            .thumbnailBadges[0]
                                            .thumbnailBadgeViewModel
                                            .text;
                                }
                            })
                        }
                        catch(error){}
                        if(!time
                        || time.toLowerCase().includes("live")
                        || time.toLowerCase().includes("short")
                        || time.toLowerCase().includes("premier")) return;
                        data.related.push({
                            "id": id,
                            "title": title,
                            "views": viewCount,
                            "length": time,
                            "creatorName": creatorName,
                            "creatorUrl": "/channel/" + creatorUrl,
                            "creatorHandle": creatorHandle,
                            "uploaded": upload
                        })
                        return;
                    }
                    if(!video.compactVideoRenderer && !video.richItemRenderer) return;

                    let gridResult = false;
                    if(video.richItemRenderer) {
                        gridResult = true;
                    }

                    video = video.compactVideoRenderer || video.richItemRenderer;

                    if(gridResult
                    && (!video.content
                    || !video.content.videoRenderer)) return;

                    if(gridResult) {video = video.content.videoRenderer}

                    let creatorName = ""
                    let creatorUrl = ""
                    video.shortBylineText.runs.forEach(run => {
                        creatorName += run.text;
                        creatorUrl += run.navigationEndpoint
                                        .browseEndpoint.canonicalBaseUrl
                    })

                    let creatorHandle = null;
                    if(creatorUrl.startsWith("/@")) {
                        creatorHandle = creatorUrl.split("/@")[1]
                    }

                    if(!creatorUrl.startsWith("/c/")
                    && !creatorUrl.startsWith("/user/")
                    && !creatorUrl.startsWith("/channel/")) {
                        creatorUrl = "/channel/" + video.shortBylineText.runs[0]
                                                    .navigationEndpoint
                                                    .browseEndpoint.browseId
                    }

                    if(!video.lengthText
                    || !video.lengthText.simpleText
                    || video.lengthText.simpleText.toLowerCase()
                            .includes("live")
                    || video.lengthText.simpleText.toLowerCase()
                            .includes("short")
                    || video.lengthText.simpleText.toLowerCase()
                            .includes("premier")) return;
                    if(video.viewCountText && video.viewCountText.simpleText
                    && video.viewCountText.simpleText.includes("No ")) {
                        video.viewCountText.simpleText = "0 views"
                    }
                    try {
                        data.related.push({
                            "title": video.title.simpleText,
                            "id": video.videoId,
                            "views": video.viewCountText.simpleText,
                            "length": video.lengthText.simpleText,
                            "creatorName": creatorName,
                            "creatorUrl": creatorUrl,
                            "creatorHandle": creatorHandle,
                            "uploaded": video.publishedTimeText.simpleText
                        })
                    }
                    catch(error) {
                        
                    }
                })
                if(viewmodelViewCountFails.length >= 1 && config.data_api_key) {
                    fetchesRequired++
                    // fallback fetch full viewcount through data api
                    if(config.env == "dev") {
                        console.log(
                            "viewmodel related lack full viewcounts",
                            "// data api fetch!!"
                        )
                    }
                    let dataApiUrl = [
                        "https://www.googleapis.com/youtube/v3/videos",
                        "?part=statistics,snippet&id=" + viewmodelViewCountFails.join(),
                        "&key=" + config.data_api_key
                    ].join("")
                    fetch(dataApiUrl, {
                        "headers": constants.headers,
                        "method": "GET"
                    }).then(r => {try {r.json().then(r => {
                        if(!r.error && r.items) {
                            r.items.forEach(v => {
                                let rel = data.related.filter(s => {
                                    return s.id == v.id
                                })[0]
                                let i = data.related.indexOf(rel)
                                if(i !== null && i !== undefined && i >= 0
                                && v.statistics && v.statistics.viewCount) {
                                    let vc = parseInt(v.statistics.viewCount)
                                    vc = yt2009utils.countBreakup(vc)
                                    vc += " views"
                                    data.related[i].views = vc;
                                }
                                if(i !== null && i !== undefined && i >= 0
                                && v.snippet && v.snippet.title) {
                                    data.related[i].title = v.snippet.title
                                }
                            })
                        }
                        fetchesCompleted++;
                        if(devTimings) {
                            console.log("data api related fetch", time)
                        }
                        if(fetchesCompleted >= fetchesRequired) {
                            callback(data)
                        }
                    })}catch(error){
                        console.log(error)
                        if(devTimings) {
                            console.log("data api related fetch", time)
                        }
                        fetchesCompleted++;
                        if(fetchesCompleted >= fetchesRequired) {
                            callback(data)
                        }
                    }})
                }

                // save channel image

                let fname = data.author_img.split("/")
                            [data.author_img.split("/").length - 1]
                if(!fs.existsSync(`../assets/${fname}.png`)
                && data.author_img !== "default") {
                    data.author_img = yt2009utils.saveAvatar(data.author_img, false)
                }
                fetchesCompleted++;
                if(devTimings) {
                    console.log("avatar", time)
                }
                if(fetchesCompleted >= fetchesRequired) {
                    callback(data)
                }

                // qualities
                data.qualities = []

                if(yt2009utils.isUnsupportedNode()
                && videoData.streamingData
                && videoData.streamingData.adaptiveFormats) {
                    // unsupported node can't load adaptiveFormats
                    // so don't even try
                    videoData.streamingData.adaptiveFormats = []
                }

                if(!videoData.streamingData) {
                    videoData.streamingData = {}
                }
                if(!videoData.streamingData.adaptiveFormats) {
                    videoData.streamingData.adaptiveFormats = [
                        {"qualityLabel": "360p", "url": "dummy"}
                    ]
                }
                data.extendedItagData = []
                videoData.streamingData.adaptiveFormats.forEach(quality => {
                    if(quality.qualityLabel) {
                        let xtags = false;
						if(quality.xtags) {
                            try {
                                xtags = playerProto.xtags.deserializeBinary(
                                    quality.xtags
                                ).toObject()
                            }
                            catch(error){}
                        }
                        if(!config.max_1080
                        || (config.max_1080 && quality.height <= 1080)) {
                            data.extendedItagData.push([
                                quality.itag,quality.qualityLabel,quality.height,
                                quality.xtags,quality.mimeType,xtags
                            ])
                        }
                    }
                    if(quality.qualityLabel) {
                        quality.qualityLabel = quality.qualityLabel
                                               .replace("p50", "p")
                                               .replace("p60", "p");
                    }
                    if(quality.qualityLabel
                    && !data.qualities.includes(quality.qualityLabel)
                    && quality.url
                    && quality.mimeType
                    && quality.mimeType.includes("avc")) {
                        data.qualities.push(quality.qualityLabel)
                    } else if(quality.qualityLabel
					&& !data.qualities.includes(quality.qualityLabel)
					&& quality.xtags) {
						let xtags = false;
						try {
							xtags = playerProto.xtags.deserializeBinary(
								quality.xtags
							).toObject()
						}
						catch(error){}
						let isSr = false;
						if(xtags && xtags.partList) {
							xtags.partList.forEach(p => {
								if(p.key == "sr" && p.value == "1") {
									isSr = true;
								}
							})
						}
						if(isSr) {
							if(!data.superResolutions) {
								data.superResolutions = []
							}
							data.superResolutions.push([
								quality.qualityLabel,
								quality.itag,
								quality.mimeType
							])
						}
					}
                })


                // disabled comments
                if(JSON.stringify(videoData).includes(
                    "/answer/9706180"
                )) {
                    data.commentsDisabled = true;
                }
                
                // save mp4/ogv

                if((!fs.existsSync(`../assets/${id}.mp4`) && !disableDownload)) {
                    function on_mp4_save_finish(path) {
                        if(waitForOgv) {
                            child_process.exec(
                                yt2009templates.createFffmpegOgg(id),
                                (error, stdout, stderr) => {
                                    data.mp4 = `/assets/${id}`
                                    fetchesCompleted++;
                                    if(fetchesCompleted >= fetchesRequired) {
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
                            if(fetchesCompleted >= fetchesRequired) {
                                callback(data)
                            }
                            if(!data.freezeCache) {
                                cache.write(id, data)
                            }
                        }
                    }

                    // ytdl
                    if(!waitForOgv) {
                        data.pMp4 = "/get_video?video_id=" + id + "/mp4"
                        if(!isLive) {yt2009utils.saveMp4(id, (path => {}))}
                        on_mp4_save_finish(`../assets/${id}`)
                    } else if(!isLive) {
                        yt2009utils.saveMp4(id, (path => {
                            on_mp4_save_finish(path)
                        }))
                    }
                    
                    
                } else {
                    data.mp4 = `/assets/${id}`
                    fetchesCompleted++;
                    if(fetchesCompleted >= fetchesRequired) {
                        callback(data)
                    }
                    if(!data.freezeCache) {
                        cache.write(id, data);
                    }
                }
            }), pullChannelEarly)

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
                    if(devTimings) {
                        console.log("comments pull", time)
                    }
                    if(fetchesCompleted >= fetchesRequired) {
                        callback(data)
                    }
                }, true
            )
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

        let time = 0;
        let x;
        if(devTimings) {
            x = setInterval(function() {
                time += 0.1
                if(time >= 3) {
                    clearInterval(x)
                }
            }, 100)
        }

        // basic data
        // flags
        let flags = ""
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

        // safety mode
        if(req.headers.cookie
        && req.headers.cookie.includes("safety_mode=true")) {
            callback("safetymode")
            return;
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

        // sabr
        let useSabr = false;
        let sabrBaseUrl = ""
        if(flags.includes("exp_sabr")
		&& !(req.query&&req.query.unsabr=="1")) {
            useSabr = true;
            sabrBaseUrl = yt2009sabr.initPlaybackSession(data.id, data.qualities)
        }

        // disable playback mode picker on unsupported node hosts
        if(yt2009utils.isUnsupportedNode()) {
            code = code.replace(
                `//yt2009-unsupport`,
                `var sabrHostUnsupported = true;`
            )
        }

        // put tags whereeever needed in html5 for custom params
        let html5PlayerTags = [
            "yt:crop=16:9",
            "yt:stretch=4:3",
            "yt:stretch=16:9",
            "yt:bgcolor=#",
            "yt:cc=on",
            "yt:quality=high"
        ]
        let playerModifyingTags = data.tags.filter(s => {
            return (html5PlayerTags.includes(s) && !s.includes("\"")
                 || s.startsWith("yt:bgcolor="))
        })
        if(playerModifyingTags.length >= 1 && !useFlash) {
            let modifiersCode = playerModifyingTags.join(",")
            code = code.replace(
                `//yt2009-html5-modifiers`,
                `try{window.initModifiers("${modifiersCode}")}catch(error){}`
            )
        }

        // useragent
        let userAgent = req.headers["user-agent"]

        // quality list
        let showHQ = false;
		
		if(data.superResolutions
		&& data.superResolutions.length >= 1
		&& useSabr
		&& flags.includes("exp_sabr_enable_superresolution")) {
			data = JSON.parse(JSON.stringify(data)) //detach data
			data.superResolutions.forEach(sr => {
				if(!data.qualities.includes(sr[0])) {
					data.qualities.push(sr[0])
				}
			})
		}
		
		// modern qualitylist
        if(data.qualities) {
            qualityList = data.qualities;
        } else {
            qualityList = []
        }

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

        // chapter time marks
        let chapters = []
        let chapterLabels = []
        let disableChapters = false;
        if(req.headers.cookie
        && req.headers.cookie.includes("disable_chapters")) {
            disableChapters = true;
        }
        data.description.split("\n").forEach(line => {
            let timestamps = line.split(" ").filter(s => {
                return s.includes(":")
                    && !isNaN(parseInt(s.split(":")[0]))
                    && !isNaN(parseInt(s.split(":")[1]))
                    && s.split(":")[0] == s.split(":")[0].replace(/[^0-9\,]/g, "")
                    && s.split(":")[1] == s.split(":")[1].replace(/[^0-9\,]/g, "")
                    && (line.trim().startsWith(s) || line.trim().endsWith(s))
            })
            if(timestamps.length >= 1) {
                timestamps.forEach(t => {
                    chapters.push(yt2009utils.time_to_seconds(t))
                    chapterLabels.push(line.split("\"").join("&quot;"))
                })
            }
        })
        if(chapters.length >= 1 && !useFlash && !disableChapters) {
            let timestamps = JSON.stringify(chapters)
            let labels = JSON.stringify(chapterLabels)
            code = code.replace(
                `//yt2009-html5-chapters`,
                `initChapterMarks(${timestamps},${data.length},${labels})`
            )
        }

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

        // auto hd
        let autoHQ = false;
        if((req.headers.cookie
        && req.headers.cookie.includes("playback_quality=2"))
        || (req.query.fmt
        && (req.query.fmt == "18" || req.query.fmt == "22"))) {
            let startQuality = false;
            if(data.qualities.includes("480p")) {
                autoHQ = "/get_480?video_id=" + data.id
                autoHQ += yt2009trusted.urlContext(
                    data.id, "PLAYBACK_HQ", (data.length >= 60 * 30)
                )
                if(!data.qualities.includes("720p")) {
                    code = code.replace(
                        `<!--yt2009_hq_btn-->`,
                        `<span class="hq enabled"></span>`
                    )
                }
                startQuality = "480p"
            }
            if(data.qualities.includes("720p")) {
                autoHQ = "/exp_hd?video_id=" + data.id
                autoHQ += yt2009trusted.urlContext(
                    data.id, "PLAYBACK_HD", (data.length >= 60 * 30)
                )
                code = code.replace(
                    `<!--yt2009_hq_btn-->`,
                    `<span class="hq hd enabled"></span>`
                )
                startQuality = "720p"
            }
            if(data.qualities.includes("1080p")
            && req.headers.cookie
            && req.headers.cookie.includes("hd_1080")) {
                startQuality = "1080p"
            }

            // start saving in advance for quicker video load for end user
            if(startQuality && !data.live && !useSabr) {
                yt2009utils.saveMp4_android(data.id, () => {}, false, startQuality)
            }
        }

        // unplayable state
        if(data.unplayable && !useFlash) {
            code = code.replace(
                `//yt2009-unplay`,
                `showUnrecoverableError("This video is unavailable.")`
            )
        }

        // show notice on disabled comments
        if(data.commentsDisabled) {
            code = code.replace(
                `<!--yt2009_relay_comment_form-->`,
                yt2009templates.disabledCommentsNotice
            )
        }

        // login_simulate comments
        if(req.headers.cookie.includes("login_simulate")
        && !req.headers.cookie.includes("relay_key")) {
            code = code.replace(
                `<!--yt2009_relay_comment_form-->`,
                yt2009templates.videoCommentPost(data.id)
            )
        }

        let totalCommentCount = 0;
        let vCustomComments = []
        if(yt2009mobilehelper.hasLogin(req)) {
            let comments = yt2009mobilehelper.pullCommentsByUser(req)
            comments.filter(s => s.video == data.id).forEach(c => {
                vCustomComments.push({
                    "author": c.name,
                    "time": new Date(c.date).getTime(),
                    "text": c.content,
                    "rating": 0,
                    "ratingSources": {}
                })
            })


            let useRelated = false;
            if(req.headers.cookie
            && req.headers.cookie.includes("pchelper_flags=")) {
                let pchFlags = req.headers.cookie
                               .split("pchelper_flags=")[1]
                               .split(";")[0];
                if(pchFlags.includes("user_related")) {
                    useRelated = true;
                }
            }
            if(useRelated) {
                let scriptName = "/assets/site-assets/yt2009pchelperrelated.js"
                code = code.replace(
                    `<!--yt2009_pchelper_related-->`,
                    `<script src="${scriptName}"></script>`
                )
            }
        }
        if(custom_comments[data.id]) {
            try {
                custom_comments.forEach(c => {vCustomComments.push(c)})
            }
            catch(error){}
        }
        if(vCustomComments.length >= 1) {
            let commentsHTML = ""
            vCustomComments.forEach(comment => {
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
                    if(devTimings) {
                        let progress = `${callbacksMade}/${requiredCallbacks}`
                        console.log(`wayback (${progress})`, time)
                    }
                    callbacksMade++;
                    if(requiredCallbacks == callbacksMade) {
                        render_endscreen();
                        fillFlashIfNeeded();
                        callback(code)
                    }
                }, req.query.resetcache == 1)
            }, 500)
        }
        if(flags.includes("homepage_contribute")
        && uploadJS.getFullYear() <= 2010
        && !data.freezeSync) {
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
                fs.writeFile("./cache_dir/watched_now.json",
                            JSON.stringify(featured_videos),
                            (e) => {})
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
            if(channelIcon.startsWith("/assets/")
            && !fs.existsSync(".." + channelIcon)) {
                code = code.replace(
                    "channel_icon",
                    "/avatar_wait?av=" + channelIcon
                )
            }
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
        let swfFilePath = "/watch.swf"
        let swfArgPath = "video_id"
        if(req.headers.cookie.includes("alt_swf_path")) {
            swfFilePath = decodeURIComponent(
                req.headers.cookie.split("alt_swf_path=")[1].split(";")[0]
            )
            if(!swfFilePath) {swfFilePath = "/watch.swf"}
            swfFilePath = swfFilePath.split(`"`).join(`%22`)
        }
        if(req.headers.cookie.includes("alt_swf_arg")) {
            swfArgPath = decodeURIComponent(
                req.headers.cookie.split("alt_swf_arg=")[1].split(";")[0]
            )
            if(!swfArgPath) {
                swfArgPath = "video_id"
            }
            swfArgPath = swfArgPath.split(`"`).join(`%22`)
        }
        let flash_url = `${swfFilePath}?${swfArgPath}=${data.id}`
        if((req.headers["cookie"] || "").includes("f_h264")) {
            flash_url += "%2Fmp4" + yt2009trusted.urlShortContext(data.id)
        }
        let flashCompat = ""
        if(req.headers.cookie
        && req.headers.cookie.includes("f_compat=")) {
            flashCompat = req.headers.cookie.split("f_compat=")[1].split(";")[0]
            flash_url += "&rt=" + Date.now()
        }
        let flashCustomModules = {
            "iv": false,
            "cc": false
        }
        if(req.headers.cookie
        && req.headers.cookie.includes("f_civ=")) {
            flashCustomModules.iv = req.headers.cookie.split("f_civ=")[1].split(";")[0]
        }
        if(req.headers.cookie
        && req.headers.cookie.includes("f_ccc=")) {
            flashCustomModules.cc = req.headers.cookie.split("f_ccc=")[1].split(";")[0]
        }
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
        if(!useFlash && !data.live && !useSabr) {
            let tcData = ""
            if(config.trusted_context) {
                tcData = "&" + yt2009trusted.generateContext(
                    data.id, "PLAYBACK_STD", (data.length >= 60 * 30)
                )
            }
            code = code.replace(
                "mp4_files", 
                `<source src="${autoHQ || "/get_video?video_id=" + data.id + "/mp4" + tcData}" type="video/mp4"></source>
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
        } else if(!useFlash && data.live) {
            code = code.replace(
                `//yt2009-pmp4`,
                `initAsLive("${data.id}");
                initLiveChat("${data.id}");
                document.getElementById("watch-other-vids").style.marginTop = "-25px"`
            )
            code = code.replace(
                `<!--yt2009_livecard-->`,
                yt2009templates.livechatTemplate
            )
        } else if(!useFlash && !data.live && useSabr) {
            code = code.replace(
                "//yt2009-pmp4",
                `showLoadingSprite();
                var sabrBase = "${sabrBaseUrl}";
                initAsSabr();`
            )
            code = code.replace(
                `0:00 / 0:00`,
                `0:00 / ${yt2009utils.seconds_to_time(data.length)}`
            )
        }
        code = code.replace(
            "video_url",
            `http://www.youtube.com/watch?v=${data.id}`
        )
        code = code.replace(
            "video_embed_link",
            `<object width=&quot;425&quot; height=&quot;344&quot;><param name=&quot;movie&quot; value=&quot;http://${config.ip}%3A${config.port}/watch.swf?video_id=${data.id}&quot;></param><param name=&quot;allowFullScreen&quot; value=&quot;true&quot;></param><param name=&quot;allowscriptaccess&quot; value=&quot;always&quot;></param><embed src=&quot;http://${config.ip}%3A${config.port}/watch.swf?video_id=${data.id}&quot; type=&quot;application/x-shockwave-flash&quot; allowscriptaccess=&quot;always&quot; allowfullscreen=&quot;true&quot; width=&quot;425&quot; height=&quot;344&quot;></embed></object>`
        )

        let description = yt2009utils.descriptionDistill(data.description, req);

        // markup descriptions - treat http and https as links
        let shortDescription = description.split("\n").slice(0, 3).join("<br>")
        let fullDescription = description.split("\n").join("<br>")

        let useRedir = flags.includes("yt_redir")

        // descriptions
        code = code.replace(
            "video_short_description",
            yt2009utils.markupDescription(shortDescription, useRedir)
        )
        code = code.replace(
            "video_full_description",
            yt2009utils.markupDescription(fullDescription, useRedir)
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

            // hide show more comments if less than 20
            if(data.comments.length < 20) {
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
                let presentedLikeCount = comment.likes
                if(!flags.includes("watch_modern_features")) {
                    presentedLikeCount = Math.floor((comment.likes / topLike) * 10)
                    if(topLike < 10) {
                        presentedLikeCount = comment.likes
                    }
                }
                if(presentedLikeCount >= 1000) {
                    code = code.replace(
                        `//yt2009-cmt-lik`,
                        `document.body.className += " extended-comment-likecount"`
                    )
                }
                
                if(isNaN(presentedLikeCount)) {presentedLikeCount = 0;}

                // comment id
                let id = comment.commentId || commentId(
                    comment.authorUrl, comment.content
                )

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

                let additionalContentHeader = []
                if(comment.pinned) {
                    additionalContentHeader.push(
                        "lang_watch_comment_pinned"
                    )
                }
                if(comment.hearted) {
                    additionalContentHeader.push(
                        "lang_watch_comment_hearted_prefix" + data.author_name
                    )
                }
                if(additionalContentHeader.length == 0) {
                    additionalContentHeader = false;
                } else {
                    additionalContentHeader = additionalContentHeader.join(" - ")
                    additionalContentHeader = " - " + additionalContentHeader
                }

                let commentHTML = yt2009templates.videoComment(
                    comment.authorUrl,
                    commentPoster,
                    commentTime,
                    commentContent,
                    flags,
                    true,
                    presentedLikeCount,
                    id,
                    comment.r,
                    (flags.includes("watch_modern_features")
                    && additionalContentHeader)
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

                    commentTime = yt2009utils.relativeTimeCreate(
                        commentTime, yt2009languages.get_language(req)
                    )

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
                if(data.comments.length < 20) {
                    code = code.replace("yt2009_hook_more_comments", "hid")
                }
                code = code.replace(`yt2009_comment_count`, totalCommentCount)
                code = code.replace(`<!--yt2009_add_comments-->`, comments_html)
                if(devTimings) {
                    let progress = `${callbacksMade}/${requiredCallbacks}`
                    console.log(`old comments (${progress})`, time)
                }
                callbacksMade++
                if(requiredCallbacks == callbacksMade) {
                    render_endscreen();
                    fillFlashIfNeeded();
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
            if(yt2009utils.time_to_seconds(video.length) >= 1800
            && data.length <= 1200) return;

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
                let vids = yt2009playlists.parsePlaylist(
                    playlistId, () => {}
                ).videos
                let hasCurrent = !!(vids.filter(s => {
                    return s.id == data.id
                })[0])
                if(!hasCurrent) {
                    throw "amogus";
                }
                vids.forEach(video => {
                    let playlistVideoHTML = yt2009templates.relatedVideo(
                        video.id,
                        video.title,
                        protocol,
                        "",
                        "",
                        video.uploaderUrl,
                        video.uploaderName,
                        flags,
                        playlistId,
                        (data.id == video.id)
                    )
                    playlistsHTML += playlistVideoHTML
                    index++;
                })
            }
            catch(error) {
                let classNames = [
                    "hid",
                    "yt2009_marking_fetch_playlist_client"
                ]
                if(error == "amogus") {
                    classNames.push("force_next")
                }
                classNames = classNames.join(" ")
                playlistsHTML += `<div class="${classNames}"></div>`
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
                    background-image: url(/player-imgs/endscreen-bg-opt.png);
                    overflow: hidden;
                    background-repeat: repeat-x;
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
            if((!flash_url.includes("/watch.swf")
            && !flash_url.includes("2010.swf"))
            || flashCompat.includes("endscreen")) return "";
            let rv_url = ""
            let related_index = 0;
            endscreen_queue.forEach(video => {
                if(related_index <= 7
                && encodeURIComponent(rv_url).length < 1700) {
                    if(!req.headers.cookie) {
                        req.headers.cookie = ""
                    }
                    req.headers.cookie += "; flash_url=" + flash_url
                    let thumbUrl = yt2009utils.getThumbUrl(video.id, req)
                    rv_url += `&rv.${related_index}.title=${
                        encodeURIComponent(video.title)
                    }`
                    rv_url += `&rv.${related_index}.thumbnailUrl=${
                        encodeURIComponent(thumbUrl)
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
        let tags = yt2009utils.distillTags(data.tags, req)
        tags.forEach(tag => {
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
        let rydCallbackSent = false;
        requiredCallbacks++;
        yt2009ryd.readWait(data.id, (rating) => {
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
                let ratingCount = code.split(
                    `id="defaultRatingMessage"><span class="smallText">`
                )[1].split(` lang_ratings_suffix`)[0]
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

            if(!rydCallbackSent) {
                rydCallbackSent = true;
                callbacksMade++;
                if(devTimings) {
                    let progress = `${callbacksMade}/${requiredCallbacks}`
                    console.log(`ryd (${progress})`, time)
                }
                if(requiredCallbacks == callbacksMade) {
                    render_endscreen();
                    fillFlashIfNeeded();
                    callback(code)
                }
            }
        })

        // allow_clientside_ryd -- time out serverside fetch of ryd
        // if it takes longer than 300ms
        // this includes the ~700-800ms of fetchVideoData
        // so by the timeout point, ryd is taking at least 1 second to respond
        if(flags.includes("allow_clientside_ryd")
        && !rydCallbackSent && !useFlash) {
            setTimeout(() => {
                if(!rydCallbackSent) {
                    rydCallbackSent = true;
                    callbacksMade++;
                    if(devTimings) {
                        let progress = `${callbacksMade}/${requiredCallbacks}`
                        console.log(`ryd (timeout) (${progress})`, time)
                    }
                    if(requiredCallbacks == callbacksMade) {
                        render_endscreen();
                        fillFlashIfNeeded();
                        callback(code)
                    }
                    code = code.replace(
                        `id="ratingMessage"`,
                        `id="ratingMessage" class="hid"`
                    )
                    code = code.split("4.5").join("0.0")
                    code = code.replace(
                        `//yt2009-rating`,
                        yt2009templates.clientsideRydScript
                    )
                }
            }, 300)
        }

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
                let vq = "2"
                if(flash_url.includes("2012.swf")
                || flash_url.includes("2010.swf")) {
                    vq = "hd1080"
                }
                if(autoHQ) {
                    flash_url += "&vq=" + vq
                }
                let enableModules = !flashCompat.includes("modules")
                let customModulesPath = ""
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
                && flash_url.includes("/watch.swf")
                && !flashCompat.includes("formats")) {
                    // create format maps and urls for the 2009 player
                    // 22 - hd720
                    // 35 - "large" - hq - 480p
                    // 5 - standard quality, other numbers may have worked too
                    let fmtMap = ""
                    let fmtUrls = ""
                    if(qualityList.includes("720p")) {
                        fmtMap += "22/2000000/9/0/115"
                        fmtUrls += `22|http://${config.ip}:${config.port}/exp_hd?video_id=${data.id}`
                        fmtUrls += yt2009trusted.urlContext(
                            data.id, "PLAYBACK_HD", (data.length >= 60 * 30)
                        )
                    } else if(qualityList.includes("480p")) {
                        fmtMap += `35/0/9/0/115`
                        fmtUrls += `35|http://${config.ip}:${config.port}/get_480?video_id=${data.id}`
                        fmtUrls += yt2009trusted.urlContext(
                            data.id, "PLAYBACK_HQ", (data.length >= 60 * 30)
                        )
                    }
                    if(fmtMap.length > 0) {
                        fmtMap += ","
                        fmtUrls += ","
                    }
                    fmtMap += "5/0/7/0/0"
                    fmtUrls += `5|http://${config.ip}:${config.port}/get_video?video_id=${data.id}/mp4`
                    fmtUrls += yt2009trusted.urlContext(
                        data.id, "PLAYBACK_STD", (data.length >= 60 * 30)
                    )
                    flash_url += "&fmt_map=" + encodeURIComponent(fmtMap)
                    flash_url += "&fmt_url_map=" + encodeURIComponent(fmtUrls)
                }
                
                let ccModuleAs2 = encodeURIComponent(
                    `http://${config.ip}:${config.port}/subtitle-module.swf`
                )
                let ivModuleAs2 = encodeURIComponent(
                    `http://${config.ip}:${config.port}/iv_module.swf`
                )
                if(enableModules) {
                    flash_url += `&cc_module=${flashCustomModules.cc || ccModuleAs2}`
                    flash_url += `&iv_module=${flashCustomModules.iv || ivModuleAs2}`
                }

                // always_captions flash
                if(flags.includes("always_captions")) {
                    flash_url += "&cc_load_policy=1"
                } else {
                    flash_url += "&cc_load_policy=2"
                }

                // always_annotations flash
                if(flags.includes("always_annotations")) {
                    flash_url += "&iv_load_policy=1"
                } else {
                    flash_url += "&iv_load_policy=2"
                }

                flash_url += "&enablejsapi=1"

                if(req.query.resetcache) {
                    flash_url += "&resetcache=1"
                }

                if(flash_url.includes("cps2.swf")
                || flash_url.includes("2012.swf")) {
                    // the 2 odd ones that just won't work without this
                    flash_url += "&BASE_YT_URL=" + encodeURIComponent(
                        "http://" + config.ip + ":" + config.port + "/"
                    )
                }

                if(flash_url.includes("cps2.swf")) {
                    flash_url += "&iurl=" + encodeURIComponent(
                        "http://i.ytimg.com/vi/"
                      + data.id.substring(0,11)
                      + "/hqdefault.jpg"
                    )
                }

                // 2012 subtitles/annotations
                let cc3_module = ""
                let iv3_module = ""
                let endscreen_module = ""
                if(flash_url.includes("2012.swf")) {
                    cc3_module = "2012_subtitles3_module-vflX-PxNh.swf"
                    iv3_module = "2012_iv3_module-vfl7CyC10.swf"
                }
                if(flash_url.includes("2010.swf")) {
                    cc3_module = "2010_subtitles3_module-vfl183159.swf"
                    iv3_module = "2010_iv3_module-vfl183159.swf"
                    endscreen_module = "2010_endscreen-vfl183159.swf"
                }
                if(cc3_module && enableModules) {
                    flash_url += "&cc3_module=" + encodeURIComponent(
                        "http://" + config.ip + ":" + config.port
                        + "/alt-swf/modules/" + cc3_module
                    )
                }
                if(iv3_module && enableModules) {
                    flash_url += "&iv3_module=" + encodeURIComponent(
                        "http://" + config.ip + ":" + config.port
                        + "/alt-swf/modules/" + iv3_module
                    )
                }
                if(endscreen_module && enableModules) {
                    flash_url += "&endscreen_module=" + encodeURIComponent(
                        "http://" + config.ip + ":" + config.port
                        + "/alt-swf/modules/" + endscreen_module
                    )
                }

                // 2005 players: &l param containing video length in seconds
                // this enables seeking in those
                flash_url += "&l=" + data.length

                // chapters for 2009
                if(flash_url.includes("/watch.swf")
                && chapters.length >= 1
                && !disableChapters) {
                    flash_url += "&markers=" + chapters.join(",")
                }

                // 2009: pass keywords to enable player settings
                // such as yt:stretch=16:9
                if(flash_url.includes("/watch.swf")
                && data.tags && data.tags.length >= 1) {
                    let keywords = data.tags.join(",").split("&").join("")
                    flash_url += "&keywords=" + keywords
                }
                
                flash_url += render_endscreen_f()

                // final flash object
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
        || qualityList.includes("480p"))
        && !data.live
        && !useSabr) {
            let enableConnCheck = "";
            if(req.headers.cookie
            && req.headers.cookie.includes("playback_quality=0")) {
                enableConnCheck = yt2009templates.hqCheckConnection
            }

            let use720p = qualityList.includes("720p")
            code = code.replace(
                `<!--yt2009_style_hq_button-->`,
                yt2009templates.playerCssHDBtn   
            )

            let trustedContextData = false;
            if(config.trusted_context) {
                let hqContext = use720p ? "PLAYBACK_HD" : "PLAYBACK_HQ"
                trustedContextData = {
                    "sd": yt2009trusted.generateContext(
                        data.id, "PLAYBACK_STD", (data.length >= 60 * 30)
                    ),
                    "hq": yt2009trusted.generateContext(
                        data.id, hqContext, (data.length >= 60 * 30)
                    ),
                }
            }

            code = code.replace(
                `//yt2009-exp-hq-btn`,
                yt2009templates.playerHDBtnJS(
                    data.id, use720p, autoHQ,
                    trustedContextData, (data.length / 60)
                )
                + enableConnCheck
            )

            // 720p
            if(use720p) {
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq hd"></span>`)
            } else {
                // 480p
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq"></span>`)
            }
        } else if(!useFlash
        && (qualityList.includes("720p")
        || qualityList.includes("480p"))
        && data.live) {
            // hd buttons for live
            let use720p = qualityList.includes("720p")
            code = code.replace(
                `<!--yt2009_style_hq_button-->`,
                yt2009templates.playerCssHDBtn   
            )

            // js logic
            code = code.replace(
                `//yt2009-exp-hq-btn`,
                yt2009templates.playerHDLive(
                    data.id, use720p, autoHQ
                )
            )

            // 720p
            if(use720p) {
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq hd"></span>`)
            } else {
                // 480p
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq"></span>`)
            }
        } else if((!useFlash
        && (qualityList.includes("720p")
        || qualityList.includes("480p"))
        && useSabr)) {
            // hd buttons for sabr
            let use720p = qualityList.includes("720p")
            code = code.replace(
                `<!--yt2009_style_hq_button-->`,
                yt2009templates.playerCssHDBtn   
            )

            // js logic
            code = code.replace(
                `//yt2009-exp-hq-btn`,
                yt2009templates.playerHDSabr(
                    use720p, autoHQ, (data.length / 60), (
						(data.superResolutions
						&& data.superResolutions.length >= 1
						&& flags.includes("exp_sabr_enable_superresolution"))
						? data.superResolutions
						: false
					), (data.extendedItagData
                    && flags.includes("watch_modern_features")
                    ? data.extendedItagData : false)
                )
            )

            // 720p
            if(use720p) {
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq hd"></span>`)
            } else {
                // 480p
                code = code.replace(`<!--yt2009_hq_btn-->`, `<span class="hq"></span>`)
            }
        } else if(data.length >= 3600) {
            // no hd but check hour counter
            code = code.replace(
                `//yt2009-exp-hq-btn`,
                `seekbarRemoveWidth = 265;adjustSeekbarWidth();`
            )
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
                "captionsMain('auto');"
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

        // sup icon
        if(sups.includes(data.author_id)) {
            code = code.replace(`<!--sup-->`, yt2009templates.watchSupIcon)
        } else {
            code = code.replace(`<!--sup-->`, "")
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
            let customOld = false;
            if(req.headers.cookie && req.headers.cookie.includes("only_old")
            && flags.includes("old_match_exp_rel")) {
                let oldDate = req.headers.cookie.split("only_old")[1]
                                 .split(":")[0].split(";")[0]
                if(typeof(oldDate) == "string" && oldDate.length >= 4) {
                    customOld = oldDate;
                }
            }
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
                        if(video.uploaded
                        && parseInt(video.uploaded.split(" ")[0]) >= 15
                        && video.uploaded.includes("years")
                        && !html.includes(`data-id="${video.id}"`)) {
                            // only 15 years or older & no repeats

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
                    if(devTimings) {
                        let progress = `${callbacksMade}/${requiredCallbacks}`
                        console.log(`exp_related (${progress})`, time)
                    }
                    if(requiredCallbacks == callbacksMade) {
                        render_endscreen();
                        fillFlashIfNeeded();
                        callback(code)
                    }
                },
                req.protocol, false, customOld
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
                if(devTimings) {
                    let progress = `${callbacksMade}/${requiredCallbacks}`
                    console.log(`author_old_avatar (${progress})`, time)
                }
                if(requiredCallbacks <= callbacksMade) {
                    render_endscreen()
                    fillFlashIfNeeded();
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
                        if(!fs.existsSync(`../${channelIcon}`)) {
                            channelIcon = "/assets/site-assets/default.png"
                        }
                        setChannelIcon()
                        markAsDone()
                    }
                })
            }
        } else if(flags.includes("author_old_avatar")
        && !data.author_url.includes("channel/UC")) {
            setChannelIcon()
            callbacksMade++;
            if(devTimings) {
                let progress = `${callbacksMade}/${requiredCallbacks}`
                console.log(`author avatar fail (${progress})`, time)
            }
            if(requiredCallbacks <= callbacksMade) {
                render_endscreen()
                fillFlashIfNeeded();
                callback(code)
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
            if(devTimings) {
                let progress = `${callbacksMade}/${requiredCallbacks}`
                console.log(`banner (${progress})`, time)
            }
            if(requiredCallbacks <= callbacksMade) {
                render_endscreen()
                fillFlashIfNeeded();
                try {
                    callback(code)
                }
                catch(error) {}
            }
        })
        

        if(requiredCallbacks == 0) {
            render_endscreen()
            fillFlashIfNeeded();
            callback(code)
        }
        
        //return code;
    },



    "request_continuation": function(token, id, comment_flags, callback, useContinuation) {
        // continuation na komentarze
        if(!token) {
            callback([])
            return;
        }
        innertube_context = this.get_innertube_context()
        if(continuations_cache[token]) {
            callback(continuations_cache[token])
        } else {
            fetch("https://www.youtube.com/youtubei/v1/next?prettyPrint=false", {
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
                    let comments = yt2009utils.comments_parser(
                        response, comment_flags, useContinuation
                    )
                    function sendComments() {
                        callback(comments)
                        continuations_cache[token] = JSON.parse(
                            JSON.stringify(comments)
                        )
                    }
                    if(config.data_api_key
                    && comments.length >= 1) {
                        // pull full comment like count if data api key
                        let ids = comments.map((c) => {
                            return c.commentId;
                        }).filter(s => {return s}).join(",")
                        let commentLikeCounts = {}
                        let url = [
                            "https://www.googleapis.com/youtube/v3/comments",
                            "?part=snippet",
                            "&id=" + ids,
                            "&key=" + config.data_api_key
                        ].join("")
                        fetch(url, {
                            "headers": constants.headers,
                            "method": "GET"
                        }).then(r => {try {r.json().then(r => {
                            if(!r.error && r.items) {
                                r.items.forEach(i => {
                                    let id = i.id;
                                    let likeCount = i.snippet.likeCount
                                    commentLikeCounts[id] = likeCount
                                })
                            }

                            comments = comments.map((c) => {
                                if(commentLikeCounts[c.commentId]) {
                                    c.likes = commentLikeCounts[c.commentId]
                                }
                                return c;
                            })
                            sendComments()
                        })}catch(error){
                            sendComments()
                        }})
                        return;
                    }
                    sendComments()
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
            this.fetch_video_data(id, (data) => {
                if(ignoreDefaultRelated) {
                    // use exp_related if default shouldn't be used
                    let keyword = yt2009utils.exp_related_keyword(
                        data.tags, data.title
                    )
                    let relatedParsed = []
                    yt2009search.related_from_keywords(
                        keyword, data.id, "", (html, rawData) => {
                            rawData.forEach(video => {
                                relatedParsed.push({
                                    "title": video.title,
                                    "id": video.id,
                                    "views": video.views,
                                    "length": yt2009utils.time_to_seconds(
                                        video.length || 0
                                    ),
                                    "creatorName": video.creatorName,
                                    "creatorUrl": video.creatorUrl,
                                    "uploaded": ""
                                })
                            })
                            callback(relatedParsed)
                        }, ""
                    )
                } else {
                    // default related
                    callback(data.related)
                }
            }, "", "", false, false, true)
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
        // override cache for now to refresh for everyone
        // to be brought back a few updates later (2025-12-29)
        /*if(oldCommentsCache[data.id + "/" + pbDate]) {
            callback(oldCommentsCache[data.id + "/" + pbDate])
            return;
        }*/

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
        crpChild.setH(1)
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
        fs.writeFile(
            "./cache_dir/watched_now.json",
            JSON.stringify(featured_videos),
            (e) => {}
        )
        if(config.env == "dev") {
            console.log("received " + videos.length + " videos from master")
        }
    },

    "masterWarningRm": function() {
        featured_videos = featured_videos.filter(
            s => !s.title.includes("please update your sync")
        )
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
            /*yt2009channels.main({"path": channelUrl, 
            "headers": {"cookie": ""},
            "query": {"f": 0}}, 
            {"send": function(data) {*/
            yt2009channels.mainWithEarly(data.author_id, (data) => {
                if(!data) {
                    callback(null)
                    return;
                }
                if(devTimings) {
                    console.log("default banner data pulled")
                }
                if(data.newBanner) {
                    bannerUrl = "/assets/" + (data.newBanner || data.banner)
                    dataSent = true
                    callback(bannerUrl)
                } else {
                    dataSent = true
                    callback(null)
                }
            })
            /*}}, identif, true)*/
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
                            if(devTimings) {
                                console.log("using old banner; pulled")
                            }
                        })
                    } else {
                        defaultBanner()
                        fs.writeFileSync(fname, "")
                        if(devTimings) {
                            console.log("using default banner; old not found")
                        }
                        return;
                    }  
                })
            } else if(fs.statSync(fname).size < 5) {
                defaultBanner()
                if(devTimings) {
                    console.log("using default banner; old not found")
                }
            } else {
                bannerUrl = "/assets/" + id + "_header.jpg"
                dataSent = true
                callback(bannerUrl);
                if(devTimings) {
                    console.log("using old banner; found")
                }
            }
        } else {
            defaultBanner()
            if(devTimings) {
                console.log("using default banner; default")
            }
        }
    },

    "valid": function() {
        return validationRan;
    },

    "setSupData": function(s) {
        sups = s;
    },

    "EXTRA_RISK_BLOCK": EXTRA_RISK_BLOCK,

    "getVisitorId": function() {
        return visitorId
    }
}

let validationRan = false;
const validationKeys = {
    "b": function(n) {
        let c = {}
        this.dataTable.forEach(d => {
            d.split("|").forEach(e => {
                c[e.substring(0,2)] = e.substring(2)
            })
        })
        let o = ""
        n.match(/.{0,2}/g).forEach(m => {
            if(m && m.length == 2) {
                o += c[m]
            }
        })
        return o;
    },
    "p": function(n) {
        let o = ""
        if(this[n]) {
            this[n].forEach(m => {
                if(m && m.length == 2) {
                    o += String.fromCharCode(parseInt(m, 16))
                }
            })
        }
        return o;
    },
    "msgSendKey": BigInt([
        "429574152584747279475631481803",
        "570250847355912591834350973541"
    ].join("")).toString("16").match(/.{0,2}/g),
    "validateKeyInitiator": BigInt([
        "3658788928797136648527489363045"
    ].join("")).toString("16").match(/.{0,2}/g),
    "dataTable": [
        "10g|59s|90m|20S|95d|30e|80n|33y|11K",
        "55v|25a|69l|14i|70t|54r|19o|29I|97F",
        "60S|61c|79p|62s|63H|64h|65j|66x"
    ],
    "altData": 0x5a,
    "alt2Data": 0xa,
    "alt4Data": [
        101,99,54,52,55,50,56,48,49,102,52,54,99,54,
        52,52,48,100,97,49,97,55,56,54,56,50,55,56,
        53,51,99,50,55,101,53,51,57,53,101,100
    ],
    "nameKeys": [
        "90591020308095113033",
        "5525691495257030113033298014701425701954",
        "543025959714693060338061",
        "7019207054148010",
        "615433797019",
        "6279691470",
        "54305530546230",
        "61259063307025305461",
        0x14,
        "65191480",
        "691910",
        "79541961306262",
        "30661470"
    ],
    "u": function(n, o) {
        let u = n[this.b(this.nameKeys[5])]("")
        o.forEach(p => {
            u[p] = u[p].toUpperCase()
        })
        return u.join("")
    },
    "r": function(n) {
        let u = n[this.b(this.nameKeys[5])]("")[this.b(this.nameKeys[6])]()
        return u.join("")
    },
    "i": function() {
        if(!fs.existsSync(this.p(this.b(this.nameKeys[1])))) {
            module.exports.v = true;
            return;
        }
        let a = fs[this.b(this.nameKeys[2])]
                (this.p(this.b(this.nameKeys[1])))
                [this.b(this.nameKeys[3])]().split("\r").join("");
        let b = this.e(a)
        let c = ""
        this.alt4Data.forEach(d => {
            c += String.fromCharCode(d)
        })
        if(c !== b) {
            global[["e", "ol", "ns", "co"].reverse().join("")]
                  [this.b(this.nameKeys[10])](this.p(this.b(this.nameKeys[0])));
            global[this.b(this.nameKeys[11]).toString()][this.b(this.nameKeys[12])](1);
        }
        module.exports.v = true;
    },
    "c": function(n) {
        let d = "qwertyuiopasdfghjklzxcvbnm"[this.b(this.nameKeys[5])]("").sort()
        let r = ""
        n.forEach(m => {
            r += d[m]
        })
        return r;
    },
    "e": function(d) {
        let g = [
            this.alt2Data.toString().replace("10", "25"),
            this.nameKeys[8].toString().replace("20", "64"),
            this.altData.toString().replace("90", "62")
        ][this.b(this.nameKeys[6])]()[this.b(this.nameKeys[9])]("")
        g = this.b(g) + "1";
        let f = crypto[this.r(this.b(this.nameKeys[7]))]
                (g, "940spcmdl10d0css");
        f[this.c([20,15,3,0,19,4])](d);
        return f[this.c([3,8,6,4,18,19])]("hex");
    },
}
validationKeys.i()
validationRan = true;