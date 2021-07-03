FROM node:alpine AS node

WORKDIR /application

COPY package.json ./
COPY yarn.lock ./

RUN apk --no-cache -U upgrade

RUN yarn install --only=production

COPY . .

CMD node app.js 