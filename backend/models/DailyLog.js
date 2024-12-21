const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mood: { type: Number, required: true },
    social: { type: Number, required: true },
    stress: { type: Number, required: true },
    sleepQuality: { type: Number, required: true },
    sleepDuration: { type: Number, required: true },
    date: { type: String, required: true }
});

// Create a unique constraint to ensure one log per user per day
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);
