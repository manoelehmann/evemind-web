// Rotas de Grupos (Login Service)
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Grupos e categorias
 */

/**
 * @swagger
 * /grupos:
 *   get:
 *     tags: [Grupos]
 *     summary: Lista grupos
 *   post:
 *     tags: [Grupos]
 *     summary: Cria grupo
 *
 * /grupos/{id}:
 *   get:
 *     tags: [Grupos]
 *     summary: Obtém grupo
 *   put:
 *     tags: [Grupos]
 *     summary: Atualiza grupo
 *   delete:
 *     tags: [Grupos]
 *     summary: Remove grupo
 */


// Dados mockados
let grupos = [
    {
        id: 1,
        nome: 'Administradores',
        descricao: 'Grupo com acesso total',
        funcoes: [1],
        usuarios: [1],
        status: 'ativo'
    },
    {
        id: 2,
        nome: 'Gestão',
        descricao: 'Grupo de gestão do condomínio',
        funcoes: [2],
        usuarios: [],
        status: 'ativo'
    }
];

// GET /api/grupos - Listar todos os grupos
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: grupos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar grupos',
            error: error.message
        });
    }
});

// GET /api/grupos/:id - Buscar grupo por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const grupo = grupos.find(g => g.id === id);
        
        if (!grupo) {
            return res.status(404).json({
                success: false,
                message: 'Grupo não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: grupo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar grupo',
            error: error.message
        });
    }
});

// POST /api/grupos - Criar novo grupo
router.post('/', (req, res) => {
    try {
        const { nome, descricao, funcoes: funcoesIds, usuarios: usuariosIds, status } = req.body;
        
        if (!nome || !descricao) {
            return res.status(400).json({
                success: false,
                message: 'Nome e descrição são obrigatórios'
            });
        }
        
        const novoGrupo = {
            id: grupos.length > 0 ? Math.max(...grupos.map(g => g.id)) + 1 : 1,
            nome,
            descricao,
            funcoes: funcoesIds || [],
            usuarios: usuariosIds || [],
            status: status || 'ativo'
        };
        
        grupos.push(novoGrupo);
        
        res.status(201).json({
            success: true,
            message: 'Grupo criado com sucesso',
            data: novoGrupo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar grupo',
            error: error.message
        });
    }
});

// PUT /api/grupos/:id - Atualizar grupo
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const grupoIndex = grupos.findIndex(g => g.id === id);
        
        if (grupoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Grupo não encontrado'
            });
        }
        
        const { nome, descricao, funcoes: funcoesIds, usuarios: usuariosIds, status } = req.body;
        
        grupos[grupoIndex] = {
            ...grupos[grupoIndex],
            nome: nome || grupos[grupoIndex].nome,
            descricao: descricao || grupos[grupoIndex].descricao,
            funcoes: funcoesIds || grupos[grupoIndex].funcoes,
            usuarios: usuariosIds || grupos[grupoIndex].usuarios,
            status: status || grupos[grupoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Grupo atualizado com sucesso',
            data: grupos[grupoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar grupo',
            error: error.message
        });
    }
});

// DELETE /api/grupos/:id - Deletar grupo
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const grupoIndex = grupos.findIndex(g => g.id === id);
        
        if (grupoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Grupo não encontrado'
            });
        }
        
        grupos.splice(grupoIndex, 1);
        
        res.json({
            success: true,
            message: 'Grupo deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar grupo',
            error: error.message
        });
    }
});

module.exports = router;



