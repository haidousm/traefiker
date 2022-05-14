FROM node:16-alpine as build
WORKDIR /src/app
COPY . .
RUN yarn install && yarn prod-build && yarn prod-gen-keys

FROM node:16-alpine
LABEL Maintainer="Moussa Haidous <haidous.m@gmail.com>"
LABEL Description=""
WORKDIR /src/app
COPY --from=build /src/app .

ENV NODE_ENV production
ENV PORT 8010

ENV MONGO_URI mongodb://0.0.0.0:27017/traefiker

CMD ["yarn", "prod-start"]

EXPOSE $PORT