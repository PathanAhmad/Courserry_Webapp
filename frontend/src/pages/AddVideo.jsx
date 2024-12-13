import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVideo = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [videoData, setVideoData] = useState({ title: '', youtubeLink: '' });
    const [message, setMessage] = useState(null);

    // Fetch all courses created by the admin
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setCourses(response.data.courses); // Assuming the response contains an array of courses
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourse) {
            setMessage({ type: 'error', text: 'Please select a course first.' });
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5000/api/courses/add-video',
                { courseId: selectedCourse, ...videoData },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMessage({ type: 'success', text: response.data.message });
            setVideoData({ title: '', youtubeLink: '' }); // Clear the form
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add video' });
        }
    };

    return (
        <div>
            <h1>Add a Video to a Course</h1>
            {message && (
                <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Course</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                    >
                        <option value="">-- Select a Course --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Video Title</label>
                    <input
                        type="text"
                        name="title"
                        value={videoData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>YouTube Link</label>
                    <input
                        type="url"
                        name="youtubeLink"
                        value={videoData.youtubeLink}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Video</button>
            </form>
        </div>
    );
};

export default AddVideo;
