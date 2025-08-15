FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . . 
EXPOSE 3000
CMD ["node", "server.js"]npm
# docker build -t simple-server .
# docker run -p 3000:3000 simple-server
# netstat -ano | findstr :3000(beispielsweise um zu prüfen, ob der Port 3000 belegt ist
#taskkill /PID typeyourPIDhere /F)(Beispielsweise um den Prozess zu beenden, der den Port 3000 belegt
# docker ps -a (um alle Container anzuzeigen)