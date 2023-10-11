const fs = require("fs")
const config = require("../config.json")
const fetch = require("node-fetch")
const constants = require("../yt2009constants.json")
const utils = require("../yt2009utils")
const child_process = require("child_process")
let cacheList = {
    "mainCache": {},
    "friendCache": {},
    "playlistCache": {},
    "bannerCache": {}
}
if(!config.fallbackMode) {
    cacheList = {
        "mainCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_main_cache.json`).toString()),
        "friendCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_friend_cache.json`).toString()),
        "playlistCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_playlist_cache.json`).toString()),
        "bannerCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_banner_cache.json`).toString())
    }
}

module.exports = {
    "write": function(cacheType, id, data) {
        cacheList[cacheType + "Cache"][id] = data
    },

    "read": function(cacheType) {
        return JSON.parse(JSON.stringify(cacheList[cacheType + "Cache"]))
    },

    "getSmallBanner": function(channelUrl, callback) {
        if(cacheList.mainCache[channelUrl]
        && cacheList.mainCache[channelUrl].banner
        && (fs.existsSync("../assets/" + cacheList.mainCache[channelUrl].banner)
        || fs.existsSync("../assets/" + cacheList.mainCache[channelUrl].banner + ".png"))) {
            callback(cacheList.mainCache[channelUrl].banner);
        } else if(cacheList.bannerCache[channelUrl]
               && (fs.existsSync("../assets/" + cacheList.bannerCache[channelUrl])
               || fs.existsSync("../assets/" + cacheList.bannerCache[channelUrl] + ".png")
               || cacheList.bannerCache[channelUrl] == "no")) {
            callback(cacheList.bannerCache[channelUrl])
        } else {
            // clean fetch the channel for banner
            require("../cache_dir/userid_cache").read(channelUrl, (id) => {
                fetch(`https://www.youtube.com/youtubei/v1/browse?key=${
                    require("../yt2009exports").read().api_key
                }`, {
                    "headers": constants.headers,
                    "referrer": "https://www.youtube.com/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": JSON.stringify({
                        "context": constants.cached_innertube_context,
                        "browseId": id
                    }),
                    "method": "POST",
                    "mode": "cors"
                }).then(r => {r.json().then(r => {
                    try {
                        let bannerUrl = r.header.c4TabbedHeaderRenderer
                                     .banner.thumbnails[0].url;
                        let banner_fname = bannerUrl.split("/")
                                        [bannerUrl.split("/").length - 1]
                        utils.saveAvatar(bannerUrl)
                        cacheList.bannerCache[channelUrl] = `${banner_fname}.png`
                        callback(`${banner_fname}.png`)
                    }
                    catch(error) {
                        cacheList.bannerCache[channelUrl] = "no"
                        callback("no")
                    }
                })})
            })
        }
    }
}


// update plików cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/channel_main_cache.json`, JSON.stringify(cacheList.mainCache))
    fs.writeFileSync(`${__dirname}/channel_friend_cache.json`, JSON.stringify(cacheList.friendCache))
    fs.writeFileSync(`${__dirname}/channel_playlist_cache.json`, JSON.stringify(cacheList.playlistCache))
}, 3600000)