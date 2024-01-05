const fs = require("fs")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(
            fs.readFileSync(`${__dirname}/video_cache.json`).toString()
        )
    }
    catch(error) {}
} 

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },

    "read": function() {
        return cache;
    },

    "clean": function() {
        cache = {}
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/video_cache.json`, JSON.stringify(cache))
}, 3600000)