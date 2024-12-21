import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/auth.css';
import API_BASE_URL from '../config'; // Import API_BASE_URL

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);  // Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Start loading spinner
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === 'admin') {
                navigate('/admin-portal');
            } else if (role === 'student') {
                navigate('/student-portal/dashboard');
            } else {
                alert('Unknown role. Please contact support.');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);  // Stop loading spinner
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="auth-container"
            >
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Button with Spinner */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isLoading}  // Disable button when loading
                    >
                        {isLoading ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

                <p className="text-center mt-3">
                    Don’t have an account? <Link to="/register">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
