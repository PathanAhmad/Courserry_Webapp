import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        age: '',
        school: '',
        email: '',
        password: '',
    });
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
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert(error.response.data.message || 'Registration failed');
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
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input name="name" className="form-control" placeholder="Name" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input
                            type="date"
                            name="dateOfBirth"
                            className="form-control"
                            placeholder="Date of Birth"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <select name="gender" className="form-select" onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            placeholder="Age"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input name="school" className="form-control" placeholder="School" onChange={handleChange} required />
                    </div>
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
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="text-center mt-3">
                    Already registered? <Link to="/login">Login here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
