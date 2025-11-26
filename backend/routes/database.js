// Rotas REST para o Sistema de Banco de Dados Interno
const express = require('express');
const router = express.Router();
const dataCondominio = require('../dataCondominio');

// Middleware para validação de tabela
const validateTable = (req, res, next) => {
    const { table } = req.params;
    const validTables = Object.keys(dataCondominio.data);
    
    if (!validTables.includes(table)) {
        return res.status(400).json({
            success: false,
            message: `Tabela '${table}' não existe. Tabelas disponíveis: ${validTables.join(', ')}`
        });
    }
    
    next();
};

// Middleware para validação de ID
const validateId = (req, res, next) => {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
            success: false,
            message: 'ID deve ser um número válido'
        });
    }
    
    next();
};

// ========== ROTAS GENÉRICAS CRUD ==========

// GET /api/database/tables - Listar todas as tabelas
router.get('/tables', (req, res) => {
    try {
        const result = dataCondominio.getTables();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar tabelas',
            error: error.message
        });
    }
});

// GET /api/database/stats - Obter estatísticas do sistema
router.get('/stats', (req, res) => {
    try {
        const result = dataCondominio.getStats();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao obter estatísticas',
            error: error.message
        });
    }
});

// GET /api/database/:table - Listar todos os registros de uma tabela
router.get('/:table', validateTable, (req, res) => {
    try {
        const { table } = req.params;
        const { page, limit, ...filters } = req.query;
        
        // Se tem paginação
        if (page && limit) {
            const result = dataCondominio.readPaginated(table, page, limit, filters);
            res.json(result);
        } else {
            // Listagem simples
            const result = dataCondominio.read(table, filters);
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao listar registros da tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// GET /api/database/:table/count - Contar registros de uma tabela
router.get('/:table/count', validateTable, (req, res) => {
    try {
        const { table } = req.params;
        const filters = req.query;
        const result = dataCondominio.count(table, filters);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao contar registros da tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// GET /api/database/:table/search/:field/:value - Buscar por campo específico
router.get('/:table/search/:field/:value', validateTable, (req, res) => {
    try {
        const { table, field, value } = req.params;
        const result = dataCondominio.findByField(table, field, value);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao buscar por ${req.params.field} na tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// GET /api/database/:table/:id - Buscar registro por ID
router.get('/:table/:id', validateTable, validateId, (req, res) => {
    try {
        const { table, id } = req.params;
        const result = dataCondominio.readById(table, id);
        
        if (!result.success) {
            return res.status(404).json(result);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao buscar registro na tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// POST /api/database/:table - Criar novo registro
router.post('/:table', validateTable, (req, res) => {
    try {
        const { table } = req.params;
        const data = req.body;
        
        // Validação básica
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Dados do registro são obrigatórios'
            });
        }
        
        const result = dataCondominio.create(table, data);
        
        if (!result.success) {
            return res.status(400).json(result);
        }
        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao criar registro na tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// PUT /api/database/:table/:id - Atualizar registro
router.put('/:table/:id', validateTable, validateId, (req, res) => {
    try {
        const { table, id } = req.params;
        const data = req.body;
        
        // Validação básica
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Dados para atualização são obrigatórios'
            });
        }
        
        const result = dataCondominio.update(table, id, data);
        
        if (!result.success) {
            const statusCode = result.error === 'Registro não encontrado' ? 404 : 400;
            return res.status(statusCode).json(result);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao atualizar registro na tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// PATCH /api/database/:table/:id - Atualização parcial de registro
router.patch('/:table/:id', validateTable, validateId, (req, res) => {
    try {
        const { table, id } = req.params;
        const data = req.body;
        
        // Validação básica
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Dados para atualização são obrigatórios'
            });
        }
        
        const result = dataCondominio.update(table, id, data);
        
        if (!result.success) {
            const statusCode = result.error === 'Registro não encontrado' ? 404 : 400;
            return res.status(statusCode).json(result);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao atualizar registro na tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// DELETE /api/database/:table/:id - Excluir registro
router.delete('/:table/:id', validateTable, validateId, (req, res) => {
    try {
        const { table, id } = req.params;
        const result = dataCondominio.delete(table, id);
        
        if (!result.success) {
            const statusCode = result.error === 'Registro não encontrado' ? 404 : 400;
            return res.status(statusCode).json(result);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Erro ao excluir registro da tabela ${req.params.table}`,
            error: error.message
        });
    }
});

// ========== ROTAS ESPECIAIS ==========

// POST /api/database/backup - Criar backup dos dados
router.post('/backup', (req, res) => {
    try {
        const result = dataCondominio.backup();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar backup',
            error: error.message
        });
    }
});

// DELETE /api/database/clear - Limpar todos os dados (CUIDADO!)
router.delete('/clear', (req, res) => {
    try {
        // Verificação de segurança
        const { confirm } = req.query;
        
        if (confirm !== 'true') {
            return res.status(400).json({
                success: false,
                message: 'Para limpar todos os dados, adicione ?confirm=true na URL'
            });
        }
        
        const result = dataCondominio.clearAllData();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao limpar dados',
            error: error.message
        });
    }
});

// ========== ROTAS DE EXEMPLO E TESTE ==========

// GET /api/database/examples - Exemplos de uso da API
router.get('/examples', (req, res) => {
    const examples = {
        message: 'Exemplos de uso da API de Banco de Dados Interno',
        endpoints: {
            'Listar tabelas': 'GET /api/database/tables',
            'Estatísticas': 'GET /api/database/stats',
            'Listar registros': 'GET /api/database/moradores',
            'Listar com paginação': 'GET /api/database/moradores?page=1&limit=10',
            'Listar com filtros': 'GET /api/database/moradores?ativo=true&bloco=A',
            'Buscar por ID': 'GET /api/database/moradores/1',
            'Buscar por campo': 'GET /api/database/moradores/search/nome/João',
            'Contar registros': 'GET /api/database/moradores/count',
            'Criar registro': 'POST /api/database/moradores',
            'Atualizar registro': 'PUT /api/database/moradores/1',
            'Atualização parcial': 'PATCH /api/database/moradores/1',
            'Excluir registro': 'DELETE /api/database/moradores/1',
            'Criar backup': 'POST /api/database/backup',
            'Limpar dados': 'DELETE /api/database/clear?confirm=true'
        },
        examples: {
            'Criar morador': {
                method: 'POST',
                url: '/api/database/moradores',
                body: {
                    nome: 'Maria Silva',
                    apartamento: '202',
                    bloco: 'B',
                    telefone: '(11) 88888-8888',
                    email: 'maria@email.com',
                    dataEntrada: '2023-12-01',
                    ativo: true
                }
            },
            'Atualizar morador': {
                method: 'PUT',
                url: '/api/database/moradores/1',
                body: {
                    telefone: '(11) 99999-0000',
                    email: 'joao.novo@email.com'
                }
            },
            'Filtrar avisos ativos': {
                method: 'GET',
                url: '/api/database/avisos?ativo=true&prioridade=alta'
            }
        }
    };
    
    res.json(examples);
});

module.exports = router;

