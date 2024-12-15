import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // Redirect to login if no token exists
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        // Check if role is specified and doesn't match the user's role
        if (role && userRole !== role) {
            alert('Access Denied. You do not have the required role.');
            localStorage.removeItem('token'); // Clear token for safety
            localStorage.removeItem('role');
            return <Navigate to="/login" />;
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return <Navigate to="/login" />;
    }

    // If valid, render the protected content
    return children;
};

export default ProtectedRoute;
