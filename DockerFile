FROM  node:lts-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ./.env ./dist

EXPOSE 5500

CMD [ "node", "dist/main" ]