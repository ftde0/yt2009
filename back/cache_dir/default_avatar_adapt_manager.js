const fs = require("fs")
const default_avatar = require("../detect_default_avatar")
const config = require("../config.json")
let cache = {}
if(!config.fallbackMode) {
    try {
        cache = JSON.parse(
            fs.readFileSync(`${__dirname}/default_avatar_adapt.json`).toString()
        )
    }
    catch(error) {}
} 

module.exports = {
    "use": function(file) {
        if(cache[file] !== null && cache[file] !== undefined) {
            return cache[file]
        } else {
            // new data
            let r = default_avatar(file);
            cache[file] = r;
            return r;
        }
    }
}

// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    if(config.fallbackMode) return;
    fs.writeFileSync(`${__dirname}/default_avatar_adapt.json`, JSON.stringify(cache))
}, 3600000)