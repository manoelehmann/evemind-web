// Rotas de Atas (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let atas = [
    {
        id: 1,
        reuniaoId: 1,
        numero: 'ATA-001',
        data: '2024-12-20',
        conteudo: 'Ata da reunião ordinária de dezembro de 2024',
        aprovada: false,
        aprovadaPor: null,
        dataAprovacao: null,
        status: 'rascunho',
        dataCadastro: '2024-12-20'
    }
];

// GET /api/atas - Listar todas as atas
router.get('/', (req, res) => {
    try {
        const { reuniaoId, status, aprovada } = req.query;
        let atasFiltradas = [...atas];
        
        if (reuniaoId) {
            atasFiltradas = atasFiltradas.filter(a => a.reuniaoId === parseInt(reuniaoId));
        }
        if (status) {
            atasFiltradas = atasFiltradas.filter(a => a.status === status);
        }
        if (aprovada !== undefined) {
            atasFiltradas = atasFiltradas.filter(a => a.aprovada === (aprovada === 'true'));
        }
        
        res.json({
            success: true,
            data: atasFiltradas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar atas',
            error: error.message
        });
    }
});

// GET /api/atas/:id - Buscar ata por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const ata = atas.find(a => a.id === id);
        
        if (!ata) {
            return res.status(404).json({
                success: false,
                message: 'Ata não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: ata
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar ata',
            error: error.message
        });
    }
});

// POST /api/atas - Criar nova ata
router.post('/', (req, res) => {
    try {
        const { reuniaoId, conteudo, status } = req.body;
        
        if (!reuniaoId || !conteudo) {
            return res.status(400).json({
                success: false,
                message: 'Reunião e conteúdo são obrigatórios'
            });
        }
        
        const numeroAta = `ATA-${String(atas.length + 1).padStart(3, '0')}`;
        
        const novaAta = {
            id: atas.length > 0 ? Math.max(...atas.map(a => a.id)) + 1 : 1,
            reuniaoId: parseInt(reuniaoId),
            numero: numeroAta,
            data: new Date().toISOString().split('T')[0],
            conteudo,
            aprovada: false,
            aprovadaPor: null,
            dataAprovacao: null,
            status: status || 'rascunho',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        atas.push(novaAta);
        
        res.status(201).json({
            success: true,
            message: 'Ata criada com sucesso',
            data: novaAta
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar ata',
            error: error.message
        });
    }
});

// PUT /api/atas/:id - Atualizar ata
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const ataIndex = atas.findIndex(a => a.id === id);
        
        if (ataIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Ata não encontrada'
            });
        }
        
        const { conteudo, aprovada, aprovadaPor, dataAprovacao, status } = req.body;
        
        atas[ataIndex] = {
            ...atas[ataIndex],
            conteudo: conteudo || atas[ataIndex].conteudo,
            aprovada: aprovada !== undefined ? aprovada : atas[ataIndex].aprovada,
            aprovadaPor: aprovadaPor || atas[ataIndex].aprovadaPor,
            dataAprovacao: dataAprovacao || atas[ataIndex].dataAprovacao,
            status: status || atas[ataIndex].status
        };
        
        res.json({
            success: true,
            message: 'Ata atualizada com sucesso',
            data: atas[ataIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar ata',
            error: error.message
        });
    }
});

// DELETE /api/atas/:id - Deletar ata
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const ataIndex = atas.findIndex(a => a.id === id);
        
        if (ataIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Ata não encontrada'
            });
        }
        
        atas.splice(ataIndex, 1);
        
        res.json({
            success: true,
            message: 'Ata deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar ata',
            error: error.message
        });
    }
});

module.exports = router;



