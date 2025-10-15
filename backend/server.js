// Servidor Backend do Evemind
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('./config');

const app = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/moradores', require('./routes/moradores'));
app.use('/api/avisos', require('./routes/avisos'));
app.use('/api/reservas', require('./routes/reservas'));
app.use('/api/ocorrencias', require('./routes/ocorrencias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/permissoes', require('./routes/permissoes'));
app.use('/api/auditoria', require('./routes/auditoria'));

// Rota principal - servir o frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
    });
});

// Iniciar servidor
const PORT = config.server.port || 3000;
const HOST = config.server.host || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor Evemind rodando em http://${HOST}:${PORT}`);
    console.log(`📱 Frontend disponível em http://${HOST}:${PORT}`);
    console.log(`🔧 API disponível em http://${HOST}:${PORT}/api`);
});

module.exports = app;

