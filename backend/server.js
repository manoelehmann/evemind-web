// Servidor Backend do Evemind
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('./config');

const app = express();

// Middlewares de segurança
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-hashes'"],
            scriptSrcAttr: ["'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            styleSrcElem: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        },
    },
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Servir arquivos de scripts (pasta scripts na raiz do projeto)
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));

// Rotas da API
// Login Service
app.use('/api/auth', require('./routes/auth'));
app.use('/api/funcoes', require('./routes/funcoes'));
app.use('/api/grupos', require('./routes/grupos'));
app.use('/api/unidades', require('./routes/unidades'));
app.use('/api/moradores', require('./routes/moradores'));

// Unit Service
app.use('/api/prestadores', require('./routes/prestadores'));
app.use('/api/agendamentos', require('./routes/agendamentos'));
app.use('/api/orcamento-compras', require('./routes/orcamento-compras'));
app.use('/api/orcamento-servicos', require('./routes/orcamento-servicos'));
app.use('/api/eventos', require('./routes/eventos'));
app.use('/api/reunioes', require('./routes/reunioes'));
app.use('/api/atas', require('./routes/atas'));
app.use('/api/funcionarios', require('./routes/funcionarios'));
app.use('/api/documentos', require('./routes/documentos'));
app.use('/api/visitantes', require('./routes/visitantes'));
app.use('/api/patrimonio', require('./routes/patrimonio'));
app.use('/api/avisos', require('./routes/avisos'));
app.use('/api/quadro-avisos', require('./routes/quadro-avisos'));
app.use('/api/auditoria', require('./routes/auditoria'));

// Outras rotas
app.use('/api/reservas', require('./routes/reservas'));
app.use('/api/ocorrencias', require('./routes/ocorrencias'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/permissoes', require('./routes/permissoes'));

// Rotas do Sistema de Banco de Dados Interno
app.use('/api/database', require('./routes/database'));

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

