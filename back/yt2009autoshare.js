const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("./yt2009utils")
const yt2009html = require("./yt2009html")
const valid_services = ["bsky"]
const config = require("./config.json")
const useragentes = {
    "bsky": `yt2009 autoshare-${config.env} // https://github.com/ftde0/yt2009`
}
const service_character_limits = {
    "bsky": 300
}

let ipRatelimits = {}
let userTokens = {}
let oneTimeAccessCodes = {}

const bsky_urls = {
    "createSession": "https://bsky.social/xrpc/com.atproto.server.createSession",
    "refreshSession": "https://bsky.social/xrpc/com.atproto.server.refreshSession",
    "getSession": "https://bsky.social/xrpc/com.atproto.server.getSession",
    "applyWrites": "/xrpc/com.atproto.repo.applyWrites"
}

if(fs.existsSync("./autoshare_userdata")) {
    let data = fs.readFileSync("./autoshare_userdata").toString()
    data.split("\x01").forEach(user => {
        if(user.includes("\x00")) {
            userTokens[user.split("\x00")[0]] = user.split("\x00")[1]
        }
    })
}

const crypto = require("crypto")
const i = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])

module.exports = {
    "genConnectPage": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        if(req.query.otac && oneTimeAccessCodes[req.query.otac]) {
            // one-time-access-code (login callback)
            switch(req.query.service) {
                case "bsky": {
                    let otac = oneTimeAccessCodes[req.query.otac]
                    let uidCookie = [
                        `<script>`,
                        `document.cookie = "bsky_uid=${otac[0]}; `,
                        `Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT";`,
                        `</script>`
                    ].join("")
                    let pwdCookie = [
                        `<script>`,
                        `document.cookie = "bsky_eck=${otac[1]}; `,
                        `Path=/; expires=Fri, 31 Dec 2066 23:59:59 GMT";`,
                        `</script>`
                    ].join("")
                    let reload = [
                        `<script>`,
                        `setTimeout(function() {location.href = "/account";}, 500)`,
                        `</script>`
                    ].join("")
                    res.send(uidCookie + pwdCookie + reload)
                    delete oneTimeAccessCodes[req.query.otac]
                    break;
                }
                default: {
                    res.sendStatus(400)
                    return;
                }
            }
            return;
        }

        let service = req.query.s
        if(!service || !valid_services.includes(service)) {
            res.sendStatus(400)
            return;
        }

        let code = fs.readFileSync(`../connect_page_${service}.html`).toString()

        switch(service) {
            case "bsky": {
                function showOndemand(message) {
                    code = code.replace(
                        `"show-on-demand-notice" style="display: none;"`,
                        `"show-on-demand-notice"`
                    )
                    code = code.replace(
                        `show_on_demand_notice_text`,
                        message
                    )
                }

                let usernameInputs = [1,2,3,4,5,6,7,8]
                let pwdInputs = [9,10,11,12,13,14,15,16]
                let verifiInputs = [17,18,19,20]
                let validUsernameInput = Math.floor(Math.random() * 8) + 1
                let validPwdInput = Math.floor(Math.random() * 8) + 9

                usernameInputs.forEach(i => {
                    if(i !== validUsernameInput) {
                        code = code.replace(`input${i}_type`, "hidden")
                    } else {
                        code = code.replace(
                            `input${i}_type"`,
                            `text" id="input-username" placeholder="name.bsky.social"`
                        )
                    }
                })
                pwdInputs.forEach(i => {
                    if(i !== validPwdInput) {
                        code = code.replace(`input${i}_type`, "hidden")
                    } else {
                        code = code.replace(
                            `input${i}_type"`,
                            `password" id="input-password"`
                        )
                    }
                })


                if(req.verifiNeeded && !req.incorrectData
                && !req.ratelimited && !req.serverRatelimit) {
                    showOndemand(
                        "additional verification needed. check your email."
                    )
                    code = code.replace(
                        `input17_type"`,
                        `text" id="input-verifi"`
                    )
                } else {
                    verifiInputs.forEach(i => {
                        code = code.replace(`input${i}_type`, "hidden")
                    })
                    code = code.replace(
                        `id="verify-code-inputs"`,
                        `id="verify-code-inputs" style="display: none;"`
                    )
                }
                if(req.incorrectData && !req.ratelimited && !req.serverRatelimit) {
                    showOndemand("incorrect data entered.")
                }
                if(req.ratelimited && !req.serverRatelimit) {
                    showOndemand("too fast!! retry in a few seconds")
                }
                if(req.serverRatelimit) {
                    showOndemand("too many login attempts. try again later.")
                }
                break;
            }
        }

        res.send(code)
    },

    "handleConnect": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        if(ipRatelimits[utils.getIP(req)]) {
            req.ratelimited = true;
            req.query = {"s": "bsky"}
            req.body = ""
            this.genConnectPage(req, res)
            return;
        }

        ipRatelimits[utils.getIP(req)] = true;
        setTimeout(() => {
            ipRatelimits[utils.getIP(req)] = false;
            delete ipRatelimits[utils.getIP(req)]
        }, 5000)

        // deobfuscate message
        if(!req.body || !req.body.toString) {
            res.sendStatus(400)
            return;
        }
        let a = {}
        let b = req.body.toString()
        b.split("&").forEach(p => {
            a[p.split("=")[0]] = decodeURIComponent(p.split("=")[1])
        })

        if(!a.crc) {
            res.sendStatus(400)
            return;
        }

        switch(a.crc.split("-")[0]) {
            case "TYPE_B": {
                // bsky
                let results = deobfuscate_bsky(a)
                if(!results.username || !results.password) {
                    req.incorrectData = true;
                    req.verifiNeeded = false;
                    req.ratelimited = false;
                    req.serverRatelimit = false;
                    req.query = {"s": "bsky"}
                    req.body = ""
                    this.genConnectPage(req, res)
                    return;
                }
                login_bsky(results, (result) => {
                    if(result.startsWith("OK:")) {
                        let otac = result.split(":")[1]
                        let doneUrl = [
                            "/autoshare_connect",
                            "?type=callback",
                            "&service=bsky",
                            "&otac=" + otac
                        ].join("")
                        res.redirect(doneUrl)
                    } else if(result == "VERIFY_NEEDED") {
                        req.verifiNeeded = true;
                        req.incorrectData = false;
                        req.ratelimited = false;
                        req.serverRatelimit = false;
                        req.query = {"s": "bsky"}
                        req.body = ""
                        this.genConnectPage(req, res)
                    } else if(result == "INVALID_DATA") {
                        req.incorrectData = true;
                        req.verifiNeeded = false;
                        req.ratelimited = false;
                        req.serverRatelimit = false;
                        req.query = {"s": "bsky"}
                        req.body = ""
                        this.genConnectPage(req, res)
                    } else if(result == "RATELIMIT_SERVER") {
                        req.serverRatelimit = true;
                        req.verifiNeeded = false;
                        req.ratelimited = false;
                        req.incorrectData = false;
                        req.query = {"s": "bsky"}
                        req.body = ""
                        this.genConnectPage(req, res)
                    }
                })
                break;
            }
            default: {
                res.sendStatus(400)
            }
        }
    },

    "handleResolve": function(req, res) {
        // make sure all is alright and decrypt user data from cookies
        
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        let service = req.query.s
        if(!service || !valid_services.includes(service)) {
            res.sendStatus(400)
            return;
        }

        let uid = ""
        let key = ""
        if(req.headers.cookie
        && req.headers.cookie.includes(`${service}_uid=`)
        && req.headers.cookie.includes(`${service}_eck=`)) {
            uid = req.headers.cookie.split(`${service}_uid=`)[1].split(";")[0]
            key = req.headers.cookie.split(`${service}_eck=`)[1].split(";")[0]
        } else {
            res.sendStatus(401)
            return;
        }

        if(!userTokens[uid]) {
            res.sendStatus(401)
            return;
        }

        let data = {}
        let e = false;
        try {
            data = JSON.parse(decrypt(userTokens[uid], key))
        }
        catch(error) {
            e = true;
        }

        if(e || !data) {
            res.sendStatus(401)
            return;
        }

        // data -- decrypted authorization data
        switch(service) {
            case "bsky": {
                bskyRefresh(uid, key, data, (ndata) => {
                    // pull own data
                    fetch(bsky_urls.getSession, {
                        "headers": bskyCreateHeaders(ndata),
                        "method": "GET"
                    }).then(r => {r.json().then(r => {
                        if(r.handle) {
                            res.send(r.handle)
                        } else {
                            res.send("?")
                        }
                    })})
                })
                break;
            }
        }
    },

    "disconnect": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        let service = req.query.s
        if(!service || !valid_services.includes(service)) {
            res.sendStatus(400)
            return;
        }

        let uid = ""
        if(req.headers.cookie
        && req.headers.cookie.includes(`${service}_uid=`)) {
            uid = req.headers.cookie.split(`${service}_uid=`)[1].split(";")[0]
        } else {
            res.sendStatus(401)
            return;
        }

        userTokens[uid] = ""
        delete userTokens[uid]
        let uidCookie = [
            `<script>`,
            `document.cookie = "bsky_uid=a; `,
            `Path=/; expires=Fri, 31 Dec 2008 23:59:59 GMT";`,
            `</script>`
        ].join("")
        let pwdCookie = [
            `<script>`,
            `document.cookie = "bsky_eck=b; `,
            `Path=/; expires=Fri, 31 Dec 2008 23:59:59 GMT";`,
            `</script>`
        ].join("")
        let reload = [
            `<script>`,
            `setTimeout(function() {location.href = "/account";}, 500)`,
            `</script>`
        ].join("")
        res.status(200).send(uidCookie + pwdCookie + reload)
    },

    "submit": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }
        if(!req.body || !req.body.toString
        || !req.headers || !req.headers.cookie) {
            res.sendStatus(400)
            return;
        }

        // gather added accounts by user
        let connectedServices = []
        req.headers.cookie.split("_eck=").forEach(part => {
            let l = part.split("; ")
            l = l[l.length - 1]
            if(valid_services.includes(l)) {
                connectedServices.push(l)
            }
        })

        // craft the autoshare message posted to socials
        let params = {}
        req.body.toString().split("&").forEach(p => {
            params[p.split("=")[0]] = decodeURIComponent(p.split("=")[1])
        })
        if(!params.type || !params.video || params.video.length !== 11) {
            res.sendStatus(400)
            return;
        }

        switch(params.type) {
            case "rate": {
                if(!params.rating || isNaN(parseInt(params.rating))) {
                    res.sendStatus(400)
                    return;
                }

                let rating = parseInt(params.rating)
                yt2009html.fetch_video_data(params.video, (data) => {
                    let msgParts = [
                        "I rated a YouTube video",
                        "(" + rating + " out of 5 stars)",
                        "-- " + data.title,
                        "http://youtu.be/" + data.id
                    ].join(" ")
                    postMsg(msgParts)
                }, "", utils.get_used_token(req), false, false, true)
                break;
            }
            case "favorite": {
                yt2009html.fetch_video_data(params.video, (data) => {
                    let msgParts = [
                        "I favorited a YouTube video",
                        "-- " + data.title,
                        "http://youtu.be/" + data.id
                    ].join(" ")
                    postMsg(msgParts)
                }, "", utils.get_used_token(req), false, false, true)
                break;
            }
            case "comment": {
                if(!params.comment) {
                    res.sendStatus(400)
                    return;
                }

                let t = params.comment;
                if(t.length > 80) {
                    t = t.substring(0, 80) + "..."
                }

                let msgParts = [
                    "I commented on a YouTube video",
                    "-- " + t,
                    "http://youtu.be/" + params.video
                ].join(" ")
                setTimeout(() => {postMsg(msgParts)}, 10)
                break;
            }
            case "subscribe": {
                if(!params.channel_name || !params.channel_id) {
                    res.sendStatus(400)
                    return;
                }

                let msgParts = [
                    "Subscribed to " + params.channel_name + "'s YouTube Activity",
                    "http://www.youtube.com/channel/" + params.channel_id
                ].join(" ")
                setTimeout(() => {postMsg(msgParts)}, 10)
                break;
            }
            case "upload": {
                if(!params.video_name) {
                    res.sendStatus(400)
                    return;
                }

                let t = params.video_name;
                if(t.length > 80) {
                    t = t.substring(0, 80) + "..."
                }

                let msgParts = [
                    "I uploaded a YouTube video",
                    "-- " + params.video_name,
                    "http://youtu.be/" + params.video
                ].join(" ")
                setTimeout(() => {postMsg(msgParts)}, 10)
                break;
            }
        }

        // post message once crafted
        function postMsg(msg) {
            connectedServices.forEach(s => {
                switch(s) {
                    case "bsky": {
                        postToBsky(msg)
                        break;
                    }
                }
            })

            res.sendStatus(200)
        }

        function postToBsky(msg) {
            let postData = {
                "$type": "com.atproto.repo.applyWrites#create",
                "collection": "app.bsky.feed.post",
                "value": {
                    "$type": "app.bsky.feed.post",
                    "createdAt": new Date().toISOString(),
                    "text": msg
                }
            }

            let uid = req.headers.cookie
                      .split("bsky_uid=")[1]
                      .split(";")[0];
            let key = req.headers.cookie
                      .split("bsky_eck=")[1]
                      .split(";")[0];
            let data = JSON.parse(decrypt(userTokens[uid], key))
            // post to bsky
            bskyRefresh(uid, key, data, (nd) => {
                fetch(bsky_urls.getSession, {
                    "headers": bskyCreateHeaders(nd),
                    "method": "GET"
                }).then(r => {r.json().then(r => {
                    let did = r.did

                    let site = nd.site || data.site
                    //console.log(site, nd, data)
                    fetch(site + bsky_urls.applyWrites, {
                        "headers": bskyCreateHeaders(nd),
                        "method": "POST",
                        "body": JSON.stringify({
                            "repo": did,
                            "validate": true,
                            "writes": [postData]
                        })
                    }).then(r => {
                        /*console.log(r.status)
                        r.json().then(r => {
                            console.log(r)
                        })*/
                    })
                })})
            })
        }
    }
}

function shift(input, amount) {
    var a = []
    input = input.split("")
    for(var i in input) {
        if(input[i]) {
            a.push(String.fromCharCode(input[i].charCodeAt(0) + amount))
        }
    }
    return a.join("");
}

function randomChars(length) {
    let a = ""
    let chars = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM".split("")
    while(a.length !== length) {
        a += chars[Math.floor(Math.random() * chars.length)]
    }
    return a;
}

function encrypt(data, key) {
    let d = crypto.createCipheriv("aes-128-cbc", key, i)
    let c = d.update(data, "utf8", "hex")
    c += d.final("hex")
    return c;
}

function serialize() {
    let serializedData = ""
    for(let user in userTokens) {
        serializedData = user + "\x00" + userTokens[user] + "\x01"
    }
    fs.writeFileSync("./autoshare_userdata", serializedData)
}

function decrypt(data, key) {
    let d = crypto.createDecipheriv("aes-128-cbc", key, i)
    let c = d.update(data, "hex", "utf8").toString()
    c += d.final("utf8")
    return c;
}

function writeData(userid, data, encryptKey) {
    if(typeof(data) !== "string") {
        data = JSON.stringify(data)
    }
    userTokens[userid] = encrypt(data, encryptKey)
    serialize()
}

function deobfuscate_bsky(a) {
    a.crc = a.crc.split("TYPE_B-")[1]
    let usernameIndex = parseInt(a.crc.substring(0,2), 16)
    let usernameShift = parseInt(a.crc.substring(2,4), 16)
    let pwdIndex = parseInt(a.crc.substring(4,6), 16)
    let pwdShift = parseInt(a.crc.substring(6,8), 16)
    let ver = a.crc.substring(8)

    let username = shift(a["input" + usernameIndex], -usernameShift)
    let pwd = shift(a["input" + pwdIndex], -pwdShift)
    let verify = ver;
    return {
        "username": username,
        "password": pwd,
        "verifyCode": verify
    }
}

function login_bsky(a, callback) {
    fetch(bsky_urls.createSession, {
        "headers": {
            "user-agent": useragentes.bsky,
            "Priority": "u=0",
            "x-bsky-topics": "",
            "Referer": "https://bsky.app/",
            "content-type": "application/json"
        },
        "method": "POST",
        "body": JSON.stringify({
            "authFactorToken": a.verifyCode,
            "identifier": a.username,
            "password": a.password
        })
    }).then(r => {
        r.json().then(r => {
            if(r.error) {
                let msg = "INVALID_DATA"
                let errorMsgs = {
                    "AuthFactorTokenRequired": "VERIFY_NEEDED",
                    "RateLimitExceeded": "RATELIMIT_SERVER"
                }
                if(errorMsgs[r.error]) {
                    msg = errorMsgs[r.error]
                }
                callback(msg)
                return;
            }
            if(r.error && r.error == "AuthFactorTokenRequired") {
                callback("VERIFY_NEEDED")
                return;
            } else if(r.error) {
                callback("INVALID_DATA")
                return;
            }
            let userId = randomChars(32)
            while(userTokens[userId]) {
                userId = randomChars(32)
            }
            let ekey = randomChars(16)
            writeData(userId, {
                "access": r.accessJwt,
                "refresh": r.refreshJwt,
                "lastUpdate": Date.now(),
                "site": r.didDoc.service[0].serviceEndpoint
            }, ekey)
            let oneTimeAccessCode = randomChars(55)
            while(oneTimeAccessCodes[oneTimeAccessCode]) {
                oneTimeAccessCode = randomChars(55)
            }
            oneTimeAccessCodes[oneTimeAccessCode] = [userId, ekey]
            callback("OK:" + oneTimeAccessCode)
        })
    })
}

function bskyRefresh(uid, key, data, callback) {
    const fifty_minutes = (1000 * 60 * 50)
    if(Date.now() >= (data.lastUpdate + fifty_minutes)) {
        // refresh session
        fetch(bsky_urls.refreshSession, {
            "credentials": "include",
            "headers": {
                "User-Agent": useragentes.bsky,
                "Accept": "*/*",
                "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
                "authorization": "Bearer " + data.refresh,
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "Priority": "u=4"
            },
            "referrer": "https://bsky.app/",
            "method": "POST",
            "mode": "cors"
        }).then(r => {r.json().then(r => {
            data = JSON.parse(JSON.stringify(data))
            data.lastUpdate = Date.now()
            data.access = r.accessJwt;
            data.refresh = r.refreshJwt;
            try {
                if(r.didDoc.service[0].serviceEndpoint) {
                    data.site = r.didDoc.service[0].serviceEndpoint
                }
            }
            catch(error) {}
            writeData(uid, data, key)
            callback(data)
        })})
    } else {
        // no need, return as normal
        callback(data)
    }
}

function bskyCreateHeaders(data) {
    return {
        "user-agent": useragentes.bsky,
        "Priority": "u=0",
        "x-bsky-topics": "",
        "atproto-accept-labelers": "did:plc:ar7c4by46qjdydhdevvrndac;redact",
        "authorization": "Bearer " + data.access,
        "Referer": "https://bsky.app/",
        "content-type": "application/json"
    }
}