const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("../yt2009utils")

module.exports = {
    "write": function(id, data) {
        fs.writeFileSync(`./annotations/${id}.xml`, data)
    },

    "read": function(id, fullUrl, callback) {
        // fetch pliku xml adnotacji z lokalnego pliku lub web archive
        if(fs.existsSync(`${__dirname}/annotations/${id}.xml`)) {
            callback(fs.readFileSync(`${__dirname}/annotations/${id}.xml`).toString())
        } else {
            fetch(fullUrl, {
                "headers": {
                    "user-agent": "yt2009 / twt@ybnn670"
                }
            }).then(r => {
                r.text().then(xml => {
                    fs.writeFileSync(`${__dirname}/annotations/${id}.xml`, xml)
                    callback(xml)
                })
            })
        }
    },

    "parse": function(xml) {
        // flashowy czas na sekundy
        function annotationTimeToSeconds(input) {
            let tempTime = input.split(".")[0]
            let tr = utils.time_to_seconds(tempTime)
            tr += parseFloat("0." + input.split(".")[1])

            return tr;
        }
        // ten dziwny format kolorów na rgb
        // zmodyfikowane z https://github.com/luizeldorado/youtube-annotations-viewer/blob/master/index.html
        function colorToRGB(input) {
            input = parseInt(input)

            let r = Math.floor(input / (256*256));
            let g = Math.floor(input / 256) % 256;
            let b = input % 256;
    
            return [r, g, b]
        }


        // xml -> json
        let annotations = []
        let usedAnnotationTimes = []

        xml.split("<annotation ").forEach(annotation => {
            if(annotation.startsWith("<?xml") || annotation.includes(`type="card"`) || annotation.includes(`type="branding"`) || annotation == "") return;
            let style = ""
            if(annotation.split(`style="`).length >= 2) {
                style = annotation.split(`style="`)[1].split(`"`)[0]
            } else {
                style = annotation.split(`type="`)[1].split(`"`)[0]
            }
            let annotationElement = {
                "style": style
            }

            switch(annotationElement.style) {
                // zwykły tekst
                case "popup":
                case "speech":
                case "anchored": {
                    if(annotation.split("<TEXT>").length <= 1) return;
                    let rectRegion = annotation.split("<rectRegion");
                    if(rectRegion.length == 1) {
                        rectRegion = annotation.split("<anchoredRegion")
                    }
                    annotationElement.text = annotation.split("<TEXT>")[1].split("</TEXT>")[0]
                    let fromTime = annotationTimeToSeconds(rectRegion[1].split(`t="`)[1].split(`"`)[0])
                    while(usedAnnotationTimes.includes(fromTime) || fromTime == 0) {
                        fromTime += 0.1
                    }
                    annotationElement.fromTime = fromTime
                    usedAnnotationTimes.push(fromTime)
                    annotationElement.toTime = annotationTimeToSeconds(rectRegion[2].split(`t="`)[1].split(`"`)[0])
                    annotationElement.leftPercent = rectRegion[1].split(` x="`)[1].split(`"`)[0]
                    annotationElement.topPercent = rectRegion[1].split(` y="`)[1].split(`"`)[0]
                    annotationElement.widthPercent = rectRegion[1].split(`w="`)[1].split(`"`)[0]
                    annotationElement.heightPercent = rectRegion[1].split(`h="`)[1].split(`"`)[0]

                    if(annotationElement.style == "speech") {
                        annotationElement.speechPointX = rectRegion[1].split(`sx="`)[1].split(`"`)[0]
                        annotationElement.speechPointY = rectRegion[1].split(`sy="`)[1].split(`"`)[0]
                    }

                    if(annotation.includes("<appearance")) {
                        let appearance = annotation.split("<appearance ")[1]
                        let bgColor = colorToRGB(appearance.split(`bgColor="`)[1].split(`"`)[0])
                        annotationElement.bgOpacity = appearance.split(`bgAlpha="`)[1].split(`"`)[0]
                        let legacyRGBA = `rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, ${annotationElement.bgOpacity})`
                        annotationElement.bgColor = {
                            "modern": "linear-gradient(180deg, rgba(255,255,255," + annotationElement.bgOpacity + ") 0%, " + legacyRGBA + " 20%)",
                            "legacy": legacyRGBA
                        }
                        let fgColor = colorToRGB(appearance.split(`fgColor="`)[1].split(`"`)[0])
                        annotationElement.textColor = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`
                        try {
                            annotationElement.textSize = appearance.split(`textSize="`)[1].split(`"`)[0]
                        }
                        catch(error) {}
                    }

                    if(annotation.includes("<url")) {
                        let url = annotation.split("<url")[1].split(`value="`)[1].split(`"`)[0]
                        annotationElement.targetUrl = url;
                    }
                    break;
                }

                // highlighty (puste klikalne)
                case "highlight": {
                    let rectRegion = annotation.split("<rectRegion");
                    if(rectRegion.length == 1) {
                        rectRegion = annotation.split("<anchoredRegion")
                    }
                    let fromTime = annotationTimeToSeconds(rectRegion[1].split(`t="`)[1].split(`"`)[0])
                    while(usedAnnotationTimes.includes(fromTime) || fromTime == 0) {
                        fromTime += 0.1
                    }
                    annotationElement.fromTime = fromTime
                    usedAnnotationTimes.push(fromTime)
                    annotationElement.toTime = annotationTimeToSeconds(rectRegion[2].split(`t="`)[1].split(`"`)[0])
                    annotationElement.leftPercent = rectRegion[1].split(`x="`)[1].split(`"`)[0]
                    annotationElement.topPercent = rectRegion[1].split(`y="`)[1].split(`"`)[0]
                    annotationElement.widthPercent = rectRegion[1].split(`w="`)[1].split(`"`)[0]
                    annotationElement.heightPercent = rectRegion[1].split(`h="`)[1].split(`"`)[0]
                    annotationElement.id = annotation.split(`id="`)[1].split(`"`)[0]

                    if(annotation.includes("<appearance")) {
                        let appearance = annotation.split("<appearance ")[1]
                        let bgColor = colorToRGB(appearance.split(`bgColor="`)[1].split(`"`)[0])
                        let legacyRGB = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`
                        annotationElement.bgColor = {
                            "modern": "linear-gradient(180deg, rgb(255,255,255) 0%, " + legacyRGB + ")",
                            "legacy": legacyRGB
                        }
                    }
                    if(annotation.includes("<url")) {
                        let url = annotation.split("<url")[1].split(`value="`)[1].split(`"`)[0]
                        annotationElement.targetUrl = url;
                    }
                    break;
                }

                // highlighttext - hookujemy pod znaleziony highlight
                case "highlightText": {
                    if(!annotation.includes(`<condition ref="`)) return;

                    let hookId = annotation.split(`<condition ref="`)[1].split(`"`)[0]
                    annotations.forEach(a => {
                        if(a.style == "highlight" && a.id == hookId && annotation.includes("</TEXT>")) {
                            // append data to that highlight
                            a.text = annotation.split(`<TEXT>`)[1].split(`</TEXT>`)[0]
                            try {
                                a.textSize = annotation.split(`textSize="`)[1].split(`"`)[0]
                            }
                            catch(error) {}

                            if(annotation.includes(`highlightFontColor="`)) {
                                let color = colorToRGB(annotation.split(`highlightFontColor="`)[1].split(`"`))
                                a.textColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                            }
                        }
                    })
                    break;
                }
            }

            if(annotationElement.style !== "highlightText") {
                annotations.push(annotationElement)
            }
        })

        return annotations
    }
}