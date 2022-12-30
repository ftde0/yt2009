const fs = require("fs")
const utils = require("../yt2009utils")
let cache = JSON.parse(fs.readFileSync(`${__dirname}/rating_cache.json`).toString())

module.exports = {
    "setRating": function(id, token, rating) {
        if(!cache[id]) {
            cache[id] = {}
        }
        cache[id][token] = rating;
    },

    "read": function(id, returnAvgRating) {
        if(!returnAvgRating) {
            return cache[id] || {}
        } else {
            if(!cache[id]) {
                cache[id] = {}
            }
            // calculate average rating
            let avgRating = 0;
            let ratingsCount = 0;
            for(let entry in cache[id]) {
                let token = entry;
                let rating = cache[id][entry]
                avgRating += parseInt(rating);
                ratingsCount++;
            }
            avgRating = avgRating / ratingsCount;
            if(!avgRating) {
                avgRating = 0;
            }
            return utils.custom_rating_round(avgRating)
        }
    }
}


// update pliku cache co 1h
let cacheWrite = setInterval(() => {
    fs.writeFileSync(`${__dirname}/rating_cache.json`, JSON.stringify(cache))
}, 3600000)