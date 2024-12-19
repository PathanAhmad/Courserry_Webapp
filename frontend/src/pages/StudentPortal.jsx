import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import MyCourses from './MyCourses';
import BrowseCourses from './BrowseCourses';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import axios from 'axios';
import API_BASE_URL from '../config';

const StudentPortal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard'); // Default tab is Dashboard
    const [courses, setCourses] = useState([]);
    const [progressData, setProgressData] = useState({});
    const [scoreData, setScoreData] = useState({});
    const [browseCourses, setBrowseCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sync activeTab state with the current URL
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop(); // Get last part of the path
        setActiveTab(currentPath || 'dashboard'); // Default to 'dashboard'
    }, [location.pathname]);

    // Function to fetch and cache data
    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch MyCourses data
            const myCoursesResponse = await axios.get(`${API_BASE_URL}/api/students/my-courses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const enlistedCourses = myCoursesResponse.data.enlistedCourses;

            const progressRequests = enlistedCourses.map((course) =>
                axios.get(`${API_BASE_URL}/api/students/progress/${course._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
            );
            const scoreRequests = enlistedCourses.map((course) =>
                axios.get(`${API_BASE_URL}/api/students/score/${course._id}`, {
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

            // Fetch BrowseCourses data
            const browseCoursesResponse = await axios.get(`${API_BASE_URL}/api/students/all`);
            setBrowseCourses(browseCoursesResponse.data.courses);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // Refresh data when needed
    const refreshData = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Function to play button click sound
    const playSound = () => {
        const audio = new Audio('/audio/ButtonClick.wav'); // Path to ButtonClick.wav
        audio.play();
    };

    const handleLogout = () => {
        playSound();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Logged out successfully!');
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'url(/images/minimal_clouds.jpg) no-repeat center center',
                backgroundSize: 'cover',
            }}
        >
            <nav
                style={{
                    background: 'linear-gradient(145deg, rgba(255, 223, 237, 0.9), rgba(255, 243, 245, 0.8))',
                    color: '#000',
                    height: '50px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 16px rgba(255, 192, 203, 1)',
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <button
                            onClick={() => {
                                playSound();
                                navigate('/student-portal/dashboard');
                            }}
                            style={{
                                border: 'none',
                                backgroundColor: activeTab === 'dashboard' ? '#FFC1E3' : 'transparent',
                                color: activeTab === 'dashboard' ? '#000' : '#555',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                boxShadow: activeTab === 'dashboard' ? '0 4px 8px rgba(255, 192, 203, 0.5)' : 'none',
                            }}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => {
                                playSound();
                                navigate('/student-portal/my-courses');
                            }}
                            style={{
                                border: 'none',
                                backgroundColor: activeTab === 'my-courses' ? '#FFC1E3' : 'transparent',
                                color: activeTab === 'my-courses' ? '#000' : '#555',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                boxShadow: activeTab === 'my-courses' ? '0 4px 8px rgba(255, 192, 203, 0.5)' : 'none',
                            }}
                        >
                            My Courses
                        </button>
                        <button
                            onClick={() => {
                                playSound();
                                navigate('/student-portal/browse-courses');
                            }}
                            style={{
                                border: 'none',
                                backgroundColor: activeTab === 'browse-courses' ? '#FFC1E3' : 'transparent',
                                color: activeTab === 'browse-courses' ? '#000' : '#555',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                boxShadow: activeTab === 'browse-courses' ? '0 4px 8px rgba(255, 192, 203, 0.5)' : 'none',
                            }}
                        >
                            Browse Courses
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        border: '1px solid rgba(255, 182, 193, 0.5)',
                        background: 'rgba(255, 223, 237, 0.85)',
                        color: '#000',
                        padding: '5px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Logout
                </button>
            </nav>

            <div style={{ flexGrow: 1, padding: '20px' }}>
                <Routes>
                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="my-courses"
                        element={
                            <MyCourses
                                coursesProp={courses}
                                progressDataProp={progressData}
                                scoreDataProp={scoreData}
                            />
                        }
                    />
                    <Route
                        path="browse-courses"
                        element={
                            <BrowseCourses
                                initialCourses={browseCourses}
                                onCourseEnlisted={refreshData}
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default StudentPortal;
