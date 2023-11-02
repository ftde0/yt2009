const fs = require('fs');
let cfg = {};
let tokensCount = 25;
// try get tokens from old config
try {
    var oldtokens = require('./back/config.json').tokens;
} catch {}


// generate config using env

// set port
try {
    cfg.port = parseInt(process.env.YT2009_PORT);
} catch {
    throw new Error('invalid YT2009_PORT');
}

// set env
if(process.env.YT2009_ENV === 'dev' || process.env.YT2009_ENV === 'prod') {
    cfg.env = process.env.YT2009_ENV;
} else {
    throw new Error('invalid YT2009_ENV')
}

// set ip
// no simple way to verify validity afaik, will need to trust the user on this one
cfg.ip = process.env.YT2009_IP;

// set ssl
switch (process.env.YT2009_SSL) {
    case 'true':
        cfg.useSSL = true;
        break;
    case 'false':
        cfg.useSSL = false;
        break;
    default:
        throw new Error('invalid YT2009_SSL')
}

if (cfg.useSSL) {
    try {
        cfg.SSLPort = parseInt(process.env.YT2009_SSLPORT);
    } catch {
        throw new Error('invalid YT2009_SSLPORT');
    }
    cfg.SSLCertPath = process.env.YT2009_SSLPATH;
    cfg.SSLKeyPath = process.env.YT2009_SSLKEY;
    // check if ssl files exist
    if (!fs.existsSync(cfg.SSLCertPath) || !fs.existsSync(cfg.SSLKeyPath)) {
        throw new Error('no ssl cert/key provided')
    }
}

// try to get tokens from old config and if no tokens are found then generate new ones
if (oldtokens) {
    cfg.tokens = oldtokens;
} else {
    // code taken from post_config_setup.js
    if(cfg.env == "prod"
    && !cfg.tokens) {
        console.log("environment set to prod but no tokens. generating!!")
        let tokens = []
        while(tokens.length !== tokensCount) {
            let token = ""
            while(token.length !== 9) {
                token += "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
                    [Math.floor(Math.random() * 36)]
            }
            tokens.push(token)
        }
        cfg.tokens = tokens
    }   
};

fs.writeFileSync(`${__dirname}/back/config.json`, JSON.stringify(cfg))