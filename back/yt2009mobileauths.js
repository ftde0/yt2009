const fs = require("fs")
if(!fs.existsSync("./cache_dir/gdata_auths.json")) {
    fs.writeFileSync("./cache_dir/gdata_auths.json", "{}")
} else {
    // clear auths if corrupt json
    try {
        let s = JSON.parse(
            fs.readFileSync("./cache_dir/gdata_auths.json").toString()
        )
    }
    catch(error) {fs.writeFileSync("./cache_dir/gdata_auths.json", "{}")}
}
const gdataAuthPage = fs.readFileSync("../mobile/gdata_main_auth.html").toString()
const config = require("./config.json")
const templates = require("./yt2009templates")
const useTShare = fs.existsSync("./yt2009ts.js")
let gdataAuths = require("./cache_dir/gdata_auths.json")

module.exports = {
    "isAuthorized": function(req, res, onError) {
        if(!config.gdata_auth
        || (config.gdata_auth && config.tokens[0] == "*")) {
            return true;
        }

        // get device id
        let deviceId = false;
        let token = false;
        if(req.headers["x-gdata-device"]
        && req.headers["x-gdata-device"].includes("device-id=\"")) {
            deviceId = req.headers["x-gdata-device"]
                               .split("device-id=\"")[1]
                               .split("\"")[0];
        }

        // or get auth token
        if(!deviceId && req.query.token) {
            token = req.query.token
        }

        // token-based auth: &token= param in url
        if(token
        && config.tokens
        && config.tokens.includes(token)
        && (!config.templocked_tokens
        || !config.templocked_tokens.includes(token))) {
            if(useTShare) {
                if(!req.headers.cookie) {
                    req.headers.cookie = ""
                }
                req.headers.cookie = "auth=" + token + "; "
                                   + req.headers.cookie
                require("./yt2009ts").add(req)
            }
            return true;
        }

        // classic site-based auth
        if(req.headers.cookie && req.headers.cookie.includes("auth=")) {
            let a = req.headers.cookie.split("auth=")[1].split(";")[0].trim()
            if((config.tokens && config.tokens.includes(a))
            && (!config.templocked_tokens
            || !config.templocked_tokens.includes(a))) {
                if(useTShare) {
                    require("./yt2009ts").add(req)
                }
                return true;
            }
        }

        // header-based auth: mobile apps
        if((!deviceId && !token)
        || !gdataAuths[deviceId]
        || (config.tokens
        && !config.tokens.includes(gdataAuths[deviceId]))
        || (config.templocked_tokens
        && config.templocked_tokens.includes(gdataAuths[deviceId]))) {
            // auth failed
            switch(onError) {
                case "feed": {
                    let response = templates.gdata_feedStart.split(">25<").join(">1<")
                    response += templates.gdata_entryAuth(deviceId)
                    response += templates.gdata_feedEnd
                    res.set("content-type", "application/atom+xml")
                    res.send(response)
                    return false;
                }
                case "single": {
                    let response = templates.gdata_entryAuth(deviceId)
                    res.set("content-type", "application/atom+xml")
                    res.send(response)
                    return false;
                }
                default: {
                    res.sendStatus(401);
                    return false;
                }
            }
        }

        if(useTShare) {
            if(!req.headers.cookie) {
                req.headers.cookie = ""
            }
            req.headers.cookie = "auth=" + gdataAuths[deviceId] + "; "
                               + req.headers.cookie
            require("./yt2009ts").add(req)
        }
        return true;
    },

    "genMainPage": function(req, res) {
        if(!req.query.device) {
            res.sendStatus(400)
            return;
        }
        req.query.device = req.query.device
                           .replace(/[^a-zA-Z0-9]/g, "")
                           .substring(0, 6)
        
        let msg = ""
        if(req.query.c) {
            switch(req.query.c) {
                case "1": {
                    msg = "invalid authorization token."
                    break;
                }
                case "2": {
                    msg = "authorization token locked."
                    break;
                }
                case "3": {
                    msg = "auth token entered! restart your mobile app."
                    return;
                }
            }
        }

        let code = gdataAuthPage;
        code = code.replace(`yt2009_device_id`, req.query.device)
        code = code.replace(`yt2009_message`, msg)

        res.send(code)
    },

    "setAuth": function(req, res) {
        if(!req.body || !req.body.toString()) {
            res.sendStatus(400)
            return;
        }
        let token = false;
        let device = false;
        req.body.toString().split("&").forEach(e => {
            switch(e.split("=")[0]) {
                case "token": {
                    token = e.split("=")[1]
                    break;
                }
                case "devid": {
                    device = e.split("=")[1]
                    break;
                }
            }
        })

        if(!token || !device) {
            res.sendStatus(400)
            return;
        }

        device = device.replace(/[^a-zA-Z0-9]/g, "").substring(0, 6)

        if(config.templocked_tokens.includes(token)) {
            res.redirect("/mobile/gdata_gen_auth_page?device=" + device + "&c=2")
            return;
        }
        if(!config.tokens.includes(token)) {
            res.redirect("/mobile/gdata_gen_auth_page?device=" + device + "&c=1")
            return;
        }

        // token valid - enter in
        gdataAuths[device] = token;
        res.send("OK - reopen mobile app!")
        //res.redirect("/mobile/gdata_gen_auth_page?device=" + device + "&c=3")
    }
}


let s = setInterval(() => {
    try {
        fs.writeFileSync(
            "./cache_dir/gdata_auths.json",
            JSON.stringify(gdataAuths)
        )
    }
    catch(error) {}
}, 1000 * 60 * 60)