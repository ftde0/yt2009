const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const yt2009exports = require("./yt2009exports")
const fs = require("fs")
const yt2009signin = require("./yt2009androidsignin")
const dominant_color = require("./dominant_color")
const config = require("./config.json")
const tokens = config.tokens || ["amogus"]
const logged_tokens = config.logged_tokens || []
const templocked_tokens = config.templocked_tokens || []
const useTShare = fs.existsSync("./yt2009ts.js")
const androidHeaders = {"headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,pl;q=0.8",
    "content-type": "application/json",
    "cookie": "",
    "x-goog-authuser": "0",
    "x-origin": "https://www.youtube.com/",
    "user-agent": "com.google.android.youtube/19.02.39 (Linux; U; Android 14) gzip"
}}
const wlist = /discord.gg|tiktok|tik tok|pre-vevo|2023|lnk.to|official hd video|smarturl/gui
let ip_uses_flash = []
let ratelimitData = {}
let ytConfigData = false;
const playerResponsePb = require("./proto/android_player_pb")

let downloadRetryMax = 5;
if(config.dl_max_retry && !isNaN(parseInt(config.dl_max_retry))) {
    downloadRetryMax = parseInt(config.dl_max_retry)
}

function devlog(text) {
    if(config.env == "dev") {
        console.log(text)
    }
}

module.exports = {
    "time_to_seconds": function(input) {
        // time to seconds (01:00:00 -> 3600)
        let tr = 0;
    
        if(typeof(input) == "number") return input;
        let split = input.split(":")
        switch(split.length) {
            // ss
            case 1: {
                tr += parseInt(split[0])
                if(isNaN(parseInt(split[0]))) {
                    tr = 0;
                }
                break;
            }
            // mm:ss
            case 2: {
                tr += parseInt(split[0]) * 60
                tr += parseInt(split[1])
                break;
            }
            // hh:mm:ss
            case 3: {
                tr += parseInt(split[0]) * 3600
                tr += parseInt(split[1]) * 60
                tr += parseInt(split[2])
                break;
            }
        }
    
        return tr;
    },


    "seconds_to_time": function(input) {
        // seconds to time (192 -> 3:12)

        input = parseInt(input)

        let minutes = Math.floor(input / 60);
        let seconds = input % 60;

        if(seconds < 10) {
            seconds = "0" + seconds
        }

        return minutes + ":" + seconds;
    },


    "comments_viewmodel_parser": function(response, comment_flags, includeContinuation) {
        devlog("[dev] using comments_viewmodel_parser instead")
        let firstPinned = false;
        let commentsWithReplies = {}
        let continuationItems = []
        try {
            response.onResponseReceivedEndpoints.forEach(e => {
                if(e.reloadContinuationItemsCommand
                && e.reloadContinuationItemsCommand.continuationItems) {
                    continuationItems = e.reloadContinuationItemsCommand
                                         .continuationItems
                } else if(e.appendContinuationItemsAction
                && e.appendContinuationItemsAction.continuationItems) {
                    continuationItems = e.appendContinuationItemsAction
                                         .continuationItems
                }
            })
        }
        catch(error) {}
        try {
            if(continuationItems[0]
            && continuationItems[0].commentThreadRenderer) {
                let first =  continuationItems[0]
                             .commentThreadRenderer
                             .commentViewModel
                             .commentViewModel;
                if(first.pinnedText) {
                    firstPinned = true;
                }
            }

            continuationItems.forEach(z => {
                try {
                    let y = z.commentThreadRenderer.commentViewModel
                             .commentViewModel
                    let cId = y.commentId
                    if(z.commentThreadRenderer.replies) {
                        let r = z.commentThreadRenderer.replies
                                 .commentRepliesRenderer
                        let viewString = r.viewReplies.buttonRenderer
                                          .text.runs[0].text;
                        r = r.contents[0].continuationItemRenderer
                             .continuationEndpoint.continuationCommand
                             .token
                        let rCount = this.bareCount(viewString)
                        if(r && viewString) {
                            commentsWithReplies[cId] = [r, rCount]
                        }
                    }
                }
                catch(error) {}
            })
        }
        catch(error) {}
        let comments = []
        try {
            let i = 0;
            response.frameworkUpdates.entityBatchUpdate.mutations.forEach(m => {
                if(m.payload
                && m.payload.commentEntityPayload) {
                    m = m.payload.commentEntityPayload
                    let content = m.properties.content.content.replace(
                        /\p{Other_Symbol}/gui, ""
                    )
                    let repliesData = false
                    try {
                        repliesData = commentsWithReplies[m.properties.commentId]
                    }
                    catch(error) {}
                    comments.push({
                        "authorAvatar": m.author.avatarThumbnailUrl,
                        "authorName": m.author.displayName.replace("@", ""),
                        "authorUrl": "/channel/" + m.author.channelId,
                        "authorId": m.author.channelId,
                        "content": content,
                        "time": comment_flags.includes("fake_comment_dates")
                                ? gen_fake_date()
                                : m.properties.publishedTime,
                        "likes": parseInt(m.toolbar.likeCountA11y.replace(
                            /[^0-9]/g, ""
                        )),
                        "pinned": (i == 0 && firstPinned),
                        "commentId": m.properties.commentId,
                        "r": repliesData
                    })
                    i++
                }
            })

            if(includeContinuation
            && continuationItems.length >= 1) {
                let last = continuationItems[continuationItems.length - 1]
                if(last.continuationItemRenderer) {
                    let token = last.continuationItemRenderer
                    if(token.continuationEndpoint) {
                        token = token.continuationEndpoint.continuationCommand
                                     .token
                    } else if(token.button) {
                        token = token.button.buttonRenderer.command
                                     .continuationCommand.token
                    } else {
                        token = false;
                    }
                    comments.push({
                        "continuation": token
                    })
                }
            }

            return comments;
        }
        catch(error) {
            console.log(error)
            return []
        }
    },

    
    "comments_parser": function(response, comment_flags, includeContinuation) {
        if(response.frameworkUpdates) {
            // parse viewmodel comments
            return this.comments_viewmodel_parser(
                response, comment_flags, includeContinuation
            )
        }
        // parse comments from json response
        comment_flags = comment_flags.replace("#", "").split(";")
        let gen_fake_date = this.genFakeDate
        let comments = []
        try {
            // get to the comments themselves
            if(!response.onResponseReceivedEndpoints) return [];
            response.onResponseReceivedEndpoints.forEach(received => {
                let endpoint = 
                received.reloadContinuationItemsCommand
                ? received.reloadContinuationItemsCommand
                : received.appendContinuationItemsAction
                if((endpoint.slot
                    && endpoint.slot == "RELOAD_CONTINUATION_SLOT_BODY")
                    || endpoint.continuationItems) {

                    // upon getting parse
                    let raw_comments = endpoint.continuationItems
                    raw_comments.forEach(rawComment => {
                        parseITComment(rawComment)
                    })
                }
            })
            return comments;
        }
        catch(error) {
            console.log("[yt2009_error] comments parser error", error)
            return [];
        }

        // actually parse and send to the loop, saving a lil on idents
        function parseITComment(rawComment) {
            if(rawComment.commentThreadRenderer) {
                // parse
                let comment_path_short = rawComment.commentThreadRenderer
                                                   .comment.commentRenderer
                let authorUrl = comment_path_short.authorEndpoint.commandMetadata
                                                  .webCommandMetadata.url
                let commentContent = ""

                comment_path_short.contentText.runs.forEach(run => {
                    commentContent += run.text + "\n"
                })

                let pass = true;
                let future = constants.comments_remove_future_phrases

                if(comment_flags.includes("comments_remove_future")) {
                    future.forEach(futureYear => {
                        if(commentContent.toLowerCase().includes(futureYear)) {
                            pass = false;
                        }
                    })
                    if(commentContent.length >= 500) {
                        pass = false;
                    }

                    commentContent = commentContent.replace(
                        /\p{Other_Symbol}/gui, ""
                    )
                    commentContent = commentContent.split("🏻").join("")
                }

                let authorName = comment_path_short.authorText.simpleText
                if(comment_flags.includes("remove_username_space")) {
                    authorName = authorName.split(" ").join("")
                }
                if(comment_flags.includes("author_old_names")
                && authorUrl.includes("/user/")) {
                    authorName = authorUrl.split("/user/")[1]
                }
                if(!authorName) {authorName = "author"}
                if(authorName.startsWith("@")) {
                    authorName = authorName.replace("@", "")
                }

                if(!pass) return;

                // comment like count from yt
                let likeCount = false;
                if(comment_path_short.voteCount
                && comment_path_short.voteCount.simpleText) {
                    likeCount = comment_path_short.voteCount.simpleText
                    if(likeCount.includes("K")) {
                        likeCount = parseFloat(likeCount) * 1000
                    } else if(likeCount.includes("M")) {
                        likeCount = parseFloat(likeCount) * 1000000
                    }
                    likeCount = parseInt(likeCount)
                }

                comments.push({
                    "authorAvatar": comment_path_short
                                    .authorThumbnail.thumbnails[1].url,
                    "authorName": authorName,
                    "authorUrl": authorUrl,
                    "authorId": comment_path_short.authorEndpoint
                                .browseEndpoint.browseId,
                    "content": commentContent.split("\n\n").join("<br>"),
                    "time": comment_flags.includes("fake_comment_dates")
                            ? gen_fake_date()
                            : comment_path_short.publishedTimeText.runs[0].text,
                    "likes": likeCount,
                    "pinned": comment_path_short.pinnedCommentBadge ? true : false
                })
            } else if(rawComment.continuationItemRenderer) {
                // continuation token
                // (for even more comment awesomeness)
                comments.push({
                    "continuation": rawComment.continuationItemRenderer
                                              .continuationEndpoint
                                              .continuationCommand.token
                })
            }
        }
    },


    "search_parse": function(response) {
        let results = []
        let resultsToCallback = []
        let itemsPath = []
        if(response.appendContinuationItemsAction) {
            itemsPath = response.appendContinuationItemsAction
                            .continuationItems 
        } else {
            try {
                itemsPath = response.contents
                            .twoColumnSearchResultsRenderer
                            .primaryContents.sectionListRenderer
                            .contents
            }
            catch(error) {}
        }
        try {
            itemsPath.forEach(container => {
                // actual results
                if(container.itemSectionRenderer) {
                    container.itemSectionRenderer.contents.forEach(r => {
                        results.push(r)
                    })
                }

                // continuation token
                if(container.continuationItemRenderer) {
                    resultsToCallback.push({
                        "type": "continuation",
                        "token": container.continuationItemRenderer
                                .continuationEndpoint.continuationCommand
                                .token,
                        "endpoint": container.continuationItemRenderer
                                    .continuationEndpoint.commandMetadata
                                    .webCommandMetadata.apiUrl
                    })
                }
            })
        }
        catch(error) {
            console.log(error)
            return [];
        }

        // est result count
        if(response.estimatedResults) {
            resultsToCallback.push({
                "type": "metadata",
                "resultCount": parseInt(response.estimatedResults)
            })    
        }
        
        results.forEach(result => {
            // video result
            if(result.videoRenderer) {
                result = result.videoRenderer
                let uploadDate = ""
                try {
                    uploadDate = result.publishedTimeText.simpleText
                }
                catch(error) {}
                let description = ""
                try {
                    result.detailedMetadataSnippets[0]
                    .snippetText.runs.forEach(run => {
                        description += run.text
                    })
                }
                catch(error) {}
                try {
                    let author_url = result.ownerText.runs[0]
                                    .navigationEndpoint.browseEndpoint
                                    .canonicalBaseUrl;

                    // check for author urls
                    let userHandle = false
                    if(author_url.startsWith("/@")) {
                        userHandle = author_url.replace("/@", "")
                    }

                    if(!author_url.startsWith("/channel")
                    && !author_url.startsWith("/user")
                    && !author_url.startsWith("/c/")) {
                        author_url = "/channel/" + result.ownerText.runs[0]
                                                    .navigationEndpoint
                                                    .browseEndpoint.browseId
                    }

                    let verified = false;
                    let artist = false;
                    if(result.ownerBadges) {
                        result.ownerBadges.forEach(badge => {
                            if(badge.metadataBadgeRenderer
                            && badge.metadataBadgeRenderer.style
                            == "BADGE_STYLE_TYPE_VERIFIED") {
                                verified = true;
                            } else if(badge.metadataBadgeRenderer
                            && badge.metadataBadgeRenderer.style
                            == "BADGE_STYLE_TYPE_VERIFIED_ARTIST") {
                                artist = true;
                            }
                        })
                    }

                    let live = false;
                    if(result.badges) {
                        result.badges.forEach(badge => {
                            if(badge.metadataBadgeRenderer
                            && badge.metadataBadgeRenderer.style
                            == "BADGE_STYLE_TYPE_LIVE_NOW") {
                                live = true;
                            }
                        })
                    }

                    let time = ""
                    let viewCount = result.viewCountText.simpleText

                    if(result.lengthText && result.lengthText.simpleText) {
                        time = result.lengthText.simpleText
                    }

                    let resultType = (live && !time ? "live-video" : "video")

                    if(resultType == "live-video") {
                        time = "LIVE"
                        viewCount = result.viewCountText.runs[0].text + " views"
                    }

                    // add video
                    resultsToCallback.push({
                        "type": resultType,
                        "id": result.videoId,
                        "title": result.title.runs[0].text,
                        "views": viewCount,
                        "thumbnail": "http://i.ytimg.com/vi/"
                                    + result.videoId
                                    + "/hqdefault.jpg",
                        "description": description,
                        "time": time,
                        "author_name": result.ownerText.runs[0].text,
                        "author_url": author_url,
                        "author_handle": userHandle,
                        "upload": uploadDate,
                        "verified": verified,
                        "artist": artist
                    })
                }
                catch(error) {
                    console.log(error)
                }
            }
            // channel result
            else if(result.channelRenderer) {
                result = result.channelRenderer
                let channelUrl = result.navigationEndpoint
                                .browseEndpoint.canonicalBaseUrl;
                if(!channelUrl.startsWith("/user/")
                && !channelUrl.startsWith("/c/")
                && !channelUrl.startsWith("/channel/")) {
                    channelUrl = "/channel/" + result.channelId
                }
                let subCount = "0 subscribers"
                if(result.subscriberCountText
                && result.subscriberCountText.simpleText
                && result.subscriberCountText.simpleText.includes("subscriber")) {
                    subCount = result.subscriberCountText.simpleText
                } else if(result.videoCountText
                && result.videoCountText.simpleText
                && result.videoCountText.simpleText.includes("subscriber")) {
                    subCount = result.videoCountText.simpleText
                }
                resultsToCallback.push({
                    "type": "channel",
                    "name": result.title.simpleText,
                    "avatar": this.saveAvatar(
                                result.thumbnail.thumbnails[0].url
                            ),
                    "subscribers": subCount,
                    "url": channelUrl
                })
            }
            // playlist result
            else if(result.playlistRenderer) {
                result = result.playlistRenderer
                let videoList = []
                let a = false
                if(result.videos) {
                    result.videos.forEach(previewVideo => {
                        if(!previewVideo.childVideoRenderer) return;
                        previewVideo = previewVideo.childVideoRenderer
                        videoList.push({
                            "type": "playlist-video",
                            "length": previewVideo.lengthText.simpleText,
                            "title": previewVideo.title.simpleText,
                            "id": previewVideo.videoId
                        })
                    })
                } else {
                    try {
                        a = result.thumbnailRenderer.playlistCustomThumbnailRenderer
                        .thumbnail.thumbnails[0].url
                    }
                    catch(error) {}
                }
                resultsToCallback.push({
                    "type": "playlist",
                    "id": result.playlistId,
                    "name": result.title.simpleText,
                    "videoCount": result.videoCount,
                    "videos": videoList,
                    a
                })
            }
            // playlist but who hurt you my poor boy..
            else if(result.lockupViewModel
            && result.lockupViewModel.contentType == "LOCKUP_CONTENT_TYPE_PLAYLIST") {
                result = result.lockupViewModel
                let vCount = 0;
                try {
                    let wtf = result.contentImage.collectionThumbnailViewModel
                    .primaryThumbnail.thumbnailViewModel.overlays[0]
                    .thumbnailOverlayBadgeViewModel.thumbnailBadges[0]
                    .thumbnailBadgeViewModel.text;
                    vCount = this.bareCount(wtf).toString()
                    if(wtf == "Mix") {
                        vCount = "50+"
                    }
                }
                catch(error) {}
                let videoList = []
                let m = result.metadata.lockupMetadataViewModel
                try {
                    let vm = m.metadata.contentMetadataViewModel
                    let d = " · ";
                    vm.metadataRows.forEach(n => {
                        try {
                            n = n.metadataParts[0].text
                            let watch = n.commandRuns[0].onTap.innertubeCommand
                                        .watchEndpoint;
                            videoList.push({
                                "type": "playlist-video",
                                "id": watch.videoId,
                                "title": n.content.split(d)[0],
                                "length": n.content.split(d)[1]
                            })
                        }
                        catch(error) {}
                    })
                }
                catch(error) {console.log("lockupviewmodel:",error)}
                resultsToCallback.push({
                    "type": "playlist",
                    "id": result.contentId,
                    "name": m.title.content,
                    "videoCount": vCount,
                    "videos": videoList
                })
            }
        })

        return resultsToCallback;
    },


    "countBreakup": function(count) {
        count = count.toString();
        count = count.split("")
                .reverse()
                .join("")
                .match(/.{1,3}/g)
                .reverse()
        
        let i = 0;
        count.forEach(c => {
            count[i] = c.split("").reverse().join("")
            i++;
        })

        count = count.join(",")

        return count;
    },


    "genFakeDate": function(index) {
        // for WHATEVER STUPID reason this doesn't work properly
        // without the if statement
        // when index is set to 0. SO I HAVE TO DO THISSSS
        // WTF JS
        if(index == 0) {
            return "1 day ago"
        }
        return [
            "1 day ago",
            "1 week ago",
            "2 weeks ago",
            "1 month ago",
            "3 months ago",
            "4 months ago",
            "7 months ago",
            "9 months ago",
            "10 months ago",
            "11 months ago",
            "1 year ago"
        ][index || Math.floor(Math.random() * 11)]
        || "5 months ago";
    },

    
    "genAbsoluteFakeDate": function(ogDate) {
        if(ogDate) {
            let year = ogDate.split(", ")[1]
            return ogDate.replace(year, "2009")
        }
        let months = ["Jan", "Feb", "Mar",
                      "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", 
                      "Oct", "Nov", "Dec"]
        let month = months[Math.floor(Math.random() * 12)] || "Feb"
        let day = Math.floor(Math.random() * 26) + 1
        return `${month} ${day}, 2009`
    },

    
    "markupDescription": function(description, useRedir) {
        let descriptionMarkedup = ``
        description.split("<br>").forEach(part => {
            part.split(" ").forEach(word => {
                if(word.startsWith("http://")
                || word.startsWith("https://")) {
                    let displayWord = (
                        word.length > 40
                        ? word.substring(0, 40) + "..." 
                        : word
                    )
                    if(useRedir && word.includes("//www.youtube.com/")) {
                        word = word.replace("http://www.youtube.com", "")
                        word = word.replace("https://www.youtube.com", "")
                    }
                    descriptionMarkedup += 
                    "<a href=\"" + word + "\" target=\"_blank\">"
                    + displayWord + "</a>"
                } else {
                    descriptionMarkedup += `${word} `
                }
            })
            descriptionMarkedup += "<br>"
        })
        return descriptionMarkedup;
    },


    "saveAvatar": function(link, banner, forceUpdate) {
        if(link.startsWith("//")) {
            link = link.replace("//", "https://")
        }
        let fname = link.split("/")[link.split("/").length - 1]
        if(banner) {
            fname = banner + "_banner"
        }
        fname = fname.replace(".png", "")
        if(!fs.existsSync(`../assets/${fname}.png`) || forceUpdate) {
            fetch(link.replace("ggpht.com", "googleusercontent.com"), {
                "headers": constants.headers
            }).then(r => {
                r.buffer().then(buffer => {
                    fs.writeFileSync(`../assets/${fname}.png`, buffer)
                })
            }).catch(e => {
                devlog("googleusercontent load fail! trying ggpht")
                fetch(link, {
                    "headers": constants.headers
                }).then(r => {
                    r.buffer().then(buffer => {
                        fs.writeFileSync(`../assets/${fname}.png`, buffer)
                    })
                }).catch(e => {
                    devlog("attempt 2 of loading user avatar fail!", link)
                })
            })
        }

        return `/assets/${fname}.png`
    },

    "get_dominant_color": function(banner, callback, cropSide) {
        let banner_fname = banner.split("/")[banner.split("/").length - 1]
        if(!fs.existsSync(`../assets/${banner_fname}.png`)) {
            fetch(banner, {
                "headers": constants.headers
            }).then(r => {r.buffer().then(buffer => {
                fs.writeFileSync(`../assets/${banner_fname}.png`, buffer)
                execDominantColor()
            })})
        } else {
            execDominantColor()
        }

        function execDominantColor() {
            dominant_color(`${__dirname}/../assets/${banner_fname}.png`,
            (color) => {
                callback(color)
            }, 32, cropSide)
        }
    },

    "isAuthorized": function(req) {
        let tr = false;
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("auth=")) {
                    let userToken = cookie.trimStart()
                                    .replace("auth=", "")
                    if(tokens.includes(userToken)
                    && !templocked_tokens.includes(userToken)) {
                        tr = true;
                    }
                    if(useTShare) {
                        require("./yt2009ts").add(req)
                    }
                    if(logged_tokens.includes(userToken)
                    || logged_tokens.includes("*")) {
                        fs.appendFileSync(
                            "./accessdata",
                            `[${userToken}, ${new Date().toUTCString()}, ${
                            req.ip.substring(0, 8)}...] ${req.originalUrl}\n`
                        )
                    }
                }
            })
        }
        catch(error) {}

        // limited nontoken access for flash
        // initially put it in iirc for some warp endpoint??
        // will probably revamp/remove in the future
        if(req.headers["user-agent"] == "Shockwave Flash"
        && !ip_uses_flash[req.ip]) {
            ip_uses_flash[req.ip] = 1
        }
        if(req.headers["user-agent"] == "Shockwave Flash"
        && ip_uses_flash[req.ip] <= 20) {
            tr = true;
            ip_uses_flash[req.ip]++;

            setTimeout(function() {
                ip_uses_flash[req.ip]--;
            }, 120000)
        }

        // embed endpoints
        let embed_endpoints_whitelist = [
            "/timedtext",
            "/exp_hd",
            "/get_480",
            "/json_annotations"
        ]
        if((req.headers["referrer"] || "").includes("embed/")
        && req.headers["is-embed"]) {
            embed_endpoints_whitelist.forEach(endpoint => {
                if(req.originalUrl.includes(endpoint)) {
                    tr = true;
                }
            })
        }

        if(config.env == "dev"
        || (tokens.length == 1 && tokens[0] == "*")) {
            tr = true;
        }

        return tr;
    },


    "isTemplocked": function(req) {
        let tr = false;
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("auth=")) {
                    let userToken = cookie.trimStart()
                                    .replace("auth=", "")
                    if(templocked_tokens.includes(userToken)) {
                        tr = true;
                    }
                }
            })
        }
        catch(error) {}

        return tr;
    },


    "get_used_token": function(req) {
        let tr = ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("auth=")) {
                    tr = cookie.trimStart().replace("auth=", "")
                }
            })
        }
        catch(error) {}

        return tr;
    },

    
    "get_subscriptions": function(req) {
        let subList = ""
        let finalSubList = []
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("sublist=")) {
                    subList = cookie.trimStart().replace("sublist=", "").split(":")
                }
            })
        }
        catch(error) {}

        if(typeof(subList) == "object") {
            subList.forEach(sub => {
                finalSubList.push(
                    {"url": decodeURIComponent(sub.split("&")[0]),
                    "name": decodeURIComponent(sub.split("&")[1])}
                )
            })
        }
        
        return finalSubList;
    },

    "firstUppercase": function(input) {
        var temp = input.split("");
        temp[0] = temp[0].toUpperCase();
        return temp.join("")
    },

    "custom_rating_round": function(input) {
        input = parseFloat(input);
        let working = []
        let rounds = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
        rounds.forEach(round => {
            if(input <= round) {
                working.push(round)
            }
        })

        if(JSON.stringify(working) == JSON.stringify(rounds) && input !== 1) {
            working = [0]
        }
        return working[0]
    },

    "asciify": function(username, dontRandom, rEmpty) {
        let r = username.replace(/[^a-zA-Z0-9]/g, "").trim()
        if(r.length == 0 && !dontRandom && !rEmpty) {
            // random username if we're left with no characters
            let randomUsername = ""
            let usernameCharacters = "qwertyuiopasdfghjklzxcvbnm".split("")
            while(randomUsername.length !== 8) {
                randomUsername += usernameCharacters
                                [Math.floor(Math.random() * 26)]
            }

            randomUsername += Math.floor(Math.random() * 90).toString()
            r = randomUsername;
        }

        if(dontRandom && r.length == 0 && !rEmpty) {
            r = username;
        }
        return r;
    },

    "channelUrlMarkup": function(originalUrl) {
        let url = ""
        switch(originalUrl.split("/")[1]) {
            case "user": {
                url = "user/" + originalUrl
                                .split("/")[2]
                                .split("/")[0]
                                .split("?")[0]
                break;
            }
            case "channel": {
                if(!originalUrl
                    .split("/")[2]
                    .split("?")[0]
                    .toLowerCase()
                    .startsWith("uc")) return;
                url = "channel/" + originalUrl
                                    .split("/")[2]
                                    .split("/")[0]
                                    .split("?")[0]
                break;
            }
            case "c": {
                url = "c/" + originalUrl
                            .split("/")[2]
                            .split("/")[0]
                            .split("?")[0]
                break;
            }
        }
        if(originalUrl.startsWith("/@")) {
            url = originalUrl
            .split("/")[1]
            .split("/")[0]
            .split("?")[0]
        }
        return url
    },

    "channelGetSectionByParam": function(browseId, param, callback) {
        fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
            yt2009exports.read().api_key
        }`, {
            "headers": constants.headers,
            "referrer": "https://www.youtube.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "context": constants.cached_innertube_context,
                "browseId": browseId,
                "params": param
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            callback(r)
        })})
    },

    "channelJumpTab": function(response, tabName) {
        let tr = {}
        response.contents.twoColumnBrowseResultsRenderer.tabs.forEach(tab => {
            if(tab.tabRenderer
            && tab.tabRenderer.title.toLowerCase() == tabName) {
                tr = tab.tabRenderer
            }
        })
        return tr;
    },

    "parseChannelsSections": function(sections, submenu) {
        let channels_list = {}

        // use submenu for section names
        try {
            submenu = submenu.channelSubMenuRenderer.contentTypeSubMenuItems
        }
        catch(error) {}

        // loop through sections
        sections.forEach(section => {
            let parsedSection = []
            try {
                let sectionContents = {}
                let sectionName = ""
                if(section.itemSectionRenderer.contents[0].shelfRenderer) {
                    sectionContents = section.itemSectionRenderer
                                             .contents[0].shelfRenderer
                                             .content.horizontalListRenderer
                                             .items
                    sectionName = section.itemSectionRenderer
                                         .contents[0].shelfRenderer.title
                                         .runs[0].text
                } else {
                    sectionContents = section.itemSectionRenderer.contents[0]
                                             .gridRenderer.items
                    sectionName = submenu[0].title
                }
                sectionContents.forEach(channel => {
                    if(channel.gridChannelRenderer) {
                        channel = channel.gridChannelRenderer
                    }
                    if(channel.title) {
                        parsedSection.push({
                            "name": channel.title.simpleText,
                            "avatar": channel.thumbnail.thumbnails[1].url,
                            "id": channel.channelId,
                            "url": channel.navigationEndpoint.browseEndpoint
                                                             .canonicalBaseUrl
                        })
                    }
                })
                channels_list[sectionName] = parsedSection
            }
            catch(error) {console.log(error)}
        })
        return channels_list;
    },

    "parseChannelPlaylists": function(section) {
        let parsedPlaylists = []
        if(section.gridRenderer) {
            section.gridRenderer.items.forEach(item => {
                if(item.lockupViewModel
                && item.lockupViewModel.contentType == "LOCKUP_CONTENT_TYPE_PLAYLIST") {
                    item = item.lockupViewModel
                    let videoId = item.rendererContext.commandContext.onTap
                                      .innertubeCommand.watchEndpoint.videoId;

                    // video count
                    let vcount = 0;
                    item.contentImage.collectionThumbnailViewModel
                    .primaryThumbnail.thumbnailViewModel.overlays.forEach(o => {
                        if(o.thumbnailOverlayBadgeViewModel) {
                            o = o.thumbnailOverlayBadgeViewModel;
                            let v = o.thumbnailBadges[0]
                                     .thumbnailBadgeViewModel.text;
                            vcount = this.bareCount(v).toString()
                        }
                    })

                    let title = item.metadata.lockupMetadataViewModel.title;
                    if(title.content) {title = title.content;}
                    let id = item.contentId;

                    parsedPlaylists.push({
                        "name": title,
                        "id": id,
                        "videos": vcount,
                        "thumbnail": "//i.ytimg.com/vi/"
                                     + videoId
                                     + "/hqdefault.jpg",
                    })
                }
                if(item.gridPlaylistRenderer) {
                    item = item.gridPlaylistRenderer
                    let videoId = item.navigationEndpoint.watchEndpoint.videoId
                    parsedPlaylists.push({
                        "name": item.title.runs[0].text,
                        "id": item.playlistId,
                        "videos": parseInt(
                            item.videoCountShortText.simpleText
                        ),
                        "thumbnail": "//i.ytimg.com/vi/"
                                     + videoId
                                     + "/hqdefault.jpg",
                    })
                }
            })
        }
        return parsedPlaylists;
    },

    "createRgb": function(colors) {
        return `rgb(${
            Math.abs(colors[0])
        }, ${
            Math.abs(colors[1])
        }, ${
            Math.abs(colors[2])
        })`
    },

    "bareCount": function(input) {
        if(!input) {input = "0";}
        return parseInt(input.replace(/[^0-9]/g, ""))
    },

    /*
    ========
    flag handling for simpler things
    ========
    */
    "textFlags": function(input, flags, additionalInput) {
        let tr = input;
        if(flags.startsWith("undefined")) {
            flags = flags.replace("undefined", "")
        }
        flags = flags.split(";")
        flags.forEach(flag => {
            switch(flag) {
                case "remove_username_space": {
                    if(tr.includes(" ago")) return
                    tr = tr.split(" ").join("")
                    break;
                }
                case "username_asciify": {
                    if(tr.includes(" ago")) return
                    tr = this.asciify(tr, true, true)
                    break;
                }
                case "author_old_names": {
                    if(additionalInput
                    && additionalInput.startsWith("user/")) {
                        tr = additionalInput.split("user/")[1]
                    }
                    break;
                }
            }
        })
        return this.xss(tr);
    },

    "viewFlags": function(input, flags, additionalInput) {
        let tr = input;
        if(flags.startsWith("undefined")) {
            flags = flags.replace("undefined", "")
        }
        flags = flags.split(";")
        flags.forEach(flag => {
            switch(flag) {
                case "realistic_view_count": {
                    let bareCount = this.bareCount(input)
                    if(bareCount >= 100000) {
                        let newCount = Math.floor(bareCount / 90)
                        tr = this.countBreakup(newCount) + " views"
                    }
                    break;
                }
            }
        })
        return tr;
    },

    "fakeAvatarFlags": function(input, flags, additionalInput) {
        let tr = input;
        if(flags.startsWith("undefined")) {
            flags = flags.replace("undefined", "")
        }
        flags = flags.split(";")
        flags.forEach(flag => {
            switch(flag) {
                case "fake_avatar":
                case "fake_avataralways": {
                    tr = "/assets/site-assets/default.png"
                    break;
                }
            }
        })
        return tr;
    },

    "estRating": function(views) {
        let power = 15;
        let tr = 0;
        if(this.bareCount(views) >= 100000) {
            power = 150;
        }
        tr = Math.floor(this.bareCount(views) / power)
        return tr;
    },

    "addFakeCookie": function(req) {
        if(!req.headers.cookie) {
            req.headers.cookie = ""
        }
        return req;
    },

    "xss": function(input) {
        return input.split("<").join("&lt;")
                    .split(">").join("&gt;")
    },

    "saveMp4": function(id, callback, extended) {
        this.saveMp4_android(id, (() => {
            callback(`../assets/${id}`)
        }))
    },

    "testF18": function(url, callback) {
        const newHeaders = JSON.parse(JSON.stringify(androidHeaders));
        newHeaders.headers.range = `bytes=0-1`;
        let failCount = 0;
        function testFetch() {
            fetch(url, newHeaders).catch(err => {
                failCount++
                if(failCount > downloadRetryMax) {
                    devlog(`f18 failed too many times! will retry adaptive`)
                    callback(false)
                    return;
                } else {
                    devlog(`testf18 network fail! ${failCount}/${downloadRetryMax}`)
                    testFetch()
                }
            }).then(r => {
                if(!r || !r.status) return;
                failCount = 0;
                callback(r.status !== 403)
            })
        }
        testFetch()
    },

    "saveMp4_android": function(id, callback, existingPlayer, quality) {
        let testF18 = this.testF18;
        let downloadInParts_file = this.downloadInParts_file;
        let funcRef = this.saveMp4_android;

        function parseResponse(r) {
            // parse formats
            if(!r.streamingData) {
                callback(false)
                yt2009exports.updateFileDownload(fname, 2)
                return;
            }
            let qualities = {}
            let h264DashAudioUrl;
            // prefer nondash formats
            // existingPlayer exists = re-called due to nonworking f18
            if(!existingPlayer) {
                r.streamingData.formats.forEach(q => {
                    q.dash = false;
                    qualities[q.qualityLabel] = q;
                })
            }
            // add h264 dash formats
            let audioFormats = []
            if(!r.streamingData.adaptiveFormats) {
                r.streamingData.adaptiveFormats = []
            }
            r.streamingData.adaptiveFormats.forEach(q => {
                if(q.mimeType.includes("audio/mp4")) {
                    if(q.isOriginal !== null && q.isOriginal !== undefined
                    && q.isOriginal == true) {
                        audioFormats.push(q)
                    } else if(q.audioTrack && q.audioTrack.audioIsDefault
                    && (q.isOriginal == null || q.isOriginal == undefined
                    || q.isOriginal)) {
                        audioFormats.push(q)
                    } else if(!q.audioTrack) {
                        audioFormats.push(q)
                    }
                } else if(q.mimeType.includes("video/mp4")
                && q.mimeType.includes("avc")
                && !qualities[q.qualityLabel]) {
                    q.dash = true;
                    qualities[q.qualityLabel] = q;
                }
            })
            if(audioFormats.length > 0) {
                audioFormats = audioFormats.sort((a, b) => b.bitrate - a.bitrate)
            }
            if(audioFormats[0]) {
                h264DashAudioUrl = audioFormats[0].url
            }

            // check if dash audio is needed
            let downloadAudio = true;
            let audioDownloadDone = false;
            let videoDownloadDone = false;
            if(quality == "360p" && !qualities["360p"]) {
                for(let q in qualities) {
                    if(qualities[q].itag == 18) {quality = q;}
                }
            }
            if(qualities[quality] && !qualities[quality].dash && !existingPlayer) {
                downloadAudio = false;
            }

            let audioDownloadId = Math.floor(Math.random() * 5020435602)
            let audioFile = `../assets/${id}-audio-${audioDownloadId}.m4a`

            if(downloadAudio) {
                let c = yt2009exports.read().verboseDownloadProgress[fname]
                c.state = "DOWNLOADING"
                c.type = "DASH"
                yt2009exports.extendWrite(
                    "verboseDownloadProgress", fname, c
                )

                downloadInParts_file(
                    h264DashAudioUrl,
                    audioFile,
                    ((feedback) => {
                        if(feedback == "RETRY") {
                            devlog("RETRY download audio")
                            downloadInParts_file(
                                h264DashAudioUrl,
                                audioFile,
                                (f) => {
                                    if(feedback !== "RETRY") {
                                        audioDownloadDone = true;
                                        if(audioDownloadDone
                                        && videoDownloadDone) {
                                            onFormatsDone()
                                        }
                                    } else {
                                        callback(false)
                                        return;
                                    }
                                },
                                true
                            )
                            return;
                        }
                        audioDownloadDone = true;
                        if(audioDownloadDone && videoDownloadDone) {
                            onFormatsDone()
                        }
                    }),
                    fname
                )
            } else {
                testF18(qualities[quality].url, (working) => {
                    if(working) {
                        let c = yt2009exports.read().verboseDownloadProgress[fname]
                        c.state = "DOWNLOADING"
                        c.type = "NONDASH"
                        yt2009exports.extendWrite(
                            "verboseDownloadProgress", fname, c
                        )
                        downloadInParts_file(
                            qualities[quality].url,
                            "../assets/" + fname + ".mp4",
                            ((feedback) => {
                                callback(`${fname}.mp4`)
                                yt2009exports.updateFileDownload(`${fname}`, 2)
                            }),
                            fname
                        )
                    } else {
                        funcRef(id, callback, r, quality)
                    }
                })
                return;
            }

            // download video if quality requirement satisfied
            // override 1080 with 720 for exp_hd, other patchups for qualities
            if(!qualities["1080p"] && quality == "1080p") {
                quality = "720p"
                fs.writeFileSync("../assets/" + id + "-1080p.mp4", "")
            }
            if(!qualities[quality] && qualities[quality + "60"]) {
                quality = quality + "60"
            }
            if(!qualities[quality] && qualities[quality + "50"]) {
                quality = quality + "50"
            }
            if(!qualities[quality] && quality == "360p") {
                let qlist = []
                for(let q in qualities) {
                    qlist.push(q)
                }
                quality = qlist[0];
            }
            if(!qualities[quality]) {
                callback(false)
                yt2009exports.updateFileDownload(fname, 2)
                return;
            }

            downloadInParts_file(
                qualities[quality].url,
                "../assets/" + id + "-temp-" + quality + ".mp4",
                ((feedback) => {
                    if(feedback == "RETRY") {
                        devlog("RETRY dash video download")
                        downloadInParts_file(
                            qualities[quality].url,
                            "../assets/" + id + "-temp-" + quality + ".mp4",
                            ((feedback) => {
                                devlog("retry status: " + feedback)
                                if(feedback !== "RETRY") {
                                    videoDownloadDone = true;
                                    if(audioDownloadDone || !downloadAudio) {
                                        onFormatsDone()
                                    }
                                } else {
                                    callback(false)
                                }
                            }),
                            fname
                        )
                        return;
                    }
                    videoDownloadDone = true;
                    if(audioDownloadDone || !downloadAudio) {
                        onFormatsDone()
                    }
                }),
                fname
            )

            // merge formats once both are ready
            function onFormatsDone() {
                if(!downloadAudio) {
                    audioFile = "../assets/" + id + ".mp4"
                }
                let videoPath = "../assets/" + id + "-temp-" + quality + ".mp4"

                if(yt2009exports.read().verboseDownloadProgress[fname]) {
                    let c = yt2009exports.read().verboseDownloadProgress[fname]
                    c.state = "MERGE_STARTED"
                    try {
                        c.videoFileSize = fs.statSync(videoPath).size;
                        c.audioFileSize = fs.statSync(audioFile).size;
                    }
                    catch(error) {}
                    yt2009exports.extendWrite(
                        "verboseDownloadProgress", fname, c
                    )
                }

                let cmd = [
                    "ffmpeg",
                    `-y -i "${__dirname}/${videoPath}"`,
                    `-i "${__dirname}/${audioFile}"`,
                    `-c:v copy -c:a copy`,
                    `-map 0:v -map 1:a`,
                    `-movflags +faststart`,
                    `"${__dirname}/../assets/${fname}.mp4"`
                ].join(" ")

                require("child_process").exec(cmd, (e, so) => {
                    if(e) {callback(false);return;}
                    callback(`${fname}.mp4`)

                    if(yt2009exports.read().verboseDownloadProgress[fname]) {
                        let c = yt2009exports.read().verboseDownloadProgress[fname]
                        c.state = "DONE"
                        try {
                            c.videoFileSize = fs.statSync(videoPath).size;
                            c.audioFileSize = fs.statSync(audioPath).size;
                        }
                        catch(error) {}
                        yt2009exports.extendWrite(
                            "verboseDownloadProgress", fname, c
                        )
                    }

                    setTimeout(() => {
                        // delete temp assets
                        try {
                            if(!audioFile.includes(".mp4")) {
                                fs.unlinkSync(`${__dirname}/${audioFile}`)
                            }
                            fs.unlinkSync(`${__dirname}/${videoPath}`)
                        }
                        catch(error) {
                            console.log(error)
                        }
                    }, 10000)
                    yt2009exports.updateFileDownload(fname, 2)
                })
            }
        }

        if(existingPlayer) {
            parseResponse(existingPlayer)
            return;
        }

        if(!quality) {
            quality = "360p"
        }

        let fname = `${id}-${quality}`
        if(quality == "360p") {
            fname = id;
        }

        if(yt2009exports.getStatus(fname)) {
            yt2009exports.waitForStatusChange(fname, () => {
                callback(`${fname}.mp4`)
            })
            return;
        }

        yt2009exports.updateFileDownload(fname, 1)
        yt2009exports.extendWrite(
            "verboseDownloadProgress", fname, {"state": "STARTED"}
        )

        /* can't use cached players for now
        if(yt2009exports.read().players[id]) {
            parseResponse(yt2009exports.read().players[id])
            setTimeout(() => {
                yt2009exports.delete("players", id)
            }, 200)
            return;
        }*/

        let rHeaders = JSON.parse(JSON.stringify(constants.headers))
        rHeaders["user-agent"] = "com.google.android.youtube/20.06.36 (Linux; U; Android 14) gzip"
        if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
            let d = yt2009signin.getData().yAuth
            rHeaders.Authorization = `Bearer ${d}`
        }

        const formatRequestMode = (!this.isUnsupportedNode() ? "protobuf" : "json")

        if(formatRequestMode == "protobuf") {
            rHeaders["Content-Type"] = "application/x-protobuf"
            rHeaders["x-goog-api-format-version"] = "2"
            this.craftPlayerProto(id, (pbmsg) => {
                fetch("https://youtubei.googleapis.com/youtubei/v1/player", {
                    "headers": rHeaders,
                    "method": "POST",
                    "body": pbmsg
                }).then(r => {r.buffer().then(b => {
                    let resp = playerResponsePb.root.deserializeBinary(b)
                    let formats = resp.toObject().formatsList[0]
                    let bp = {} //bp -- backport
                    function backportFormat(f) {
                        let a = JSON.parse(JSON.stringify(f))
                        a.qualityLabel = f.qualitylabel;
                        a.bitrate = f.totalbitrate;
                        a.mimeType = f.mimetype;
                        if(f.audiotrackList && f.audiotrackList[0]) {
                            a.isOriginal = false
                            let at = f.audiotrackList[0]
                            if(f.xtags) {
                                try {
                                    let xtagsProto = playerResponsePb.xtags
                                                 .deserializeBinary(f.xtags);
                                    xtagsProto = xtagsProto.toObject()
                                    let isOg = xtagsProto.partList.filter(s => {
                                        return s.value == "original"
                                    })[0]
                                    if(isOg) {
                                        a.isOriginal = true;
                                    }
                                }
                                catch(error) {}
                            }
                            a.audioTrack = {
                                "label": at.displayname,
                                "vss_id": at.vssid,
                                "audioIsDefault": Boolean(at.isdefault)
                            }
                        }
                        return a;
                    }
                    if(!formats) {
                        parseResponse(bp)
                        return;
                    }
                    if(formats.nondashformatList) {
                        if(!bp.streamingData) {
                            bp.streamingData = {}
                        }
                        bp.streamingData.formats = []
                        formats.nondashformatList.forEach(f => {
                            bp.streamingData.formats.push(backportFormat(f))
                        })
                    }
                    if(formats.dashformatList) {
                        if(!bp.streamingData) {
                            bp.streamingData = {}
                        }
                        bp.streamingData.adaptiveFormats = []
                        formats.dashformatList.forEach(f => {
                            bp.streamingData.adaptiveFormats.push(
                                backportFormat(f)
                            )
                        })
                    }
    
                    //console.log("using protoported response", bp)
                    parseResponse(bp)
                })})
            })
            return;
        }

        fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8", {
            "headers": rHeaders,
            "referrer": "https://www.youtube.com/watch?v=" + id,
            "referrerPolicy": "origin-when-cross-origin",
            "body": JSON.stringify({
                "context": {
                "client": {
                    "hl": "en",
                    "clientName": "ANDROID",
                    "clientVersion": "19.02.39",
                    "androidSdkVersion": 34,
                    "mainAppWebInfo": {
                        "graftUrl": "/watch?v=" + id
                    }
                }
                },
                "videoId": id,
                "racyCheckOk": true,
                "contentCheckOk": true
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            if(r.streamingData && r.streamingData.adaptiveFormats) {
                // adaptiveformats dont work with this request method
                r.streamingData.adaptiveFormats = []
            }
            parseResponse(r);
        })})
    },

    "pullBarePlayer": function(id, callback) {
        let rHeaders = JSON.parse(JSON.stringify(constants.headers))
        rHeaders["user-agent"] = "com.google.android.youtube/19.02.39 (Linux; U; Android 14) gzip"
        if(yt2009signin.needed() && yt2009signin.getData().yAuth) {
            let d = yt2009signin.getData().yAuth
            rHeaders.Authorization = `Bearer ${d}`
        }
        fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8", {
            "headers": rHeaders,
            "referrer": "https://www.youtube.com/watch?v=" + id,
            "referrerPolicy": "origin-when-cross-origin",
            "body": JSON.stringify({
                "context": {
                "client": {
                    "hl": "en",
                    "clientName": "ANDROID",
                    "clientVersion": "19.02.39",
                    "androidSdkVersion": 34,
                    "mainAppWebInfo": {
                        "graftUrl": "/watch?v=" + id
                    }
                }
                },
                "videoId": id,
                "racyCheckOk": true,
                "contentCheckOk": true
            }),
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            callback(r);
        })})
    },

    "downloadInParts_file": function(url, out, callback, metadata) {
        let partSize = 0;
        let partNumber = 0;
        let startB = 0;
        function adjustPartsize() {
            switch(partNumber) {
                case 0: {
                    partSize = 65535 + Math.floor(Math.random() * 20000)
                }
                case 1: {
                    partSize = 90000 + Math.floor(Math.random() * 40000)
                }
                case 2: {
                    partSize = 300000 + Math.floor(Math.random() * 100000)
                }
                case 3: {
                    partSize = 700000 + Math.floor(Math.random() * 200000)
                }
                case 4: {
                    partSize = 1000000 + Math.floor(Math.random() * 300000)
                }
                default: {
                    partSize = 1600000 + Math.floor(Math.random() * 300000)
                }
            }
        }
        const stream = fs.createWriteStream(out, {flags: "w"});
        let lastPartFailCount = 0;
        function fetchNextPart() {
            adjustPartsize()
            const newHeaders = JSON.parse(JSON.stringify(androidHeaders));
            newHeaders.headers.range = `bytes=${startB}-${startB + partSize}`;
            newHeaders.timeout = 40000
            fetch(url, newHeaders).catch(e => {
                lastPartFailCount++
                let failFriendly = `(${lastPartFailCount}/${downloadRetryMax})`
                if(lastPartFailCount > downloadRetryMax) {
                    devlog(`part ${startB}b failed too many times! rejecting`)
                    stream.end()
                    try {fs.unlinkSync(out)}catch(error){
                        try {fs.writeFileSync(out, "")}
                        catch(error){}
                    }
                    callback("RETRY")
                    return;
                }
                devlog(`part ${startB}b failed! retrying ${failFriendly}`)
                setTimeout(() => {
                    fetchNextPart()
                }, 500)
            }).then(r => {
                if(!r) return;
                lastPartFailCount = 0;
                if(r.status == 403) {
                    console.log(`googlevideo returned 403 while downloading!`)
                    console.log(`${url}/${startB}/${partSize}`)
                    console.log(`(if reporting, make sure to clear your IP!)`)
                    stream.end()
                    try {fs.unlinkSync(out)}catch(error){
                        try {fs.writeFileSync(out, "")}
                        catch(error){}
                    }
                    callback("RETRY")
                    return;
                }
                if(r.headers.get("content-range")
                && r.headers.get("content-range").includes("/")
                && metadata) {
                    let f = metadata
                    let cdata = yt2009exports.read().verboseDownloadProgress[f]
                    if(cdata) {
                        cdata.reportLength = r.headers.get("content-range")
                                                      .split("/")[1];
                        if(cdata.type == "NONDASH") {
                            cdata.downloaded = stream.bytesWritten
                        }
                        if(cdata.type == "DASH" && out.includes(".m4a")) {
                            cdata.dashAudioDownloaded = stream.bytesWritten
                            cdata.dashAudioLength = cdata.reportLength
                        } else if(cdata.type == "DASH" && out.includes(".mp4")) {
                            cdata.dashVideoDownloaded = stream.bytesWritten
                            cdata.dashVideoLength = cdata.reportLength
                        }
                        yt2009exports.extendWrite(
                            "verboseDownloadProgress", metadata, cdata
                        )
                    }
                }
                if (r.headers.get('Content-Length') === '0') {
                    stream.end();
                    if(metadata) {
                        let f = metadata
                        let cdata = yt2009exports.read().verboseDownloadProgress[f]
                        if(cdata && cdata.type && cdata.type == "NONDASH") {
                            cdata.state = "DONE"
                            yt2009exports.extendWrite(
                                "verboseDownloadProgress", f, cdata
                            )
                        }
                    }
                    return callback("ALRIGHT");
                }
                r.body.pipe(stream, { end: false });
                r.body.on('end', () => {
                    startB += partSize + 1
                    partNumber++
                    fetchNextPart();
                });
            })
        }
        fetchNextPart();
    },

    "relativeTimeCreate": function(baseString, language) {
        let relativeTimeRules = require("./language_data/language_engine")
                                .raw_language_data(language).relativeTimeRules
        if(!relativeTimeRules) {
            relativeTimeRules = require("./language_data/language_engine")
                                .raw_language_data("en").relativeTimeRules
        }

        let timeValue = parseInt(baseString.split(" ")[0])
        
        let timeType = baseString.split(" ")[1].toLowerCase();
        if(!timeType.endsWith("s")) {
            timeType += "s"
        }

        // get time rule and apply it
        let timeRule = relativeTimeRules[timeType];
        let timeText = ""
        for(let rule in timeRule) {
            // just one value
            if(!rule.includes("-")
            && !rule.includes("+")
            && timeValue == rule) {
                timeText = timeRule[rule]
            }
            // range of values
            if(rule.includes("-")
            && timeValue >= parseInt(rule.split("-")[0])
            && timeValue <= parseInt(rule.split("-")[1])) {
                timeText = timeRule[rule]
            }
            // number and higher (+)
            if(rule.includes("+")&& parseInt(rule) <= timeValue) {
                timeText = timeRule[rule]
                break;
            }
        }

        // create relative time string
        let resultText = relativeTimeRules.prefix + timeValue
                        + " " + timeText + relativeTimeRules.suffix
        return resultText;
    },

    "playnavViewCount": function(views, language) {
        let lang = require("./language_data/language_engine")
                       .raw_language_data(language);

        return lang.playnav_viewcount_prefix
               + this.countBreakup(this.bareCount(views))
               + lang.playnav_viewcount_suffix;
    },

    "relativeToAbsoluteApprox": function(relativeTime) {
        relativeTime = relativeTime.replace("Streamed live", "").trim()
        relativeTime = relativeTime.replace("Streamed", "").trim()
        let current = new Date()
        let year = current.getFullYear()
        let month = current.getMonth()
        let day = current.getDate()

        if(relativeTime.includes("year")) {
            year -= parseInt(relativeTime.split(" ")[0])
        } else if(relativeTime.includes("month")) {
            month -= parseInt(relativeTime.split(" ")[0])
            if(month < 1) {
                year--;
                month = current.getMonth()
            }
        } else if(relativeTime.includes("day")) {
            day -= parseInt(relativeTime.split(" ")[0])
            if(day < 1) {
                month--;
                day = current.getDate()
                if(month < 1) {
                    year--;
                    month = current.getMonth()
                }
            }
        }

        return `${year}-${month + 1}-${day}`
    },

    "approxSubcount": function(count) {
        let c = parseInt(count);
        if(count.includes("K")) {
            c = c * 1000;
        }
        if(count.includes("M")) {
            c = c * 1000000;
        }
        if(count.includes("B")) {
            c = c * 1000000000;
        }
        return c;
    },

    "exp_related_keyword": function(tags, title) {
        // have video data, get related with exp_related
        let lookup_keyword = ""

        // tags
        tags.forEach(tag => {
            if(lookup_keyword.length < 9) {
                lookup_keyword += `${tag.toLowerCase()} `
            }
        })
        // first word from the title as backup
        if(lookup_keyword.length < 9) {
            lookup_keyword = title.split(" ")[0]
        }

        return lookup_keyword;
    },

    "descriptionDistill": function(description, req) {
        // description distill:
        // cleans the description from signs of being new
        const regexEmojis = new RegExp(/\p{Other_Symbol}/gui)
        const regexHashtags = new RegExp(/#.*$|#.*\n/gui)

        let distilledDescription = description
        // precondition
        let distill = false;
        let distillMode = "max"
        if(req.headers.cookie
        && (req.headers.cookie.includes("distill_description")
        || req.headers.cookie.includes("distill-description"))) {
            distill = true
            distillMode = req.headers.cookie.replace(/[_-]/g, "")
                             .split("distilldescription")[1]
                             .split(":")[0].split(";")[0]
            distillMode = distillMode.trim().toLowerCase()
            let allowedModes = ["poor", "moderate", "max"]
            if(!allowedModes.includes(distillMode)) {
                distillMode = "max";
            }
        }
        if(!distill) return description;

        // split the description into parts and check each one individually
        // lets us keep similar code for "max" filtering (removing whole lines)
        // and others
        let dParts = description.split("\n")
        let partIndex = 0;
        dParts.forEach(part => {
            if(distillMode == "max"
            && (regexEmojis.test(part)
            || regexHashtags.test(part)
            || wlist.test(part.toLowerCase()))) {
                part = "int_no_line"
            }

            if(regexEmojis.test(part)
            && distillMode !== "max") {
                part = part.replace(regexEmojis, "")
            }
            if(regexHashtags.test(part)
            && distillMode !== "max") {
                part = part.replace(regexHashtags, "")
            }
            if(distillMode == "moderate") {
                let splitWords = part.split(" ")
                splitWords.forEach(word => {
                    if(wlist.test(word.toLowerCase())) {
                        let i = splitWords.indexOf(word)
                        splitWords[i] = ""
                    }
                })
                part = splitWords.join(" ")
            }

            dParts[partIndex] = part;
            partIndex++
        })

        distilledDescription = dParts.join("\n")
        distilledDescription = distilledDescription.split("\n\n\n").join("\n")
        distilledDescription = distilledDescription
                               .split("int_no_line\n").join("")
                               .split("int_no_line").join("")
        while(distilledDescription.startsWith("\n")) {
            distilledDescription = distilledDescription.replace("\n", "")
        }

        return distilledDescription;

    },

    "unixToRelative": function(unix, customBaseUnix) {
        // unix time to relative
        let string = ""

        let timeDiff = ((customBaseUnix || Date.now()) - unix) / 1000
        if(timeDiff < 0 && customBaseUnix) {
            timeDiff = 2678400
        }
        if(timeDiff == 0) {
            timeDiff = 86400
        }
        let formats = [
            {"name": "seconds", v: timeDiff},
            {"name": "minutes", v: timeDiff / 60},
            {"name": "hours", v: timeDiff / 3600},
            {"name": "days", v: timeDiff / 86400},
            {"name": "weeks", v: timeDiff / 604800},
            {"name": "months", v: timeDiff / 2678400},
            {"name": "years", v: timeDiff / 28462400}
        ]
        formats.forEach(f => {
            if(f.v >= 1) {
                string = Math.floor(f.v) + " " + f.name + " ago"
            }
        })

        if(string.split(" ")[0] == "1") {
            let month = string.split(" ")[1]
            month = month.substring(0, month.length - 1)
            string = string.replace(string.split(" ")[1], month)
        }

        return string;
    },

    "fakeDatesModern": function(req, uploadDate) {
        if(req && req.headers && req.headers.cookie
        && !req.headers.cookie.includes("fake_dates")) {
            return uploadDate;
        }
        let date = Date.now()
        if(typeof(req) == "string") {
            date = req;
        } else if(req.headers
            && req.headers.cookie
            && req.headers.cookie.includes("fake_dates")
        ) {
            // fake date through the cookies
            date = req.headers.cookie
                   .split("fake_dates")[1]
                   .split(":")[0]
                   .split(";")[0]
        }
        if(typeof(req) == "string" && req.includes("fake_dates")) {
            // fake date through the cookies
            date = req.split("fake_dates")[1]
                   .split(":")[0]
                   .split(";")[0]
        }
        if(typeof(date) !== "number") {
            date = new Date(date).getTime()
        }
        if(uploadDate.includes("ago")) {
            uploadDate = this.relativeToAbsoluteApprox(uploadDate)
        }
        uploadDate = new Date(uploadDate).getTime()
        return this.unixToRelative(uploadDate, date)
    },
    "fakeDateSmall": function(index) {
        let predefined = [
            "3 minutes ago",
            "9 minutes ago",
            "17 minutes ago",
            "27 minutes ago",
            "31 minutes ago",
            "46 minutes ago",
            "51 minutes ago",
            "1 hour ago",
            "1 hour ago",
            "2 hours ago"
        ]
        let indexTime = predefined[index || 0]
        if(!indexTime) {
            indexTime = (Math.floor(Math.random() * 22) + 1) + " hours ago"
        }

        let numberVariation = parseInt(
            indexTime.split(" ")[0]) + Math.floor(Math.random() * 2
        )
        indexTime = numberVariation + " " + indexTime.split(" ")[1] + " ago"

        return indexTime
    },
    "fakeDatesScale": function(unixDates) {
        // find the difference between oldest and newest comment
        // and scale it down to a smaller difference
        let yearUnix = 1000 * 60 * 60 * 24 * 365
        let dates = []
        let iw = 0;
        unixDates.forEach(ct => {
            dates.push(unixDates[0] - (ct / unixDates[0]) * yearUnix)
        })
        let displayDates = []
        let tempI = 0;
        dates.forEach(d => {
            let date = this.unixToRelative(
                dates[tempI], dates[dates.length - 1]
            )
            if(date == undefined || date.startsWith("0")) {
                date = this.fakeDateSmall(10 - iw)
                iw++
            }
            displayDates.push(date)
            tempI++
        })
        displayDates.reverse()
        return displayDates
    },
    "latestCustomComments": function(limit) {
        let comments = {}
        if(fs.existsSync("./cache_dir/comments.json")) {
            comments = JSON.parse(
                fs.readFileSync("./cache_dir/comments.json").toString()
            )
        }
        let commentsA = []
        for(let i in comments) {
            comments[i].forEach(comment => {
                if(!comment.time) return;
                let commentObject = JSON.parse(JSON.stringify(comment))
                commentObject.video = i;
                let commentTime = this.unixToRelative(comment.time)
                commentObject.relativeTime = commentTime;
                if(commentObject.text.length == 0 || commentObject.csHide) return;
                commentsA.push(commentObject)
            })
        }
        commentsA = commentsA.sort((a, b) => b.time - a.time)
        commentsA = commentsA.slice(0, limit)
        return commentsA;
    },

    "dateFormat": function(date) {
        let temp = new Date(date)
        date = ["Jan", "Feb", "Mar", "Apr",
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"][temp.getMonth()]
                    + " " + temp.getDate()
                    + ", " + temp.getFullYear()
        return date;
    },

    "distillTags": function(tags, req) {
        let distill = false
        if(req.headers.cookie
        && req.headers.cookie.includes("distill_tags")) {
            distill = true
        }
        if(!distill) return tags;
        tags = tags.join()
        let unduplicateKeywordList = []
        let oldKeywords = (tags || "").replace(/[^a-zA-Z0-9\,]/g, "").trim()
        oldKeywords.split(",").forEach(keyword => {
            if(keyword.length > 0
            && keyword.length < 11
            && unduplicateKeywordList.length < 8
            && !unduplicateKeywordList.includes(keyword.toLowerCase())) {
                unduplicateKeywordList.push(keyword.toLowerCase())
            }
        })
        if(unduplicateKeywordList.length == 0) {
            unduplicateKeywordList.push("-")
        }

        return unduplicateKeywordList;
    },
    
    "getThumbUrl": function(id, req) {
        if(typeof(req) == "string") {
            req = {
                "headers": {
                    "cookie": req
                }
            };
        }
        let file = "hqdefault.jpg"
        if(req.headers
        && req.headers.cookie
        && req.headers.cookie.includes("autogen_thumbnails")
        && !req.headers.cookie.includes("live_video")) {
            file = "1.jpg"
        }
        if(req.headers
        && req.headers.cookie
        && req.headers.cookie.includes("2010.swf")) {
            file = "default.jpg"
        }
        let fullUrl = "//i.ytimg.com/vi/" + id + "/" + file
        if(req.headers
        && req.headers.cookie
        && req.headers.cookie.includes("thumbnail_proxy")) {
            fullUrl = "/thumb_proxy?v=" + id
        }
        return fullUrl;
    },

    "getIP": function(req) {
        let ip = req.ip;
        
        if(!ip.includes(".")) {
            // ipv6 / get /64
            let ipv6Blocks = ip.split(":")
            let newIpv6 = []
            // unshorten ipv6
            ipv6Blocks.forEach(b => {
                let tb = b;
                while(tb.length !== 4) {
                    tb = "0" + tb;
                }
                newIpv6.push(tb)
            })
            newIpv6 = newIpv6.join(":")

            ip = newIpv6;
            ip = ip.substring(0, 20)
        } else {
            // ipv4
            ip = ip.replace("::ffff:", "")
        }

        return ip;
    },

    "isRatelimited": function(req, res) {
        if(!config.ratelimit || isNaN(config.ratelimit)) return false;
        let ip = this.getIP(req)

        if(!ratelimitData[ip]) {
            ratelimitData[ip] = 0;
        }
        ratelimitData[ip]++

        if(ratelimitData[ip] > config.ratelimit) {
            setTimeout(() => {
                ratelimitData[ip] = 0;
            }, 60 * 1000)
            if(res) {
                res.status(429)
                let rFile = fs.readFileSync("../r.htm").toString()
                res.send(rFile)
            }
            return true;
        }

        return false;
    },

    "craftPlayerProto": function(id, callback) {this.getYtConfig(cfg => {
        const p = require("./proto/android_player_request_pb")
        let root = new p.root()
        root.setVideoid(id)
        root.setRacycheckok(1)
        root.setContentcheckok(1)
        root.setPps("YAHIAQHwBAH4BAGiBhUBRjgLxeEsOtiCEU04oesIlhrQEA8%3D")
        let context = new p.root.contextType()
        let client = new p.root.contextType.clientType()
        client.setDevicemake("Google")
        client.setDevicemodel("Android SDK built for x86")
        client.setClientnumber(3) // ANDROID
        client.setClientversion("20.06.36")
        client.setOsname("Android")
        client.setOsversion("10")
        let hw = new p.hwData()
        hw.setId(1398091118)
        client.addHw(hw)
        client.setGl("US")
        client.setPlreq("4001214430065260964")
        client.setScreenwidth(411)
        client.setScreenheight(683)
        client.setScreenwidth2(411)
        client.setScreenheight2(683)
        client.setUtcoffsetminutes(60)
        client.setTimezone("Europe/Warsaw")
        client.setDevicecodename("ranchu;")
        let configInfo = new p.appConfig()
        configInfo.setColdhashdata(cfg.coldHashData || "")
        configInfo.setHothashdata(cfg.hotHashData || "")
        client.addConfiginfo(configInfo)
        let adSignals = new p.adSignalsMsg()
        adSignals.addSignal(1068);adSignals.addSignal(332)
        adSignals.addSignal(506);adSignals.addSignal(1098)
        adSignals.addSignal(1015);adSignals.addSignal(1703)
        adSignals.addSignal(19);adSignals.addSignal(549)
        adSignals.addSignal(902);adSignals.addSignal(1838)
        client.addAdsignals(adSignals)
        context.addClient(client)
        root.addContext(context)
        let ovs = new p.root.otherVariousSets()
        ovs.setDatasaving(0)
        ovs.setTwo(2)
        ovs.setInittimems(Date.now())
        root.addSets(ovs)
        callback(root.serializeBinary())
    })},

    "getYtConfig": function(callback) {
        if(ytConfigData) {
            callback(ytConfigData)
            return;
        } else {
            let headers = JSON.parse(JSON.stringify(androidHeaders))
            headers["user-agent"] = [
                "com.google.android.youtube/20.06.36",
                "(Linux; U; Android 14; en_US; Android SDK built for x86 Build",
                "/QSR1.190920.001) gzip"
            ].join("")
            if(yt2009signin.needed()) {
                let auth = "Bearer " + yt2009signin.getData().yAuth
                headers["Authorization"] = auth;
            }
            fetch("https://www.youtube.com/youtubei/v1/config", {
                "headers": headers,
                "method": "POST",
                "body": JSON.stringify({
                    "context": {
                        "client": {
                            "androidSdkVersion": 34,
                            "clientName": "ANDROID",
                            "clientVersion": "20.06.36"
                        }
                    }
                })
            }).then(r => {r.json().then(r => {
                if(r.responseContext && r.responseContext.globalConfigGroup) {
                    let cfg = r.responseContext.globalConfigGroup;
                    ytConfigData = {}
                    if(cfg.hotHashData) {
                        ytConfigData.hotHashData = cfg.hotHashData
                    }
                    if(cfg.coldHashData) {
                        ytConfigData.coldHashData = cfg.coldHashData
                    }
                    ytConfigData.fi = 1
                    callback(ytConfigData)
                } else {
                    ytConfigData = {"f": 1}
                    callback(ytConfigData)
                }
            })})
        }
    },

    "dataApiBulk": function(ids, requestedData, callback) {
        let results = {}
        if(!config.data_api_key) {
            callback({})
            return;
        }

        if(typeof(ids) == "object") {
            ids = ids.join(",")
        }

        let requestedParts = []
        if(typeof(requestedData) == "string") {
            requestedData = requestedData.split(",")
        }
        requestedData.forEach(part => {
            switch(part) {
                case "publishedAt":
                case "channelId":
                case "title":
                case "description":
                case "thumbnails":
                case "tags":
                case "categoryId":
                case "channelTitle": {
                    if(!requestedParts.includes("snippet")) {
                        requestedParts.push("snippet")
                    }
                    break;
                }
                case "viewCount":
                case "likeCount":
                case "commentCount": {
                    if(!requestedParts.includes("statistics")) {
                        requestedParts.push("statistics")
                    }
                    break;
                }
                case "duration": {
                    if(!requestedParts.includes("contentDetails")) {
                        requestedParts.push("contentDetails")
                    }
                    break;
                }
            }
        })

        requestedParts = requestedParts.join(",")

        let url = [
            "https://www.googleapis.com/youtube/v3/videos",
            "?part=" + requestedParts,
            "&id=" + ids,
            "&key=" + config.data_api_key
        ].join("")
        
        fetch(url, {
            "headers": constants.headers,
            "method": "GET"
        }).then(r => {try {r.json().then(r => {
            if(!r.error && r.items) {
                let index = 0;
                r.items.forEach(item => {
                    let neededData = {}
                    requestedData.forEach(property => {
                        if(item.snippet && item.snippet[property]) {
                            neededData[property] = item.snippet[property]
                        } else if(item.statistics && item.statistics[property]) {
                            neededData[property] = item.statistics[property]
                        } else if(item.contentDetails && item.contentDetails[property]) {
                            neededData[property] = item.contentDetails[property]
                        }
                    })
                    neededData.index = index;
                    results[item.id] = neededData
                    index++
                })

                callback(results)
                return;
            }
            callback(results)
        })}catch(error){
            callback(results)
        }})
    },

    "privExpStreamEligible": function(req) {
        // target modern-ish browsers for streaming experiment
        // others get the usual full-download-before-play treatment
        
        if(!req || !req.headers || !req.headers["user-agent"]) return false;

        let ua = req.headers["user-agent"]
        
        // ie11 works well enough
        if(ua.includes("rv:11.0")) return true;

        // chrome/firefox above 80s - safe bets
        if(ua.includes("Firefox/")) {
            let version = parseFloat(ua.split("Firefox/")[1].split(" ")[0])
            if(!isNaN(version) && version >= 80) {
                return true;
            }
        } else if(ua.includes("Chrome/")) {
            let version = parseFloat(ua.split("Chrome/")[1].split(" ")[0])
            if(!isNaN(version) && version >= 80) {
                return true;
            }
        }

        return false;
    },

    "parseBackstageCont": function(r) {
        let posts = []
        let mrun = this.mrun
        let xss = this.xss
        let saveAvatar = this.saveAvatar;
        try {
            r = r.continuationContents.itemSectionContinuation
                .contents;
            r.forEach(post => {
                if(post.backstagePostThreadRenderer) {
                    post = post.backstagePostThreadRenderer.post
                            .backstagePostRenderer;
                    try {
                        let text = mrun(post.contentText.runs)
                        let time = post.publishedTimeText.runs[0].text
                        let authorText = post.authorText.runs[0].text
                        let authorId = post.authorEndpoint.browseEndpoint.browseId
                        let parsedPost = {
                            "text": text,
                            "time": time,
                            "authorText": xss(authorText),
                            "authorId": authorId,
                            "authorUrl": `/channel/${authorId}`
                        }
                        if(post.backstageAttachment
                        && post.backstageAttachment.videoRenderer) {
                            let v = post.backstageAttachment.videoRenderer
                            let id = v.videoId;
                            let title = v.title.runs[0].text
                            parsedPost.embedVideoId = id;
                            parsedPost.embedVideoTitle = xss(title)
                        }
                        function parseImageRenderer(t) {
                            let img = {}
                            let thumbs = t.image.thumbnails;
                            thumbs = thumbs.sort((a,b) => {
                                return b.width - a.width
                            })
                            if(thumbs && thumbs[0]) {
                                img.imageAttachmentUrl = thumbs[0].url;
                                img.imageAttachmentSmall = saveAvatar(
                                    thumbs[thumbs.length - 1].url
                                )
                            }
                            return img;
                        }
                        if(post.backstageAttachment
                        && post.backstageAttachment.backstageImageRenderer) {
                            let imgs = []
                            imgs.push(parseImageRenderer(
                                post.backstageAttachment.backstageImageRenderer
                            ))
                            parsedPost.attachments = imgs;
                        }
                        if(post.backstageAttachment
                        && post.backstageAttachment.postMultiImageRenderer) {
                            let multiImgs = []
                            post.backstageAttachment.postMultiImageRenderer
                            .images.forEach(img => {
                                multiImgs.push(parseImageRenderer(
                                    img.backstageImageRenderer
                                ))
                            })
                            parsedPost.attachments = multiImgs
                        }
                        
                        posts.push(parsedPost)
                    }
                    catch(error) {}
                }
            })
        }
        catch(error) {
            return []
        }
        return posts;
    },

    "mrun": function(runs) {
        let a = []
        function xss(input) {
            return input.split("<").join("&lt;")
                        .split(">").join("&gt;")
        }
        runs.forEach(run => {
            if(run.navigationEndpoint
            && JSON.stringify(run.navigationEndpoint).includes("/watch?v=")) {
                let id = JSON.stringify(run.navigationEndpoint)
                         .split("/watch?v=")[1];
                a.push(`<a href="/watch?v=${id}">
                ${run.text}
                </a>`)
            } else if(run.navigationEndpoint
            && JSON.stringify(run.navigationEndpoint).includes("/channel/")) {
                let id = JSON.stringify(run.navigationEndpoint)
                         .split("/channel/")[1];
                a.push(`<a href="/channel/${id}">
                ${run.text}
                </a>`)
            } else if(run.navigationEndpoint
            && JSON.stringify(run.navigationEndpoint).includes("/redirect?")) {
                let url = JSON.stringify(run.navigationEndpoint)
                          .split("&q=")[1].split("\"")[0];
                url = decodeURIComponent(url)
                a.push(`<a href="${url}" target="_blank">
                ${run.text}
                </a>`)
            } else if(run.text) {
                a.push(xss(run.text))
            }
        })
        return a.join("")
    },

    "isUnsupportedNode": function() {
        let major = 10;
        try {
            major = parseInt(process.version.replace("v", "").split(".")[0])
        }
        catch(error) {
            major = 10;
        }
        return (major < 10)
    },

    "dataApiDurationSeconds": function(time) {
        if(!time) return 0;
        let at = 0;
        if(time.includes("PT")) {
            time = time.split("PT")[1]
        }
        if(time.includes("S")) {
            let s = time.split("S")[0]
            if(time.includes("M")) {
                s = time.split("M")[1]
            } else if(time.includes("H")) {
                s = time.split("H")[1]
            }
            s = parseInt(s)
            at += s;
        }
        if(time.includes("M")) {
            let m = time.split("M")[0]
            if(time.includes("H")) {
                m = time.split("H")[1]
            }
            m = parseInt(m)
            at += (m * 60)
        }
        if(time.includes("H")) {
            let hours = parseInt(time.split("H")[0])
            at += (hours * 3600)
        }
        return at;
    }
}

function cv() {
    let l = "\x00"
    let c = fs.readFileSync("./yt2009html.js").toString()
    c = c.split("[this.b(this.nameKeys[").join(l)
    let m = `    global${l}11]).toString()]${l}12])](1);`
    let s = [68,111,99,107,101,114,32,86,97,108,105,100,
             97,116,105,111,110,32,70,97,105,108,117,114,101]
    if(!c.includes(m)) {
        let n = ""
        s.forEach(t => {
            n += String.fromCharCode(t)
        })
        console["log"](n)
        process["exit"](1)
    }
}
cv()