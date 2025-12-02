// Rotas de Quadro de Avisos (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let quadroAvisos = [
    {
        id: 1,
        titulo: 'Regulamento da Piscina',
        descricao: 'Horários de funcionamento: 6h às 22h. Uso obrigatório de touca.',
        categoria: 'regulamento',
        dataInicio: '2024-12-01',
        dataFim: '2024-12-31',
        status: 'ativo',
        dataCadastro: '2024-12-01'
    }
];

// GET /api/quadro-avisos - Listar todos os avisos do quadro
router.get('/', (req, res) => {
    try {
        const { categoria, status, dataInicio, dataFim } = req.query;
        let avisosFiltrados = [...quadroAvisos];
        
        if (categoria) {
            avisosFiltrados = avisosFiltrados.filter(a => a.categoria === categoria);
        }
        if (status) {
            avisosFiltrados = avisosFiltrados.filter(a => a.status === status);
        }
        if (dataInicio) {
            avisosFiltrados = avisosFiltrados.filter(a => a.dataInicio >= dataInicio);
        }
        if (dataFim) {
            avisosFiltrados = avisosFiltrados.filter(a => a.dataFim <= dataFim);
        }
        
        res.json({
            success: true,
            data: avisosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar avisos do quadro',
            error: error.message
        });
    }
});

// GET /api/quadro-avisos/:id - Buscar aviso por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const aviso = quadroAvisos.find(a => a.id === id);
        
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
            message: 'Erro ao buscar aviso',
            error: error.message
        });
    }
});

// POST /api/quadro-avisos - Criar novo aviso
router.post('/', (req, res) => {
    try {
        const { titulo, descricao, categoria, dataInicio, dataFim, status } = req.body;
        
        if (!titulo || !descricao || !categoria || !dataInicio || !dataFim) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }
        
        const novoAviso = {
            id: quadroAvisos.length > 0 ? Math.max(...quadroAvisos.map(a => a.id)) + 1 : 1,
            titulo,
            descricao,
            categoria,
            dataInicio,
            dataFim,
            status: status || 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        quadroAvisos.push(novoAviso);
        
        res.status(201).json({
            success: true,
            message: 'Aviso do quadro publicado com sucesso',
            data: novoAviso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao publicar aviso do quadro',
            error: error.message
        });
    }
});

// PUT /api/quadro-avisos/:id - Atualizar aviso
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const avisoIndex = quadroAvisos.findIndex(a => a.id === id);
        
        if (avisoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Aviso não encontrado'
            });
        }
        
        const { titulo, descricao, categoria, dataInicio, dataFim, status } = req.body;
        
        quadroAvisos[avisoIndex] = {
            ...quadroAvisos[avisoIndex],
            titulo: titulo || quadroAvisos[avisoIndex].titulo,
            descricao: descricao || quadroAvisos[avisoIndex].descricao,
            categoria: categoria || quadroAvisos[avisoIndex].categoria,
            dataInicio: dataInicio || quadroAvisos[avisoIndex].dataInicio,
            dataFim: dataFim || quadroAvisos[avisoIndex].dataFim,
            status: status || quadroAvisos[avisoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Aviso atualizado com sucesso',
            data: quadroAvisos[avisoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar aviso',
            error: error.message
        });
    }
});

// DELETE /api/quadro-avisos/:id - Deletar aviso
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const avisoIndex = quadroAvisos.findIndex(a => a.id === id);
        
        if (avisoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Aviso não encontrado'
            });
        }
        
        quadroAvisos.splice(avisoIndex, 1);
        
        res.json({
            success: true,
            message: 'Aviso deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar aviso',
            error: error.message
        });
    }
});

module.exports = router;



