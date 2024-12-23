import React from 'react';
import HeartRateBox from '../components/HeartRateBox';
import DailyLogBox from '../components/DailyLogBox';
import ResumeCourseCTA from '../components/ResumeCourseCTA';
import TypingTextBox from '../components/TypingTextBox';

const Dashboard = ({ courses, progressData }) => {
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
                {/* <div style={{ flex: 3 }}>
                    <TypingTextBox text="I dunno what to put here. Got anything in mind?" speed={120} />
                </div> */}
                <div
                    style={{
                        flex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Pass "courses" & "progressData" to ResumeCourseCTA */}
                    <ResumeCourseCTA courses={courses} progressData={progressData} />
                </div>
                
                <div
                    style={{
                        flex: 5,
                        background: '#FFD700',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        height: '607.5px'
                    }}
                >Graph</div>

                
            </div>

            {/* Second row */}
            <div style={{ display: 'flex', gap: '20px', height: '42.5%' }}>
                {/* <HeartRateBox /> */}
                <DailyLogBox />          
                <div
                    style={{
                        flex: 5,
                        background: 'transparent',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Dashboard;
