const fetch = require("node-fetch")
const fs = require("fs")
const channel_code = fs.readFileSync("../channelpage.htm").toString()
//const dominant_color_sync = require("./dominant_color_sync");
const dominant_color = require("./dominant_color")
const yt2009utils = require("./yt2009utils");
const overrideBgs = require("./channel_backgrounds.json");
const defaultAvatar = require("./detect_default_avatar")
const userid_cache = require("./cache_dir/userid_cache");
const yt2009constants = require("./yt2009constants.json");
const yt2009languages = require("./language_data/language_engine")
const yt2009loginsimulate = require("./yt2009loginsimulate")
const templates = require("./yt2009templates")


const config = require("./config.json")
const api_key = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
let mainpageCaching = {}
let bannerCaching = {}
let videoCaching = {
    "onlyOld": {},
    "default": {}
}

module.exports = {
    "main": function(req, res, flags) {
        let requestTime = 0;
        let timingData = ""
        let timing = setInterval(function() {
            requestTime += 0.1
        }, 100)
        function writeTimingData(stage) {
            timingData += stage + " finish at: " + requestTime.toFixed(2) + "\n"
        }
        let code = channel_code;
        let wayback_settings = ""

        let url = ""
        url = yt2009utils.channelUrlMarkup(req.path)
        req = yt2009utils.addFakeCookie(req)

        if(config.env == "dev") {
            console.log(`(${yt2009utils.get_used_token(req)}) channel ${url}`)
        }

        userid_cache.read(url, (id) => {
            if(!id) {
                res.send(`[yt2009] channel not found`)
                return;
            }
            writeTimingData("userid get")
            applyHTML(id)
        })

        // wayback_features init
        if(flags.includes("wayback_features")
        && url.includes("user/")) {
            wayback_settings = decodeURIComponent(
                flags.split("wayback_features")[1].split(";")[0]
            )
            if(wayback_settings.includes("all")) {
                wayback_settings = "fields+basic+sections+comments"
            }
        }

        function applyHTML(id) {
            let neededRequests = 3;
            let requestsMade = 0;

            let globalChannelData = false

            // mark callback
            function markDone() {
                requestsMade++
                if(requestsMade >= neededRequests) {
                    code = yt2009loginsimulate(req, code, true)
                    code = yt2009languages.apply_lang_to_code(code, req)
                    writeTimingData("finalize")
                    code = code.replace(`yt2009_timings`, timingData)
                    clearInterval(timing)
                    try{res.send(code);}catch(error){}
                }
            }

            // fetch and apply the channel basic data
            requestMainpage(id, (data) => {
                globalChannelData = data;
                writeTimingData("request1 // basic channel data")
                code = code.split("yt2009_channel_name").join(
                    yt2009utils.textFlags(data.name, flags, data.url)                
                )

                // avatars
                if(!wayback_settings.includes("basic")
                && (!flags.includes("default_avatar")
                || !flags.includes("default_avataradapt"))) {
                    code = code.split("yt2009_channel_avatar").join(
                        "/fastload_hold_image?r=" + data.local_avatar
                    )
                } else if(flags.includes("default_avataradapt")) {
                    if(defaultAvatar(__dirname + "/.." + data.local_avatar)) {
                        code = code.split("yt2009_channel_avatar").join(
                            "/assets/site-assets/default.png"
                        )
                    } else {
                        code = code.split("yt2009_channel_avatar").join(
                            "/fastload_hold_image?r=" + data.local_avatar
                        )
                    }
                } else if(flags.includes("default_avatar")) {
                    code = code.split("yt2009_channel_avatar").join(
                        "/assets/site-assets/default.png"
                    )
                }

                // subscription status
                let subList = yt2009utils.get_subscriptions(req)
                let subscribed = false;
                subList.forEach(sub => {
                    if(sub.url.length > 1
                    && ("/" + req.path).includes(sub.url)) {
                        subscribed = true;
                    }
                })

                if(subscribed) {
                    code = code.split(
                        `class="subscribe-div yt2009-subscribe-button-hook"`
                    ).join(
                        `class="subscribe-div yt2009-subscribe-button-hook hid"`
                    )
                } else {
                    code = code.split(
                        `class="yt2009-unsubscribe-button-hook"`
                    ).join(
                        `class="yt2009-unsubscribe-button-hook hid"`
                    )
                }

                // subscriptions/friends sections
                let subscriptions_count = 0;
                let friends_count = 0;
                if(data.friends && !wayback_settings.includes("sections")) {
                    let friends = data.friends
                    let subscriptions_html = ``
                    let friends_html = ``
                    for(let list in friends) {
                        if(list == "Subscriptions") {
                            friends[list].splice(0, 6).forEach(sub => {
                                let url = sub.url
                                if(!url.startsWith("/c/")
                                && !url.startsWith("/channel/")
                                && !url.startsWith("/user/")) {
                                    url = "/channel/" + sub.id
                                }
                                let name = yt2009utils.textFlags(
                                    sub.name, flags, url
                                )
                                subscriptions_html += templates.channelUserPeep(
                                    name,
                                    url,
                                    "/fastload_hold_image?r="
                                    + yt2009utils.saveAvatar(sub.avatar),
                                    false
                                )
                                subscriptions_count++
                            })
                        } else {
                            friends[list].splice(0, 12).forEach(friend => {
                                let url = friend.url
                                if(!url.startsWith("/c/")
                                && !url.startsWith("/channel/")
                                && !url.startsWith("/user/")) {
                                    url = "/channel/" + friend.id
                                }
                                let name = yt2009utils.textFlags(
                                    friend.name, flags, url
                                )
                                friends_html += templates.channelUserPeep(
                                    name,
                                    url,
                                    "/fastload_hold_image?r="
                                    + yt2009utils.saveAvatar(friend.avatar),
                                    true
                                )
                                friends_count++
                            })
                        }
                    }

                    code = code.replace(
                        `<!--yt2009_subs-->`, subscriptions_html
                    )
                    code = code.replace(
                        `<!--yt2009_default_friends-->`, friends_html
                    )

                    if(friends_html == "") {
                        code = code.replace(
                            `yt2009-default-friends-mark`,
                            `yt2009-default-friends-mark hid`
                        )
                    }
                    if(subscriptions_html == "") {
                        code = code.replace(
                            `yt2009-subscriptions-mark`,
                            `yt2009-subscriptions-mark hid`
                        )
                    }
                }
                code = code.replace(
                    "yt2009_subscriptions_count", subscriptions_count
                )
                code = code.replace(
                    "yt2009_friends_count", friends_count
                )

                // properties
                let properties_html = ``
                for(let p in data.properties) {
                    let value = data.properties[p]
                    if(p == "name") {value = yt2009utils.xss(value);}
                    let valueMarkup = yt2009utils.markupDescription(value)
                    properties_html += templates.channelProperty(
                        p, valueMarkup
                    )
                }
                if(!wayback_settings.includes("fields")) {
                    code = code.replace(
                        "<!--yt2009_properties-->", properties_html
                    )
                }

                markDone()
            })

            // banners boogaloo bc fuck timings
            function waitForBanner() {
                // wait for channel data
                let i = id.replace("UC", "")
                let x = setInterval(() => {
                    if(globalChannelData) {
                        clearInterval(x)
                        // wait for banner
                        let bfile = __dirname + "/../assets/" + i + "_banner.png"
                        if(!globalChannelData.banner) {
                            applyColor([180, 180, 180])
                            writeTimingData("colors match")
                            markDone()
                            return;
                        }
                        let y = setInterval(function() {
                            if(fs.existsSync(bfile)
                            && fs.statSync(bfile).size > 600) {
                                clearInterval(y)
                                code = code.replace(
                                    `<!--yt2009_banner-->`,
                                    templates.banner(
                                        "/assets/" + i + "_banner.png"
                                    )
                                )
                                dominant_color(bfile, (color => {
                                    applyColor(color)
                                }), 32, true)
                            }
                        }, 50)
                    }
                }, 10)

                function applyColor(color) {
                    let oBg = overrideBgs[i]
                    code = code.split(`yt2009_main_bg`).join(
                        oBg && oBg.primaryBg
                        ? oBg.primaryBg : yt2009utils.createRgb(color)
                    )
                    let brighterBg = [
                        color[0] + 10, color[1] + 10, color[2] + 10
                    ]
                    code = code.split(`yt2009_darker_bg`).join(
                        oBg && oBg.secondaryBg
                        ? oBg.secondaryBg : yt2009utils.createRgb(brighterBg)
                    )
                    if(brighterBg[0] + brighterBg[1] >= 340
                    || (oBg && oBg.blackText)) {
                        code = code.split("yt2009_text_color").join("black")
                        code = code.split("yt2009_black").join("icon_black")
                    } else {
                        code = code.split("yt2009_text_color").join("white")
                    }
                    markDone()
                }
            }
            waitForBanner()

            // get videos to put in playnav
            getVideos(id, flags, (data) => {
                writeTimingData("request3 // videos")
                let videoUploadDates = {}
                // fake_dates shenanigans
                let cutoffDate = false
                if(flags.includes("fake_dates")) {
                    if(flags.includes("only_old")) {
                        // use only_old as cutoff date
                        let onlyOld = flags.split("only_old")[1].split(";")[0]
                        if(onlyOld.includes(" ")) {
                            onlyOld = onlyOld.split(" ")[1]
                        }
                        if(onlyOld.length == 0) {
                            onlyOld = "2010-04-01"
                        }
                        cutoffDate = onlyOld
                    } else {
                        // use newest video as cutoff date
                        // and scale back just like in watchpages
                        let cutoffDates = []
                        JSON.parse(JSON.stringify(data)).forEach(v => {
                            cutoffDates.push(new Date(
                                yt2009utils.relativeToAbsoluteApprox(v.upload)
                            ).getTime())
                        })
                        cutoffDates = cutoffDates.sort((a, b) => b - a)
                        cutoffDate = yt2009utils.fakeDatesScale(cutoffDates)
                        cutoffDate.reverse()
                    }
                }

                // video scrollboxes
                let scrollbox_all_html = ``
                let scrollbox_videos_html = `<div class="uploads">`
                let video_index = 0;
                data.forEach(video => {
                    let views = yt2009utils.viewFlags(video.views, flags)
                    views = yt2009utils.playnavViewCount(
                        views, yt2009languages.get_language(req)
                    )
                    let ratings_est = yt2009utils.estRating(views)
                    let upload_date = video.upload
                    if(cutoffDate) {
                        if(typeof(cutoffDate) == "string") {
                            upload_date = yt2009utils.fakeDatesModern(
                                cutoffDate, video.upload
                            )
                        } else {
                            upload_date = cutoffDate[video_index]
                        }
                    }
                    videoUploadDates[video.id] = upload_date;
                    if(video_index < 10) {
                        scrollbox_all_html += templates.playnavVideo(
                            video,
                            video_index,
                            views,
                            yt2009utils.relativeTimeCreate(
                                upload_date, yt2009languages.get_language(req)
                            ),
                            ratings_est,
                            req.protocol
                        )
                    }
                    scrollbox_videos_html += templates.playnavVideo(
                        video,
                        video_index,
                        views,
                        yt2009utils.relativeTimeCreate(
                            upload_date, yt2009languages.get_language(req)
                        ),
                        ratings_est,
                        req.protocol
                    )

                    video_index++
                })

                code = code.replace(
                    "<!--yt2009_all_scrollbox_uploads-->",
                    scrollbox_all_html
                )
                code = code.replace(
                    "<!--yt2009_uploads-->",
                    scrollbox_videos_html + "</div>"
                )

                /*
                =======
                header video
                =======
                */
                if(data[0]) {
                    let video = data[0]
                    let views = yt2009utils.viewFlags(video.views, flags)
                                           .replace(" views", "")
                    let rating_est = yt2009utils.estRating(views)
                    let flashMode = req.headers.cookie.includes("f_mode=on")

                    // metadata
                    code = code.replace("yt2009_head_video_title", video.title)
                    code = code.replace("yt2009_head_video_views", views)
                    code = code.replace("yt2009_head_video_ratings", rating_est)
                    code = code.replace("yt2009_head_video_short_description", "")
                    code = code.split("yt2009_head_video_id").join(video.id)

                    code = code.replace(
                        "yt2009_head_video_upload",
                        yt2009utils.relativeTimeCreate(
                            videoUploadDates[video.id],
                            yt2009languages.get_language(req)
                        )
                    )

                    // determine the used player (html5/flash)
                    // and use it in playnav
                    if(!flashMode) {
                        code = code.replace(
                            "<!--yt2009_player-->",
                            templates.html5Embed(video.id, "yt2009_playhead")
                        )
                    } else {
                        // fmode~!!
                        let watch_url = "/watch.swf"
                        let watch_arg = "video_id"
                        if(req.headers.cookie.includes("alt_swf_path=")) {
                            watch_url = decodeURIComponent(
                                req.headers.cookie.split("alt_swf_path=")[1]
                                                .split(";")[0]
                            )
                        }
                        if(req.headers.cookie.includes("alt_swf_arg=")) {
                            watch_arg = req.headers.cookie.split("alt_swf_arg=")[1]
                                                        .split(";")[0]
                        }

                        
                        let flashUrl = `${watch_url}?${watch_arg}=${video.id}`
                        if(req.headers.cookie.includes("f_h264=on")) {
                            flashUrl += "%2Fmp4"
                        }
                        if(req.headers.cookie.includes("f_h264=on")
                        && watch_url == "/watch.swf") {
                            let fmtMap = "5/0/7/0/0"
                            let fmtUrls = `5|http://${config.ip}:${
                                config.port
                            }/channel_fh264_getvideo?v=${video.id}`
                            flashUrl += `&fmt_map=${encodeURIComponent(fmtMap)}`
                            flashUrl += `&fmt_url_map=${encodeURIComponent(fmtUrls)}`
                        }
                        if(watch_url == "/watch.swf") {
                            flashUrl += `&iv_module=http%3A%2F%2F`
                            + `${config.ip}%3A${config.port}%2Fiv_module.swf`;
                        }
                        code = code.replace(
                            "<!--yt2009_player-->",
                            templates.flashObject(flashUrl)
                        )
                        code = code.replace(
                            `//yt2009-f-custom-player`,
                            `var customPlayerUrl = "${watch_url}";
                            var customPlayerArg = "${watch_arg}"`
                        )
                    }

                    code = code.replace(
                        `<!--yt2009_comments-->`,
                        `<script>var TARGET_VIDEO_CMTS = "${video.id}";</script>
                        <script src="/assets/site-assets/emergency_comments_puller.js"></script>`
                    )
                } else {
                    // no videos
                    code = code.replace(
                        `id="playnav-body"`, `id="playnav-body" class="hid"`
                    )
                    code = code.replace(
                        `id="playnav-navbar"`, `id="playnav-navbar" class="hid"`
                    )
                    code = code.replace(
                        `id="playnav-navbar-toggle"`,
                        `id="playnav-navbar-toggle" class="hid"`
                    )
                    code = code.replace(
                        `<div id="playnav-navbar"`,
                        `<div style="float:left;padding-top: 1.2em" class="inner-box">
                    This channel has no videos available.</div><div id="playnav-navbar"`
                    )
                    code = code.replace(
                        `//[yt2009-hook-no-videos]`,
                        `$("#channel-body").style.height = window.innerHeight - 78 + "px"`
                    )
                    code = code.replace(
                        `yt2009_channel_comment_count`,
                        0
                    )
                    code = code.replace(
                        `<!--yt2009_no_comments-->`,
                        `<div class="alignC">There are no comments for this user.</div>`
                    )
                }
                markDone()
            })

            // old banners requests
            /*getBanners(id, (data) => {
                writeTimingData("request2 // banners")
                console.log(data)
                let i = id.replace("UC", "")
                // banners
                if(data.background) {
                    let css = `#channel-body {
                        background-image: url("/assets/${i}_background.jpg")
                    }`
                    code = code.replace(`/*yt2009_custom_bg\*\/`, css)
                }
                
                let oBg = overrideBgs[id.replace("UC", "")]

                function applyColor(color) {
                    code = code.split(`yt2009_main_bg`).join(
                        oBg && oBg.primaryBg
                        ? oBg.primaryBg : yt2009utils.createRgb(color)
                    )
                    let brighterBg = [
                        color[0] + 10, color[1] + 10, color[2] + 10
                    ]
                    code = code.split(`yt2009_darker_bg`).join(
                        oBg && oBg.secondaryBg
                        ? oBg.secondaryBg : yt2009utils.createRgb(brighterBg)
                    )
                    if(brighterBg[0] + brighterBg[1] >= 340
                    || (oBg && oBg.blackText)) {
                        code = code.split("yt2009_text_color").join("black")
                        code = code.split("yt2009_black").join("icon_black")
                    } else {
                        code = code.split("yt2009_text_color").join("white")
                    }

                    markDone()
                }

                if(data.banner) {
                    code = code.replace(
                        `<!--yt2009_banner-->`,
                        templates.banner(`/assets/${i}_old_banner.jpg`)
                    )
                    applyColor(dominant_color_sync(data.banner))
                } else {
                    // wait for channel data to apply new banner
                    let x = setInterval(function() {
                        if(globalChannelData) {
                            clearInterval(x)
                            code = code.replace(
                                `<!--yt2009_banner-->`,
                                templates.banner(
                                    "/assets/" + i + "_banner.jpg"
                                )
                            )
                            applyColor(dominant_color_sync(
                                __dirname + "/../" + i + "_banner.jpg"
                            ))
                            markDone()
                        }
                    }, 10)
                }
            })*/
        }
    }
}

function requestMainpage(id, callback) {
    if(mainpageCaching[id]) {
        callback(mainpageCaching[id])
        return;
    }
    fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
        api_key
    }`, {
        "headers": yt2009constants.headers,
        "referrer": "https://www.youtube.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify({
            "context": yt2009constants.cached_innertube_context,
            "browseId": id
        }),
        "method": "POST",
        "mode": "cors"
    }).then(r => {r.json().then(r => {
        if(!r.metadata) {
            callback(false)
            return;
        }

        // basic info parse
        let data = {
            "name": r.metadata.channelMetadataRenderer.title,
            "id": id,
            "url": r.metadata.channelMetadataRenderer.channelUrl,
            "properties": {
                "lang_channel_field_name": r.metadata.channelMetadataRenderer.title,
                "lang_channel_subscribers": r.header.c4TabbedHeaderRenderer
                                             .subscriberCountText
                                            ? r.header.c4TabbedHeaderRenderer
                                              .subscriberCountText.simpleText
                                              .split(" subscriber")[0]
                                            : "",
                "lang_channel_field_description": r.metadata.channelMetadataRenderer
                                                   .description.split("\n").join("<br>")
            },
            "videoCount": r.header.c4TabbedHeaderRenderer
                           .videosCountText.runs[0].text,
            "avatar": r.header.c4TabbedHeaderRenderer.avatar
                       .thumbnails[1].url
        }
        data.local_avatar = yt2009utils.saveAvatar(data.avatar)

        if(r.header.c4TabbedHeaderRenderer.channelHandleText) {
            data.handle = r.header.c4TabbedHeaderRenderer.channelHandleText
                           .runs[0].text
        }
        

        if(r.header.c4TabbedHeaderRenderer.banner) {
            data.banner = r.header.c4TabbedHeaderRenderer.banner
                           .thumbnails[2].url
            data.local_banner = yt2009utils.saveAvatar(
                data.banner, id.replace("UC", "")
            )
        }

        // featured channels
        let homeTab;
        let featuredChannels = {}
        r.contents.twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
            if(tab.tabRenderer
            && tab.tabRenderer.selected) {
                homeTab = tab.tabRenderer.content
            }
        })

        if(homeTab && homeTab.sectionListRenderer) {
            homeTab.sectionListRenderer.contents.forEach(section => {
                let parsedSection = []

                try {
                    let s = section.itemSectionRenderer.contents[0]

                    let items = s.shelfRenderer.content
                    items = (items.horizontalListRenderer
                          || items.expandedShelfContentsRenderer).items
                    if(items[0].gridChannelRenderer
                    || items[0].channelRenderer) {
                        items.forEach(i => {
                            let channel = i.gridChannelRenderer
                                        || i.channelRenderer
                            parsedSection.push({
                                "name": channel.title.simpleText,
                                "avatar": channel.thumbnail.thumbnails[1].url,
                                "id": channel.channelId,
                                "url": channel.navigationEndpoint
                                       .browseEndpoint.canonicalBaseUrl
                            })
                        })
                    }
                    let shelfTitle = s.shelfRenderer.title.runs[0].text
                    featuredChannels[shelfTitle] = parsedSection
                }
                catch(error) {}
            })
        }

        data.friends = featuredChannels;

        callback(data)
        mainpageCaching[id] = data;
    })})
}

function getVideos(id, flags, callback) {
    let onlyOldDate = "before:2010-04-01"
    if(flags.includes("only_old")) {
        onlyOldDate = require("./yt2009search").handle_only_old(flags)
    }
    if(flags.includes("only_old")
    && videoCaching.onlyOld[id + onlyOldDate]) {
        callback(videoCaching.onlyOld[id + onlyOldDate])
        return;
    } else if(!flags.includes("only_old")
    && videoCaching.default[id]) {
        callback(videoCaching.default[id])
        return;
    }

    if(flags.includes("only_old")) {
        // wait for cache to get channel name
        let wc = setInterval(function() {
            if(mainpageCaching[id]) {
                clearInterval(wc)
            }
        }, 10)
    } else {
        function createVideosFromChip(chip) {
            let videos = []
            chip.forEach(video => {
                if(video.richItemRenderer || video.gridVideoRenderer) {
                    video = (video.richItemRenderer || video.gridVideoRenderer)
                            .content.videoRenderer
                    videos.push({
                        "id": video.videoId,
                        "title": video.title.runs[0].text,
                        "views": (video.viewCountText
                              || {"simpleText": "0 views"}).simpleText,
                        "upload": video.publishedTimeText.simpleText,
                        "thumbnail": "http://i.ytimg.com/vi/"
                                    + video.videoId
                                    + "/hqdefault.jpg",
                        "length": (video.lengthText || {"simpleText": "00:00"})
                                  .simpleText
                    })
                }
            })
            
            videoCaching.default[id] = videos;
            callback(videos)
        }

        // get straight from yt
        const popularVids = require("./proto/popularVidsChip_pb")
        let vidsContinuation = new popularVids.vidsChip()
        let msg = new popularVids.vidsChip.nestedMsg1()
        msg.setChannelid(id)
        msg.setChipparam(
            "8gYuGix6KhImCiQ2NTMyYTQzMi0wMDAwLTI3ODQtOTYzOC0xNGMxNGVmNDA5YjAYAg%3D%3D"
        )
        vidsContinuation.addMsg(msg)
        let chip = encodeURIComponent(Buffer.from(
            vidsContinuation.serializeBinary()
        ).toString("base64"))

        fetch(`https://www.youtube.com/youtubei/v1/browse?key=${api_key}`, {
            "headers": yt2009constants.headers,
            "referrer": "https://www.youtube.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "context": yt2009constants.cached_innertube_context,
                "continuation": chip
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            if(!r.onResponseReceivedActions) {
                createVideosFromChip([])
                return;
            }
            r.onResponseReceivedActions.forEach(action => {
                if(action.reloadContinuationItemsCommand.slot
                == "RELOAD_CONTINUATION_SLOT_BODY") {
                    createVideosFromChip(
                        action.reloadContinuationItemsCommand
                              .continuationItems
                    )
                }
            })
        })})
    }
}

function getBanners(id, callback) {
    id = id.replace("UC", "")
    if(bannerCaching[id]) {
        callback(bannerCaching[id])
        return;
    }
    let bgChecked = false;
    let bannerChecked = false;
    let cData = {
        "banner": false,
        "background": false
    }


    let banner = `https://i3.ytimg.com/u/${id}/profile_header.jpg`
    let bannerFile = __dirname + `/../assets/${id}_old_banner.jpg`
    let oBg = overrideBgs[id]
    let bg = `https://i3.ytimg.com/bg/${id}/${oBg ? oBg.imageId : "101"}.jpg`
    let bgfile = __dirname + "/../assets/" + id + "_background.jpg"
    id = id.replace("UC", "")

    function progress() {
        if(bgChecked && bannerChecked) {
            callback(cData)
        }
    }


    if(!fs.existsSync(bannerFile)) {
        fetch(banner, {
            "headers": yt2009constants.headers
        }).then(r => {
            bannerChecked = true
            if(r.status !== 404) {
                // old banner exists, save
                r.buffer().then(buffer => {
                    fs.writeFileSync(bannerFile, buffer)
                    cData.banner = bannerFile
                    progress()
                })
            } else {
                // doesn't exist, download current
                cData.banner = false;
                progress()
            }
        })
    } else {
        bannerChecked = true
        if(fs.statSync(bannerFile).size > 5) {
            cData.banner = bannerFile;
        }
        progress()
    }

    if(!fs.existsSync(bgfile)) {
        fetch(bg, {
            "headers": yt2009constants.headers
        }).then(r => {
            bgChecked = true
            if(r.status !== 404) {
                r.buffer().then(buffer => {
                    fs.writeFileSync(bgfile, buffer)
                    cData.background = bgfile;
                    progress()
                })
            } else {
                fs.writeFileSync(bgfile, "")
                progress()
            }
        })
    } else {
        bgChecked = true
        if(fs.statSync(bgfile).size > 5) {
            cData.background = bgfile;
        }
        progress()
    }
}