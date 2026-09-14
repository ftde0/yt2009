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
const hostname = config.alt_hostname ? "https://youtubei.googleapis.com" : "https://www.youtube.com"

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
                fetch(hostname + "/youtubei/v1/navigation/resolve_url", {
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
                    if(r.status == 404 || r.status == 400) {
                        callback(false)
                        return;
                    }
                    r.json().then(r => {
                        if(r.endpoint.browseEndpoint
                        && r.endpoint.browseEndpoint.browseId) {
                            let id = r.endpoint.browseEndpoint.browseId
                            callback(id)
                            this.write(url, id)
                        } else {
                            androidFallback()
                        }
                    })
                })

                // fetch with ANDROID client when WEB fails to send user id
                function androidFallback() {
                    let headers = JSON.parse(JSON.stringify(constants.headers))
                    headers["user-agent"] = "com.google.android.youtube/21.30.209 (Linux; U; Android 14) gzip"
                    delete headers.cookie

                    fetch(hostname + "/youtubei/v1/navigation/resolve_url", {
                        "headers": headers,
                        "referrer": "https://www.youtube.com/",
                        "referrerPolicy": "origin-when-cross-origin",
                        "body": JSON.stringify({
                            "context": {
                                "client": {
                                    "hl": "en",
                                    "clientName": "ANDROID",
                                    "clientVersion": "21.30",
                                    "androidSdkVersion": 34
                                }
                            },
                            "url": `https://www.youtube.com/${url}`
                        }),
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(r => {
                        if(r.status == 404 || r.status == 400) {
                            callback(false)
                            return;
                        }
                        r.json().then(r => {
                            if(r.endpoint.browseEndpoint
                            && r.endpoint.browseEndpoint.browseId) {
                                let id = r.endpoint.browseEndpoint.browseId
                                callback(id)
                                cache[url] = id;
                            } else {
                                callback(false)
                            }
                        })
                    })
                }
            }
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/userid.json`, JSON.stringify(cache))
}, 3600000)