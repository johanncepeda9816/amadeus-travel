# Frontend Dockerfile
FROM node:18-alpine AS builder

# Enable pnpm
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx configuration
RUN printf 'server {\n    listen 80;\n    server_name localhost;\n    \n    root /usr/share/nginx/html;\n    index index.html;\n    \n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n    \n    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {\n        expires 1y;\n        add_header Cache-Control "public, immutable";\n    }\n    \n    add_header X-Frame-Options "SAMEORIGIN" always;\n    add_header X-Content-Type-Options "nosniff" always;\n    add_header X-XSS-Protection "1; mode=block" always;\n    \n    gzip on;\n    gzip_vary on;\n    gzip_min_length 1024;\n    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]