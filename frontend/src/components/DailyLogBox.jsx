import React, { useState, useEffect } from 'react';
import DailyLogModal from './DailyLogModal';
import axios from 'axios';

const DailyLogBox = () => {
    const [showModal, setShowModal] = useState(false);
    const [logEntries, setLogEntries] = useState(() => {
        return JSON.parse(localStorage.getItem('dailyLogs')) || [];
    });

    const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

    useEffect(() => {
        const checkTodayLog = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/logs/user-logs`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Check if today's log exists
                const todayLog = response.data.logs.find(log => log.date === today);
                setHasSubmittedToday(!!todayLog);
            } catch (error) {
                console.error('Failed to fetch daily logs:', error);
            }
        };

        checkTodayLog();
    }, []);

    const saveLog = (logData) => {
        const updatedLogs = [...logEntries, logData];
        setLogEntries(updatedLogs);
        localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs));
        setHasSubmittedToday(true);  // Prevent reopening after saving
    };

    return (
        <div
            style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                background: 'linear-gradient(145deg, #1E2A38, #324A5E)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                color: '#FFF',
                cursor: hasSubmittedToday ? 'not-allowed' : 'pointer',
                opacity: hasSubmittedToday ? 0.6 : 1
            }}
            onClick={() => {
                if (!hasSubmittedToday) {
                    setShowModal(true);
                } else {
                    alert('You have already submitted your daily log for today.');
                }
            }}
        >
            <h3>Daily Log</h3>
            <p>{hasSubmittedToday ? 'Log already submitted for today' : 'Click to add your daily log'}</p>

            {showModal && (
                <DailyLogModal onClose={() => setShowModal(false)} onSave={saveLog} />
            )}
        </div>
    );
};

export default DailyLogBox;
