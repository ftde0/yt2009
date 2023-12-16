const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("../yt2009utils")
const html = require("node-html-parser")

module.exports = {
    "write": function(id, data) {
        fs.writeFileSync(`./annotations/${id}.xml`, data)
    },

    "read": function(id, fullUrl, callback) {
        // get locally saved if exists, otherwise get from web archive
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
        // time to seconds
        function annotationTimeToSeconds(input) {
            let tempTime = input.split(".")[0]
            let tr = utils.time_to_seconds(tempTime)
            tr += parseFloat("0." + input.split(".")[1])

            return tr;
        }
        // flash colors -> rgb
        // modified from https://github.com/luizeldorado/youtube-annotations-viewer/blob/master/index.html
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

        xml = html.parse(xml).querySelectorAll("annotation")

        xml.forEach(annotation => {
            let style = annotation.getAttribute("style")
                      || annotation.getAttribute("type")
            let annotationElement = {
                "style": style
            }

            // workarounds for node-html-parser
            let temp = annotation.outerHTML
                       .split("movingRegion").join("rstart")
                       .split("rectRegion").join("rect")
                       .split("anchoredRegion").join("rect")
                       .split(` type="rect"`).join("")
                       .split("<TEXT>").join("<h1>")
                       .split("</TEXT>").join("</h1>")
                       .split("<condition").join("<h2")
                       .split("</condition").join("</h2")
                       .split("<duration").join("<h3")
                       .split("</duration").join("</h3")
            annotation = html.parse(temp)

            function commonDataFill() {
                let rectRegion = annotation.querySelectorAll("rect")
                let fromTime = annotationTimeToSeconds(
                    rectRegion[0].getAttribute("t")
                )
                while(usedAnnotationTimes.includes(fromTime) || fromTime == 0) {
                    fromTime += 0.1
                }
                annotationElement.fromTime = parseFloat(fromTime.toFixed(1))
                usedAnnotationTimes.push(parseFloat(fromTime.toFixed(1)))
                annotationElement.toTime = parseFloat(annotationTimeToSeconds(
                    rectRegion[1].getAttribute("t")
                ).toFixed(1))
                annotationElement.leftPercent = rectRegion[0].getAttribute("x")
                annotationElement.topPercent = rectRegion[0].getAttribute("y")
                annotationElement.widthPercent = rectRegion[0].getAttribute("w")
                annotationElement.heightPercent = rectRegion[0].getAttribute("h")
                return rectRegion;
            }

            switch(annotationElement.style) {
                // text annotation
                case "popup":
                case "speech":
                case "anchored": {
                    if(!annotation.querySelector("h1")) return;
                    let rectRegion = commonDataFill()

                    annotationElement.text = annotation.querySelector("h1").innerHTML

                    if(annotationElement.style == "speech") {
                        annotationElement.speechPointX = rectRegion[1].getAttribute("sx")
                        annotationElement.speechPointY = rectRegion[1].getAttribute("sy")
                    }

                    if(annotation.querySelector("appearance")) {
                        let appearance = annotation.querySelector("appearance")
                        let bgColor = colorToRGB(appearance.getAttribute("bgColor"))
                        annotationElement.bgOpacity = appearance.getAttribute("bgAlpha")
                        let legacyRGBA = `rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]}, ${annotationElement.bgOpacity})`
                        let dominatingColor = Math.max(bgColor[0], bgColor[1], bgColor[2])
                        let colorId = bgColor.indexOf(dominatingColor)
                        bgColor[colorId] -= 50
                        let gradient = `${bgColor[0] + 110}, ${bgColor[1] + 110}, ${bgColor[2] + 110}`
                        if(annotationElement.style == "speech") {
                            annotationElement.bgColor = {
                                "modern": "linear-gradient(180deg, rgba(" + gradient + "," + annotationElement.bgOpacity + ") 0%, " + legacyRGBA + " 30%)",
                                "legacy": legacyRGBA
                            }
                        } else {
                            annotationElement.bgColor = {
                                "modern": legacyRGBA,
                                "legacy": legacyRGBA
                            }
                        }
                        let fgColor = colorToRGB(appearance.getAttribute("fgColor"))
                        annotationElement.textColor = `rgb(${fgColor[0]}, ${fgColor[1]}, ${fgColor[2]})`
                        try {
                            annotationElement.textSize = appearance.getAttribute("textSize")
                        }
                        catch(error) {}
                    }

                    if(annotation.querySelector("url")) {
                        let url = annotation.querySelector("url").getAttribute("value")
                        annotationElement.targetUrl = url;
                        if(annotationElement.bgOpacity) {
                            let h = (
                                parseFloat(annotationElement.bgOpacity) + 0.1
                            ).toFixed(1)
                            annotationElement.hoverOpacity = h
                        }
                    }
                    break;
                }

                // highlights (empty clickables)
                case "highlight": {
                    commonDataFill()
                    annotationElement.id = annotation.outerHTML
                                           .split(`id="`)[1].split(`"`)[0]

                    if(annotation.querySelector("appearance")) {
                        let appearance = annotation.querySelector("appearance")
                        let bgColor = colorToRGB(appearance.getAttribute("bgColor"))
                        let rgb = `rgba(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`
                        annotationElement.border = rgb;
                        if(appearance.getAttribute("highlightWidth")) {
                            let hw = appearance.getAttribute("highlightWidth")
                            annotationElement.borderWidth = hw;
                        }
                        if(appearance.getAttribute("borderAlpha")) {
                            let a = appearance.getAttribute("borderAlpha")
                            let hoverBorder = rgb.replace(")", ", 1)")
                            rgb = rgb.replace(")", ", " + a + ")")
                            annotationElement.border = rgb;
                            annotationElement.borderHover = hoverBorder
                        }
                    }
                    if(annotation.querySelector("url")) {
                        let url = annotation.querySelector("url").getAttribute("value")
                        annotationElement.targetUrl = url;
                    }
                    break;
                }

                // highlighttext - hookujemy pod znaleziony highlight
                case "highlightText": {
                    if(!annotation.querySelector("h2")) return;

                    let hookId = annotation
                                .querySelector("h2")
                                .getAttribute("ref")
                    annotations.forEach(a => {
                        if(a.style == "highlight"
                        && a.id == hookId
                        && annotation.querySelector("h1")) {
                            // append data to that highlight
                            a.text = annotation.querySelector("h1").innerHTML
                            if(annotation.querySelector("appearance")) {
                                let ap = annotation.querySelector("appearance")

                                ap.getAttribute("textSize") ?
                                a.textSize = ap.getAttribute("textSize") : ""

                                if(ap.getAttribute(`highlightFontColor`)) {
                                    let color = colorToRGB(
                                        ap.getAttribute(`highlightFontColor`)
                                    )
                                    a.textColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                                }
                            }

                            
                        }
                    })
                    break;
                }

                // pause - pauses the video for x time
                case "pause": {
                    let fromTime = annotationTimeToSeconds(
                        annotation.querySelector("rect").getAttribute("t")
                    )
                    while(usedAnnotationTimes.includes(fromTime) || fromTime == 0) {
                        fromTime += 0.1
                    }
                    annotationElement.fromTime = fromTime
                    usedAnnotationTimes.push(parseFloat(fromTime.toFixed(1)))
                    let duration = annotationTimeToSeconds(
                        annotation.querySelector("h3").getAttribute("value")
                    )
                    annotationElement.toTime = fromTime + duration
                    annotationElement.pauseTime = duration
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