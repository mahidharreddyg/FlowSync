FROM node:18-alpine

WORKDIR /app

RUN rm -rf node_modules package-lock.json

COPY ./package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
