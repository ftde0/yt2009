const fs = require("fs")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    cache = JSON.parse(fs.readFileSync(`${__dirname}/hd_availability_cache.json`).toString())
} 

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },

    "read": function() {
        return cache;
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/hd_availability_cache.json`, JSON.stringify(cache))
}, 3600000)