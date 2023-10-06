const fs = require("fs")
const config = require("../config.json")
let cache = []
if(!config.fallbackMode) {
    cache = JSON.parse(fs.readFileSync(`${__dirname}/oldbanner_unavail_cache.json`).toString())
} 

module.exports = {
    "write": function(id) {
        cache.push(id)
    },

    "read": function() {
        return cache;
    }
}

let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/oldbanner_unavail_cache.json`, JSON.stringify(cache))
}, 3600000)