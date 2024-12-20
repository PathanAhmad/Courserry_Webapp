import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion for animations
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
            await axios.post(
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

    if (!courses.length)
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#AAAAAA',
                    fontSize: '1.2rem',
                }}
            >
                No courses enrolled yet.
            </div>
        );

    return (
        <motion.div
            style={{
                padding: '20px',
                background: 'rgba(15, 32, 39, 0.9)',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    padding: '10px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#FFFFFF',
                }}
            >
                <div>Course Title</div>
                <div>Progress</div>
                <div>Score</div>
                <div>Actions</div>
            </div>

            {/* Rows */}
            {courses.map((course, index) => (
                <motion.div
                    key={course._id}
                    style={{
                        marginBottom: '15px',
                        background: 'rgba(32, 58, 67, 0.85)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        padding: '10px',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            textAlign: 'center',
                            alignItems: 'center',
                            color: '#FFFFFF',
                        }}
                    >
                        <div>{course.title}</div>
                        <div>{progressData[course._id]}%</div>
                        <div>{scoreData[course._id]}</div>
                        <div>
                            <button
                                onClick={() => navigate(`/my-courses/${course._id}`)}
                                style={{
                                    background: '#1E90FF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    marginRight: '5px',
                                    color: '#FFFFFF',
                                    boxShadow: '0 4px 8px rgba(30, 144, 255, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                Go to course
                            </button>
                            <button
                                onClick={() => handleUnenroll(course._id)}
                                style={{
                                    background: '#FF6B6B',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    boxShadow: '0 4px 8px rgba(255, 107, 107, 0.3)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                Unenroll
                            </button>
                        </div>
                    </div>

                    {/* Description below the row */}
                    <motion.div
                        style={{
                            marginTop: '10px',
                            padding: '10px',
                            background: 'rgba(15, 32, 39, 0.8)',
                            borderRadius: '5px',
                            fontSize: '0.9rem',
                            textAlign: 'left',
                            color: '#CCCCCC',
                            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.2)',
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.2 }}
                    >
                        {course.description}
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default MyCourses;
