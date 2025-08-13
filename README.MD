# Books API - Backend

REST API para gerenciamento de livros e usuários desenvolvida com NestJS, Prisma e PostgreSQL.

## Pré-requisitos

- Docker
- Docker Compose

## Subindo os containers

```bash
# Suba os containers (API e banco de dados)
docker-compose up -d --build
```

## Configurando o banco de dados

Após subir os containers, execute as migrations e seeders:

```bash
docker exec -it test-api-1 sh -c "npx prisma generate && npx prisma migrate deploy && npm run db:seed:ctr"
```

## Reiniciando a API

Após rodar as migrations e seeders, reinicie o container da API:

```bash
docker restart test-api-1
```

## Executando apenas os seeders (opcional)

Se precisar rodar apenas os seeders novamente:

```bash
docker exec -it test-api-1 sh -c "npm run db:seed:ctr"
```

## Comandos úteis

### Acessar o container da API
```bash
docker exec -it test-api-1 sh
```

### Ver logs da API
```bash
docker logs -f test-api-1
```

### Parar os containers
```bash
docker-compose down
```

### Parar e remover volumes (reset completo)
```bash
docker-compose down -v
```

### Prisma Studio (interface visual do banco)
```bash
docker exec -it test-api-1 sh -c "npm run db:studio:ctr"
```
Acesse em: http://localhost:5556

## Acesso

Após completar a configuração, a API estará disponível em:
- **API**: http://localhost:3000
- **Prisma Studio**: http://localhost:5556 (quando executado)

## Estrutura do projeto

```
src/
├── auth/           # Autenticação e autorização
├── books/          # Módulo de livros
├── users/          # Módulo de usuários
├── prisma/         # Configuração do Prisma
└── ...

prisma/
├── schema.prisma   # Schema do banco de dados
├── migrations/     # Migrations do banco
└── seeders/        # Scripts de seed
```

## Usuários padrão

Após executar os seeders, você terá:

- **Admin**: admin@test.com / 123456
- **Usuário 1**: user1@test.com / 123456
- **Usuário 2**: user2@test.com / 123456

## Problemas comuns

### Container não inicia
```bash
# Verifique os logs
docker logs test-api-1

# Rebuilde os containers
docker-compose down -v
docker-compose up --build
```

### Erro de conexão com banco
```bash
# Verifique se o banco está rodando
docker logs test-db-1

# Reinicie os containers
docker-compose restart
```
