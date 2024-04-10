FROM alpine
WORKDIR /root
RUN apk add git npm
COPY ./main/package.json .
RUN npm i
FROM alpine
RUN apk add nodejs
COPY --from=0 /root/node_modules /root/node_modules
COPY . /root/stopwatch
RUN mkdir /root/work &&\
    printf 1100 >/root/work/httpListen
WORKDIR /root/work
CMD node ../stopwatch/main/start.mjs
