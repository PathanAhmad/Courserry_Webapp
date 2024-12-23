import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/auth.css';
import API_BASE_URL from '../config'; // Import API_BASE_URL
import TypingTextBox from '../components/TypingTextBox';



const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);  // Add loading state
    const [showTextA, setShowTextA] = useState(false);  // Text A visibility
    const [showTextB, setShowTextB] = useState(false);  // Text B visibility
    const [showTextC, setShowTextC] = useState(false);  // Text B visibility
    const [showTextD, setShowTextD] = useState(false);  // Text B visibility
    const [showTextE, setShowTextE] = useState(false);  // Text B visibility
    const [showTextF, setShowTextF] = useState(false);  // Text B visibility
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }

        setTimeout(() => setShowTextA(true), 1000);
        setTimeout(() => setShowTextB(true), 2000);
        setTimeout(() => setShowTextC(true), 4000);

        setTimeout(() => setShowTextD(true), 5500);
        setTimeout(() => setShowTextE(true), 6500);
        setTimeout(() => setShowTextF(true), 7500);

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
            <div
            style={{
                position: 'absolute',  // Take the element out of the normal flow
                top: '10px',           // Position from the top
                left: '10px',          // Position from the left
                zIndex: 1000,          // Ensure it stays on top of other elements
                pointerEvents: 'none', // Prevents interaction, makes it ghost-like
                paddingTop: '250px',
                paddingLeft: '100px'
            }}
            >
            {showTextA && (
                    <TypingTextBox text="Welcome" speed={50} disappearAfter={750}/>
                )}
            {showTextB && (
                    <TypingTextBox text="to" speed={50} disappearAfter={750}/>
                )}
            {showTextC && (
                    <TypingTextBox text="SPARK" gradient={true} speed={100} size="7rem"/>
                )}
            </div>
            <div
            style={{
                position: 'absolute',  // Take the element out of the normal flow
                top: '10px',           // Position from the top
                right: '10px',          // Position from the left
                zIndex: 1000,          // Ensure it stays on top of other elements
                pointerEvents: 'none', // Prevents interaction, makes it ghost-like
                paddingTop: '250px',
                paddingRight: '100px'
            }}
            >
            {showTextD && (
                    <TypingTextBox text="A Project" speed={100}/>
                )}
            {showTextE && (
                    <TypingTextBox text="by" speed={100}/>
                )}
            {showTextF && (
                    <TypingTextBox text="Sarah Undre" gradient={true} speed={100}/>
                )}
            </div>
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
