const fs = require("fs")
const fetch = require("node-fetch")
const utils = require("./yt2009utils")
const annotations_manager = require("./cache_dir/annotations_cache_manager")
const annotations_collection = {
    "D":"youtubeannotations_03",
    "M":"youtubeannotations_12",
    "N":"youtubeannotations_13",
    "b":"youtubeannotations_27",
    "G":"youtubeannotations_06",
    "p":"youtubeannotations_41",
    "K":"youtubeannotations_10",
    "j":"youtubeannotations_35",
    "h":"youtubeannotations_33",
    "S":"youtubeannotations_18",
    "X":"youtubeannotations_23",
    "z":"youtubeannotations_51",
    "Y":"youtubeannotations_24",
    "q":"youtubeannotations_42",
    "Q":"youtubeannotations_16",
    "k":"youtubeannotations_36",
    "V":"youtubeannotations_21",
    "9":"youtubeannotations_61",
    "r":"youtubeannotations_43",
    "x":"youtubeannotations_49",
    "5":"youtubeannotations_57",
    "2":"youtubeannotations_54",
    "6":"youtubeannotations_58",
    "d":"youtubeannotations_29",
    "a":"youtubeannotations_26",
    "A":"youtubeannotations_00",
    "4":"youtubeannotations_56",
    "W":"youtubeannotations_22",
    "n":"youtubeannotations_39",
    "R":"youtubeannotations_17",
    "1":"youtubeannotations_53",
    "%":"youtubeannotations_64",
    "H":"youtubeannotations_07",
    "0":"youtubeannotations_52",
    "8":"youtubeannotations_60",
    "i":"youtubeannotations_34",
    "_":"youtubeannotations_63",
    "w":"youtubeannotations_48",
    "I":"youtubeannotations_08",
    "U":"youtubeannotations_20",
    "C":"youtubeannotations_02",
    "u":"youtubeannotations_46",
    "s":"youtubeannotations_44",
    "o":"youtubeannotations_40",
    "m":"youtubeannotations_38",
    "F":"youtubeannotations_05",
    "3":"youtubeannotations_55",
    "O":"youtubeannotations_14",
    "l":"youtubeannotations_37",
    "7":"youtubeannotations_59",
    "T":"youtubeannotations_19",
    "v":"youtubeannotations_47",
    "f":"youtubeannotations_31",
    "L":"youtubeannotations_11",
    "t":"youtubeannotations_45",
    "J":"youtubeannotations_09",
    "g":"youtubeannotations_32",
    "P":"youtubeannotations_15",
    "B":"youtubeannotations_01",
    "E":"youtubeannotations_04",
    "-":"youtubeannotations_62",
    "Z":"youtubeannotations_25",
    "e":"youtubeannotations_30",
    "c":"youtubeannotations_28",
    "y":"youtubeannotations_50"
}

module.exports = {
    "get": function(req, res) {
        if(!utils.isAuthorized(req)) {
            res.send("")
            return;
        }

        let video_id = ""

        if(req.headers.source.includes("watch")) {
            // watchpage
            video_id = req.headers.source.split("v=")[1]
                                         .split("&")[0]
                                         .split("#")[0]
        } else {
            // embed
            video_id = req.headers.source.split("/embed/")[1]
                                         .split("?")[0]
                                         .split("#")[0]
        }

        let annotations_url = `https://archive.org/download/${
            annotations_collection[video_id.substring(0, 1)]
        }/${video_id.substring(0, 2)}.tar/${video_id.substring(0, 3)}/${video_id}.xml`

        annotations_manager.read(video_id, annotations_url, (xml) => {
            if(req.query.sendRaw == "1") {
                res.send(xml)
            } else {
                res.send(annotations_manager.parse(xml))
            }
        })
    },

    "getFmode": function(id, token, callback) {
        id = id.replace("/mp4", "")
        this.get({
            "headers": {
                "source": "watch?v=" + id,
                "cookie": "auth=" + token
            },
            "query": {"sendRaw": "1"}
        }, {
            "send": function(content) {
                callback(content)
            }
        })
    }
}