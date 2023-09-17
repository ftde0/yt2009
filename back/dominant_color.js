/*
======
dominant_color - komponent na yt2009 używający convert z imagemagicka

torl/nb, 2022-2023
======
*/

const child_process = require("child_process")

module.exports = function(file_path, callback, colors, cropSide) {
    let command = [
        `convert`,
        `"${file_path}${cropSide ? "[1]" : ""}"`,
        `+dither -colors ${colors || 32}`,
        `-define histogram:unique-colors=true`,
        `-format "%c" histogram:info:`,
        `| sort ${process.platform == "linux" ? "-n" : ""}`
    ]
    child_process.exec(command.join(" "), (error, stdout, stderr) => {
        let split_output = stdout.split("\n");
        let output = ""

        split_output.forEach(part => {
            if(part.length !== 0) {
                output = part;
            }
        })

        output = output.split("(")[1].split(")")[0].split(",")
        let finalOutput = []

        output.forEach((part) => {
            finalOutput.push(Math.floor(parseInt(part)))
        })

        callback(finalOutput)
    })
}