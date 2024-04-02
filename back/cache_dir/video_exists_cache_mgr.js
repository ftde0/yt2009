const fetch = require("node-fetch")
const fs = require("fs")
const constants = require("../yt2009constants.json")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(
            fs.readFileSync(`${__dirname}/video_exists_cache.json`).toString()
        )
    }
    catch(error) {}
} 

module.exports = {
    "write": function(id, data, customLink) {
        cache[id] = data;
    },

    "read": function(id, callback, customLink) {
        if(cache[id]) {
            console.log(id, "cache")
            callback(cache[id])
        } else {
            console.log(id, "clean")
            let vLink = customLink
                        ? "https://i.ytimg.com/vi/" + id  + "/default.jpg"
                        : id
            if(!vLink || !vLink.startsWith("http")) {
                callback(false)
                return;
            }
            fetch(vLink, {
                "headers": constants.headers
            }).then(r => {
                let exists = true;
                if(r.status == 404) {
                    exists = false;
                }
                this.write(id, exists, customLink)
                callback(exists)
            })
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/video_exists_cache.json`, JSON.stringify(cache))
}, 3600000)