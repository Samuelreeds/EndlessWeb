import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken); // All user routes protected

router.get('/', getAllUsers);
router.post('/', requireRole(['SUPER_ADMIN']), createUser);
router.put('/:id', requireRole(['SUPER_ADMIN']), updateUser);
router.delete('/:id', requireRole(['SUPER_ADMIN']), deleteUser);

export default router;