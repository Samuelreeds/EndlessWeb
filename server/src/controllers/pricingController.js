import prisma from '../config/db.js';

// Get all active plans (for public frontend)
export const getActivePlans = async (req, res) => {
  try {
    const plans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' }
    });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pricing plans' });
  }
};

// Get all plans (for Admin dashboard)
export const getAllPlans = async (req, res) => {
  try {
    const plans = await prisma.pricingPlan.findMany({
      orderBy: { orderIndex: 'asc' }
    });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pricing plans' });
  }
};

// Create a new plan
export const createPlan = async (req, res) => {
  try {
    const { name, price, description, features, isFeatured, isActive, orderIndex } = req.body;
    const newPlan = await prisma.pricingPlan.create({
      data: { name, price, description, features, isFeatured, isActive, orderIndex }
    });
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pricing plan' });
  }
};

// Update an existing plan (includes toggling Featured/Active)
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, features, isFeatured, isActive } = req.body;
    const updatedPlan = await prisma.pricingPlan.update({
      where: { id },
      data: { name, price, description, features, isFeatured, isActive }
    });
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pricing plan' });
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.pricingPlan.delete({ where: { id } });
    res.json({ message: 'Pricing plan deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pricing plan' });
  }
};

// Reorder plans
export const reorderPlans = async (req, res) => {
  try {
    const { orderedIds } = req.body; // Array of IDs in the new order
    
    // Update each plan's orderIndex in a transaction
    const updates = orderedIds.map((id, index) => {
      return prisma.pricingPlan.update({
        where: { id },
        data: { orderIndex: index }
      });
    });
    
    await prisma.$transaction(updates);
    res.json({ message: 'Plans reordered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder plans' });
  }
};