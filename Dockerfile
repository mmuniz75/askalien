
FROM node as node_files

COPY package.json package.json

RUN npm install

FROM nginx:1.13.5-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html
COPY --from=node_files ./node_modules /usr/share/nginx/html/node_modules

RUN rm -rf /usr/share/nginx/html/nginx && rm -rf /usr/share/nginx/html/*.json 

EXPOSE 8080

RUN touch /var/run/nginx.pid && \
    chown -R nginx:0 /var/run/nginx.pid && \
    chmod -R ug+rw /var/run/nginx.pid && \
    chown -R nginx:0 /var/cache/nginx && \
   chmod -R ug+rw /var/cache/nginx

CMD ["nginx", "-g", "daemon off;"]

