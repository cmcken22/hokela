FROM node:12.14.0-alpine

ARG environment
ENV environment=${environment}
ENV PORT=3007
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /usr/src/app
COPY package.json ./

RUN apk update && apk upgrade && apk add --no-cache bash git openssh curl && \
    # apk add gunicorn &&\
    # ##### this will download the highest version of chromium-browser supported by alpine v3.10
    # echo "http://dl-cdn.alpinelinux.org/alpine/v3.10/community" >> /etc/apk/repositories \
    # && echo "http://dl-cdn.alpinelinux.org/alpine/v3.10/main" >> /etc/apk/repositories \
    # && echo "http://dl-cdn.alpinelinux.org/alpine/v3.10/testing" >> /etc/apk/repositories \
    # && apk --no-cache  update \
    # && apk --no-cache  upgrade \
    # && apk add --no-cache --virtual .build-deps gifsicle pngquant optipng libjpeg-turbo-utils udev ttf-opensans chromium \
    # && rm -rf /var/cache/apk/* /tmp/* && \
    # ###### end chromium install
    npm set progress=false && npm config set depth 0 && \
    npm i && npm cache clean --force

COPY . .

RUN ls

EXPOSE 3007
CMD [ "npm", "run", "start:prod" ]
