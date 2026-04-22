FROM node:20-alpine

# ✅ 1. create non-root user first
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /home/app

# ✅ 2. copy package.json for cache
COPY package*.json ./

# ✅ 3. install as root (needs permission)
RUN npm install

# ✅ 4. copy all code
COPY . .

# ✅ 5. give appuser ownership of all files
RUN chown -R appuser:appgroup /home/app

# ✅ 6. now switch to non-root
USER appuser

CMD ["node", "server.js"]