import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion

const QuestionModal = ({ questions, onClose, onSubmitAnswers, isCompleted }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current question
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

    const playSound = () => {
        const audio = new Audio('/audio/ButtonClick.wav');
        audio.play();
    };

    const handleAnswerSelect = (questionId, selectedOption) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: selectedOption,
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSubmit = () => {
        if (!isCompleted) {
            if (Object.keys(selectedAnswers).length !== questions.length) {
                alert('Please answer all questions before submitting.');
                return;
            }
            onSubmitAnswers(selectedAnswers);
        }
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                    position: 'relative',
                    background: 'linear-gradient(145deg, #203A43, #2C5364)',
                    padding: '20px',
                    borderRadius: '15px',
                    width: '600px',
                    maxHeight: '90vh',
                    textAlign: 'center',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                }}
            >
                <button
                    onClick={() => {
                        playSound();
                        onClose();
                    }}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        color: '#FFFFFF',
                    }}
                >
                    ✖
                </button>
                <h2 style={{ color: '#FFFFFF', marginBottom: '20px' }}>
                    Question {currentIndex + 1}
                </h2>
                <div
                    style={{
                        height: '350px',
                        overflowY: 'auto',
                        marginBottom: '20px',
                        padding: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                    }}
                >
                    <p style={{ color: '#FFFFFF', height: '50px' }}>{questions[currentIndex].questionText}</p>
                    <div>
                        {questions[currentIndex].options.map((option, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (!isCompleted) {
                                        playSound();
                                        handleAnswerSelect(questions[currentIndex]._id, index);
                                    }
                                }}
                                style={{
                                    display: 'block',
                                    margin: '10px auto',
                                    padding: '10px',
                                    backgroundColor:
                                        selectedAnswers[questions[currentIndex]._id] === index
                                            ? '#1E90FF'
                                            : '#203A43',
                                    color: '#FFFFFF',
                                    border: '1px solid rgba(30, 144, 255, 0.5)',
                                    borderRadius: '8px',
                                    width: '90%',
                                    cursor: isCompleted ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    transition: 'all 0.3s ease',
                                }}
                                disabled={isCompleted}
                            >
                                {option}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => {
                            playSound();
                            handlePrevious();
                        }}
                        disabled={currentIndex === 0}
                        style={{
                            marginRight: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: currentIndex === 0 ? '#555' : '#1E90FF',
                            color: '#FFFFFF',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => {
                            playSound();
                            handleNext();
                        }}
                        disabled={currentIndex === questions.length - 1}
                        style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor:
                                currentIndex === questions.length - 1 ? '#555' : '#1E90FF',
                            color: '#FFFFFF',
                            cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Next
                    </button>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        playSound();
                        handleSubmit();
                    }}
                    disabled={isCompleted}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: isCompleted ? '#555' : '#1E90FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isCompleted ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isCompleted ? 'Already Completed' : 'Submit'}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default QuestionModal;
