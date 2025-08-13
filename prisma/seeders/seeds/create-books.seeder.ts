import { PrismaClient } from '@prisma/client';

export async function createBooksSeeder(prisma: PrismaClient) {
  console.log('Creating books...');

  const books = [
    { 
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'Um romance clássico americano sobre amor, riqueza e o sonho americano na era do jazz.',
      cover: 'https://picsum.photos/300/400?random=1'
    },
    { 
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'Uma história poderosa sobre injustiça racial e perda da inocência no sul dos Estados Unidos.',
      cover: 'https://picsum.photos/300/400?random=2'
    },
    { 
      name: '1984',
      author: 'George Orwell',
      description: 'Um romance distópico sobre totalitarismo, vigilância e controle social.',
      cover: 'https://picsum.photos/300/400?random=3'
    },
    { 
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'Um romance clássico sobre amor, casamento e sociedade na Inglaterra do século XIX.',
      cover: 'https://picsum.photos/300/400?random=4'
    },
    { 
      name: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      description: 'A jornada de um adolescente rebelde através de Nova York.',
      cover: 'https://picsum.photos/300/400?random=5'
    },
    { 
      name: 'Lord of the Flies',
      author: 'William Golding',
      description: 'Uma alegoria sobre a natureza humana e civilização.',
      cover: 'https://picsum.photos/300/400?random=6'
    },
    { 
      name: 'Animal Farm',
      author: 'George Orwell',
      description: 'Uma fábula política sobre revolução e corrupção do poder.',
      cover: 'https://picsum.photos/300/400?random=7'
    },
    { 
      name: 'Brave New World',
      author: 'Aldous Huxley',
      description: 'Uma visão distópica de uma sociedade futura controlada pela tecnologia.',
      cover: 'https://picsum.photos/300/400?random=8'
    },
    { 
      name: 'Jane Eyre',
      author: 'Charlotte Brontë',
      description: 'A história de uma órfã que se torna governanta e encontra o amor.',
      cover: 'https://picsum.photos/300/400?random=9'
    },
    { 
      name: 'Wuthering Heights',
      author: 'Emily Brontë',
      description: 'Uma história tempestuosa de amor e vingança nos campos ingleses.',
      cover: 'https://picsum.photos/300/400?random=10'
    },
    { 
      name: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      description: 'Uma épica aventura de fantasia na Terra Média.',
      cover: 'https://picsum.photos/300/400?random=11'
    },
    { 
      name: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      description: 'A jornada mágica de um jovem bruxo em Hogwarts.',
      cover: 'https://picsum.photos/300/400?random=12'
    },
    { 
      name: 'The Chronicles of Narnia',
      author: 'C.S. Lewis',
      description: 'Uma série de aventuras fantásticas no mundo mágico de Nárnia.',
      cover: 'https://picsum.photos/300/400?random=13'
    },
    { 
      name: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      description: 'Um futuro distópico onde os livros são proibidos e queimados.',
      cover: 'https://picsum.photos/300/400?random=14'
    },
    { 
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'A aventura de Bilbo Bolseiro em uma jornada inesperada.',
      cover: 'https://picsum.photos/300/400?random=15'
    },
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
