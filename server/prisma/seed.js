import bcrypt from 'bcrypt';
import prisma from '../src/config/db.js';

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@endless.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  
  console.log('First admin created:', admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });