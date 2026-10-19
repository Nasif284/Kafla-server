FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma.config.ts ./

RUN npm install

COPY . .

RUN npm run db:generate

EXPOSE 5001

CMD ["npm", "run", "dev"]