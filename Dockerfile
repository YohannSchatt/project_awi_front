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
FROM node:22

WORKDIR /app

# Copier les fichiers construits de l'étape précédente
COPY --from=build /app/dist/awi_front ./dist/awi_front

# Copier le serveur Node.js
COPY server.ts .

# Installer les dépendances de production
RUN npm install express

# Exposer le port 4000
EXPOSE 4000

# Compiler le fichier TypeScript en JavaScript
RUN npm install -g typescript
RUN tsc server.ts

# Démarrer le serveur Node.js
CMD ["node", "server.js"]