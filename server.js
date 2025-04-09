const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chave secreta para JWT (em produção, use variáveis de ambiente)
const JWT_SECRET = 'sua_chave_secreta_aqui';

// Usuários de exemplo (em produção, use um banco de dados)
const usuarios = [
  { id: 1, email: 'usuario@exemplo.com', senha: 'senha123', nome: 'Usuário Teste' }
];

// Middleware para verificar autenticação
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Acesso negado. Token não fornecido.' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Token inválido ou expirado' 
    });
  }
};

// Rota de login
app.post('/api/auth/login', (req, res) => {
  const { email, senha } = req.body;
  
  // Verificar credenciais
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  
  if (!usuario) {
    return res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Email ou senha inválidos' 
    });
  }
  
  // Gerar token JWT
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, nome: usuario.nome },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ 
    sucesso: true, 
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
});

// Rota para verificar token
app.get('/api/auth/verificar', verificarToken, (req, res) => {
  res.json({ 
    sucesso: true, 
    usuario: req.usuario 
  });
});

// Rota para dados protegidos
app.get('/api/dados', verificarToken, (req, res) => {
  res.json({
    sucesso: true,
    mensagem: 'Dados protegidos acessados com sucesso',
    usuario: req.usuario,
    dados: {
      itens: [
        { id: 1, nome: 'Item 1', valor: 100 },
        { id: 2, nome: 'Item 2', valor: 200 },
        { id: 3, nome: 'Item 3', valor: 300 }
      ]
    }
  });
});

// Rota de status
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online',
    mensagem: 'API funcionando normalmente'
  });
});

// Rota para todas as outras requisições - redireciona para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
