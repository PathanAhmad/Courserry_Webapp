// models/Course.js
const mongoose = require('mongoose');

// Define the schema for questions
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true }, // The question text
    options: [{ type: String, required: true }], // Array of answer options
    correctOption: { type: Number, required: true }, // Index of the correct option in the options array
    explanation: { type: String, required: true }, // Explanation shown for incorrect answers
});

// Define the schema for videos
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the video
    youtubeLink: { type: String, required: true }, // YouTube link for the video
    questions: [questionSchema], // Array of questions associated with this video
});

// Define the schema for courses
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the course
    description: { type: String, required: true }, // Description of the course
    videos: [videoSchema], // Array of videos in the course
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the course
});

// Create the model for courses
const Course = mongoose.model('Course', courseSchema);

// Export the model
module.exports = Course;
