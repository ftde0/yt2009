/*
======
dominant_color_sync - synchronous wersja dominant_color. działają tak samo poza tym.

torl/nb, 2022-2024
======
*/

const child_process = require("child_process")
const fs = require("fs")

module.exports = function(file_path) {
    let command = [
        `convert`,
        `"${file_path}[1]"`,
        `+dither -colors 32`,
        `-define histogram:unique-colors=true`,
        `-format "%c" histogram:info:`,
        `| sort ${process.platform == "linux" ? "-n" : ""}`
    ]
    let o = child_process.execSync(command.join(" "), {"stdio": "pipe"}).toString()
    let split_output = o.split("\n");
    let output = ""

    split_output.forEach(part => {
        if(part.length !== 0) {
            output = part;
        }
    })

    if(!output.split("(")[1]) {
        console.log(`
===========

WARN: failed to find the channel's dominant color!
this is most likely an issue with \`convert\` not
set up properly.

===========`)
        return [180, 180, 180];
    }
    output = output.split("(")[1].split(")")[0].split(",")
    let finalOutput = []

    output.forEach((part) => {
        finalOutput.push(Math.floor(parseInt(part)))
    })

    return finalOutput;
}