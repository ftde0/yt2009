const child_process = require("child_process")
const fs = require("fs")
let yt2009_process;

if(!fs.existsSync("./logs/")) {
    fs.mkdirSync("./logs/")
}
console.log("logs will be saved to /back/logs/")

function start_yt2009() {
    let commands = [
        `cd "${__dirname.replace(/\"/g, "\\\"")}" `,
        `&& node backend.js`
    ].join("")
    console.log(`yt2009 start at ${new Date().toLocaleString()}`)
    yt2009_process = child_process.exec(commands, (error, stdout, stderr) => {
        fs.writeFileSync("./logs/" + Date.now() + ".txt", stdout + stderr)
        setTimeout(() => {
            start_yt2009()
        }, 3000)
    })
}
start_yt2009()