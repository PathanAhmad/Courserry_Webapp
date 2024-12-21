const DailyLog = require('../models/DailyLog');

// Save Daily Log (Prevents Duplicate Logs for Same Day)
const saveDailyLog = async (req, res) => {
    try {
        const { mood, social, stress, sleepQuality, sleepDuration, date } = req.body;
        const userId = req.user.id;

        // Check if the user already submitted a log for today
        const existingLog = await DailyLog.findOne({ userId, date });
        if (existingLog) {
            return res.status(400).json({ message: 'You have already submitted a log for today.' });
        }

        // Save new log if no log exists for today
        const newLog = new DailyLog({
            userId,
            mood,
            social,
            stress,
            sleepQuality,
            sleepDuration,
            date
        });

        await newLog.save();
        res.status(201).json({ message: 'Daily log saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save log', error: error.message });
    }
};

// **Fix Here: Add the Missing getUserLogs Function**
const getUserLogs = async (req, res) => {
    try {
        const logs = await DailyLog.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch logs', error: error.message });
    }
};

// Export the functions
module.exports = { saveDailyLog, getUserLogs };
