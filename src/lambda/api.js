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

// Chave secreta para JWT (deve ser a mesma usada em auth.js)
const JWT_SECRET = 'sua_chave_secreta_aqui';

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

// Rota pública
router.get('/status', (req, res) => {
  res.json({ 
    status: 'online',
    mensagem: 'API funcionando normalmente'
  });
});

// Rota protegida
router.get('/dados', verificarToken, (req, res) => {
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

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
