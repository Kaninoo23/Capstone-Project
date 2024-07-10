const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Adjust path as per your project structure

// Route for handling signup POST request
router.post('/', async (req, res) => {
    try {
        const { name, email, password, address, city, state, zip } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !address || !city || !state || !zip) {
            throw new Error('All fields are required');
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
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

module.exports = router;
