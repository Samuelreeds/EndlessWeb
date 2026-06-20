import prisma from '../config/db.js';

export const getSettings = async (req, res) => {
  try {
    const settings = await prisma.siteSettings.findFirst();
    res.json(settings || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    // Find existing to update, otherwise create new
    const existing = await prisma.siteSettings.findFirst();
    const data = req.body;

    const settings = existing 
      ? await prisma.siteSettings.update({ where: { id: existing.id }, data })
      : await prisma.siteSettings.create({ data });
      
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
};