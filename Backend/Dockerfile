FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
