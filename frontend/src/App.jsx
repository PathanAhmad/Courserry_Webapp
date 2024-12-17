import React, { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if (!token) {
            window.location.href = '/login'; // Full reload to /login
        } else if (userRole === 'admin') {
            window.location.href = '/admin-portal';
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
