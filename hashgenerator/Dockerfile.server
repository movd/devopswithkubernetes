FROM node:14-alpine

WORKDIR /app
RUN chown -R -v node:node /app 
USER node
COPY package*.json ./

RUN npm install --only=prod

COPY . .

CMD [ "npm", "run", "start"]
