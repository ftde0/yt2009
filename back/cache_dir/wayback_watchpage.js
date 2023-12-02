const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("../yt2009utils")
const html = require("node-html-parser")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(
            fs.readFileSync(`${__dirname}/wayback_watch_cache.json`).toString()
        )
    }
    catch(error) {}
} 

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },
    "readCacheOnly": function(id) {
        id = id.substring(0,11)
        if(cache[id]) {
            return cache[id]
        } else {
            return false;
        }
    },
    "read": function(id, callback, resetCache) {
        id = id.substring(0,11)
        let empty = {
            "comments": [], 
            "title": "",
            "description": "",
            "tags": [],
            "authorName": "",
            "authorBanner": "",
            "authorAvatar": "",
            "related": [],
            "archiveYear": 0
        }
        // get from cache or clean fetch a closest save to 2009-11-11, then parse with this.parse()
        if(cache[id] && !resetCache) {
            callback(cache[id])
        } else {
            fetch(`http://web.archive.org/web/20091111/http://www.youtube.com/watch?v=${id}`, {
                "headers": {
                    "user-agent": "yt2009 / twt@ybnn670"
                }
            }).catch(error => {
                callback(empty)
            }).then(r => {
                if(!r) {
                    console.log("wayback fail")
                    callback(empty)
                    this.write(id, empty)
                    return;
                }
                r.text().then(res => {
                // if the save is from 2014 or later, don't use
                    try {
                        if(res.split("FILE ARCHIVED ON ")[1]) {
                            let archiveDate = new Date(res.
                                split("FILE ARCHIVED ON ")[1]
                                .split(" AND")[0]);
                            empty.archiveYear = archiveDate.getFullYear()
                            if(archiveDate.getFullYear() >= 2014) {
                                this.write(id, empty)
                                callback(empty)
                            } else {
                                res = html.parse(res)
                                this.parse(res, archiveDate.getFullYear(),
                                            (waybackData) => {
                                    this.write(id, waybackData)
                                    callback(waybackData)
                                })
                            }
                        } else {
                            this.write(id, empty)
                            callback(empty)
                        }
                    }
                    catch(error) {
                        console.log(error)
                        res = html.parse(res)
                        this.parse(res, archiveDate.getFullYear(),
                                    (waybackData) => {
                            this.write(id, waybackData)
                            callback(waybackData)
                        })
                    }
                })
            })
        }
    },
    "parse": function(data, archiveYear, callback) {
        let callbackMade = false;
        let waybackData = {"comments": [], 
                            "title": "",
                            "description": "",
                            "tags": [],
                            "authorName": "",
                            "authorBanner": "",
                            "authorAvatar": "",
                            "related": [],
                            "archiveYear": archiveYear}

        // 5sec fallback
        setTimeout(function() {
            if(!callbackMade) {
                callback(waybackData)
            }
        }, 5000)

        // metadata
        let videoAuthor = data.querySelector(`
        .wsWrapper .wsHeading a, 
        #watch-channel-stats a,
        #watch-headline-user-info #watch-username strong, 
        #watch-headline-user-info .yt-uix-button-content,
        #watch7-user-header .yt-user-name,
        .watch-description-username`)

        let titleSelector = data.querySelector(`.vidTitle,
        #watch-channel-title h1,
        #watch-vid-title h1, 
        #watch-headline-title span,
        #eow-title`)

        waybackData.title = titleSelector ? titleSelector.innerText : "";

        if(!waybackData.title) return waybackData;


        let descriptionSelector = data.querySelector(`
        .videoDescDiv.expand-content,
        #watch-video-details-inner-more .description span,
        .expand-content .watch-video-desc span,
        #watch-info #eow-description,
        #watch-description #eow-description`)
        waybackData.description = descriptionSelector
                                    && descriptionSelector.innerHTML ?
                                    descriptionSelector.innerHTML : "";


        data.querySelectorAll(`.tagValues a,
                                #watch-video-tags a,
                                .watch-info-tag-list a,
                                #watch-tags a`).forEach(tag => {
            waybackData.tags.push(tag.innerText)
        })


        // author
        waybackData.authorName = videoAuthor.innerText;
        try {
            waybackData.authorAvatar = data.querySelector(`
            [alt="Channel Icon"],
            #channelVidsTop .channelIcon img,
            #watch-channel-icon img,
            .yt-user-photo img
            `).getAttribute("src")
        }
        catch(error) {}
        waybackData.authorBanner =  data
                                    .querySelector("#watch-channel-brand-cap img") ? 
                                data
                                .querySelector("#watch-channel-brand-cap img")
                                .getAttribute("src") : ""


        // parse comments
        // .commentEntry, .commentEntryReply - 2006-2008
        // .watch-comment-entry              - late 2008-early 2010
        // li.comment                        - 2010-2013 (the last year comments weren't requested)
        data.querySelectorAll(`.commentEntry,
                            .commentEntryReply,
                            .watch-comment-entry, 
                            li.comment,
                            #watch-comments-core li`).forEach(comment => {
            let authorSelector = comment.querySelector(`
                                    .commentHead a,
                                    .watch-comment-auth,
                                    p.metadata .yt-user-name,
                                    .metadata .author a,
                                    .metadata .author,
                                    .comment-author`)
            let commentAuthorName = authorSelector ?
                                    authorSelector.innerText : "";
            let commentAuthorUrl = "#"
            try {
                commentAuthorUrl = authorSelector ?
                                    authorSelector.getAttribute("href")
                                                  .split("youtube.com")[1] : ""
            }
            catch(error) {}

            let likeCount = 0;
            let likeSelector = comment.querySelector(`
                .watch-comment-score,
                .comments-rating-positive
            `)
            if(likeSelector) {
                likeCount = parseInt(likeSelector.innerText)
            }

            let postTimeSelector = comment.querySelector(`
            .commentHead .smallText,
            .watch-comment-time,
            .metadata .time a,
            .metadata .time,
            .time`)
            let postTime = postTimeSelector ? postTimeSelector.innerText : "";
            let contentSelector = comment.querySelector(`.commentBody,
            .watch-comment-body div,
            .comment-text`)
            let content = contentSelector ? contentSelector.innerText : "";

            waybackData.comments.push({
                "authorName": commentAuthorName,
                "authorUrl": commentAuthorUrl,
                "time": postTime,
                "content": content,
                "likes": likeCount
            })
        })

        // related videos
        data.querySelectorAll(`#watch-related-vids-body .video-entry,
                            #watch-related .video-list-item,
                            #watch-related li`).forEach(video => {
            let relatedElement = {
                "id": "",
                "title": "",
                "time": "",
                "uploaderName": "",
                "uploaderUrl": "",
                "viewCount": ""
            }

            let idSelector = video.querySelector(`
                            .video-mini-title a,
                            .video-list-item-link,
                            .related-video`)
            if(!idSelector) return;
            if(idSelector.getAttribute("href").includes("list=")) return;
            relatedElement.id = idSelector &&
                                idSelector.getAttribute("href") ?
                                idSelector.getAttribute("href")
                                .split("v=")[1]
                                .split("&")[0]
                                .split("#")[0] : "?"
            relatedElement.title = video.querySelector(`
                                    .video-mini-title a,
                                    .title`).innerText
            relatedElement.time = video.querySelector(`
                                .video-time span,
                                .video-time`) ? video.querySelector(`
                                .video-time span,
                                .video-time`).innerText : ""
            try {
                let unSelector = video.querySelector(`
                    .video-username a,
                    .stat .yt-user-name,
                    .stat.attribution,
                    .stat:not(.view-count)
                `)
                let stats = video.querySelectorAll(".stat")
                if(stats.length >= 2
                && !video.querySelector(".stat.view-count")) {
                    let lastStat = stats[stats.length - 1]
                    if(lastStat.innerText.includes("by ")
                    || isNaN(utils.bareCount(lastStat.innerText))
                    || utils.bareCount(lastStat.innerText)
                    < utils.bareCount(stats[0].innerText)) {
                        relatedElement.uploaderName = utils.asciify(
                            lastStat.innerText
                        )
                    }
                } else {
                    relatedElement.uploaderName = utils.asciify(
                        unSelector.innerText
                    )
                }
            }
            catch(error) {
                relatedElement.uploaderName = ""
            }
            if(relatedElement.uploaderName.startsWith("by ")) {
                // 2010-2012
                relatedElement.uploaderName = relatedElement.uploaderName
                                                .replace("by ", "")
            }
            let uploaderUrl = ""
            if(video.querySelector(".video-username a")) {
                uploaderUrl = video.querySelector(".video-username a")
                                    .getAttribute("href")
                                    .split("youtube.com")[1]
            } else if(video.querySelector(`[data-ytid]`)) {
                uploaderUrl = `/channel/${video.querySelector(`[data-ytid]`)
                                                .getAttribute(`data-ytid`)}`
            }
            relatedElement.uploaderUrl = uploaderUrl

            // related view count
            try {
                let vcSelector = video.querySelector(`
                    .view-count,
                    .video-view-count,
                    .stat.view-count,
                    .stat:nth-child(1)
                `)
                if(vcSelector) {
                    relatedElement.viewCount = vcSelector.innerText
                } else {
                    let stats = video.querySelectorAll(".stat")
                    if(stats.length >= 2) {
                        if(parseInt(utils.bareCount(stats[0].innerText))
                        < parseInt(utils.bareCount(stats[1].innerText))) {
                            // view count on stats[1]
                            relatedElement.viewCount = stats[1].innerText
                        } else {
                            // view count on stats[0]
                            relatedElement.viewCount = stats[0].innerText
                        }
                    }
                }
            }
            catch(error) {
                console.log(error)
            }


            waybackData.related.push(relatedElement)
        })
        callback(waybackData);
        callbackMade = true;
    }
}

// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/wayback_watch_cache.json`, JSON.stringify(cache))
}, 3600000)