FROM node:17-alpine3.12
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="helps you set up docker containers with traefik"
LABEL version="1.0.0"

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build-css
RUN apk add --update docker openrc
RUN rc-update add docker boot
RUN apk add docker-compose
EXPOSE 8080
CMD ["npm", "start"]