const fetch = require("node-fetch")
const crypto = require("crypto")
const pb = require("./proto/android_pot_pb")
const net = require("net")
const testBackupProvider = false;

const poUrl = [
    "https://deviceintegritytokens-pa.googleapis.com/v1/getPoIntegrityToken",
    "?alt=proto&key=AIzaSyBtL0AK6Hzgr69rQyeyhi-V1lmtsPGZd1M"
].join("")
const poReq = require("fs").readFileSync("./proto/getpo_precoded")
const dgBoundKey = Buffer.from([
    186,52,66,247,241,24,52,242,152,147,243,210,95,138,64,215
])
const keyId = Buffer.from("010e016edd", "hex")
const iv = Buffer.from([1,1,1,1,1,1,1,1,1,1,1,1])
const youtubeSig = Buffer.from(
    `3d7a1223019aa39d9ea0e3436ab7c0896bfb4fb679f4de5fe7c23f326c8f994a`, "hex"
)
const youtubePkgname = "com.google.android.youtube"
let resp = null;
let overridenKeyId = null;
let overridenKey = null;

module.exports = {
    "generatePo": function(visitor, callback, canUseExistingChallenge) {
        function packagePot() {
            if(!resp) {
                // disabled potgen
                callback({
                    "encryptData": Buffer.from([1]),
                    "backup": Buffer.from([1]),
                    "valid": 86400
                })
                return;
            }
            let potDescriptorToken = resp.desc;
            if(typeof(potDescriptorToken) == "string") {
                potDescriptorToken = Buffer.from(resp.desc, "base64")
            }
            let potBackup = resp.backup;
            if(typeof(potBackup) == "string") {
                potBackup = Buffer.from(resp.backup, "base64")
            }
            let potEncryptdata = new pb.potDescriptor()
            potEncryptdata.setTime(26)
            potEncryptdata.setInput(visitor)
            potEncryptdata.setPkgname(youtubePkgname)
            potEncryptdata.setPkgsignature(youtubeSig)
            potEncryptdata.setToken(potDescriptorToken)
            potEncryptdata = Buffer.from(potEncryptdata.serializeBinary())

            let encrypt = crypto.createCipheriv(
                "aes-128-gcm", (overridenKey || dgBoundKey), iv
            )
            potEncryptdata = Buffer.concat([
                encrypt.update(potEncryptdata),
                encrypt.final()
            ])
            potEncryptdata = Buffer.concat([
                (overridenKeyId || keyId), iv,
                potEncryptdata, encrypt.getAuthTag()
            ])
            callback({
                "encryptData": potEncryptdata,
                "backup": potBackup,
                "valid": resp.time || 7200
            })
        }
        if(canUseExistingChallenge) {
            packagePot()
            return;
        }
        fetch(poUrl, {
            "method": "POST",
            "headers": {
                "content-type": "application/x-protobuf",
                "user-agent": "com.google.android.gms/262031016 (Linux; U; Android 10; en_US; Android SDK built for x86; Build/QSR1.190920.001; Cronet/148.0.7778.120)"
            },
            "body": poReq
        }).then(r => {r.buffer().then(d => {
            resp = pb.potResponse.deserializeBinary(d).toObject()
            if(!resp || !resp.time || d.length == 0 || testBackupProvider) {
                // something went wrong with the response, try backup provider
                console.log("using backup po provider")
                let c = net.connect(7077, "46.62.131.50")
                c.on("connect", (cs) => {
                    c.write("pbr\x00")
                })
                c.on("data", (d) => {
                    d = d.toString().split("pbrk--")[1]
                    overridenKey = Buffer.from(d.substring(0,32), "hex")
                    overridenKeyId = Buffer.from(d.substring(32,42), "hex")
                    let valid = parseInt(
                        Buffer.from(d.substring(d.length - 26), "hex").toString()
                    )
                    let isOk = parseInt(
                        d.substring(d.length - 27, d.length - 26)
                    )
                    if(!isOk) {
                        console.log("[!] backup po provider marked not ok")
                    }
                    resp = pb.potResponse.deserializeBinary(
                        Buffer.from(d.substring(42,d.length - 27), "hex")
                    ).toObject()
                    resp.time = Math.floor((valid - Date.now()) / 1000)
                    packagePot()
                })
                return;
            }
            overridenKey = null;
            overridenKeyId = null;
            packagePot()
        })})
    }
}