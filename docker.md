# Docker
## basic setup (tldr)
if all you need is a simple dev/testing environment, follow these steps
- clone the repo
- run `docker build -t yt2009 .`
- after the build finishes, run `docker run -it -p 8080:80 yt2009`
- navigate to http://127.0.0.1:8080

---

## environment variables
the yt2009 container is configured by using the following environment variables:
- `YT2009_PORT` sets the HTTP port (default: `80`)
- `YT2009_ENV` sets the usage environment, dev is used for development purposes, prod is designed for production, adds an authentication system and is needed if you want to use the built-in SSL support (default: `dev`)
- `YT2009_IP` sets the IP/Hostname used that will be used to connect to yt2009, is required for legacy stuff where it has to be hardcoded (default: `127.0.0.1`)

**for YT2009_IP, if you intend to use things like the mobile app, make sure to set it to an address those devices can access!**

**you're most likely looking at using your public IP provided you can port forward.**

- `YT2009_SSL` allows you to enable built-in SSL support, **requires prod env to work!** (default: `false`)
- `YT2009_SSLPORT` sets the HTTPS port (default: `443`)
- `YT2009_SSLPATH` sets the path for the SSL certificate (default: `/yt2009/cert.crt` which is linked to `/data/cert.crt` so you can use either)
- `YT2009_SSLKEY` sets the path for the SSL certificate private key (default: `/yt2009/cert.key` which is linked to `/data/cert.key` so you can use either)
- `YT2009_AUTO_MAINTAIN` sets whether to enable automatic instance cleaning (default: false)
- `YT2009_MAINTAIN_MAX_SIZE` sets the maximum assets folder size in GB, works with auto_maintain (default: 10)
- `YT2009_MAINTAIN_MAX_CACHE_SIZE` sets the maximum cache file size in MB, works with auto_maintain (default: 15)
- `YT2009_FALLBACK` sets fallback mode, doesn't use the saved cache, shows a fallback notice on homepage, deprecated (default: false)
- `YT2009_MASTERSERVER` sets a different master server for comments/video sync, leave empty to disable
- `YT2009_DISABLEMASTER` sets whether any master server will be used (default: false)
- `YT2009_LOCKED_TOKENS` sets access tokens that will be redirected to /t.htm, seperated by commas, leave empty to disable
- `YT2009_HOMEPAGETEXT` sets a custom text that will be shown on the homepage, leave empty to disable
- `YT2009_REDIR` sets an absolute http path of a different yt2009 instance you wish to redirect to, leave empty to disable
- `YT2009_LOGGED_TOKENS` sets tokens that have their usage logged in `/data/accessdata`, seperated by commas, leave empty to disable
- `YT2009_TOKENS` allows you to specify custom auth tokens instead of generating them randomly, **requires prod env to work!**, seperated by commas, leave empty to disable, **this will override any existing access tokens when used!!!**
- `YT2009_RATELIMIT` sets a number of web fetch (watch, search etc) requests one ipv4 address/one ipv6 block can make in a minute
- `YT2009_AC` sets whether to suppress errors that would normally crash yt2009 (default: `false`)
- `YT2009_GDATA_AUTH` allows you to enable token-based authorization for the gdata api (e.g. mobile apps) (default: `false`)

## troubleshooting
#### reading auth tokens from a running container

auth tokens are located in `/yt2009/back/config.json`, you can use this command to read them: `docker exec [container name] cat /yt2009/back/config.json`

#### persistence

if you want your data to be saved when the container is removed, mount `/data` to a directory or volume

for example: `docker run --rm -p 80:80 -v ~/yt2009data:/data -e YT2009_ENV=prod yt2009`
