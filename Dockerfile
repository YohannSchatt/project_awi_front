FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/awi_front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Optionnel : vérifier les fichiers copiés
RUN ls -la /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

# Optionnel : afficher le contenu du fichier de configuration
RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 80