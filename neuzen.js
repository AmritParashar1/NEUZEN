const { MongoClient } = require('mongodb');

// Connection URL and database name
const uri = 'mongodb+srv://siddharthjain23cse:1234@test.8iym3.mongodb.net/';
const databaseName = 'neuzen'; // Your database name

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(databaseName); // Return the specified database
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectDB;