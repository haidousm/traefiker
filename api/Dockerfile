FROM node:alpine as build
WORKDIR /src/app
COPY . .
RUN yarn install

FROM mhart/alpine-node:16
LABEL Maintainer="Moussa Haidous <haidous.m@gmail.com>"
LABEL Description=""
WORKDIR /src/app
COPY --from=build /src/app .

ENV NODE_ENV production
ENV PORT 8010

ENV MONGO_URI mongodb://localhost:27017/

CMD ["yarn", "start"]

EXPOSE $PORT