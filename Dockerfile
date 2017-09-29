
#sudo docker build --build-arg ASKALIEN_SERVER=mythidb-askalien.a3c1.starter-us-west-1.openshiftapps.com -t askalien:mythi-search-remoto .
#sudo docker build --build-arg ASKALIEN_SERVER=localhost:8080 -t askalien:mythi-search-local .
#sudo docker run -d -p 80:8080 --name mythi-search-local askalien:mythi-search-local


FROM node as node_files

COPY package_dist.json package.json

RUN npm install

FROM nginx:1.13.5-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html
COPY --from=node_files ./node_modules /usr/share/nginx/html/node_modules

ARG ASKALIEN_SERVER

RUN rm -rf /usr/share/nginx/html/nginx && \
    rm -rf /usr/share/nginx/html/*.json && \
    sed -i -e 's|${ASKALIEN_SERVER}|'${ASKALIEN_SERVER}'|g' /usr/share/nginx/html/app/ask.service.js
    
EXPOSE 8080

RUN touch /var/run/nginx.pid && \
    chown -R nginx:0 /var/run/nginx.pid && \
    chmod -R ug+rw /var/run/nginx.pid && \
    chown -R nginx:0 /var/cache/nginx && \
   chmod -R ug+rw /var/cache/nginx

CMD ["nginx", "-g", "daemon off;"]


