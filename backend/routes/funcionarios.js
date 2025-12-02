// Rotas de Funcionários (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let funcionarios = [
    {
        id: 1,
        nome: 'José da Silva',
        cargo: 'Zelador',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-3333',
        email: 'jose@condominio.com',
        dataAdmissao: '2024-01-01',
        salario: 2500.00,
        status: 'ativo',
        dataCadastro: '2024-01-01'
    }
];

// GET /api/funcionarios - Listar todos os funcionários
router.get('/', (req, res) => {
    try {
        const { cargo, status } = req.query;
        let funcionariosFiltrados = [...funcionarios];
        
        if (cargo) {
            funcionariosFiltrados = funcionariosFiltrados.filter(f => f.cargo === cargo);
        }
        if (status) {
            funcionariosFiltrados = funcionariosFiltrados.filter(f => f.status === status);
        }
        
        res.json({
            success: true,
            data: funcionariosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar funcionários',
            error: error.message
        });
    }
});

// GET /api/funcionarios/:id - Buscar funcionário por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcionario = funcionarios.find(f => f.id === id);
        
        if (!funcionario) {
            return res.status(404).json({
                success: false,
                message: 'Funcionário não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: funcionario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar funcionário',
            error: error.message
        });
    }
});

// POST /api/funcionarios - Criar novo funcionário
router.post('/', (req, res) => {
    try {
        const { nome, cargo, cpf, telefone, email, dataAdmissao, salario, status } = req.body;
        
        if (!nome || !cargo || !cpf || !telefone || !dataAdmissao) {
            return res.status(400).json({
                success: false,
                message: 'Nome, cargo, CPF, telefone e data de admissão são obrigatórios'
            });
        }
        
        const novoFuncionario = {
            id: funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1,
            nome,
            cargo,
            cpf,
            telefone,
            email: email || null,
            dataAdmissao,
            salario: salario ? parseFloat(salario) : null,
            status: status || 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        funcionarios.push(novoFuncionario);
        
        res.status(201).json({
            success: true,
            message: 'Funcionário cadastrado com sucesso',
            data: novoFuncionario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar funcionário',
            error: error.message
        });
    }
});

// PUT /api/funcionarios/:id - Atualizar funcionário
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcionarioIndex = funcionarios.findIndex(f => f.id === id);
        
        if (funcionarioIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Funcionário não encontrado'
            });
        }
        
        const { nome, cargo, cpf, telefone, email, dataAdmissao, salario, status } = req.body;
        
        funcionarios[funcionarioIndex] = {
            ...funcionarios[funcionarioIndex],
            nome: nome || funcionarios[funcionarioIndex].nome,
            cargo: cargo || funcionarios[funcionarioIndex].cargo,
            cpf: cpf || funcionarios[funcionarioIndex].cpf,
            telefone: telefone || funcionarios[funcionarioIndex].telefone,
            email: email !== undefined ? email : funcionarios[funcionarioIndex].email,
            dataAdmissao: dataAdmissao || funcionarios[funcionarioIndex].dataAdmissao,
            salario: salario ? parseFloat(salario) : funcionarios[funcionarioIndex].salario,
            status: status || funcionarios[funcionarioIndex].status
        };
        
        res.json({
            success: true,
            message: 'Funcionário atualizado com sucesso',
            data: funcionarios[funcionarioIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar funcionário',
            error: error.message
        });
    }
});

// DELETE /api/funcionarios/:id - Deletar funcionário
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const funcionarioIndex = funcionarios.findIndex(f => f.id === id);
        
        if (funcionarioIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Funcionário não encontrado'
            });
        }
        
        funcionarios.splice(funcionarioIndex, 1);
        
        res.json({
            success: true,
            message: 'Funcionário deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar funcionário',
            error: error.message
        });
    }
});

module.exports = router;



