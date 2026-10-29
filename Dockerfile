# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definition
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Stage 2: Production stage using Nginx
FROM nginx:alpine

# Copy hasil build dari stage builder ke direktori static Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Copy custom nginx config jika ada kebutuhan SPA routing/fallback
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]