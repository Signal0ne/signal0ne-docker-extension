# Use Node.js base image with required version
FROM node:18.18.2-bullseye-slim
#FROM node:21-alpine


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
#RUN npm install

# Install Angular CLI globally
#RUN npm update
RUN npm install -g @angular/cli@latest
#RUN npm install @angular-devkit/build-angular
RUN npm install
#RUN npm i --only=dev
#RUN npm ci
#RUN npm install --save-dev @angular-devkit/build-angular

# Copy the rest of the application
#COPY . .

# Expose the port used by Angular development server
EXPOSE 37001

# Command to start the Angular development server
#  "--disable-host-check", "true",  "--host","0.0.0.0", , "--poll", "100"
#CMD ["ng", "serve", "--port", "37001"]
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "37001", "--disable-host-check"]
