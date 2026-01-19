# Frontend - To-Do App

## Descrição

Este é o frontend da aplicação To-Do, uma interface web desenvolvida com Next.js e TypeScript. O objetivo principal é fornecer uma interface amigável para usuários gerenciarem suas tarefas diárias, com funcionalidades de autenticação, criação, edição e exclusão de tarefas simples e eficiente.

## Tecnologias Utilizadas

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
frontend/
├── package.json              # Dependências e scripts do projeto
├── tsconfig.json             # Configuração do TypeScript
├── next.config.ts            # Configuração do Next.js
├── tailwind.config.ts        # Configuração do Tailwind CSS
├── postcss.config.mjs        # Configuração do PostCSS
├── eslint.config.mjs         # Configuração do ESLint
├── public/                   # Arquivos estáticos
├── src/
│   ├── app/                  # Páginas e layouts do Next.js App Router
│   │   ├── globals.css       # Estilos globais
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Página inicial
│   │   └── dashboard/        # Página do dashboard
│   │       └── page.tsx
│   ├── components/           # Componentes reutilizáveis
│   │   ├── authInput.tsx     # Componente de input para autenticação
│   │   ├── header.tsx        # Cabeçalho da aplicação
│   │   ├── sidebar.tsx       # Barra lateral
│   │   ├── taskInput.tsx     # Componente para adicionar tarefas
│   │   └── taskItem.tsx      # Componente para exibir tarefas
│   └── services/             # Serviços para integração com API
│       └── api.ts            # Configuração do Axios para chamadas à API
```

## Como Usar

1. **Instalar dependências**:

   ```
   npm install
   ```

2. **Executar a aplicação em modo de desenvolvimento**:

   ```
   npm run dev
   ```

3. **Acessar a aplicação**:
   - Abra o navegador e vá para `http://localhost:3000`.

4. **Construir para produção**:
   ```
   npm run build
   npm start
   ```

## Funcionalidades Principais

- **Autenticação**: Login e registro de usuários.
- **Dashboard**: Visualização de tarefas do usuário.
- **Gerenciamento de Tarefas**: Criar, editar, marcar como concluída e excluir tarefas.
- **Interface Responsiva**: Design adaptável para diferentes dispositivos.

## Integração com Backend

A aplicação se conecta à API backend via Axios. Certifique-se de que o backend esteja rodando em `http://127.0.0.1:8000` para que as requisições funcionem corretamente.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Constrói a aplicação para produção.
- `npm start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter para verificar código.
