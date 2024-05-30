FROM alpine
RUN apk add --no-cache git nodejs npm
WORKDIR /app0
RUN npm i anliting/core
WORKDIR /app1
RUN npm i clean-css html-minifier rollup postcss postcss-import terser\
        anliting/core
COPY . stopwatch
RUN mkdir build;\
    node stopwatch/main/make.mjs
FROM alpine
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=0 /app0/node_modules node_modules
COPY --from=0 /app1/build build
COPY . stopwatch
CMD node stopwatch/main/start.mjs
