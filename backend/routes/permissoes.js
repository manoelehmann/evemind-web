const express = require('express');
const router = express.Router();

// Simulação de dados em memória (em produção, usar banco de dados)
let permissoes = [
    {
        id: 1,
        funcao: 'Administrador',
        modulo: 'Sistema',
        permissoes: ['visualizar', 'criar', 'editar', 'deletar'],
        status: 'ativo'
    },
    {
        id: 2,
        funcao: 'Síndico',
        modulo: 'Moradores',
        permissoes: ['visualizar', 'criar', 'editar'],
        status: 'ativo'
    },
    {
        id: 3,
        funcao: 'Síndico',
        modulo: 'Avisos',
        permissoes: ['visualizar', 'criar', 'editar', 'deletar'],
        status: 'ativo'
    },
    {
        id: 4,
        funcao: 'Síndico',
        modulo: 'Reservas',
        permissoes: ['visualizar', 'criar', 'editar'],
        status: 'ativo'
    },
    {
        id: 5,
        funcao: 'Síndico',
        modulo: 'Ocorrências',
        permissoes: ['visualizar', 'criar', 'editar'],
        status: 'ativo'
    },
    {
        id: 6,
        funcao: 'Porteiro',
        modulo: 'Visitantes',
        permissoes: ['visualizar', 'criar', 'editar'],
        status: 'ativo'
    },
    {
        id: 7,
        funcao: 'Porteiro',
        modulo: 'Avisos',
        permissoes: ['visualizar'],
        status: 'ativo'
    },
    {
        id: 8,
        funcao: 'Morador',
        modulo: 'Reservas',
        permissoes: ['visualizar', 'criar'],
        status: 'ativo'
    },
    {
        id: 9,
        funcao: 'Morador',
        modulo: 'Avisos',
        permissoes: ['visualizar'],
        status: 'ativo'
    }
];

// GET /api/permissoes - Listar todas as permissões
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: permissoes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar permissões',
            error: error.message
        });
    }
});

// GET /api/permissoes/funcao/:funcao - Buscar permissões por função
router.get('/funcao/:funcao', (req, res) => {
    try {
        const funcao = req.params.funcao;
        const permissoesFuncao = permissoes.filter(p => p.funcao === funcao);
        
        res.json({
            success: true,
            data: permissoesFuncao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar permissões da função',
            error: error.message
        });
    }
});

// GET /api/permissoes/:id - Buscar permissão por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const permissao = permissoes.find(p => p.id === id);
        
        if (!permissao) {
            return res.status(404).json({
                success: false,
                message: 'Permissão não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: permissao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar permissão',
            error: error.message
        });
    }
});

// POST /api/permissoes - Criar nova permissão
router.post('/', (req, res) => {
    try {
        const { funcao, modulo, permissoes: permissoesArray } = req.body;
        
        // Validações básicas
        if (!funcao || !modulo || !permissoesArray || !Array.isArray(permissoesArray)) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }
        
        // Verificar se já existe permissão para a função e módulo
        const permissaoExiste = permissoes.find(p => p.funcao === funcao && p.modulo === modulo);
        if (permissaoExiste) {
            return res.status(400).json({
                success: false,
                message: 'Permissão já existe para esta função e módulo'
            });
        }
        
        const novaPermissao = {
            id: permissoes.length + 1,
            funcao,
            modulo,
            permissoes: permissoesArray,
            status: 'ativo'
        };
        
        permissoes.push(novaPermissao);
        
        res.status(201).json({
            success: true,
            message: 'Permissão criada com sucesso',
            data: novaPermissao
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar permissão',
            error: error.message
        });
    }
});

// PUT /api/permissoes/:id - Atualizar permissão
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const permissaoIndex = permissoes.findIndex(p => p.id === id);
        
        if (permissaoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Permissão não encontrada'
            });
        }
        
        const { funcao, modulo, permissoes: permissoesArray, status } = req.body;
        
        permissoes[permissaoIndex] = {
            ...permissoes[permissaoIndex],
            funcao: funcao || permissoes[permissaoIndex].funcao,
            modulo: modulo || permissoes[permissaoIndex].modulo,
            permissoes: permissoesArray || permissoes[permissaoIndex].permissoes,
            status: status || permissoes[permissaoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Permissão atualizada com sucesso',
            data: permissoes[permissaoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar permissão',
            error: error.message
        });
    }
});

// DELETE /api/permissoes/:id - Deletar permissão
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const permissaoIndex = permissoes.findIndex(p => p.id === id);
        
        if (permissaoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Permissão não encontrada'
            });
        }
        
        permissoes.splice(permissaoIndex, 1);
        
        res.json({
            success: true,
            message: 'Permissão deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar permissão',
            error: error.message
        });
    }
});

module.exports = router;

