
// src/repositories/client.repository.ts
import { Client } from '@prisma/client'; 
import { PrismaClient } from '../'; // Point directly to your generated folder

const prisma = new PrismaClient();

export const clientRepository = {
  async create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    return prisma.client.create({ data });
  },

  async findAll(): Promise<Client[]> {
    return prisma.client.findMany({ orderBy: { createdAt: 'desc' } });
  },

  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { id } });
  },

  async update(id: string, data: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Client> {
    return prisma.client.update({ where: { id }, data });
  },

  async delete(id: string): Promise<Client> {
    return prisma.client.delete({ where: { id } });
  }
};