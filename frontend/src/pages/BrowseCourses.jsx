import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Import API_BASE_URL

const BrowseCourses = ({ onCourseEnlisted }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/students/all`); // Updated URL
                setCourses(response.data.courses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEnlist = async (courseId) => {
        const token = localStorage.getItem('token'); // Retrieve the token
        try {
            await axios.post(
                `${API_BASE_URL}/api/students/enlist`, // Updated URL
                { courseId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Successfully enlisted in the course!');
            onCourseEnlisted(); // Trigger the refresh in MyCourses
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Enlistment failed');
        }
    };

    const filteredCourses = courses.filter((course) => {
        const regex = new RegExp(`^${searchQuery}`, 'i'); // Match from the start of the title, case-insensitive
        return regex.test(course.title);
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Search Box */}
            <div style={{ padding: '10px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search Courses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '300px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                    }}
                />
            </div>

            {/* Course Cards */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '20px',
                }}
            >
                {filteredCourses.map((course) => (
                    <div
                        key={course._id}
                        style={{
                            background: 'rgba(255, 243, 245, 1)',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                            width: '250px',
                            padding: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <h3 style={{ color: '#333', height: '75px' }}>{course.title}</h3>
                        <p style={{ color: '#666', height: '75px' }}>{course.description}</p>
                        <button
                            onClick={() => handleEnlist(course._id)}
                            style={{
                                background: '#FFC1E3',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                            }}
                        >
                            Enlist
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseCourses;
