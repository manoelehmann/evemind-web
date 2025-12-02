// Rotas de Unidades (Login Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let unidades = [
    {
        id: 1,
        numero: '101',
        bloco: 'A',
        andar: 1,
        tipo: 'apartamento',
        moradorPrincipalId: 1,
        moradorPrincipal: 'João Silva',
        status: 'ocupada',
        dataCadastro: '2024-01-15'
    },
    {
        id: 2,
        numero: '202',
        bloco: 'A',
        andar: 2,
        tipo: 'apartamento',
        moradorPrincipalId: 2,
        moradorPrincipal: 'Maria Santos',
        status: 'ocupada',
        dataCadastro: '2024-01-20'
    }
];

// GET /api/unidades - Listar todas as unidades
router.get('/', (req, res) => {
    try {
        const { bloco, tipo, status } = req.query;
        let unidadesFiltradas = [...unidades];
        
        if (bloco) {
            unidadesFiltradas = unidadesFiltradas.filter(u => u.bloco === bloco);
        }
        if (tipo) {
            unidadesFiltradas = unidadesFiltradas.filter(u => u.tipo === tipo);
        }
        if (status) {
            unidadesFiltradas = unidadesFiltradas.filter(u => u.status === status);
        }
        
        res.json({
            success: true,
            data: unidadesFiltradas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar unidades',
            error: error.message
        });
    }
});

// GET /api/unidades/:id - Buscar unidade por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const unidade = unidades.find(u => u.id === id);
        
        if (!unidade) {
            return res.status(404).json({
                success: false,
                message: 'Unidade não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: unidade
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar unidade',
            error: error.message
        });
    }
});

// POST /api/unidades - Criar nova unidade
router.post('/', (req, res) => {
    try {
        const { numero, bloco, andar, tipo, moradorPrincipalId, status } = req.body;
        
        if (!numero || !bloco || !andar || !tipo) {
            return res.status(400).json({
                success: false,
                message: 'Número, bloco, andar e tipo são obrigatórios'
            });
        }
        
        // Verificar se unidade já existe
        const unidadeExistente = unidades.find(u => u.numero === numero && u.bloco === bloco);
        if (unidadeExistente) {
            return res.status(400).json({
                success: false,
                message: 'Já existe uma unidade com este número e bloco'
            });
        }
        
        const novaUnidade = {
            id: unidades.length > 0 ? Math.max(...unidades.map(u => u.id)) + 1 : 1,
            numero,
            bloco,
            andar: parseInt(andar),
            tipo,
            moradorPrincipalId: moradorPrincipalId || null,
            moradorPrincipal: null, // Será preenchido ao buscar morador
            status: status || 'ocupada',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        unidades.push(novaUnidade);
        
        res.status(201).json({
            success: true,
            message: 'Unidade cadastrada com sucesso',
            data: novaUnidade
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar unidade',
            error: error.message
        });
    }
});

// PUT /api/unidades/:id - Atualizar unidade
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const unidadeIndex = unidades.findIndex(u => u.id === id);
        
        if (unidadeIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Unidade não encontrada'
            });
        }
        
        const { numero, bloco, andar, tipo, moradorPrincipalId, status } = req.body;
        
        unidades[unidadeIndex] = {
            ...unidades[unidadeIndex],
            numero: numero || unidades[unidadeIndex].numero,
            bloco: bloco || unidades[unidadeIndex].bloco,
            andar: andar ? parseInt(andar) : unidades[unidadeIndex].andar,
            tipo: tipo || unidades[unidadeIndex].tipo,
            moradorPrincipalId: moradorPrincipalId !== undefined ? moradorPrincipalId : unidades[unidadeIndex].moradorPrincipalId,
            moradorPrincipal: null, // Será atualizado ao buscar morador
            status: status || unidades[unidadeIndex].status
        };
        
        res.json({
            success: true,
            message: 'Unidade atualizada com sucesso',
            data: unidades[unidadeIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar unidade',
            error: error.message
        });
    }
});

// DELETE /api/unidades/:id - Deletar unidade
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const unidadeIndex = unidades.findIndex(u => u.id === id);
        
        if (unidadeIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Unidade não encontrada'
            });
        }
        
        unidades.splice(unidadeIndex, 1);
        
        res.json({
            success: true,
            message: 'Unidade deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar unidade',
            error: error.message
        });
    }
});

module.exports = router;



