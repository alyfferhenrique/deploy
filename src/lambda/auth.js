const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chave secreta para JWT (em produção, use variáveis de ambiente)
const JWT_SECRET = 'sua_chave_secreta_aqui';

// Usuários de exemplo (em produção, use um banco de dados)
const usuarios = [
  { id: 1, email: 'usuario@exemplo.com', senha: 'senha123', nome: 'Usuário Teste' }
];

// Rota de login
router.post('/login', (req, res) => {
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
router.get('/verificar', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Token não fornecido' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ 
      sucesso: true, 
      usuario: decoded 
    });
  } catch (error) {
    res.status(401).json({ 
      sucesso: false, 
      mensagem: 'Token inválido ou expirado' 
    });
  }
});

app.use('/.netlify/functions/auth', router);

module.exports.handler = serverless(app);
