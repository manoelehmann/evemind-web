// Rotas de Ocorrências
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ocorrências
 *   description: Gestão de ocorrências
 */

/**
 * @swagger
 * /ocorrencias:
 *   get:
 *     tags: [Ocorrências]
 *     summary: Lista ocorrências
 *   post:
 *     tags: [Ocorrências]
 *     summary: Cria ocorrência
 *
 * /ocorrencias/{id}:
 *   get:
 *     tags: [Ocorrências]
 *     summary: Obtém ocorrência
 *   put:
 *     tags: [Ocorrências]
 *     summary: Atualiza ocorrência
 *   delete:
 *     tags: [Ocorrências]
 *     summary: Remove ocorrência
 */


// Dados mockados para demonstração
let ocorrencias = [
    {
        id: 1,
        tipo: "barulho",
        descricao: "Barulho excessivo no apartamento 101 durante a madrugada",
        morador: "Maria Santos",
        moradorId: 2,
        data: "2024-12-10",
        status: "pendente",
        dataRegistro: "2024-12-10"
    }
];

// Tipos de ocorrência disponíveis
const tiposOcorrencia = {
    'barulho': 'Barulho',
    'limpeza': 'Limpeza',
    'seguranca': 'Segurança',
    'outros': 'Outros'
};

// Listar todas as ocorrências
router.get('/', (req, res) => {
    try {
        const { tipo, status, moradorId } = req.query;
        let ocorrenciasFiltradas = [...ocorrencias];
        
        // Filtrar por tipo
        if (tipo) {
            ocorrenciasFiltradas = ocorrenciasFiltradas.filter(o => o.tipo === tipo);
        }
        
        // Filtrar por status
        if (status) {
            ocorrenciasFiltradas = ocorrenciasFiltradas.filter(o => o.status === status);
        }
        
        // Filtrar por morador
        if (moradorId) {
            ocorrenciasFiltradas = ocorrenciasFiltradas.filter(o => o.moradorId === parseInt(moradorId));
        }
        
        res.json({
            success: true,
            data: ocorrenciasFiltradas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar ocorrências'
        });
    }
});

// Buscar ocorrência por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const ocorrencia = ocorrencias.find(o => o.id === id);
        
        if (!ocorrencia) {
            return res.status(404).json({
                success: false,
                message: 'Ocorrência não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: ocorrencia
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar ocorrência'
        });
    }
});

// Criar nova ocorrência
router.post('/', (req, res) => {
    try {
        const { tipo, descricao, moradorId } = req.body;
        
        // Validação básica
        if (!tipo || !descricao || !moradorId) {
            return res.status(400).json({
                success: false,
                message: 'Tipo, descrição e morador são obrigatórios'
            });
        }
        
        // Validar tipo
        if (!tiposOcorrencia[tipo]) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de ocorrência inválido'
            });
        }
        
        // Buscar dados do morador (simulado)
        const morador = { id: moradorId, nome: `Morador ${moradorId}` };
        
        // Criar nova ocorrência
        const novaOcorrencia = {
            id: Math.max(...ocorrencias.map(o => o.id)) + 1,
            tipo,
            descricao,
            morador: morador.nome,
            moradorId: parseInt(moradorId),
            data: new Date().toISOString().split('T')[0],
            status: 'pendente',
            dataRegistro: new Date().toISOString().split('T')[0]
        };
        
        ocorrencias.push(novaOcorrencia);
        
        res.status(201).json({
            success: true,
            message: 'Ocorrência registrada com sucesso',
            data: novaOcorrencia
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao registrar ocorrência'
        });
    }
});

// Atualizar ocorrência
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { tipo, descricao, moradorId, status } = req.body;
        
        const ocorrenciaIndex = ocorrencias.findIndex(o => o.id === id);
        if (ocorrenciaIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Ocorrência não encontrada'
            });
        }
        
        // Atualizar dados
        ocorrencias[ocorrenciaIndex] = {
            ...ocorrencias[ocorrenciaIndex],
            tipo: tipo || ocorrencias[ocorrenciaIndex].tipo,
            descricao: descricao || ocorrencias[ocorrenciaIndex].descricao,
            moradorId: moradorId || ocorrencias[ocorrenciaIndex].moradorId,
            status: status || ocorrencias[ocorrenciaIndex].status
        };
        
        res.json({
            success: true,
            message: 'Ocorrência atualizada com sucesso',
            data: ocorrencias[ocorrenciaIndex]
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar ocorrência'
        });
    }
});

// Deletar ocorrência
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const ocorrenciaIndex = ocorrencias.findIndex(o => o.id === id);
        
        if (ocorrenciaIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Ocorrência não encontrada'
            });
        }
        
        ocorrencias.splice(ocorrenciaIndex, 1);
        
        res.json({
            success: true,
            message: 'Ocorrência excluída com sucesso'
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao excluir ocorrência'
        });
    }
});

// Listar tipos de ocorrência disponíveis
router.get('/tipos/disponiveis', (req, res) => {
    try {
        res.json({
            success: true,
            data: tiposOcorrencia
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar tipos de ocorrência'
        });
    }
});

module.exports = router;










