import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionModal from '../components/QuestionModal';
import { motion, AnimatePresence } from 'framer-motion';

const CourseDetails = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [answers, setAnswers] = useState([]);

    // Function to play button click sound
    const playSound = () => {
        const audio = new Audio('/audio/ButtonClick.wav'); // Updated path to ButtonClick.wav
        audio.play();
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/students/my-courses/${courseId}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                setCourse(response.data.course);
                setCurrentVideo(response.data.course.videos[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course details:', error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const fetchAnswers = async (videoId) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/students/video/${videoId}/answers`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setAnswers(response.data.answers);
        } catch (error) {
            console.error('Error fetching answers:', error);
            setAnswers([]);
        }
    };

    useEffect(() => {
        if (currentVideo && currentVideo.isCompleted) {
            fetchAnswers(currentVideo._id);
        } else {
            setAnswers([]);
        }
    }, [currentVideo]);

    const handleModalSubmit = async (submittedAnswers) => {
        try {
            const response = await Promise.all(
                Object.entries(submittedAnswers).map(([questionId, selectedOption]) =>
                    axios.post(
                        'http://localhost:5000/api/students/submit-answer',
                        {
                            courseId,
                            videoId: currentVideo._id,
                            questionId,
                            selectedOption,
                        },
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                    )
                )
            );

            await axios.post(
                'http://localhost:5000/api/students/mark-completed',
                { videoId: currentVideo._id },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            setCourse((prev) => ({
                ...prev,
                videos: prev.videos.map((video) =>
                    video._id === currentVideo._id ? { ...video, isCompleted: true } : video
                ),
            }));
            setShowModal(false);
            fetchAnswers(currentVideo._id);
        } catch (error) {
            console.error('Error submitting answers:', error.response?.data || error.message);
            alert('Error submitting answers. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!course) return <div>Course not found.</div>;

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'url(/images/beach.jpg) no-repeat center center',
                backgroundSize: 'cover',
            }}
        >
            {/* Header Bar */}
            <nav
                style={{
                    background: 'linear-gradient(145deg, rgba(255, 223, 237, 0.9), rgba(255, 243, 245, 0.8))',
                    color: '#000',
                    height: '50px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 16px rgba(255, 192, 203, 1)',
                }}
            >
                <button
                    style={{
                        border: '1px solid rgba(255, 182, 193, 0.5)',
                        background: 'rgba(255, 223, 237, 0.85)',
                        color: '#000',
                        padding: '5px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        playSound(); // Play sound
                        navigate('/student-portal', { state: { fromTab: 'my-courses' } });
                    }}
                >
                    Back
                </button>

                <div style={{ flexGrow: 1, textAlign: 'center', fontSize: '1.75rem' }}>
                    {course.title}
                </div>
            </nav>

            <div style={{ display: 'flex', flexGrow: 1, height: 'calc(100vh - 50px)' }}>
                {/* Left Video List */}
                <div
                    style={{
                        width: '300px',
                        minWidth: '300px',
                        overflowY: 'auto',
                        background: 'rgba(255, 243, 245, 0.0)',
                        padding: '10px',
                        marginTop: '55px',
                    }}
                >
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {course.videos.map((video) => (
                            <li
                                key={video._id}
                                onClick={() => {
                                    playSound(); // Play sound
                                    setCurrentVideo(video);
                                }}
                                style={{
                                    padding: '10px',
                                    marginBottom: '5px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: currentVideo?._id === video._id ? '#FFC1E3' : '#FFF5F8',
                                    color: currentVideo?._id === video._id ? '#000' : '#555',
                                    textDecoration: video.isCompleted ? 'line-through' : 'none',
                                    boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                                    height: '85px',
                                }}
                            >
                                {video.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div style={{ flexGrow: 1, padding: '20px' }}>
                    {currentVideo ? (
                        <div>
                            <h3>{currentVideo.title}</h3>
                            <iframe
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '10px',
                                    boxShadow: '0 8px 16px rgba(255, 192, 203, 1)',
                                }}
                                src={currentVideo.youtubeLink.replace('watch?v=', 'embed/')}
                                title={currentVideo.title}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            <button
                                style={{
                                    marginTop: '10px',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    backgroundColor: currentVideo.questions.length
                                        ? currentVideo.isCompleted
                                            ? '#E0E0E0'
                                            : '#FFC1E3'
                                        : '#FFF3C6',
                                    color: '#000',
                                    cursor: currentVideo.isCompleted || !currentVideo.questions.length ? 'not-allowed' : 'pointer',
                                }}
                                onClick={() => {
                                    playSound(); // Play sound
                                    !currentVideo.isCompleted && setShowModal(true);
                                }}
                                disabled={currentVideo.isCompleted || !currentVideo.questions.length}
                            >
                                {currentVideo.questions.length
                                    ? currentVideo.isCompleted
                                        ? 'Completed'
                                        : 'Ready to Answer? Click Here'
                                    : 'No Questions Yet'}
                            </button>
                        </div>
                    ) : (
                        <p>No video selected.</p>
                    )}
                </div>

                {/* Right "Your Answers" Section */}
                <div
                    style={{
                        width: '400px',
                        overflowY: 'auto',
                        background: 'rgba(255, 243, 245, 0.9)',
                        borderLeft: '1px solid rgba(255, 182, 193, 0.5)',
                        padding: '10px',
                        boxShadow: 'inset 0 0 10px rgba(255, 192, 203, 0.5)',
                    }}
                >
                    <h4 style={{ marginTop: '17.5px' }}>Your Answers:</h4>
                    {answers.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {answers.map((ans, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: ans.correct ? '#D4F1C6' : '#FFC1C1',
                                        color: '#000',
                                        boxShadow: '0 4px 8px rgba(255, 182, 193, 0.5)',
                                    }}
                                >
                                    <strong>Q:</strong> {ans.question}
                                    <br />
                                    <strong>{ans.correct ? 'Correct!' : 'Wrong.'}</strong>
                                    {ans.explanation && (
                                        <>
                                            <br />
                                            <strong>Explanation:</strong> {ans.explanation}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No answers yet.</p>
                    )}
                </div>
            </div>

            {/* Animated Modal */}
            <AnimatePresence>
                {showModal && currentVideo.questions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            duration: 0.3,
                        }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(255, 243, 245, 1)',
                            borderRadius: '10px',
                            boxShadow: '0 8px 16px rgba(255, 192, 203, 1)',
                            zIndex: 1050,
                            padding: '20px',
                            width: '600px',
                            height: '500px',
                        }}
                    >
                        <QuestionModal
                            questions={currentVideo.questions}
                            onClose={() => setShowModal(false)}
                            onSubmitAnswers={handleModalSubmit}
                            isCompleted={currentVideo.isCompleted}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CourseDetails;
