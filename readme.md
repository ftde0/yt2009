# yt2009
a fairly accurate 2009 youtube frontend with account features.

<img src="doc-imgs/ie6-ss.png" width="400">
<img src="doc-imgs/ie6-ss2.png" width="400">

---

## thank you to yt2009's top tier monthly sponsors!

- [Szprinktrap](https://github.com/Szprinktrap)
- [RF7391](https://github.com/RF7391)

for $5/month, you can also join this list! --> https://github.com/sponsors/ftde0

---

## setup
### if you prefer using docker rather than installing directly, go [here](docker.md) for setup instructions instead
### if hosting on windows xp, follow [xp specific instructions](windowsxp.md) instead.

- **make sure you have [imagemagick](https://imagemagick.org/) and [ffmpeg](https://ffmpeg.org/) in your PATH.**

- install node.js (git is heavily recommeded as well)
- open a terminal (windows powershell/cmd) in the directory you `git clone`d yt2009 to, then:
- install required dependencies with: `npm install`
- create a config file by launching and following: `node yt2009setup.js`
- run to set and download remaining assets `node post_config_setup.js`
- run yt2009 by changing directory to `back` (`cd back`) and starting with `node backend.js`
- navigate to your IP:port you have set while configuring to see a 2009 homepage.

afterwards, you can just `cd back` and `node backend.js` to start. no need to re-set it up each time.

---

it is highly recommended to add a google data api v3 key to ensure all video data is shown correctly.

you will also be notified about that when starting the frontend without one set.

more info in [config_params.md](config_params.md) / [docker.md](docker.md). obtain a key at https://console.developers.google.com/.

---

if you get error with lines like this below:
```
npm ERR! code ENOENT
npm ERR! syscall spawn git
```

the proper way to fix is to install [git](https://git-scm.com/) and set up yt2009 that way.
this will save you a lot of trouble later on.

if you - for whatever reason - cannot use git, refer to the `gitless` section in windows 7 part below.

## !! if hosting on windows 7 !!

the last version of node.js supported on windows 7 doesn't support latest versions of packages, so you need to install older ones to run on windows 7.

git:
```
npm install express@4.17.1 google-protobuf@3.21.2 git+https://github.com/ftde0/node-maxmind-db.git node-fetch@2.6.7 node-html-parser@5.3.3 readline-sync ws
```
gitless **(heavily not recommended)**:
```
npm install express@4.17.1 google-protobuf@3.21.2 maxmind-db-reader node-fetch@2.6.7 node-html-parser@5.3.3 readline-sync ws
```

([#243](https://github.com/ftde0/yt2009/issues/243)).

## updating

if you want to update your frontend instance, use

```
git pull --no-commit
```

to get you up with updates you may have missed.

if you modified the code yourself and you're getting a merge conflict, restore the orignal using
```
git restore <file>
```

you can make a copy of your modified file and reapply the mod after the pull is done.

---

## usage

now that you're in, you can just use it as it is, but there is a bit more you can do.

navigate to **/flags** to change settings locally. here, for example, you can set up The Wayback Machine as a video data source. but look through, there is a lot more.

feel free to nav to **/toggle_f** to enable flash player support for old browsers, such as ie6.

sign in! click on the upload button or go to **/mh_pc_intro** to connect and interact with your **actual** youtube account.

<img src="doc-imgs/signin-hppng.png" width="400">
<img src="doc-imgs/signin-vidmngr.png" width="400">

---

**over time, depending on your usage, yt2009 may take up a lot of space (counted in tens of gigabytes!)**

**if you need to reclaim space, look through the assets folder where downloaded files (such as images, videos) are saved and delete ones you need.**

**they will be redownloaded when necessary.**

alternatively, set up auto_maintain as described in yt2009setup to handle this for you.

---

## notes, docs

over time some tools and documentation was written about yt2009. for an easy reference, those are listed below.

- [apk_setup.md](apk_setup.md) - set early youtube android APKs to work with yt2009
- [config_params.md](config_params.md) - a list of ALL available config options.
- [docker.md](docker.md) - yt2009 setup with docker. also listed in the setup section. (thanks, breakgimme!)
- [flash_additions.md](flash_additions.md) - some info on caption and annotations modules within the default 2009 flash player.
- [flash_player_setup.md](flash_player_setup.md) - manual info for preparing vanilla flash players for use with yt2009.