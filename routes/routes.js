const express = require('express');
const path = require('path');
const authService = require('../Services/authService');  
const { verifyToken } = require('../middlewares/authMiddleware'); 
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 
// Route for handling signup POST request
router.post('/signup', async (req, res) => {
    const { name, email, password, address, city, state, zip } = req.body;

    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user without manually hashing the password
        const newUser = new User({
            name,
            email,
            password, // plain password; middleware will hash it
            address,
            city,
            state,
            zip
        });

        // Save user to MongoDB
        await newUser.save();

        // Respond with success message and user data
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).json({ message: error.message || 'Error creating user' });
    }
});


// Route for handling login POST request
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials - User not found');
        }

        // Log the plain text password and the hashed password from the database
        console.log('Plain text password during login:', password);
        console.log('Hashed password from DB:', user.password);

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials - Incorrect password');
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({ error: error.message });
    }
});



// Route to check login status
router.get('/check-login', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ loggedIn: true, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error checking login status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve the home page (static file)
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

module.exports = router;
