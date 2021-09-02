FROM node:14-alpine as build

# TODO: optimize file so actual bundle is created
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY tsconfig*.json ./
COPY . ./
RUN yarn run build

CMD ["node", "./dist/index.js"]
