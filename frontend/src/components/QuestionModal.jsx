import React, { useState } from 'react';

const QuestionModal = ({ questions, onClose, onSubmitAnswers, isCompleted }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current question
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

    // Function to play button click sound
    const playSound = () => {
        const audio = new Audio('/audio/ButtonClick.wav'); // Path to ButtonClick.wav
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
            onSubmitAnswers(selectedAnswers); // Submit the selected answers
        }
        onClose(); // Close the modal
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 1)', // Sakura pink background
                    padding: '20px',
                    borderRadius: '10px',
                    width: '600px',
                    maxHeight: '90vh',
                    textAlign: 'center',
                    boxShadow: '0 8px 16px rgba(255, 192, 203, 1)', // Pink shadow
                    overflow: 'hidden',
                }}
            >
                <button
                    onClick={() => {
                        playSound(); // Play sound
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
                        color: '#555',
                    }}
                >
                    ✖
                </button>
                <h2 style={{ color: '#333' }}>Question {currentIndex + 1}</h2>
                <div
                    style={{
                        height: '300px',
                        overflowY: 'auto',
                        marginBottom: '20px',
                    }}
                >
                    <p style={{ color: '#333', margin: '10px' }}>{questions[currentIndex].questionText}</p>
                    <div>
                        {questions[currentIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (!isCompleted) {
                                        playSound(); // Play sound
                                        handleAnswerSelect(questions[currentIndex]._id, index);
                                    }
                                }}
                                style={{
                                    display: 'block',
                                    margin: '10px auto',
                                    padding: '10px',
                                    backgroundColor:
                                        selectedAnswers[questions[currentIndex]._id] === index
                                            ? '#FFC1E3' // Light pink for selected
                                            : '#FFF5F8', // Softer pink for default
                                    color: '#333',
                                    border: '1px solid rgba(255, 182, 193, 0.5)',
                                    borderRadius: '5px',
                                    width: '90%',
                                    cursor: isCompleted ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 8px rgba(255, 192, 203, 0.5)',
                                }}
                                disabled={isCompleted}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => {
                            playSound(); // Play sound
                            handlePrevious();
                        }}
                        disabled={currentIndex === 0}
                        style={{
                            marginRight: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: currentIndex === 0 ? '#E0E0E0' : '#FFC1E3',
                            color: currentIndex === 0 ? '#aaa' : '#333',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => {
                            playSound(); // Play sound
                            handleNext();
                        }}
                        disabled={currentIndex === questions.length - 1}
                        style={{
                            marginLeft: '10px',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor:
                                currentIndex === questions.length - 1 ? '#E0E0E0' : '#FFC1E3',
                            color: currentIndex === questions.length - 1 ? '#aaa' : '#333',
                            cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        Next
                    </button>
                </div>
                <button
                    onClick={() => {
                        playSound(); // Play sound
                        handleSubmit();
                    }}
                    disabled={isCompleted}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: isCompleted ? '#E0E0E0' : '#FFC1E3',
                        color: isCompleted ? '#aaa' : '#333',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isCompleted ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isCompleted ? 'Already Completed' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default QuestionModal;
