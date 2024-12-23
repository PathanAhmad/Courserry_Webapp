const { spawn } = require('child_process');
const path = require('path');

const processCSV = (req, res) => {
    const startDate = new Date(req.query.start_date).toISOString().slice(0, 10) || '2024-01-01';
    const endDate = new Date(req.query.end_date).toISOString().slice(0, 10) || '2024-12-30';
    const plotType = req.query.plot_type || 'daily';
    const selectedMonth = req.query.month || '1';

    console.log("Plot Type Sent to Python:", plotType);  // Debugging log

    const pythonScriptPath = path.join(__dirname, '../python/plot_data.py');
    const pythonProcess = spawn('python', [pythonScriptPath, startDate, endDate, plotType, selectedMonth]);

    let resultData = '';

    pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
        console.log("Raw Python Output:", resultData);  // Debugging
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`Python Error: ${error}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                // Extract only JSON data (array or object)
                const jsonMatch = resultData.match(/\[.*\]|\{.*\}/s);  
                if (jsonMatch) {
                    res.json(JSON.parse(jsonMatch[0]));  // Send valid JSON
                } else {
                    res.status(500).json({ error: 'No valid graph data returned' });
                }
            } catch (error) {
                console.error("Failed to parse Python response:", resultData);
                res.status(500).json({
                    error: 'Failed to parse Python response',
                    rawOutput: resultData
                });
            }
        } else {
            res.status(500).json({ error: 'CSV Processing Failed' });
        }
    });
};

module.exports = { processCSV };
