FROM alpine

RUN apk update && \
    apk upgrade && \
    apk add npm \
    && rm -rf /var/cache/apk/*

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server"]
