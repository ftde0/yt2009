const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("../yt2009utils")
let cache = JSON.parse(fs.readFileSync(`${__dirname}/ryd_cache.json`).toString())

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
                    callback(utils.custom_rating_round(response.rating))
                    cache[id] = utils.custom_rating_round(response.rating)
                })
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
    fs.writeFileSync(`${__dirname}/ryd_cache.json`, JSON.stringify(cache))
}, 3600000)