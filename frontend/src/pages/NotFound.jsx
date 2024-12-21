import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();
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
                background: 'linear-gradient(145deg, rgba(15, 32, 39, 1), rgba(32, 58, 67, 0.95))',
                textAlign: 'center',
                color: '#FFFFFF',
                padding: '20px',
            }}
        >
            {/* Animated Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: '3rem', marginBottom: '10px', color: '#1E90FF' }}
            >
                404 - Page Not Found
            </motion.h1>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontSize: '1.2rem', color: '#CCCCCC', marginBottom: '30px' }}
            >
                Sorry, the page you're looking for doesn't exist or has been moved.
            </motion.p>

            {/* Button with Hover Animation */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={redirectToPortal}
                style={{
                    padding: '12px 25px',
                    backgroundColor: '#1E90FF',
                    border: 'none',
                    borderRadius: '5px',
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(30, 144, 255, 0.5)',
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                Go to Dashboard
            </motion.button>
        </div>
    );
};

export default NotFound;
