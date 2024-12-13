const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Ensure the request is from an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const course = new Course({
            title,
            description,
            createdBy: req.user.id,
        });
        await course.save();

        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add a video to a course
const addVideoToCourse = async (req, res) => {
    try {
        const { courseId, title, youtubeLink } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Ensure the request is from the course creator
        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        course.videos.push({ title, youtubeLink, questions: [] });
        await course.save();

        res.status(200).json({ message: 'Video added successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add a question to a video
const addQuestionToVideo = async (req, res) => {
    try {
        const { courseId, videoId, questionText, options, correctOption, explanation } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const video = course.videos.id(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Ensure the request is from the course creator
        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        video.questions.push({ questionText, options, correctOption, explanation });
        await course.save();

        res.status(200).json({ message: 'Question added successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCoursesByAdmin = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Fetch courses created by the logged-in admin
        const courses = await Course.find({ createdBy: req.user.id });
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getVideosByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ videos: course.videos }); // Return only the videos
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit a course
const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        course.title = title || course.title;
        course.description = description || course.description;
        await course.save();

        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Course.deleteOne({ _id: courseId });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit a video
const editVideo = async (req, res) => {
    try {
        const { courseId, videoId } = req.params;
        const { title, youtubeLink } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const video = course.videos.id(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        video.title = title || video.title;
        video.youtubeLink = youtubeLink || video.youtubeLink;
        await course.save();

        res.status(200).json({ message: 'Video updated successfully', video });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a video
const deleteVideo = async (req, res) => {
    try {
        const { courseId, videoId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const video = course.videos.id(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Course.deleteOne({ _id: videoId });;
        await course.save();

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Edit a question
const editQuestion = async (req, res) => {
    try {
        const { courseId, videoId, questionId } = req.params;
        const { questionText, options, correctOption, explanation } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const video = course.videos.id(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        const question = video.questions.id(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        question.questionText = questionText || question.questionText;
        question.options = options || question.options;
        question.correctOption = correctOption || question.correctOption;
        question.explanation = explanation || question.explanation;

        await course.save();

        res.status(200).json({ message: 'Question updated successfully', question });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a question
const deleteQuestion = async (req, res) => {
    try {
        const { courseId, videoId, questionId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const video = course.videos.id(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        const question = video.questions.id(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (course.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Course.deleteOne({ _id: questionId });
        await course.save();

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createCourse, addVideoToCourse, addQuestionToVideo, getCoursesByAdmin, getVideosByCourse, editCourse, deleteCourse, editVideo, deleteVideo, editQuestion, deleteQuestion, getCourseDetails };
