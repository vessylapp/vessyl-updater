FROM ghcr.io/vessylapp/vessyl-docker-image:latest

LABEL org.opencontainers.image.source=https://github.com/vessylapp/vessyl-updater

WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "index.js"]