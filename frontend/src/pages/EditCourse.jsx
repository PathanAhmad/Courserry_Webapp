import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../config'; // Import API_BASE_URL
import Loading from '../components/Loading';

const EditCourse = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCourse(response.data.course);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

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

    const handleOptionChange = (videoIndex, questionIndex, optionIndex, value) => {
        const updatedVideos = [...course.videos];
        updatedVideos[videoIndex].questions[questionIndex].options[optionIndex] = value;
        setCourse({ ...course, videos: updatedVideos });
    };

    const removeVideo = (index) => {
        const updatedVideos = [...course.videos];
        updatedVideos.splice(index, 1);
        setCourse({ ...course, videos: updatedVideos });
    };

    const removeQuestion = (videoIndex, questionIndex) => {
        const updatedVideos = [...course.videos];
        updatedVideos[videoIndex].questions.splice(questionIndex, 1);
        setCourse({ ...course, videos: updatedVideos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/courses/${courseId}/edit`, // Updated URL
                course,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMessage({ type: 'success', text: 'Course updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update course' });
        }
    };

    if (loading) return <Loading />;
    if (!course) return <div>Course not found.</div>;

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
                Edit Course
            </h1>
            <form onSubmit={handleSubmit}>
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
                {course.videos.map((video, videoIndex) => (
                    <div
                        key={videoIndex}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '15px',
                            marginBottom: '20px',
                        }}
                    >
                        <h3 style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                            Video {videoIndex + 1}
                            <button
                                type="button"
                                onClick={() => removeVideo(videoIndex)}
                                style={{
                                    background: 'transparent',
                                    color: '#FF6B6B',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                            >
                                &times;
                            </button>
                        </h3>
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
                                marginBottom: '10px',
                            }}
                        />
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
                                marginBottom: '10px',
                            }}
                        />
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ fontWeight: 'bold', color: '#555' }}>Number of Questions</label>
                            <input
                                type="number"
                                min="0"
                                value={video.questions.length}
                                onChange={(e) => handleQuestionCountChange(videoIndex, e.target.value)}
                                style={{
                                    width: '80px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    marginLeft: '10px',
                                }}
                            />
                        </div>
                        {video.questions.map((question, questionIndex) => (
                            <div
                                key={questionIndex}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    marginBottom: '10px',
                                }}
                            >
                                <h4 style={{ display: 'flex', alignItems: 'center', color: '#555' }}>
                                    Question {questionIndex + 1}
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(videoIndex, questionIndex)}
                                        style={{
                                            background: 'transparent',
                                            color: '#FF6B6B',
                                            border: 'none',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        &times;
                                    </button>
                                </h4>
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
                                {question.options.map((option, optionIndex) => (
                                    <input
                                        key={optionIndex}
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                videoIndex,
                                                questionIndex,
                                                optionIndex,
                                                e.target.value
                                            )
                                        }
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
                                <textarea
                                    placeholder="Explanation"
                                    value={question.explanation}
                                    onChange={(e) =>
                                        handleQuestionChange(videoIndex, questionIndex, 'explanation', e.target.value)
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
                        margin: '0 auto',
                    }}
                >
                    Update Course
                </button>
                {message && (
                    <p
                        style={{
                            textAlign: 'center',
                            marginTop: '10px',
                            color: message.type === 'success' ? 'green' : 'red',
                        }}
                    >
                        {message.text}
                    </p>
                )}
            </form>
        </div>
    );
};

export default EditCourse;
