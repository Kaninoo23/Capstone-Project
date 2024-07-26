const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Split the token from the header and check if it's in the correct format
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
    }

    // Extract the token
    const token = tokenParts[1];

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Attach user ID from the token to the request object
        req.userId = decoded.userId;
        console.log('Decoded userId:', req.userId);
        next();
    });
}

module.exports = {
    verifyToken,
};
