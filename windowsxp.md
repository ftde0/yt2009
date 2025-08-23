# hosting yt2009 on windows xp

as of yt2009 version 1.23.1, tests were done and patches were made to support hosting on windows xp,

to the best of its abilities.

**note that main "old" test version is node v14, and out-of-the-box compatibility limits to node v10 and above.**

**valid issues will be accepted but will not be of high priority. issues about caveats (see down this page) will NOT be addressed.**

## prerequisites:

- root certificates for HTTPS connections -- https://github.com/JohnTHaller/RootCertificateUpdatesForLegacyWindows
- node v5.12.0 -- https://nodejs.org/download/release/v5.12.0/node-v5.12.0-x86.msi
- ffmpeg -- https://sourceforge.net/projects/xpitory/files/ffmpeg/ffmpeg-3.4.1.7z/download (see **adding to PATH** section below)
- magick -- http://archive.org/download/imagemagick-winxp/ImageMagick-6.9.11-19-Q8-x86-dll.exe (while installing, only have the PATH checkbox checked)

## adding to PATH

as is the case with `ffmpeg`, or should you use any other binaries of required tools that don't ship with an installer, you must add them to your system's PATH environment variable.

as of windows xp SP3:
- open start menu, right click on `My Computer`, followed by `Properties`
- open the `Advanced` tab, and click `Environment Variables`
- depending on your setup, find the `PATH` variable in `User variables` or `System variables` and edit it.
- within the `Variable value` textbox, add a `;` if there isn't one already at the end, and paste your **full** path where your binaries are.
- press OK on all the popups, close the Properties window.
- restart any CMD windows you might have had open for them to apply your new PATH.

## install steps

- download the yt2009 code
- open a CMD window and navigate it to the directory with all yt2009 files:
```
cd "your_full_yt2009_path"
```
- run these 2 commands to apply patches for older versions of dependencies and code:
```
node strictifier.js
node convertify.js
```
**[!] these commands make significant code changes which will most likely mess with git, if you cloned the repository that way.**
- install dependencies (old versions supported on xp):
```
npm install express@4.17.1 google-protobuf@3.21.2 maxmind-db-reader node-fetch@2.0.0 node-html-parser@5.3.3 readline-sync ws@1.1.1
```
- proceed with the setup as usual:
```
node yt2009setup.js
node post_config_setup.js
cd back
node backend.js
```

## caveats

yt2009 will detect unsupported versions of node and apply appropriate patches.

features affected simply cannot fully work on these old node versions with the way current-day youtube handles them.

- **360p video only**
- mobilehelper & pchelper severely disfunctional
- sync server connection may not work properly
- sabr streaming disabled