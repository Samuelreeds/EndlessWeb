import express from 'express';
import { PrismaClient } from '@prisma/client'; // ADDED: Import Prisma
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
  ClientLogoController, 
  TestimonialController, 
  VideoTestimonialController, 
  CaseStudyController,
  StatsController 
} from '../controllers/cmsController.js';

// ADDED: Initialize Prisma
const prisma = new PrismaClient(); 
const router = express.Router();

// Helper to map routes
const mapCrudRoutes = (path, controller) => {
  router.get(path, controller.getAll);
  router.get(`${path}/:id`, controller.getById);
  router.post(path, verifyToken, controller.create);
  router.put(`${path}/:id`, verifyToken, controller.update);
  router.delete(`${path}/:id`, verifyToken, controller.remove);
};

// Mount CMS routes
mapCrudRoutes('/client-logos', ClientLogoController);
mapCrudRoutes('/testimonials', TestimonialController);
mapCrudRoutes('/video-testimonials', VideoTestimonialController);
mapCrudRoutes('/case-studies', CaseStudyController);
router.get('/stats', StatsController.getStats);

// --- IMAGE TESTIMONIALS (GALLERIES) ---

// 1. GET all galleries
router.get('/image-testimonials', async (req, res) => {
  try {
    const galleries = await prisma.imageTestimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(galleries);
  } catch (err) {
    console.error(err);
    // Send exact error to frontend
    res.status(500).json({ error: err.message || err.toString() });
  }
});

// 2. POST (Create) a new gallery (Secured with verifyToken)
router.post('/image-testimonials', verifyToken, async (req, res) => {
  try {
    const { clientName, images } = req.body;
    const newGallery = await prisma.imageTestimonial.create({
      data: { clientName, images }
    });
    res.status(201).json(newGallery);
  } catch (err) {
    console.error(err);
    // Send exact error to frontend
    res.status(500).json({ error: err.message || err.toString() });
  }
});

// 3. PUT (Update) an existing gallery (Secured with verifyToken)
router.put('/image-testimonials/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, images } = req.body;
    const updatedGallery = await prisma.imageTestimonial.update({
      where: { id },
      data: { clientName, images }
    });
    res.json(updatedGallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err.toString() });
  }
});

// 4. DELETE a gallery (Secured with verifyToken)
router.delete('/image-testimonials/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.imageTestimonial.delete({
      where: { id }
    });
    res.json({ message: 'Gallery deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err.toString() });
  }
});

// FIXED: Export must be at the very bottom of the file
export default router;