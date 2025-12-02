// Rotas de Prestadores (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let prestadores = [
    {
        id: 1,
        nome: 'Carlos Silva',
        empresa: 'Limpeza Total',
        servico: 'limpeza',
        telefone: '(11) 99999-1111',
        email: 'carlos@limpezatotal.com',
        cnpj: '12.345.678/0001-11',
        endereco: 'Rua A, 123',
        status: 'ativo',
        dataCadastro: '2024-01-10'
    },
    {
        id: 2,
        nome: 'Ana Costa',
        empresa: 'Manutenção Express',
        servico: 'manutencao',
        telefone: '(11) 88888-2222',
        email: 'ana@manutencao.com',
        cnpj: '98.765.432/0001-22',
        endereco: 'Rua B, 456',
        status: 'ativo',
        dataCadastro: '2024-01-15'
    }
];

// GET /api/prestadores - Listar todos os prestadores
router.get('/', (req, res) => {
    try {
        const { servico, status } = req.query;
        let prestadoresFiltrados = [...prestadores];
        
        if (servico) {
            prestadoresFiltrados = prestadoresFiltrados.filter(p => p.servico === servico);
        }
        if (status) {
            prestadoresFiltrados = prestadoresFiltrados.filter(p => p.status === status);
        }
        
        res.json({
            success: true,
            data: prestadoresFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar prestadores',
            error: error.message
        });
    }
});

// GET /api/prestadores/:id - Buscar prestador por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const prestador = prestadores.find(p => p.id === id);
        
        if (!prestador) {
            return res.status(404).json({
                success: false,
                message: 'Prestador não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: prestador
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar prestador',
            error: error.message
        });
    }
});

// POST /api/prestadores - Criar novo prestador
router.post('/', (req, res) => {
    try {
        const { nome, empresa, servico, telefone, email, cnpj, endereco, status } = req.body;
        
        if (!nome || !empresa || !servico || !telefone) {
            return res.status(400).json({
                success: false,
                message: 'Nome, empresa, serviço e telefone são obrigatórios'
            });
        }
        
        const novoPrestador = {
            id: prestadores.length > 0 ? Math.max(...prestadores.map(p => p.id)) + 1 : 1,
            nome,
            empresa,
            servico,
            telefone,
            email: email || null,
            cnpj: cnpj || null,
            endereco: endereco || null,
            status: status || 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        prestadores.push(novoPrestador);
        
        res.status(201).json({
            success: true,
            message: 'Prestador cadastrado com sucesso',
            data: novoPrestador
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar prestador',
            error: error.message
        });
    }
});

// PUT /api/prestadores/:id - Atualizar prestador
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const prestadorIndex = prestadores.findIndex(p => p.id === id);
        
        if (prestadorIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Prestador não encontrado'
            });
        }
        
        const { nome, empresa, servico, telefone, email, cnpj, endereco, status } = req.body;
        
        prestadores[prestadorIndex] = {
            ...prestadores[prestadorIndex],
            nome: nome || prestadores[prestadorIndex].nome,
            empresa: empresa || prestadores[prestadorIndex].empresa,
            servico: servico || prestadores[prestadorIndex].servico,
            telefone: telefone || prestadores[prestadorIndex].telefone,
            email: email !== undefined ? email : prestadores[prestadorIndex].email,
            cnpj: cnpj !== undefined ? cnpj : prestadores[prestadorIndex].cnpj,
            endereco: endereco !== undefined ? endereco : prestadores[prestadorIndex].endereco,
            status: status || prestadores[prestadorIndex].status
        };
        
        res.json({
            success: true,
            message: 'Prestador atualizado com sucesso',
            data: prestadores[prestadorIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar prestador',
            error: error.message
        });
    }
});

// DELETE /api/prestadores/:id - Deletar prestador
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const prestadorIndex = prestadores.findIndex(p => p.id === id);
        
        if (prestadorIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Prestador não encontrado'
            });
        }
        
        prestadores.splice(prestadorIndex, 1);
        
        res.json({
            success: true,
            message: 'Prestador deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar prestador',
            error: error.message
        });
    }
});

module.exports = router;



