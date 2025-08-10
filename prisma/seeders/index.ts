import { PrismaClient } from '@prisma/client';
import { createAdminUserSeeder } from './seeds/create-admin-user.seeder';
import { createBooksSeeder } from './seeds/create-books.seeder';
import { createTestUsersSeeder } from './seeds/create-test-users.seeder';

const prisma = new PrismaClient();

type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

const seeders: Array<(client: TransactionClient) => Promise<void>> = [
  createAdminUserSeeder,
  createBooksSeeder,
  createTestUsersSeeder,
];

async function main() {
  
  try {
    for (const seeder of seeders) {
      const seederName = seeder.name;
      
      const seederExists = await prisma.seeders.findFirst({
        where: {
          name: {
            equals: seederName,
            mode: 'insensitive',
          },
        },
      });

      if (seederExists) {
        continue;
      }



    await prisma.$transaction(
        async (tx) => {
          await seeder(tx);
          await tx.seeders.create({
            data: {
              name: seederName,
            },
          });
        },
        { timeout: 60000 },
      );
    }
    
  } catch (error) {
    throw error;
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
