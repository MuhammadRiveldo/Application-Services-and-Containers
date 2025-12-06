# Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Install serve to run the production build
RUN npm install -g serve

COPY --from=builder /usr/src/app/build ./build

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
