// shared helper for image endpoints to send the file directly
const fs = require("fs")
const path = require("path")

function abs(relativeUrl) {
    return path.join(__dirname, "..", relativeUrl)
}

function isReady(absolutePath) {
    try {
        return fs.existsSync(absolutePath)
        && fs.statSync(absolutePath).size > 0;
    }
    catch(error) {
        return false;
    }
}

function send(res, relativeUrl, headers) {
    if(headers) {
        for(let k in headers) {
            res.set(k, headers[k])
        }
    }
    try {
        res.sendFile(abs(relativeUrl), (error) => {
            if(!error || res.writableEnded) {
                return;
            }
            if(!res.headersSent) {
                res.sendStatus(404)
            } else {
                res.end()
            }
        })
    }
    catch(error) {
        if(!res.headersSent) {
            res.sendStatus(404)
        }
    }
}

// poll until the file lands on disk
function waitForFile(req, res, relativeUrl, options, onReady) {
    if(typeof(options) == "function") {
        onReady = options;
        options = {};
    }
    options = options || {}
    let tries = options.tries || 5
    let interval = options.interval || 1000
    let count = 0
    function attempt() {
        if(res.writableEnded || req.aborted) {
            return;
        }
        if(isReady(abs(relativeUrl))) {
            onReady()
            return;
        }
        count++
        if(count >= tries) {
            res.sendStatus(404)
            return;
        }
        setTimeout(attempt, interval)
    }
    attempt()
}

function isValidAssetUrl(url) {
    return !!url
    && url.startsWith("/assets/")
    && (url.endsWith(".jpg") || url.endsWith(".png"))
    && !url.includes("..");
}

module.exports = {
    "abs": abs,
    "isReady": isReady,
    "send": send,
    "waitForFile": waitForFile,
    "isValidAssetUrl": isValidAssetUrl
}
