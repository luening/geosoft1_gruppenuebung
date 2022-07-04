FROM node:16
WORKDIR /geosoft1_gruppenuebung
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000:3000
CMD [ "node", "app.js" ]