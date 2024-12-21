import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import MyCourses from './MyCourses';
import BrowseCourses from './BrowseCourses';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import axios from 'axios';
import API_BASE_URL from '../config';
import Loading from '../components/Loading';

const StudentPortal = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [courses, setCourses] = useState([]);
    const [progressData, setProgressData] = useState({});
    const [scoreData, setScoreData] = useState({});
    const [browseCourses, setBrowseCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        setActiveTab(currentPath || 'dashboard');
    }, [location.pathname]);

    const fetchData = async () => {
        try {
            setLoading(true);

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

            const browseCoursesResponse = await axios.get(`${API_BASE_URL}/api/students/all`);
            setBrowseCourses(browseCoursesResponse.data.courses);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const refreshData = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const playSound = () => {
        const audio = new Audio('/audio/ButtonClick.wav');
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
        return <Loading />;
    }

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'url(/images/wave_modern.jpg) no-repeat center center',
                backgroundSize: 'cover',
                backdropFilter: 'blur(4px)',
            }}
        >
            <nav
                style={{
                    background: 'linear-gradient(145deg, rgba(15, 32, 39, 0.95), rgba(32, 58, 67, 0.95))',
                    color: '#FFFFFF',
                    height: '50px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
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
                                backgroundColor: activeTab === 'dashboard' ? '#1E90FF' : 'transparent',
                                color: activeTab === 'dashboard' ? '#FFFFFF' : '#AAAAAA',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: activeTab === 'dashboard' ? '0 4px 8px rgba(30, 144, 255, 0.5)' : 'none',
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
                                backgroundColor: activeTab === 'my-courses' ? '#1E90FF' : 'transparent',
                                color: activeTab === 'my-courses' ? '#FFFFFF' : '#AAAAAA',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: activeTab === 'my-courses' ? '0 4px 8px rgba(30, 144, 255, 0.5)' : 'none',
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
                                backgroundColor: activeTab === 'browse-courses' ? '#1E90FF' : 'transparent',
                                color: activeTab === 'browse-courses' ? '#FFFFFF' : '#AAAAAA',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: activeTab === 'browse-courses' ? '0 4px 8px rgba(30, 144, 255, 0.5)' : 'none',
                            }}
                        >
                            Browse Courses
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        border: '1px solid rgba(30, 144, 255, 0.5)',
                        background: 'rgba(32, 58, 67, 0.85)',
                        color: '#FFFFFF',
                        padding: '5px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        boxShadow: '0 4px 8px rgba(30, 144, 255, 0.3)',
                    }}
                >
                    Logout
                </button>
            </nav>

            <div style={{ flexGrow: 1, padding: '20px' }}>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
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
