import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyCourses = ({ coursesProp = [], progressDataProp = {}, scoreDataProp = {} }) => {
    const [courses, setCourses] = useState(coursesProp);
    const [progressData, setProgressData] = useState(progressDataProp);
    const [scoreData, setScoreData] = useState(scoreDataProp);
    const navigate = useNavigate();

    useEffect(() => {
        // Sync props with state
        setCourses(coursesProp);
        setProgressData(progressDataProp);
        setScoreData(scoreDataProp);
    }, [coursesProp, progressDataProp, scoreDataProp]);

    const handleUnenroll = async (courseId) => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/students/unenroll`,
                { courseId },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Successfully unenrolled!');
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error('Error unenrolling:', error);
            alert('Failed to unenroll');
        }
    };

    if (!courses.length) return <div>No courses enrolled yet.</div>;

    return (
        <div
            style={{
                padding: '20px',
                background: 'rgba(255, 243, 245, 1)',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(200, 200, 200, 0.5)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    borderBottom: '2px solid #ddd',
                    fontWeight: 'bold',
                }}
            >
                <div>Course Title</div>
                <div>Description</div>
                <div>Progress</div>
                <div>Score</div>
                <div>Actions</div>
            </div>

            {courses.map((course) => (
                <div
                    key={course._id}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        padding: '10px',
                        background: 'rgba(255, 223, 237, 0.85)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                    }}
                >
                    <div>{course.title}</div>
                    <div>{course.description}</div>
                    <div>{progressData[course._id]}%</div>
                    <div>{scoreData[course._id]}</div>
                    <div>
                        <button
                            onClick={() => navigate(`/my-courses/${course._id}`)}
                            style={{
                                background: '#FFC1E3',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                marginRight: '5px',
                            }}
                        >
                            Go to course
                        </button>
                        <button
                            onClick={() => handleUnenroll(course._id)}
                            style={{
                                background: '#FF6B6B',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                            }}
                        >
                            Unenroll
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCourses;
