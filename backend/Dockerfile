FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm uninstall bcrypt


RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
