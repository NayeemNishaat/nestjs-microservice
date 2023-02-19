FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY . .
COPY .env.local .env

CMD ["npm", "run", "start:prod"]