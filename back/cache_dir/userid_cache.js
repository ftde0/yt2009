const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("../yt2009constants.json")
let cache = JSON.parse(fs.readFileSync(`${__dirname}/userid.json`).toString())

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },

    "read": function(url, callback) {
        if(cache[url]) {
            callback(cache[url])
        } else {
            // clean fetch
            if(url.includes("channel/")) {
                let id = url.split("channel/")[1]
                callback(id)
                this.write(url, id)
            } else {
                fetch(`https://www.youtube.com/${url}`, {
                    "headers": constants.headers
                }).then(r => r.text().then(r => {
                    if(!r.split("/channel/")[1]) {
                        callback(false)
                        return;
                    }
                    let id = r.split("ios-app")[1]
                              .split("/channel/")[1]
                              .split(`"`)[0]
                    callback(id)
                    this.write(url, id)
                }))
            }
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    fs.writeFileSync(`${__dirname}/userid.json`, JSON.stringify(cache))
}, 3600000)