FROM alpine
RUN apk add --no-cache git nodejs npm
WORKDIR /app
COPY . stopwatch
RUN npm i clean-css html-minifier rollup postcss postcss-import terser anliting/core &&\
    node stopwatch/main/make.mjs
FROM alpine
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=0 /app/node_modules node_modules
COPY --from=0 /app/root root
COPY --from=0 /app/sw sw
COPY . stopwatch
RUN printf 80 >httpListen
CMD node stopwatch/main/start.mjs
