const express = require('express');
const fs = require('fs');
const path = 'path';
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies and serve static files from 'public' directory
app.use(express.json());
app.use(express.static('public'));

const worksFilePath = path.join(__dirname, 'public', 'works.json');

// API endpoint to GET portfolio works
app.get('/api/works', (req, res) => {
    fs.readFile(worksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading works data.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// API endpoint to POST updated works
app.post('/api/works', (req, res) => {
    const updatedWorks = req.body;

    fs.writeFile(worksFilePath, JSON.stringify(updatedWorks, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving works data.');
        }
        res.status(200).send({ message: 'Works updated successfully!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Press Ctrl+C to stop the server.");
});