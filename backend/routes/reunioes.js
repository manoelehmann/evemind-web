// Rotas de Reuniões (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let reunioes = [
    {
        id: 1,
        tipo: 'ordinaria',
        data: '2024-12-20',
        horario: '19:00',
        local: 'Salão de Festas',
        pauta: 'Discussão de melhorias no condomínio',
        participantes: ['João Silva', 'Maria Santos'],
        status: 'agendada',
        dataCadastro: '2024-12-01'
    }
];

// GET /api/reunioes - Listar todas as reuniões
router.get('/', (req, res) => {
    try {
        const { tipo, data, status } = req.query;
        let reunioesFiltradas = [...reunioes];
        
        if (tipo) {
            reunioesFiltradas = reunioesFiltradas.filter(r => r.tipo === tipo);
        }
        if (data) {
            reunioesFiltradas = reunioesFiltradas.filter(r => r.data === data);
        }
        if (status) {
            reunioesFiltradas = reunioesFiltradas.filter(r => r.status === status);
        }
        
        res.json({
            success: true,
            data: reunioesFiltradas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar reuniões',
            error: error.message
        });
    }
});

// GET /api/reunioes/:id - Buscar reunião por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reuniao = reunioes.find(r => r.id === id);
        
        if (!reuniao) {
            return res.status(404).json({
                success: false,
                message: 'Reunião não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: reuniao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar reunião',
            error: error.message
        });
    }
});

// POST /api/reunioes - Criar nova reunião
router.post('/', (req, res) => {
    try {
        const { tipo, data, horario, local, pauta, participantes, status } = req.body;
        
        if (!tipo || !data || !horario || !local) {
            return res.status(400).json({
                success: false,
                message: 'Tipo, data, horário e local são obrigatórios'
            });
        }
        
        const novaReuniao = {
            id: reunioes.length > 0 ? Math.max(...reunioes.map(r => r.id)) + 1 : 1,
            tipo,
            data,
            horario,
            local,
            pauta: pauta || null,
            participantes: participantes || [],
            status: status || 'agendada',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        reunioes.push(novaReuniao);
        
        res.status(201).json({
            success: true,
            message: 'Reunião criada com sucesso',
            data: novaReuniao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar reunião',
            error: error.message
        });
    }
});

// PUT /api/reunioes/:id - Atualizar reunião
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reuniaoIndex = reunioes.findIndex(r => r.id === id);
        
        if (reuniaoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Reunião não encontrada'
            });
        }
        
        const { tipo, data, horario, local, pauta, participantes, status } = req.body;
        
        reunioes[reuniaoIndex] = {
            ...reunioes[reuniaoIndex],
            tipo: tipo || reunioes[reuniaoIndex].tipo,
            data: data || reunioes[reuniaoIndex].data,
            horario: horario || reunioes[reuniaoIndex].horario,
            local: local || reunioes[reuniaoIndex].local,
            pauta: pauta !== undefined ? pauta : reunioes[reuniaoIndex].pauta,
            participantes: participantes || reunioes[reuniaoIndex].participantes,
            status: status || reunioes[reuniaoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Reunião atualizada com sucesso',
            data: reunioes[reuniaoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar reunião',
            error: error.message
        });
    }
});

// DELETE /api/reunioes/:id - Deletar reunião
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reuniaoIndex = reunioes.findIndex(r => r.id === id);
        
        if (reuniaoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Reunião não encontrada'
            });
        }
        
        reunioes.splice(reuniaoIndex, 1);
        
        res.json({
            success: true,
            message: 'Reunião deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar reunião',
            error: error.message
        });
    }
});

module.exports = router;



