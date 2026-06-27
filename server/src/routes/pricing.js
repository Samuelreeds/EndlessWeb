import express from 'express';
import { 
  getActivePlans, 
  getAllPlans, 
  createPlan, 
  updatePlan, 
  deletePlan, 
  reorderPlans 
} from '../controllers/pricingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getActivePlans);

// Admin routes (Protected)
router.get('/admin', verifyToken, getAllPlans);
router.post('/', verifyToken, createPlan);
router.put('/reorder', verifyToken, reorderPlans);
router.put('/:id', verifyToken, updatePlan);
router.delete('/:id', verifyToken, deletePlan);

export default router;