import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const books = [
    { name: 'The Great Gatsby' },
    { name: 'To Kill a Mockingbird' },
    { name: '1984' },
    { name: 'Pride and Prejudice' },
    { name: 'The Catcher in the Rye' },
    { name: 'Lord of the Flies' },
    { name: 'Animal Farm' },
    { name: 'Brave New World' },
    { name: 'Jane Eyre' },
    { name: 'Wuthering Heights' },
  ];

  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
