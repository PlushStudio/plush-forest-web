FROM nginx:1.21-alpine

RUN apk --no-cache add jq gomplate

WORKDIR /server

COPY ./conf/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/nginx/mime.types /usr/share/nginx/html

COPY ./dist /usr/share/nginx/html
COPY ./conf/init.sh /server

EXPOSE 80

CMD ["sh", "-c", "/server/init.sh"]
