FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN npm install --quiet && npm run tsc

FROM node:14-alpine
WORKDIR /app
RUN chown node:node .
USER node
COPY package*.json ./
RUN npm install --quiet --only=prod
COPY --from=builder /app/build /app/build
EXPOSE 3000
CMD [ "npm", "run", "start"]