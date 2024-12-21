import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RedirectingScreen from './components/RedirectingScreen'; // Import the RedirectingScreen component

const App = () => {
    const navigate = useNavigate();
    const [redirecting, setRedirecting] = useState(true); // Track redirection status

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            const userRole = localStorage.getItem('role');

            if (!token) {
                navigate('/login'); // Redirect to login if no token is found
                return;
            }

            try {
                // Validate token with the backend
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/auth/validate-token`, {
                    headers: { Authorization: token },
                });

                if (response.data.valid) {
                    // Redirect based on the user role
                    if (response.data.role === 'admin') {
                        navigate('/admin-portal/dashboard');
                    } else if (response.data.role === 'student') {
                        navigate('/student-portal/dashboard');
                    }
                } else {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    navigate('/login');
                }
            } catch (error) {
                // Handle errors during token validation
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/login');
            } finally {
                setRedirecting(false);  // Hide redirecting screen after redirect
            }
        };

        validateToken();
    }, [navigate]);

    if (redirecting) {
        return <RedirectingScreen />;  // Show RedirectingScreen during token validation
    }

    return (
        <div>
            {/* Main App Content */}
        </div>
    );
};

export default App;
