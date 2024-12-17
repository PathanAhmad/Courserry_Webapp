import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if (!token) {
            navigate('/login');
            window.location.reload(); // Force reload for Firefox
        } else if (userRole === 'admin') {
            navigate('/admin-portal');
            window.location.reload();
        } else if (userRole === 'student') {
            navigate('/student-portal');
            window.location.reload();
        }
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <h1 className="text-primary">Redirecting based on role...</h1>
        </div>
    );
};

export default App;
