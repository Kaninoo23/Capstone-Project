const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Import verifyToken function from authMiddleware
const { verifyToken } = require('./middlewares/authMiddleware');  // Adjust the path as necessary

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const router = require('./routes/routes');  
app.use('/', router);

// Example protected route
app.post('/logout', verifyToken, (req, res) => {
    // Perform logout logic if needed
    res.status(200).json({ message: 'Logout successful' });
});

//Route to get user IP
app.get('/get-user-ip', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ ip: userIp });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
