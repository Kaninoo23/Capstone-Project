const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials - User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials - Incorrect password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful for:', user.email); // Log successful login

        return { token };
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
}

module.exports = {
    loginUser,
};

