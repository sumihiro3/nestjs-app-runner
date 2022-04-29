# For building
FROM node:16.14-alpine3.14 as builder

WORKDIR /app
COPY package.json ./ 
COPY yarn.lock ./
RUN yarn install --production=false --frozen-lockfile
COPY . .
RUN yarn build

# For running
FROM node:16.14-alpine3.14

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
RUN yarn install --production

## ビルド用のレイヤからコピーする
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]
