const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up EJS and views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/Main_Page', express.static(path.join(__dirname, 'Main_Page')));
app.use('/Article_page', express.static(path.join(__dirname, 'Article_page')));
app.use('/Draft_Page', express.static(path.join(__dirname, 'Draft_Page')));
app.use('/Community_Page', express.static(path.join(__dirname, 'Community_Page')));
app.use('/Profile_page', express.static(path.join(__dirname, 'Profile_page')));
app.use('/Settings_Page', express.static(path.join(__dirname, 'Settings_Page')));

// Main Index Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Neuzen - Home',
        // You can pass any dynamic data here
    });
});

app.get('/community', (req, res) => {
    res.render('community', {
        title: 'Neuzen - Community'
    })
})

// All other routes will serve static files
app.use(express.static(path.join(__dirname)));

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});