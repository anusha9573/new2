const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');
const path = require('path');  // Ensure the path module is required

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  methods: 'GET,POST,DELETE,PUT',
  allowedHeaders: 'Content-Type,Authorization'
}));


app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve the uploads directory

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/blogRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
