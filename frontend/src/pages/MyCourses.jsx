import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

const MyCourses = ({ coursesProp = [], progressDataProp = {}, scoreDataProp = {} }) => {
    const [courses, setCourses] = useState(coursesProp);
    const [progressData, setProgressData] = useState(progressDataProp);
    const [scoreData, setScoreData] = useState(scoreDataProp);
    const navigate = useNavigate();

    useEffect(() => {
        // Sync props with state
        setCourses(coursesProp);
        setProgressData(progressDataProp);
        setScoreData(scoreDataProp);
    }, [coursesProp, progressDataProp, scoreDataProp]);

    const handleUnenroll = async (courseId) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/students/unenroll`,
                { courseId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Successfully unenrolled!');
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error('Error unenrolling:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to unenroll');
        }
    };

    if (!courses.length) return <div>No courses enrolled yet.</div>;

    return (
        <div
            style={{
                padding: '20px',
                background: 'rgba(255, 243, 245, 1)',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(200, 200, 200, 0.5)',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    padding: '10px',
                    borderBottom: '2px solid #ddd',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                <div>Course Title</div>
                <div>Progress</div>
                <div>Score</div>
                <div>Actions</div>
            </div>

            {/* Rows */}
            {courses.map((course) => (
                <div
                    key={course._id}
                    style={{
                        marginBottom: '15px',
                        background: 'rgba(255, 223, 237, 0.85)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                        padding: '10px',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            textAlign: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div>{course.title}</div>
                        <div>{progressData[course._id]}%</div>
                        <div>{scoreData[course._id]}</div>
                        <div>
                            <button
                                onClick={() => navigate(`/my-courses/${course._id}`)}
                                style={{
                                    background: '#FFC1E3',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    marginRight: '5px',
                                }}
                            >
                                Go to course
                            </button>
                            <button
                                onClick={() => handleUnenroll(course._id)}
                                style={{
                                    background: '#FF6B6B',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                }}
                            >
                                Unenroll
                            </button>
                        </div>
                    </div>

                    {/* Description below the row */}
                    <div
                        style={{
                            marginTop: '10px',
                            padding: '5px',
                            background: '#FFF3F8',
                            borderRadius: '5px',
                            fontSize: '0.9rem',
                            textAlign: 'left',
                        }}
                    >
                        {course.description}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCourses;
