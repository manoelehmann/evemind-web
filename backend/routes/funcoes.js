// Rotas de Funções (Login Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let funcoes = [
    {
        id: 1,
        nome: 'Administrador',
        descricao: 'Acesso total ao sistema',
        permissoes: ['*'],
        status: 'ativo'
    },
    {
        id: 2,
        nome: 'Síndico',
        descricao: 'Gerenciamento do condomínio',
        permissoes: ['moradores', 'avisos', 'reservas', 'ocorrencias'],
        status: 'ativo'
    },
    {
        id: 3,
        nome: 'Porteiro',
        descricao: 'Controle de acesso',
        permissoes: ['visitantes', 'avisos'],
        status: 'ativo'
    }
];

// GET /api/funcoes - Listar todas as funções
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: funcoes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar funções',
            error: error.message
        });
    }
});

// GET /api/funcoes/:id - Buscar função por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcao = funcoes.find(f => f.id === id);
        
        if (!funcao) {
            return res.status(404).json({
                success: false,
                message: 'Função não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: funcao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar função',
            error: error.message
        });
    }
});

// POST /api/funcoes - Criar nova função
router.post('/', (req, res) => {
    try {
        const { nome, descricao, permissoes, status } = req.body;
        
        if (!nome || !descricao) {
            return res.status(400).json({
                success: false,
                message: 'Nome e descrição são obrigatórios'
            });
        }
        
        const novaFuncao = {
            id: funcoes.length > 0 ? Math.max(...funcoes.map(f => f.id)) + 1 : 1,
            nome,
            descricao,
            permissoes: permissoes || [],
            status: status || 'ativo'
        };
        
        funcoes.push(novaFuncao);
        
        res.status(201).json({
            success: true,
            message: 'Função criada com sucesso',
            data: novaFuncao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar função',
            error: error.message
        });
    }
});

// PUT /api/funcoes/:id - Atualizar função
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcaoIndex = funcoes.findIndex(f => f.id === id);
        
        if (funcaoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Função não encontrada'
            });
        }
        
        const { nome, descricao, permissoes, status } = req.body;
        
        funcoes[funcaoIndex] = {
            ...funcoes[funcaoIndex],
            nome: nome || funcoes[funcaoIndex].nome,
            descricao: descricao || funcoes[funcaoIndex].descricao,
            permissoes: permissoes || funcoes[funcaoIndex].permissoes,
            status: status || funcoes[funcaoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Função atualizada com sucesso',
            data: funcoes[funcaoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar função',
            error: error.message
        });
    }
});

// DELETE /api/funcoes/:id - Deletar função
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcaoIndex = funcoes.findIndex(f => f.id === id);
        
        if (funcaoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Função não encontrada'
            });
        }
        
        funcoes.splice(funcaoIndex, 1);
        
        res.json({
            success: true,
            message: 'Função deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar função',
            error: error.message
        });
    }
});

module.exports = router;



