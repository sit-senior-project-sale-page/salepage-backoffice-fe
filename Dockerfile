#!/usr/bin/env bash
FROM node:14.18-alpine as build 
RUN printenv
WORKDIR /app
COPY ./package.json ./
RUN yarn install 
COPY . .
RUN yarn build


FROM registry.access.redhat.com/ubi8:8.0 as prod
LABEL version="1.0" \
    description="To Do List application front-end" \
    creationDate="2017-12-25" \
    updatedDate="2019-11-28"
RUN yum install -y --disableplugin=subscription-manager --nodocs \
    nginx nginx-mod-http-perl \
    && yum clean all
COPY /nginx/nginx.conf /etc/nginx/
RUN touch /run/nginx.pid \
    && chgrp -R 0 /var/log/nginx /run/nginx.pid \
    && chmod -R g+rwx /var/log/nginx /run/nginx.pid
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
USER 1001
CMD nginx -g "daemon off;"