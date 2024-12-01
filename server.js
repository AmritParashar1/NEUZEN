const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const connectDB = require('./neuzen'); // MongoDB connection

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public'));


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

app.set('view engine','ejs');
app.set('views','./views');

app.get('/home', (req, res) => {
    res.render('index', { title: 'Home'});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});