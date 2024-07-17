// routes.js
const express = require('express');
const { loginUser } = require('../Services/authService'); 
const { verifyToken } = require('../middlewares/authMiddleware'); 
const User = require('../models/Users'); // Adjusted import path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

// Route for handling signup POST request
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, address, city, state, zip } = req.body;

        // Validate required fields
        if (!name || !email || !password || !address || !city || !state || !zip) {
            throw new Error('All fields are required');
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
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
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a dynamic JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
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

module.exports = router;
