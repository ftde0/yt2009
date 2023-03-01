# yt2009
a fairly accurate 2009 youtube frontend.

---

## setup
- make sure you have [imagemagick](https://imagemagick.org/) and [ffmpeg](https://ffmpeg.org/) in your PATH.

### when installing imagemagick, make sure you also install its legacy tools (convert)! 

- install node.js
- open a terminal (windows powershell/cmd) in the directory you cloned yt2009 to, then:
- install required dependencies with: `npm install`
- create a config file by launching and following: `node yt2009setup.js`
- run to set and download remaining assets `node post_config_setup.js`
- run yt2009 by changing directory to `back` (`cd back`) and starting with `node backend.js`
- navigate to your IP:port you have set while configuring to see a 2009 homepage.

afterwards, you can just `cd back` and `node backend.js` to start. no need to re-set it up each time.

---

## optional after-setup steps

- patch the flash player(s) by following [flash_player_patch.md](flash_player_patch.md) and looking through [alt-swf/readme.md](alt-swf/readme.md)

---

## usage

now that you're in, you can just use it as it is, but there is quite a bit more you can do.

navigate to **/yt2009_flags.htm** to change settings locally. here, for example, you can set up The Wayback Machine as a video data source. but look through, there is a lot more.

navigate to **/relay** to create a connection between the remotely-hosted frontend and your actual yt account.

and just click around! you might find some useful features you didn't expect to work.

---

**over time, depending on your usage, yt2009 may take up a lot of space (counted in tens of gigabytes!)**

**if you need to reclaim space, look through the assets folder where downloaded files (such as images, videos) are saved and delete ones you need.**

**they will be redownloaded when necessary.**

---