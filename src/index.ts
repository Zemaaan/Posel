import express = require('express');
import bodyParser = require('body-parser');
import database = require('mysql'); // Replace with your database library

const app = express();
const PORT = process.env.PORT || 3000;

const pool = database.createPool({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'test'
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file for form submission
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/Registracija.html');
});

// Handle form submission
app.post('/Registracija', async (req, res) => {
    try {
        // Extract form data
        const { Firstname, age, email, password } = req.body;

        // Insert data into database (using hypothetical database library)
        // await database.insertUser(name, email);

        const query = 'INSERT INTO test.user (Firstname, email, age, password) VALUES (?, ?, ?, ?)';
        pool.query(query, [Firstname, email, age, password], (error, results) => {
            if (error) {
                console.error('Error:', error);
            }
        });

        res.send('Data inserted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/prijava', async (req, res) => {
    try {
        // Extract form data
        const { email, password } = req.body;

        // Insert data into database (using hypothetical database library)
        // await database.insertUser(name, email);

        const query = 'SELECT email, password FROM user WHERE email = ? AND password = ?';
        pool.query(query, [email, password], (error, results) => {
            if (error) {
                console.error('Error:', error);
            }
        });

        res.send('Data found successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});