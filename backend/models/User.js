const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    age: { type: Number, required: true },
    school: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student', enum: ['student', 'admin', 'school'] },
    enlistedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], 
    answers: [
    {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to course
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course.videos' }, // Reference to video
        questionId: { type: mongoose.Schema.Types.ObjectId }, // Reference to question
        isCorrect: { type: Boolean }, // Whether the answer was correct
    }
],

    completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course.videos' }], // New field
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
