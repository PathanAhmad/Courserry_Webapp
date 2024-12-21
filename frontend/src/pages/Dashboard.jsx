import React from 'react';
import HeartRateBox from '../components/HeartRateBox';

const Dashboard = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px', // Gap between rows
                height: '100vh',
                padding: '20px',
                background: 'rgba(245, 245, 245, 0)',
            }}
        >
            {/* First row */}
            <div style={{ display: 'flex', gap: '20px', height: '42.5%' }}>
                <div
                    style={{
                        flex: 3,
                        background: '#FFC1E3',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                ></div>
                <div
                    style={{
                        flex: 5,
                        background: '#FFD700',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                ></div>
                <div
                    style={{
                        flex: 4,
                        background: '#98FB98',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                ></div>
            </div>

            {/* Second row */}
            <div style={{ display: 'flex', gap: '20px', height: '42.5%' }}>
                <div
                    style={{
                        flex: 4,
                        background: '#ADD8E6',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                ></div>
                <div
                    style={{
                        flex: 5,
                        background: '#FFB6C1',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                ></div>
                <HeartRateBox />
            </div>
        </div>
    );
};

export default Dashboard;
