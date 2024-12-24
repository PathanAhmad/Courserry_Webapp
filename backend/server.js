const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import path module
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes.js');
const studentRoutes = require('./routes/studentRoutes');
const logRoutes = require('./routes/logRoutes');
const pythonRoutes = require('./routes/pythonRoutes');

dotenv.config();

const app = express();

const corsOptions = {
    origin: [
        'https://courserry-webapp-1.onrender.com', // Live frontend URL
        'http://localhost:3000',                  // Local testing URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],    // Allow necessary headers
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/python', pythonRoutes);


// Serve static files for the React app
app.use(express.static(path.join(__dirname, 'dist')));

// // React Router fallback for non-API routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

// Ping route for keep-alive requests
app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: 'Pong! Server is active.' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Test route to ensure server runs
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
