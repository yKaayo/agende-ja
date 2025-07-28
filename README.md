# Agende Já

Agende Já é uma aplicação full-stack de gerenciamento de agendamentos e compromissos, projetada para ajudar os usuários a gerenciar seus horários de forma eficiente. O projeto conta com um frontend moderno em React e TypeScript, com gerenciamento de estado usando Redux, combinado com uma API backend robusta em Node.js e Express para autenticação e gerenciamento de agendas.

---

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Começando](#começando)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## Visão Geral do Projeto

Agende Já oferece aos usuários uma experiência fluida para registrar-se, fazer login e gerenciar suas agendas pessoais. O frontend oferece uma interface responsiva e intuitiva construída com React e TypeScript, enquanto a API backend gerencia autenticação de usuários, operações CRUD de agenda e gerenciamento seguro dos dados.

---

## Tecnologias Utilizadas

### Frontend

- React 18 com TypeScript
- Redux Toolkit para gerenciamento de estado
- Vite como ferramenta de build e servidor de desenvolvimento
- SCSS para estilização
- Axios para comunicação com a API

### Backend

- Node.js com framework Express
- Design de API RESTful
- MongoDB
- Autenticação baseada em JWT com middleware dedicado
- pnpm como gerenciador de pacotes

---

## Estrutura do Projeto

```
/client
  ├── src
  │   ├── components          # Componentes React (AgendaItem, Modals, etc.)
  │   ├── layout              # Layouts de páginas (Login, Register, MySchedule, etc.)
  │   ├── lib                 # Bibliotecas cliente API (AgendaApi, UserApi)
  │   ├── store               # Redux store e slices (userSlice, scheduleSlice)
  │   ├── scss                # Estilos
  │   └── types               # Definições de tipos TypeScript
  ├── package.json
  ├── vite.config.ts
  └── tsconfig.json

/server
  ├── controllers            # Controladores das rotas Express (agenda, auth)
  ├── middlewares            # Middlewares (autenticação)
  ├── models                 # Modelos de dados (AgendaModel, LoginModel, RegisterModel)
  ├── routes                 # Rotas da API (agendaRoutes, authRoutes)
  ├── server.js              # Ponto de entrada da aplicação Express
  ├── package.json
  └── pnpm-lock.yaml
```

---

## Funcionalidades

- Registro e login de usuários com autenticação segura
- Criação, leitura, atualização e exclusão de itens de agenda
- Interface responsiva e amigável
- Gerenciamento de estado com Redux Toolkit
- Código modular e de fácil manutenção com separação de responsabilidades
- Abstração do cliente API para comunicação frontend-backend

---

## Começando

### Pré-requisitos

- Node.js (recomenda-se v16 ou superior)
- Gerenciador de pacotes pnpm
- Instância MongoDB (local ou na nuvem)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Caio/agende-ja.git
cd agende-ja
```

2. Instale as dependências do client e do server:

```bash
cd client
pnpm install
cd ../server
pnpm install
```

3. Configure as variáveis de ambiente necessárias (ex: string de conexão MongoDB, segredo JWT) na pasta server.

---

## Executando a Aplicação

### Iniciar o servidor backend

```bash
pnpm dev
```

O servidor iniciará na porta configurada (padrão 3001 ou conforme definido em `server.js`).

### Iniciar o cliente frontend

```bash
cd ../client
pnpm dev
```

O cliente iniciará na porta configurada (padrão 8080) e fará proxy das requisições API para o backend.

---

## Contribuindo

Contribuições são bem-vindas! Por favor, abra issues ou envie pull requests para melhorias ou correções. Siga o estilo de código existente e garanta que os testes passem antes de submeter.

---

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
