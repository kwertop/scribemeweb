FROM node:12-alpine

RUN apk update && apk add nginx

WORKDIR /app

COPY package*.json ./

RUN npm install --silent
RUN npm install -g serve

COPY . .

COPY .config/nginx.conf /var/lib/nginx

EXPOSE 80

CMD [ "sh", "init.sh" ]