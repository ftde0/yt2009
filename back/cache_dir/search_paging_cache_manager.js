const fs = require("fs")
//let cache = JSON.parse(fs.readFileSync(`${__dirname}/search_paging_cache.json`).toString())
let cache = {}

module.exports = {
    "write": function(keyword, page, data) {
        if(!cache[keyword]) {
            cache[keyword] = {}
        }
        cache[keyword][page] = data;
    },

    "read": function(keyword) {
        return cache[keyword] || {};
    }
}


// update pliku cache co 1h
/*
let cacheWrite = setInterval(() => {
    fs.writeFileSync(`${__dirname}/search_paging_cache.json`, JSON.stringify(cache))
}, 3600000)*/
let cacheClear = setInterval(() => {
    cache = {}
}, 86400000)