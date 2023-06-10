FROM node:18.3.0-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY *.js ./

ENV PORT=4000
ENV REDIS_PORT=6379

CMD ["npm", "run", "start"]