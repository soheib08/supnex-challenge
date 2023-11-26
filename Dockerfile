FROM node:18.5.0-alpine AS Builder

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
