const fs = require("fs")
const readline = require("readline-sync")
let cfg = {}

console.log(`


[yt2009] yt2009 setup`)


// port
let port;
while(isNaN(parseInt(port))) {
    port = parseInt(
        readline.question("\nwhat port should yt2009 run on? ")
    )
}
cfg.port = port;

// usage environment
let env = ""
console.log(`
what environment should be used? (dev/prod)
dev:
- logs usage in terminal
- doesn't require access tokens
- no possibility of creating an ssl version
prod:
- doesn't log normal activity
- if enabled, will create a bunch of random tokens users will have to enter to use
- will be possible to create an ssl version on a separate port`)
while(env !== "dev" && env !== "prod") {
    env = readline.question("environment (dev/prod): ")
}
cfg.env = env;

// ip
let ip = ""
console.log(`
what IP should be used where it needs to be coded in?
(eg. the flash player related)
preferably use your IP you will use to connect to yt2009. localhost/127.0.0.1
isn't recommended because it may break as soon as you use a different pc.`)
ip = readline.question("IP address: ")
cfg.ip = ip;

// prod-only
if(env == "prod") {
    // SSL
    cfg.useSSL = false;

    console.log(`
since you chose your environment as prod,
do you want to use SSL on a second port?`)
    let rawSSlResponse = ""
    while(rawSSlResponse !== "n"
    && rawSSlResponse !== "y") {
        rawSSlResponse = readline.question("use SSL? (y/n): ")
    }
    if(rawSSlResponse.toLowerCase() == "y") {
        cfg.useSSL = true;

        // SSL file paths and port
        cfg.SSLCertPath = readline.question(
            "\nspecify an absolute path to your ssl **certificate**.: "
        )
        cfg.SSLKeyPath = readline.question(
            "\nspecify an absolute path to your ssl **private key**.: "
        )
        while(isNaN(parseInt(cfg.SSLPort))
        || cfg.port == cfg.SSLPort) {
            cfg.SSLPort = readline.question(
                "\nspecify a different port for the SSL yt2009 version: "
            )
        }
    }

    // tokens
    let rawTokens = ""
    while(rawTokens !== "n"
    && rawTokens !== "y") {
        rawTokens = readline.question(
            "\n\ndisable tokens requirement? will set tokens as [\"*\"]. (y/n): "
        ).toLowerCase()
        if(rawTokens == "y") {
            cfg.tokens = ["*"]
        }
    }
}

// confirmation
console.log(`
writing configuration to back/config.json.
you can always rerun this setup in the future to make changes.
`)
fs.writeFileSync(`${__dirname}/back/config.json`, JSON.stringify(cfg))
console.log(`
if this is your first time setting up yt2009 in this directory,
make sure to run
======
node post_config_setup.js
=====
for the next part.
`)