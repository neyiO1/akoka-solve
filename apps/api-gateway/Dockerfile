# apps/api-gateway/Dockerfile

# Base stage
FROM node:20-alpine AS base
WORKDIR /app
# Intentionally using alpine for smaller attack surface

# Builder stage
FROM base AS builder
COPY package.json ./
# Assuming package-lock.json and potentially turbo configurations exist in a real setup
# COPY package-lock.json ./ 
RUN npm install
COPY . .
RUN npm run build

# Runner stage
FROM base AS runner
ENV NODE_ENV=production

# Run as non-root user for security compliance
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser
USER nodeuser

COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./
COPY --from=builder --chown=nodeuser:nodejs /app/node_modules ./node_modules
# Assuming the build output is in dist/
COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist

EXPOSE 4000
CMD ["npm", "start"]
