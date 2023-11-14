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
- `YT2009_SSL` allows you to enable built-in SSL support, **requires prod env to work!** (default: `false`)
- `YT2009_SSLPORT` sets the HTTPS port (default: `443`)
- `YT2009_SSLPATH` sets the path for the SSL certificate (default: `/yt2009/cert.crt`)
- `YT2009_SSLKEY` sets the path for the SSL certificate private key (default: `/yt2009/cert.key`)

## troubleshooting
#### reading auth tokens from a running container

auth tokens are located in `/yt2009/back/config.json`, you can use this command to read them: `docker exec [container name] cat /yt2009/back/config.json`

#### persistence

if you want your data to be saved when the container is removed, mount `/data` to a directory or volume

for example: `docker run --rm -p 80:80 -v ~/yt2009data:/data -e YT2009_ENV=prod yt2009`