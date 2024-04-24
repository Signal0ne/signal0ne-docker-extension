FROM node:18.18.2-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@latest
RUN npm install

EXPOSE 37001

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "37001", "--disable-host-check"]
