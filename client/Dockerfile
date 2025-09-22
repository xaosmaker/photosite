FROM node:24-alpine3.22 AS base

FROM base AS build
WORKDIR /build

COPY ./package.json ./package-lock.json ./

RUN npm ci


COPY . .

RUN npm run build

FROM base AS run
ENV NODE_ENV=production
WORKDIR /client

COPY --from=build /build/package.json /build/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /build/.next /client/.next

CMD ["npm","run","start"]
