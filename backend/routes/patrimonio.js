// Rotas de Patrimônio (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let patrimonio = [
    {
        id: 1,
        codigo: 'PAT-001',
        descricao: 'Elevador Social',
        categoria: 'equipamento',
        localizacao: 'Hall Principal',
        valor: 150000.00,
        dataAquisicao: '2020-01-15',
        fornecedor: 'Otis Elevadores',
        status: 'ativo',
        dataCadastro: '2024-01-15'
    },
    {
        id: 2,
        codigo: 'PAT-002',
        descricao: 'Sofá do Salão',
        categoria: 'mobiliario',
        localizacao: 'Salão de Festas',
        valor: 5000.00,
        dataAquisicao: '2021-03-20',
        fornecedor: 'Móveis ABC',
        status: 'ativo',
        dataCadastro: '2024-01-15'
    }
];

// GET /api/patrimonio - Listar todos os itens do patrimônio
router.get('/', (req, res) => {
    try {
        const { categoria, localizacao, status } = req.query;
        let patrimonioFiltrado = [...patrimonio];
        
        if (categoria) {
            patrimonioFiltrado = patrimonioFiltrado.filter(p => p.categoria === categoria);
        }
        if (localizacao) {
            patrimonioFiltrado = patrimonioFiltrado.filter(p => p.localizacao === localizacao);
        }
        if (status) {
            patrimonioFiltrado = patrimonioFiltrado.filter(p => p.status === status);
        }
        
        res.json({
            success: true,
            data: patrimonioFiltrado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar patrimônio',
            error: error.message
        });
    }
});

// GET /api/patrimonio/:id - Buscar item por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const item = patrimonio.find(p => p.id === id);
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item do patrimônio não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar item do patrimônio',
            error: error.message
        });
    }
});

// POST /api/patrimonio - Criar novo item
router.post('/', (req, res) => {
    try {
        const { codigo, descricao, categoria, localizacao, valor, dataAquisicao, fornecedor, status } = req.body;
        
        if (!codigo || !descricao || !categoria || !localizacao || !valor) {
            return res.status(400).json({
                success: false,
                message: 'Código, descrição, categoria, localização e valor são obrigatórios'
            });
        }
        
        const novoItem = {
            id: patrimonio.length > 0 ? Math.max(...patrimonio.map(p => p.id)) + 1 : 1,
            codigo,
            descricao,
            categoria,
            localizacao,
            valor: parseFloat(valor),
            dataAquisicao: dataAquisicao || null,
            fornecedor: fornecedor || null,
            status: status || 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        patrimonio.push(novoItem);
        
        res.status(201).json({
            success: true,
            message: 'Item do patrimônio cadastrado com sucesso',
            data: novoItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar item do patrimônio',
            error: error.message
        });
    }
});

// PUT /api/patrimonio/:id - Atualizar item
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const itemIndex = patrimonio.findIndex(p => p.id === id);
        
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item do patrimônio não encontrado'
            });
        }
        
        const { codigo, descricao, categoria, localizacao, valor, dataAquisicao, fornecedor, status } = req.body;
        
        patrimonio[itemIndex] = {
            ...patrimonio[itemIndex],
            codigo: codigo || patrimonio[itemIndex].codigo,
            descricao: descricao || patrimonio[itemIndex].descricao,
            categoria: categoria || patrimonio[itemIndex].categoria,
            localizacao: localizacao || patrimonio[itemIndex].localizacao,
            valor: valor ? parseFloat(valor) : patrimonio[itemIndex].valor,
            dataAquisicao: dataAquisicao || patrimonio[itemIndex].dataAquisicao,
            fornecedor: fornecedor !== undefined ? fornecedor : patrimonio[itemIndex].fornecedor,
            status: status || patrimonio[itemIndex].status
        };
        
        res.json({
            success: true,
            message: 'Item do patrimônio atualizado com sucesso',
            data: patrimonio[itemIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar item do patrimônio',
            error: error.message
        });
    }
});

// DELETE /api/patrimonio/:id - Deletar item
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const itemIndex = patrimonio.findIndex(p => p.id === id);
        
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item do patrimônio não encontrado'
            });
        }
        
        patrimonio.splice(itemIndex, 1);
        
        res.json({
            success: true,
            message: 'Item do patrimônio deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar item do patrimônio',
            error: error.message
        });
    }
});

module.exports = router;



