import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function createAdminUserSeeder(prisma: PrismaClient) {

  const adminEmail = 'admin@booksapi.com';
  const adminPassword = await bcrypt.hash('Admin123!', 12);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    return;
  }

  await prisma.user.create({
    data: {
      name: 'Administrator',
      email: adminEmail,
      password: adminPassword,
    },
  });

}
