import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.admin.findMany({
      select: { id: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// backend/controllers/userController.js

export const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  
  // Validation Check
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.admin.create({
      data: { email, password: hashedPassword, role }
    });
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    console.error('Create User Error:', error);
    res.status(500).json({ error: 'User creation failed. Email might already exist.' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role, password } = req.body;
  
  const updateData = { email, role };
  if (password) updateData.password = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.admin.update({
      where: { id },
      data: updateData
    });
    res.json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.admin.delete({ where: { id: req.params.id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};