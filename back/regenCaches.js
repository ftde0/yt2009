const fs = require("fs")
const cacheFiles = {
    "channel_main_cache.json": {},
    "channel_playlist_cache.json": {},
    "default_avatar_adapt.json": {},
    "playlist_cache.json": {},
    "qualitylist_cache.json": {},
    "search_cache.json": {},
    "userid.json": {},
    "video_cache.json": {},
    "video_exists_cache.json": {},
    "wayback_channel_cache.json": {},
    "wayback_watch_cache.json": {},
    "captions_cache.json": {}
}
console.log("creating cache files")
for(let file in cacheFiles) {
    fs.writeFileSync(
        "./cache_dir/" + file,
        JSON.stringify(cacheFiles[file])
    )
}