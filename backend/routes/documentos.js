// Rotas de Documentos (Unit Service)
const express = require('express');
const router = express.Router();

// Dados mockados
let documentos = [
    {
        id: 1,
        titulo: 'Regulamento Interno',
        tipo: 'regulamento',
        categoria: 'administrativo',
        descricao: 'Regulamento interno do condomínio',
        arquivo: 'regulamento-interno.pdf',
        dataUpload: '2024-01-15',
        uploadPor: 'Administrador',
        status: 'ativo',
        dataCadastro: '2024-01-15'
    }
];

// GET /api/documentos - Listar todos os documentos
router.get('/', (req, res) => {
    try {
        const { tipo, categoria, status } = req.query;
        let documentosFiltrados = [...documentos];
        
        if (tipo) {
            documentosFiltrados = documentosFiltrados.filter(d => d.tipo === tipo);
        }
        if (categoria) {
            documentosFiltrados = documentosFiltrados.filter(d => d.categoria === categoria);
        }
        if (status) {
            documentosFiltrados = documentosFiltrados.filter(d => d.status === status);
        }
        
        res.json({
            success: true,
            data: documentosFiltrados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao listar documentos',
            error: error.message
        });
    }
});

// GET /api/documentos/:id - Buscar documento por ID
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const documento = documentos.find(d => d.id === id);
        
        if (!documento) {
            return res.status(404).json({
                success: false,
                message: 'Documento não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: documento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar documento',
            error: error.message
        });
    }
});

// POST /api/documentos - Criar novo documento
router.post('/', (req, res) => {
    try {
        const { titulo, tipo, categoria, descricao, arquivo, uploadPor, status } = req.body;
        
        if (!titulo || !tipo || !categoria || !arquivo) {
            return res.status(400).json({
                success: false,
                message: 'Título, tipo, categoria e arquivo são obrigatórios'
            });
        }
        
        const novoDocumento = {
            id: documentos.length > 0 ? Math.max(...documentos.map(d => d.id)) + 1 : 1,
            titulo,
            tipo,
            categoria,
            descricao: descricao || null,
            arquivo,
            dataUpload: new Date().toISOString().split('T')[0],
            uploadPor: uploadPor || null,
            status: status || 'ativo',
            dataCadastro: new Date().toISOString().split('T')[0]
        };
        
        documentos.push(novoDocumento);
        
        res.status(201).json({
            success: true,
            message: 'Documento cadastrado com sucesso',
            data: novoDocumento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar documento',
            error: error.message
        });
    }
});

// PUT /api/documentos/:id - Atualizar documento
router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const documentoIndex = documentos.findIndex(d => d.id === id);
        
        if (documentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Documento não encontrado'
            });
        }
        
        const { titulo, tipo, categoria, descricao, arquivo, status } = req.body;
        
        documentos[documentoIndex] = {
            ...documentos[documentoIndex],
            titulo: titulo || documentos[documentoIndex].titulo,
            tipo: tipo || documentos[documentoIndex].tipo,
            categoria: categoria || documentos[documentoIndex].categoria,
            descricao: descricao !== undefined ? descricao : documentos[documentoIndex].descricao,
            arquivo: arquivo || documentos[documentoIndex].arquivo,
            status: status || documentos[documentoIndex].status
        };
        
        res.json({
            success: true,
            message: 'Documento atualizado com sucesso',
            data: documentos[documentoIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar documento',
            error: error.message
        });
    }
});

// DELETE /api/documentos/:id - Deletar documento
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const documentoIndex = documentos.findIndex(d => d.id === id);
        
        if (documentoIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Documento não encontrado'
            });
        }
        
        documentos.splice(documentoIndex, 1);
        
        res.json({
            success: true,
            message: 'Documento deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar documento',
            error: error.message
        });
    }
});

module.exports = router;



