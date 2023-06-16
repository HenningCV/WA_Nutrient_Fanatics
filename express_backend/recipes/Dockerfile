FROM node:lts-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 27001

CMD ["npm", "start"]