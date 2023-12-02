const fs = require("fs")
const config = require("../config.json")
let cacheList = {
    "mainCache": {},
    "playlistCache": {}
}
if(!config.fallbackMode) {
    try {
        cacheList.mainCache = JSON.parse(
            fs.readFileSync(`${__dirname}/channel_main_cache.json`).toString()
        )
        cacheList.playlistCache = JSON.parse(
            fs.readFileSync(`${__dirname}/channel_playlist_cache.json`).toString()
        )
    }
    catch(error) {}
}

module.exports = {
    "write": function(cacheType, id, data) {
        cacheList[cacheType + "Cache"][id] = data
    },

    "read": function(cacheType) {
        return JSON.parse(JSON.stringify(cacheList[cacheType + "Cache"]))
    }
}


// update plików cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/channel_main_cache.json`, JSON.stringify(cacheList.mainCache))
    fs.writeFileSync(`${__dirname}/channel_playlist_cache.json`, JSON.stringify(cacheList.playlistCache))
}, 3600000)