const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.header('Authorization');
    //console.log('Authorization Header:', token); // Log the raw header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Allow both plain token and Bearer format
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1]; // Extract the token after "Bearer"
    }

    //console.log('Extracted Token:', token); // Log the extracted token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Decoded Token:', decoded); // Log the decoded token payload
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token Validation Failed:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
