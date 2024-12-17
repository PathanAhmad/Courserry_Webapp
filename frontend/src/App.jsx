import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import CreateCourse from './pages/CreateCourse';
import AddVideo from './pages/AddVideo';
import AddQuestion from './pages/AddQuestion';
import ManageCourses from './pages/ManageCourses';
import EditCourse from './pages/EditCourse';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import BrowseCourses from './pages/BrowseCourses';
import './index.css';

// Context for caching courses and progress
export const DataContext = createContext();

const AppWrapper = () => {
    const [cachedCourses, setCachedCourses] = useState([]);
    const [progressData, setProgressData] = useState({});
    const [scoreData, setScoreData] = useState({});

    useEffect(() => {
        // Optional: Pre-fetch courses here once if needed
    }, []);

    return (
        <DataContext.Provider value={{ cachedCourses, setCachedCourses, progressData, setProgressData, scoreData, setScoreData }}>
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
        </DataContext.Provider>
    );
};

export default AppWrapper;
