import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        // Decode token to check for expiration
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
            // Token expired, clear storage and redirect
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            alert('Session expired. Please log in again.');
            return <Navigate to="/login" />;
        }
    } catch (error) {
        // Invalid token, clear storage and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Invalid token. Please log in again.');
        return <Navigate to="/login" />;
    }

    // If role is provided, ensure the user has the correct role
    if (role && userRole !== role) {
        alert('Access Denied. You do not have the required role.');
        return <Navigate to="/login" />;
    }

    // If everything is valid, render the children (protected page)
    return children;
};

export default ProtectedRoute;
