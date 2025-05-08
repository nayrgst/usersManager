# 👥 Sistema de Gerenciamento de Usuários

Uma aplicação web completa para gerenciamento de usuários desenvolvida com Next.js e Prisma, focada em autenticação, autorização e níveis de acesso.

## 📋 Funcionalidades

### 🔐 Autenticação e Usuários

- **Cadastro público** com campos obrigatórios (nome, e-mail e senha) e opcionais (CEP, estado e cidade)
- **Integração com ViaCEP** para preenchimento automático de estado e cidade a partir do CEP
- **Login seguro** com autenticação via e-mail e senha
- **Administrador inicial** com acesso preconfigurado

### 👤 Área do Usuário

- Visualização de dados próprios
- Interface intuitiva e responsiva

### 👑 Área Administrativa

- Listagem completa de usuários
- Edição de dados de qualquer usuário
- Exclusão de usuários com confirmação

## 🛠️ Tecnologias Utilizadas

- **Frontend**:

  - Next.js com App Router
  - TypeScript para tipagem estática
  - Tailwind CSS e Shadcn para estilização
  - React Hook Form com validação via Zod
  - Lucide React para ícones

- **Backend**:
  - Prisma como ORM
  - SQLite para banco de dados
  - NextAuth.js para autenticação
  - Bcrypt para hash de senhas

## 📦 Requisitos

- Node.js 18+
- NPM ou Yarn

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone git@github.com:nayrgst/usersManager.git
cd users-manager/
```

### 2. Instale as dependências

```bash
# Com NPM
npm install

# Ou com Yarn
yarn install
```

### 3. Configure o banco de dados

```bash
# Crie o banco e aplique migrações
npm run db:push
# ou
yarn db:push

# Crie o usuário administrador
npm run db:seed
# ou
yarn db:seed
```

### 4. Inicie o servidor de desenvolvimento

```bash
# Com NPM
npm run dev

# Ou com Yarn
yarn dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000) desenvolvimento ou [user-manager.nayr.dev](https://user-manager.nayr.dev/)

## 🔑 Credenciais de Administrador

- **Email**: admin@admin.com
- **Senha**: admin@123

## 🌟 Funcionalidades Adicionais

- Design responsivo com Tailwind CSS
- Sistema de toasts para feedback ao usuário
- Confirmação de exclusão de usuários
- Proteção de rotas por middleware
- Validação de campos avançada
- Gerenciamento de sessão de usuário

---

Desenvolvido por [nayrgst](https://github.com/nayrgst)
