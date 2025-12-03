// Rotas de Avisos
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Avisos
 *   description: Sistema de avisos
 */

/**
 * @swagger
 * /avisos:
 *   get:
 *     tags: [Avisos]
 *     summary: Lista avisos
 *
 *   post:
 *     tags: [Avisos]
 *     summary: Cria aviso
 */

/**
 * @swagger
 * /avisos/{id}:
 *   get:
 *     tags: [Avisos]
 *     summary: Obtém aviso
 *
 *   put:
 *     tags: [Avisos]
 *     summary: Atualiza aviso
 *
 *   delete:
 *     tags: [Avisos]
 *     summary: Remove aviso
 */


// Dados mockados para demonstração
let avisos = [
    {
        id: 1,
        titulo: "Manutenção do Elevador",
        descricao: "O elevador social passará por manutenção preventiva no dia 15/12/2024 das 8h às 12h.",
        prioridade: "alta",
        data: "2024-12-10",
        ativo: true,
        autor: "Administrador"
    },
    {
        id: 2,
        titulo: "Reunião de Condomínio",
        descricao: "Reunião ordinária do condomínio será realizada no dia 20/12/2024 às 19h no salão de festas.",
        prioridade: "media",
        data: "2024-12-12",
        ativo: true,
        autor: "Administrador"
    }
];

// Listar todos os avisos
router.get('/', (req, res) => {
    try {
        const { ativo, prioridade } = req.query;
        let avisosFiltrados = [...avisos];
        
        // Filtrar por status ativo
        if (ativo !== undefined) {
            avisosFiltrados = avisosFiltrados.filter(a => a.ativo === (ativo === 'true'));
        }
        
        // Filtrar por prioridade
        if (prioridade) {
            avisosFiltrados = avisosFiltrados.filter(a => a.prioridade === prioridade);
        }
        
        res.json({
            success: true,
            data: avisosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar avisos'
        });
    }
});

// Buscar aviso por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const aviso = avisos.find(a => a.id === id);
        
        if (!aviso) {
            return res.status(404).json({
                success: false,
                message: 'Aviso não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: aviso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar aviso'
        });
    }
});

// Criar novo aviso
router.post('/', (req, res) => {
    try {
        const { titulo, descricao, prioridade } = req.body;
        
        // Validação básica
        if (!titulo || !descricao || !prioridade) {
            return res.status(400).json({
                success: false,
                message: 'Título, descrição e prioridade são obrigatórios'
            });
        }
        
        // Validar prioridade
        const prioridadesValidas = ['baixa', 'media', 'alta'];
        if (!prioridadesValidas.includes(prioridade)) {
            return res.status(400).json({
                success: false,
                message: 'Prioridade deve ser: baixa, media ou alta'
            });
        }
        
        // Criar novo aviso
        const novoAviso = {
            id: Math.max(...avisos.map(a => a.id)) + 1,
            titulo,
            descricao,
            prioridade,
            data: new Date().toISOString().split('T')[0],
            ativo: true,
            autor: "Administrador"
        };
        
        avisos.push(novoAviso);
        
        res.status(201).json({
            success: true,
            message: 'Aviso publicado com sucesso',
            data: novoAviso
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao publicar aviso'
        });
    }
});

// Atualizar aviso
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, descricao, prioridade, ativo } = req.body;
        
        const avisoIndex = avisos.findIndex(a => a.id === id);
        if (avisoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Aviso não encontrado'
            });
        }
        
        // Atualizar dados
        avisos[avisoIndex] = {
            ...avisos[avisoIndex],
            titulo: titulo || avisos[avisoIndex].titulo,
            descricao: descricao || avisos[avisoIndex].descricao,
            prioridade: prioridade || avisos[avisoIndex].prioridade,
            ativo: ativo !== undefined ? ativo : avisos[avisoIndex].ativo
        };
        
        res.json({
            success: true,
            message: 'Aviso atualizado com sucesso',
            data: avisos[avisoIndex]
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar aviso'
        });
    }
});

// Deletar aviso
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const avisoIndex = avisos.findIndex(a => a.id === id);
        
        if (avisoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Aviso não encontrado'
            });
        }
        
        avisos.splice(avisoIndex, 1);
        
        res.json({
            success: true,
            message: 'Aviso excluído com sucesso'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao excluir aviso'
        });
    }
});

module.exports = router;










