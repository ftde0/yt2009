FROM node:lts-alpine3.19
RUN apk add --no-cache imagemagick ffmpeg cabextract && \
    wget -P /tmp/ https://www.freedesktop.org/software/fontconfig/webfonts/webfonts.tar.gz && \
    tar -xzf /tmp/webfonts.tar.gz -C /tmp && \
    cabextract /tmp/msfonts/arial32.exe -d /tmp && \
    install -D -t /usr/share/fonts /tmp/Arial.TTF && \
    rm -rf /tmp/* && \
    fc-cache -f && \
    mkdir /data && \
    chown node /data

ADD --chown=node . /yt2009
WORKDIR /yt2009
USER node

RUN npm install
RUN node backend_wrap.js
ENV YT2009_PORT=80 \
    YT2009_ENV=dev \
    YT2009_IP=yt2009mobile.onrender.com \
    YT2009_SSL=false \
    YT2009_SSLPORT=443 \
    YT2009_SSLPATH=/yt2009/cert.crt \
    YT2009_SSLKEY=/yt2009/cert.key \
    YT2009_AUTO_MAINTAIN=false \
    YT2009_MAINTAIN_MAX_SIZE=10 \
    YT2009_MAINTAIN_MAX_CACHE_SIZE=15 \
	YT2009_FALLBACK=false \
	YT2009_DISABLEMASTER=false
    
RUN ln -s /data/config.json back/config.json && \
    ln -s /data/comments.json back/cache_dir/comments.json && \
    ln -s /data/accessdata back/accessdata && \
    echo "{\"env\": \"dev\"}" > back/config.json && \
    node post_config_setup.js

CMD ["node", "backend.js"]
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
