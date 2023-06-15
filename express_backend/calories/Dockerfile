FROM node:lts-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 27002

CMD ["npm", "start"]