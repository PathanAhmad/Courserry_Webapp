import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`http://localhost:5000/api/courses/${courseId}/delete`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCourses((prev) => prev.filter((course) => course._id !== courseId));
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '900px',
                margin: '0 auto',
                color: '#333',
                background: '#F4F7FB',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#004085' }}>
                Manage Courses
            </h1>
            {courses.length > 0 ? (
                courses.map((course) => (
                    <div
                        key={course._id}
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                            marginBottom: '20px',
                            padding: '20px',
                        }}
                    >
                        <h2 style={{ marginBottom: '10px', color: '#212529' }}>{course.title}</h2>
                        <p style={{ color: '#6C757D', marginBottom: '15px' }}>{course.description}</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => navigate(`/admin-portal/edit-course/${course._id}`)}
                                style={{
                                    background: '#004085',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(course._id)}
                                style={{
                                    background: '#DC3545',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', color: '#6C757D' }}>No courses available.</p>
            )}
        </div>
    );
};

export default ManageCourses;
