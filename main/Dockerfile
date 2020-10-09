FROM alpine
RUN mkdir /root/env
WORKDIR /root/env
RUN apk add git npm
RUN git clone --recursive https://github.com/anliting/stopwatch.git
RUN npm i $(cat stopwatch/main/npm-dependency)
FROM alpine
RUN apk add nodejs
COPY --from=0 /root/env /root/env
WORKDIR /root/work
CMD node ../env/stopwatch/main/start.mjs
