FROM alpine
RUN apk add --no-cache git nodejs npm
WORKDIR /app0
RUN npm i anliting/core
WORKDIR /app1
RUN npm i clean-css html-minifier rollup postcss postcss-import terser\
        anliting/core
COPY . commit
RUN mkdir build;\
    node commit/main/make.mjs
FROM alpine
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=0 /app0/node_modules node_modules
COPY --from=0 /app1/build build
COPY . commit
CMD node commit/main/start.mjs
