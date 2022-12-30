const fs = require("fs")
const default_avatar = require("../detect_default_avatar")
let cache = JSON.parse(fs.readFileSync(`${__dirname}/default_avatar_adapt.json`).toString())

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
    fs.writeFileSync(`${__dirname}/default_avatar_adapt.json`, JSON.stringify(cache))
}, 3600000)