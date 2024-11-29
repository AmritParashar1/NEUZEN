const connectDB = require('./neuzen'); // Your MongoDB connection file

async function readAllArticles() {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Retrieve all articles
        const articles = await articlesCollection.find().toArray();
        console.log('All Articles:');
        console.log(articles);
    } catch (err) {
        console.error('Error reading articles:', err);
    }
}

async function readArticleByTitle(title) {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Retrieve a single article by title
        const article = await articlesCollection.findOne({ title: title });

        if (article) {
            console.log('Article Found:');
            console.log(article);
        } else {
            console.log(`No article found with title "${title}".`);
        }
    } catch (err) {
        console.error('Error reading article:', err);
    }
}

// Call the function based on your need:
// To read all articles
readAllArticles();

// To read a specific article by title (uncomment if needed)
// readArticleByTitle('Introduction to Neuzen');
