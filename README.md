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

### Método 1: Sem Docker

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

### Método 2: Com Docker

1. Clone este repositório
2. Construa a imagem Docker:
   ```
   docker build -t api-login-netlify .
   ```
3. Execute o contêiner:
   ```
   docker run -p 9000:9000 api-login-netlify
   ```
4. Acesse `http://localhost:9000` no seu navegador

## Opções de Implantação

### Opção 1: Implantação no Netlify

Este projeto está configurado para ser implantado diretamente no Netlify:

1. Faça o fork deste repositório para sua conta GitHub
2. No Netlify, clique em "New site from Git"
3. Selecione o repositório
4. Mantenha as configurações padrão de build e clique em "Deploy site"

### Opção 2: Implantação com Docker

Para implantar usando Docker em outros serviços de hospedagem:

1. **Render**:
   - Crie uma nova aplicação Web Service
   - Conecte ao repositório GitHub
   - Selecione "Docker" como ambiente
   - Configure a porta para 9000

2. **Railway**:
   - Crie um novo projeto
   - Selecione "Deploy from GitHub repo"
   - Escolha o repositório
   - Railway detectará automaticamente o Dockerfile

3. **DigitalOcean App Platform**:
   - Crie um novo aplicativo
   - Conecte ao repositório GitHub
   - Selecione "Dockerfile" como tipo de componente

## Credenciais de Teste

- Email: usuario@exemplo.com
- Senha: senha123

## Estrutura do Projeto

- `/public` - Arquivos estáticos (HTML, CSS, JS)
- `/src/lambda` - Funções serverless do Netlify
- `/netlify/functions` - Diretório de build para as funções

## Licença

MIT
