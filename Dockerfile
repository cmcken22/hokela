# FROM node:12.14.0-alpine AS BUILD_IMAGE
# ARG environment
# ENV environment=${environment}
# ENV PORT=8080

# RUN mkdir -p ~/test
# ADD . ~/test

# WORKDIR /usr/src/app/test
# # WORKDIR /usr/src/app

# COPY package.json ./
# COPY .dockerignore ./

# # install dependencies
# RUN npm set progress=false && npm config set depth 0 && \
#     npm i --production && npm cache clean --force

# COPY . .

# # build application
# CMD [ "npm", "run", "start:build" ]

# FROM node:12.14.0-alpine

# WORKDIR /app

# # copy from build image
# COPY --from=BUILD_IMAGE /usr/src/app/test /app/

# EXPOSE $PORT
# CMD [ "npm", "run", "start:prod2" ]

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

# ////////////////////////////////

# FROM node:lts-alpine@sha256:ed51af876dd7932ce5c1e3b16c2e83a3f58419d824e366de1f7b00f40c848c40 as BUILD
# FROM node:12.14.0-alpine as BUILD

# # RUN apk update && apk upgrade && apk add --no-cache bash git openssh curl

# # couchbase sdk requirements
# RUN apk update && apk add yarn curl bash python g++ make && rm -rf /var/cache/apk/*

# # install node-prune (https://github.com/tj/node-prune)
# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

FROM node:14-alpine as BUILD

# Add dependencies
RUN apk add curl bash --no-cache

# Install node-prune
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

RUN mkdir ~build
WORKDIR /usr/src/build
RUN ls -1
COPY package.json ./
COPY .dockerignore ./
RUN ls -1

RUN npm install

COPY . /usr/src/build
CMD [ "npm", "run", "start:build" ]

# RUN rm -rf node_modules
# RUN npm install --production --no-optional
RUN npm prune --production && node-prune
# RUN node-prune

# RUN ls -1 /usr/src/build/public
# ///////////

# FROM node:lts-alpine@sha256:ed51af876dd7932ce5c1e3b16c2e83a3f58419d824e366de1f7b00f40c848c40 as INTERMEDIATE
# FROM node:12.14.0-alpine as INTERMEDIATE

# RUN mkdir ~temp
# WORKDIR /usr/src/temp

# WORKDIR /usr/src/temp
# COPY --from=BUILD /usr/src/build /usr/src/temp
# RUN npm install --production --no-optional
# RUN npm prune --production && node-prune
# remove development dependencies
# RUN npm prune --production
# # run node prune
# RUN /usr/local/bin/node-prune
# ///////////

FROM node:12.14.0-alpine as FINAL
# FROM gcr.io/distroless/nodejs as FINAL
# FROM scratch as FINAL

ARG environment
ENV environment=${environment}
ENV PORT=8080

WORKDIR /usr/src/app
COPY --from=BUILD /usr/src/build /usr/src/app

EXPOSE $PORT
# RUN chmod 755 /usr/src/app/server
CMD [ "npm", "run", "start:prod2" ]
# CMD [ "server/index.js" ]