import express from 'express';
import { login, logout, getMe } from '../controllers/adminAuthController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

// Protected route: Any logged-in admin can access
router.get('/me', verifyToken, getMe);

// Protected route: ONLY Super Admins can access
router.get('/super-secret', verifyToken, requireRole(['SUPER_ADMIN']), (req, res) => {
  res.json({ message: 'Welcome, Super Admin! You have advanced access.' });
});

export default router;