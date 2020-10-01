FROM node:14-alpine
WORKDIR /usr/src/app
COPY package* ./
RUN npm ci
COPY index.js .
CMD ["npm", "start"]