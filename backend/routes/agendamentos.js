// Rotas de Agendamentos (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let agendamentos = [
    {
        id: 1,
        tipo: 'manutencao',
        descricao: 'Manutenção do elevador social',
        unidadeId: 1,
        unidade: '101',
        prestadorId: 2,
        prestador: 'Ana Costa',
        data: '2024-12-15',
        horario: '08:00',
        status: 'agendado',
        observacoes: 'Verificar sistema hidráulico',
        dataCadastro: '2024-12-10'
    }
];

// GET /api/agendamentos - Listar todos os agendamentos
router.get('/', (req, res) => {
    try {
        const { data, unidadeId, prestadorId, status } = req.query;
        let agendamentosFiltrados = [...agendamentos];
        
        if (data) {
            agendamentosFiltrados = agendamentosFiltrados.filter(a => a.data === data);
        }
        if (unidadeId) {
            agendamentosFiltrados = agendamentosFiltrados.filter(a => a.unidadeId === parseInt(unidadeId));
        }
        if (prestadorId) {
            agendamentosFiltrados = agendamentosFiltrados.filter(a => a.prestadorId === parseInt(prestadorId));
        }
        if (status) {
            agendamentosFiltrados = agendamentosFiltrados.filter(a => a.status === status);
        }
        
        res.json({
            success: true,
            data: agendamentosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar agendamentos',
            error: error.message
        });
    }
});

// GET /api/agendamentos/:id - Buscar agendamento por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const agendamento = agendamentos.find(a => a.id === id);
        
        if (!agendamento) {
            return res.status(404).json({
                success: false,
                message: 'Agendamento não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: agendamento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar agendamento',
            error: error.message
        });
    }
});

// POST /api/agendamentos - Criar novo agendamento
router.post('/', (req, res) => {
    try {
        const { tipo, descricao, unidadeId, prestadorId, data, horario, observacoes, status } = req.body;
        
        if (!tipo || !descricao || !unidadeId || !prestadorId || !data || !horario) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }
        
        const novoAgendamento = {
            id: agendamentos.length > 0 ? Math.max(...agendamentos.map(a => a.id)) + 1 : 1,
            tipo,
            descricao,
            unidadeId: parseInt(unidadeId),
            unidade: null, // Será preenchido ao buscar unidade
            prestadorId: parseInt(prestadorId),
            prestador: null, // Será preenchido ao buscar prestador
            data,
            horario,
            status: status || 'agendado',
            observacoes: observacoes || null,
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        agendamentos.push(novoAgendamento);
        
        res.status(201).json({
            success: true,
            message: 'Agendamento criado com sucesso',
            data: novoAgendamento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar agendamento',
            error: error.message
        });
    }
});

// PUT /api/agendamentos/:id - Atualizar agendamento
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const agendamentoIndex = agendamentos.findIndex(a => a.id === id);
        
        if (agendamentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Agendamento não encontrado'
            });
        }
        
        const { tipo, descricao, unidadeId, prestadorId, data, horario, observacoes, status } = req.body;
        
        agendamentos[agendamentoIndex] = {
            ...agendamentos[agendamentoIndex],
            tipo: tipo || agendamentos[agendamentoIndex].tipo,
            descricao: descricao || agendamentos[agendamentoIndex].descricao,
            unidadeId: unidadeId ? parseInt(unidadeId) : agendamentos[agendamentoIndex].unidadeId,
            prestadorId: prestadorId ? parseInt(prestadorId) : agendamentos[agendamentoIndex].prestadorId,
            data: data || agendamentos[agendamentoIndex].data,
            horario: horario || agendamentos[agendamentoIndex].horario,
            observacoes: observacoes !== undefined ? observacoes : agendamentos[agendamentoIndex].observacoes,
            status: status || agendamentos[agendamentoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Agendamento atualizado com sucesso',
            data: agendamentos[agendamentoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar agendamento',
            error: error.message
        });
    }
});

// DELETE /api/agendamentos/:id - Deletar agendamento
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const agendamentoIndex = agendamentos.findIndex(a => a.id === id);
        
        if (agendamentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Agendamento não encontrado'
            });
        }
        
        agendamentos.splice(agendamentoIndex, 1);
        
        res.json({
            success: true,
            message: 'Agendamento deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar agendamento',
            error: error.message
        });
    }
});

module.exports = router;



