FROM alpine
WORKDIR /app
RUN apk add --no-cache git npm
COPY ./main/package.json .
RUN npm i
FROM alpine
RUN apk add --no-cache nodejs
COPY --from=0 /app/node_modules /app/node_modules
COPY . /app/stopwatch
RUN printf 1100 >/app/httpListen
WORKDIR /app
CMD node stopwatch/main/start.mjs
