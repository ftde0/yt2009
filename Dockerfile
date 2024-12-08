FROM node:lts-alpine3.20
RUN apk add --no-cache imagemagick cabextract && \
    wget -P /tmp/ https://www.freedesktop.org/software/fontconfig/webfonts/webfonts.tar.gz && \
    tar -xzf /tmp/webfonts.tar.gz -C /tmp && \
    cabextract /tmp/msfonts/arial32.exe -d /tmp && \
    apk del cabextract && \
    install -D -t /usr/share/fonts /tmp/Arial.TTF && \
    rm -rf /tmp/* && \
    fc-cache -f && \
    mkdir /data && \
    chown node /data

COPY --from=mwader/static-ffmpeg:7.0.2 /ffmpeg /usr/local/bin/

ADD --chown=node . /yt2009
WORKDIR /yt2009
USER node

# PLEASE READ THIS IT WILL SAVE YOU MUCH HASSLE
# don't modify the environment variables here if you're hosting, those are the defaults and are not supposed to be changed unless you're a developer
# you can instead set them when launching the container, this way you don't have to fork the repo or rebuild the container every time you want to change something
# if someone has told you to do modify them here please ignore their advice and tell them they're wrong
ENV YT2009_PORT=80 \
    YT2009_ENV=dev \
    YT2009_IP=127.0.0.1 \
    YT2009_SSL=false \
    YT2009_SSLPORT=443 \
    YT2009_SSLPATH=/yt2009/cert.crt \
    YT2009_SSLKEY=/yt2009/cert.key \
    YT2009_AUTO_MAINTAIN=false \
    YT2009_MAINTAIN_MAX_SIZE=10 \
    YT2009_MAINTAIN_MAX_CACHE_SIZE=15 \
    YT2009_FALLBACK=false \
    YT2009_DISABLEMASTER=false \
    YT2009_RATELIMIT=false \
    YT2009_AC=false \
    YT2009_GDATA_AUTH=false

RUN npm install && \
    ln -s /data/androiddata.json back/androiddata.json && \
    ln -s /data/tvdata.json back/tvdata.json && \
    ln -s /data/config.json back/config.json && \
    ln -s /data/mobilehelper_userdata.json back/mobilehelper_userdata.json && \
    ln -s /data/comments.json back/cache_dir/comments.json && \
    ln -s /data/accessdata back/accessdata && \
    ln -s /data/cert.crt cert.crt && \
    ln -s /data/cert.key cert.key && \
    echo "{\"env\": \"dev\"}" > back/config.json && \
    node post_config_setup.js

CMD ["node", "backend.js"]
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
