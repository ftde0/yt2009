const child_process = require("child_process")
const fs = require("fs")
const world = require("./geo/world-chart-data.json")
const config = require("./config.json")

module.exports = {
    "s": function(i) {
        let s = i || "";
        let d = ["&", ";", "`", "'",
                 "|", "*", "?", "~",
                 "\\", "<", ">", "^",
                 "(", ")", "[", "]",
                 "{", "}", "$", "\n",
                 "\r", "~", "#"]
        d.forEach(b => {
            s = s.split(b).join("")
        })
        return s;
    },

    "countBreakup": function(count) {
        count = count.toString();
        count = count.split("")
                .reverse()
                .join("")
                .match(/.{1,3}/g)
                .reverse()
        
        let i = 0;
        count.forEach(c => {
            count[i] = c.split("").reverse().join("")
            i++;
        })

        count = count.join(",")

        return count;
    },

    "gen": function(req, res) {
        // gather data
        let size = [580, 155]
        if(req.query.chs
        && req.query.chs.includes("x")) {
            size = req.query.chs.split("x")
            size[0] = Math.min(parseInt(size[0]), 1000)
            size[1] = Math.min(parseInt(size[1]), 1000)
        }

        let bg = "#FFFFFF"
        if(req.query.chf
        && req.query.chf.includes("bg,s,")) {
            bg = "#" + req.query.chf.split("bg,s,")[1]
                 .substring(0, 6)
                 .replace(/[^a-zA-Z0-9]/g, "").trim()
        }

        let borderColor = "#000000"
        if(req.query.chco) {
            borderColor = "#" + req.query.chco.substring(0, 6)
                          .replace(/[^a-zA-Z0-9]/g, "").trim()
        }

        let scale = 100
        if(req.query.chds) {
            scale = parseFloat(
                req.query.chds.replace("0,", "")
                .replace(/[^0-9+.]/g, "").trim()
            )
        }

        let yText = []
        let xText = []
        if(req.query.chxr) {
            yText = [this.s(req.query.chxr.split("0,0,")[1].split("|")[0])]
        }
        if(req.query.chxr
        && req.query.chxr.includes("|1,0,100")) {
            // scaling for 4
            let max = parseInt(yText[0])
            yText[0] = this.countBreakup(yText[0])
            yText.push(this.countBreakup(Math.floor(max / 2)))
            yText.push(this.countBreakup(Math.floor(max / 3)))
            yText.push(0)
            yText = yText.reverse()
        }
        if(req.query.chxl) {
            let chxl = req.query.chxl
            if(chxl.includes("0:")) {
                yText = chxl.split("0:")[1].split("1:")[0].split("|")
                yText = yText.filter(s => s !== "")
            }
            if(chxl.includes("|1:") || chxl.startsWith("1:")) {
                let m = chxl.startsWith("1:")
                let texts = chxl.split("1:")[1].split("|").filter(s => s !== "")
                if(!m) {
                    texts = chxl.split("|1:")[1].split("|").filter(s => s !== "")
                }
                let positions = []
                if(req.query.chxp) {
                    positions = req.query.chxp
                    if(positions.startsWith("1,")) {
                        positions = positions.replace("1,", "")
                    }
                    positions = positions.split(",")
                    let s = []
                    positions.forEach(p => {
                        s.push(this.s(p))
                    })
                    positions = s;
                } else {
                    positions = [1, 45, 95]
                }

                let i = 0;
                positions.forEach(d => {
                    if(d < 10) {
                        d -= 5
                    }
                    xText.push({
                        "p": d,
                        "t": texts[i]
                    })
                    i++
                })
            }
        }

        // generate command
        let command = [
            `magick -size ${size[0]}x${size[1]} xc:${bg} -fill #333333`,
            `-font Arial -pointsize 10`
        ]

        // place Y text
        let div = yText.length
        let yI = 1;
        let yTextPos = []
        let yTextPosTemp = [0]
        while(yTextPosTemp.length !== div && div > 0) {
            yTextPosTemp.push(100 / (div - 1) * yI)
            yI++
        }
        yTextPosTemp[yTextPosTemp.length - 1] = 95
        yI = 0;
        yText = yText.reverse()
        yTextPosTemp.forEach(d => {
            yTextPos.push({
                "t": yText[yI],
                "p": Math.floor(d)
            })
            yI++
        })

        let sizes = []
        
        let ySize = 0.8 * size[1]
        let yStart = 0.1 * size[1]
        if(div > 0) {
            yTextPos.forEach(d => {
                if(d.t) {
                    d.t = this.s(d.t)
                }
                command.push(
                    `-draw "text 2,${yStart + ((ySize / 100) * d.p)} '${d.t}'"`
                )
                sizes.push(d.t.length)
            })
        }

        sizes = sizes.sort((a, b) => b - a)
        if(sizes.length == 0) {sizes = [0]}

        // place X text
        let xStart = ((sizes[0] / 100) + 0.01) * size[0]
        let xSize = (1 - (sizes[0] / 100) - 0.04) * size[0]
        let xYPlacement = 0.99 * size[1]
        xText.forEach(d => {
            if(d.t) {
                d.t = this.s(d.t)
            }
            command.push(
                `-draw "text ${xStart + ((xSize / 100) * d.p)},${xYPlacement} '${d.t}'"`
            )
        })

        // place chart lines
        let chartXStart = ((sizes[0] / 100) + 0.01) * size[0]
        let chartYStart = 0.04 * size[1]
        let chartXSize = (1 - (sizes[0] / 100)) * size[0]
        let chartYSize = 0.86 * size[1]

        // line percentages
        let lines = [5, 35, 67, 99]
        command.push(`-fill #bbbbbb`)
        lines.forEach(l => {
            let y = chartYStart + ((chartYSize / 100) * l)
            command.push(
                `-draw "line ${chartXStart},${y} ${0.99 * size[0]},${y}"`
            )
        })

        // place chart points
        let points = []
        if(req.query.chd) {
            let t = req.query.chd.replace("t:", "").split(",")
            t.forEach(p => {points.push(parseFloat(p))})
        }

        if(points.length == 0) {
            res.sendStatus(400)
            return;
        }

        command.push(`-stroke ${borderColor} -strokewidth 1.5`)

        // draw chart
        let fillBetween = []
        let captionTexts = []
        let chartColor = ""
        if(req.query.chm) {
            let tempTextP = []
            req.query.chm.split(`;`).join("").split("|").forEach(c => {
                if(c.includes(",0,0,0")) {
                    // main chart color
                    chartColor = `#${this.s(c.split(",0,0,0")[0].split(",")[1])}`
                    command.push(`-fill #${this.s(c.split(",0,0,0")[0].split(",")[1])}`)
                }
                if(c.includes(",0")
                && c.includes(":")) {
                    // fill between places
                    let places = c.split(",0,")[1].split(",0")[0].split(":")
                    let color = this.s(c.split(",0,")[0].split(",")[1])
                    fillBetween.push({
                        "s": places,
                        "c": "#" + color
                    })
                }
                if(c.startsWith("A")
                && c.includes(",0,")) {
                    // caption lines
                    let text = this.s(decodeURIComponent(
                        c.replace("A", "").split(",")[0].split("+").join(" ")
                    ))
                    let textColor = "#" + this.s(c.split(",")[1])
                    let percentage = this.s(c.split(",")[3])
                    let textSize = this.s(c.split(",")[4])
                    captionTexts.push({
                        "t": text,
                        "c": textColor,
                        "p": percentage,
                        "s": textSize
                    })
                    tempTextP.push(percentage)
                }
            })
            tempTextP = tempTextP.sort((a, b) => b - a)
            if(tempTextP[0] < 1 && tempTextP[tempTextP.length - 1] < 1) {
                captionTexts.forEach(c => {
                    c.p = (c.p * 100).toString()
                })
            }
        }

        let polyline = [[chartXStart, chartYStart + chartYSize]]
        let updates = points.length
        let i = 0;
        if(updates < 10 && points[0] < 10) {
            polyline.pop()
        }
        let firstLine = []
        points.forEach(p => {
            if(updates < 10 && points.length - i == 1) {
                i = points.length
            }
            polyline.push([
                (chartXStart + ((chartXSize / updates) * i)).toFixed(2),
                (chartYSize - ((p / scale) * chartYSize) + chartYStart).toFixed(2)
            ].join(","))
            i++
            if(i == 1) {
                firstLine = [
                    (chartXStart).toFixed(2),
                    (chartYSize - ((p / scale) * chartYSize) + chartYStart).toFixed(2)
                ].join(",")
            }
        })
        polyline.push([chartXStart + chartXSize, chartYStart + chartYSize].join(","))

        command.push(
            `-draw "polyline ${polyline.join(" ")}"`
        )

        // fix start stroke line
        if(updates > 10) {
            let c = chartColor.substring(0, 7)
            let start = `${chartXStart},${chartYStart + chartYSize}`
            command.push(
                `-stroke ${c} -draw "line ${start} ${firstLine}"`
            )
        }

        // fill between if needed
        command.push(`-strokewidth 0 -stroke none`)
        if(fillBetween.length > 0) {
            let chartYEnd = chartYStart + chartYSize
            let fbPolylines = []
            fillBetween.forEach(f => {
                command.push(`-fill ${f.c}`)
                let start = parseInt(f.s[0]) + 1
                let iStartPlacement = Math.floor(start / 100 * updates)
                let end = parseInt(f.s[1]) + 1
                let iEndPlacement = Math.floor(end / 100 * updates)
                // polyline start placements
                let fbPolyline = [
                    polyline[iStartPlacement].split(",")[0] + ","
                    + chartYEnd
                ]
                
                fbPolyline.push(polyline[iStartPlacement])
                let polylineLength = iEndPlacement - iStartPlacement
                let i = 0;

                // polyline mid placements
                while(i <= polylineLength) {
                    let tp = polyline[iStartPlacement + i].toString()
                    if(!tp.includes(",")) {
                        i++
                        return;
                    }
                    let polylineX = tp.split(",")[0]
                    let polylineY = parseFloat(tp.split(",")[1]) + 1.5
                    fbPolyline.push(polylineX + "," + polylineY)
                    i++
                }

                // polyline end placement
                fbPolyline.push(
                    polyline[iEndPlacement].split(",")[0] + ","
                    + chartYEnd
                )
                fbPolylines.push(fbPolyline)
            })
            fbPolylines.forEach(p => {
                command.push(
                    `-draw "polyline ${p.join(" ")}"`
                )
            })
        }

        // captions on specific points
        if(captionTexts.length > 0) {
            captionTexts = captionTexts.sort((a, b) => parseInt(a.p) - parseInt(b.p))
            let takenPoints = []
            captionTexts.forEach(c => {
                let approxTextSize = (parseInt(c.s) - 5) * c.t.length + 2
                let textStart = Math.floor(
                    chartXStart + ((chartXSize / 100) * c.p) - (approxTextSize / 2)
                )
                if(textStart < chartXStart) {
                    textStart = chartXStart + 4
                }
                let textEnd = textStart + Math.floor(approxTextSize)
                command.push(`-fill ${c.c}`)
                command.push(`-pointsize ${parseInt(c.s)}`)
                takenPoints.forEach(p => {
                    while(textStart <= p) {
                        textStart += 10
                        textEnd += 10
                    }
                })
                let te = textEnd - 1
                if(approxTextSize < 30) {
                    te += 4
                }

                // caption borders
                command.push(
                    `-draw "fill white stroke black stroke-width 1 roundrectangle ${textStart - 4},${chartYStart + 5} ${te},${chartYStart + 20} 5,5"`
                )
                textEnd += 3
                takenPoints.push(textEnd)
                command.push(
                    `-draw "text ${textStart},${chartYStart + 17} '${c.t}'"`
                )

                // caption lines connecting to chart
                let textCenter = textStart + (approxTextSize / 2)
                let x = chartXStart + ((chartXSize / 100) * c.p)
                let lineYStart = chartYStart + 20
                let tY = Math.floor(c.p / 100 * updates)
                try {
                    polyline[tY].split(",")[1]
                }
                catch(error) {polyline[tY] = polyline[tY].join()}
                let tp = polyline[tY].split(",")[1]
                let lineYEnd = parseInt(tp)
                let lines = []
                if(textCenter == x
                || Math.abs(textCenter - x) <= 3) {
                    lines.push(`${textCenter},${lineYStart} ${x},${lineYEnd}`)
                } else {
                    let diffLine = textCenter - x
                    lines.push(`${textCenter},${lineYStart} ${textCenter},${lineYStart + 7}`)
                    lines.push(`${textCenter},${lineYStart + 7} ${textCenter - diffLine},${lineYStart + 7}`)
                    lines.push(`${textCenter - diffLine},${lineYStart + 7} ${textCenter - diffLine},${lineYEnd}`)
                }
                lines.forEach(l => {
                    // find yStart (yS) and yEnd(yE) to make sure we're not drawing
                    // messy lines
                    let yS = parseFloat(l.split(",")[1].split(" ")[0])
                    let yE = parseFloat(l.split(",")[2])
                    if(yS <= yE) {
                        command.push(
                            `-draw "stroke black stroke-width 0.5 line ${l}"`
                        )
                    }
                })
            })
        }
        

        // generate chart temp file
        let fname = Date.now() + "_cha.png"
        if(!fs.existsSync(`${__dirname}/../assets/charts_temp/`)) {
            fs.mkdirSync(`${__dirname}/../assets/charts_temp/`, {"recursive": true})
        }
        let fullF = `${__dirname}/../assets/charts_temp/${fname}`

        if(config.env == "dev") {
            console.log(command.join(" "))
        }
        command.push(`"${fullF}"`)

        command = command.join(" ").split(";").join("")
        if(process.platform == "linux") {
            command = command.split("#").join("\\#")
        }

        child_process.exec(command, (e, so, se) => {
            if(!e && !se) {
                fs.chmodSync(fullF, 0o755)
                res.setHeader("Content-Type", "image/png")
                res.send(fs.readFileSync(fullF))
            } else {
                res.send(e + " " + se)
            }
            setTimeout(function() {
                try {
                    fs.unlinkSync(fullF)
                }
                catch(error) {}
            }, 3000)
        })
    },

    "genWorld": function(req, res) {
        let command = [
            "magick -size 440x220 xc:white"
        ]

        let chco = []
        if(req.query.chco) {
            req.query.chco.split(",").forEach(c => {
                chco.push("#"
                    + c.substring(0, 6)
                      .replace(/[^a-zA-Z0-9]/g, "")
                      .trim()
                )
            })
        }

        // interpolate chco until 100
        if(chco.length < 100) {
            let elementsCount = Math.floor(100 / chco.length) - 1
            let t = []
            chco.forEach(c => {
                let m = 0;
                while(m !== elementsCount) {
                    t.push(c)
                    m++
                }
            })
            chco = t;

            // repeat last element until 100 if needed
            let last = chco[chco.length - 1]
            while(chco.length < 101) {
                chco.push(last)
            }
        }

        // get used countries & percentages
        let i = 0;
        let countries = {};
        (req.query.chd || "").replace("t:", "").replace("s:", "").split(",").forEach(chd => {
            let c = (req.query.chld || "").substring(i, i + 2)
            countries[this.s(c)] = parseInt(chd)
            i += 2
        })
        
        // generate in image
        for(var c in countries) {
            if(world[c] && chco[countries[c]]) {
                let p = countries[c]
                command.push(
                    `-draw "fill ${chco[p]} ${world[c]}"`
                )
            }
        }

        // generate chart file
        let fname = Date.now() + "_cha.png"
        if(!fs.existsSync(`${__dirname}/../assets/charts_temp/`)) {
            fs.mkdirSync(`${__dirname}/../assets/charts_temp/`, {"recursive": true})
        }
        let fullF = `${__dirname}/../assets/charts_temp/${fname}`
        
        command.push(`-draw "image over 0,0 0,0 '${__dirname.split("\\").join("/")}/../assets/site-assets/world-chart-base.png'"`)
        command.push(`"${fullF}"`)
        if(config.env == "dev") {
            console.log(command.join(" ").split(";").join(""))
        }
        child_process.exec(command.join(" ").split(";").join(""), (e, so, se) => {
            if(!e && !se) {
                fs.chmodSync(fullF, 0o755)
                res.setHeader("Content-Type", "image/png")
                res.send(fs.readFileSync(fullF))
            } else {
                res.send(e + " " + se)
            }
            setTimeout(function() {
                try {
                    fs.unlinkSync(fullF)
                }
                catch(error) {}
            }, 3000)
        })
    }
}