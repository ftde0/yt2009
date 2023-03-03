# alt-swf

alt-swf is a directory where alternative flash player SWFs are stored for /toggle_f on yt2009.

if you see some SWFs here (as of 2023-02-24 they are there, they may or may not stay), they most likely need repatching. follow **flash_player_patch.md** in root.

otherwise, here are the filenames and SWFs to be downloaded from Wayback Machine to be repatched (again, with **flash_player_patch.md**).

|swf filename|link|description|
|--------|--|--|
|2006.swf|[player2.swf](https://web.archive.org/web/20070116122143/youtube.com/player2.swf)|a standard late-2006-2007 video player.
|2007ad.swf|[admp.swf](https://web.archive.org/web/20070219063115/youtube.com/admp.swf)|the flash player used in homepage video ads in 2007.
|2010.swf|[watch_as3-vfljymfvU.swf](http://web.archive.org/web/20101001010932/https://s.ytimg.com/yt/swf/watch_as3-vfljymfvU.swf)|the standard late-2010 video player
|2012.swf|[watch_as3-vflJogbdx.swf](http://web.archive.org/web/20120705001433/https://s.ytimg.com/yt/swfbin/watch_as3-vflJogbdx.swf)|the standard 2012 video player
|e2006.swf|[player2.swf](http://web.archive.org/web/20060706195428if_/http://youtube.com:80/player2.swf)|an early-mid 2006 player.
|cpb.swf|[cpb-vflzG1o7y.swf](http://web.archive.org/web/20101222144444/s.ytimg.com/yt/swfbin/cpb-vflzG1o7y.swf)|embedded playlist player linked by the playlist view page. (when patching, also change the gdata base url!!)
|cps.swf|[cps-vfl_gIfdw.swf](http://web.archive.org/web/20120427131527if_/http://s.ytimg.com/yt/swfbin/cps-vfl_gIfdw.swf)|player with built-in search. used as a fallback in some years. (also change gdata base url!)
---
## bonus: find your own!

if you have way too much time, feel free to look through the Wayback Machine and find some interesting players!

here are some resources to help you do so:

- [s.ytimg.com/yt/swf/ files (2007-late2010)](https://web.archive.org/web/*/http://s.ytimg.com/yt/swf/*)
- [s.ytimg.com/yt/swfbin/ files](https://web.archive.org/web/*/http://s.ytimg.com/yt/swfbin/*)
- when looking through pages like /watch on Wayback Machine, view the page source to get its .swf file links