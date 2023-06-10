FROM node:18.3.0-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./views ./views
COPY ./public ./public
COPY ./tsconfig.json ./

RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "run", "start:prod"]