const express = require('express');
const router = express.Router();
const { processCSV } = require('../controllers/pythonController');

// Route to fetch filtered graph data
router.get('/process-csv', (req, res) => {
    console.log("CSV Route Triggered!");
    processCSV(req, res);
});

module.exports = router;
