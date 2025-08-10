import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function createTestUsersSeeder(prisma: PrismaClient) {
  console.log('Creating test users...');

  const testUsers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
    },
    {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: 'password123',
    },
  ];

  for (const userData of testUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
        },
      });
      
      console.log(`Test user created: ${userData.name} (${userData.email})`);
    } else {
      console.log(`Test user already exists: ${userData.email}`);
    }
  }

  console.log('Test users seeder completed successfully');
}
