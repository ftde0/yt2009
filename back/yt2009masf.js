/*
SEVERELY BROKEN
SEVERELY BROKEN
SEVERELY BROKEN
*/

const zlib = require("zlib")
const yt2009mobile = require("./yt2009mobile")
const yt2009cps = require("./yt2009cps")
const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")

// request pARSE
function readMASFRequest(b) {
    const encodings = {
        "g": "gzip",
        "n": "raw"
    }
    function toInt(buf) {
        let s = ""
        for(let byte of buf) {
            s += parseInt(byte).toString("16").padStart(2,"0")
        }
        return parseInt(s, 16)
    }
    function readShort() {
        let short = b.slice(cursor, cursor + 2)
        cursor += 2
        return toInt(short)
    }
    function readByte() {
        let byte = b.slice(cursor, cursor + 1)
        cursor++
        return byte[0];
    }
    function readString() {
        // first 2 bytes are hex length (short),
        // read this exact amount
        let stringLength = readShort()
        let string = b.slice(cursor,cursor+stringLength).toString()
        cursor += stringLength;
        return string;
    }
    function readInt() {
        let i = b.slice(cursor, cursor + 4)
        cursor += 4
        return toInt(i)
    }
    let cursor = 0;
    let protocolVersion = readShort()

    if(!protocolVersion) {
        return false;
    }

    let fullRequestData = {}
    // first 8 bytes of v1 request is a cookie
    // not needed so skip
    if(protocolVersion == 1) {
        cursor += 5
    }
    readByte() // delimiter
    let header = readString() // "minitube,1.0.1,NotSet...
    cursor += 8 //skippable cookie data
    let acceptEncoding = readString() // "g" == gzip, "n" == nop (no      compress)
    fullRequestData.acceptEncoding = acceptEncoding;
    fullRequestData.friendlyAcceptEncoding = encodings[acceptEncoding]
    fullRequestData.protocolVersion = protocolVersion;
    fullRequestData.clientHeader = header;
    fullRequestData.requests = []
    // actual batched request(s)
    while(cursor < b.length - 1) {
        let requestData = {}
        let reqLength = readInt()
        if(protocolVersion == 2) {
            readByte() //delim?
        }
        let reqType = readShort() // 256 in most cases (0100),
        // 257 for posting?
        let targetCursor = cursor + reqLength
        let reqId = readShort()
        let reqURL = readString()
        let serviceVersion = readShort()
        requestData.rawLength = reqLength
        requestData.referenceId = reqId;
        requestData.type = reqType
        requestData.url = reqURL
        requestData.serviceVersion = serviceVersion //?
        let payloadLength = readInt()
        if(payloadLength >= 1) {
            // raw data
            let payloadData = b.slice(
                cursor,
                cursor + payloadLength
            )
            requestData.payloadData = payloadData;
            // payloadData may be of any type.
            /*
            don't use!! \/
            
            if(payloadData.indexOf("\x00\x03GET") == 0) {
                requestData.suggestedType = "getKvPair"
                let method = readString()
                let payloadCount = readByte()
                let payloads = []
                while(payloads.length !== payloadCount) {
                    let key = readString()
                    let value = readString()
                    payloads.push({"key": key, "value": value})
                }
                requestData.method = method;
                requestData.payloads = payloads;
            }*/
        }
        fullRequestData.requests.push(requestData)
        cursor = targetCursor
    }
    return fullRequestData;
}

// MASF COMPILE helper functions & main
function toHex(number, length) {
    let hl = number.toString("16").padStart(length * 2, "0")
                   .match(/.{1,2}/g)
                   .map(s => {return parseInt(s, "16")});
    return Buffer.from(hl)
}
function masfWriteShort(number) {
    return toHex(number,2)
}
function masfWriteInt(number) {
    return toHex(number,4)
}
function masfWriteString(string) {
    let length = toHex(string.length,2)
    return Buffer.concat([length, Buffer.from(string)])
}
function createResponse(content, reqId, encoding, extraHeaders) {
    let encodedResponse = content;
    let extra = false
    if(extraHeaders) {
        let endPad = 0;
        if(extraHeaders["x-internal-padding"]) {
            endPad = parseInt(extraHeaders["x-internal-padding"])
        }
        let extraCount = 0;
        let headerStrings = []
        for(let headerName in extraHeaders) {
            if(typeof(extraHeaders[headerName]) !== "string") {
                extraHeaders[headerName] = extraHeaders[headerName].toString()
            }
            extraCount++
            headerStrings.push(masfWriteString(headerName))
            headerStrings.push(masfWriteString(extraHeaders[headerName]))
        }
        extra = Buffer.concat([
            Buffer.from([extraCount]),
            Buffer.concat(headerStrings)
        ])
        if(endPad >= 1) {
            extra = Buffer.concat([extra, Buffer.from("\x01".repeat(endPad))])
        }
        if(extraCount == 0) {
            extra = Buffer.from([0])
        }
    } else {
        extra = Buffer.from([0])
    }
    if(encoding == "g") {
        encodedResponse = zlib.gzipSync(encodedResponse)
        // ^^ for further tests, minitube doesn't like
    }
    let respBody = Buffer.from("")
    respBody = Buffer.concat([
        masfWriteShort(reqId),
        masfWriteShort(200), //status code
        masfWriteString(encoding),
        masfWriteInt(Buffer.byteLength(encodedResponse)),
        extra,
        masfWriteString(Buffer.from(encodedResponse))
    ])
    let fullResp = Buffer.concat([
        masfWriteInt(respBody.length),
        masfWriteShort(33024),
        respBody
    ])
    return fullResp
}

module.exports = {
    "handleRequest": function(req, res) {
        let b = readMASFRequest(req.body)
        if(!b) {
            res.sendStatus(400)
            return;
        }

        res.set("content-type", "application/binary")
        res.set("X-Masf-Response-Code", 200)
        let respBody = masfWriteShort(b.protocolVersion)

        let responsesAdded = 0;

        function putEmptyResponse(z) {
            respBody = Buffer.concat([respBody, createResponse(
                "", z.referenceId, "n"
            )])
            responsesAdded++
            if(responsesAdded >= b.requests.length) {
                onAllResponses()
            }
        }

        function onAllResponses() {
            res.send(respBody)
        }

        b.requests.forEach(z => {
            if(z.url
            && (z.url.includes("/feeds/mobile")
            || z.url.includes("/feeds/api"))) {
                let extraHeaders = {
                    "content-type": "application/atom+xml"
                }
                
                let feedUrl = z.url.replace("/feeds/mobile/", "/feeds/api/")
                               .split("/feeds/api/")[1]
                let options = []
                let params = {}

                if(feedUrl.includes("?")) {
                    options = feedUrl.split("?")[1].split("&")
                    feedUrl = feedUrl.split("?")[0]
                    options.forEach(p => {
                        if(!p.includes("=")) return;
                        let key = p.split("=")[0]
                        let value = decodeURIComponent(p.split("=")[1])
                                    .split("+").join(" ")
                        params[key] = value;
                    })
                }

                while(feedUrl && feedUrl.endsWith("/")) {
                    feedUrl = feedUrl.substring(0,feedUrl.length-1)
                }

                let fakeReq = {
                    "originalUrl": "/feeds/api/" + feedUrl
                                 + "?" + options.join("&"),
                    "headers": req.headers,
                    "ip": req.ip,
                    "query": params,
                    "light": true,
                    "source": "proxy"
                }
                let fakeRes = {
                    "set": function(a,b) {},
                    "send": function(data) {
                        // to a 1liner
                        let lines = data.split("\r").join("").split("\n")
                        let newLines = []
                        lines.forEach(l => {
                            newLines.push(l.trim())
                        })
                        newLines = newLines.join("\n")
                        newLines = newLines.replace(
                            "<?xml version='1.0' encoding='UTF-8'?>",
                            ""
                        )
                        newLines = newLines.split("format='3'")
                                           .join("format='6'")
                                           .split("channel_fh264_getvideo?v=")
                                           .join("http_3gp_CNOPAR_")
                                           .split("width='320'")
                                           .join("width='130'")
                                           .split("height='240'")
                                           .join("height='97'")

                        respBody = Buffer.concat([respBody, createResponse(
                            newLines, z.referenceId, "n", extraHeaders
                        )])
                        responsesAdded++
                        if(responsesAdded >= b.requests.length) {
                            onAllResponses()
                        }
                    },
                    "status": function(s) {},
                    "sendStatus": function(s) {
                        console.log("what?")
                        putEmptyResponse(z)
                    }
                }

                switch(feedUrl) {
                    case "standardfeeds/recently_featured":
                    case "standardfeeds/most_viewed":
                    case "standardfeeds/top_rated":
                    case "standardfeeds/most_recent": {
                        yt2009mobile.feeds(fakeReq, fakeRes)
                        break;
                    }
                    case "videos": {
                        if(fakeReq.originalUrl.includes("q=")
                        || fakeReq.originalUrl.includes("vq=")) {
                            yt2009cps.get_search(fakeReq, fakeRes)
                        } else {
                            putEmptyResponse(z)
                        }
                        break;
                    }
                    default: {
                        console.log(feedUrl)
                        if(feedUrl.includes("/related")
                        && feedUrl.includes("videos/")) {
                            yt2009mobile.apkVideoRelated(fakeReq, fakeRes)
                        } else {
                            putEmptyResponse(z)
                        }
                        break;
                    }
                }
            } else if(z.payloadData
            && z.payloadData.indexOf(Buffer.from("Terms")) !== -1) {
                respBody = Buffer.concat([respBody, createResponse(
                    Buffer.concat([
                        masfWriteString("test1"),
                        masfWriteString("test2"),
                        masfWriteInt(1)
                    ]), z.referenceId, "n"
                )])
                responsesAdded++
                if(responsesAdded >= b.requests.length) {
                    onAllResponses()
                }
            } else if(z.url
            && z.url.indexOf("http://i.ytimg.com/vi/") !== -1) {
                let id = z.url
                          .split("http://i.ytimg.com/vi/")[1]
                          .split("/")[0]
                          .substring(0,11)
                          .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                console.log("pull",id)
                fetch("http://i.ytimg.com/vi/" + id + "/default.jpg", {
                    "headers": constants.headers
                }).then(r => {r.buffer().then(rr => {
                    respBody = Buffer.concat([respBody, createResponse(
                        rr, z.referenceId, "n", {
                            "Content-Type": "image/jpg",
                            "Content-Length": Buffer.byteLength(rr).toString(),
                            "x-internal-padding": 2
                        }
                    )])
                    responsesAdded++
                    if(responsesAdded >= b.requests.length) {
                        onAllResponses()
                    }
                })})
            } else {
                putEmptyResponse(z)
            }
        })
    }
}