const cache = require("./cache_dir/captions_cache_mgr")
const fetch = require("node-fetch")
const parser = require("node-html-parser")
const fs = require("fs")
const templates = require("./yt2009templates")

module.exports = {
    "main": function(req, res) {
        let id = req.query.v;
        id = id.split("/mp4")[0]
        let type = req.query.type;
        let useJson = false;
        if(req.query.json) {
            useJson = true;
        }
        let resetCache = false;
        if(req.headers.referer
        && req.headers.referer.includes("resetcache=1")) {
            resetCache = true
        }

        // list = language list
        // track = the caption itself
        switch(type) {
            case "list": {
                // get the language list via innertube
                this.getLanguages(id, (data) => {
                    if(useJson) {
                        res.send(data)
                    } else {
                        // create xml for flash
                        let xml = templates.xmlSubListBegin;
                        let langIndex = 0;
                        for(let langName in data) {
                            xml += templates.xmlSubListTrack(
                                langName,
                                data[langName].name,
                                langIndex
                            )
                            langIndex++;
                        }
                        xml += templates.xmlListEnd
                        res.send(xml)
                    }
                }, resetCache)
                break;
            }
            case "track": {
                // get the caption file for sending/further parsing
                this.getCaptionFile(id, req.query.lang, (xml) => {
                    if(!useJson) {
                        res.send(xml)
                    } else {
                        res.send(this.parseCaptionsJson(xml))
                    }
                })
                break;
            }
        }
    },

    "getLanguages": function(id, callback, resetCache) {
        cache.read(id, (data) => {
            callback(data)
        }, resetCache)
    },
    
    "getCaptionFile": function(id, language, callback) {
        let defaults = [
            "<title>Error 404 (Not Found)!!1</title>",
            `<?xml version="1.0" encoding="utf-8" ?><transcript>
            <text start="0" dur="0.1"> </text>
            </transcript>`
        ]
        id = id.split("/mp4")[0]
        let getLanguages = this.getLanguages;
        let retryCount = 0;
        function getFile(resetCache) {
            if(retryCount >= 2) {
                callback("")
                return;
            }
            let fName = "./cache_dir/subtitles/" + id + "-" + language + ".xml"
            if(fs.existsSync(fName) && !resetCache) {
                // file exists, send
                callback(fs.readFileSync(fName).toString())
            } else {
                // doesn't exist, get the url and download
                getLanguages(id, (data) => {
                    for(let langName in data) {
                        if(langName == language) {
                            try {
                                fetch(data[langName].url)
                                .catch(error => {
                                    console.log("1", error)
                                    retryCount++;
                                    getFile(true)
                                })
                                .then(r => {r.text().then(r => {
                                    if(r.includes(defaults[0])) {
                                        if(retryCount < 2) {
                                            retryCount++
                                            getFile(true)
                                            return;
                                        }
                                        r = defaults[1]
                                    }

                                    if(data[langName].url.includes("kind=asr")) {
                                        r = fixupAutoCaptions(r)
                                    }

                                    callback(r)
                                    fs.writeFileSync(fName, r)
                                })})
                            }
                            catch(error) {
                                retryCount++;
                                getFile(true);
                                console.log("2", error)
                            }
                        }
                    }
                }, resetCache)
            }
        }
        
        getFile(false)
    },

    "parseCaptionsJson": function(xml) {
        let json = {}
        xml = parser.parse(xml)
        xml.querySelectorAll("text").forEach(text => {
            let startTime = bFloat(text.getAttribute("start"))
            while(json[startTime]) {
                startTime += 0.1
            }
            json[startTime] = {
                "text": text.innerHTML.split("&lt;").join("<")
                                      .split("&gt;").join(">")
                                      .split("&quot;").join("\"")
                                      .split("\n").join("<br>")
                                      .split("&amp;").join("&")
                                      .split("&#39;").join("'"),
                "start": startTime,
                "duration": bFloat(text.getAttribute("dur")),
                "end": Math.floor((startTime + bFloat(text.getAttribute("dur"))) * 10) / 10
            }
        })
        return json;
    },

    "rexmlFromJson": function(cc) {
        let xml = `<?xml version="1.0" encoding="utf-6" ?><transcript>`
        for(let start in cc) {
            xml += `<text start="${start}" dur="${cc[start].duration}">`
            xml += cc[start].text
                   .split("&#39;").join("'")
                   .split("&quot;").join("\"")
                   .split("<br>").join("\n")
                   .split("&").join("&amp;")
                   .split("<").join("&lt;")
                   .split(">").join("&gt;")
            xml += "</text>"
        }
        xml += `</transcript>`
        return xml;
    }
}

function bFloat(input) {
    return Math.floor(parseFloat(input) * 10) / 10;
}

function fixupAutoCaptions(xml) {
    // automatic captions have their durations all over the place
    // this fixes it up for players supported by yt2009 to look sane
    let startTimes = []
    //let durations = []
    let pxml = module.exports.parseCaptionsJson(xml)
    let nj = JSON.parse(JSON.stringify(pxml))
    for(let i in pxml) {
        startTimes.push(bFloat(i))
        //durations.push(pxml[i].duration)
    }
    startTimes = startTimes.sort((a, b) => {return a - b});
    let i = 0;
    startTimes.forEach(s => {
        if(startTimes[i + 1]) {
            let target = bFloat(
                bFloat(startTimes[i + 1]) - bFloat(startTimes[i])
            )
            if(target >= 0.4) {
                target = bFloat(target - 0.2)
            }
            nj[s].duration = target;
            nj[s].end = nj[s].start + target;
        }
        i++
    })
    return module.exports.rexmlFromJson(nj);
}