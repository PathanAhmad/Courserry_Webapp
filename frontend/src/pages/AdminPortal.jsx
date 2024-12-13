import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateCourse from './CreateCourse';
import ManageCourses from './ManageCourses';

const AdminPortal = () => {
    const [activeTab, setActiveTab] = useState('dashboard'); // Default tab is Dashboard
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Logged out successfully!');
        navigate('/login');
    };

    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h2>Welcome to the Admin Dashboard!</h2>
                    <p>This section is under construction. Stay tuned for updates!</p>
                </div>
            );
        }
        if (activeTab === 'create-course') {
            return <CreateCourse />;
        }
        if (activeTab === 'manage-courses') {
            return <ManageCourses />;
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
                background: 'url(/images/admin-bg.jpg) no-repeat center center',
                backgroundSize: 'cover',
            }}
        >
            <nav
                style={{
                    background: 'linear-gradient(145deg, rgba(200, 230, 255, 0.9), rgba(255, 245, 245, 0.8))',
                    height: '50px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexGrow: 1 }}>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        style={{
                            border: 'none',
                            backgroundColor: activeTab === 'dashboard' ? '#C2E4FF' : 'transparent',
                            color: activeTab === 'dashboard' ? '#000' : '#555',
                            padding: '5px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('create-course')}
                        style={{
                            border: 'none',
                            backgroundColor: activeTab === 'create-course' ? '#C2E4FF' : 'transparent',
                            color: activeTab === 'create-course' ? '#000' : '#555',
                            padding: '5px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Create Course
                    </button>
                    <button
                        onClick={() => setActiveTab('manage-courses')}
                        style={{
                            border: 'none',
                            backgroundColor: activeTab === 'manage-courses' ? '#C2E4FF' : 'transparent',
                            color: activeTab === 'manage-courses' ? '#000' : '#555',
                            padding: '5px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Manage Courses
                    </button>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        border: '1px solid #ccc',
                        background: 'rgba(255, 245, 245, 0.85)',
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

export default AdminPortal;
