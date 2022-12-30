const constants = require("./yt2009constants.json")
let data = {
    "api_key": "",
    "context": {}
}

module.exports = {
    "writeData": function(name, value) {
        data[value] = name;
    },

    "read": function() {
        return data;
    }
}

// initial data
data.api_key = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
data.context = constants.cached_innertube_context