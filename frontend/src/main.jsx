import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import CreateCourse from './pages/CreateCourse';
import AddVideo from './pages/AddVideo';
import AddQuestion from './pages/AddQuestion';
import ManageCourses from './pages/ManageCourses'; // Import ManageCourses
import EditCourse from './pages/EditCourse'; // Import EditCourse
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseDetails from './pages/CourseDetails';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Axios Interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');

            // Redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* General Routes */}
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student Portal */}
                <Route
                    path="/student-portal"
                    element={
                        <ProtectedRoute role="student">
                            <StudentPortal />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-courses/:courseId"
                    element={
                        <ProtectedRoute role="student">
                            <CourseDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Portal */}
                <Route
                    path="/admin-portal"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminPortal />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-portal/create-course"
                    element={
                        <ProtectedRoute role="admin">
                            <CreateCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-portal/add-video"
                    element={
                        <ProtectedRoute role="admin">
                            <AddVideo />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-portal/add-question"
                    element={
                        <ProtectedRoute role="admin">
                            <AddQuestion />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-portal/manage-courses"
                    element={
                        <ProtectedRoute role="admin">
                            <ManageCourses />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-portal/edit-course/:courseId"
                    element={
                        <ProtectedRoute role="admin">
                            <EditCourse />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
