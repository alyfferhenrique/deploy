FROM node:16-alpine

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código-fonte
COPY . .

# Expor a porta (para desenvolvimento local e acesso externo)
EXPOSE 9000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
