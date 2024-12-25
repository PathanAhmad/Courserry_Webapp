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

    const { graphData } = useGraphData(activeGraph, startDate, endDate, plotType, selectedMonth);
    const loading = graphData.length === 0;

    // Render graph with spinner logic
    const renderGraph = () => {
        if (loading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            border: '4px solid rgba(0, 0, 0, 0.1)',
                            borderLeftColor: '#FFD700',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            animation: 'spin 1s linear infinite',
                        }}
                    />
                </div>
            );
        }

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

                {/* Graph Box */}
                <div
                    style={{
                        flex: 5,
                        background: 'White',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '20px',
                    }}
                >
                    {/* Filters */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px',
                        }}
                    >
                        <div>
                            <label>Month:</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                disabled={plotType === 'monthly'}
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                }}
                            >
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Plot Type:</label>
                            <select
                                value={plotType}
                                onChange={(e) => setPlotType(e.target.value)}
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                }}
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>

                    {/* Graph Rendering Area */}
                    <div
                        style={{
                            flexGrow: 1,
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        {renderGraph()}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Spinner CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

export default Dashboard;
