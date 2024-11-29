const connectDB = require('./neuzen');

async function createArticle() {
    try {
        const db = await connectDB(); // Connect to the 'neuzen' database
        const articlesCollection = db.collection('articles'); // Get 'articles' collection

        const newArticle = {
            title: 'First Article',
            content: 'This is the content of the first article.',
            author: 'John Doe',
            date: new Date(),
        };

        const result = await articlesCollection.insertOne(newArticle);
        console.log('Article inserted with ID:', result.insertedId);
    } catch (err) {
        console.error('Error creating article:', err);
    }
}

createArticle();
