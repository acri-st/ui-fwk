FROM hoosin/alpine-nginx-nodejs
LABEL maintainer="ACRI ST"

RUN apk update && \
    apk add --no-cache inotify-tools

EXPOSE 8200


WORKDIR /frontend/
ENTRYPOINT sh ./entrypoint.sh
