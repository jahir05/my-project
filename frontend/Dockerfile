FROM node:20-alpine AS build
WORKDIR /app

# Tools some packages/postinstall scripts expect
RUN apk add --no-cache git

# Copy manifests first for better layer caching
COPY package*.json ./
COPY vite.config.js ./

# Ensure 'patch-package' is available for postinstall hooks
RUN npm install -g patch-package

# Install deps (use lockfile if present)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source and build
COPY . .
RUN npm run build

# Dev-friendly: serve via Vite in dev; for prod you could use nginx to serve /dist
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 5173
CMD ["npm","run","dev","--","--host"]

# Serve static
# FROM nginx:alpine
# RUN rm -f /etc/nginx/conf.d/default.conf
# COPY <<EOF /etc/nginx/conf.d/app.conf
# server {
# listen 80;
# server_name _;
# root /usr/share/nginx/html;
# index index.html;
# location / { try_files $uri /index.html; }
# #location /api/ { proxy_pass http://backend:8080; }
# }
# EOF
# COPY --from=build /app/dist/ /usr/share/nginx/html/
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]