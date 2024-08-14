const child_process = require("child_process")
const fs = require("fs")
let yt2009_process;

if(!fs.existsSync("./logs/")) {
    fs.mkdirSync("./logs/")
}
console.log("logs will be saved to /back/logs/")

if(!fs.existsSync("./tvdata.json")) {
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
            "cookie": require("./yt2009constants.json").headers.cookie
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
            && r.playabilityStatus.reason.includes("Sign in to confirm"))) {
                console.log(`
=====================

you might face trouble with video
playback.

run backend.js outside of
backend_wrap for more info.

=====================

`)
            }
        })
    })
}

function start_yt2009() {
    let commands = [
        `cd "${__dirname.replace(/\"/g, "\\\"")}" `,
        `&& node backend.js`
    ].join("")
    console.log(`yt2009 start at ${new Date().toLocaleString()}`)
    yt2009_process = child_process.exec(commands, (error, stdout, stderr) => {
        fs.writeFileSync("./logs/" + Date.now() + ".txt", stdout + stderr)
        setTimeout(() => {
            start_yt2009()
        }, 3000)
    })
}
start_yt2009()