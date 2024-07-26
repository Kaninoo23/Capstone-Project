const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    address: String,
    city: String,
    state: String,
    zip: String
});

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hash = await bcrypt.hash(user.password, salt); // Hash the password
        user.password = hash; // Replace plain password with hashed password
        next(); // Proceed to save the user document
    } catch (error) {
        next(error); // Pass error to the next middleware or route handler
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
