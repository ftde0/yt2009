/*
=======
/channels handler
=======

yt2009, 2022-2023
*/

const fs = require("fs")
const page = fs.readFileSync("../channels.htm").toString()
const channels = require("./yt2009channels")
const utils = require("./yt2009utils")
const templates = require("./yt2009templates")

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

        code = require("./yt2009loginsimulate")(req, code)

        let channelList = channels.get_saved_channels()
        let listedChannels = []
        let index = 0;
        let channelsHTML = ``
        for(let channel in channelList) {
            if(!listedChannels.includes(channel)) {
                listedChannels.push(channel)
                channel = channelList[channel]
                index++;
            }
        }

        listedChannels = listedChannels.reverse()
        listedChannels.forEach(channel => {
            channel = channelList[channel]

            let channelName = flags.includes("remove_username_space")
                            ? channel.name.split(" ").join("") : channel.name

            channelsHTML += templates.channelspageChannel(channel, channelName)
        })

        code = code.replace(`<!--yt2009_channels_insert-->`, channelsHTML)

        res.send(code)
    }
}