FROM alpine

RUN apk update && \
    apk upgrade && \
    apk add npm \
    && rm -rf /var/cache/apk/*

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3000

CMD node server
