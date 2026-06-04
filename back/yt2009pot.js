const fetch = require("node-fetch")
const crypto = require("crypto")
const pb = require("./proto/android_pot_pb")

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

            let encrypt = crypto.createCipheriv("aes-128-gcm", dgBoundKey, iv)
            potEncryptdata = Buffer.concat([
                encrypt.update(potEncryptdata),
                encrypt.final()
            ])
            potEncryptdata = Buffer.concat([
                keyId, iv, potEncryptdata, encrypt.getAuthTag()
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
            packagePot()
        })})
    }
}