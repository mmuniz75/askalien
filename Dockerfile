
FROM nginx:1.13.5-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/nginx

EXPOSE 8080

RUN touch /var/run/nginx.pid && \
    chown -R nginx:0 /var/run/nginx.pid && \
    chmod -R ug+rw /var/run/nginx.pid && \
    chown -R nginx:0 /var/cache/nginx && \
   chmod -R ug+rw /var/cache/nginx

CMD ["nginx", "-g", "daemon off;"]

