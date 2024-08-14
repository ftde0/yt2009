const fetch = require("node-fetch")
const fs = require("fs")
const constants = require("./yt2009constants.json")
const ua = "Mozilla/5.0 (Linux; Android 10; BRAVIA 4K VH2 Build/QTG3.200305.006.S292; wv)"
const test_alwayssign = false;
const uida = "1234567890qwertyuiopasdfghjklzxcvbnm".split("")
const scope = "http://gdata.youtube.com https://www.googleapis.com/auth/youtube-paid-content"
const failMsg = `

==================================

your setup may require you to use
a youtube account to continue using
yt2009.

follow the onscreen instructions
to link your youtube account.

==================================

`

let tvData = {}
if(!fs.existsSync("./tvdata.json") ||
  (fs.existsSync("./tvdata.json")
  && JSON.parse(fs.readFileSync("./tvdata.json").toString()).dph)) {
    const vids = [
        "evJ6gX1lp2o", "dQw4w9WgXcQ", "jNQXAC9IVRw",
        "yQwPhCI_qO0", "ts2a9cW4nLY"
    ]

    // test /player fetch to check if we need tv sign in on host
    let rv = vids[Math.floor(Math.random() * vids.length)]
    fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", {
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
            "Content-Type": "application/json",
            "x-goog-authuser": "0",
            "x-origin": "https://www.youtube.com/",
            "user-agent": "com.google.android.youtube/19.02.39 (Linux; U; Android 14) gzip",
            "cookie": constants.headers.cookie
        },
        "referrer": "https://www.youtube.com/watch?v=" + rv,
        "body": JSON.stringify({
            "context": {
                "client": {
                    "hl": "en",
                    "clientName": "ANDROID",
                    "clientVersion": "19.02.39",
                    "androidSdkVersion": 34,
                    "mainAppWebInfo": {
                        "graftUrl": "/watch?v=" + rv
                    }
                }
            },
            "videoId": rv
        }),
        "method": "POST",
        "mode": "cors"
    }).then(r => {
        r.json().then(r => {
            if((r.playabilityStatus && r.playabilityStatus.status !== "OK"
            && r.playabilityStatus.reason
            && r.playabilityStatus.reason.includes("Sign in to confirm"))
            || test_alwayssign) {
                let tvWebHeaders = JSON.parse(JSON.stringify(constants.headers))
                tvWebHeaders["user-agent"] = ua
                console.log(failMsg)
                console.log("generating a link code..")
                fetch("https://www.youtube.com/tv", {
                    "headers": tvWebHeaders
                }).then(s => {
                    let cookie = s.headers.get("set-cookie").split(",")
                    let cookieString = ""
                    cookie.forEach(part => {
                        if(part.split(";")[0].includes("=")) {
                            cookieString += part.trimStart().split(";")[0] + "; "
                        }
                    })
                    tvData.cookie = cookieString
                    s.text().then(s => {
                        let clientId = s.split(`clientId:"`)[1].split(`"`)[0]
                        let clientSecret = s.split(clientId + "\"")[1]
                                            .split(`"`)[1].split(`"`)[0]
                        let clientVer = s.split(`"clientVersion":"`)[1].split(`"`)[0]
                        let pageCl = s.split(`PAGE_CL":`)[1].split(`"`)[0]
                        let pageLabel = s.split(`PAGE_BUILD_LABEL":"`)[1].split(`"`)[0]
                        let context = s.split(`"INNERTUBE_CONTEXT":`)[1]
                                    .split(`}}`)[0] + "}}"
                        tvData.context = JSON.parse(context)
                        tvData.clientVer = clientVer
                        tvData.pageCl = pageCl
                        tvData.pageLabel = pageLabel
                        let randomId = []
                        let ridi = 0;
                        while(randomId.length !== 5) {
                            let idPart = ""
                            let tpl = 4;
                            switch(ridi) {
                                case 0: {tpl = 8;break;}
                                case 4: {tpl = 12;break;}
                            }
                            while(idPart.length !== tpl) {
                                idPart += uida[
                                    Math.floor(Math.random() * uida.length)
                                ]
                            }
                            randomId.push(idPart)
                            ridi++
                        }
                        randomId = randomId.join("-")
                        tvData.clientId = clientId
                        tvData.clientSecret = clientSecret
                        tvData.deviceId = randomId
                        tvData.deviceModel = "ytlr:sony:bravia 4k vh2"
                        tvData.scope = scope;
                        genCode()
                    })
                })
            }
        })
    })
} else {
    tvData = JSON.parse(fs.readFileSync("./tvdata.json"))
    testSignIn()
}

let tempData = {}
let codePollInterval;
function genCode() {
    let tvHeaders = JSON.parse(JSON.stringify(constants.headers))
    tvHeaders["user-agent"] = ua;
    if(tvData.cookie && tvData.cookie.length > 0) {
        if(!tvHeaders.cookie.endsWith("; ")) {
            tvHeaders.cookie += "; "
        }
        tvHeaders.cookie += tvData.cookie
    }
    fetch(`https://www.youtube.com/o/oauth2/device/code`, {
        "method": "POST",
        "headers": tvHeaders,
        "body": JSON.stringify({
            "client_id": tvData.clientId,
            "device_id": tvData.deviceId,
            "device_model": tvData.deviceModel,
            "scope": tvData.scope
        })
    }).then(r => (r.json().then(r => {
        if(!r.device_code) {
            console.log(`
=== no device code sent by youtube! ===
try again later. if the problem persists,
please make an issue at
https://github.com/ftde0/yt2009/
=======================================
    `)
        } else {
            tempData.userCode = r.user_code
            tempData.generated = Date.now()
            tempData.expire = tempData.generated + (r.expires_in * 1000)
            tempData.deviceCode = r.device_code
            console.log(`
==================
navigate to yt.be/activate
**with a youtube account**, and
type the following code:
${tempData.userCode}

use an alt google account if
possible.
==================`)
            codePollInterval = setInterval(pollCode, 5000)
        }
    })))
}

function pollCode() {
    let tvHeaders = JSON.parse(JSON.stringify(constants.headers))
    tvHeaders["user-agent"] = ua;
    if(tvData.cookie && tvData.cookie.length > 0) {
        if(!tvHeaders.cookie.endsWith("; ")) {
            tvHeaders.cookie += "; "
        }
        tvHeaders.cookie += tvData.cookie
    }
    if(tempData.expire < Date.now()) {
        console.log("activation code expires. wait for a new one")
        genCode()
        return;
    }
    fetch("https://www.youtube.com/o/oauth2/token", {
        "headers": tvHeaders,
        "method": "POST",
        "body": JSON.stringify({
            "client_id": tvData.clientId,
            "client_secret": tvData.clientSecret,
            "code": tempData.deviceCode,
            "grant_type": "http://oauth.net/grant_type/device/1.0"
        })
    }).then(r => {r.json().then(r => {
        if(r.access_token) {
            console.log("access token found! testing..")
            tvData.accessToken = r.access_token
            tvData.tokenType = r.token_type
            tvData.tokenGenerated = Date.now()
            tvData.expire = tvData.tokenGenerated + (r.expires_in * 1000)
            tvData.refreshToken = r.refresh_token
            tvData.headers = JSON.parse(JSON.stringify(tvHeaders))
            fs.writeFileSync("./tvdata.json", JSON.stringify(tvData))
            clearInterval(codePollInterval)
            testSignIn()
        }
    })})
}

function testSignIn() {
    if(refreshIfNeeded()) return;
    let h = JSON.parse(JSON.stringify(tvData.headers))
    h.Authorization = `${tvData.tokenType} ${tvData.accessToken}`
    fetch("https://www.youtube.com/youtubei/v1/account/accounts_list", {
        "method": "POST",
        "headers": h,
        "body": JSON.stringify({
            "context": tvData.context,
            "accountReadMask": {
                "returnOwner": true,
                "returnFamilyChildAccounts": true,
                "returnBrandAccounts": true,
                "returnPersonaAccounts": true
            }
        })
    }).then(r => {r.json().then(r => {
        try {
            r.contents[0].accountSectionListRenderer
            .contents[0].accountItemSectionRenderer.contents.forEach(a => {
                if(a.accountItem && a.accountItem.isSelected) {
                    a = a.accountItem;
                    if(a.channelHandle && a.channelHandle.simpleText) {
                        console.log("account used: " + a.channelHandle.simpleText)
                    } else if(a.accountName && a.accountName.simpleText) {
                        console.log("account used: " + a.accountName.simpleText)
                    }
                }
            })
        }
        catch(error) {
            console.log("sign-in test failed!", error)
        }
    })})
}

module.exports = {
    "needed": function() {
        return fs.existsSync("./tvdata.json")
    },

    "getTvData": function() {
        return JSON.parse(JSON.stringify(tvData));
    }
}

function refreshIfNeeded() {
    let tvHeaders = JSON.parse(JSON.stringify(constants.headers))
    tvHeaders["user-agent"] = ua;
    if(tvData.cookie && tvData.cookie.length > 0) {
        if(!tvHeaders.cookie.endsWith("; ")) {
            tvHeaders.cookie += "; "
        }
        tvHeaders.cookie += tvData.cookie
    }
    if(tvData.tokenGenerated && tvData.expire
    && (tvData.expire - 1800000) < Date.now()) {
        console.log("authorization token refreshing!")
        fetch("https://www.youtube.com/o/oauth2/token", {
            "headers": tvHeaders,
            "method": "POST",
            "body": JSON.stringify({
                "client_id": tvData.clientId,
                "client_secret": tvData.clientSecret,
                "grant_type": "refresh_token",
                "refresh_token": tvData.refreshToken
            })
        }).then(r => {r.json().then(r => {
            if(r.access_token) {
                tvData.accessToken = r.access_token
                tvData.tokenType = r.token_type
                tvData.tokenGenerated = Date.now()
                tvData.expire = tvData.tokenGenerated + (r.expires_in * 1000)
                if(r.refresh_token) {
                    // just in case
                    tvData.refreshToken = r.refresh_token
                }
                console.log("access token refreshed! testing..")
                fs.writeFileSync("./tvdata.json", JSON.stringify(tvData))
                testSignIn()
            }
        })})
        return true;
    }
    return false;
}
let x = setInterval(refreshIfNeeded, 1000 * 60)