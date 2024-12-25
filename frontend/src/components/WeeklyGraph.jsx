import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const WeeklyGraph = ({ data }) => {
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setGraphData(data);
        }
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="X" 
                    interval={0} 
                    ticks={graphData.map(item => item.X)}  
                />
                <YAxis domain={[-1, 1]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="response" stroke="#8884d8" />
                <Line type="monotone" dataKey="Inference" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Validated Inference Score" stroke="#ff7300" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WeeklyGraph;
