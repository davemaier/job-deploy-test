FROM node:16-alpine

WORKDIR /app

EXPOSE 4000
EXPOSE 5555


COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .
RUN yarn generate
RUN yarn build

CMD yarn start
