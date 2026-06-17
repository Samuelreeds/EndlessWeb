import express from 'express';
import { uploadMedia } from '../controllers/mediaController.js';
import { upload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Adjust path if your auth middleware is named differently

const router = express.Router();

// Protected route: expects an auth token and a multipart form with field name "image"
router.post('/upload', verifyToken, upload.single('image'), uploadMedia);

export default router;