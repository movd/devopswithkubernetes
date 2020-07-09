FROM node:14-alpine

WORKDIR /app
RUN chown -R -v node:node /app 
USER node
COPY package*.json ./

RUN npm install --only=prod

COPY server.js /app/

CMD [ "npm", "run", "start"]
