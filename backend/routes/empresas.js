const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Gestão de empresas
 */

/**
 * @swagger
 * /empresas:
 *   get:
 *     tags: [Empresas]
 *     summary: Lista empresas
 *
 *   post:
 *     tags: [Empresas]
 *     summary: Cria empresa
 */

/**
 * @swagger
 * /empresas/{id}:
 *   get:
 *     tags: [Empresas]
 *     summary: Obtém empresa
 *
 *   put:
 *     tags: [Empresas]
 *     summary: Atualiza empresa
 *
 *   delete:
 *     tags: [Empresas]
 *     summary: Remove empresa
 */


// Simulação de dados em memória (em produção, usar banco de dados)
let empresas = [
    {
        id: 1,
        nome: 'Condomínio Residencial Jardim',
        cnpj: '12.345.678/0001-90',
        endereco: 'Rua das Flores, 123 - Jardim das Américas',
        telefone: '(11) 99999-9999',
        email: 'contato@jardim.com',
        status: 'ativo',
        dataCadastro: '2024-01-01'
    },
    {
        id: 2,
        nome: 'Edifício Comercial Centro',
        cnpj: '98.765.432/0001-10',
        endereco: 'Av. Paulista, 1000 - Centro',
        telefone: '(11) 88888-8888',
        email: 'contato@centro.com',
        status: 'ativo',
        dataCadastro: '2024-01-02'
    },
    {
        id: 3,
        nome: 'Condomínio Residencial Vista',
        cnpj: '11.222.333/0001-44',
        endereco: 'Rua da Vista, 456 - Vista Alegre',
        telefone: '(11) 77777-7777',
        email: 'contato@vista.com',
        status: 'ativo',
        dataCadastro: '2024-01-03'
    }
];

// GET /api/empresas - Listar todas as empresas
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: empresas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar empresas',
            error: error.message
        });
    }
});

// GET /api/empresas/:id - Buscar empresa por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const empresa = empresas.find(e => e.id === id);
        
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: empresa
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar empresa',
            error: error.message
        });
    }
});

// POST /api/empresas - Criar nova empresa
router.post('/', (req, res) => {
    try {
        const { nome, cnpj, endereco, telefone, email } = req.body;
        
        // Validações básicas
        if (!nome || !cnpj || !endereco || !telefone) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }
        
        // Verificar se CNPJ já existe
        const cnpjExiste = empresas.find(e => e.cnpj === cnpj);
        if (cnpjExiste) {
            return res.status(400).json({
                success: false,
                message: 'CNPJ já cadastrado'
            });
        }
        
        const novaEmpresa = {
            id: empresas.length + 1,
            nome,
            cnpj,
            endereco,
            telefone,
            email: email || '',
            status: 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        empresas.push(novaEmpresa);
        
        res.status(201).json({
            success: true,
            message: 'Empresa criada com sucesso',
            data: novaEmpresa
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar empresa',
            error: error.message
        });
    }
});

// PUT /api/empresas/:id - Atualizar empresa
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const empresaIndex = empresas.findIndex(e => e.id === id);
        
        if (empresaIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada'
            });
        }
        
        const { nome, cnpj, endereco, telefone, email, status } = req.body;
        
        empresas[empresaIndex] = {
            ...empresas[empresaIndex],
            nome: nome || empresas[empresaIndex].nome,
            cnpj: cnpj || empresas[empresaIndex].cnpj,
            endereco: endereco || empresas[empresaIndex].endereco,
            telefone: telefone || empresas[empresaIndex].telefone,
            email: email || empresas[empresaIndex].email,
            status: status || empresas[empresaIndex].status
        };
        
        res.json({
            success: true,
            message: 'Empresa atualizada com sucesso',
            data: empresas[empresaIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar empresa',
            error: error.message
        });
    }
});

// DELETE /api/empresas/:id - Deletar empresa
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const empresaIndex = empresas.findIndex(e => e.id === id);
        
        if (empresaIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada'
            });
        }
        
        empresas.splice(empresaIndex, 1);
        
        res.json({
            success: true,
            message: 'Empresa deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar empresa',
            error: error.message
        });
    }
});

module.exports = router;

