import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [progressData, setProgressData] = useState({});
    const [scoreData, setScoreData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Function to play button click sound
    const playSound = () => {
        const audio = new Audio('/audio/buttonClick.wav'); // Path to the sound file
        audio.play();
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/students/my-courses', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const enlistedCourses = response.data.enlistedCourses;

                const progressRequests = enlistedCourses.map((course) =>
                    axios.get(`http://localhost:5000/api/students/progress/${course._id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    })
                );
                const scoreRequests = enlistedCourses.map((course) =>
                    axios.get(`http://localhost:5000/api/students/score/${course._id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    })
                );

                const progressResponses = await Promise.all(progressRequests);
                const scoreResponses = await Promise.all(scoreRequests);

                const progressMap = {};
                const scoreMap = {};

                enlistedCourses.forEach((course, index) => {
                    progressMap[course._id] = progressResponses[index]?.data.progress || 0;
                    scoreMap[course._id] = scoreResponses[index]?.data.totalScore || 'N/A';
                });

                setCourses(enlistedCourses);
                setProgressData(progressMap);
                setScoreData(scoreMap);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleUnenroll = async (courseId) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/students/unenroll',
                { courseId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert(response.data.message);

            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error('Error unenrolling from course:', error);
            alert(error.response?.data?.message || 'Failed to unenroll');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                padding: '20px',
                background: 'rgba(255, 243, 245, 0.9)', // Subtle table background
                borderRadius: '15px', // Rounded corners for the table container
                boxShadow: '0 8px 16px rgba(200, 200, 200, 0.5)', // Subtle shadow for the container
            }}
        >
            {/* Header Row */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '2px solid #ddd',
                    padding: '10px',
                    marginBottom: '20px',
                    background: 'rgba(255, 223, 237, 0.85)', // Slightly darker header background
                    color: '#333',
                    fontWeight: 'bold',
                    borderRadius: '10px', // Consistent rounded corners for the header
                }}
            >
                <div style={{ flex: 1, padding: '10px' }}>Course Title</div>
                <div style={{ flex: 2, padding: '10px' }}>Description</div>
                <div style={{ flex: 1, padding: '10px' }}>Progress</div>
                <div style={{ flex: 1, padding: '10px' }}>Score</div>
                <div style={{ flex: 1, padding: '10px' }}>Actions</div>
            </div>

            {/* Course Rows */}
            {courses.map((course) => (
                <div
                    key={course._id}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'rgba(255, 223, 237, 0.85)', // Sakura pink row background
                        backgroundImage:
                            'linear-gradient(145deg, rgba(255, 223, 237, 0.9), rgba(255, 243, 245, 0.8))',
                        boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                        borderRadius: '10px',
                        padding: '10px',
                        marginBottom: '15px',
                    }}
                >
                    <div style={{ flex: 1, padding: '10px' }}>{course.title}</div>
                    <div style={{ flex: 2, padding: '10px' }}>{course.description}</div>
                    <div style={{ flex: 1, padding: '10px' }}>{progressData[course._id]}%</div>
                    <div style={{ flex: 1, padding: '10px' }}>{scoreData[course._id]}</div>
                    <div style={{ flex: 1, padding: '10px' }}>
                        <button
                            onClick={() => {
                                playSound(); // Play sound
                                navigate(`/my-courses/${course._id}`); // Navigate to course
                            }}
                            style={{
                                background: '#FFC1E3',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                marginRight: '5px',
                            }}
                        >
                            Go to course
                        </button>
                        <button
                            onClick={() => {

                                handleUnenroll(course._id); // Unenroll from course
                            }}
                            style={{
                                background: '#FF6B6B',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                color: '#fff',
                            }}
                        >
                            Unenroll
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCourses;
