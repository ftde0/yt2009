const playlists = require("./yt2009playlists")
const templates = require("./yt2009templates")
const utils = require("./yt2009utils")
const languages = require("./language_data/language_engine")
const config = require("./config.json")
const hypeRegions = require("./geo/hype-tokens-converted.json")
const defaultRegion = "US"
const fourHours = 1000 * 60 * 60 * 4
let lastRefreshTimes = {}
for(let c in hypeRegions) {
    lastRefreshTimes[c] = 0
}

module.exports = {
    "getRegion": function(req) {
        if(!req
        || !req.headers
        || !req.headers.cookie
        || !req.headers.cookie.includes("gl=")) {
            return defaultRegion
        }
        let region = defaultRegion
        try {
            region = req.headers.cookie.split("gl=")[1].split(";")[0]
        }
        catch(error) {}
        if(hypeRegions[region]) {
            return region;
        } else {
            return defaultRegion;
        }
    },

    "getHypeCategories": function(req) {
        return hypeRegions[this.getRegion(req)]
    },

    "getHypes": function(req, callback) {
        let fourRandoms = []
        let region = this.getRegion(req)
        let resetCaches = ((Date.now() - lastRefreshTimes[region]) >= fourHours)
        let hypeFeedPlaylists = {}
        let feedVideos = {}
        let reversedCategories = {}
        let fetchesRequired = []
        let fetchesDone = 0;
        for(let category in hypeRegions[region]) {
            fetchesRequired.push(hypeRegions[region][category])
            reversedCategories[hypeRegions[region][category]] = category;
        }
        fetchesRequired.forEach(p => {
            setTimeout(() => {
                playlists.parsePlaylist(p, (data) => {
                    hypeFeedPlaylists[p] = data.videos
                    fetchesDone++
                    if(fetchesDone >= fetchesRequired.length) {
                        getVideosForHypeFeed()
                    }
                }, null, resetCaches, true)
            }, Math.floor(Math.random() * 500))
        })
        function getVideosForHypeFeed() {
            for(let p in hypeFeedPlaylists) {
                // get random video from each playlist
                let category = reversedCategories[p]
                let index = Math.floor(
                    Math.random() * hypeFeedPlaylists[p].length
                )
                feedVideos[category] = hypeFeedPlaylists[p][index]

                if(fourRandoms.length !== 4) {
                    let index = Math.floor(
                        Math.random() * hypeFeedPlaylists[p].length
                    )
                    fourRandoms.push(hypeFeedPlaylists[p][index])
                }
            }
            if(!config.data_api_key) {
                callback({
                    "categories": feedVideos, "featured": fourRandoms
                })
                return;
            }

            // pull more exact data through data api
            let videoIdCategoryLookup = []
            let videoIds = []
            for(let f in feedVideos) {
                videoIdCategoryLookup.push([feedVideos[f].id, f])
                videoIds.push(feedVideos[f].id)
            }
            fourRandoms.forEach(r => {
                videoIdCategoryLookup.push([r.id, "INT_FEATURED"])
                videoIds.push(r.id)
            })
            utils.dataApiBulk(videoIds, [
                "title", "viewCount", "channelId",
                "publishedAt", "description", "categoryId"
            ], (dar) => {
                if(dar) {
                    for(let v in dar) {
                        let category = videoIdCategoryLookup.filter(s => {
                            return s[0] == v
                        })[0]
                        if(category && category[1] == "INT_FEATURED") {
                            let i = fourRandoms.indexOf(
                                fourRandoms.filter(s => {
                                    return s.id == v
                                })[0]
                            )
                            let vd = dar[v]
                            if(vd
                            && vd.title
                            && vd.viewCount
                            && vd.channelId) {
                                fourRandoms[i].title = vd.title;
                                fourRandoms[i].views = parseInt(vd.viewCount)
                                fourRandoms[i].uploaderId = vd.channelId;
                                let url = "/channel/" + vd.channelId
                                fourRandoms[i].uploaderUrl = url;
                                fourRandoms[i].uploaded = vd.publishedAt
                                fourRandoms[i].description = vd.description;
                                fourRandoms[i].categoryId = vd.categoryId
                            }
                        } else if(category) {
                            category = category[1]
                            if(category !== "INT_FEATURED") {
                                let vData = dar[v]
                                if(vData
                                && vData.title
                                && vData.viewCount
                                && vData.channelId) {
                                    feedVideos[category].title = vData.title;
                                    feedVideos[category].views = parseInt(
                                        vData.viewCount
                                    );
                                    let cid = vData.channelId
                                    let up = "/channel/" + cid;
                                    feedVideos[category].uploaderId = cid;
                                    feedVideos[category].uploaderUrl = up;
                                    feedVideos[category].uploaded = vData.publishedAt
                                    feedVideos[category].description = vData.description;
                                    feedVideos[category].categoryId = vData.categoryId;
                                }
                            }
                        }
                    }
                }
                callback({
                    "categories": feedVideos, "featured": fourRandoms
                })
            })
        }
    },

    "set": function(app) {
        app.get("/homepage_hype", (req, res) => {
            if(!utils.isAuthorized(req)) {
                res.sendStatus(401)
                return;
            }
            let flags = ""
            if(req.headers.cookie) {
                if(req.headers.cookie.includes("homepage_flags=")) {
                    flags += req.headers.cookie
                                .split("homepage_flags=")[1]
                                .split(";")[0]
                }
                if(req.headers.cookie.includes("global_flags=")) {
                    flags += req.headers.cookie
                                .split("global_flags=")[1]
                                .split(";")[0]
                }
            }
            let response = ``
            this.getHypes(req, (data) => {
                let cs = data.categories;
                for(let c in cs) {
                    response += `=========YT2009-CAT-FILLER-HYPE-${c}=========`
                    response += templates.hype_result_homepage_catvid(
                        cs[c], req
                    )
                }
                let f = data.featured
                response += `=========YT2009-FEAT-FILLER-HYPE=========`
                f.forEach(v => {
                    v.length = v.time;
                    v.creatorName = utils.xss(v.uploaderName)
                    v.creatorUrl = v.uploaderUrl
                    v.o = true
                    v.upload = ""
                    v.views = v.views.toString()
                    response += templates.recommended_videoCell(v, req, flags)
                })
                res.send(languages.apply_lang_to_code(response, req))
            })
        })
    }
}