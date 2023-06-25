FROM node:14-alpine

# Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# package.json und package-lock.json kopieren
COPY package*.json ./

# Abhängigkeiten installieren
RUN npm install

# Rest der Anwendung kopieren
COPY . .

# App für Produktion bauen
RUN npm run build

# Express installieren
RUN npm install express

# Erstellen einer server.js-Datei
RUN echo "const express = require('express');\
const app = express();\
app.use(express.static('build'));\
const port = process.env.PORT || 20071;\
app.listen(port, () => {\
  console.log(`Server is running on port ${port}`);\
});" > server.js

# Expose Port 20071
EXPOSE 20071

# Server starten
CMD [ "node", "server.js" ]