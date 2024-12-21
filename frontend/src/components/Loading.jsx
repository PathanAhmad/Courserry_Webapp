import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(15, 32, 39, 0.85)',
                backdropFilter: 'blur(5px)',
                flexDirection: 'column',
            }}
        >
            <motion.div
                style={{
                    width: '70px',
                    height: '70px',
                    border: '6px solid rgba(30, 144, 255, 0.3)',
                    borderTop: '6px solid #1E90FF',
                    borderRadius: '50%',
                    boxShadow: '0 4px 10px rgba(30, 144, 255, 0.5)',
                }}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                }}
            />
            <p
                style={{
                    color: '#FFFFFF',
                    marginTop: '20px',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                }}
            >
                Loading, please wait...
            </p>
        </div>
    );
};

export default Loading;
