const jwt = require('jsonwebtoken');
const User = require('../models/Users'); 
const bcrypt = require('bcrypt');

async function loginUser(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials - User not found');
        }

        console.log('Plain text password during login:', password);
        console.log('Hashed password from DB:', user.password);

        const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
        console.log('Password validation:', isPasswordValid);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials - Incorrect password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`User ${user.email} logged in successfully`);
        console.log('Generating token with secret:', process.env.JWT_SECRET);

        return { token };
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
}

module.exports = {
    loginUser,
};
