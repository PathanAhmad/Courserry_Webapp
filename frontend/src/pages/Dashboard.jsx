import React, { useState } from 'react';
import HeartRateBox from '../components/HeartRateBox';
import DailyLogBox from '../components/DailyLogBox';
import ResumeCourseCTA from '../components/ResumeCourseCTA';
import DailyGraph from '../components/DailyGraph';
import WeeklyGraph from '../components/WeeklyGraph';
import MonthlyGraph from '../components/MonthlyGraph';
import useGraphData from '../hooks/useGraphData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = ({ courses, progressData }) => {
    const [activeGraph, setActiveGraph] = useState('daily');
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-12-31'));
    const [plotType, setPlotType] = useState('daily');
    const [selectedMonth, setSelectedMonth] = useState('1');  // Default to January

    // Pass selectedMonth to the useGraphData hook
    const { graphData } = useGraphData(activeGraph, startDate, endDate, plotType, selectedMonth);
    const loading = graphData.length === 0;

    const renderGraph = () => {
        switch (activeGraph) {
            case 'daily':
                return <DailyGraph data={graphData} />;
            case 'weekly':
                return <WeeklyGraph data={graphData} />;
            case 'monthly':
                return <MonthlyGraph data={graphData} />;
            default:
                return <DailyGraph data={graphData} />;
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                height: '100vh',
                padding: '20px',
                background: 'rgba(245, 245, 245, 0)',
            }}
        >
            <div style={{ display: 'flex', gap: '20px', height: '85%' }}>
                
                {/* Left Side (Resume + Log Box) */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            height: '49.5%',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <ResumeCourseCTA courses={courses} progressData={progressData} />
                    </div>
                    <DailyLogBox />
                </div>

                {/* Graph Box (Yellow Box) */}
                <div
                    style={{
                        flex: 5,
                        background: '#FFD700',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '20px',
                    }}
                >
                    {/* Filters Inside Graph Box */}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                        <div>
                            <label>Month:</label>
                            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Plot Type:</label>
                            <select value={plotType} onChange={(e) => setPlotType(e.target.value)}>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>

                    {/* Graph Area */}
                    <div
                        style={{
                            flexGrow: 1,
                            overflow: 'hidden',
                            borderRadius: '8px',
                            height: '100%',
                        }}
                    >
                        {loading ? (
                            <p>Loading Graph...</p>
                        ) : (
                            <div style={{ width: '100%', height: '100%' }}>
                                {renderGraph()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
