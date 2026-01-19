# To-Do List Project

## Descrição

Este é um projeto completo de aplicação To-Do List, composto por um backend em Python com FastAPI e um frontend em Next.js com TypeScript. O objetivo principal é fornecer uma plataforma para usuários gerenciarem suas tarefas diárias de forma segura e eficiente, com funcionalidades de autenticação, criação, edição e exclusão de tarefas.

## Tecnologias Utilizadas

### Backend

- **Python**: Linguagem de programação principal.
- **FastAPI**: Framework web para construção de APIs RESTful rápidas e modernas.
- **Uvicorn**: Servidor ASGI para executar a aplicação FastAPI.
- **Pydantic**: Para validação de dados e serialização.
- **Python-Jose**: Para manipulação de JWT (JSON Web Tokens) para autenticação.
- **Passlib**: Para hashing de senhas com bcrypt.
- **Bcrypt**: Biblioteca para hashing seguro de senhas.
- **Python-Multipart**: Para suporte a uploads de arquivos multipart.

### Frontend

- **Next.js**: Framework React para aplicações web full-stack.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida.
- **Axios**: Cliente HTTP para fazer requisições à API backend.
- **Lucide React**: Biblioteca de ícones para React.
- **PostCSS**: Ferramenta para processamento de CSS.
- **ESLint**: Ferramenta de linting para JavaScript/TypeScript.

## Estrutura do Projeto

```
To-Do-Project/
├── README.md                 # Documentação principal do projeto
├── backend/                  # Backend da aplicação
│   ├── README.md             # Documentação específica do backend
│   ├── requirements.txt      # Dependências do backend
│   └── app/                  # Código fonte do backend
│       ├── main.py           # Ponto de entrada da aplicação FastAPI
│       ├── controllers/      # Lógica de negócio
│       ├── core/             # Configurações centrais
│       ├── db/               # Camada de banco de dados
│       ├── models/           # Modelos de dados
│       └── views/            # Rotas da API
└── frontend/                 # Frontend da aplicação
    ├── README.md             # Documentação específica do frontend
    ├── package.json          # Dependências e scripts do frontend
    ├── src/                  # Código fonte do frontend
    │   ├── app/              # Páginas e layouts do Next.js
    │   ├── components/       # Componentes reutilizáveis
    │   └── services/         # Serviços para integração com API
    └── public/               # Arquivos estáticos
```

## Como Usar

### Backend

1. **Navegue para a pasta backend**:

   ```
   cd backend
   ```

2. **Instalar dependências**:

   ```
   pip install -r requirements.txt
   ```

3. **Executar a aplicação**:

   ```
   uvicorn app.main:app --reload
   ```

4. **Acessar a documentação da API**:
   - Abra o navegador e vá para `http://127.0.0.1:8000/docs` para ver a documentação interativa gerada pelo Swagger UI.

### Frontend

1. **Navegue para a pasta frontend**:

   ```
   cd frontend
   ```

2. **Instalar dependências**:

   ```
   npm install
   ```

3. **Executar a aplicação em modo de desenvolvimento**:

   ```
   npm run dev
   ```

4. **Acessar a aplicação**:
   - Abra o navegador e vá para `http://localhost:3000`.

## Funcionalidades Principais

- **Autenticação**: Login e registro de usuários com JWT.
- **Dashboard**: Visualização de tarefas do usuário.
- **Gerenciamento de Tarefas**: Criar, editar, marcar como concluída e excluir tarefas.
- **Interface Responsiva**: Design adaptável para diferentes dispositivos.
- **API RESTful**: Endpoints seguros para operações CRUD em tarefas.

## Endpoints da API

- **Autenticação**:
  - `POST /auth/login`: Login de usuário
  - `POST /auth/register`: Registro de novo usuário

- **Tarefas**:
  - `GET /tasks`: Listar tarefas do usuário autenticado
  - `POST /tasks`: Criar nova tarefa
  - `PUT /tasks/{task_id}`: Atualizar tarefa
  - `DELETE /tasks/{task_id}`: Excluir tarefa

## Banco de Dados

Atualmente, a aplicação utiliza um banco de dados em memória no backend para simulação. Para produção, recomenda-se integrar com um banco de dados persistente como PostgreSQL ou SQLite.

## Segurança

- Autenticação baseada em JWT.
- Senhas hashadas com bcrypt.
- Middleware CORS configurado para permitir requisições do frontend.

Para mais detalhes sobre cada parte do projeto, consulte os READMEs específicos:

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
