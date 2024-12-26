# Utiliser une image Node.js comme image de base
FROM node:22-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet
COPY . .

# Construire l'application Angular
RUN npm run build --prod

# Utiliser une image Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits de l'étape précédente
COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]