import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const BrowseCourses = ({ initialCourses = [], onCourseEnlisted }) => {
    const [courses, setCourses] = useState(initialCourses);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(!initialCourses.length);

    useEffect(() => {
        if (initialCourses.length) return; // Use cached data if available

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/students/all`);
                setCourses(response.data.courses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, [initialCourses]);

    const handleEnlist = async (courseId) => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/students/enlist`,
                { courseId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Successfully enlisted!');
            if (onCourseEnlisted) onCourseEnlisted();
        } catch (error) {
            console.error('Error enlisting in course:', error);
            alert('Enlistment failed');
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div>
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
                    }}
                />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {filteredCourses.map((course) => (
                    <div
                        key={course._id}
                        style={{
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                            textAlign: 'center',
                            width: '250px',
                            background: 'rgba(255, 243, 245, 1)',
                        }}
                    >
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <button
                            onClick={() => handleEnlist(course._id)}
                            style={{
                                background: '#FFC1E3',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px',
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
