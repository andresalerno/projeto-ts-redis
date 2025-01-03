# Use Node.js como base
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do projeto
COPY . .

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
