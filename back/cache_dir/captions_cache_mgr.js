const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("../yt2009constants.json")
const config = require("../config.json")
const yt2009html = require("../yt2009html")
const yt2009exports = require("../yt2009exports")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(fs.readFileSync(`${__dirname}/captions_cache.json`).toString())
    }
    catch(error) {}
} 

module.exports = {
    "write": function(id, data) {
        cache[id] = data;
    },

    "read": function(id, callback, resetCache) {
        if(cache[id] && !resetCache) {
            callback(cache[id])
        } else {
            // clean fetch
            let languages = {}
            function parsePlayer(data) {
                if(data.captions) {
                    try {
                        let cc = data.captions.playerCaptionsTracklistRenderer
                                     .captionTracks
                        let nonasrLangs = []
                        let nonAsr = cc.filter(s => {
                            if(!s.kind) {
                                nonasrLangs.push(s.languageCode)
                            }
                            return !s.kind
                        })
                        let asr = cc.filter(s => {
                            return s.kind
                                && !nonasrLangs.includes(s.languageCode)
                        })
                        let merged = []
                        nonAsr.forEach(c => {merged.push(c)})
                        asr.forEach(c => {merged.push(c)})
                        merged.forEach(track => {
                            let name = track.name.simpleText || ""
                            if(track.name && track.name.runs) {
                                name = track.name.runs[0].text
                            }
                            if(track.baseUrl.includes("fmt=")) {
                                let fmt = track.baseUrl.split("fmt=")[1].split("&")[0]
                                track.baseUrl = track.baseUrl.replace("&fmt=" + fmt, "")
                            }
                            languages[track.languageCode] = {
                                "name": name,
                                "url": track.baseUrl || ""
                            }
                        })
                    }
                    catch(error) {console.log(error)}
                }
                callback(languages)
                cache[id] = languages;
                //this.write(id, languages)
            }
            if(yt2009exports.read().players[id]) {
                parsePlayer(yt2009exports.read().players[id])
                setTimeout(() => {
                    yt2009exports.delete("players", id)
                }, 200)
            } else {
                yt2009html.innertube_get_data(id, (player) => {
                    parsePlayer(player)
                })
            }
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/captions_cache.json`, JSON.stringify(cache))
}, 3600000)