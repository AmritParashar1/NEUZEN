const fs = require('fs');
const connectDB = require('./neuzen'); // Your MongoDB connection file

async function insertArticlesFromFile() {
    try {
        // Read the JSON file
        const filePath = './JSON/Mparticles.json';
        const data = fs.readFileSync(filePath, 'utf8');
        const articles = JSON.parse(data); // Parse JSON to JavaScript object

        // Connect to MongoDB
        const db = await connectDB();
        const articlesCollection = db.collection('articles');

        // Insert multiple articles
        const result = await articlesCollection.insertMany(articles);
        console.log(`${result.insertedCount} articles inserted successfully!`);
    } catch (err) {
        console.error('Error inserting articles:', err);
    }
}

insertArticlesFromFile();
