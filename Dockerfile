FROM yobasystems/alpine-docker
LABEL Maintainer="Moussa Haidous <moussa@haidousm.com>"
LABEL Description="helps you set up docker containers with traefik"
LABEL version="1.0.0"

WORKDIR /usr/src/app
COPY . . 
RUN apk add --update nodejs yarn docker-compose
RUN yarn install && yarn build-css
EXPOSE 8080
CMD ["yarn", "start"]