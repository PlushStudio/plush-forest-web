FROM nginx:latest

COPY ./conf/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/nginx/mime.types /usr/share/nginx/html

COPY ./build /usr/share/nginx/html
WORKDIR /app

EXPOSE 80
