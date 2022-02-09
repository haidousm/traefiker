FROM node:alpine as build
WORKDIR /src/app
COPY . .
RUN yarn install && yarn gen-keys

FROM node:alpine
LABEL Maintainer="Moussa Haidous <haidous.m@gmail.com>"
LABEL Description=""
WORKDIR /src/app
COPY --from=build /src/app .

ENV NODE_ENV production
ENV PORT 8010

ENV MONGO_URI mongodb://localhost:27017/traefiker

CMD ["yarn", "start"]

EXPOSE $PORT