// Rotas de Orçamento de Serviços (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let orcamentosServicos = [
    {
        id: 1,
        descricao: 'Pintura da fachada',
        prestadorId: 2,
        prestador: 'Ana Costa',
        valor: 5000.00,
        dataSolicitacao: '2024-12-01',
        dataAprovacao: null,
        aprovadoPor: null,
        status: 'pendente',
        observacoes: 'Pintura completa da fachada principal'
    }
];

// GET /api/orcamento-servicos - Listar todos os orçamentos
router.get('/', (req, res) => {
    try {
        const { prestadorId, status, dataInicio, dataFim } = req.query;
        let orcamentosFiltrados = [...orcamentosServicos];
        
        if (prestadorId) {
            orcamentosFiltrados = orcamentosFiltrados.filter(o => o.prestadorId === parseInt(prestadorId));
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
            message: 'Erro ao listar orçamentos de serviços',
            error: error.message
        });
    }
});

// GET /api/orcamento-servicos/:id - Buscar orçamento por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orcamento = orcamentosServicos.find(o => o.id === id);
        
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

// POST /api/orcamento-servicos - Criar novo orçamento
router.post('/', (req, res) => {
    try {
        const { descricao, prestadorId, valor, observacoes, status } = req.body;
        
        if (!descricao || !prestadorId || !valor) {
            return res.status(400).json({
                success: false,
                message: 'Descrição, prestador e valor são obrigatórios'
            });
        }
        
        const novoOrcamento = {
            id: orcamentosServicos.length > 0 ? Math.max(...orcamentosServicos.map(o => o.id)) + 1 : 1,
            descricao,
            prestadorId: parseInt(prestadorId),
            prestador: null, // Será preenchido ao buscar prestador
            valor: parseFloat(valor),
            dataSolicitacao: new Date().toISOString().split('T')[0],
            dataAprovacao: null,
            aprovadoPor: null,
            status: status || 'pendente',
            observacoes: observacoes || null
        };
        
        orcamentosServicos.push(novoOrcamento);
        
        res.status(201).json({
            success: true,
            message: 'Orçamento de serviços criado com sucesso',
            data: novoOrcamento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar orçamento de serviços',
            error: error.message
        });
    }
});

// PUT /api/orcamento-servicos/:id - Atualizar orçamento
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orcamentoIndex = orcamentosServicos.findIndex(o => o.id === id);
        
        if (orcamentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Orçamento não encontrado'
            });
        }
        
        const { descricao, prestadorId, valor, dataAprovacao, aprovadoPor, status, observacoes } = req.body;
        
        orcamentosServicos[orcamentoIndex] = {
            ...orcamentosServicos[orcamentoIndex],
            descricao: descricao || orcamentosServicos[orcamentoIndex].descricao,
            prestadorId: prestadorId ? parseInt(prestadorId) : orcamentosServicos[orcamentoIndex].prestadorId,
            valor: valor ? parseFloat(valor) : orcamentosServicos[orcamentoIndex].valor,
            dataAprovacao: dataAprovacao || orcamentosServicos[orcamentoIndex].dataAprovacao,
            aprovadoPor: aprovadoPor || orcamentosServicos[orcamentoIndex].aprovadoPor,
            status: status || orcamentosServicos[orcamentoIndex].status,
            observacoes: observacoes !== undefined ? observacoes : orcamentosServicos[orcamentoIndex].observacoes
        };
        
        res.json({
            success: true,
            message: 'Orçamento atualizado com sucesso',
            data: orcamentosServicos[orcamentoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar orçamento',
            error: error.message
        });
    }
});

// DELETE /api/orcamento-servicos/:id - Deletar orçamento
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orcamentoIndex = orcamentosServicos.findIndex(o => o.id === id);
        
        if (orcamentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Orçamento não encontrado'
            });
        }
        
        orcamentosServicos.splice(orcamentoIndex, 1);
        
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



