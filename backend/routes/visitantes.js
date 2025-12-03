// Rotas de Visitantes (Unit Service)
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Visitantes
 *   description: Controle de visitantes
 */

/**
 * @swagger
 * /visitantes:
 *   get:
 *     tags: [Visitantes]
 *     summary: Lista visitantes
 *
 *   post:
 *     tags: [Visitantes]
 *     summary: Cadastra visitante
 */

/**
 * @swagger
 * /visitantes/{id}:
 *   get:
 *     tags: [Visitantes]
 *     summary: Obtém visitante
 *
 *   put:
 *     tags: [Visitantes]
 *     summary: Atualiza visitante
 *
 *   delete:
 *     tags: [Visitantes]
 *     summary: Remove visitante
 */


// Dados mockados
let visitantes = [
    {
        id: 1,
        nome: 'Roberto Lima',
        documento: '123.456.789-00',
        unidadeId: 1,
        unidade: '101',
        dataEntrada: '2024-12-10T14:30:00',
        dataSaida: '2024-12-10T16:45:00',
        autorizadoPor: 'João Silva',
        status: 'saido',
        dataCadastro: '2024-12-10'
    }
];

// GET /api/visitantes - Listar todos os visitantes
router.get('/', (req, res) => {
    try {
        const { unidadeId, status, dataInicio, dataFim } = req.query;
        let visitantesFiltrados = [...visitantes];
        
        if (unidadeId) {
            visitantesFiltrados = visitantesFiltrados.filter(v => v.unidadeId === parseInt(unidadeId));
        }
        if (status) {
            visitantesFiltrados = visitantesFiltrados.filter(v => v.status === status);
        }
        if (dataInicio) {
            visitantesFiltrados = visitantesFiltrados.filter(v => v.dataEntrada >= dataInicio);
        }
        if (dataFim) {
            visitantesFiltrados = visitantesFiltrados.filter(v => v.dataEntrada <= dataFim);
        }
        
        res.json({
            success: true,
            data: visitantesFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar visitantes',
            error: error.message
        });
    }
});

// GET /api/visitantes/:id - Buscar visitante por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const visitante = visitantes.find(v => v.id === id);
        
        if (!visitante) {
            return res.status(404).json({
                success: false,
                message: 'Visitante não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: visitante
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar visitante',
            error: error.message
        });
    }
});

// POST /api/visitantes - Criar novo visitante
router.post('/', (req, res) => {
    try {
        const { nome, documento, unidadeId, dataEntrada, dataSaida, autorizadoPor, status } = req.body;
        
        if (!nome || !documento || !unidadeId || !dataEntrada) {
            return res.status(400).json({
                success: false,
                message: 'Nome, documento, unidade e data de entrada são obrigatórios'
            });
        }
        
        const novoVisitante = {
            id: visitantes.length > 0 ? Math.max(...visitantes.map(v => v.id)) + 1 : 1,
            nome,
            documento,
            unidadeId: parseInt(unidadeId),
            unidade: null, // Será preenchido ao buscar unidade
            dataEntrada,
            dataSaida: dataSaida || null,
            autorizadoPor: autorizadoPor || null,
            status: status || (dataSaida ? 'saido' : 'presente'),
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        visitantes.push(novoVisitante);
        
        res.status(201).json({
            success: true,
            message: 'Visitante registrado com sucesso',
            data: novoVisitante
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao registrar visitante',
            error: error.message
        });
    }
});

// PUT /api/visitantes/:id - Atualizar visitante
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const visitanteIndex = visitantes.findIndex(v => v.id === id);
        
        if (visitanteIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Visitante não encontrado'
            });
        }
        
        const { nome, documento, unidadeId, dataEntrada, dataSaida, autorizadoPor, status } = req.body;
        
        visitantes[visitanteIndex] = {
            ...visitantes[visitanteIndex],
            nome: nome || visitantes[visitanteIndex].nome,
            documento: documento || visitantes[visitanteIndex].documento,
            unidadeId: unidadeId ? parseInt(unidadeId) : visitantes[visitanteIndex].unidadeId,
            dataEntrada: dataEntrada || visitantes[visitanteIndex].dataEntrada,
            dataSaida: dataSaida !== undefined ? dataSaida : visitantes[visitanteIndex].dataSaida,
            autorizadoPor: autorizadoPor !== undefined ? autorizadoPor : visitantes[visitanteIndex].autorizadoPor,
            status: status || visitantes[visitanteIndex].status
        };
        
        res.json({
            success: true,
            message: 'Visitante atualizado com sucesso',
            data: visitantes[visitanteIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar visitante',
            error: error.message
        });
    }
});

// DELETE /api/visitantes/:id - Deletar visitante
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const visitanteIndex = visitantes.findIndex(v => v.id === id);
        
        if (visitanteIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Visitante não encontrado'
            });
        }
        
        visitantes.splice(visitanteIndex, 1);
        
        res.json({
            success: true,
            message: 'Visitante deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar visitante',
            error: error.message
        });
    }
});

module.exports = router;



