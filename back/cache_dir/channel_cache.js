const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("../yt2009constants.json")
const child_process = require("child_process")
let cacheList = {
    "mainCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_main_cache.json`).toString()),
    "friendCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_friend_cache.json`).toString()),
    "playlistCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_playlist_cache.json`).toString()),
    "bannerCache": JSON.parse(fs.readFileSync(`${__dirname}/channel_banner_cache.json`).toString())
}

module.exports = {
    "write": function(cacheType, id, data) {
        cacheList[cacheType + "Cache"][id] = data
    },

    "read": function(cacheType) {
        return JSON.parse(JSON.stringify(cacheList[cacheType + "Cache"]))
    },

    "getSmallBanner": function(channelUrl, callback) {
        if(cacheList.mainCache[channelUrl] && cacheList.mainCache[channelUrl].banner) {
            callback(cacheList.mainCache[channelUrl].banner);
        } else if(cacheList.bannerCache[channelUrl]) {
            callback(cacheList.bannerCache[channelUrl])
        } else {
            // clean fetch the channel for banner
            fetch(`https://www.youtube.com/${channelUrl}`, {
                "headers": constants.headers
            }).then(r => {r.text().then(res => {
                let ytInitialData = JSON.parse(res.split("var ytInitialData = ")[1].split(";</script>")[0])
                let bannerContainer = ytInitialData.header.c4TabbedHeaderRenderer;
                if(bannerContainer.banner) {
                    let bannerUrl = bannerContainer.banner.thumbnails[0].url
                    let banner_fname = bannerUrl.split("/")[bannerUrl.split("/").length - 1]
                    if(!fs.existsSync(`../assets/${banner_fname}.png`)) {
                        // save the banner file if we don't have it yet
                        fetch(bannerUrl, {
                            "headers": constants.headers
                        }).then(r => {
                            r.buffer().then(buffer => {
                                fs.writeFileSync(`../assets/${banner_fname}.png`, buffer)
                                cacheList.bannerCache[channelUrl] = `${banner_fname}.png`
                                callback(`${banner_fname}.png`)
                            })
                        })
                    } else {
                        cacheList.bannerCache[channelUrl] = `${banner_fname}.png`
                        callback(`${banner_fname}.png`)
                    }
                } else {
                    cacheList.bannerCache[channelUrl] = "no"
                    callback("no")
                }

                function scaleImg(file) {
                    child_process.execSync(`convert "${file_path}" +dither -colors 2 -define histogram:unique-colors=true -format "%c" histogram:info: | sort ${process.platform == "linux" ? "-n" : ""}`)
                }
            })})
        }
        
    }
}


// update plików cache co 1h
let cacheWrite = setInterval(() => {
    fs.writeFileSync(`${__dirname}/channel_main_cache.json`, JSON.stringify(cacheList.mainCache))
    fs.writeFileSync(`${__dirname}/channel_friend_cache.json`, JSON.stringify(cacheList.friendCache))
    fs.writeFileSync(`${__dirname}/channel_playlist_cache.json`, JSON.stringify(cacheList.playlistCache))
    fs.writeFileSync(`${__dirname}/channel_banner_cache.json`, JSON.stringify(cacheList.bannerCache))
}, 3600000)