FROM debian:stable-slim
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl git
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
WORKDIR /root
RUN git clone --recursive https://github.com/anliting/stopwatch.git
RUN cp stopwatch/main/package.json .
RUN npm i
WORKDIR /root/work
CMD node ../stopwatch/main/start.mjs
