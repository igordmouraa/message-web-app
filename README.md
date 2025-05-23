# 💬 Real-Time Chat App with Firebase + Next.js

Este projeto é uma aplicação de chat em tempo real desenvolvida com **Next.js 15**, **Firebase (Auth & Firestore)** e **Tailwind CSS**. Ele inclui autenticação via **Google** e exibe mensagens em tempo real usando Firestore.

## 🚀 Funcionalidades

- Autenticação com conta Google
- Envio e recepção de mensagens em tempo real
- Exibição do avatar e nome do usuário
- Interface moderna com Tailwind CSS

## 🛠️ Tecnologias

- [Next.js 15](https://nextjs.org/)
- [Firebase (Auth & Firestore)](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   
3. Crie um arquivo `.env.local` na raiz do projeto e adicione suas credenciais do Firebase:
   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```
   
4. Inicie o servidor de desenvolvimento:
   ```bash
    next dev
    ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 📦 Build para produção

   ```bash
   npm run build
   npm start
   ```