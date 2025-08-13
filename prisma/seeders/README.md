# Database Seeders

Este diretório contém os seeders organizados para popular o banco de dados com dados iniciais e de teste.

## 📁 Estrutura

```
prisma/seeders/
├── index.ts              # Orquestrador principal dos seeders
└── seeds/
    ├── create-admin-user.seeder.ts    # Cria usuário administrador
    ├── create-books.seeder.ts         # Cria livros de exemplo
    └── create-test-users.seeder.ts    # Cria usuários de teste
```

## 🚀 Como Usar

### Seeding Simples (apenas livros)
```bash
npm run db:seed
```

### Seeding Avançado (completo com controle)
```bash
npm run db:seed:advanced
```

### Reset completo do banco
```bash
npm run db:reset
```

## 📝 Seeders Disponíveis

### 1. **Admin User Seeder**
- Cria um usuário administrador padrão
- **Email**: `admin@booksapi.com`
- **Senha**: `Admin123!`

### 2. **Books Seeder**
- Cria 15 livros clássicos de exemplo
- Verifica duplicatas antes de inserir

### 3. **Test Users Seeder**
- Cria 3 usuários de teste
- Senhas padronizadas para desenvolvimento

## 🔄 Sistema de Controle

O sistema avançado de seeders possui controle de execução:

- ✅ **Verificação de execução**: Evita executar o mesmo seeder duas vezes
- 🔄 **Transações**: Garante consistência dos dados
- 📝 **Logs detalhados**: Acompanha o progresso
- ⏱️ **Timeout configurável**: Evita travamentos

### Tabela de Controle

Os seeders executados são registrados na tabela `seeders`:

```sql
SELECT * FROM seeders;
```

## 🛠️ Adicionando Novos Seeders

### 1. Criar o arquivo do seeder
```typescript
// prisma/seeders/seeds/meu-novo-seeder.ts
import { PrismaClient } from '@prisma/client';

export async function meuNovoSeeder(prisma: PrismaClient) {
  console.log('Executando meu novo seeder...');
  
  // Sua lógica aqui
  
  console.log('Seeder concluído!');
}
```

### 2. Registrar no index.ts
```typescript
import { meuNovoSeeder } from './seeds/meu-novo-seeder';

const seeders = [
  createAdminUserSeeder,
  createBooksSeeder,
  createTestUsersSeeder,
  meuNovoSeeder, // Adicionar aqui
];
```

## 🎯 Dados Criados

### Usuário Admin
- **Nome**: Administrator
- **Email**: admin@booksapi.com
- **Senha**: Admin123!

### Usuários de Teste
1. **John Doe** - john@example.com
2. **Jane Smith** - jane@example.com  
3. **Bob Johnson** - bob@example.com
- **Senha padrão**: password123

### Livros de Exemplo
- The Great Gatsby
- To Kill a Mockingbird
- 1984
- Pride and Prejudice
- The Catcher in the Rye
- Lord of the Flies
- Animal Farm
- Brave New World
- Jane Eyre
- Wuthering Heights
- The Lord of the Rings
- Harry Potter and the Sorcerer's Stone
- The Chronicles of Narnia
- Fahrenheit 451
- The Hobbit

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (salt rounds: 12)
- Verificação de duplicatas por email
- Soft delete respeitado na verificação de livros

## 📊 Logs de Exemplo

```
🌱 Starting database seeding...
🔄 Executing seeder: createAdminUserSeeder
Creating admin user...
Admin user created successfully
✅ Seeder createAdminUserSeeder completed successfully
🔄 Executing seeder: createBooksSeeder
Creating books...
Book created: The Great Gatsby
Book created: To Kill a Mockingbird
...
✅ Seeder createBooksSeeder completed successfully
🎉 All seeders completed successfully!

📧 Admin credentials:
Email: admin@booksapi.com
Password: Admin123!
🔌 Database connection closed
```

## 🆘 Troubleshooting

### Erro: "Seeder already executed"
- É normal, indica que o seeder já foi executado
- Para forçar re-execução, delete o registro da tabela `seeders`

### Erro: "Transaction timeout"
- Aumente o timeout no index.ts
- Verifique conexão com o banco

### Erro: "Email already exists"
- Normal para usuários, seeders verificam duplicatas
- Para reset completo: `npm run db:reset`
