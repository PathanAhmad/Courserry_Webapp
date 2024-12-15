const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes.js');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://courserry-webapp-1.onrender.com', // Your frontend's live URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
