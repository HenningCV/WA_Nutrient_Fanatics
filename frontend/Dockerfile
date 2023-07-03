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

# Expose Port 20071
EXPOSE 20071

# Server starten
CMD [ "node", "server.js" ]