/*
=======
/videos handler
=======
if you're looking for watchpage handler,
it's located in yt2009html.js.
historical reasons.

yt2009, 2022-2033
*/

const yt2009html = require("./yt2009html")
const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../videos.htm").toString()
const templates = require("./yt2009templates")
const search = require("./yt2009search")
const config = require("./config.json")
const wayback_watchpage = require("./cache_dir/wayback_watchpage")
const category_numbers = {
    "0": "All Categories",
    "2": "Autos & Vehicles",
    "35": "Comedy",
    "34": "Education",
    "24": "Entertainment",
    "1": "Film & Animation",
    "33": "Gaming",
    "26": "Howto & Style",
    "31": "Music",
    "32": "News & Politics",
    "29": "Nonprofits & Activism",
    "22": "People & Blogs",
    "15": "Pets & Animals",
    "28": "Science & Technology",
    "30": "Sports",
    "19": "Travel & Events"
}
const category_numbers_lang = {
    "0": "lang_cat_all",
    "2": "lang_cat_autos",
    "35": "lang_cat_comedy",
    "34": "lang_cat_edu",
    "24": "lang_cat_entertainment",
    "1": "lang_cat_film",
    "33": "lang_cat_gaming",
    "26": "lang_cat_howto",
    "31": "lang_cat_music",
    "32": "lang_cat_news",
    "29": "lang_cat_nonprofit",
    "22": "lang_cat_people",
    "15": "lang_cat_pets",
    "28": "lang_cat_sci",
    "30": "lang_cat_sports",
    "19": "lang_cat_travel"
}
const doodles = require("./yt2009doodles")
const language = require("./language_data/language_engine")

let uidVideos = {}

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        req = utils.addFakeCookie(req)

        let flags = req.query.flags || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("mainpage_flags")) {
                    flags += cookie.trimStart().replace("mainpage_flags=", "")
                                                .split(":").join(";")
                }
                if(cookie.trimStart().startsWith("global_flags")) {
                    flags += cookie.trimStart().replace("global_flags=", "")
                                                .split(":").join(";")
                }
            })
        }
        catch(error) {}

        let code = page;

        // resetflags=1
        if(req.query.resetflags == 1) {
            flags = ""
        }

        // shows tab
        if(req.headers.cookie.includes("shows_tab")) {
            code = code.replace(
                `<a href="/channels">lang_channels</a>`,
                `<a href="/channels">lang_channels</a><a href="#">lang_shows</a>`
            )
        }

        // minimal send for ?r=1 (recommended for you)
        if(req.query.r == "1") {
            code = code.split("yt2009_category_name").join("Recommended for You")
            code = code.replace(
                " last yt-rounded",
                " last category-selected yt-rounded"
            )
            code = code.replace(`<!--yt2009_videos_insert-->`,
            `<script src="/assets/site-assets/homepage-recommended.js"></script>
            <div id="recommended-loading-sprite">
                <img src="/assets/site-assets/icn_loading_animated-vfl24663.gif"
                style="margin-left: 360px;margin-top: 30px;margin-bottom: 30px;"/>
            </div>`)
            code = code.replace(
                `browse-basic-modifiers"`,
                `browse-basic-modifiers" style="display: none;"`
            )
            // rss this page button
            let uid = Math.floor(Math.random() * 888888) + 100000
            if(req.headers.cookie
            && req.headers.cookie.includes("rec_rss_id=")) {
                uid = req.headers.cookie.split("rec_rss_id=")[1].split(";")[0]
            }
            code = code.split("yt2009_rss_button").join(
                `http://${config.ip}:${config.port}/videos-rss?r=1&uid=${uid}`
            )
            code = require("./yt2009loginsimulate")(req, code)
            code = doodles.applyDoodle(code, req)
            code = language.apply_lang_to_code(code, req)
            res.send(code)
            return;
        }

        let categoryNumber = req.query.c || "0"
        let categoryName = category_numbers_lang[categoryNumber]

        // limit to 50 videos per page
        if(req.query.max
        && !isNaN(req.query.max)
        && parseInt(req.query.max) > 50) {
            req.query.max = 50
        }

        // sorting option
        let sortByPopular = true;
        if(req.query.s == "mr") {
            sortByPopular = false;
        }

        // add video bare html
        let videosHTML = ``
        function addVideo(video) {
            if(!video.id) return;
            let views = video.views;
            if(flags.includes("realistic_view_count")
            && parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
                views = utils.countBreakup(
                    Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / 90)
                ) + " views"
            }

            let videoTitle = video.title;
            let authorName = video.uploaderName;

            let waybackData = {}
            if(wayback_watchpage.readCacheOnly(video.id)) {
                waybackData = wayback_watchpage.readCacheOnly(video.id)
            }
            if(waybackData.title) {
                videoTitle = waybackData.title
            }
            if(waybackData.authorName
            && !waybackData.authorName.toLowerCase().includes("subscribe")) {
                authorName = waybackData.authorName
            }

            videosHTML += templates.videoCell(
                video.id,
                videoTitle.trim(),
                req.protocol,
                authorName.trim(),
                video.uploaderUrl,
                views,
                flags,
                true
            )
        }

        // get matching videos
        let videos = this.internal_getVideos(req, flags)
        videos.forEach(video => {
            addVideo(video)
        })

        // apply selected options to html
        if(!sortByPopular) {
            let popUrl = req.originalUrl
            if(popUrl.includes("s=mr")) {
                popUrl = popUrl.replace("s=mr", "s=pop")
            } else if(popUrl.includes("?")) {
                popUrl += "&s=pop"
            } else {
                popUrl += "?s=pop"
            }
            code = code.replace(
                `<!--yt2009_popular-->`,
                `<a href="${popUrl}">lang_sort_pop</a>`
            )
            code = code.replace(
                `<!--yt2009_recent_videos-->`,
                `<span>lang_sort_recent</span>`
            )
            code = code.replace(
                `yt2009-hook-selected-recent`,
                `selected`
            )
        } else {
            let mrUrl = req.originalUrl
            if(mrUrl.includes("s=pop")) {
                mrUrl = mrUrl.replace("s=pop", "s=mr")
            } else if(mrUrl.includes("?")) {
                mrUrl += "&s=mr"
            } else {
                mrUrl += "?s=mr"
            }
            code = code.replace(
                `<!--yt2009_popular-->`,
                `<span>lang_sort_pop</span>`
            )
            code = code.replace(
                `<!--yt2009_recent_videos-->`,
                `<a href="${mrUrl}">lang_sort_recent</a>`
            )
            code = code.replace(
                `yt2009-hook-selected-pop`,
                `selected`
            )
        }

        // selected category
        code = code.replace(
            "hook-category-" + categoryNumber,
            "category-selected hook-category-" + categoryNumber
        )
        code = code.replace("yt2009_category_name", categoryName)
        
        code = code.replace(`<!--yt2009_videos_insert-->`, videosHTML)

        // rss this page button
        code = code.split("yt2009_rss_button").join(
            `http://${config.ip}:${config.port}${
                req.originalUrl.replace("/videos", "/videos-rss")
            }`
        )

        // paging
        let reqPage = parseInt(req.query.p) || 1
        if(isNaN(reqPage)) {
            reqPage = 1;
        }
        let estPageCount = Math.round(yt2009html.featured().length / 23)
        let pageButtons = [
            reqPage - 2,
            reqPage - 1,
            reqPage,
            reqPage + 1,
            reqPage + 2
        ]
        // fixup in case of negative/zero pages or more than estPageCount
        pageButtons.forEach(pageNumber => {
            if(pageNumber <= 0) {
                pageButtons = pageButtons.filter(s => s !== pageNumber)
                pageButtons.push(pageButtons[pageButtons.length - 1] + 1)
            }
            if(pageNumber > estPageCount) {
                pageButtons = pageButtons.filter(s => s !== pageNumber)
            }
        })
        
        code = code.replace(
            `<!--yt2009_paging-->`,
            templates.videosFooterPaging(reqPage, pageButtons, req.originalUrl)
        )

        // finalize
        code = require("./yt2009loginsimulate")(req, code)
        code = doodles.applyDoodle(code, req)
        code = language.apply_lang_to_code(code, req)
        res.send(code)
    },

    "internal_getVideos": function(req, flags) {
        // category & sorting options
        let categoryNumber = req.query.c || "0"
        let pageNumber = parseInt(req.query.p) || 1
        let maxResults = parseInt(req.query.max) || 24
        if(maxResults > 100) {
            maxResults = 100
        }
        let startIndexOverride = parseInt(req.query.index)
        if(isNaN(pageNumber)) {
            pageNumber = 1;
        }
        let categoryName = category_numbers[categoryNumber]
        let sortByPopular = true;
        if(req.query.s == "mr") {
            sortByPopular = false;
        }
        let videos = []
        function addVideo(video) {
            let views = utils.viewFlags(video.views, flags);

            videos.push({
                "id": video.id,
                "title": video.title,
                "uploaderName": video.uploaderName,
                "uploaderUrl": video.uploaderUrl,
                "views": views,
                "length": video.time
            })
        }
        if(!sortByPopular) {
            // no sorting (latest)
            let index = 0;
            let startIndex = startIndexOverride || 25 * (pageNumber - 1)
            let f = yt2009html.featured()
            // fix category sorting for most recent
            if(categoryName !== "All Categories") {
                let tempVids = []
                f.forEach(vid => {
                    if(vid.category == categoryName) {
                        tempVids.push(vid)
                    }
                })
                tempVids.slice(startIndex, startIndex + maxResults).forEach(vid => {
                    addVideo(vid)
                })
                return videos;
            }
            yt2009html.featured().slice(startIndex, startIndex + maxResults).forEach(video => {
                if(video.category == categoryName
                || parseInt(categoryNumber) == 0) {
                    addVideo(video)
                    index++;
                }
                
            })
        } else {
            // sort by most popular, then add
            let baseVideos = JSON.parse(JSON.stringify(yt2009html.featured()))

            // sort and filter videos for correct category etc
            let sortedVideos = baseVideos.sort((a, b) => {
                return utils.bareCount(b.views) - utils.bareCount(a.views)
            })
            if(categoryNumber !== "0") { // category 0 - all categories
                sortedVideos = sortedVideos.filter((v) => {
                    return v.category == categoryName;
                })
            }

            let startIndex = startIndexOverride || 24 * (pageNumber - 1)
            sortedVideos = sortedVideos.slice(startIndex, startIndex + maxResults)

            // add videos
            sortedVideos.forEach(video => {
                addVideo(video)
            })
        }

        return videos;
    },

    "create_rss": function(req, res) {
        let rssCode = `<?xml version='1.0' encoding='UTF-8'?>
<rss xmlns:atom='http://www.w3.org/2005/Atom' xmlns:openSearch='http://a9.com/-/spec/opensearchrss/1.0/' version='2.0'>
    <channel>
        <description></description>
        <title>yt2009 videos</title>
        <link>http://${config.ip}:${config.port}/videos</link>
        <managingEditor>yt2009</managingEditor>
        <!--yt2009-videos-->
    </channel>
</rss>`
/*<title>yt2009 videos</title>
  <link>http://${config.ip}:${config.port}/videos</link>
  <description>yt2009 /videos</description>
  <description></description>
  <atom:id>http://${config.ip}:${config.port}${req.originalUrl}</atom:id>
  <managingEditor>yt2009</managingEditor>
  <!--yt2009-videos-->*/
        let rssVideos = ``
        function addVideo(video) {
            rssVideos += `
        <item>
            <title>${video.title}</title>
            <link>http://${config.ip}:${config.port}/watch?v=${video.id}</link>
            <description> </description>
            <author> </author>
            <category domain='http://schemas.google.com/g/2005#kind'>http://gdata.youtube.com/schemas/2007#video</category>
        </item>`
        }

        if(req.query.r == 1) {
            let videos = []

            let videoSuggestions = []
            let processedVideos = 0;

            if(req.query.uid && !uidVideos[req.query.uid]) {
                let cookieParams = [
                    `rec_rss_id=${utils.asciify(req.query.uid)}; `,
                    `Path=/; `,
                    `Expires=Fri, 31 Dec 2066 23:59:59 GMT`
                ]
                res.set("set-cookie", cookieParams.join(""))
            }

            if(req.query.uid && uidVideos[req.query.uid]) {
                videos = uidVideos[req.query.uid]
            } else if(req.query.sv) {
                videos = req.query.sv.split(",").slice(0,3)
                videos = videos.filter(v => v.length == 11)
            }
            if(videos.length == 0) {
                videos = ["dQw4w9WgXcQ"]
            }

            let newRecommended = false;
            if(req.query.nr) {
                newRecommended = true;
            }

            function createSuggestionsResponse() {
                videoSuggestions = videos.reverse()
                videoSuggestions.forEach(v => {
                    addVideo(v)
                })
                rssCode = rssCode.replace("<!--yt2009-videos-->", rssVideos)
                res.send(rssCode)
            }

            yt2009html.bulk_get_videos(videos, () => {
                videos.forEach(vid => {
                    setTimeout(function() {
                        // have video data, get related with exp_related
                        let videoData = yt2009html.get_cache_video(vid)
                        let lookup_keyword = ""
                        if(!videoData.tags || !videoData.title) {
                            processedVideos++;
                            if(processedVideos == videos.length) {
                                createSuggestionsResponse();
                            }
                            return;
                        }

                        lookup_keyword = utils.exp_related_keyword(
                            videoData.tags, videoData.title
                        )
        
                        // get!!
                        search.related_from_keywords(
                            lookup_keyword, vid, "", (html, rawData) => {
                                rawData.forEach(video => {
                                    videoSuggestions.push(video)
                                })
                                processedVideos++;
                                if(processedVideos == videos.length) {
                                    createSuggestionsResponse();
                                    return;
                                }
                            }, req.protocol, newRecommended
                        )
                    }, Math.floor(Math.random() * 1000) + 300)
                })  
            })

            return;
        }

        let videos = this.internal_getVideos(req, "")
        videos.forEach(video => {
            addVideo(video)
        })
        rssCode = rssCode.replace("<!--yt2009-videos-->", rssVideos)
        res.send(rssCode)
    },

    "submitById": function(req, res) {
        if(!req.headers.cookie
        || !req.headers.cookie.includes("rec_rss_id=")
        || !req.headers.source
        || !req.headers.source.includes("v=")) {
            res.sendStatus(400)
            return;
        }

        let id = req.headers.source.split("v=")[1]
                    .split("&")[0].split("#")[0]
                    .substring(0, 11);
        let uid = req.headers.cookie.split("rec_rss_id=")[1].split(";")[0]
        
        if(!uidVideos[uid]) {
            uidVideos[uid] = []
        }
        uidVideos[uid].unshift(id)
        uidVideos[uid] = uidVideos[uid].slice(0,3)
        res.sendStatus(200)
    }
}