FROM node:alpine AS node

WORKDIR /application

COPY package.json ./
COPY yarn.lock ./

RUN apk --no-cache -U upgrade

RUN yarn install --only=production

COPY . .

RUN yarn run build

EXPOSE 3000

WORKDIR ./build

CMD node app.js 