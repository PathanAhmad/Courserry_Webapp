import axios from 'axios';

export const fetchCourseDetails = async (courseId, setCourse, setLoading) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCourse(response.data.course);
        if (setLoading) setLoading(false);
    } catch (error) {
        console.error('Error fetching course details:', error.response?.data || error.message);
        if (setLoading) setLoading(false);
    }
};
