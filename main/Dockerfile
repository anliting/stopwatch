FROM archlinux
RUN pacman -Syu --noconfirm git nodejs npm
WORKDIR /root
RUN git clone --recursive https://github.com/anliting/stopwatch.git
RUN cp stopwatch/main/package.json .
RUN npm i
WORKDIR /root/work
CMD node ../stopwatch/main/start.mjs
