FROM alpine
RUN apk add --no-cache git nodejs npm
WORKDIR /app0
RUN npm i anliting/core
WORKDIR /app1
RUN npm i clean-css html-minifier rollup postcss postcss-import terser\
        anliting/core
COPY . commit
RUN mkdir build;\
    node commit/main/frontend/make/main.mjs
FROM alpine
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=0 /app0/node_modules node_modules
COPY --from=0 /app1/build static
COPY ./main/frontend/icon/main512.png static/
COPY ./main/frontend/manifest static/
COPY ./main/frontend/mi.woff2 static/
COPY ./main/server server
CMD node server/main.mjs
