// Rotas de Reservas
const express = require('express');
const router = express.Router();

// Dados mockados para demonstração
let reservas = [
    {
        id: 1,
        area: "salao-festas",
        morador: "João Silva",
        moradorId: 1,
        data: "2024-12-15",
        horario: "19:00",
        status: "confirmada",
        dataReserva: "2024-12-10"
    },
    {
        id: 2,
        area: "churrasqueira",
        morador: "Maria Santos",
        moradorId: 2,
        data: "2024-12-16",
        horario: "14:00",
        status: "confirmada",
        dataReserva: "2024-12-11"
    }
];

// Áreas disponíveis
const areas = {
    'salao-festas': 'Salão de Festas',
    'churrasqueira': 'Churrasqueira',
    'piscina': 'Piscina',
    'quadra': 'Quadra'
};

// Listar todas as reservas
router.get('/', (req, res) => {
    try {
        const { data, area, status } = req.query;
        let reservasFiltradas = [...reservas];
        
        // Filtrar por data
        if (data) {
            reservasFiltradas = reservasFiltradas.filter(r => r.data === data);
        }
        
        // Filtrar por área
        if (area) {
            reservasFiltradas = reservasFiltradas.filter(r => r.area === area);
        }
        
        // Filtrar por status
        if (status) {
            reservasFiltradas = reservasFiltradas.filter(r => r.status === status);
        }
        
        res.json({
            success: true,
            data: reservasFiltradas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar reservas'
        });
    }
});

// Buscar reserva por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reserva = reservas.find(r => r.id === id);
        
        if (!reserva) {
            return res.status(404).json({
                success: false,
                message: 'Reserva não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: reserva
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar reserva'
        });
    }
});

// Criar nova reserva
router.post('/', (req, res) => {
    try {
        const { area, moradorId, data, horario } = req.body;
        
        // Validação básica
        if (!area || !moradorId || !data || !horario) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos são obrigatórios'
            });
        }
        
        // Validar área
        if (!areas[area]) {
            return res.status(400).json({
                success: false,
                message: 'Área inválida'
            });
        }
        
        // Verificar se já existe reserva para a mesma área, data e horário
        const conflito = reservas.find(r => 
            r.area === area && 
            r.data === data && 
            r.horario === horario &&
            r.status === 'confirmada'
        );
        
        if (conflito) {
            return res.status(400).json({
                success: false,
                message: 'Já existe uma reserva para esta área, data e horário'
            });
        }
        
        // Buscar dados do morador (simulado)
        const morador = { id: moradorId, nome: `Morador ${moradorId}` };
        
        // Criar nova reserva
        const novaReserva = {
            id: Math.max(...reservas.map(r => r.id)) + 1,
            area,
            morador: morador.nome,
            moradorId: parseInt(moradorId),
            data,
            horario,
            status: 'confirmada',
            dataReserva: new Date().toISOString().split('T')[0]
        };
        
        reservas.push(novaReserva);
        
        res.status(201).json({
            success: true,
            message: 'Reserva realizada com sucesso',
            data: novaReserva
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao realizar reserva'
        });
    }
});

// Atualizar reserva
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { area, moradorId, data, horario, status } = req.body;
        
        const reservaIndex = reservas.findIndex(r => r.id === id);
        if (reservaIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Reserva não encontrada'
            });
        }
        
        // Atualizar dados
        reservas[reservaIndex] = {
            ...reservas[reservaIndex],
            area: area || reservas[reservaIndex].area,
            moradorId: moradorId || reservas[reservaIndex].moradorId,
            data: data || reservas[reservaIndex].data,
            horario: horario || reservas[reservaIndex].horario,
            status: status || reservas[reservaIndex].status
        };
        
        res.json({
            success: true,
            message: 'Reserva atualizada com sucesso',
            data: reservas[reservaIndex]
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar reserva'
        });
    }
});

// Deletar reserva
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reservaIndex = reservas.findIndex(r => r.id === id);
        
        if (reservaIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Reserva não encontrada'
            });
        }
        
        reservas.splice(reservaIndex, 1);
        
        res.json({
            success: true,
            message: 'Reserva excluída com sucesso'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao excluir reserva'
        });
    }
});

// Listar áreas disponíveis
router.get('/areas/disponiveis', (req, res) => {
    try {
        res.json({
            success: true,
            data: areas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar áreas'
        });
    }
});

module.exports = router;










