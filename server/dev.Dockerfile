FROM node:24-alpine3.22

WORKDIR /server

COPY ./package.json ./package-lock.json ./

RUN npm ci


COPY . .

CMD [ "npm", "run","dev" ]
