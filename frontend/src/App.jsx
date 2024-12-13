import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role'); // Retrieve role from localStorage
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
        } else if (userRole === 'admin') {
            navigate('/admin-portal'); // Redirect to admin portal
        } else if (userRole === 'student') {
            navigate('/student-portal'); // Redirect to student portal
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Clear the role as well
        alert('Logged out successfully!');
        navigate('/login');
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="text-primary">Redirecting based on role...</h1>
            {/* Fallback content if user manually accesses '/' */}
        </div>
    );
};

export default App;
