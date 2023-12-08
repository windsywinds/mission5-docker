#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:18-alpine
#setting working directory in the container
WORKDIR /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json ./
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
COPY . .
#command to run within the container
CMD ["node", "server.js"]