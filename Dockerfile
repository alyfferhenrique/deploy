FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código-fonte
COPY . .

# Construir as funções serverless
RUN npm run build

# Expor a porta (para desenvolvimento local)
EXPOSE 9000

# Comando para iniciar o servidor
CMD ["npm", "start"]
