/*
=======
/channels handler
=======

yt2009, 2022
*/

const fs = require("fs")
const page = fs.readFileSync("../channels.htm").toString()
const channels = require("./yt2009channels")
const utils = require("./yt2009utils")

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
                    flags += cookie.trimStart().replace("mainpage_flags=", "").split(":").join(";")
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
            code = code.replace(`<a href="/channels">Channels</a>`, `<a href="/channels">Channels</a><a href="#">Shows</a>`)
        }

        code = require("./yt2009loginsimulate")(req, code)

        let channelList = channels.get_saved_channels()
        let listedChannels = []
        let index = 0;
        let channelsHTML = ``
        for(let channel in channelList) {
            if(listedChannels.includes(channel) || index > 24) return;
            listedChannels.push(channel)
            channel = channelList[channel]
            index++;
        }

        // odwracamy aby najnowsze były na początku
        listedChannels = listedChannels.reverse()
        listedChannels.forEach(channel => {
            channel = channelList[channel]

            let channelName = flags.includes("remove_username_space") ? channel.name.split(" ").join("") : channel.name

            channelsHTML += `
            <div class="channel-cell" style="width:19.5%">
                <div class="channel-entry yt-uix-hovercard">
                    <div class="channel-title">
                        <div class="channel-short-title yt-uix-hovercard-target">
                            <a href="/${channel.url}" title="${channelName}" rel="nofollow">${channelName}</a>
                        </div>
                    </div>
                    <div class="user-thumb-large">
                        <div>
                            <a href="/${channel.url}">
                                <img class="yt-uix-hovercard-target" src="${channel.avatar}" title="${channelName}">
                            </a>
                        </div>
                    </div>
                    <div class="channel-main-content">
                        <div class="channel-title">
                            <div class="channel-long-title">
                                <a href="/${channel.url}" title="${channelName}" rel="nofollow">${channelName}</a>
                            </div>
                        </div>
                        <div class="channel-facets">
                            <span class="result-type">Channel</span>
                            <span class="channel-video-count"></span>
                            <span>${channel.properties.subscribers !== "[disabled]" ? channel.properties.subscribers : "0"} <span class="channel-text-break-grid"></span>Subscribers</span>
                            <span class="channel-username"><a class="hLink" href="/${channel.url}">${channelName}</a></span>
                        </div>
                    </div>
                    <div class="channel-clear-list-left"></div>
                    <div class="channel-clear-grid"></div>
                </div>
            </div>`
        })

        code = code.replace(`<!--yt2009_channels_insert-->`, channelsHTML)

        res.send(code)
    }
}