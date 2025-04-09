# API Node.js com Tela de Login

Este projeto é uma API Node.js com uma tela de login simples, pronta para ser implantada no Netlify.

## Funcionalidades

- Autenticação de usuários com JWT
- API protegida com autenticação
- Interface de login responsiva
- Dashboard para visualização de dados

## Tecnologias Utilizadas

- Node.js
- Express.js
- JWT para autenticação
- Netlify Functions para serverless
- HTML, CSS e JavaScript puro no frontend

## Como Executar Localmente

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm start
   ```
4. Acesse `http://localhost:9000` no seu navegador

## Implantação no Netlify

Este projeto está configurado para ser implantado diretamente no Netlify:

1. Faça o fork deste repositório para sua conta GitHub
2. No Netlify, clique em "New site from Git"
3. Selecione o repositório
4. Mantenha as configurações padrão de build e clique em "Deploy site"

## Credenciais de Teste

- Email: usuario@exemplo.com
- Senha: senha123

## Estrutura do Projeto

- `/public` - Arquivos estáticos (HTML, CSS, JS)
- `/src/lambda` - Funções serverless do Netlify
- `/netlify/functions` - Diretório de build para as funções

## Licença

MIT
