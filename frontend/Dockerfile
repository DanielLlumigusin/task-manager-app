# Etapa 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servir la app con Nginx
FROM nginx:stable-alpine

# Elimina la configuración por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia la build generada
COPY --from=build /app/dist /usr/share/nginx/html

# Copia una configuración NGINX opcional
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
