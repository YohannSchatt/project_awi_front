// replace-api-url.js
const replace = require('replace-in-file');

// Options pour remplacer la valeur de apiUrl dans environment.prod.ts
const options = {
  files: 'src/environments/environment.prod.ts',
  from: /apiUrl: '.*'/,
  to: `apiUrl: '${process.env.API_URL || 'https://votre-api-production.com'}'`,
};

replace(options)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });