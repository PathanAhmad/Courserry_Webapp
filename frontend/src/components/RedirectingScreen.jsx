import React from 'react';

const RedirectingScreen = () => {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(145deg, rgba(15, 32, 39, 1), rgba(32, 58, 67, 0.95))',
                color: '#FFFFFF',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    padding: '40px',
                    borderRadius: '15px',
                    background: 'rgba(15, 32, 39, 0.8)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
            >
                <h1
                    style={{
                        fontSize: '2rem',
                        marginBottom: '15px',
                        color: '#1E90FF',
                        textShadow: '0 2px 10px rgba(30, 144, 255, 0.6)',
                    }}
                >
                    Redirecting...
                </h1>
                <p
                    style={{
                        fontSize: '1.1rem',
                        color: '#B0C4DE',
                    }}
                >
                    Taking you to your dashboard. Please wait.
                </p>
            </div>
        </div>
    );
};

export default RedirectingScreen;
