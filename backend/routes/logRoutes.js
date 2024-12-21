// routes/logRoutes.js
const express = require('express');
const { saveDailyLog, getUserLogs } = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Save daily log
router.post('/save', authMiddleware, saveDailyLog);

// Get logs for the logged-in user
router.get('/user-logs', authMiddleware, getUserLogs);

module.exports = router;
