FROM node:18.18.2-bullseye-slim AS build
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y bzip2 &&\
    npm cache clean --force && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install &&\ 
    npm run build
EXPOSE 80

# Serve the app using nginx
FROM nginx:1.21.0-alpine
COPY ./webserver/main.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html