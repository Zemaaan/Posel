const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database'); // Replace with your database library

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file for form submission
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
    try {
        // Extract form data
        const { name, email } = req.body;

        // Insert data into database (using hypothetical database library)
        await database.insertUser(name, email);

        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});