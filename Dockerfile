FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/awi_front/browser /usr/share/nginx/html


# Optionnel : vérifier les fichiers copiés
RUN ls -la /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

# Optionnel : afficher le contenu du fichier de configuration
RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 80