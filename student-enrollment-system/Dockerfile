# Use node.js as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g npm@9.6.6

# Install dependencies
RUN npm install --force

# Copy all the files from the Angular project to the container
COPY . .

# Build the Angular application
# RUN npm run build --prod

# Expose port 4200
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]
