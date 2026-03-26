const yt2009templates = require("./yt2009templates")
const yt2009mobilehelper = require("./yt2009mobilehelper")
const yt2009trustedcontext = require("./yt2009trustedcontext")
const creatorRequestParts = require("./proto/creator_request_pb")
const params = require("./proto/android_creator_params_pb")
const countryCodes = require("./geo/country-codes.json")
const utils = require("./yt2009utils")
const languages = require("./language_data/language_engine")

module.exports = {
    "set": function(app) {
        app.get("/insight_custom_request", (req, res) => {
            yt2009mobilehelper.openInsightRequest(req, "browse", {
                "browseId": req.query.browse_id,
                "params": req.query.params
            }, (data => {
                res.send(data)
            }), true, req.query.timely_chip)
        })
        function formatDate(unix) {
            let z = new Date(unix)
            return `${z.getMonth() + 1}/${z.getDate()}/${z.getFullYear().toString().substring(2)}`
        }
        let userCachedViewCharts = {}
        let userCachedCommentCharts = {}
        let userCachedVideoData = {}
        let chartUserTokens = {}
        function createUserToken(id) {
            let rc = ""
            let c = "qwertyuiopasdfghjklzxcvbnm".split("")
            while(rc.length !== 16) {
                rc += c[Math.floor(Math.random() * 26)]
            }
            chartUserTokens[rc] = id;
            return rc;
        }
        function downscaleArray(a, targetLength, scaleResults) {
            while(a.length >= targetLength) {
                let i = -1;
                let b = JSON.parse(JSON.stringify(a))
                a.forEach(s => {
                    i++
                    if((i % 2) == 0) {
                        b[i] += b[i + 1]
                        b[i + 1] = null
                    }
                })
                b = b.filter(s => {
                    return !!(s !== null);
                })
                a = b;
            }
            if(typeof(scaleResults) == "number") {
                a = a.map(s => {
                    s *= scaleResults;
                    return s;
                })
            }
            return a;
        }
        function renderData(d, req) {
            let topViews = 100;
            let chartWidth = 330
            if(d.viewType == "VIEWS") {
                chartWidth = 351
            }
            let viewPoints = []
            let chartUrl = [
                `/chart?cht=lc:nda&chs=${chartWidth}x170&chco=647b5c&chgr=1`
            ]
            let topContentHTML = ""
            let dayCount = 0;
            let viewsTabChartUrls = {
                "bottomPreview": false,
                "highQualityUrls": [],
                "reqDayCount": 0
            }
            if(d.viewsChart && d.viewsChart.x && d.viewsChart.y) {
                topViews = Math.floor(
                    JSON.parse(JSON.stringify(d.viewsChart.y)).sort((a,b) => {
                        return b - a
                    })[0] * 1.3
                )

                // downscale to x points
                d.viewsChart.y = downscaleArray(d.viewsChart.y, 100)

                viewPoints = d.viewsChart.y.map(s => {
                    return ((s / topViews) * 100)
                })

                let topViewPoint = JSON.parse(JSON.stringify(viewPoints))
                                       .sort((a,b) => {return b - a})[0]
                if(topViewPoint >= 80) {
                    // scaling gone off rails
                    let scale = topViewPoint / 80
                    viewPoints = viewPoints.map(s => {
                        return s / scale;
                    })
                }

                viewPoints = viewPoints.map(s => {
                    return s.toFixed(1)
                })

                let startDate = formatDate(d.viewsChart.x[0])
                let endDate = formatDate(Date.now())
                dayCount = (Date.now() - d.viewsChart.x[0])
                         / 1000 / 60 / 60 / 24;
                dayCount = Math.floor(dayCount)
                viewsTabChartUrls.reqDayCount = dayCount;
                if(d.viewType !== "VIEWS") {
                    chartUrl.push(
                        `&chxl=1:|${startDate}|${endDate}&chxp=1,5,95`
                    )
                }
                
                chartUrl.push(`&chxr=0,0,${topViews}|1,0,100`)
                chartUrl.push(`&chd=${viewPoints.join(",")}`)
                chartUrl.push(`&chm=B,b6cfadaa,0,0,0`)
            }
            if(d.fullViewsChart && d.fullViewsChart.x && d.fullViewsChart.y) {
                topViews = Math.floor(
                    JSON.parse(JSON.stringify(d.fullViewsChart.y)).sort((a,b) => {
                        return b - a
                    })[0] * 1.3
                )

                // downscale to x points
                let downscales = [
                    downscaleArray(d.fullViewsChart.y, 300),
                    downscaleArray(d.fullViewsChart.y, 200),
                    downscaleArray(d.fullViewsChart.y, 100)
                ]

                downscales = downscales.map(s => {
                    s = s.map(z => {
                        return ((z / topViews) * 100)
                    })
                    return s;
                })

                let topViewPoint = JSON.parse(JSON.stringify(downscales[0]))
                                       .sort((a,b) => {return b - a})[0]
                if(topViewPoint >= 80) {
                    // scaling gone off rails
                    let scale = topViewPoint / 80
                    downscales = downscales.map(s => {
                        s = s.map(z => {
                            return z / scale;
                        })
                        return s;
                    })
                }

                downscales = downscales.map(s => {
                    s = s.map(z => {
                        return z.toFixed(1)
                    })
                    return s;
                })

                let startDate = formatDate(d.fullViewsChart.x[0])
                let endDate = formatDate(Date.now())
                dayCount = (Date.now() - d.fullViewsChart.x[0])
                         / 1000 / 60 / 60 / 24;
                dayCount = Math.floor(dayCount)

                let previewChartUrl = [
                    `/chart?cht=lc:nda&chs=351x45&chco=3971af`,
                    `&chxl=1:|${startDate}|${endDate}&chxp=1,5,93`,
                    `&chd=${downscales[downscales.length - 1].join(",")}`,
                    `&chm=B,e9f4fd,0,0,0`
                ].join("")
                let previewChartUrlInactive = [
                    `/chart?cht=lc:nda&chs=351x45&chco=d3d3d3`,
                    `&chxl=1:|${startDate}|${endDate}&chxp=1,5,93`,
                    `&chd=${downscales[downscales.length - 1].join(",")}`,
                    `&chm=B,fcfcfc,0,0,0`
                ].join("")
                viewsTabChartUrls.bottomPreview = previewChartUrl
                viewsTabChartUrls.bottomPreviewInactivePart = previewChartUrlInactive

                downscales.forEach(downscale => {
                    let scaledChartUrl = [
                        `/chart?cht=lc:nda&chs=1000x170&chco=647b5c&chgr=1`,
                        `&chxl=1:|${startDate}|${endDate}&chxp=1,5,95`,
                        `&chxr=0,0,${topViews}|1,0,100`,
                        `&chd=${downscale.join(",")}`,
                        `&chm=B,b6cfadaa,0,0,0`
                    ].join("")
                    viewsTabChartUrls.highQualityUrls.push(scaledChartUrl)
                })
            }

            function renderTopTable(source) {
                let html = ""
                let i = 0;
                source.forEach(v => {
                    let title = utils.xss(v.label)
                    let titleHTML = `${title}`
                    let id = ""
                    if(v.thumbnailDetails) {
                        if(title.length >= 27
                        && d.viewType !== "VIEWS") {
                            title = title.substring(0,27) + "..."
                        }
                        id = v.thumbnailDetails.thumbnails[0].url
                              .split("/vi/")[1].split("/")[0]
                              .substring(0,11)
                    }
                    if(!v.barRatio) {
                        v.barRatio = 0
                    }
                    let filled = Math.floor(v.barRatio * 100)
                    let barWidth = 65;
                    switch(d.viewType) {
                        case "VIEWS":
                        case "VDISCOVERY": {
                            barWidth = 300;
                            break;
                        }
                    }
                    let imgUrl = `/chart?cht=intf&w=${barWidth}&p=${filled}`
                    html += yt2009templates.insightTableVideo(
                        i, id, title, (v.barRatio * 100).toFixed(1), imgUrl
                    )
                    i++
                })
                return html;
            }

            if(d.topContent && d.topContent[0]) {
                topContentHTML = renderTopTable(d.topContent)
            }

            function createChart(
                source, width, height, color1, color2
            ) {
                source = JSON.parse(JSON.stringify(source))
                let chartUrl = [
                    `/chart?cht=lc:nda&chs=${width}x${height}&chco=${color1}`
                ]
                if(height >= 100) {
                    chartUrl.push("&chgr=1")
                }
                let topCount = Math.floor(
                    JSON.parse(JSON.stringify(source.y)).sort((a,b) => {
                        return b - a
                    })[0] * 1.3
                )

                // downscale to x points
                source.y = downscaleArray(source.y, 200)

                let points = source.y.map(s => {
                    return ((s / topCount) * 100)
                })
                let topPoint = JSON.parse(JSON.stringify(points))
                                   .sort((a,b) => {return b - a})[0]

                if(topPoint >= 80) {
                    // scaling gone off rails
                    let scale = topPoint / 80
                    points = points.map(s => {
                        return s / scale;
                    })
                }
                points = points.map(s => {
                    return s.toFixed(1)
                })

                let startDate = formatDate(source.x[0])
                let endDate = formatDate(Date.now())
                if(height <= 100) {
                    chartUrl.push(
                        `&chxl=1:|${startDate}|${endDate}&chxp=1,5,93`
                    )
                }

                let useChartAutoScale = true;
                if(d.visualConvertToHours) {
                    useChartAutoScale = false;
                    let times = [
                        "0:00",
                        utils.seconds_to_time((topCount / 1000) / 3),
                        utils.seconds_to_time(((topCount / 1000) / 3 * 2)),
                        utils.seconds_to_time((topCount / 1000))
                    ]
                    topCount = times.join(",")
                }
                
                if(height >= 100) {
                    chartUrl.push(`&chxr=0,0,${topCount}`)
                    if(useChartAutoScale) {
                        chartUrl.push(`|1,0,100`)
                    }
                }
                chartUrl.push(`&chd=${points.join(",")}`)
                chartUrl.push(`&chm=B,${color2},0,0,0`)
                return chartUrl.join("")
            }
            let commentedChartUrl = ""
            let commentedFullChartUrl = ""
            if(d.commentChart) {
                commentedChartUrl = createChart(
                    d.commentChart, 351, 170, "647b5c", "b6cfadaa"
                )
            }
            let commentDayCount = 0;
            if(d.commentChartWhole) {
                commentDayCount = d.commentChartWhole.x.length
                commentedFullChartUrl = {
                    "inactive": createChart(
                        d.commentChartWhole, 351, 45, "d3d3d3", "fcfcfc"
                    ),
                    "active": createChart(
                        d.commentChartWhole, 351, 45, "3971af", "e9f4fd"
                    )
                }
            }
            let topCommentContent = []
            let topCommentContentHTML = ""
            if(d.topCommented) {
                let fullCommentCount = 0;
                d.topCommented.forEach(v => {
                    try {
                        let count = parseInt(v.textMetric.metricValue)
                        if(!isNaN(count)) {
                            fullCommentCount += count;
                        }
                    }
                    catch(error){}
                })
                d.topCommented.forEach(v => {
                    let title = v.dimensionValue
                    let percentOfWhole = 0;
                    try {
                        percentOfWhole = (
                            parseInt(v.textMetric.metricValue) / fullCommentCount
                        ) * 100
                        percentOfWhole = percentOfWhole.toFixed(1)
                    }
                    catch(error){}
                    if(isNaN(percentOfWhole)) {
                        percentOfWhole = "0.0";
                    }
                    let id = v.thumbnailDetails.thumbnails[0].url
                              .split("/vi/")[1].split("/")[0]
                              .substring(0,11)
                    topCommentContent.push({
                        "id": id,
                        "title": title,
                        "percent": percentOfWhole
                    })
                })
            }
            let tci = 0;
            topCommentContent.slice(0,10).forEach(v => {
                let title = utils.xss(v.title)
                if(title.length >= 27) {
                    title = title.substring(0,27) + "..."
                }
                let filled = Math.floor(v.percent)
                let imgUrl = `/chart?cht=intf&w=65&p=${filled}`
                topCommentContentHTML += yt2009templates.insightTableVideo(
                    tci, v.id, v.title, v.percent, imgUrl
                )
                tci++
            })

            if(d.videoAgeDemographic) {
                d.genderData = d.videoGenderDemographic;
            }
            if(d.videoGenderDemographic) {
                d.viewerAge = d.videoAgeDemographic;
            }

            let genders = [
                {"label": "Male", "barRatio": 0},
                {"label": "Female", "barRatio": 0}
            ]
            if(d.genderData && d.genderData.rows) {
                genders = d.genderData.rows
            }
            let genderChart = [
                "/chart?cht=bhs&chco=008500&chpct=1&chbtm=1&chs=330x100"
            ]
            let genChartDataStr = []
            let genChartLabelsStr = []
            genders.forEach(a => {
                genChartLabelsStr.push(a.label)
                genChartDataStr.push(a.barRatio * 100)
            })
            genderChart.push("&chxl=1:|" + genChartLabelsStr.join("|"))
            genderChart.push("&chd=t:" + genChartDataStr.join(","))
            genderChart = genderChart.join("")

            let viewerAge = [
                {"label": "13-17", "barRatio": 0},
                {"label": "18-24", "barRatio": 0},
                {"label": "25-34", "barRatio": 0},
                {"label": "35-44", "barRatio": 0},
                {"label": "45-54", "barRatio": 0},
                {"label": "55-64", "barRatio": 0},
                {"label": "65-", "barRatio": 0}
            ]
            if(d.viewerAge && d.viewerAge.rows) {
                viewerAge = d.viewerAge.rows.map(s => {
                    s.label = s.label.replace("+", "-")
							   .split(" ")[0]
							   .split("–").join("-")
                    s.barRatio *= 100
                    return s;
                })
            }
            let viewerChart = [
                "/chart?cht=bhs&chco=006800&chpct=1&chbtm=1&chs=330x185"
            ]
            let viewChartDataStr = []
            let viewChartLabelStr = []
            viewerAge.forEach(v => {
                viewChartLabelStr.push(v.label)
                viewChartDataStr.push(v.barRatio)
            })
            viewerChart.push("&chxl=1:|" + viewChartLabelStr.join("|"))
            viewerChart.push("&chd=t:" + viewChartDataStr.join(","))
            viewerChart = viewerChart.join("")

            let mapUrl = ""
            function createCountryChart(source) {
                if(!source || !source.rows) {
                    return [
                        "/chart?cht=t&chtm=world&chd=t:&chf=bg,s,eff8fe",
                        "&chco=f6f6f6,e5e9c9,ced9ab,a7ba7b,86a058,8ba65b,547136,32501a",
                        "&chld=&cbg=e5e9c9"
                    ].join("");
                }
                let countries = []
                countries = source.rows;
                countries = countries.map(c => {
                    c.barRatio *= 100
                    return c;
                })

                let scaleUp = false;

                let topPercentage = JSON.parse(JSON.stringify(countries))
                .filter(s => {
                    return s && s.barRatio !== null && s.barRatio !== undefined
                }).sort((a,b) => {
                    return b.barRatio - a.barRatio
                })[0].barRatio
                if(topPercentage <= 50) {
                    scaleUp = 50 / topPercentage
                }
                if(scaleUp) {
                    countries = countries.map(c => {
                        if(c.barRatio < 1) {
                            c.barRatio *= 10
                        }
                        c.barRatio *= scaleUp
                        c.barRatio = Math.floor(c.barRatio)
                        if(c.barRatio >= 70) {
                            c.barRatio = 70
                        }
                        return c;
                    })
                }
                let chartCountryData = []
                let chartCountryCodes = []
                if(countries.forEach) {
                    countries.forEach(studioEntry => {
                        if(studioEntry) {
                            chartCountryData.push(studioEntry.barRatio + 20)
                            chartCountryCodes.push(
                                countryCodes[studioEntry.label]
                            )
                        }
                    })
                } else {
                    for(let c in countries) {
                        let studioEntry = countries.filter(s => {
                            return s && s.label == c
                        })[0]
                        if(studioEntry) {
                            chartCountryData.push(studioEntry.barRatio + 20)
                            chartCountryCodes.push(countryCodes[c])
                        }
                    }
                }
                let mapUrl = [
                    "/chart?cht=t&chtm=world",
                    "&chd=t:" + chartCountryData.join(),
                    "&chf=bg,s,eff8fe",
                    "&chco=f6f6f6,e5e9c9,ced9ab,a7ba7b,86a058,8ba65b,547136,32501a",
                    "&chld=" + chartCountryCodes.join(""),
                    "&cbg=e5e9c9"
                ].join("")
                return mapUrl;
            }
            if(d.viewerRegion && d.viewerRegion.rows) {
                mapUrl = createCountryChart(d.viewerRegion)
            } else if(d.viewerRegion) {
                mapUrl = createCountryChart()
            }

            let creatorVideosQueryHTML = ``
            if(d.creatorVideosQuery) {
                let i = 0;
                d.creatorVideosQuery.forEach(v => {
                    let id = v.videoId;
                    if(v.title.length >= 68) {
                        v.title = v.title.substring(0,68) + "..."
                    }
                    let title = utils.xss(v.title)
                    let publishDate = utils.dateFormat(
                        parseInt(v.timeCreatedSeconds) * 1000
                    )
                    let views = v.views
                    let thumbnail = utils.getThumbUrl(id, req)
                    if(v.privacy == "VIDEO_PRIVACY_PRIVATE") {
                        // yt2009 thumb url won't work here
                        try {
                            thumbnail = v.thumbnailDetails.thumbnails[0].url
                        }
                        catch(error){}
                    }
                    creatorVideosQueryHTML += yt2009templates.insightSearchVideo(
                        i, id, thumbnail, title, publishDate, views
                    )
                    i++
                })
            }

            let videoMetadataHTML = ""
            if(d.videoMetadata) {
                let v = d.videoMetadata
                let id = v.videoId;
                if(v.title.length >= 68) {
                    v.title = v.title.substring(0,68) + "..."
                }
                let title = utils.xss(v.title)
                let publishDate = utils.dateFormat(
                    parseInt(v.timeCreatedSeconds) * 1000
                )
                let thumbnail = utils.getThumbUrl(id, req)
                if(v.privacy == "VIDEO_PRIVACY_PRIVATE") {
                    // yt2009 thumb url won't work here
                    try {
                        thumbnail = v.thumbnailDetails.thumbnails[0].url
                    }
                    catch(error){}
                }
                videoMetadataHTML += yt2009templates.insightPervideoHeadings(
                    thumbnail, title, publishDate, v.views
                )
            }

            if(d.videoViewChartLifetime) {
                dayCount = d.videoViewChartLifetime.x.length
            }
            let videoViewChart = ""
            let videoViewChartFull = {}
            if(d.videoViewChart && d.videoViewChartLifetime) {
                videoViewChart = createChart(
                    d.videoViewChart, 351, 170, "647b5c", "b6cfadaa"
                )
                videoViewChartFull.inactive = createChart(
                    d.videoViewChartLifetime, 351, 45, "d3d3d3", "fcfcfc"
                )
                videoViewChartFull.active = createChart(
                    d.videoViewChartLifetime, 351, 45, "3971af", "e9f4fd"
                )
            }
            if(d.videoGeography) {
                mapUrl = createCountryChart(d.videoGeography)
            }
            let viewDurationChart = ""
            let viewDurationChartFull = {}
            if(d.viewDurationChart) {
                viewDurationChart = createChart(
                    d.viewDurationChart, 351, 170, "647b5c", "b6cfadaa"
                )
                viewDurationChartFull.inactive = createChart(
                    d.viewDurationChartLifetime, 351, 45, "d3d3d3", "fcfcfc"
                )
                viewDurationChartFull.active = createChart(
                    d.viewDurationChartLifetime, 351, 45, "3971af", "e9f4fd"
                )
                dayCount = d.viewDurationChartLifetime.x.length
            }

            let videoDeviceType = ""
            if(d.videoDeviceType && d.videoDeviceType.rows) {
                videoDeviceType = renderTopTable(d.videoDeviceType.rows)
            }
            

            let videoSourcesHTML = ""
            if(d.videoSources && d.videoSources[0]) {
                videoSourcesHTML = renderTopTable(d.videoSources)
            }

            let retentionChartUrl = false;
            let videoEmbed = ""
            if(d.retentionChart && d.retentionChart.y) {
                //320x270
                let points = JSON.parse(JSON.stringify(d.retentionChart.y))
                let topPoint = JSON.parse(JSON.stringify(points)).sort((a,b) => {
                    return b - a;
                })[0] + 5
                points = points.map(s => {
                    if(s && s.toFixed) {
                        return s.toFixed(1)
                    }
                    return s;
                })
                retentionChartUrl = [
                    `/chart?cht=lc:nda&chs=320x270&chco=647b5c&int_opt=1`,
                    `&chds=${topPoint}&chm=B,ffffff00,0,0,0&chtr=1`,
                    `&chd=${points.join(",")}`
                ].join("")

                let isFmode = false;
                let isFh264 = false;
                try {
                    isFmode = req.headers.cookie.includes("f_mode=on")
                    isFh264 = req.headers.cookie.includes("f_h264=on")
                }
                catch(error) {}
                if(isFmode) {
                    let videoId = req.query.video_id.substring(0,11)
                    if(isFh264) {
                        videoId += "/mp4"
                    }
                    let flashUrl = [
                        "/watch.swf?video_id=" + videoId,
                        yt2009trustedcontext.urlShortContext(
                            videoId.substring(0,11)
                        ),
                        "&t=with_pchelper-1"
                    ].join("")
                    videoEmbed = yt2009templates.flashObject(flashUrl, 320, 280)
                } else {
                    let videoId = req.query.video_id.substring(0,11)
                    let url = `/embed/${videoId}?no_controls_fade=1&with_pchelper=1`
                    videoEmbed = `
                    <iframe src="${url}" width="320" height="280"></iframe>`
                }
            }

            let html = `<table><tbody>`
            switch(d.viewType) {
                case "VIEWS": {
                    html += yt2009templates.insightViews(
                        dayCount, viewsTabChartUrls, d, mapUrl, topContentHTML
                    )
                    break;
                }
                case "DEMOGRAPHICS":
                case "VDEMOGRAPHICS": {
                    let largeGenderChart = genderChart.replace(
                        "330x100", "350x205"
                    )
                    let largeAgeChart = viewerChart.replace(
                        "330x185", "350x205"
                    )
                    html += yt2009templates.insightDemographics(
                        largeAgeChart, largeGenderChart
                    )
                    break;
                }
                case "COMMUNITY": {
                    html += yt2009templates.insightCommunityEngagement(
                        commentDayCount, commentedChartUrl, d,
                        commentedFullChartUrl, topCommentContentHTML
                    )
                    break;
                }
                case "SEARCH": {
                    html += yt2009templates.insightSearch(
                        creatorVideosQueryHTML
                    )
                    break;
                }
                case "VVIEWS": {
                    html += yt2009templates.insightVideoViews(
                        dayCount, videoViewChart, d, videoViewChartFull, mapUrl
                    )
                    break;
                }
                case "VDISCOVERY": {
                    html += yt2009templates.insightVideoDiscovery(
                        videoSourcesHTML
                    )
                    break;
                }
                case "VCOMMUNITY": {
                    html += yt2009templates.insightVideoCommunity(
                        dayCount, viewDurationChart, d,
                        viewDurationChartFull, videoDeviceType
                    )
                    break;
                }
                case "VHOTSPOTS": {
                    html += yt2009templates.insightVideoHotspots(
                        retentionChartUrl, videoEmbed
                    )
                    break;
                }
                case "SUMMARY":
                default: {
                    if(videoMetadataHTML) {
                        html += videoMetadataHTML
                        break;
                    }
                    html += yt2009templates.insightSummary(
                        chartUrl, topContentHTML, genderChart,
                        viewerChart, mapUrl
                    )
                    break;
                }
            }
            html += `</tbody></table>`
            return html;
        }
        app.get("/insight_amogus", (req, res) => {
            if(!utils.isAuthorized(req)) {
                res.sendStatus(401)
                return;
            }
            yt2009mobilehelper.openBrowseId(req, (id) => {
                if(!id && req.query.format == "json") {
                    res.send({})
                    return;
                } else if(!id) {
                    res.send(languages.apply_lang_to_code(
                        `lang_insight_signin_prompt`, req
                    ))
                    return;
                }

                let timeId = 7;
                if(req.query.time_id && !isNaN(parseInt(req.query.time_id))) {
                    timeId = parseInt(req.query.time_id)
                }

                let chip = new creatorRequestParts.chipRender.contents()
                chip.setRelcurrenttime(Math.floor(Date.now() / 1000))
                chip.setTimeid(timeId)
                let chiprun = new creatorRequestParts.chipRender.run()
                if(req.query.video_id) {
                    chiprun.setVideoid(req.query.video_id)
                } else {
                    chiprun.setChannelid(id)
                }
                chip.setChannelid(chiprun)

                let fetchesRequired = 4;
                let fetchesDone = 0;
                let doFetches = ["viewsContent", "genders", "age", "region"]
                let returnData = {
                    "viewType": req.query.tab || "SUMMARY"
                }
                if(req.query.video_id && req.query.no_initial_data == 1) {
                    fetchesRequired = 1;
                    doFetches = ["videoMetadata"]
                }
                switch(req.query.tab) {
                    case "DEMOGRAPHICS": {
                        fetchesRequired = 2;
                        doFetches = ["genders", "age"]
                        break;
                    }
                    case "COMMUNITY": {
                        fetchesRequired = 1;
                        doFetches = ["commentEngagement"]
                        break;
                    }
                    case "SEARCH": {
                        fetchesRequired = 1;
                        doFetches = ["studioSearch"]
                        break;
                    }
                    case "VVIEWS": {
                        fetchesRequired = 2;
                        doFetches = ["videoViewsChart", "videoGeography"]
                        break;
                    }
                    case "VDISCOVERY": {
                        fetchesRequired = 1;
                        doFetches = ["videoSources"]
                        break;
                    }
                    case "VDEMOGRAPHICS": {
                        fetchesRequired = 1;
                        doFetches = ["videoDemographics"]
                        break;
                    }
                    case "VCOMMUNITY": {
                        fetchesRequired = 2;
                        doFetches = ["videoAvgViewtime", "videoDeviceType"]
                        break;
                    }
                    case "VHOTSPOTS": {
                        fetchesRequired = 1;
                        doFetches = ["videoRetention"]
                        break;
                    }
                }

                if(req.query.tab == "VIEWS") {
                    // override fetch all-time view chart for scrolling
                    fetchesRequired++
                    let chip = new creatorRequestParts.chipRender.contents()
                    chip.setRelcurrenttime(Math.floor(Date.now() / 1000))
                    chip.setTimeid(1)
                    let chiprun = new creatorRequestParts.chipRender.run()
                    chiprun.setChannelid(id)
                    chip.setChannelid(chiprun)
                    let viewsAndTopContentParam = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    let content = new params.extendedTabRequest
                                            .extendedContent()

                    content.setUsechip(chip)
                    content.addReturndataoption("CAFCAEgAmAIB")
                    content.addReturndataoption("CAEqBSIDCIgFmAIB")
                    content.addReturndataoption("CAEyCggAEAAYASgPagCYAgE")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setChannelid(id)
                    viewsAndTopContentParam.setRequest(requestContainer)
                    let param = utils.base64toUrl(Buffer.from(
                        viewsAndTopContentParam.serializeBinary()
                    ).toString("base64"))
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        let viewsChart = false;
                        if(data.forEach) {
                            data.forEach(d => {
                                if(d.analyticsMetricChartDetailScreenData) {
                                    d = d.analyticsMetricChartDetailScreenData
                                    viewsChart = d.seriesConfiguration
                                                .lineSeries.linesData[0]
                                    userCachedViewCharts[id] = viewsChart
                                    returnData.userToken = createUserToken(id)
                                }
                            })
                        }
                        returnData.fullViewsChart = viewsChart;
                        markDone()
                    }))
                }

                function markDone() {
                    fetchesDone++
                    if(fetchesDone >= fetchesRequired) {
                        if(req.query.format && req.query.format == "json") {
                            res.send(returnData)
                        } else {
                            res.send(languages.apply_lang_to_code(
                                renderData(returnData, req), req
                            ))
                        }
                    }
                }

                function createCustomTabidRequest(label) {
                    let tabid = new params.extendedTabRequest.tabIdentifier()
                    let tabrun = new params.extendedTabRequest
                                           .tabIdentifier
                                           .tabIdRun();
                    tabrun.setId(label)
                    tabid.setRun(tabrun)
                    return tabid;
                }
                
                function getTheCards(data) {
                    try {
                        data = data.contents
                               .singleColumnBrowseResultsRenderer
                               .tabs[0].tabRenderer.content
                               .sectionListRenderer.contents[0]
                               .analyticsCardSectionRenderer
                               .contents[0].analyticsItemRenderer
                               .content.elementRenderer
                               .newElement.type.componentType
                               .model.analyticsCardsSectionModel
                               .sections[0].cards
                    }
                    catch(error){
                        console.log(error)
                    }
                    return data;
                }
                
                // standard requests
                function doViewsContentRequest() {
                    let viewsAndTopContentParam = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    let content = new params.extendedTabRequest
                                            .extendedContent()

                    content.setUsechip(chip)
                    content.addReturndataoption("CAFCAEgAmAIB")
                    content.addReturndataoption("CAEqBSIDCIgFmAIB")
                    content.addReturndataoption("CAEyCggAEAAYASgPagCYAgE")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setChannelid(id)
                    viewsAndTopContentParam.setRequest(requestContainer)

                    let param = utils.base64toUrl(Buffer.from(
                        viewsAndTopContentParam.serializeBinary()
                    ).toString("base64"))

                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        let viewsChart = false;
                        let topContent = []
                        if(data.forEach) {
                            data.forEach(d => {
                                if(d.analyticsMetricChartDetailScreenData) {
                                    d = d.analyticsMetricChartDetailScreenData
                                    viewsChart = d.seriesConfiguration
                                                .lineSeries.linesData[0]
                                    returnData.userToken = createUserToken(id)
                                } else if(d.analyticsTableWithBarsData) {
                                    d = d.analyticsTableWithBarsData
                                    let title = d.cardData.title.toLowerCase()
                                    if(title == "top content") {
                                        topContent = d.cardData.rows
                                    }
                                    if(topContent && topContent.slice) {
                                        topContent = topContent.slice(0,10)
                                    } else if(!topContent) {
                                        topContent = []
                                    }
                                }
                            })
                        }
                        if(timeId == 1 && req.query.tab == "VIEWS") {
                            returnData.fullViewsChart = viewsChart;
                        }
                        returnData.viewsChart = viewsChart;
                        returnData.topContent = topContent;
                        markDone()
                    }))
                }
                if(doFetches.includes("viewsContent")) {
                    doViewsContentRequest()
                }

                function doGendersRequest() {
                    let gendersParam = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    etab.setTabid(createCustomTabidRequest("Gender"))
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAGYAgGiBQA")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setChannelid(id)
                    gendersParam.setRequest(requestContainer)

                    let param = utils.base64toUrl(Buffer.from(
                        gendersParam.serializeBinary()
                    ).toString("base64"))

                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsCardWithChipsData) {
                                    data = a.analyticsCardWithChipsData.chips[0]
                                            .content[0].tableWithBarsData
                                            .cardData
                                }
                            })
                        }
                        returnData.genderData = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("genders")) {
                    doGendersRequest()
                }

                function doViewerAgeRequest() {
                    let gendersParam = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAGYAgGiBQA")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setChannelid(id)
                    gendersParam.setRequest(requestContainer)

                    let param = utils.base64toUrl(Buffer.from(
                        gendersParam.serializeBinary()
                    ).toString("base64"))

                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsCardWithChipsData) {
                                    data = a.analyticsCardWithChipsData.chips[0]
                                            .content[0].tableWithBarsData
                                            .cardData
                                }
                            })
                        }
                        returnData.viewerAge = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("age")) {
                    doViewerAgeRequest()
                }

                function doViewerRegionRequest() {
                    let gendersParam = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAGYAgGKBQ0KCwh1EIgFGAEgASgK")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setChannelid(id)
                    gendersParam.setRequest(requestContainer)

                    let param = utils.base64toUrl(Buffer.from(
                        gendersParam.serializeBinary()
                    ).toString("base64"))

                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsCardWithChipsData) {
                                    data = a.analyticsCardWithChipsData.chips[0]
                                            .content[0].tableWithBarsData
                                            .cardData
                                }
                            })
                        }
                        returnData.viewerRegion = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("region")) {
                    doViewerRegionRequest()
                }

                function doCommentEngagementRequest() {
                    let reqParam = new creatorRequestParts.communityDetailParams()
                    reqParam.setRequestid(46) // for more trying?
                    // tried 29-49 and only this one worked
                    reqParam.setChannelid(id)
                    let reqRoot = new params.root()
                    reqRoot.setCommunitydetailrequest(reqParam)
                    let paramsBase = utils.base64toUrl(
                        Buffer.from(reqRoot.serializeBinary())
                              .toString("base64")
                    )
                    function getChart(r) {
                        let t = {}
                        try {
                            let sus = r.continuationContents.sectionListContinuation
                                 .contents.filter(s => {
                                return JSON.stringify(s).includes(
                                    "analyticsMetricChartDetailScreenData"
                                )
                            })[0]
                            t = sus.analyticsCardSectionRenderer.contents[0]
                                .analyticsItemRenderer.content.elementRenderer
                                .newElement.type.componentType.model
                                .analyticsRootModel
                                .analyticsMetricChartDetailScreenData
                                .seriesConfiguration.lineSeries.linesData[0]
                        }
                        catch(error) {
                            console.log(error)
                        }
                        return t;
                    }
                    function getTopContent(r) {
                        let t = [];
                        try {
                            t = r.continuationContents.sectionListContinuation
                                 .contents.filter(s => {
                                return JSON.stringify(s).includes(
                                    "analyticsSingleMetricTableData"
                                )
                            })[0].analyticsCardSectionRenderer.contents[0]
                            .analyticsItemRenderer.content.elementRenderer
                            .newElement.type.componentType.model
                            .analyticsRootModel.analyticsSingleMetricTableData
                            .rows;
                        }
                        catch(error) {
                            console.log(error)
                        }
                        return t;
                    }
                    let selfFetchesRequired = 1;
                    let selfFetchesDone = 0;
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEcommunity_detail",
                        "params": paramsBase,
                        "ownChannelId": id
                    }, (data => {
                        returnData.commentChart = getChart(data)
                        returnData.topCommented = getTopContent(data)
                        if(timeId == 1) {
                            returnData.commentChartWhole = getChart(data)
                            returnData.topCommentedWhole = getTopContent(data)
                            userCachedCommentCharts[id] = returnData.commentChart;
                            returnData.userToken = createUserToken(id)
                        }
                        selfFetchesDone++
                        if(selfFetchesDone >= selfFetchesRequired) {
                            markDone()
                        }
                    }), true, timeId)
                    if(timeId !== 1) {
                        selfFetchesRequired++
                        // if not picked, make a new one for full data
                        yt2009mobilehelper.openInsightRequest(req, "browse", {
                            "browseId": "FEcommunity_detail",
                            "params": paramsBase,
                            "ownChannelId": id
                        }, (data => {
                            returnData.commentChartWhole = getChart(data)
                            returnData.topCommentedWhole = getTopContent(data)
                            userCachedCommentCharts[id] = returnData.commentChartWhole;
                            returnData.userToken = createUserToken(id)
                            selfFetchesDone++
                            if(selfFetchesDone >= selfFetchesRequired) {
                                markDone()
                            }
                        }), true, "whole")
                    }
                }
                if(doFetches.includes("commentEngagement")) {
                    doCommentEngagementRequest()
                }

                function doStudioSearchRequest() {
                    let term = decodeURIComponent(req.query.query)
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEcreator_content",
                        "creatorQuery": term
                    }, (data => {
                        let s = []
                        let creatorVideos = []
                        try {
                            s = data.frameworkUpdates
                                    .entityBatchUpdate
                                    .mutations
                        }
                        catch(error){}
                        s.forEach(m => {
                            if(m.payload && m.payload.creatorVideoData) {
                                let v = m.payload.creatorVideoData
                                let metrics = (
                                    v.metrics || v.publicMetrics || {}
                                )
                                v.views = utils.bareCount(metrics.viewCount)
                                creatorVideos.push(v)
                            }
                        })
                        returnData.creatorVideosQuery = creatorVideos;
                        markDone()
                    }), true)
                }
                if(doFetches.includes("studioSearch")) {
                    doStudioSearchRequest()
                }

                function doVideoMetadataRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11)
                    if(userCachedVideoData[v]
                    && userCachedVideoData[v].channelId == id) {
                        returnData.videoMetadata = userCachedVideoData[v]
                        markDone()
                    } else if(userCachedVideoData[v]) {
                        markDone()
                    } else {
                        let videoDetail = new params.videoDetailRequest()
                        videoDetail.setVideoid(v)
                        let paramRoot = new params.root()
                        paramRoot.setFevideodetail(videoDetail)
                        let p = utils.base64toUrl(
                            Buffer.from(paramRoot.serializeBinary())
                                  .toString("base64")
                        )
                        yt2009mobilehelper.openInsightRequest(req, "browse", {
                            "browseId": "FEvideo_detail",
                            "params": p
                        }, (data => {
                            if(!data || !data.frameworkUpdates) {
                                markDone()
                                return;
                            }
                            let vdata = data.frameworkUpdates.entityBatchUpdate
                                        .mutations.filter(s => {
                                return s
                                    && s.payload
                                    && s.payload.creatorVideoData
                            })[0]
                            if(vdata) {
                                vdata = vdata.payload.creatorVideoData
                                try {
                                    let views = vdata.metrics.viewCount;
                                    vdata.views = views;
                                }
                                catch(error){}
                                userCachedVideoData[v] = vdata;
                            }
                            returnData.videoMetadata = vdata;
                            markDone()
                        }), true)
                    }
                }
                if(doFetches.includes("videoMetadata")) {
                    doVideoMetadataRequest()
                }

                function doVideoViewsChartRequest() {
                    // need 2 requests if not lifetime picked
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let intFetchesRequired = 1;
                    let intFetchesDone = 0;
                    function intMarkDone() {
                        intFetchesDone++
                        if(intFetchesDone >= intFetchesRequired) {
                            markDone()
                        }
                    }
                    function createRequestParams(customTimeId) {
                        let param = new params.root()
                        let requestContainer = new params.request()
                        let etab = new params.extendedTabRequest()
                        let content = new params.extendedTabRequest
                                                .extendedContent()
                        if(!customTimeId) {
                            // use chip proto generated previously
                            content.setUsechip(chip)
                        } else {
                            // generate new chip for this request
                            let chip = new creatorRequestParts.chipRender
                                            .contents()
                            chip.setRelcurrenttime(
                                Math.floor(Date.now() / 1000)
                            )
                            chip.setTimeid(customTimeId)
                            let chiprun = new creatorRequestParts.chipRender
                                              .run()
                            chiprun.setVideoid(v)
                            chip.setChannelid(chiprun)
                            content.setUsechip(chip)
                        }
                        content.addReturndataoption("CAEqBxIAIgMIiAWYAgE")
                        etab.setContent(content)
                        requestContainer.setEtab(etab)
                        requestContainer.setVideoid(v)
                        param.setRequest(requestContainer)
                        return utils.base64toUrl(Buffer.from(
                            param.serializeBinary()
                        ).toString("base64"))
                    }
                    function performRequest(params, callback) {
                        yt2009mobilehelper.openInsightRequest(req, "browse", {
                            "browseId": "FEanalytics_screen",
                            "params": params
                        }, (data => {
                            data = getTheCards(data)
                            if(data.forEach) {
                                data.forEach(a => {
                                    if(a.analyticsMetricChartDetailScreenData) {
                                        data = a.analyticsMetricChartDetailScreenData
                                                .seriesConfiguration.lineSeries
                                                .linesData[0]
                                    }
                                })
                            }
                            callback(data)
                        }))
                    }
                    if(timeId !== 1) {
                        intFetchesRequired++
                        performRequest(createRequestParams(1), (data) => {
                            userCachedViewCharts[v] = data;
                            returnData.videoViewChartLifetime = data;
                            returnData.userToken = createUserToken(v)
                            intMarkDone()
                        })
                    }
                    performRequest(createRequestParams(), (data) => {
                        returnData.videoViewChart = data;
                        if(timeId == 1) {
                            userCachedViewCharts[v] = data;
                            returnData.userToken = createUserToken(v)
                            returnData.videoViewChartLifetime = data;
                        }
                        intMarkDone()
                    })
                }
                if(doFetches.includes("videoViewsChart")) {
                    doVideoViewsChartRequest();
                }

                function doVideoGeographyRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let param = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    etab.setTabid(createCustomTabidRequest(
                        "Top geographies"
                    ))
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAEyCwh1EIgFGAEgASgFmAIB")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setVideoid(v)
                    param.setRequest(requestContainer)
                    param = utils.base64toUrl(Buffer.from(
                        param.serializeBinary()
                    ).toString("base64"))
                    
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsTableWithBarsData) {
                                    data = a.analyticsTableWithBarsData
                                            .cardData
                                }
                            })
                        }
                        if(!data) {
                            returnData.videoGeography = []
                        }
                        returnData.videoGeography = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("videoGeography")) {
                    doVideoGeographyRequest()
                }

                function doVideoSourcesRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let param = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption(
                        "CAEyFAhwEIgFGAFCCwhwEIgFGAEgASgFmAIB"
                    )
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setVideoid(v)
                    param.setRequest(requestContainer)
                    param = utils.base64toUrl(Buffer.from(
                        param.serializeBinary()
                    ).toString("base64"))
                    
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsTableWithBarsData) {
                                    data = a.analyticsTableWithBarsData
                                            .cardData
                                }
                            })
                        }
                        if(data.rows) {data = data.rows;}
                        if(!data) {
                            returnData.videoSources = []
                        }
                        returnData.videoSources = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("videoSources")) {
                    doVideoSourcesRequest()
                }

                function doVideoDemographicsRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let param = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    etab.setTabid(createCustomTabidRequest(
                        "Age and gender"
                    ))
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAGSAQCYAgE")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setVideoid(v)
                    param.setRequest(requestContainer)
                    param = utils.base64toUrl(Buffer.from(
                        param.serializeBinary()
                    ).toString("base64"))
                    
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        let ageData = []
                        let genderData = []
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsTableWithBarsData) {
                                    data = a.analyticsTableWithBarsData
                                            .cardData
                                    if(data.title == "Age"
                                    && data.rows) {
                                        ageData = data || []
                                    }
                                    if(data.title == "Gender"
                                    && data.rows) {
                                        genderData = data || []
                                    }
                                }
                            })
                        }
                        returnData.videoAgeDemographic = ageData;
                        returnData.videoGenderDemographic = genderData;
                        markDone()
                    }))
                }
                if(doFetches.includes("videoDemographics")) {
                    doVideoDemographicsRequest()
                }

                function doVideoAvgViewtimeRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let intFetchesRequired = 1;
                    let intFetchesDone = 0;
                    function intMarkDone() {
                        intFetchesDone++
                        if(intFetchesDone >= intFetchesRequired) {
                            markDone()
                        }
                    }
                    function createParams(customTimeId) {
                        let param = new params.root()
                        let requestContainer = new params.request()
                        let etab = new params.extendedTabRequest()
                        etab.setTabid(createCustomTabidRequest(
                            "Average view duration"
                        ))
                        let content = new params.extendedTabRequest
                                                .extendedContent()
                        if(!customTimeId) {
                            content.setUsechip(chip)
                        } else {
                            let chip = new creatorRequestParts.chipRender
                                            .contents()
                            chip.setRelcurrenttime(
                                Math.floor(Date.now() / 1000)
                            )
                            chip.setTimeid(customTimeId)
                            let chiprun = new creatorRequestParts.chipRender
                                              .run()
                            chiprun.setVideoid(v)
                            chip.setChannelid(chiprun)
                            content.setUsechip(chip)
                        }
                        content.addReturndataoption("CAEqBhIAIgIIbpgCAQ")
                        content.addReturndataoption("CAEiCggAEAAYASgPagA")
                        etab.setContent(content)
                        requestContainer.setEtab(etab)
                        requestContainer.setVideoid(v)
                        param.setRequest(requestContainer)
                        param = utils.base64toUrl(Buffer.from(
                            param.serializeBinary()
                        ).toString("base64"))
                        return param;
                    }
                    function performRequest(params, callback) {
                        yt2009mobilehelper.openInsightRequest(req, "browse", {
                            "browseId": "FEanalytics_screen",
                            "params": params
                        }, (data => {
                            data = getTheCards(data)
                            if(data.forEach) {data.forEach(a => {
                                if(a.analyticsMetricChartDetailScreenData) {
                                    data = a.analyticsMetricChartDetailScreenData
                                            .seriesConfiguration.lineSeries
                                            .linesData[0]
                                }
                            })}
                            callback(data)
                        }))
                    }
                    performRequest(createParams(), (data) => {
                        returnData.viewDurationChart = data;
                        if(timeId == 1) {
                            data.visualConvertToHours = true;
                            returnData.viewDurationChartLifetime = data;
                            userCachedViewCharts[v + "-avg"] = data
                            returnData.userToken = createUserToken(v + "-avg")
                        }
                        intMarkDone()
                    })
                    if(timeId !== 1) {
                        intFetchesRequired++
                        performRequest(createParams(1), (data) => {
                            data.visualConvertToHours = true;
                            userCachedViewCharts[v + "-avg"] = data
                            returnData.userToken = createUserToken(v + "-avg")
                            returnData.viewDurationChartLifetime = data;
                            intMarkDone()
                        })
                    }
                }
                if(doFetches.includes("videoAvgViewtime")) {
                    doVideoAvgViewtimeRequest()
                }

                function doVideoDeviceTypeRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let param = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    etab.setTabid(createCustomTabidRequest(
                        "Device type"
                    ))
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAEyCAiUARCJBRgBmAIB")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setVideoid(v)
                    param.setRequest(requestContainer)
                    param = utils.base64toUrl(Buffer.from(
                        param.serializeBinary()
                    ).toString("base64"))
                    
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsTableWithBarsData) {
                                    data = a.analyticsTableWithBarsData
                                            .cardData
                                }
                            })
                        }
                        returnData.videoDeviceType = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("videoDeviceType")) {
                    doVideoDeviceTypeRequest()
                }

                function doVideoRetentionRequest() {
                    let v = req.query.video_id
                               .replace(/[^a-zA-Z0-9+\-+_]/g, "")
                               .substring(0,11);
                    let param = new params.root()
                    let requestContainer = new params.request()
                    let etab = new params.extendedTabRequest()
                    let content = new params.extendedTabRequest
                                            .extendedContent()
                    content.setUsechip(chip)
                    content.addReturndataoption("CAHSAQQSAggBmAIB")
                    etab.setContent(content)
                    requestContainer.setEtab(etab)
                    requestContainer.setVideoid(v)
                    param.setRequest(requestContainer)
                    param = utils.base64toUrl(Buffer.from(
                        param.serializeBinary()
                    ).toString("base64"))
                    
                    yt2009mobilehelper.openInsightRequest(req, "browse", {
                        "browseId": "FEanalytics_screen",
                        "params": param
                    }, (data => {
                        let retention = -1;
                        data = getTheCards(data)
                        if(data.forEach) {
                            data.forEach(a => {
                                if(a.analyticsKeyMomentsVideoDetailData) {
                                    let p = a.analyticsKeyMomentsVideoDetailData
                                    data = p.seriesConfiguration.lineSeries
                                            .linesData[0]
                                    if(p.metricRows) {
                                        let z = p.metricRows.filter(s => {
                                            return s
                                                && s.value
                                                && s.value.includes("%")
                                        })
                                        if(z[0]) {
                                            retention = parseInt(z[0].value)
                                        }
                                    }
                                }
                            })
                        }
                        if(isNaN(retention)) {
                            retention = -1
                        }
                        returnData.typicalRetentionPercentage = retention;
                        returnData.retentionChart = data;
                        markDone()
                    }))
                }
                if(doFetches.includes("videoRetention")) {
                    doVideoRetentionRequest()
                }
            })
        })
        app.get("/insight_viewcount_customs", (req, res) => {
            let dataSource = userCachedViewCharts
            if(req.query.is_comment == 1) {
                dataSource = userCachedCommentCharts
            }
            if(!req.query.time
            && req.query.user
            && chartUserTokens[req.query.user]) {
                let charts = dataSource[chartUserTokens[req.query.user]]
                req.query.time = charts.x.length
            }
            if(!req.query.user
            || !req.query.time
            || isNaN(parseInt(req.query.time))) {
                res.sendStatus(400)
                return;
            }
            let user = chartUserTokens[req.query.user]
            if(!user) {
                res.sendStatus(401)
                return;
            }

            function createChartUrl() {
                let d = JSON.parse(JSON.stringify(dataSource[user]))
                let topViews = 100;
                let viewPoints = []
                let chartUrl = [
                    `/chart?cht=lc:nda&chs=351x170&chco=647b5c&chgr=1&int_opt=1`
                ]
                let rawDays = parseInt(req.query.time)
                topViews = Math.floor(
                    JSON.parse(JSON.stringify(d.y)).sort((a,b) => {
                        return b - a
                    })[0] * 1.3
                )

                d.x = d.x.slice(-rawDays)
                d.y = d.y.slice(-rawDays)

                let topPointCropped = JSON.parse(JSON.stringify(d.y))
                                      .sort((a,b) => {return b - a})[0]
                let downscaleScale = topPointCropped / topViews
                
                // downscale to x points
                if(d.y.length >= 100) {
                    d.y = downscaleArray(d.y, 100, downscaleScale)
                }

                viewPoints = d.y.map(s => {
                    return ((s / topViews) * 100)
                })

                let topViewPoint = JSON.parse(JSON.stringify(viewPoints))
                                    .sort((a,b) => {return b - a})[0]
                if(topViewPoint >= 80) {
                    // scaling gone off rails
                    let scale = topViewPoint / 80
                    viewPoints = viewPoints.map(s => {
                        return s / scale;
                    })
                }

                viewPoints = viewPoints.map(s => {
                    return s.toFixed(1)
                })
                
                let useChartAutoScale = true;
                if(d.visualConvertToHours) {
                    useChartAutoScale = false;
                    let times = [
                        "0:00",
                        utils.seconds_to_time((topViews / 1000) / 3),
                        utils.seconds_to_time(((topViews / 1000) / 3 * 2)),
                        utils.seconds_to_time((topViews / 1000))
                    ]
                    topViews = times.join(",")
                }

                chartUrl.push(`&chxr=0,0,${topViews}`)
                if(useChartAutoScale) {
                    chartUrl.push(`|1,0,100`)
                }
                chartUrl.push(`&chd=${viewPoints.join(",")}`)
                chartUrl.push(`&chm=B,b6cfadaa,0,0,0`)
                res.redirect(chartUrl.join(""))
            }

            if(dataSource[user]) {
                createChartUrl()
            } else {
                console.log("should hit fb!")
                res.sendStatus(500)
                return;
            }
        })
    }
}