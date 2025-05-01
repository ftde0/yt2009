const fs = require("fs")
// create cache entry for serverside flags if nonexistent
if(!fs.existsSync("./cache_dir/mobile_flags.json")) {
    fs.appendFileSync("./cache_dir/mobile_flags.json", "{}")
}
const mflags = require("./cache_dir/mobile_flags.json")
const knownFlagNames = {
    "watch": ["new-related", "innertube-related", "realistic-view-count", "better-hd"],
    "search": ["only-old"],
    "channel": ["default-avatar-adapt", "uploads-count", "uncrop-avatar"]
}
let sessions = {}

module.exports = {
    "request_session": function(req, res) {
        res.sendStatus(200)
    },

    "write_session": function(ip, deviceId) {
        sessions[ip] = deviceId
    },

    "get_session": function(req, res) {
        if(req.ip.includes("192.168.")) {
            let altSession = false;
            for(let ip in sessions) {
                if(ip.includes("192.168.")) {
                    altSession = sessions[ip]
                }
            }

            if(!altSession) {
                res.sendStatus(404)
                return;
            }

            res.send(altSession)
            return;
        }
        if(sessions[req.ip]) {
            res.send(sessions[req.ip])
        } else {
            res.sendStatus(404)
        }
    },

    "save_flags": function(req, res) {
        // filter and parse
        let body = JSON.parse(req.body.toString())
        if(!body["watch"]
        || !body["search"]
        || !body["channel"]
        || !req.headers["device"]) {
            res.sendStatus(400)
            return;
        }
        let filteredUserFlags = {
            "watch": [], "search": [], "channel": [], "login_simulate": ""
        }
        body.watch.forEach(flag => {
            if(knownFlagNames.watch.includes(flag)) {
                filteredUserFlags.watch.push(flag)
            }
        })
        body.search.forEach(flag => {
            if(knownFlagNames.search.includes(flag)) {
                filteredUserFlags.search.push(flag)
            }
        })
        body.channel.forEach(flag => {
            if(knownFlagNames.channel.includes(flag)) {
                filteredUserFlags.channel.push(flag)
            }
        })
        if(body.login_simulate && body.login_simulate.includes("/")) {
            filteredUserFlags.login_simulate = body.login_simulate
        }

        // push
        mflags[req.headers.device] = filteredUserFlags
        fs.writeFileSync(
            "./cache_dir/mobile_flags.json",
            JSON.stringify(mflags)
        )
        res.sendStatus(200)
    },

    "get_flags": function(req) {
        let flags = {"watch": [], "search": [], "channel": []}
        if(req.headers["x-gdata-device"]
        && req.headers["x-gdata-device"].includes("device-id=\"")) {
            let deviceId = req.headers["x-gdata-device"]
                               .split("device-id=\"")[1]
                               .split("\"")[0];
            if(mflags[deviceId]) {
                flags = mflags[deviceId]
            }
        }

        return flags;
    }
}