import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DailyLogModal = ({ onClose, onSave }) => {
    const [logData, setLogData] = useState({
        mood: 3,
        social: 3,
        stress: 3,
        sleepQuality: 3,
        sleepDuration: 8,
        date: new Date().toISOString().split('T')[0]
    });

    const handleChange = (field, value) => {
        setLogData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/api/logs/save`,
                data: logData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response.data);
            alert(response.data.message || 'Log saved successfully');
            onSave(logData);
            onClose();
        } catch (error) {
            console.error('Error Response:', error);  // More verbose error log
            alert(error.response?.data?.message || 'Failed to save log');
        }
    };

    const renderSliderLabels = (labels) => (
        <div style={labelContainerStyle}>
            {labels.map((label, index) => (
                <span key={index} style={labelStyle}>{label}</span>
            ))}
        </div>
    );

    return (
        <motion.div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    e.stopPropagation();
                    onClose();
                }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={overlayStyle}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={modalStyle}
                onClick={(e) => e.stopPropagation()}  // Stop propagation here to avoid accidental modal close
            >
                {/* Close Button */}
                <button
                    onClick={() => onClose()}
                    style={closeButtonStyle}
                >
                    ✖
                </button>

                <h2 style={headerStyle}>Daily Log</h2>

                <div style={scrollContainerStyle}>
                    {/* Mood Slider */}
                    <div style={sliderContainerStyle}>
                        <label>Mood State</label>
                        {renderSliderLabels(['Very Negative', 'Negative', 'Mildly Negative', 'Neutral', 'Mildly Positive', 'Positive', 'Very Positive'])}
                        <input
                            type="range"
                            min="0"
                            max="6"
                            value={logData.mood}
                            onChange={(e) => handleChange('mood', parseInt(e.target.value))}
                            style={sliderStyle}
                        />
                    </div>

                    {/* Social Slider */}
                    <div style={sliderContainerStyle}>
                        <label>Social Interaction Energy</label>
                        {renderSliderLabels(['Very Low', 'Low', 'Mildly Low', 'Neutral', 'Mildly High', 'High', 'Very High'])}
                        <input
                            type="range"
                            min="0"
                            max="6"
                            value={logData.social}
                            onChange={(e) => handleChange('social', parseInt(e.target.value))}
                            style={sliderStyle}
                        />
                    </div>

                    {/* Stress Slider */}
                    <div style={sliderContainerStyle}>
                        <label>Environmental Stress</label>
                        {renderSliderLabels(['Very Low', 'Low', 'Mildly Low', 'Neutral', 'Mildly High', 'High', 'Very High'])}
                        <input
                            type="range"
                            min="0"
                            max="6"
                            value={logData.stress}
                            onChange={(e) => handleChange('stress', parseInt(e.target.value))}
                            style={sliderStyle}
                        />
                    </div>

                    {/* Sleep Quality */}
                    <div style={sliderContainerStyle}>
                        <label>Sleep Quality</label>
                        {renderSliderLabels(['Very Low', 'Low', 'Mildly Low', 'Neutral', 'Mildly High', 'High', 'Very High'])}
                        <input
                            type="range"
                            min="0"
                            max="6"
                            value={logData.sleepQuality}
                            onChange={(e) => handleChange('sleepQuality', parseInt(e.target.value))}
                            style={sliderStyle}
                        />
                    </div>

                    {/* Sleep Duration */}
                    <div style={sliderContainerStyle}>
                        <label>Sleep Duration (hours)</label>
                        <input
                            type="number"
                            min="0"
                            max="12"
                            value={logData.sleepDuration}
                            onChange={(e) => handleChange('sleepDuration', parseInt(e.target.value))}
                            style={numberInputStyle}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();  // Prevent any parent handlers from stopping the click
                            handleSubmit();
                        }}
                        style={submitButtonStyle}
                    >
                        Save Log
                    </motion.button>

                </div>
            </motion.div>
        </motion.div>
    );
};

// Modal Styles
const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',  // Centering
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1050
};

const modalStyle = {
    background: 'linear-gradient(145deg, #1E2A38, #324A5E)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
    width: '500px',
    maxHeight: '80vh',
    textAlign: 'center',
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden'
};

const scrollContainerStyle = {
    maxHeight: '60vh',
    overflowY: 'auto',
    padding: '10px'
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#FFFFFF'
};

const headerStyle = {
    marginBottom: '20px',
    fontSize: '1.8rem'
};

const sliderContainerStyle = {
    marginBottom: '25px',
    textAlign: 'left'
};

const sliderStyle = {
    width: '100%',
    cursor: 'pointer',
    marginTop: '10px'
};

const numberInputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    background: '#1E2A38',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: '1rem',
    marginTop: '10px'
};

const labelContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '0.85rem',
    color: '#D3D3D3'
};

const labelStyle = {
    flex: '1',
    textAlign: 'center'
};

const submitButtonStyle = {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#1E90FF',
    border: 'none',
    borderRadius: '8px',
    color: '#FFFFFF',
    cursor: 'pointer'
};

export default DailyLogModal;
