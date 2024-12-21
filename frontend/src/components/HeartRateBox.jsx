import React, { useState, useEffect } from 'react';

const HeartRateBox = () => {
    const [heartRate, setHeartRate] = useState(72);

    useEffect(() => {
        const interval = setInterval(() => {
            const fluctuation = Math.floor(Math.random() * 10) - 5;
            setHeartRate((prev) => Math.max(60, Math.min(120, prev + fluctuation)));
        }, 2000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                flex: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                background: 'linear-gradient(145deg, #1E2A38, #324A5E)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 4px 6px rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#A9C9FF' }}>Heart Rate</h3>
            <span
                style={{
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    textShadow: '0 0 20px rgba(255, 107, 107, 0.7)',
                }}
            >
                {heartRate}
            </span>
            <p style={{ fontSize: '1.1rem', marginTop: '10px', color: '#D3D3D3' }}>bpm</p>

            {/* Smooth Pulsating Animation */}
            <div
                style={{
                    position: 'absolute',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 107, 107, 0.25)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'pulse 1.45s infinite linear',  // Switch to linear for ultra-smooth pulse
                    zIndex: 0,
                }}
            ></div>

            {/* In-line Keyframes for Pulse */}
            <style>
                {`
                    @keyframes pulse {
                        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                        25% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.6; }
                        50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.4; }
                        75% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
                        100% { transform: translate(-50%, -50%) scale(1.7); opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
};

export default HeartRateBox;
