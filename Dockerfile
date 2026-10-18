# Local Development Dockerfile
FROM node:22-alpine

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package*.json ./
COPY prisma.config.ts ./

RUN npm install

# Copy application source code
COPY . .

# Generate Prisma Client for local development
RUN npm run db:generate

EXPOSE 5001

# Hot-reload development server
CMD ["npm", "run", "dev"]