import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            const userRole = localStorage.getItem('role');

            if (!token) {
                window.location.href = '/login';
                return;
            }

            try {
                // Validate token from the backend
                const response = await axios.get('http://localhost:5000/api/auth/validate-token', {
                    headers: { Authorization: token },
                });

                if (response.data.valid) {
                    if (response.data.role === 'admin') {
                        window.location.href = '/admin-portal';
                    } else if (response.data.role === 'student') {
                        window.location.href = '/student-portal';
                    }
                }
            } catch (error) {
                // If token is invalid/expired
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
            }
        };

        validateToken();
    }, []);

    return (
        <div className="container text-center mt-5">
            <h1 className="text-primary">Redirecting based on role...</h1>
        </div>
    );
};

export default App;
