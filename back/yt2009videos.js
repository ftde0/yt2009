/*
=======
/videos handler
=======

yt2009, 2022-2033
*/

const yt2009html = require("./yt2009html")
const utils = require("./yt2009utils")
const fs = require("fs")
const page = fs.readFileSync("../videos.htm").toString()
const templates = require("./yt2009templates")
const config = require("./config.json")
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

module.exports = {
    "apply": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        let flags = req.query.flags || ""
        try {
            req.headers.cookie.split(";").forEach(cookie => {
                if(cookie.trimStart().startsWith("mainpage_flags")) {
                    flags += cookie.trimStart().replace("mainpage_flags=", "")
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
                `<a href="/channels">Channels</a>`,
                `<a href="/channels">Channels</a><a href="#">Shows</a>`
            )
        }

        let categoryNumber = req.query.c || "0"
        let categoryName = category_numbers[categoryNumber]

        // sorting option
        let sortByPopular = true;
        if(req.query.s == "mr") {
            sortByPopular = false;
        }

        // add video bare html
        let videosHTML = ``
        function addVideo(video) {
            let views = video.views;
            if(flags.includes("realistic_view_count")
            && parseInt(views.replace(/[^0-9]/g, "")) >= 100000) {
                views = utils.countBreakup(
                    Math.floor(parseInt(views.replace(/[^0-9]/g, "")) / 90)
                ) + " views"
            }

            videosHTML += templates.videoCell(
                video.id,
                video.title,
                req.protocol,
                video.uploaderName,
                video.uploaderUrl,
                views,
                flags
            )
        }

        // get matching videos
        let videos = this.internal_getVideos(req, flags)
        videos.forEach(video => {
            addVideo(video)
        })

        // apply selected options to html
        if(!sortByPopular) {
            code = code.replace(
                `<!--yt2009_popular-->`,
                `<a href="/videos">Popular</a>`
            )
            code = code.replace(
                `<!--yt2009_recent_videos-->`,
                `<span>Recent Videos</span>`
            )
            code = code.replace(
                `yt2009-hook-selected-recent`,
                `selected`
            )
        } else {
            code = code.replace(
                `<!--yt2009_popular-->`,
                `<span>Popular</span>`
            )
            code = code.replace(
                `<!--yt2009_recent_videos-->`,
                `<a href="?s=mr">Recent Videos</a>`
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

        // finalize
        code = require("./yt2009loginsimulate")(req, code)
        res.send(code)
    },

    "internal_getVideos": function(req, flags) {
        // category & sorting options
        let categoryNumber = req.query.c || "0"
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
            })
        }
        if(!sortByPopular) {
            // no sorting (latest)
            let index = 0;
            yt2009html.featured().forEach(video => {
                if(video.category !== categoryName
                && parseInt(categoryNumber) !== 0
                || index > 23) return;
                addVideo(video)
                index++;
            })
        } else {
            // sort by most popular, then add
            let index = 0;
            let baseVideos = JSON.parse(JSON.stringify(yt2009html.featured()))
            let tempArray = []

            baseVideos.forEach(video => {
                if(tempArray.includes(
                    parseInt(video.views.replace(/[^0-9]/g, ""))
                )) return;
                tempArray.push(parseInt(video.views.replace(/[^0-9]/g, "")))
            })

            tempArray = tempArray.sort((a, b) => b - a)

            let finalVideos = []
            tempArray.forEach(viewCount => {
                baseVideos.forEach(video => {
                    if(viewCount == parseInt(video.views
                                            .replace(/[^0-9]/g, ""))) {
                        finalVideos.push(video)
                    }
                })
            })

            finalVideos.forEach(video => {
                if(video.category !== categoryName
                && parseInt(categoryNumber) !== 0
                || index > 23) return;
                addVideo(video)
                index++;
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


        let videos = this.internal_getVideos(req, "")
        videos.forEach(video => {
            addVideo(video)
        })

        rssCode = rssCode.replace("<!--yt2009-videos-->", rssVideos)
        res.send(rssCode)
    }
}