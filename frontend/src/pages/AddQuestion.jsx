import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './config';

const AddQuestion = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('');
    const [questionData, setQuestionData] = useState({
        questionText: '',
        options: ['', '', '', ''], // Default 4 options
        correctOption: 0,
        explanation: '',
    });
    const [message, setMessage] = useState(null);

    // Fetch all courses created by the admin
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/courses`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Fetch videos for the selected course
    const fetchVideos = async (courseId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/videos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setVideos(response.data.videos);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        setSelectedCourse(courseId);
        setVideos([]); // Reset videos when course changes
        setSelectedVideo(''); // Reset selected video
        if (courseId) {
            fetchVideos(courseId);
        }
    };

    const handleVideoChange = (e) => {
        setSelectedVideo(e.target.value);
    };

    const handleQuestionDataChange = (e, index) => {
        if (index >= 0) {
            const updatedOptions = [...questionData.options];
            updatedOptions[index] = e.target.value;
            setQuestionData({ ...questionData, options: updatedOptions });
        } else {
            setQuestionData({ ...questionData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourse || !selectedVideo) {
            setMessage({ type: 'error', text: 'Please select a course and video first.' });
            return;
        }
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/courses/add-question`,
                {
                    courseId: selectedCourse,
                    videoId: selectedVideo,
                    ...questionData,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMessage({ type: 'success', text: response.data.message });
            setQuestionData({
                questionText: '',
                options: ['', '', '', ''],
                correctOption: 0,
                explanation: '',
            }); // Clear the form
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add question' });
        }
    };

    return (
        <div>
            <h1>Add a Question to a Video</h1>
            {message && (
                <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Course</label>
                    <select value={selectedCourse} onChange={handleCourseChange} required>
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Video</label>
                    <select value={selectedVideo} onChange={handleVideoChange} required>
                        <option value="">-- Select a Video --</option>
                        {videos.map((video) => (
                            <option key={video._id} value={video._id}>
                                {video.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Question Text</label>
                    <input
                        type="text"
                        name="questionText"
                        value={questionData.questionText}
                        onChange={handleQuestionDataChange}
                        required
                    />
                </div>
                <div>
                    <label>Options</label>
                    {questionData.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleQuestionDataChange(e, index)}
                            placeholder={`Option ${index + 1}`}
                            required
                        />
                    ))}
                </div>
                <div>
                    <label>Correct Option (Index)</label>
                    <input
                        type="number"
                        name="correctOption"
                        value={questionData.correctOption}
                        onChange={handleQuestionDataChange}
                        min="0"
                        max="3"
                        required
                    />
                </div>
                <div>
                    <label>Explanation</label>
                    <textarea
                        name="explanation"
                        value={questionData.explanation}
                        onChange={handleQuestionDataChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestion;
