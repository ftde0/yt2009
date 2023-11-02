FROM node:lts-alpine3.18
RUN apk add --no-cache imagemagick ffmpeg

ADD --chown=node . /yt2009
WORKDIR /yt2009
USER node

RUN npm install
ENV YT2009_PORT=80 \
    YT2009_ENV=dev \
    YT2009_IP=127.0.0.1 \
    YT2009_SSL=false \
    YT2009_SSLPORT=443 \
    YT2009_SSLPATH=/yt2009/cert.crt \
    YT2009_SSLKEY=/yt2009/cert.key

RUN echo "{\"env\": \"dev\"}" > back/config.json
RUN node post_config_setup.js

CMD ["node", "backend.js"]
ENTRYPOINT ["sh", "docker-entrypoint.sh"]