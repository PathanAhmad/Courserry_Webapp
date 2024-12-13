import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MyCourses from './MyCourses';
import BrowseCourses from './BrowseCourses';
import Dashboard from './Dashboard';

const StudentPortal = () => {
    const location = useLocation(); // Hook to access location state
    const [activeTab, setActiveTab] = useState(location.state?.fromTab || 'dashboard'); // Default tab is "Dashboard"
    const navigate = useNavigate();
    const myCoursesRef = useRef(null);

    // Function to play button click sound
    const playSound = () => {
        const audio = new Audio('/audio/ButtonClick.wav'); // Path to ButtonClick.wav
        audio.play();
    };

    const handleLogout = () => {
        playSound(); // Play sound
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Logged out successfully!');
        navigate('/login');
    };

    const handleRefreshCourses = () => {
        if (myCoursesRef.current) {
            myCoursesRef.current();
        }
    };

    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return <Dashboard />;
        }
        if (activeTab === 'my-courses') {
            return <MyCourses ref={myCoursesRef} />;
        }
        if (activeTab === 'browse-courses') {
            return <BrowseCourses onCourseEnlisted={handleRefreshCourses} />;
        }
        return null;
    };

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'url(/images/beach.jpg) no-repeat center center',
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
                                playSound(); // Play sound
                                setActiveTab('dashboard');
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
                                playSound(); // Play sound
                                setActiveTab('my-courses');
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
                                playSound(); // Play sound
                                setActiveTab('browse-courses');
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

            <div style={{ flexGrow: 1, padding: '20px' }}>{renderContent()}</div>
        </div>
    );
};

export default StudentPortal;
