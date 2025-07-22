# Sumário
- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Execução da Aplicação](#execução-da-aplicação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Seed de Dados](#seed-de-dados)
- [Autenticação JWT](#autenticação-jwt)
- [Validação de Dados](#validação-de-dados)
- [API Endpoints](#api-endpoints)

# Descrição do Projeto
API REST desenvolvida em Node.js com TypeScript para gerenciar produtos e autenticação de usuários. O backend utiliza Sequelize para integração com banco de dados MySQL, que roda via Docker.

# Tecnologias Utilizadas
- Node.js
- TypeScript
- Express.js
- Sequelize ORM
- MySQL (via Docker)
- JWT (JSON Web Token) para autenticação
- Yup para validação de dados
- ts-node-dev para desenvolvimento com reload automático

# Pré-requisitos
- Node.js (v18+ recomendado)
- Docker & Docker Compose
- npm ou yarn
- MySQL (via container Docker)

# Configuração do Ambiente
1. Clone o repositório:
```bash
git clone <repo-url>
cd backend
```

2. Configure o arquivo `.env` na raiz com as variáveis:
```env
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_PORT=
JWT_SECRET=
```

3. Inicie o container MySQL via Docker Compose:
```bash
docker-compose up -d
```

4. Instale dependências:
```bash
npm install
```

# Execução da Aplicação
- Rodar em modo desenvolvimento com reload automático:
```bash
npm run dev
```

- Build da aplicação:
```bash
npm run build
```

- Iniciar aplicação em produção:
```bash
npm start
```

# Estrutura do Projeto
```
src/
 ├── config/            # Configurações gerais (DB, etc)
 ├── modules/
 │    ├── product/      # Módulo Produtos (controllers, repositories, entities, validations)
 │    └── user/         # Módulo Usuário (login, seed, entidade)
 ├── shared/            # Middlewares, helpers, utils (ex: authMiddleware)
 ├── main/              # Entrada principal do servidor (server.ts)
```

# Seed de Dados
Ao iniciar a aplicação, um usuário padrão será criado (`admin@b4you.dev` / senha: `123456`) e 5 produtos são populados no banco automaticamente. Isso é feito pela função `seedDefaultUser()` chamada no bootstrap da aplicação.

# Autenticação JWT
- Rota de login gera token JWT válido por 1 hora.
- Middleware `authMiddleware` protege rotas privadas validando token.
- JWT secret configurável via `.env` (variável `JWT_SECRET`).

# Validação de Dados
- A biblioteca Yup é usada para validar os dados de entrada nas rotas de produtos.
- Schemas específicos para criação, atualização e remoção garantem que apenas dados válidos sejam processados.

# API Endpoints
| Método | Endpoint           | Descrição                     | Protegido |
|--------|--------------------|-------------------------------|-----------|
| POST   | /login             | Login do usuário e geração JWT| Não       |
| POST   | /products          | Criar produto                 | Sim       |
| GET    | /products/:id      | Buscar produto por ID         | Não       |
| GET    | /products          | Listar todos os produtos      | Não       |
| PUT    | /products/:id      | Atualizar produto             | Sim       |
| DELETE | /products/:id      | Deletar produto               | Sim       |
