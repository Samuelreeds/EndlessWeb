import prisma from '../config/db.js';

// Dynamic CRUD Factory
const createController = (modelName) => ({
  
  // Read All (Public)
  getAll: async (req, res) => {
    try {
      const data = await prisma[modelName].findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(data);
    } catch (error) {
      console.error(`Error fetching ${modelName}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Read One (Public)
  getById: async (req, res) => {
    try {
      const data = await prisma[modelName].findUnique({
        where: { id: req.params.id }
      });
      if (!data) return res.status(404).json({ error: 'Not found' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Create (Protected)
  // Example validation update for 'create'
  create: async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }
    try {
      const data = await prisma[modelName].create({ data: req.body });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create record' });
    }
  },

  // Update (Protected)
  update: async (req, res) => {
    try {
      const data = await prisma[modelName].update({
        where: { id: req.params.id },
        data: req.body
      });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update record' });
    }
  },

  // Delete (Protected)
  remove: async (req, res) => {
    try {
      await prisma[modelName].delete({
        where: { id: req.params.id }
      });
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete record' });
    }
  }
});


// Export controllers for each specific model
export const ClientLogoController = createController('clientLogo');
export const TestimonialController = createController('testimonial');
export const VideoTestimonialController = createController('videoTestimonial');
export const CaseStudyController = createController('caseStudy');