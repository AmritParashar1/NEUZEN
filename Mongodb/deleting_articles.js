const connectDB = require('./neuzen'); // Your MongoDB connection file

async function deleteArticleByTitle(title) {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Delete one article by title
        const result = await articlesCollection.deleteOne({ title: title });

        if (result.deletedCount > 0) {
            console.log(`Article with title "${title}" deleted successfully.`);
        } else {
            console.log(`No article found with title "${title}".`);
        }
    } catch (err) {
        console.error('Error deleting article:', err);
    }
}

async function deleteAllArticles() {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Delete all articles
        const result = await articlesCollection.deleteMany({});

        console.log(`${result.deletedCount} articles deleted successfully.`);
    } catch (err) {
        console.error('Error deleting all articles:', err);
    }
}

// Call the function based on your need:
// To delete a single article by title
deleteArticleByTitle('First Article');

// To delete all articles (uncomment the next line if needed)
// deleteAllArticles();
