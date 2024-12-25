import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const MonthlyGraph = ({ data }) => {
    const monthLabels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const mappedData = data.map((item) => ({
        ...item,
        monthLabel: monthLabels[item.Month - 1] // Map X (1-12) to Month Names
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mappedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthLabel" />
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

export default MonthlyGraph;