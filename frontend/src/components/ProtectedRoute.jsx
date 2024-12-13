import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        // If a specific role is required and it doesn't match, redirect to login
        alert('Access Denied. You do not have the required role.');
        return <Navigate to="/login" />;
    }

    // If everything is valid, render the children (protected page)
    return children;
};

export default ProtectedRoute;
