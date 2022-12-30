const fetch = require("node-fetch")
const fs = require("fs")
const constants = require("../yt2009constants.json")
let cache = JSON.parse(fs.readFileSync(`${__dirname}/video_exists_cache.json`).toString())

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },

    "read": function(id, callback) {
        if(cache[id]) {
            console.log(id, "cache")
            callback(cache[id])
        } else {
            console.log(id, "clean")
            fetch("https://i.ytimg.com/vi/" + id  + "/default.jpg", {
                "headers": constants.headers
            }).then(r => {
                let exists = true;
                if(r.status == 404) {
                    exists = false;
                }
                this.write(id, exists)
                callback(exists)
            })
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    fs.writeFileSync(`${__dirname}/video_exists_cache.json`, JSON.stringify(cache))
}, 3600000)