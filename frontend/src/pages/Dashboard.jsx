import React from 'react';

const Dashboard = () => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '3fr 5fr 4fr', // Defines the first row
                gridTemplateRows: '4fr 5fr 3fr', // Defines the second row
                gap: '20px', // Gap between boxes
                height: '100vh',
                padding: '20px',
                background: 'rgba(245, 245, 245, 0)',
            }}
        >
            {/* First row */}
            <div
                style={{
                    gridColumn: '1 / 2',
                    background: '#FFC1E3',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    height: '300px'
                }}
            ></div>
            <div
                style={{
                    gridColumn: '2 / 3',
                    background: '#FFD700',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            ></div>
            <div
                style={{
                    gridColumn: '3 / 4',
                    background: '#98FB98',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            ></div>

            {/* Second row */}
            <div
                style={{
                    gridRow: '2 / 3',
                    gridColumn: '1 / 2',
                    background: '#ADD8E6',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    height: '300px'
                }}
            ></div>
            <div
                style={{
                    gridRow: '2 / 3',
                    gridColumn: '2 / 3',
                    background: '#FFB6C1',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            ></div>
            <div
                style={{
                    gridRow: '2 / 3',
                    gridColumn: '3 / 4',
                    background: '#FFA07A',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            ></div>
        </div>
    );
};

export default Dashboard;
