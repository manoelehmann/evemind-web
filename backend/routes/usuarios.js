const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gestão de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista usuários
 *
 *   post:
 *     tags: [Usuários]
 *     summary: Cria usuário
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Obtém usuário
 *
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza usuário
 *
 *   delete:
 *     tags: [Usuários]
 *     summary: Remove usuário
 */


// Simulação de dados em memória (em produção, usar banco de dados)
let usuarios = [
    {
        id: 1,
        nome: 'Administrador',
        email: 'admin@condominio.com',
        senha: 'senha123',
        funcao: 'Administrador',
        empresa: 'Condomínio Residencial Jardim',
        status: 'ativo',
        ultimoAcesso: '2024-01-15 10:30:00',
        permissoes: ['dashboard', 'moradores', 'avisos', 'reservas', 'ocorrencias', 'usuarios', 'auditoria']
    },
    {
        id: 2,
        nome: 'Porteiro',
        email: 'porteiro@condominio.com',
        senha: 'porteiro123',
        funcao: 'Porteiro',
        empresa: 'Condomínio Residencial Jardim',
        status: 'ativo',
        ultimoAcesso: '2024-01-15 09:15:00',
        permissoes: ['dashboard', 'visitantes', 'avisos']
    },
    {
        id: 3,
        nome: 'Síndico',
        email: 'sindico@condominio.com',
        senha: 'sindico123',
        funcao: 'Síndico',
        empresa: 'Condomínio Residencial Jardim',
        status: 'ativo',
        ultimoAcesso: '2024-01-15 08:45:00',
        permissoes: ['dashboard', 'moradores', 'avisos', 'reservas', 'ocorrencias', 'patrimonio']
    }
];

// GET /api/usuarios - Listar todos os usuários
router.get('/', (req, res) => {
    try {
        const usuariosSemSenha = usuarios.map(usuario => {
            const { senha, ...usuarioSemSenha } = usuario;
            return usuarioSemSenha;
        });
        
        res.json({
            success: true,
            data: usuariosSemSenha
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar usuários',
            error: error.message
        });
    }
});

// GET /api/usuarios/:id - Buscar usuário por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === id);
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }
        
        const { senha, ...usuarioSemSenha } = usuario;
        res.json({
            success: true,
            data: usuarioSemSenha
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar usuário',
            error: error.message
        });
    }
});

// POST /api/usuarios - Criar novo usuário
router.post('/', (req, res) => {
    try {
        const { nome, email, senha, funcao, empresa, permissoes } = req.body;
        
        // Validações básicas
        if (!nome || !email || !senha || !funcao || !empresa) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }
        
        // Verificar se email já existe
        const emailExiste = usuarios.find(u => u.email === email);
        if (emailExiste) {
            return res.status(400).json({
                success: false,
                message: 'Email já cadastrado'
            });
        }
        
        const novoUsuario = {
            id: usuarios.length + 1,
            nome,
            email,
            senha,
            funcao,
            empresa,
            status: 'ativo',
            ultimoAcesso: null,
            permissoes: permissoes || []
        };
        
        usuarios.push(novoUsuario);
        
        const { senha: _, ...usuarioSemSenha } = novoUsuario;
        res.status(201).json({
            success: true,
            message: 'Usuário criado com sucesso',
            data: usuarioSemSenha
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar usuário',
            error: error.message
        });
    }
});

// PUT /api/usuarios/:id - Atualizar usuário
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioIndex = usuarios.findIndex(u => u.id === id);
        
        if (usuarioIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }
        
        const { nome, email, funcao, empresa, status, permissoes } = req.body;
        
        usuarios[usuarioIndex] = {
            ...usuarios[usuarioIndex],
            nome: nome || usuarios[usuarioIndex].nome,
            email: email || usuarios[usuarioIndex].email,
            funcao: funcao || usuarios[usuarioIndex].funcao,
            empresa: empresa || usuarios[usuarioIndex].empresa,
            status: status || usuarios[usuarioIndex].status,
            permissoes: permissoes || usuarios[usuarioIndex].permissoes
        };
        
        const { senha, ...usuarioSemSenha } = usuarios[usuarioIndex];
        res.json({
            success: true,
            message: 'Usuário atualizado com sucesso',
            data: usuarioSemSenha
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar usuário',
            error: error.message
        });
    }
});

// DELETE /api/usuarios/:id - Deletar usuário
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioIndex = usuarios.findIndex(u => u.id === id);
        
        if (usuarioIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }
        
        usuarios.splice(usuarioIndex, 1);
        
        res.json({
            success: true,
            message: 'Usuário deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar usuário',
            error: error.message
        });
    }
});

module.exports = router;

