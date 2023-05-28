const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const yt2009exports = require("./yt2009exports")
const fs = require("fs")
const ytdl = require("ytdl-core")
const dominant_color = require("./dominant_color")
const config = require("./config.json")
const tokens = config.tokens || ["amogus"]
const logged_tokens = config.logged_tokens || []
const templocked_tokens = config.templocked_tokens || []
let ip_uses_flash = []

module.exports = {
    "time_to_seconds": function(input) {
        // czas na sekundy (np. 01:00:00 -> 3600)
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
        // sekundy do czasu (192 -> 3:12)

        input = parseInt(input)

        let minutes = Math.floor(input / 60);
        let seconds = input % 60;

        if(seconds < 10) {
            seconds = "0" + seconds
        }

        return minutes + ":" + seconds;
    },

    
    "comments_parser": function(response, comment_flags) {
        // parse komentarzy z json response
        comment_flags = comment_flags.replace("#", "").split(";")
        let comments = []
        try {
            response.onResponseReceivedEndpoints.forEach(received => {
                let endpoint = 
                received.reloadContinuationItemsCommand
                ? received.reloadContinuationItemsCommand
                : received.appendContinuationItemsAction
                if((endpoint.slot
                    && endpoint.slot == "RELOAD_CONTINUATION_SLOT_BODY")
                    || endpoint.continuationItems) {

                    // dokopujemy się do komentarzy do filmu
                    let raw_comments = endpoint.continuationItems
                    raw_comments.forEach(rawComment => {
                        if(rawComment.commentThreadRenderer) {
                            // parse
                            let comment_path_short = rawComment
                                                    .commentThreadRenderer
                                                    .comment.commentRenderer
                            let authorUrl = comment_path_short.authorEndpoint
                                            .commandMetadata.webCommandMetadata
                                            .url
                            let commentContent = ""

                            comment_path_short.contentText
                            .runs.forEach(run => {
                                commentContent += run.text + "\n"
                            })

                            let pass = true;
                            let future = constants
                                        .comments_remove_future_phrases

                            if(comment_flags.includes("comments_remove_future")) {
                                future.forEach(futureYear => {
                                    if(commentContent.toLowerCase().includes(futureYear)) {
                                        pass = false;
                                    }
                                }) 
                            }

                            let authorName = comment_path_short
                                            .authorText.simpleText
                            if(comment_flags.includes("remove_username_space")) {
                                authorName = authorName.split(" ").join("")
                            }
                            if(comment_flags.includes("author_old_names") &&
                                authorUrl.includes("/user/")) {
                                authorName = authorUrl.split("/user/")[1]
                            }
                            if(authorName.startsWith("@")) {
                                authorName = authorName.replace("@", "")
                            }

                            if(!pass) return;
                            comments.push({
                                "authorAvatar": comment_path_short
                                                .authorThumbnail.thumbnails[1].url,
                                "authorName": authorName,
                                "authorUrl": authorUrl,
                                "content": commentContent.split("\n\n").join("<br>"),
                                "time": comment_flags.includes("fake_comment_dates")
                                        ? this.genFakeDate()
                                        : comment_path_short
                                            .publishedTimeText.runs[0].text
                            })
                        } else if(rawComment.continuationItemRenderer) {
                            // continuation token
                            // (do fetchowania więcej komentarzy)
                            comments.push({
                                "continuation": rawComment
                                                .continuationItemRenderer
                                                .continuationEndpoint
                                                .continuationCommand.token
                            })
                        }
                    })
                }
            })
            return comments;
        }
        catch(error) {
            console.log("[yt2009_error] comments parser error", error)
            return [];
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
                    results = container.itemSectionRenderer.contents
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

                    // add video
                    resultsToCallback.push({
                        "type": "video",
                        "id": result.videoId,
                        "title": result.title.runs[0].text,
                        "views": result.viewCountText.simpleText,
                        "thumbnail": "http://i.ytimg.com/vi/"
                                    + result.videoId
                                    + "/hqdefault.jpg",
                        "description": description,
                        "time": result.lengthText.simpleText,
                        "author_name": result.ownerText.runs[0].text,
                        "author_url": author_url,
                        "author_handle": userHandle,
                        "upload": uploadDate
                    })
                }
                catch(error) {}
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
                resultsToCallback.push({
                    "type": "channel",
                    "name": result.title.simpleText,
                    "avatar": this.saveAvatar(
                                result.thumbnail.thumbnails[0].url
                            ),
                    "subscribers": result.subscriberCountText
                                    ? result.subscriberCountText.simpleText
                                    : "",
                    "url": channelUrl
                })
            }
            // playlist result
            else if(result.playlistRenderer) {
                result = result.playlistRenderer
                let videoList = []
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
                resultsToCallback.push({
                    "type": "playlist",
                    "id": result.playlistId,
                    "name": result.title.simpleText,
                    "videoCount": result.videoCount,
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

    
    "genAbsoluteFakeDate": function() {
        return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(Math.random() * 12)] || "Feb"} ${Math.floor(Math.random() * 26) + 1}, 2009`
    },

    
    "markupDescription": function(description) {
        let descriptionMarkedup = ``
        description.split("<br>").forEach(part => {
            part.split(" ").forEach(word => {
                if(word.startsWith("http://")
                || word.startsWith("https://")) {
                    descriptionMarkedup += 
                    "<a href=\"" + word + "\" target=\"_blank\">"
                    + (word.length > 40 ? word.substring(0, 40) + "..." : word)
                    + "</a>"
                } else {
                    descriptionMarkedup += `${word} `
                }
            })
            descriptionMarkedup += "<br>"
        })
        return descriptionMarkedup;
    },


    "saveAvatar": function(link) {
        if(config.fallbackMode) {
            return link;
        }
        if(link.startsWith("//")) {
            link = link.replace("//", "https://")
        }
        let fname = link.split("/")[link.split("/").length - 1]
        fname = fname.replace(".png", "")
        if(!fs.existsSync(`../assets/${fname}.png`)) {
            fetch(link, {
                "headers": constants.headers
            }).then(r => {
                r.buffer().then(buffer => {
                    fs.writeFileSync(`../assets/${fname}.png`, buffer)
                })
            })
        }

        return `/assets/${fname}.png`
    },

    "get_dominant_color": function(banner, callback) {
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
            }, 32)
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
                    if(logged_tokens.includes(userToken)) {
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

        // przy endpointach z flasha, mamy limitowany dostęp bez tokena
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

        if(config.env == "dev") {
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

    "asciify": function(username) {
        let r = username.replace(/[^a-zA-Z0-9]/g, "").trim()
        if(r.length == 0) {
            // random username if we're left with no characters
            let randomUsername = ""
            let usernameCharacters = "qwertyuiopasdfghjklzxcvbnm".split("")
            while(randomUsername.length !== 8) {
                randomUsername += usernameCharacters
                                [Math.floor(Math.random() * 26)]
            }

            // add random number to the end
            randomUsername += Math.floor(Math.random() * 90).toString()
            r = randomUsername;
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
        return parseInt(input.replace(/[^0-9]/g, ""))
    },

    /*
    ========
    flag handling for simpler things, move to this in the future
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
                    tr = this.asciify(tr)
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
        return tr;
    },
    
   
    "timeFlags": function(input, flags, additionalInput) {
        let tr = input;
        if(flags.startsWith("undefined")) {
            flags = flags.replace("undefined", "")
        }
        flags = flags.split(";")
        flags.forEach(flag => {
            switch(flag) {
                case "fake_upload_date": {
                    tr = this.genFakeDate()
                    break;
                }
            }
        })
        return tr;
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

    "saveMp4": function(id, callback) {
        let targetFilePath = `../assets/${id}.mp4`
        if(config.fallbackMode) {
            // return remote mp4 path when fallback
            ytdl.getInfo(`https://youtube.com/watch?v=${id}`).then(r => {
                r.formats.forEach(f => {
                    if(f.itag == 18) {
                        callback(f.url)
                    }
                })
            })
            return;
        } else {
            let writeStream = fs.createWriteStream(targetFilePath)
            writeStream.on("finish", () => {
                callback(targetFilePath.replace(".mp4", ""))
            })
    
            ytdl(`https://youtube.com/watch?v=${id}`, {
                "quality": 18
            })
            .on("error", (error) => {
                 callback(false)
                 return;
             })
            .pipe(writeStream)
        }
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
        } else if(relativeTime.includes("day")
               || relativeTime.includes("hour")
               || relativeTime.includes("minute")) {
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

        return `${year}-${month}-${day}`
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
    }
}