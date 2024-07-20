# config.json

as part of the setup process, yt2009 will write a file called `config.json` inside the `back` directory.

inside you will find the properties you have set up using yt2009setup.js:

- `port` - the port HTTP yt2009 will use
- `env` - the environment (dev/prod)
- `useSSL` - whether SSL (https) is used
- `SSLCertPath` - SSL cert
- `SSLKeyPath` - SSL private key
- `SSLPort` - the port HTTP**s** yt2009 will use
- `ip` - the IP address used for paths that need to have it hardcoded (e.g. gdata endpoints)
- `auto_maintain` - automatically maintains space used by yt2009. toggle false: `true/false`.
- `maintain_max_size` - max size of the /assets/ folder - number in GB. to be set with `auto_maintain`.
- `maintain_max_cache_size` - max size per cache file - number in MB. to be set with `auto_maintain`.

other params you can set:

- `tokens` - an array of access tokens required to access if prod is used
- `fallbackMode` - doesn't use the saved cache, shows a fallback notice on homepage. deprecated
- `overrideMaster` - use a different master server for comments/video sync
- `disableWs` - disable the use of a master server altogether
- `templocked_tokens` - an array of access tokens that will be redirected to /t.htm
- `customHomepageText` - a custom text that will be shown on the homepage
- `redirmode` - an **absolute** http path of a different yt2009 instance you wish to redirect to
- `logged_tokens` - an array of access tokens that will have their usage logged in `accessdata`.
- `ratelimit` - a number of web fetch requests one ipv4 address/one ipv6 block can make in 1 minute.
- `ac` - suppress errors that would normally crash yt2009. `true/false`
- `gdata_auth` - require token-based authorization for gdata api (e.g. mobile apps). `true/false`