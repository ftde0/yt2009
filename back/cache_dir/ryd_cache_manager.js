const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("../yt2009utils")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(fs.readFileSync(`${__dirname}/ryd_cache.json`).toString())
    }
    catch(error) {}
} 

module.exports = {
    "fetch": function(id, callback) {
        id = id.substring(0, 11);
        
        if(cache[id]) {
            callback(cache[id])
        } else {
            fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${id}`, {
                "headers": {
                    "user-agent": "yt2009 / twt@ybnn670"
                }
            }).then(r => {
                r.json().catch(error => {callback(5)}).then(response => {
                    if(!response
                    || !response.rating) {
                        callback(5)
                        cache[id] = 5
                        return;
                    }
                    callback(utils.custom_rating_round(response.rating))
                    cache[id] = utils.custom_rating_round(response.rating)
                })
            }).catch(error => {
                console.log("[e] return youtube dislike api failed to load!", error)
                callback(5)
            })
        }
    },

    "readCache": function(id) {
        // read only if the video is in cache, otherwise undefined
        return cache[id];
    }
}

// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/ryd_cache.json`, JSON.stringify(cache))
}, 3600000)