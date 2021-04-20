FROM node:12.14.0-alpine AS BUILD_IMAGE
ARG environment
ENV environment=${environment}
ENV PORT=8080

RUN mkdir -p ~/test
ADD . ~/test

WORKDIR /usr/src/app/test
# WORKDIR /usr/src/app

COPY package.json ./
COPY .dockerignore ./

# install dependencies
RUN npm set progress=false && npm config set depth 0 && \
    npm i --production && npm cache clean --force

COPY . .

# build application
CMD [ "npm", "run", "start:build" ]

FROM node:12.14.0-alpine

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/test /app/

EXPOSE $PORT
CMD [ "npm", "run", "start:prod2" ]

# ////////////////////////////////

# FROM node:12.14.0-alpine

# ARG environment
# ENV environment=${environment}
# ENV PORT=8080
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# WORKDIR /usr/src/app
# COPY package.json ./
# COPY .dockerignore ./

# RUN npm set progress=false && npm config set depth 0 && \
#     npm i --production && npm cache clean --force
#     # apk update && apk upgrade && apk add --no-cache bash git openssh curl && \
#     # apk add gunicorn &&\
#     # ##### this will download the highest version of chromium-browser supported by alpine v3.10
#     # echo "http://dl-cdn.alpinelinux.org/alpine/v3.10/community" >> /etc/apk/repositories \
#     # && echo "http://dl-cdn.alpinelinux.org/alpine/v3.10/main" >> /etc/apk/repositories \
#     # && echo "http://dl-cdn.alpinelinux.org/alpine/v3.10/testing" >> /etc/apk/repositories \
#     # && apk --no-cache  update \
#     # && apk --no-cache  upgrade \
#     # && apk add --no-cache --virtual .build-deps gifsicle pngquant optipng libjpeg-turbo-utils udev ttf-opensans chromium \
#     # && rm -rf /var/cache/apk/* /tmp/* && \
#     # ###### end chromium install
#     # npm set progress=false && npm config set depth 0 && \
#     # npm i && npm cache clean --force

# COPY . .

# RUN ls

# EXPOSE $PORT
# CMD [ "npm", "run", "start:prod" ]
