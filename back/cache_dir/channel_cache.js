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

    "read": function(cacheType, id) {
        const c = cacheList[cacheType + "Cache"]
        if(id !== undefined) {
            return c[id]
        }
        return c
    },

    "clean": function() {
        cacheList.mainCache = {}
        cacheList.playlistCache = {}
    }
}


// update plików cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    try {
        fs.writeFile(`${__dirname}/channel_main_cache.json`, JSON.stringify(cacheList.mainCache), () => {})
    } catch(error) {}
    try {
        fs.writeFile(`${__dirname}/channel_playlist_cache.json`, JSON.stringify(cacheList.playlistCache), () => {})
    } catch(error) {}
}, 3600000)