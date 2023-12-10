# Each instruction in this file creates a new layer

# Set the base image to Node.js 20 with Alpine Linux
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files (contains dependencies)
# from the project source directory to the container directory
COPY package*.json ./

# Install the dependencies into the container
RUN npm install

# Copy the source code of the application into the container directory
COPY . .

# Command to run within the container when it starts
CMD ["npm", "run", "dev"]
