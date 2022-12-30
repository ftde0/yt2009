const yt2009main = require("./yt2009html")
const yt2009search = require("./yt2009search")
const yt2009wayback = require("./cache_dir/wayback_watchpage")
const yt2009templates = require("./yt2009templates")
const video_exists = require("./cache_dir/video_exists_cache_mgr")
const fs = require("fs")
const fetch = require("node-fetch")
const constants = require("./yt2009constants.json")
const utils = require("./yt2009utils")
const child_process = require("child_process")
const ytdl = require("ytdl-core")

module.exports = {
    "get_video": function(req, res) {
        // info o głównym filmie - tym na samym środku jak włączamy warp
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        console.log(`(${utils.get_used_token(req) + "_warp_swf"}) warp init (${Date.now()})`)

        yt2009main.fetch_video_data(req.query.video_id, (data) => {
            res.send(`<?xml version="1.0" encoding="utf-8"?><ut_response status="ok"><video><author>${data.author_name}</author><id>${req.query.video_id}</id><title>${data.title}</title><length_seconds>${data.length}</length_seconds><rating_avg>5</rating_avg><rating_count>1</rating_count><description>.</description><view_count>1</view_count><upload_time>1</upload_time><comment_count>1</comment_count><tags> </tags><url>http://www.youtube.com/watch?v=${req.query.video_id}</url><thumbnail_url>http://i.ytimg.com/vi/${req.query.video_id}/default.jpg</thumbnail_url><embed_status>ok</embed_status><allow_ratings>yes</allow_ratings></video></ut_response>`)
        }, req.headers["user-agent"], utils.get_used_token(req))
    },


    "get_related": function(req, res) {
        // related filmy - ta sekcja jest tu dzięki próbom i błędom ale jest
        if(!utils.isAuthorized(req)) {
            res.send("");
            return;
        }

        console.log(`(${utils.get_used_token(req) + "_warp_swf"}) warp videos load (${req.query.video_id}, ${Date.now()})`)

        let videos_xml = `
        <?xml version="1.0" encoding="utf-8"?>
        <ut_response status="ok">
        <video_list>`
        let video_index = 1;

        if(req.query.related == "1") {
            yt2009wayback.read(
                req.query.video_id,
                (data) => {
                    console.log(data.related)
                    if(data.related.length >= 1) {
                        let actual_exist = []
                        let video_check_table = []
                        data.related.forEach(video => {
                            if(utils.time_to_seconds(video.time) >= 900) return;
                            video_check_table.push(video)
                        })


                        video_check_table.forEach(video => {
                            setTimeout(function() {
                                video_exists.read(video.id, (exists) => {
                                    if(exists) {
                                        actual_exist.push(video)
                                    }

                                    video_check_table = video_check_table
                                                    .filter(s => s !== video)
                                    if(video_check_table.length == 0) {
                                        after_check()
                                    }
                                })
                            }, 150 + Math.floor(Math.random() * 1000))
                        })

                        function after_check() {
                            console.log("done")
                            actual_exist.forEach(video => {
                                videos_xml += yt2009templates.warpVideo(
                                    video.id,
                                    video.title,
                                    video.time,
                                    video.uploaderName,
                                    video_index
                                )
    
                                video_index++
                            })

                            videos_xml += `</video_list></ut_response>`
                            res.send(videos_xml)
                        }  
                    } else {
                        useDefaultRelated()
                    }
                },
                false
            )
        } else {
            useDefaultRelated();
        }

        function useDefaultRelated() {
            yt2009main.get_related_videos(req.query.video_id, (videos) => {
                // każdy film do xmla
                videos.forEach(video => {
                    if(utils.time_to_seconds(video.length) >= 900) return;
    
                    videos_xml += yt2009templates.warpVideo(
                        video.id,
                        video.title,
                        video.length,
                        video.creatorName,
                        video_index
                    )
                    video_index++;
                })
    
                videos_xml += `</video_list></ut_response>`
    
                res.send(videos_xml)
            })
        }

        
        
    },

    // handling /get_video (flv)
    "get_flv": function(req, res) {
        this.vid_flv(req.query.video_id, () => {
            res.redirect(`../assets/${req.query.video_id}.flv`)
        })
    },

    "vid_flv": function(id, callback) {
        // zdobywamy plik flv - takiego chce flash player

        // sprawdzamy kilka rzeczy żeby zaoszczędzić czasu najpierw

        // mamy flv?
        if(fs.existsSync(`../assets/${id}.flv`)) {
            callback()
        } else if(fs.existsSync(`../assets/${id}.mp4`)
                && !fs.existsSync(`../assets/${id}.flv`)) {
            // mamy mp4, ale nie mamy flv - konwertujemy
            convert_mp4_to_flv(id, () => {
                callback()
            })
        } else {
            // nie mamy mp4 ani flv - pobieramy i konwertujemy
            let writeStream = fs.createWriteStream(`../assets/${id}.mp4`)

            writeStream.on("finish", () => {
                setTimeout(function() {
                    convert_mp4_to_flv(id, () => {
                        callback()
                    })
                    convert_mp4_to_ogv(id)
                }, 250)
            })
    
            ytdl(`https://youtube.com/watch?v=${id}`, {
                "quality": 18
            })
            .pipe(writeStream)
            .on("error", (error) => {
                callback()
                console.log(`warp_flv: ${error}`)
            })
        }

        function convert_mp4_to_flv(id, callback) {
            child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 ${__dirname}/../assets/${id}.flv`, (error, stdout, stderr) => {
                callback()
            })
        }

        // konwertujemy do ogg w tle
        function convert_mp4_to_ogv(id) {
            child_process.exec(`ffmpeg -i ${__dirname}/../assets/${id}.mp4 -b 1500k -ab 128000 -speed 2 ${__dirname}/../assets/${id}.ogg`, (error, stdout, stderr) => {})
        }
    }
}