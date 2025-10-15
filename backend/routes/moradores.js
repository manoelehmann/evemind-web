// Rotas de Moradores
const express = require('express');
const router = express.Router();

// Dados mockados para demonstração
let moradores = [
    {
        id: 1,
        nome: "João Silva",
        apartamento: "101",
        email: "joao.silva@email.com",
        telefone: "(11) 99999-9999",
        status: "ativo",
        dataCadastro: "2024-01-15"
    },
    {
        id: 2,
        nome: "Maria Santos",
        apartamento: "202",
        email: "maria.santos@email.com",
        telefone: "(11) 88888-8888",
        status: "ativo",
        dataCadastro: "2024-01-20"
    },
    {
        id: 3,
        nome: "Pedro Oliveira",
        apartamento: "303",
        email: "pedro.oliveira@email.com",
        telefone: "(11) 77777-7777",
        status: "ativo",
        dataCadastro: "2024-02-01"
    }
];

// Listar todos os moradores
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: moradores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar moradores'
        });
    }
});

// Buscar morador por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const morador = moradores.find(m => m.id === id);
        
        if (!morador) {
            return res.status(404).json({
                success: false,
                message: 'Morador não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: morador
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar morador'
        });
    }
});

// Criar novo morador
router.post('/', (req, res) => {
    try {
        const { nome, apartamento, email, telefone } = req.body;
        
        // Validação básica
        if (!nome || !apartamento || !email || !telefone) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos são obrigatórios'
            });
        }
        
        // Verificar se apartamento já existe
        const apartamentoExistente = moradores.find(m => m.apartamento === apartamento);
        if (apartamentoExistente) {
            return res.status(400).json({
                success: false,
                message: 'Já existe um morador neste apartamento'
            });
        }
        
        // Criar novo morador
        const novoMorador = {
            id: Math.max(...moradores.map(m => m.id)) + 1,
            nome,
            apartamento,
            email,
            telefone,
            status: 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        moradores.push(novoMorador);
        
        res.status(201).json({
            success: true,
            message: 'Morador cadastrado com sucesso',
            data: novoMorador
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar morador'
        });
    }
});

// Atualizar morador
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, apartamento, email, telefone, status } = req.body;
        
        const moradorIndex = moradores.findIndex(m => m.id === id);
        if (moradorIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Morador não encontrado'
            });
        }
        
        // Atualizar dados
        moradores[moradorIndex] = {
            ...moradores[moradorIndex],
            nome: nome || moradores[moradorIndex].nome,
            apartamento: apartamento || moradores[moradorIndex].apartamento,
            email: email || moradores[moradorIndex].email,
            telefone: telefone || moradores[moradorIndex].telefone,
            status: status || moradores[moradorIndex].status
        };
        
        res.json({
            success: true,
            message: 'Morador atualizado com sucesso',
            data: moradores[moradorIndex]
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar morador'
        });
    }
});

// Deletar morador
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const moradorIndex = moradores.findIndex(m => m.id === id);
        
        if (moradorIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Morador não encontrado'
            });
        }
        
        moradores.splice(moradorIndex, 1);
        
        res.json({
            success: true,
            message: 'Morador excluído com sucesso'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao excluir morador'
        });
    }
});

module.exports = router;










