import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    // Determine the user's role from localStorage
    const userRole = localStorage.getItem('role');

    const redirectToPortal = () => {
        if (userRole === 'admin') {
            navigate('/admin-portal/dashboard');
        } else {
            navigate('/student-portal/dashboard');
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                textAlign: 'center',
                padding: '20px',
            }}
        >
            <h1 style={{ fontSize: '2.5rem', color: '#dc3545' }}>Page Not Found</h1>
            <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                Sorry, the page you're looking for doesn't exist.
            </p>
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Go Back
            </button>
            <button
                onClick={redirectToPortal} // Redirect based on role
                style={{
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default NotFound;
