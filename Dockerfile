FROM node:20-alpine AS development


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=development

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]