import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DailyGraph = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
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

export default DailyGraph;
