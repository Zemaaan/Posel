const express = require('express');
const { createConnection } = require('typeorm');
const { User } = require('src/entity/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Express to use EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to render the form
app.get('/', (req, res) => {
    res.render('template');
});


app.use(express.bodyParser());
app.post('/', function(request, response){
    console.log(request.body.data);
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        // Parse form data
        const { name, email } = req.body;
        // Create new user entity
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        // Save user to database
        await newUser.save();
        // Redirect to success page
        res.redirect('/success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Connect to the database using TypeORM
createConnection().then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => console.error('Error connecting to database:', error));