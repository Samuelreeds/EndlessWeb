import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
  ClientLogoController, 
  TestimonialController, 
  VideoTestimonialController, 
  CaseStudyController 
} from '../controllers/cmsController.js';

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

export default router;