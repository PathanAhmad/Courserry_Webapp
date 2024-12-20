import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion
import API_BASE_URL from '../config';

const BrowseCourses = ({ initialCourses = [], onCourseEnlisted }) => {
    const [courses, setCourses] = useState(initialCourses);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Sync props with state
        setCourses(initialCourses);
    }, [initialCourses]);

    const handleEnlist = async (courseId) => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/students/enlist`,
                { courseId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Successfully enlisted!');
            if (onCourseEnlisted) onCourseEnlisted(); // Trigger refresh in StudentPortal
        } catch (error) {
            console.error('Error enlisting in course:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Enlistment failed');
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                No courses available to browse.
            </div>
        );

    return (
        <div>
            <div style={{ padding: '10px', textAlign: 'center' }}>
                <motion.input
                    type="text"
                    placeholder="Search Courses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    whileFocus={{
                        scale: 1.05,
                        boxShadow: '0 0 10px rgba(30, 144, 255, 0.5)',
                    }}
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid rgba(200, 200, 200, 0.5)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease-in-out',
                    }}
                />
            </div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { delayChildren: 0.2, staggerChildren: 0.1 },
                    },
                }}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                }}
            >
                {filteredCourses.map((course) => (
                    <motion.div
                        key={course._id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            height: '300px',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            textAlign: 'center',
                            width: '250px',
                            background: 'rgba(15, 32, 39, 0.85)',
                            color: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    fontSize: '1.2rem',
                                    marginBottom: '10px',
                                    height: '75px',
                                }}
                            >
                                {course.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: '0.9rem',
                                    color: '#CCCCCC',
                                    marginBottom: '15px',
                                    height: '100px',
                                    overflow: 'hidden',
                                }}
                            >
                                {course.description}
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEnlist(course._id)}
                            style={{
                                background: '#1E90FF',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px',
                                cursor: 'pointer',
                                color: '#FFFFFF',
                                boxShadow: '0 4px 8px rgba(30, 144, 255, 0.5)',
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            Enlist
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default BrowseCourses;
