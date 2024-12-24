const { spawn } = require('child_process');
const path = require('path');

const processCSV = (req, res) => {
    const cohortId = req.query.cohort_id || 'ID_1';
    const startDate = req.query.start_date || '2024-01-01';
    const endDate = req.query.end_date || '2024-12-31';
    const plotType = req.query.plot_type || 'daily';

    const pythonScriptPath = path.join(__dirname, '../python/plot_data.py');

    const pythonProcess = spawn('python', [pythonScriptPath, startDate, endDate, plotType]);

    let resultData = '';

    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`Python Error: ${error}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                res.json(JSON.parse(resultData));  // Send processed data as JSON
            } catch (error) {
                res.status(500).json({ error: 'Failed to parse Python response' });
            }
        } else {
            res.status(500).json({ error: 'CSV Processing Failed' });
        }
    });
};

module.exports = { processCSV };
