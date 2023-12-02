const constants = require("./yt2009constants.json")
let data = {
    "api_key": "",
    "context": {},
    "fileDownloadStatus": {},
    "masterWs": false
}
let fileDownloadListeners = {

}

module.exports = {
    "writeData": function(name, value) {
        data[name] = value;
    },

    "read": function() {
        return data;
    },

    "updateFileDownload": function(id, status) {
        data.fileDownloadStatus[id] = status;
        if(status == 2 && fileDownloadListeners[id]) {
            fileDownloadListeners[id].forEach(l => {
                l()
            })
            delete fileDownloadListeners[id]
            delete data.fileDownloadStatus[id]
        }
    },

    "getStatus": function(id) {
        return data.fileDownloadStatus[id];
    },

    "waitForStatusChange": function(id, callback) {
        if(!fileDownloadListeners[id]) {
            fileDownloadListeners[id] = []
        }
        if(data.fileDownloadStatus[id] == 2) {
            callback()
            try {
                delete fileDownloadListeners[id]
                delete data.fileDownloadStatus[id]
            }
            catch(error) {}
            return;
        }
        fileDownloadListeners[id].push(callback)
    }
}

// initial data
data.api_key = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
data.context = constants.cached_innertube_context