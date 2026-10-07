const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const STAGIAIRES_FILE = './data (Simulation JSON)/stagiaires.json';
const FORMATEURS_FILE = './data (Simulation JSON)/formateurs.json';

const readData = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        return [];
    }
};

const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

app.get('/api/stagiaires', (req, res) => {
    res.json(readData(STAGIAIRES_FILE));
});

app.post('/api/stagiaires/save-all', (req, res) => {
    writeData(STAGIAIRES_FILE, req.body);
    res.send("Fichier du stagiaire mis à jour avec succès");
});

app.get('/api/formateurs', (req, res) => {
    res.json(readData(FORMATEURS_FILE));
});

app.post('/api/formateurs/save-all', (req, res) => {
    writeData(FORMATEURS_FILE, req.body);
    res.send("fichier du formateurs mis à jour avec succès");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});