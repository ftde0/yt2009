/*
======
wykrywanie domyślnego awatara losowo generowanego po stronie yt.
return true/false.


torl/nb 2022
======
*/

const child_process = require("child_process")

module.exports = function(file_path) {
    let result = false;
    let command = [
        "convert",
        `"${file_path}"`,
        "+dither",
        "-colors 2",
        "-define histogram:unique-colors=true",
        "-format \"%c\"",
        "histogram:info:"
    ]
    let stdout = child_process.execSync(
        command.join(" ")
        + ` | sort ${process.platform == "linux" ? "-n" : ""}`
    ).toString()
    let split_output = stdout.split("\n")[0];
    try {
        let rgb = split_output.split("(")[1].split(")")[0].split(",")
        if(parseInt(rgb[0]) >= 190 &&
        parseInt(rgb[1]) >= 190 &&
        parseInt(rgb[2]) >= 190) {
            result = true;
        }
    }
    catch(error) {
        result = false;
    }
    return result;
}