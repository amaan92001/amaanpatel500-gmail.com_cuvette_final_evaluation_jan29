const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const folderRoutes = require('./routes/FolderRoutes');
const formRoutes = require('./routes/FormRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure CORS to allow multiple origins
const allowedOrigins = [
    // 'http://localhost:3000',
    // 'http://localhost:5173'

   'https://amaan-typebot2-q1uu.vercel.app'
   
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(morgan(':method :url :status :response-time ms'));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Successfully Connected to MongoDB');
})
.catch((err) => {
    console.log('Error Connecting to MongoDB', err);
});
    
app.use('/api/users', userRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server Up and running on port: ${process.env.PORT || 4000}`);
});
