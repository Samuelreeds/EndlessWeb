import express from 'express';
import { uploadMedia, listMedia, deleteMedia } from '../controllers/mediaController.js';
import { upload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', verifyToken, upload.single('image'), uploadMedia);
// NEW: Routes for the media library UI
router.get('/', listMedia); 
router.delete('/:fileName', verifyToken, deleteMedia);

export default router;