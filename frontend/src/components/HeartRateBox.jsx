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
                background: 'transparent',  // Full transparency
                boxShadow: 'none',  // No outer shadow
                color: '#FFFFFF',
                position: 'relative',
                overflow: 'visible',
            }}
        >
            <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '10px',
                color: '#A9C9FF',
                textShadow: '0 0 10px rgba(169, 201, 255, 0.7)'
            }}>
                Heart Rate
            </h3>
            <span
                style={{
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    textShadow: '0 0 30px rgba(255, 107, 107, 0.9)',
                }}
            >
                {heartRate}
            </span>
            <p style={{
                fontSize: '1.1rem',
                marginTop: '10px',
                color: '#D3D3D3',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
            }}>
                bpm
            </p>

            {/* Smooth Pulsating Animation */}
            <div
                style={{
                    position: 'absolute',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 107, 107, 0.3)',  // Subtle pulse
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'pulse 1.5s infinite ease-out',
                    zIndex: -1,
                }}
            ></div>

            {/* In-line Keyframes for Pulse */}
            <style>
                {`
                    @keyframes pulse {
                        0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                        50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.3; }
                        100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
                    }
                `}
            </style>
        </div>
    );
};

export default HeartRateBox;
