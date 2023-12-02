const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("../yt2009constants.json")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(fs.readFileSync(`${__dirname}/userid.json`).toString())
    }
    catch(error) {}
} 

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
            } else {
                fetch("https://www.youtube.com/youtubei/v1/navigation/resolve_url", {
                    "headers": constants.headers,
                    "referrer": "https://www.youtube.com/",
                    "referrerPolicy": "origin-when-cross-origin",
                    "body": JSON.stringify({
                        "context": constants.cached_innertube_context,
                        "deviceTheme": "DEVICE_THEME_SUPPORTED",
                        "userInterfaceTheme": "USER_INTERFACE_THEME_DARK",
                        "url": `https://www.youtube.com/${url}`
                    }),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(r => {
                    if(r.status == 404) {
                        callback(false)
                        return;
                    }
                    r.json().then(r => {
                        if(r.endpoint.browseEndpoint
                        && r.endpoint.browseEndpoint.browseId) {
                            let id = r.endpoint.browseEndpoint.browseId
                            callback(id)
                            this.write(url, id)
                        }
                    })
                })
            }
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/userid.json`, JSON.stringify(cache))
}, 3600000)