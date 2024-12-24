import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const WeeklyGraph = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottomRight', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="signal" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="selfReported" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WeeklyGraph;
