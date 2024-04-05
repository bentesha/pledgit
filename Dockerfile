FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app
COPY . .

RUN npm ci && npm run build && rm -rf src
CMD ["npm", "run", "start:prod"]