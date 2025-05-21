

const express = require('express');
const path = require('path');

const app = express();
const PORT = 8085;

const LOCALES = ['fr-FR', 'en-US']; // ajoute toutes les langues ici

LOCALES.forEach((locale) => { 
  const localePath = path.join(__dirname, 'dist/my-first-project-angular/browser', locale);

  // Sert les fichiers statiques pour chaque langue
  app.use(`/${locale}`, express.static(localePath));

  // Fallback vers index.html pour le routing Angular
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'index.csr.html'));
  });
});

// Redirige vers fr par défaut
app.get('/', (req, res) => {
  res.redirect('/fr-FR');
});

app.listen(PORT, () => {
  console.log(`🌍 App localisée disponible sur :`);
  console.log(`➡️  http://localhost:${PORT}/fr-FR`);
  console.log(`➡️  http://localhost:${PORT}/en-US`);
});