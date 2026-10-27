# Stage 1: Build & Bundle
FROM node:20-slim AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies deterministically
RUN npm ci

# Copy application source code and configurations
COPY . .

# Bundle the Remotion project
RUN npx remotion bundle src/index.ts --out-dir=dist/bundle

# Prune development dependencies to keep production dependencies minimal
RUN npm prune --production

# Stage 2: Production Runner
FROM node:20-slim AS runner

# Install system-level dependencies required by Remotion, Puppeteer, and Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    ffmpeg \
    fonts-noto-color-emoji \
    fonts-freefont-ttf \
    fonts-ipafont-gothic \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Chromium and Remotion runtime
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV REMOTION_CHROME_EXECUTABLE=/usr/bin/chromium
ENV NODE_ENV=production

WORKDIR /app

# Copy built artifacts, production dependencies, scripts, and config files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/bundle ./dist/bundle
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/site-configs ./site-configs

# Default execution entrypoint
CMD ["node", "scripts/render-in-docker.mjs"]
