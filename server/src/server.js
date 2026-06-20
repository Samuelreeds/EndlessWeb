import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/db.js';
import adminAuthRoutes from './routes/adminAuth.js';
import cmsRoutes from './routes/cms.js'; 
import mediaRoutes from './routes/media.js';
import userRoutes from './routes/userRoutes.js'; // 1. Add this import
import helmet from 'helmet';
import settingsRoutes from './routes/settings.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Admin Auth Routes
app.use('/api/admin', adminAuthRoutes);

// Content Management System Routes
app.use('/api/cms', cmsRoutes);

// Media Upload Routes
app.use('/api/media', mediaRoutes);

// User Management Routes (2. Add this mount)
app.use('/api/users', userRoutes);

app.use('/api/settings', settingsRoutes);

// Database connection check and server start
async function startServer() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();