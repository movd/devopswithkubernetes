FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN npm install --quiet && npm run tsc

FROM node:14-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /app
RUN chown node:node .
USER node
COPY package*.json ./
RUN npm install --quiet --only=prod
COPY --from=builder /app/build /app/build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start"]