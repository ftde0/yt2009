const constants = require("./yt2009constants.json")
let data = {
    "api_key": "",
    "context": {},
    "fileDownloadStatus": {},
    "masterWs": false,
    "dataFetches": {},
    "players": {},
    "verboseDownloadProgress": {},
    "extendWriteCallbacks": {}
}
let fileDownloadListeners = {

}
let dataFetchListeners = {}

module.exports = {
    "writeData": function(name, value) {
        data[name] = value;
    },

    "read": function() {
        return data;
    },

    "extendWrite": function(name, property, value) {
        data[name][property] = value;
        if(data.extendWriteCallbacks[name]
        && data.extendWriteCallbacks[name][property]) {
            data.extendWriteCallbacks[name][property].forEach(c => {
                if(c && c.callback) {
                    c.callback()
                }
            })
        }
    },

    "delete": function(name, value) {
        delete data[name][value]
    },

    "updateFileDownload": function(id, status) {
        data.fileDownloadStatus[id] = status;
        if(status == 2 && fileDownloadListeners[id]) {
            fileDownloadListeners[id].forEach(l => {
                l()
            })
            delete fileDownloadListeners[id]
            delete data.fileDownloadStatus[id]
        } else if(status == 2) {
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
    },

    "updateDataFetch": function(id, vData) {
        data.dataFetches[id] = vData
        if(vData && dataFetchListeners[id]) {
            dataFetchListeners[id].forEach(l => {
                l()
            })
            delete dataFetchListeners[id]
            delete data.dataFetches[id]
        } 
    },

    "getDataFetchStatus": function(id) {
        return data.dataFetches[id]
    },

    "waitForDataStatusChange": function(id, callback) {
        if(!dataFetchListeners[id]) {
            dataFetchListeners[id] = []
        }
        if(data.dataFetches[id]) {
            callback()
            try {
                delete dataFetchListeners[id]
                delete data.dataFetchListeners[id]
            }
            catch(error) {}
            return;
        }
        dataFetchListeners[id].push(callback)
    },

    "registerExtendCallback": function(name, property, callback) {
        // id is generated for future ref, once done we can remove the callback
        let id = Math.floor(Math.random() * 5902306)
        let cbObject = {
            "id": id,
            "callback": callback
        }
        if(!data.extendWriteCallbacks[name]) {
            data.extendWriteCallbacks[name] = {}
        }
        if(!data.extendWriteCallbacks[name][property]) {
            data.extendWriteCallbacks[name][property] = []
        }
        data.extendWriteCallbacks[name][property].push(cbObject)
        return id;
    },

    "unregisterExtendCallback": function(callbackId) {
        //delete data.extendWriteCallbacks[callbackId];
        for(let n in data.extendWriteCallbacks) {
            if(data.extendWriteCallbacks[n]) {
                for(let d in data.extendWriteCallbacks[n]) {
                    if(data.extendWriteCallbacks[n][d]) {
                        let c = data.extendWriteCallbacks[n][d]
                        data.extendWriteCallbacks[n][d] = c.filter(s => {
                            s.id !== callbackId
                        })
                    }
                }
            }
        }
    }
}

// initial data
data.api_key = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
data.context = constants.cached_innertube_context