const connectDB = require('./neuzen'); // Your MongoDB connection file

async function updateArticleByTitle(title, updates) {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Update one article by title
        const result = await articlesCollection.updateOne(
            { title: title },  // Filter criteria
            { $set: updates }  // Fields to update
        );

        if (result.matchedCount > 0) {
            console.log(`Article with title "${title}" updated successfully.`);
        } else {
            console.log(`No article found with title "${title}".`);
        }
    } catch (err) {
        console.error('Error updating article:', err);
    }
}

async function updateMultipleArticles(criteria, updates) {
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Update multiple articles
        const result = await articlesCollection.updateMany(
            criteria,       // Filter criteria
            { $set: updates } // Fields to update
        );

        console.log(`${result.modifiedCount} articles updated successfully.`);
    } catch (err) {
        console.error('Error updating articles:', err);
    }
}

// Call the function based on your need:
// To update a single article by title
updateArticleByTitle('Introduction to Neuzen', { content: 'Updated content of the article.' });

// To update multiple articles (uncomment the next line if needed)
// updateMultipleArticles({ author: 'John Doe' }, { author: 'John D.' });
