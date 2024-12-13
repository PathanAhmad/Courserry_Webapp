import React, { useState } from 'react';
import API_BASE_URL from '../config'; // Import API_BASE_URL

const CreateCourse = () => {
    const [course, setCourse] = useState({
        title: '',
        description: '',
        videos: [],
    });
    const [message, setMessage] = useState(null);

    const handleCourseChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleVideoCountChange = (count) => {
        const videoCount = parseInt(count, 10) || 0;
        const updatedVideos = Array(videoCount)
            .fill(null)
            .map((_, index) => course.videos[index] || { title: '', youtubeLink: '', questions: [] });
        setCourse({ ...course, videos: updatedVideos });
    };

    const handleQuestionCountChange = (videoIndex, count) => {
        const questionCount = parseInt(count, 10) || 0;
        const updatedQuestions = Array(questionCount)
            .fill(null)
            .map(
                (_, index) =>
                    course.videos[videoIndex]?.questions[index] || {
                        questionText: '',
                        options: ['', '', '', ''],
                        correctOption: 0,
                        explanation: '',
                    }
            );
        const updatedVideos = [...course.videos];
        updatedVideos[videoIndex].questions = updatedQuestions;
        setCourse({ ...course, videos: updatedVideos });
    };

    const handleVideoChange = (index, field, value) => {
        const updatedVideos = [...course.videos];
        updatedVideos[index][field] = value;
        setCourse({ ...course, videos: updatedVideos });
    };

    const handleQuestionChange = (videoIndex, questionIndex, field, value) => {
        const updatedVideos = [...course.videos];
        updatedVideos[videoIndex].questions[questionIndex][field] = value;
        setCourse({ ...course, videos: updatedVideos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(course),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Course created successfully!' });
                setCourse({
                    title: '',
                    description: '',
                    videos: [],
                }); // Reset form
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to create course.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
            console.error('Error creating course:', error);
        }
    };

    return (
        <div
            style={{
                padding: '20px',
                background: '#f9f9f9',
                borderRadius: '10px',
                maxWidth: '800px',
                margin: '0 auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                color: '#333',
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                Create a New Course
            </h1>
            {message && (
                <p style={{ textAlign: 'center', color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                {/* Course Title */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555' }}>Course Title</label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleCourseChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginTop: '5px',
                        }}
                    />
                </div>
                {/* Course Description */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555' }}>Description</label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleCourseChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginTop: '5px',
                            resize: 'vertical',
                        }}
                    ></textarea>
                </div>
                {/* Video Count */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', color: '#555' }}>Number of Videos</label>
                    <input
                        type="number"
                        min="0"
                        value={course.videos.length}
                        onChange={(e) => handleVideoCountChange(e.target.value)}
                        style={{
                            width: '80px',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            marginLeft: '10px',
                        }}
                    />
                </div>
                {/* Videos */}
                {course.videos.map((video, videoIndex) => (
                    <div
                        key={videoIndex}
                        style={{
                            marginBottom: '30px',
                            paddingLeft: '20px',
                            borderLeft: '3px solid #ddd',
                        }}
                    >
                        <h3 style={{ color: '#333' }}>Video {videoIndex + 1}</h3>
                        {/* Video Title */}
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Video Title"
                                value={video.title}
                                onChange={(e) => handleVideoChange(videoIndex, 'title', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    marginTop: '5px',
                                }}
                            />
                        </div>
                        {/* Video Link */}
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="url"
                                placeholder="YouTube Link"
                                value={video.youtubeLink}
                                onChange={(e) => handleVideoChange(videoIndex, 'youtubeLink', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    marginTop: '5px',
                                }}
                            />
                        </div>
                        {/* Question Count */}
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ fontWeight: 'bold', color: '#555' }}>
                                Number of Questions
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={video.questions.length}
                                onChange={(e) =>
                                    handleQuestionCountChange(videoIndex, e.target.value)
                                }
                                style={{
                                    width: '80px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    marginLeft: '10px',
                                }}
                            />
                        </div>
                        {/* Questions */}
                        {video.questions.map((question, questionIndex) => (
                            <div
                                key={questionIndex}
                                style={{
                                    marginBottom: '10px',
                                    paddingLeft: '20px',
                                    borderLeft: '3px solid #eee',
                                }}
                            >
                                {/* Question Text */}
                                <input
                                    type="text"
                                    placeholder="Question Text"
                                    value={question.questionText}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            videoIndex,
                                            questionIndex,
                                            'questionText',
                                            e.target.value
                                        )
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        marginBottom: '10px',
                                    }}
                                />
                                {/* Options */}
                                {question.options.map((option, optionIndex) => (
                                    <input
                                        key={optionIndex}
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) => {
                                            const updatedOptions = [...question.options];
                                            updatedOptions[optionIndex] = e.target.value;
                                            handleQuestionChange(
                                                videoIndex,
                                                questionIndex,
                                                'options',
                                                updatedOptions
                                            );
                                        }}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            marginBottom: '5px',
                                        }}
                                    />
                                ))}
                                {/* Correct Option */}
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ fontWeight: 'bold', color: '#555' }}>
                                        Correct Option Index
                                    </label>
                                    <input
                                        type="number"
                                        value={question.correctOption}
                                        onChange={(e) =>
                                            handleQuestionChange(
                                                videoIndex,
                                                questionIndex,
                                                'correctOption',
                                                e.target.value
                                            )
                                        }
                                        min="0"
                                        max="3"
                                        required
                                        style={{
                                            width: '80px',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            marginLeft: '10px',
                                        }}
                                    />
                                </div>
                                {/* Explanation */}
                                <textarea
                                    placeholder="Explanation"
                                    value={question.explanation}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            videoIndex,
                                            questionIndex,
                                            'explanation',
                                            e.target.value
                                        )
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                ></textarea>
                            </div>
                        ))}
                    </div>
                ))}
                {/* Create Course Button */}
                <button
                    type="submit"
                    style={{
                        background: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        display: 'block',
                        margin: '20px auto',
                    }}
                >
                    Publish Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
