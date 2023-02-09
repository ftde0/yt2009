const fetch = require("node-fetch");
const yt2009utils = require("./yt2009utils");
const yt2009contants = require("./yt2009constants.json");
const yt2009exports = require("./yt2009exports");
const yt2009templates = require("./yt2009templates");
const config = require("./config.json")
const fs = require("fs")
const search_code = fs.readFileSync("../search-generic-page.htm").toString();

let cache = require("./cache_dir/search_cache_manager")
let pagingCache = require("./cache_dir/search_paging_cache_manager")

let saved_searches = {}

module.exports = {
    "get_search": function(query, flags, params, callback, token, resetCache) {
        // request wyszukiwania i handlowanie flag
        flags = decodeURIComponent(flags)
        query = decodeURIComponent(query)
        if(flags.includes("only_old")) {
            query += " before:2010-04-01"
        }

        
        switch(encodeURIComponent(params.split("&")[0])) {
            case "EgIQAw%3D%3D": {
                query += "!yt2009_search_type_playlist"
                break;
            }
            case "EgIQAg%3D%3D": {
                query += "!yt2009_search_type_channel"
                break;
            }
        }

        if(cache.read()[query] && !resetCache) {
            // cached dane
            callback(cache.read()[query])
            if(config.env == "dev") {
                console.log(`(${token}) ${query} from cache ${Date.now()}`)
            }
        } else {
            // fetch
            if(config.env == "dev") {
                console.log(`(${token}) ${query} clean fetch ${Date.now()}`)
            }

            // construct requestbody
            let requestBody = {
                "context": yt2009contants.cached_innertube_context,
                "query": query.split("!yt2009_")[0]
            }
            if(params) {
                requestBody.params = params
            }

            // send request
            fetch(`https://www.youtube.com/youtubei/v1/search?key=${
                yt2009exports.read().api_key
            }`, {
                "headers": yt2009contants.headers,
                "referrer": "https://www.youtube.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": JSON.stringify(requestBody),
                "method": "POST",
                "mode": "cors"
            }).then(r => (r.json().then(r => {
                let resultsToCallback = []
                resultsToCallback = yt2009utils.search_parse(r)
                
                cache.write(query, JSON.parse(JSON.stringify(resultsToCallback)))
                callback(JSON.parse(JSON.stringify(resultsToCallback)))
            })))
        }
    },

    "apply_search_html": function(results, query, flags, url, protocol, params, userAgent) {
        // aplikujemy wyniki z get_search na htmla
        let code = search_code;
        let results_html = ``
        let search_type = "all"
        let browser = userAgent.includes("Firefox/") ? "firefox" : "chrome"

        switch(encodeURIComponent(params.split("&")[0])) {
            case "EgIQAw%3D%3D": {
                search_type = "playlist"
                break;
            }
            case "EgIQAg%3D%3D": {
                search_type = "channel"
                break;
            }
        }

        code = require("./yt2009loginsimulate")(flags, code)
        
        if(flags.includes("shows_tab")) {
            // shows tab
            code = code.replace(
                `<a href="/channels">Channels</a>`,
                `<a href="/channels">Channels</a><a href="#">Shows</a>`
            )
        }

        let estResults = 0;

        results.forEach(result => {
            switch(result.type) {
                case "video": {
                    let cancelled = false;
                    let video = result;


                    // flagi
                    let uploadDate = video.upload

                    if(flags.includes("only_old") && (
                        (!uploadDate.includes("years")) ||
                        (uploadDate.includes("years") &&
                            parseInt(uploadDate.split(" ")[0]) < 12)
                        )
                    ) {
                        cancelled = true;
                    }

                    if(flags.includes("fake_upload_dates")) {
                        uploadDate = yt2009utils.genFakeDate();
                    }
                    let uploaderName = video.author_name;
                    if(flags.includes("remove_username_space")) {
                        uploaderName = uploaderName.split(" ").join("")
                    }
                    if(flags.includes("username_asciify")) {
                        uploaderName = yt2009utils.asciify(uploaderName)
                    }
                    if(flags.includes("author_old_names")
                    && video.author_url.includes("/user/")) {
                        uploaderName = video.author_url.split("/user/")[1]
                    }
                    let viewCount = video.views
                    if(flags.includes("realistic_view_count")
                    && parseInt(viewCount.replace(/[^0-9]/g,  "")) >= 100000) {
                        viewCount = yt2009utils.countBreakup(
                            Math.floor(
                                parseInt(viewCount.replace(/[^0-9]/g, "")) / 90
                            )
                        ) + " views"
                    }
    
    
                    // podkładanie htmla
                    if(!cancelled) {
                        results_html += yt2009templates.searchVideo(
                            video.id,
                            video.title,
                            video.description,
                            video.author_url,
                            uploaderName,
                            uploadDate,
                            viewCount,
                            video.time,
                            protocol,
                            browser
                        )
                    }

                    break;
                }
                case "channel": {
                    if(search_type == "playlist") return;
                    let channel = result;
                    results_html += yt2009templates.searchChannel(
                        channel.url,
                        channel.avatar,
                        channel.name,
                        channel.subscribers
                    )
                    break;
                }
                case "playlist": {
                    if(search_type == "channel") return;
                    let playlist = result;
                    results_html += yt2009templates.searchPlaylistEntry(
                        playlist.id,
                        protocol,
                        playlist.videos,
                        playlist.name,
                        playlist.videoCount
                    );

                    playlist.videos.forEach(video => {
                        results_html += yt2009templates.searchPlaylistVideo(
                            video, playlist
                        )
                    })

                    results_html += yt2009templates.searchPlaylistEnd(playlist)

                    break;
                }
                case "metadata": {
                    estResults = result.resultCount
                    break;
                }
            }
        })

        let visibleNames = {
            "channel": "Channels",
            "all": "All",
            "playlist": "Playlists"
        }

        code = code.replace(
            `<span class="yt2009-hook-${search_type}-selected search-type-not-selected"><a href="yt2009_search_${search_type}_link">${visibleNames[search_type]}</a></span>`,
            `<span class="yt2009-hook-${search_type}-selected search-type-selected" href="yt2009_search_${search_type}_link">${visibleNames[search_type]}</span>`
        )

        code = code.replace(
            `yt2009_search_all_link`,
            `/results?search_query=${query.split(" ").join("+")}`
        )
        code = code.replace(
            `yt2009_search_channel_link`,
            `/results?search_query=${query.split(" ").join("+")}&sp=EgIQAg%3D%3D`
        )
        code = code.replace(
            `yt2009_search_playlist_link`,
            `/results?search_query=${query.split(" ").join("+")}&sp=EgIQAw%3D%3D`
        )
        code = code.replace(`yt2009_fill_flags`, flags)
        code = code.split(`yt2009_search_query`).join(query)
        code = code.replace(`yt2009_title_query`, query)
        code = code.replace(`<!--yt2009_results-->`, results_html)

        // paging
        let currentPage = 1;
        if(params.includes("page=")) {
            currentPage = parseInt(params.split("page=")[1].split(";")[0])
        }
        // initial page numbers
        let pageNumbers = [
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3
        ]
        // fixup in case of negative/zero
        pageNumbers.forEach(pageNumber => {
            if(pageNumber <= 0) {
                pageNumbers = pageNumbers.filter(s => s !== pageNumber)
                pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1)
            }
        })
        if(!url.includes("page=")) {
            url += "&page=1"
        }
        let pagingHTML = ``
        // show a previous page button if more than 1
        if(currentPage > 1) {
            pagingHTML += `<a href="${url.replace("page=" + currentPage, "page=" + (currentPage - 1))}" class="pagerNotCurrent">Previous</a>`
        }
        // create paging buttons if they fit within
        // estResults / 20 (estimated max page count)
        pageNumbers.forEach(page => {
            if(estResults / 20 >= page * 20 || !estResults) {
                if(page == currentPage) {
                    pagingHTML += `<span class="pagerCurrent">${currentPage}</span>`
                } else {
                    pagingHTML += `<a href="${url.replace("page=" + currentPage, "page=" + page)}" class="pagerNotCurrent">${page}</a>`
                }
            }
        })

        if(estResults / 20 > currentPage * 20 || !estResults) {
            pagingHTML += `...<a href="${url.replace("page=" + currentPage, "page=" + (currentPage + 1))}" class="pagerNotCurrent">Next</a>`
        }

        code = code.replace(
            `<!--yt2009_pager-->`,
            pagingHTML
        )

        return code;
    },

    "related_from_keywords": function(keyword, sourceId, watch_flags, callback, protocol) {
        this.get_search(keyword, "only_old", "", (data) => {
            if(!data) {
                callback("", "")
                return;
            }
            let related_html = ``
            let rawData = []
            JSON.parse(JSON.stringify(data)).forEach(result => {
                if(result.type == "video" && result.id !== sourceId) {
                    // handle flag
                    // author name flags
                    let authorName = result.author_name;
                    if(watch_flags.includes("remove_username_space")) {
                        authorName = authorName.split(" ").join("")
                    }
                    if(watch_flags.includes("username_asciify")) {
                        authorName = yt2009utils.asciify(authorName)
                    }
                    if(watch_flags.includes("author_old_names")
                    && result.author_url.includes("/user/")) {
                        authorName = result.author_url.split("/user/")[1]
                                                      .split("?")[0]
                    }
    
                    // view count flags
                    let viewCount = result.views;
                    if(watch_flags.includes("realistic_view_count")
                    && parseInt(viewCount.replace(/[^0-9]/g, "")) >= 100000) {
                        viewCount = yt2009utils.countBreakup(Math.floor(
                            parseInt(viewCount.replace(/[^0-9]/g, "")) / 90
                        )) + " views"
                    }
    
                    related_html += yt2009templates.relatedVideo(
                        result.id,
                        result.title,
                        protocol,
                        result.time,
                        viewCount,
                        result.author_url,
                        authorName,
                        watch_flags
                    )

                    rawData.push({
                        "id": result.id,
                        "title": result.title,
                        "length": result.time,
                        "views": viewCount,
                        "creatorUrl": result.author_url,
                        "creatorName": authorName
                    })
                }
            })
    
            callback(related_html, rawData)
        }, "exp_related")
    },

    "loopPages": function(keyword, searchParameters, targetPage, callback) {
        // this is such a mess i hate this why haven't i made a proper paging
        // system before fuckcufkcufkcufkcufkcufkcufkcckkk



        // initial search
        if(searchParameters.includes("only_old")) {
            keyword += " before:2010-04-01"
        }
        
        let page = 1;
        let timeoutMultiplier = 1;

        let headers = {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "x-goog-eom-visitor-id": yt2009exports.read()["context"].visitorData,
            "x-youtube-bootstrap-logged-in": "false",
            "x-youtube-client-name": "1",
            "x-youtube-client-version": yt2009exports.read()["context"].clientVersion,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
        }

        if(pagingCache.read(keyword)[page]) {
            if(page == targetPage) {
                onDone(yt2009utils.search_parse(
                    pagingCache.read(keyword)[page]
                ))
            } else {
                // keep fetching
                // we've got this page in cache but we need more
                yt2009utils.search_parse(
                    pagingCache.read(keyword)[page] 
                ).forEach(result => {
                    if(result.type == "continuation") {
                        token = result.token;
                        endpoint = result.endpoint
                        getByContinuation(endpoint, token)
                    }
                })
            }
        } else {
            // clean fetch
            fetch(`https://www.youtube.com/youtubei/v1/search?key=${yt2009exports.read()["api_key"]}`, {
                "headers": headers,
                "method": "POST",
                "body": JSON.stringify({
                    "query": keyword,
                    "context": yt2009exports.read()["context"]
                })
            }).then(res => res.json().then(r => {
                // if we're on a correct page, callback
                if(page == targetPage) {
                    onDone(yt2009utils.search_parse(r))
                }
                // otherwise keep fetching
                else {
                    let token = ""
                    let endpoint = ""
                    setTimeout(function() {
                        pagingCache.write(
                            keyword,
                            page,
                            r
                        )
                        yt2009utils.search_parse(r).forEach(result => {
                            if(result.type == "continuation") {
                                token = result.token;
                                endpoint = result.endpoint
                                getByContinuation(endpoint, token)
                            }
                        })
                    }, 650 * timeoutMultiplier)
                }
            }))
        }

        // send a new request if necessary
        function getByContinuation(endpoint, token) {
            timeoutMultiplier += 0.1
            page++;
            if(pagingCache.read(keyword)[page]) {
                if(page == targetPage) {
                    onDone(yt2009utils.search_parse(
                        pagingCache.read(keyword)[page]
                    ))
                } else {
                    // keep fetching
                    // we've got this page in cache but we need more
                    yt2009utils.search_parse(
                        pagingCache.read(keyword)[page] 
                    ).forEach(result => {
                        if(result.type == "continuation") {
                            token = result.token;
                            endpoint = result.endpoint
                            getByContinuation(endpoint, token)
                        }
                    })
                }
            } else {
                fetch(`https://www.youtube.com${endpoint}?key=${yt2009exports.read()["api_key"]}`, {
                    "headers": headers,
                    "method": "POST",
                    "body": JSON.stringify({
                        "continuation": token,
                        "context": yt2009exports.read()["context"]
                    })
                }).then(res => res.json().then(r => {
                    // if we're on a correct page, callback
                    if(page == targetPage) {
                        pagingCache.write(
                            keyword,
                            page,
                            r.onResponseReceivedCommands[0]
                        )
                        onDone(yt2009utils.search_parse(
                            r.onResponseReceivedCommands[0]
                        ))
                    }
                    // otherwise keep fetching
                    else {
                        let token = ""
                        let endpoint = ""
                        setTimeout(function() {
                            pagingCache.write(
                                keyword,
                                page,
                                r.onResponseReceivedCommands[0]
                            )
                            yt2009utils.search_parse(
                                r.onResponseReceivedCommands[0]
                            ).forEach(result => {
                                if(result.type == "continuation") {
                                    token = result.token;
                                    endpoint = result.endpoint
                                    getByContinuation(endpoint, token)
                                }
                            })
                            
                        }, 650 * timeoutMultiplier)
                    }
                }))
            }
        }

        // on done
        function onDone(searchData) {
            callback(searchData)
        }
    }
}