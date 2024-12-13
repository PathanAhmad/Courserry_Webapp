const Course = require('../models/Course');
const User = require('../models/User');

// Fetch all available courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().select('-videos'); // Exclude videos for a summary view
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Enlist in a course
const enlistInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Ensure the user is a student
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find the student and update their enlisted courses
        const student = await User.findById(req.user.id);
        if (student.enlistedCourses.includes(courseId)) {
            return res.status(400).json({ message: 'You are already enlisted in this course' });
        }

        student.enlistedCourses.push(courseId);
        await student.save();

        res.status(200).json({ message: 'Successfully enlisted in course', enlistedCourses: student.enlistedCourses });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getEnlistedCourses = async (req, res) => {
    try {
        // Find the student by ID and populate their enlisted courses
        const student = await User.findById(req.user.id).populate('enlistedCourses', 'title description'); // Populate only the title and description
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ enlistedCourses: student.enlistedCourses });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCourseContent = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Check if the student is enlisted in the course
        const student = await User.findById(req.user.id);
        if (!student.enlistedCourses.includes(courseId)) {
            return res.status(403).json({ message: 'Access denied. You are not enlisted in this course.' });
        }

        // Find the course and return its content
        const course = await Course.findById(courseId).populate('videos.questions');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Include completion state for each video
        const courseWithCompletion = {
            ...course._doc,
            videos: course.videos.map((video) => {
                const isCompleted = student.completedVideos.includes(video._id);
                return {
                    ...video._doc,
                    isCompleted,
                };
            }),
        };

        res.status(200).json({ course: courseWithCompletion });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const submitAnswer = async (req, res) => {
    try {
        const { courseId, videoId, questionId, selectedOption } = req.body;

        // Check if the course, video, and question exist
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const video = course.videos.id(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        const question = video.questions.id(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const isCorrect = question.correctOption === selectedOption;

        // Find the student
        const student = await User.findById(req.user.id);

        // Prevent duplicate submissions
        const existingAnswer = student.answers.find(
            (ans) => ans.questionId.toString() === questionId && ans.videoId.toString() === videoId
        );

        if (existingAnswer) {
            return res.status(400).json({ message: 'You have already submitted an answer for this question' });
        }

        // Save the new answer
        student.answers.push({ courseId, videoId, questionId, isCorrect });
        await student.save();

        // Calculate total unique correct answers for the course
        const uniqueAnswers = new Map();
        student.answers.forEach((ans) => {
            if (ans.isCorrect && ans.courseId.toString() === courseId) {
                uniqueAnswers.set(ans.questionId.toString(), ans);
            }
        });

        const totalScore = uniqueAnswers.size;

        res.status(200).json({
            message: 'Answer submitted successfully',
            isCorrect,
            explanation: isCorrect ? null : question.explanation,
            totalScore,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const markVideoCompleted = async (req, res) => {
    try {
        const { videoId } = req.body;

        // Ensure the user has answered all questions in the video
        const course = await Course.findOne({ 'videos._id': videoId });
        if (!course) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const video = course.videos.id(videoId);
        const totalQuestions = video.questions.length;

        const student = await User.findById(req.user.id);
        const answeredQuestions = student.answers.filter((ans) => ans.videoId.toString() === videoId).length;

        if (answeredQuestions < totalQuestions) {
            return res.status(400).json({ message: 'You need to answer all questions to complete this video' });
        }

        // Mark video as completed
        if (!student.completedVideos.includes(videoId)) {
            student.completedVideos.push(videoId);
            await student.save();
        }

        res.status(200).json({ message: 'Video marked as completed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const student = await User.findById(req.user.id);
        const completedVideos = student.completedVideos.filter((vid) =>
            course.videos.some((video) => video._id.toString() === vid.toString())
        ).length;

        const progress = (completedVideos / course.videos.length) * 100;

        res.status(200).json({ progress });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTotalScore = async (req, res) => {
    try {
        const { courseId } = req.params;

        const student = await User.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const totalScore = student.answers.filter(
            (ans) => ans.courseId.toString() === courseId && ans.isCorrect
        ).length;

        res.status(200).json({ totalScore });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Unenroll from a course
const unenrollFromCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Ensure the user is a student
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Find the student
        const student = await User.findById(req.user.id);
        if (!student.enlistedCourses.includes(courseId)) {
            return res.status(400).json({ message: 'You are not enlisted in this course' });
        }

        // Remove the course from the student's enlistedCourses
        student.enlistedCourses = student.enlistedCourses.filter(
            (id) => id.toString() !== courseId
        );
        await student.save();

        res.status(200).json({ message: 'Successfully unenrolled from course' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAnswersForVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        const student = await User.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const videoAnswers = student.answers.filter((ans) => ans.videoId.toString() === videoId);

        const course = await Course.findOne({ 'videos._id': videoId });
        if (!course) {
            return res.status(404).json({ message: 'Course or Video not found' });
        }

        const video = course.videos.id(videoId);

        const detailedAnswers = videoAnswers.map((ans) => {
            const question = video.questions.id(ans.questionId);
            return {
                question: question.questionText,
                correct: ans.isCorrect,
                explanation: !ans.isCorrect ? question.explanation : null,
            };
        });

        res.status(200).json({ answers: detailedAnswers });
    } catch (error) {
        console.error('Error fetching answers:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllCourses, enlistInCourse, getEnlistedCourses, getCourseContent, submitAnswer, markVideoCompleted, getCourseProgress, getTotalScore, unenrollFromCourse, getAnswersForVideo };
