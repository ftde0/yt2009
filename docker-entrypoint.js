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

// set auto maintain
switch (process.env.YT2009_AUTO_MAINTAIN) {
    case 'true':
        cfg.auto_maintain = true;
        break;
    case 'false':
        cfg.auto_maintain = false;
        break;
    default:
        throw new Error('invalid YT2009_AUTO_MAINTAIN')
}

// set maintain max size
try {
    cfg.maintain_max_size = parseInt(process.env.YT2009_MAINTAIN_MAX_SIZE);
} catch {
    throw new Error('invalid YT2009_MAINTAIN_MAX_SIZE');
}

// set maintain max cache size
try {
    cfg.maintain_max_cache_size = parseInt(process.env.YT2009_MAINTAIN_MAX_CACHE_SIZE);
} catch {
    throw new Error('invalid YT2009_MAINTAIN_MAX_CACHE_SIZE');
}

// set env
if(process.env.YT2009_ENV === 'dev' || process.env.YT2009_ENV === 'prod') {
    cfg.env = process.env.YT2009_ENV;
} else {
    throw new Error('invalid YT2009_ENV')
}

// set ip
// no simple way to verify validity afaik, will need to trust the user on this one
if(process.env.YT2009_IP) {
    cfg.ip = process.env.YT2009_IP;
}

// set fallback
switch (process.env.YT2009_FALLBACK) {
    case 'true':
        cfg.fallbackMode = true;
        break;
    case 'false':
        cfg.fallbackMode = false;
        break;
    default:
        throw new Error('invalid YT2009_FALLBACK')
}

// set master server
if(process.env.YT2009_MASTERSERVER) {
    cfg.overrideMaster = process.env.YT2009_MASTERSERVER;
}

// set disable master server
switch (process.env.YT2009_DISABLEMASTER) {
    case 'true':
        cfg.disableWs = true;
        break;
    case 'false':
        cfg.disableWs = false;
        break;
    default:
        throw new Error('invalid YT2009_DISABLEMASTER')
}

// set locked tokens
if(process.env.YT2009_LOCKED_TOKENS) {
    cfg.templocked_tokens = process.env.YT2009_LOCKED_TOKENS.split(',');
}

// set logged tokens
if(process.env.YT2009_LOGGED_TOKENS) {
    cfg.logged_tokens = process.env.YT2009_LOGGED_TOKENS.split(',');
}

// set homepage text
if(process.env.YT2009_HOMEPAGETEXT) {
    cfg.customHomepageText = process.env.YT2009_HOMEPAGETEXT;
}

// set redir
if(process.env.YT2009_REDIR) {
    cfg.redirmode = process.env.YT2009_REDIR;
}

// set gdata auth requirement
switch (process.env.YT2009_GDATA_AUTH) {
    case 'true':
        cfg.gdata_auth = true;
        break;
    case 'false':
        cfg.gdata_auth = false;
        break;
    default:
        throw new Error('invalid YT2009_GDATA_AUTH')
}

// set reencode device list
if(process.env.YT2009_REENCODE_DEVS) {
    cfg.reencode_devs = process.env.YT2009_REENCODE_DEVS;
}

// set trustedcontext
switch (process.env.YT2009_TRUSTEDCONTEXT) {
    case 'true':
        cfg.trusted_context = true;
        break;
    case 'false':
        cfg.trusted_context = false;
        break;
}

// set trustedcontext override
if(process.env.YT2009_TCOVERRIDE) {
    cfg.tc_override_key = process.env.YT2009_TCOVERRIDE;
}

// set data api key
if(process.env.YT2009_DATA_API_KEY) {
    cfg.data_api_key = process.env.YT2009_DATA_API_KEY;
}

// set file upload limit
if(process.env.YT2009_FILE_LIMIT
&& !isNaN(parseInt(process.env.YT2009_FILE_LIMIT))) {
    cfg.file_limit = parseInt(process.env.YT2009_FILE_LIMIT);
}

// set defaultf
switch (process.env.YT2009_DEFAULTF) {
    case 'true':
        cfg.default_f = true;
        break;
    case 'false':
        cfg.default_f = false;
        break;
}

// set defaultfh264
switch (process.env.YT2009_DEFAULTFH264) {
    case 'true':
        cfg.default_fh264 = true;
        break;
    case 'false':
        cfg.default_fh264 = false;
        break;
}

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

// set ratelimit
try {
    cfg.ratelimit = parseInt(process.env.YT2009_RATELIMIT);
} catch {
    throw new Error('invalid YT2009_RATELIMIT');
}

// try to get tokens from env, if there's none then take get from old config and if no tokens are found then generate new ones
if (process.env.YT2009_TOKENS) {
    cfg.tokens = process.env.YT2009_TOKENS.split(',');
} else if (oldtokens) {
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
