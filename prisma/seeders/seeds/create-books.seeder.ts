import { PrismaClient } from '@prisma/client';

export async function createBooksSeeder(prisma: PrismaClient) {
  console.log('Creating books...');

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
    { name: 'The Lord of the Rings' },
    { name: 'Harry Potter and the Sorcerer\'s Stone' },
    { name: 'The Chronicles of Narnia' },
    { name: 'Fahrenheit 451' },
    { name: 'The Hobbit' },
  ];

  for (const bookData of books) {
    const existingBook = await prisma.book.findFirst({
      where: { 
        name: bookData.name,
        deletedAt: null 
      },
    });

    if (!existingBook) {
      await prisma.book.create({
        data: bookData,
      });
      console.log(`Book created: ${bookData.name}`);
    } else {
      console.log(`Book already exists: ${bookData.name}`);
    }
  }

  console.log('Books seeder completed successfully');
}
