// Rotas de Eventos (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let eventos = [
    {
        id: 1,
        titulo: 'Festa de Natal',
        descricao: 'Festa de confraternização de fim de ano',
        data: '2024-12-20',
        horario: '19:00',
        local: 'Salão de Festas',
        responsavel: 'João Silva',
        status: 'agendado',
        dataCadastro: '2024-12-01'
    }
];

// GET /api/eventos - Listar todos os eventos
router.get('/', (req, res) => {
    try {
        const { data, status } = req.query;
        let eventosFiltrados = [...eventos];
        
        if (data) {
            eventosFiltrados = eventosFiltrados.filter(e => e.data === data);
        }
        if (status) {
            eventosFiltrados = eventosFiltrados.filter(e => e.status === status);
        }
        
        res.json({
            success: true,
            data: eventosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar eventos',
            error: error.message
        });
    }
});

// GET /api/eventos/:id - Buscar evento por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const evento = eventos.find(e => e.id === id);
        
        if (!evento) {
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: evento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar evento',
            error: error.message
        });
    }
});

// POST /api/eventos - Criar novo evento
router.post('/', (req, res) => {
    try {
        const { titulo, descricao, data, horario, local, responsavel, status } = req.body;
        
        if (!titulo || !data || !horario || !local) {
            return res.status(400).json({
                success: false,
                message: 'Título, data, horário e local são obrigatórios'
            });
        }
        
        const novoEvento = {
            id: eventos.length > 0 ? Math.max(...eventos.map(e => e.id)) + 1 : 1,
            titulo,
            descricao: descricao || null,
            data,
            horario,
            local,
            responsavel: responsavel || null,
            status: status || 'agendado',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        eventos.push(novoEvento);
        
        res.status(201).json({
            success: true,
            message: 'Evento criado com sucesso',
            data: novoEvento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar evento',
            error: error.message
        });
    }
});

// PUT /api/eventos/:id - Atualizar evento
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventoIndex = eventos.findIndex(e => e.id === id);
        
        if (eventoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado'
            });
        }
        
        const { titulo, descricao, data, horario, local, responsavel, status } = req.body;
        
        eventos[eventoIndex] = {
            ...eventos[eventoIndex],
            titulo: titulo || eventos[eventoIndex].titulo,
            descricao: descricao !== undefined ? descricao : eventos[eventoIndex].descricao,
            data: data || eventos[eventoIndex].data,
            horario: horario || eventos[eventoIndex].horario,
            local: local || eventos[eventoIndex].local,
            responsavel: responsavel !== undefined ? responsavel : eventos[eventoIndex].responsavel,
            status: status || eventos[eventoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Evento atualizado com sucesso',
            data: eventos[eventoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar evento',
            error: error.message
        });
    }
});

// DELETE /api/eventos/:id - Deletar evento
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventoIndex = eventos.findIndex(e => e.id === id);
        
        if (eventoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Evento não encontrado'
            });
        }
        
        eventos.splice(eventoIndex, 1);
        
        res.json({
            success: true,
            message: 'Evento deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar evento',
            error: error.message
        });
    }
});

module.exports = router;



