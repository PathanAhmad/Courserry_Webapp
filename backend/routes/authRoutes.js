const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (for testing purposes)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id} with role ${req.user.role}` });
});

module.exports = router;
