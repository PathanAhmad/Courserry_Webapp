import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import CreateCourse from './pages/CreateCourse';
import ManageCourses from './pages/ManageCourses';
import EditCourse from './pages/EditCourse';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseDetails from './pages/CourseDetails';
import axios from 'axios';

// Axios Interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="/" element={<App />} />

                                {/* Student Portal */}
                                <Route path="/student-portal/*" element={<StudentPortal />} />
                                <Route
                                    path="/my-courses/:courseId"
                                    element={<ProtectedRoute role="student"><CourseDetails /></ProtectedRoute>}
                                />

                                {/* Admin Portal */}
                                <Route path="/admin-portal/*" element={<AdminPortal />} />
                                <Route
                                    path="/admin-portal/edit-course/:courseId"
                                    element={<ProtectedRoute role="admin"><EditCourse /></ProtectedRoute>}
                                />

                                {/* Catch-All NotFound */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
