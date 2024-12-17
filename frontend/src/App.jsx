import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
    
        if (!token) {
            window.location.href = '/login'; // Use full-page reload for Firefox
        } else if (userRole === 'admin') {
            window.location.href = '/admin-portal'; // Full reload ensures proper routing
        } else if (userRole === 'student') {
            window.location.href = '/student-portal';
        }
    }, []);
    

    return (
        <div className="container text-center mt-5">
            <h1 className="text-primary">Redirecting based on role...</h1>
        </div>
    );
};

export default App;
