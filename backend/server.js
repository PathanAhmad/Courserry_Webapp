const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Import path module
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes.js');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();

const corsOptions = {
    origin: [
        'https://courserry-webapp-1.onrender.com', // Live frontend URL
        'http://localhost:3000',                  // Local testing URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

// Serve static files from the "dist" folder (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback route to serve index.html for client-side routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
