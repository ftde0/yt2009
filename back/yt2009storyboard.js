const utils = require("./yt2009utils")
const yt2009exports = require("./yt2009exports")
const child_process = require("child_process")
const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const config = require("./config.json")
const fs = require("fs")
const FOUR_THREE = 4 / 3

let processingStoryboards = []

// differences between current youtube-provided storyboards and
// 2009 code (flash):
// - always 64x48 (4:3)
// - single url for all images
// - jpeg
// - was it even used?

module.exports = {
    "set": function(app) {
        app.get("/storyboard_fetch", (req, res) => {
            if(!utils.isAuthorized(req)) {
                res.sendStatus(401)
                return;
            }
            
            let id = req.query.video_id;
            if(!id) {
                res.sendStatus(400)
                return;
            }
            id = id.substring(0,11)

            let tempFilePrefix = `sbt-${id}-`
            let finalFile = `storyboard-${id}.jpg`
            if(fs.existsSync("../assets/" + finalFile)) {
                res.redirect("/assets/" + finalFile)
                return;
            }

            if(processingStoryboards.includes(id)) {
                // already processing, wait until complete and send
                let x = setInterval(() => {
                    if(!processingStoryboards.includes(id)) {
                        clearInterval(x)
                        res.redirect("/assets/" + finalFile)
                        return;
                    }
                }, 100)
                return;
            }

            processingStoryboards.push(id)

            let allCreatedFiles = [] // to easily delete later
            let o = {"encoding": "buffer"}

            function getBestStoryboardLink() {
                // get closest best match for 64x48 sizes

                if(!storyboardLinks || !storyboardLinks[0]) {
                    res.sendStatus(404)
                    return;
                }
                // flash storyboard size: 64x48
                if(storyboardLinks.length >= 2 && storyboardLinks.filter(s => {
                    return s.thumbWidth >= 64
                })[0]) {
                    // remove smaller than 64px in width if doable
                    storyboardLinks = storyboardLinks.filter(s => {
                        return s.thumbWidth >= 64
                    })
                }
                let bestStoryboard = storyboardLinks.map((a) => {
                    a.diff = Math.abs(a.thumbWidth - 64)
                    return a;
                }).sort((a,b) => {
                    return a.diff - b.diff;
                })[0]

                if(bestStoryboard.totalThumbs >= 500) {
                    res.sendStatus(413)
                    return;
                }

                download(bestStoryboard)
            }

            let mergedStoryboard = false;
			let downloadedFiles = []
            function download(storyboard) {
                // as there may be multiple image sizes,
                // download and merge them all (also converts from WEBP)
                let downloadedFilesCount = 0;
                let neededFiles = storyboard.urls.length

				let ytWidth = storyboard.thumbWidth * storyboard.partsPerRow

                storyboard.urls.forEach(u => {
                    let index = storyboard.urls.indexOf(u)
                    let filename = u.split("/")
                    filename = filename[filename.length - 1]
                               .split("?")[0].split(".")[0]
                    filename = tempFilePrefix + filename
                    fetch(u, {
                        "headers": constants.headers
                    }).then(r => {r.buffer().then(r => {
						if(downloadedFilesCount == 0) {
							// is first file, get WEBP size
							// to make sure youtube spec isn't off
							let size = identifyWebpImgSize(r.slice(0,70))
							if(size && size[0]) {
								let actWidth = size[0]
								if(actWidth !== ytWidth
								&& Math.abs(ytWidth - actWidth) <= 15) {
									if(config.env == "dev") {
										console.log(
											"fix storyboard spec for "+ id
										)
									}
									let w = actWidth / storyboard.partsPerRow
									storyboard.thumbWidth = w
								}
							}
						}
                        fs.writeFileSync(`../assets/${filename}`, r)
                        downloadedFiles[index] = (
                            `${__dirname}/../assets/${filename}`
                        )
                        downloadedFilesCount++
                        allCreatedFiles.push(filename)
                        if(downloadedFilesCount == neededFiles) {
							merge(storyboard)
                        }
                    })})
                })
            }
			
			function merge(storyboard) {
				let magickArgs = []
				downloadedFiles.forEach(f => {
					magickArgs.push(f)
				})
				magickArgs.push("-append")
				magickArgs.push("jpg:-")
				//console.log(magickArgs)
				let c = child_process.spawn(
					"magick", magickArgs
				)
                let b = Buffer.from([])
				c.stderr.on("data", (e) => {})
				c.stdout.on("data", (d) => {
					b = Buffer.concat([b, d])
				})
				c.stdout.on("end", () => {
					mergedStoryboard = b;
					onelineFrames(storyboard)
				})
				c.stdin.end()
			}

			let onelinedSb = false;
            function onelineFrames(storyboard) {
				//console.log("onelining")
				let w = storyboard.thumbWidth
				let h = storyboard.thumbHeight
				let ias = (w / h) <= FOUR_THREE
				let commandArgs = [
					`-`,
					`-crop`, `${w}x${h}`,
					`-resize`, `64x48`,
					`-background`, `black`,
					`-gravity`, `center`,
					`-extent`, `64x48`,
					`+append`, `jpg:-`
				]
				if(ias) {
					commandArgs = [
						`-`,
						`-crop`, `${w}x${h}`,
						`-resize`, `64x48!`,
						`-background`, `black`,
						`+append`, `jpg:-`
					]
				}
				let c = child_process.spawn("magick", commandArgs)
				let b = Buffer.from([])
				c.stderr.on("data", (e) => {})
				c.stdout.on("data", (d) => {
					b = Buffer.concat([b, d])
				})
				c.stdout.on("end", () => {
					onelinedSb = b;
					splitLines(storyboard)
				})
				c.stdin.write(mergedStoryboard)
				c.stdin.end()
			}
			
			let splitSb = false;
			function splitLines(storyboard) {
				let thumbsPerLine = 5;
				let sWidth = thumbsPerLine * 64
				//console.log("splitting")
				let c = child_process.spawn("magick", [
					`-`, `-crop`, `${sWidth}x48`,
					`-background`, `black`,
					`-append`, `jpg:-`
				])
				let b = Buffer.from([])
				c.stderr.on("data", (e) => {console.log(e.toString())})
				c.stdout.on("data", (d) => {
					b = Buffer.concat([b, d])
				})
				c.stdout.on("end", () => {
					splitSb = b;
					finalize()
				})
				c.stdin.write(onelinedSb)
				c.stdin.end()
			}
			
			function finalize() {
				fs.writeFileSync(`../assets/${finalFile}`, splitSb)
				res.redirect(`/assets/${finalFile}`)
				setTimeout(() => {
					allCreatedFiles.forEach(s => {
						fs.unlink(`../assets/${s}`, (e) => {})
					})
				}, 250)
			}

            let storyboardLinks = false;
            if(yt2009exports.read().players[id]
			|| yt2009exports.read().players[id + "/hfr"]) {
                if(config.env == "dev") {
                    console.log(`using cached player for ${id} storyboard`)
                }
                storyboardLinks = getStoryboard(
                    (yt2009exports.read().players[id]
				  || yt2009exports.read().players[id + "/hfr"])
                )
                getBestStoryboardLink()
            } else {
                if(config.env == "dev") {
                    console.log(`using clean player for ${id} storyboard`)
                }
                utils.pullBarePlayer(id, (player) => {
                    storyboardLinks = getStoryboard(player)
                    getBestStoryboardLink()
                })
            }
        })
    }
}

function getStoryboard(player) {
    try {
        return parseStoryboardSpec(
            player.storyboards.playerStoryboardSpecRenderer.spec
        )
    }
    catch(error) {
        return false;
    }
}

function parseStoryboardSpec(spec) {
    if(!spec) return []
	let a = spec.split("|")
	let baseUrl = a[0]
	a.shift()
	let levels = []
	let levelIndex = 0;
	a.forEach(level => {
		let parts = level.split("#")
		let thumbWidth = parseInt(parts[0])
		let thumbHeight = parseInt(parts[1])
		let totalThumbs = parseInt(parts[2])
		let partsPerRow = parseInt(parts[3])
		let rowCount = parseInt(parts[4])
		let urlNpart = parts[6]
		let params = parts[7].split("$").join("=")
		let urls = []
		if((partsPerRow * rowCount) < totalThumbs) {
			// multiple urls
			let imgsPerUrl = (partsPerRow * rowCount);
			let remainingImgs = totalThumbs
			let mIndex = 0;
			function addNextIndex() {
				let n = urlNpart.replace("$M", mIndex)
				urls.push([
					baseUrl.replace("$L", levelIndex)
						   .replace("$N", n),
					"&" + params
				].join(""))
				remainingImgs -= imgsPerUrl
			}
			while(remainingImgs > imgsPerUrl) {
				addNextIndex()
				mIndex++
			}
			if(remainingImgs > 0) {
				addNextIndex()
			}
		} else {
			// one url
            let url = urlNpart
			if(urlNpart.includes("$M")) {
				url = urlNpart.replace("$M", "0")
			}
			urls.push([
				baseUrl.replace("$L", levelIndex)
					   .replace("$N", url),
				"&" + params
			].join(""))
		}
		levels.push({
			"thumbWidth": thumbWidth,
			"thumbHeight": thumbHeight,
			"partsPerRow": partsPerRow,
			"rowCount": rowCount,
			"totalThumbs": totalThumbs,
			"urls": urls
		})
		levelIndex++
	})

    return levels
}

function identifyWebpImgSize(img) {
	// based on https://www.rfc-editor.org/info/rfc9649/
	function readInt(n, length) {
		let sorted = [0]
		switch(length) {
			case 2: {
				sorted = [n[1], n[0]]
				break;
			}
			case 3: {
				sorted = [n[2], n[1], n[0]]
				break;
			}
			case 4: {
				sorted = [n[3], n[2], n[1], n[0]]
				break;
			}
		}
		sorted = sorted.map(s => {
			return s.toString(16).padStart(2, "0")
		}).join("")
		return parseInt(sorted, 16)
	}

	img = img.slice(0,70) // needed info within the first 70b, no need to use more
	let cursor = 0;

	let simpleHeader = Buffer.from("VP8 ")
	let losslessHeader = Buffer.from("VP8L")
	let extHeader = Buffer.from("VP8X")
	// simple and lossless read the size the same
	// youtube storyboards usually use simple, but we support all just in case

	let simpleIndex = img.indexOf(simpleHeader)
	let losslessIndex = img.indexOf(losslessHeader)
	let extIndex = img.indexOf(extHeader)
	if(simpleIndex !== -1 || losslessIndex !== -1) {
		// simple/lossless header used
		cursor = Math.max(simpleIndex, losslessIndex) + 14
		// skip data size and other "start" headers - 14b

		let width = img.slice(cursor, cursor + 2)
		cursor += 2
		let height = img.slice(cursor, cursor + 2)

		width = readInt(width, 2)
		height = readInt(height, 2)
		
		return [width, height]
	} else if(extIndex !== -1) {
		// extended header used
		cursor = extIndex + 12 // skip size + other headers
		let width = img.slice(cursor, cursor + 3)
		cursor += 3
		let height = img.slice(cursor, cursor + 3)
		width = readInt(width, 3) + 1
		height = readInt(height, 3) + 1

		return [width, height]
	}
}