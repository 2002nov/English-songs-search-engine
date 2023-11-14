const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

app.get('/api/sorted_output', (req, res) => {
    const results = [];
    fs.createReadStream('/Users/pawitapongpaew/Documents/English-songs-search-engine-/musicmagnet/backend/sorted_output.csv')
        .pipe(csv({ headers: false })) // Adjust based on your CSV format
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
