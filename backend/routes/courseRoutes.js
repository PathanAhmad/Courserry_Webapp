const express = require('express');
const { getCoursesByAdmin, createCourse, addVideoToCourse, addQuestionToVideo, getVideosByCourse, editCourse, deleteCourse, editVideo, deleteVideo, editQuestion, deleteQuestion, getCourseDetails } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch courses created by the admin
router.get('/', authMiddleware, getCoursesByAdmin);

// Route to fetch course details
router.get('/:courseId', authMiddleware, getCourseDetails);

// Route to create a course
router.post('/create', authMiddleware, createCourse);

// Route to add a video to a course
router.post('/add-video', authMiddleware, addVideoToCourse);

// Route to add a question to a video
router.post('/add-question', authMiddleware, addQuestionToVideo);

// Route to fetch videos for a specific course
router.get('/:courseId/videos', authMiddleware, getVideosByCourse);

// Edit or delete a course
router.put('/:courseId/edit', authMiddleware, editCourse);
router.delete('/:courseId/delete', authMiddleware, deleteCourse);

// Edit or delete a video
router.put('/:courseId/videos/:videoId/edit', authMiddleware, editVideo);
router.delete('/:courseId/videos/:videoId/delete', authMiddleware, deleteVideo);

// Edit or delete a question
router.put('/:courseId/videos/:videoId/questions/:questionId/edit', authMiddleware, editQuestion);
router.delete('/:courseId/videos/:videoId/questions/:questionId/delete', authMiddleware, deleteQuestion);

module.exports = router;
