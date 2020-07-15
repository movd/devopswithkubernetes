FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN npm install --quiet && npm run tsc

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY package*.json ./
RUN chown -R node:node .
USER node
RUN npm install --quiet --only=prod && npm prune --production
EXPOSE 3000
CMD [ "npm", "run", "start"]