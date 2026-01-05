# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
# Copy migrations for runtime execution
COPY --from=builder /app/src/migrations ./src/migrations 
COPY --from=builder /app/src/config ./src/config
COPY --from=builder /app/.sequelizerc .

EXPOSE 3001

CMD ["npm", "start"]
