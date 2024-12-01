const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const connectDB = require('./neuzen'); // MongoDB connection

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname)));

// Set up EJS and views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static pages
app.use('/Main_Page', express.static(path.join(__dirname, 'Main_Page')));
app.use('/Article_page', express.static(path.join(__dirname, 'Article_page')));
app.use('/Draft_Page', express.static(path.join(__dirname, 'Draft_Page')));
app.use('/Community_Page', express.static(path.join(__dirname, 'Community_Page')));
app.use('/Profile_page', express.static(path.join(__dirname, 'Profile_page')));
app.use('/Settings_Page', express.static(path.join(__dirname, 'Settings_Page')));
app.use('/SignIN_Page', express.static(path.join(__dirname, 'SignIN_Page')));
app.use('/SignUp_Page', express.static(path.join(__dirname, 'SignUp_Page')));

// Route to handle article submission
app.post('/publish', async (req, res) => {
    try {
        const { title, content } = req.body;

        // Validate input
        if (!title || !content) {
            return res.status(400).send('Title and content are required.');
        }

        // Insert article into MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        const newArticle = {
            title: title,
            content: content,
            date: new Date(),
        };

        const result = await articlesCollection.insertOne(newArticle);
        res.status(201).send(`Article published with ID: ${result.insertedId}`);
    } catch (err) {
        console.error('Error publishing article:', err);
        res.status(500).send('An error occurred while publishing the article.');
    }
});

// Route to fetch all articles for the homepage
app.get('/articles', async (req, res) => {
    try {
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        const articles = await articlesCollection.find().toArray();
        res.status(200).json(articles);
    } catch (err) {
        console.error('Error fetching articles:', err);
        res.status(500).send('An error occurred while fetching articles.');
    }
});

// Main Index Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Neuzen - Home'
    });
});

// Community Page Route
app.get('/community', (req, res) => {
    res.render('community', {
        title: 'Neuzen - Community'
    });
});

// Route to render the profile page
app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Neuzen - Profile'
    });
});

// Route to render the settings page
app.get('/settings', (req, res) => {
    res.render('settings', {
        title: 'Neuzen - Settings'
    });
});

// Error handling middleware for 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
