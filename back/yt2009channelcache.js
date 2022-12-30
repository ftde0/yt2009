let channel_cache = {}

module.exports = {
    "readCache": function(url) {
        return channel_cache[url] ? JSON.parse(JSON.stringify(channel_cache[url])) : undefined;
    },
    
    "writeCache": function(url, data) {
        if(channel_cache[url]) return;
        channel_cache[url] = JSON.parse(JSON.stringify(data));
        return;
    }
}