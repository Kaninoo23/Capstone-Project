const express = require('express');
const app = express();
const path = require('path');

// Serve static files (images, styles, and scripts)
app.use('/images', express.static(path.join(__dirname, 'Images')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Serve home.html
app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Serve products.html
app.get('/products.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'products.html'));
});

// Server shopping-cart.html
app.get('/shopping-cart.html',  (req, res) => {
    res.sendFile(path.join(__dirname, 'shopping-cart.html'));
});
// Serve home.js with correct MIME type
app.get('/home.js', (req, res) => {
    res.set('Content-Type', 'text/javascript'); // Ensure correct MIME type
    res.sendFile(path.join(__dirname, 'home.js'));
});
app.get('/products.js', (req, res) => {
    res.set('Content-Type', 'text/javascript'); // Ensure correct MIME type
    res.sendFile(path.join(__dirname, 'products.js'));
});
app.get('/shopping-cart.js', (req, res) => {
        res.set('Content-Type', 'text/javascript'); // Ensure correct MIME type
        res.sendFile(path.join(__dirname, 'shopping-cart.js'));
});        

// Define other routes as needed for shopping-cart, etc.

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
