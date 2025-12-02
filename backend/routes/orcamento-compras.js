// Rotas de Orçamento de Compras (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let orcamentosCompras = [
    {
        id: 1,
        descricao: 'Material de limpeza',
        categoria: 'limpeza',
        fornecedor: 'Fornecedor ABC',
        valor: 1500.00,
        dataSolicitacao: '2024-12-01',
        dataAprovacao: null,
        aprovadoPor: null,
        status: 'pendente',
        observacoes: 'Material para o mês de dezembro'
    }
];

// GET /api/orcamento-compras - Listar todos os orçamentos
router.get('/', (req, res) => {
    try {
        const { categoria, status, dataInicio, dataFim } = req.query;
        let orcamentosFiltrados = [...orcamentosCompras];
        
        if (categoria) {
            orcamentosFiltrados = orcamentosFiltrados.filter(o => o.categoria === categoria);
        }
        if (status) {
            orcamentosFiltrados = orcamentosFiltrados.filter(o => o.status === status);
        }
        if (dataInicio) {
            orcamentosFiltrados = orcamentosFiltrados.filter(o => o.dataSolicitacao >= dataInicio);
        }
        if (dataFim) {
            orcamentosFiltrados = orcamentosFiltrados.filter(o => o.dataSolicitacao <= dataFim);
        }
        
        res.json({
            success: true,
            data: orcamentosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar orçamentos de compras',
            error: error.message
        });
    }
});

// GET /api/orcamento-compras/:id - Buscar orçamento por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orcamento = orcamentosCompras.find(o => o.id === id);
        
        if (!orcamento) {
            return res.status(404).json({
                success: false,
                message: 'Orçamento não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: orcamento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar orçamento',
            error: error.message
        });
    }
});

// POST /api/orcamento-compras - Criar novo orçamento
router.post('/', (req, res) => {
    try {
        const { descricao, categoria, fornecedor, valor, observacoes, status } = req.body;
        
        if (!descricao || !categoria || !fornecedor || !valor) {
            return res.status(400).json({
                success: false,
                message: 'Descrição, categoria, fornecedor e valor são obrigatórios'
            });
        }
        
        const novoOrcamento = {
            id: orcamentosCompras.length > 0 ? Math.max(...orcamentosCompras.map(o => o.id)) + 1 : 1,
            descricao,
            categoria,
            fornecedor,
            valor: parseFloat(valor),
            dataSolicitacao: new Date().toISOString().split('T')[0],
            dataAprovacao: null,
            aprovadoPor: null,
            status: status || 'pendente',
            observacoes: observacoes || null
        };
        
        orcamentosCompras.push(novoOrcamento);
        
        res.status(201).json({
            success: true,
            message: 'Orçamento de compras criado com sucesso',
            data: novoOrcamento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar orçamento de compras',
            error: error.message
        });
    }
});

// PUT /api/orcamento-compras/:id - Atualizar orçamento
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orcamentoIndex = orcamentosCompras.findIndex(o => o.id === id);
        
        if (orcamentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Orçamento não encontrado'
            });
        }
        
        const { descricao, categoria, fornecedor, valor, dataAprovacao, aprovadoPor, status, observacoes } = req.body;
        
        orcamentosCompras[orcamentoIndex] = {
            ...orcamentosCompras[orcamentoIndex],
            descricao: descricao || orcamentosCompras[orcamentoIndex].descricao,
            categoria: categoria || orcamentosCompras[orcamentoIndex].categoria,
            fornecedor: fornecedor || orcamentosCompras[orcamentoIndex].fornecedor,
            valor: valor ? parseFloat(valor) : orcamentosCompras[orcamentoIndex].valor,
            dataAprovacao: dataAprovacao || orcamentosCompras[orcamentoIndex].dataAprovacao,
            aprovadoPor: aprovadoPor || orcamentosCompras[orcamentoIndex].aprovadoPor,
            status: status || orcamentosCompras[orcamentoIndex].status,
            observacoes: observacoes !== undefined ? observacoes : orcamentosCompras[orcamentoIndex].observacoes
        };
        
        res.json({
            success: true,
            message: 'Orçamento atualizado com sucesso',
            data: orcamentosCompras[orcamentoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar orçamento',
            error: error.message
        });
    }
});

// DELETE /api/orcamento-compras/:id - Deletar orçamento
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orcamentoIndex = orcamentosCompras.findIndex(o => o.id === id);
        
        if (orcamentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Orçamento não encontrado'
            });
        }
        
        orcamentosCompras.splice(orcamentoIndex, 1);
        
        res.json({
            success: true,
            message: 'Orçamento deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar orçamento',
            error: error.message
        });
    }
});

module.exports = router;



