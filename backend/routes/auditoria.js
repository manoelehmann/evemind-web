const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auditoria
 *   description: Logs de auditoria
 */

/**
 * @swagger
 * /auditoria:
 *   get:
 *     tags: [Auditoria]
 *     summary: Lista os logs de auditoria
 *
 *   post:
 *     tags: [Auditoria]
 *     summary: Registra um log
 */

/**
 * @swagger
 * /auditoria/{id}:
 *   get:
 *     tags: [Auditoria]
 *     summary: Obtém log pelo ID
 */


// Simulação de dados em memória (em produção, usar banco de dados)
let logs = [
    {
        id: 1,
        dataHora: '2024-01-15 10:30:00',
        usuario: 'admin@condominio.com',
        acao: 'Login',
        tabela: 'Usuarios',
        registro: 'ID: 1',
        ip: '192.168.1.100',
        detalhes: 'Login realizado com sucesso'
    },
    {
        id: 2,
        dataHora: '2024-01-15 10:35:00',
        usuario: 'admin@condominio.com',
        acao: 'Criação',
        tabela: 'moradores',
        registro: 'ID: 5',
        ip: '192.168.1.100',
        detalhes: 'Novo morador cadastrado: João Silva'
    },
    {
        id: 3,
        dataHora: '2024-01-15 10:40:00',
        usuario: 'admin@condominio.com',
        acao: 'Atualização',
        tabela: 'avisos',
        registro: 'ID: 3',
        ip: '192.168.1.100',
        detalhes: 'Aviso atualizado: Manutenção do elevador'
    },
    {
        id: 4,
        dataHora: '2024-01-15 11:00:00',
        usuario: 'sindico@condominio.com',
        acao: 'Criação',
        tabela: 'reservas',
        registro: 'ID: 8',
        ip: '192.168.1.101',
        detalhes: 'Nova reserva criada: Salão de festas'
    },
    {
        id: 5,
        dataHora: '2024-01-15 11:15:00',
        usuario: 'porteiro@condominio.com',
        acao: 'Criação',
        tabela: 'visitantes',
        registro: 'ID: 12',
        ip: '192.168.1.102',
        detalhes: 'Visitante registrado: Maria Santos'
    },
    {
        id: 6,
        dataHora: '2024-01-15 11:30:00',
        usuario: 'admin@condominio.com',
        acao: 'Deletando',
        tabela: 'ocorrencias',
        registro: 'ID: 2',
        ip: '192.168.1.100',
        detalhes: 'Ocorrência removida: Barulho excessivo'
    },
    {
        id: 7,
        dataHora: '2024-01-15 12:00:00',
        usuario: 'admin@condominio.com',
        acao: 'Deslogando',
        tabela: 'Usuarios',
        registro: 'ID: 1',
        ip: '192.168.1.100',
        detalhes: 'Logout realizado'
    }
];

// GET /api/auditoria - Listar todos os logs
router.get('/', (req, res) => {
    try {
        const { page = 1, limit = 50, usuario, acao, tabela, dataInicio, dataFim } = req.query;
        
        let logsFiltrados = [...logs];
        
        // Aplicar filtros
        if (usuario) {
            logsFiltrados = logsFiltrados.filter(log => 
                log.usuario.toLowerCase().includes(usuario.toLowerCase())
            );
        }
        
        if (acao) {
            logsFiltrados = logsFiltrados.filter(log => 
                log.acao.toLowerCase().includes(acao.toLowerCase())
            );
        }
        
        if (tabela) {
            logsFiltrados = logsFiltrados.filter(log => 
                log.tabela.toLowerCase().includes(tabela.toLowerCase())
            );
        }
        
        if (dataInicio) {
            logsFiltrados = logsFiltrados.filter(log => 
                log.dataHora >= dataInicio
            );
        }
        
        if (dataFim) {
            logsFiltrados = logsFiltrados.filter(log => 
                log.dataHora <= dataFim
            );
        }
        
        // Ordenar por data mais recente
        logsFiltrados.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
        
        // Paginação
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const logsPaginados = logsFiltrados.slice(startIndex, endIndex);
        
        res.json({
            success: true,
            data: logsPaginados,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: logsFiltrados.length,
                pages: Math.ceil(logsFiltrados.length / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar logs de auditoria',
            error: error.message
        });
    }
});

// GET /api/auditoria/export - Exportar logs
router.get('/export', (req, res) => {
    try {
        const { formato = 'json' } = req.query;
        
        if (formato === 'csv') {
            // Gerar CSV
            const csvHeader = 'ID,Data/Hora,Usuário,Ação,Tabela,Registro,IP,Detalhes\n';
            const csvData = logs.map(log => 
                `${log.id},"${log.dataHora}","${log.usuario}","${log.acao}","${log.tabela}","${log.registro}","${log.ip}","${log.detalhes}"`
            ).join('\n');
            
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=auditoria.csv');
            res.send(csvHeader + csvData);
        } else {
            // Retornar JSON
            res.json({
                success: true,
                data: logs,
                exportadoEm: new Date().toISOString()
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao exportar logs',
            error: error.message
        });
    }
});

// POST /api/auditoria - Criar novo log (usado internamente pelo sistema)
router.post('/', (req, res) => {
    try {
        const { usuario, acao, tabela, registro, ip, detalhes } = req.body;
        
        const novoLog = {
            id: logs.length + 1,
            dataHora: new Date().toISOString().replace('T', ' ').substring(0, 19),
            usuario: usuario || 'Sistema',
            acao: acao || 'UNKNOWN',
            tabela: tabela || 'N/A',
            registro: registro || 'N/A',
            ip: ip || '127.0.0.1',
            detalhes: detalhes || 'Ação realizada'
        };
        
        logs.unshift(novoLog); // Adicionar no início para manter ordem cronológica
        
        res.status(201).json({
            success: true,
            message: 'Log criado com sucesso',
            data: novoLog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao criar log',
            error: error.message
        });
    }
});

// GET /api/auditoria/stats - Estatísticas de auditoria
router.get('/stats', (req, res) => {
    try {
        const hoje = new Date().toISOString().split('T')[0];
        const logsHoje = logs.filter(log => log.dataHora.startsWith(hoje));
        
        const stats = {
            totalLogs: logs.length,
            logsHoje: logsHoje.length,
            usuariosUnicos: [...new Set(logs.map(log => log.usuario))].length,
            acoesMaisComuns: getAcoesMaisComuns(logs),
            tabelasMaisAcessadas: getTabelasMaisAcessadas(logs)
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estatísticas',
            error: error.message
        });
    }
});

// Funções auxiliares
function getAcoesMaisComuns(logs) {
    const acoes = {};
    logs.forEach(log => {
        acoes[log.acao] = (acoes[log.acao] || 0) + 1;
    });
    
    return Object.entries(acoes)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([acao, count]) => ({ acao, count }));
}

function getTabelasMaisAcessadas(logs) {
    const tabelas = {};
    logs.forEach(log => {
        tabelas[log.tabela] = (tabelas[log.tabela] || 0) + 1;
    });
    
    return Object.entries(tabelas)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([tabela, count]) => ({ tabela, count }));
}

module.exports = router;

