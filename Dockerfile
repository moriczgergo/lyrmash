FROM node:latest

WORKDIR /usr/src/lyrmash

COPY package*.json ./

RUN npm install

COPY . .

ARG LYRMASH_GENIUS
ARG LYRMASH_AID

RUN [ "npm", "run", "scrape", "--", "${LYRMASH_GENIUS}", "${LYRMASH_AID}" ]

CMD [ "npm", "start" ]