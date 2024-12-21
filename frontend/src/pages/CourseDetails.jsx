import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionModal from '../components/QuestionModal';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import Loading from '../components/Loading';

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
        const audio = new Audio('/audio/ButtonClick.wav');
        audio.play();
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/students/my-courses/${courseId}`,
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
                `${API_BASE_URL}/api/students/video/${videoId}/answers`,
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
            await Promise.all(
                Object.entries(submittedAnswers).map(([questionId, selectedOption]) =>
                    axios.post(
                        `${API_BASE_URL}/api/students/submit-answer`,
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
                `${API_BASE_URL}/api/students/mark-completed`,
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

    if (loading) return <Loading />;
    if (!course) return <div>Course not found.</div>;

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #0F2027, #203A43)',
            }}
        >
            {/* Header Bar */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'linear-gradient(145deg, #0F2027, #2C5364)',
                    color: '#FFFFFF',
                    height: '50px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
            >
                <button
                    style={{
                        border: '1px solid rgba(30, 144, 255, 0.5)',
                        background: 'rgba(32, 58, 67, 0.85)',
                        color: '#FFFFFF',
                        padding: '5px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        playSound();
                        navigate('/student-portal/my-courses', { state: { fromTab: 'my-courses' } });
                    }}
                >
                    Back
                </button>
                <div style={{ flexGrow: 1, textAlign: 'center', fontSize: '1.75rem' }}>
                    {course.title}
                </div>
            </motion.nav>

            <div style={{ display: 'flex', flexGrow: 1, height: 'calc(100vh - 50px)' }}>
                {/* Left Video List */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: '300px',
                        minWidth: '300px',
                        overflowY: 'auto',
                        background: 'rgba(32, 58, 67, 0.85)',
                        padding: '10px',
                    }}
                >
                    <h4 style={{ color: '#FFFFFF', height: '45px' }}>Lecture list:</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {course.videos.map((video) => (
                            <li
                                key={video._id}
                                onClick={() => {
                                    playSound();
                                    setCurrentVideo(video);
                                }}
                                style={{
                                    padding: '10px',
                                    marginBottom: '5px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: currentVideo?._id === video._id ? '#1E90FF' : '#0F2027',
                                    color: '#FFFFFF',
                                    textDecoration: video.isCompleted ? 'line-through' : 'none',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    height: '85px',
                                }}
                            >
                                {video.title}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ flexGrow: 1, padding: '20px' }}
                >
                    {currentVideo ? (
                        <div>
                            <h3 style={{ color: '#FFFFFF' }}>{currentVideo.title}</h3>
                            <iframe
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: '10px',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
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
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                                    backgroundColor: currentVideo.questions.length
                                        ? currentVideo.isCompleted
                                            ? '#AAAAAA'
                                            : '#1E90FF'
                                        : '#203A43',
                                    color: '#FFFFFF',
                                    cursor: currentVideo.isCompleted || !currentVideo.questions.length ? 'not-allowed' : 'pointer',
                                }}
                                onClick={() => {
                                    playSound();
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
                        <p style={{ color: '#FFFFFF' }}>No video selected.</p>
                    )}
                </motion.div>

                {/* Right "Your Answers" Section */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: '400px',
                        overflowY: 'auto',
                        background: 'rgba(15, 32, 39, 0.9)',
                        borderLeft: '1px solid rgba(30, 144, 255, 0.5)',
                        padding: '10px',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <h4 style={{ color: '#FFFFFF', height: '45px' }}>Your Answers:</h4>
                    {answers.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {answers.map((ans, index) => (
                                <li
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: ans.correct ? '#2C5364' : '#990000',
                                        color: '#FFFFFF',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
                        <p style={{ color: '#FFFFFF' }}>No answers yet.</p>
                    )}
                </motion.div>
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
                            backgroundColor: 'rgba(20, 20, 30, 0.95)',
                            borderRadius: '10px',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
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

