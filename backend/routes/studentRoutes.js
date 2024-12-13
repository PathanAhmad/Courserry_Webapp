const express = require('express');
const { getAllCourses, enlistInCourse, getEnlistedCourses, getCourseContent, submitAnswer, markVideoCompleted, getCourseProgress, getTotalScore, unenrollFromCourse, getAnswersForVideo } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to fetch all courses
router.get('/all', getAllCourses);

// Protected route to enlist in a course
router.post('/enlist', authMiddleware, enlistInCourse);

// Fetch all courses the student is enlisted in
router.get('/my-courses', authMiddleware, getEnlistedCourses);

// Fetch content of a specific enlisted course
router.get('/my-courses/:courseId', authMiddleware, getCourseContent);

// Submit an answer to a question
router.post('/submit-answer', authMiddleware, submitAnswer);

// Mark a video as completed
router.post('/mark-completed', authMiddleware, markVideoCompleted);

// Get course progress
router.get('/progress/:courseId', authMiddleware, getCourseProgress);

// Fetch total score for a specific course
router.get('/score/:courseId', authMiddleware, getTotalScore);

// Route to unenroll from a course
router.post('/unenroll', authMiddleware, unenrollFromCourse);

router.get('/video/:videoId/answers', authMiddleware, getAnswersForVideo);

module.exports = router;
