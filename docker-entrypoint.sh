#!/bin/sh
set -e
node docker-entrypoint.js
cd back
$@
