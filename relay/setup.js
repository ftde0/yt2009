const child_process = require("child_process")
const fs = require("fs")

// yt2009-relay-setup
const required_dependencies = [
    "express",
    "node-fetch@2.6.7",
    "ytdl-core"
]
console.log("yt2009-relay-setup")
console.log("installing node dependencies")
child_process.execSync(`npm install ${required_dependencies.join(" ")}`)
console.log("generating a config")
if(fs.existsSync(__dirname + "/config.json")) {
    console.log("there ")
}