# CMD [ "npm", "run", "dev" ]

# FROM node:12.8.0-alpine

# ARG environment
# ENV environment=${environment}
# ENV PORT=3007
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# WORKDIR /usr/src/app
# COPY package.json ./

# RUN apk update && apk upgrade && apk add --no-cache bash git openssh curl &&\
#     echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
#     echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
#     apk add --no-cache chromium@edge nss@edge harfbuzz@edge freetype@edge ttf-freefont@edge &&\
#     npm set progress=false && npm config set depth 0 &&\
#     npm i && npm cache clean --force

# COPY . .
# #RUN rm -rf .env
# #RUN echo "copying ./config/.env-${environment}"
# #RUN cp -rf ./config/.env-${environment} .env

# RUN ls
# # RUN rm package-lock.json && npm i

# EXPOSE 3007
# CMD [ "npm", "run", "start:prod" ]

# FROM node:12.13.0-alpine
# ARG VCS_REF
# ARG BUILD_DATE
# ARG IMAGE_TAG_REF
# ENV GIT_SHA $VCS_REF
# ENV IMAGE_BUILD_DATE $BUILD_DATE
# ENV IMAGE_TAG $IMAGE_TAG_REF

# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run start:prod
# RUN apk --no-cache add curl
# EXPOSE 12000
# CMD [ "npm", "run", "start:prod" ]

FROM node:12.14.0-alpine

ARG environment
ENV environment=${environment}
ENV PORT=3001
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /usr/src/app
COPY package.json ./

RUN apk update && apk upgrade && apk add --no-cache bash git openssh curl &&\
    # apk add samba-client &&\
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
#RUN rm -rf .env
#RUN echo "copying ./config/.env-${environment}"
#RUN cp -rf ./config/.env-${environment} .env

RUN ls
# RUN rm package-lock.json && npm i

EXPOSE 3007
CMD [ "npm", "run", "start:prod" ]
