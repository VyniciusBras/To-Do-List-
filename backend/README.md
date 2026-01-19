# Backend - To-Do API

## Descrição

Este é o backend da aplicação To-Do, uma API RESTful desenvolvida em Python utilizando FastAPI. O objetivo principal é fornecer endpoints para autenticação de usuários e gerenciamento de tarefas, permitindo que usuários criem, leiam, atualizem e excluam tarefas de forma segura.

## Tecnologias Utilizadas

- **Python**: Linguagem de programação principal.
- **FastAPI**: Framework web para construção de APIs RESTful rápidas e modernas.
- **Uvicorn**: Servidor ASGI para executar a aplicação FastAPI.
- **Pydantic**: Para validação de dados e serialização.
- **Python-Jose**: Para manipulação de JWT (JSON Web Tokens) para autenticação.
- **Passlib**: Para hashing de senhas com bcrypt.
- **Bcrypt**: Biblioteca para hashing seguro de senhas.
- **Python-Multipart**: Para suporte a uploads de arquivos multipart.

## Estrutura do Projeto

```
backend/
├── requirements.txt          # Dependências do projeto
└── app/
    ├── __init__.py
    ├── main.py               # Ponto de entrada da aplicação FastAPI
    ├── controllers/          # Lógica de negócio
    │   ├── __init__.py
    │   ├── auth_controller.py    # Controlador de autenticação
    │   └── task_controller.py    # Controlador de tarefas
    ├── core/                 # Configurações centrais
    │   ├── __init__.py
    │   ├── auth.py           # Utilitários de autenticação
    │   └── security.py       # Configurações de segurança
    ├── db/                   # Camada de banco de dados
    │   ├── __init__.py
    │   └── memory_db.py      # Banco de dados em memória (simulação)
    ├── models/               # Modelos de dados
    │   ├── __init__.py
    │   ├── task.py           # Modelo de tarefa
    │   └── user.py           # Modelo de usuário
    └── views/                # Rotas da API
        ├── __init__.py
        ├── auth_routes.py    # Rotas de autenticação
        └── task_routes.py    # Rotas de tarefas
```

## Como Usar

1. **Instalar dependências**:

   ```
   pip install -r requirements.txt
   ```

2. **Executar a aplicação**:

   ```
   uvicorn app.main:app --reload
   ```

3. **Acessar a documentação da API**:
   - Abra o navegador e vá para `http://127.0.0.1:8000/docs` para ver a documentação interativa gerada pelo Swagger UI.

## Endpoints Principais

- **Autenticação**:
  - `POST /auth/login`: Login de usuário
  - `POST /auth/register`: Registro de novo usuário

- **Tarefas**:
  - `GET /tasks`: Listar tarefas do usuário autenticado
  - `POST /tasks`: Criar nova tarefa
  - `PUT /tasks/{task_id}`: Atualizar tarefa
  - `DELETE /tasks/{task_id}`: Excluir tarefa

## Banco de Dados

Atualmente, a aplicação utiliza um banco de dados em memória (`memory_db.py`) para simulação. Para produção, futuramente posso integrar com um banco de dados persistente como PostgreSQL.

## Segurança

- Autenticação baseada em JWT.
- Senhas hashadas com bcrypt.
- Middleware CORS configurado para permitir requisições do frontend (localhost:3000).
