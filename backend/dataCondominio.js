// Sistema de Banco de Dados Interno - Evemind
const fs = require('fs');
const path = require('path');

class DataCondominio {
    constructor() {
        this.data = {
            moradores: [],
            avisos: [],
            reservas: [],
            ocorrencias: [],
            usuarios: [],
            empresas: [],
            permissoes: [],
            auditoria: []
        };
        
        this.dataFile = path.join(__dirname, 'data.json');
        this.loadData();
    }

    // Carregar dados do arquivo JSON (se existir)
    loadData() {
        try {
            if (fs.existsSync(this.dataFile)) {
                const fileData = fs.readFileSync(this.dataFile, 'utf8');
                this.data = JSON.parse(fileData);
                console.log('📁 Dados carregados do arquivo JSON');
            } else {
                console.log('🆕 Iniciando com dados em memória');
                this.initializeDefaultData();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error.message);
            this.initializeDefaultData();
        }
    }

    // Salvar dados no arquivo JSON
    saveData() {
        try {
            fs.writeFileSync(this.dataFile, JSON.stringify(this.data, null, 2));
            console.log('💾 Dados salvos no arquivo JSON');
        } catch (error) {
            console.error('❌ Erro ao salvar dados:', error.message);
        }
    }

    // Inicializar dados padrão
    initializeDefaultData() {
        this.data = {
            moradores: [
                {
                    id: 1,
                    nome: 'João Silva',
                    apartamento: '101',
                    bloco: 'A',
                    telefone: '(11) 99999-9999',
                    email: 'joao@email.com',
                    dataEntrada: '2023-01-15',
                    ativo: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            avisos: [
                {
                    id: 1,
                    titulo: 'Manutenção do Elevador',
                    conteudo: 'O elevador do bloco A passará por manutenção preventiva no dia 15/12/2023.',
                    dataInicio: '2023-12-10',
                    dataFim: '2023-12-20',
                    prioridade: 'alta',
                    ativo: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            reservas: [
                {
                    id: 1,
                    moradorId: 1,
                    espaco: 'Salão de Festas',
                    dataReserva: '2023-12-25',
                    horarioInicio: '19:00',
                    horarioFim: '23:00',
                    status: 'confirmada',
                    observacoes: 'Festa de Natal',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            ocorrencias: [
                {
                    id: 1,
                    moradorId: 1,
                    tipo: 'manutencao',
                    descricao: 'Vazamento no banheiro',
                    prioridade: 'alta',
                    status: 'aberta',
                    dataOcorrencia: '2023-12-01',
                    dataResolucao: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            usuarios: [
                {
                    id: 1,
                    nome: 'Administrador',
                    email: 'admin@evemind.com',
                    senha: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                    tipo: 'admin',
                    ativo: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            empresas: [
                {
                    id: 1,
                    nome: 'Empresa de Limpeza ABC',
                    cnpj: '12.345.678/0001-90',
                    telefone: '(11) 3333-4444',
                    email: 'contato@empresaabc.com',
                    servico: 'Limpeza',
                    ativo: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            permissoes: [
                {
                    id: 1,
                    nome: 'Gerenciar Moradores',
                    codigo: 'MORADORES_CRUD',
                    descricao: 'Permite criar, editar e excluir moradores',
                    ativo: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ],
            auditoria: [
                {
                    id: 1,
                    usuarioId: 1,
                    acao: 'CREATE',
                    tabela: 'moradores',
                    registroId: 1,
                    dadosAntigos: null,
                    dadosNovos: '{"nome":"João Silva","apartamento":"101"}',
                    ip: '127.0.0.1',
                    userAgent: 'Mozilla/5.0...',
                    createdAt: new Date().toISOString()
                }
            ]
        };
        this.saveData();
    }

    // Gerar ID único
    generateId(table) {
        const maxId = this.data[table].reduce((max, item) => 
            item.id > max ? item.id : max, 0
        );
        return maxId + 1;
    }

    // ========== OPERAÇÕES CRUD GENÉRICAS ==========

    // CREATE - Inserir novo registro
    create(table, data) {
        try {
            if (!this.data[table]) {
                throw new Error(`Tabela '${table}' não existe`);
            }

            const newRecord = {
                id: this.generateId(table),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            this.data[table].push(newRecord);
            this.saveData();
            
            // Registrar na auditoria
            this.audit('CREATE', table, newRecord.id, null, newRecord);
            
            return {
                success: true,
                data: newRecord,
                message: `Registro criado com sucesso na tabela ${table}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao criar registro na tabela ${table}`
            };
        }
    }

    // READ - Listar registros
    read(table, filters = {}) {
        try {
            if (!this.data[table]) {
                throw new Error(`Tabela '${table}' não existe`);
            }

            let records = [...this.data[table]];

            // Aplicar filtros
            if (Object.keys(filters).length > 0) {
                records = records.filter(record => {
                    return Object.entries(filters).every(([key, value]) => {
                        if (typeof value === 'string') {
                            return record[key] && record[key].toString().toLowerCase().includes(value.toLowerCase());
                        }
                        return record[key] === value;
                    });
                });
            }

            return {
                success: true,
                data: records,
                total: records.length,
                message: `${records.length} registro(s) encontrado(s) na tabela ${table}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao ler registros da tabela ${table}`
            };
        }
    }

    // READ BY ID - Buscar registro por ID
    readById(table, id) {
        try {
            if (!this.data[table]) {
                throw new Error(`Tabela '${table}' não existe`);
            }

            const record = this.data[table].find(item => item.id === parseInt(id));
            
            if (!record) {
                return {
                    success: false,
                    error: 'Registro não encontrado',
                    message: `Registro com ID ${id} não encontrado na tabela ${table}`
                };
            }

            return {
                success: true,
                data: record,
                message: `Registro encontrado na tabela ${table}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao buscar registro na tabela ${table}`
            };
        }
    }

    // UPDATE - Atualizar registro
    update(table, id, data) {
        try {
            if (!this.data[table]) {
                throw new Error(`Tabela '${table}' não existe`);
            }

            const index = this.data[table].findIndex(item => item.id === parseInt(id));
            
            if (index === -1) {
                return {
                    success: false,
                    error: 'Registro não encontrado',
                    message: `Registro com ID ${id} não encontrado na tabela ${table}`
                };
            }

            const oldRecord = { ...this.data[table][index] };
            
            this.data[table][index] = {
                ...this.data[table][index],
                ...data,
                updatedAt: new Date().toISOString()
            };

            this.saveData();
            
            // Registrar na auditoria
            this.audit('UPDATE', table, id, oldRecord, this.data[table][index]);
            
            return {
                success: true,
                data: this.data[table][index],
                message: `Registro atualizado com sucesso na tabela ${table}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao atualizar registro na tabela ${table}`
            };
        }
    }

    // DELETE - Excluir registro
    delete(table, id) {
        try {
            if (!this.data[table]) {
                throw new Error(`Tabela '${table}' não existe`);
            }

            const index = this.data[table].findIndex(item => item.id === parseInt(id));
            
            if (index === -1) {
                return {
                    success: false,
                    error: 'Registro não encontrado',
                    message: `Registro com ID ${id} não encontrado na tabela ${table}`
                };
            }

            const deletedRecord = this.data[table][index];
            this.data[table].splice(index, 1);
            this.saveData();
            
            // Registrar na auditoria
            this.audit('DELETE', table, id, deletedRecord, null);
            
            return {
                success: true,
                data: deletedRecord,
                message: `Registro excluído com sucesso da tabela ${table}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao excluir registro da tabela ${table}`
            };
        }
    }

    // ========== OPERAÇÕES ESPECÍFICAS ==========

    // Buscar com paginação
    readPaginated(table, page = 1, limit = 10, filters = {}) {
        try {
            const result = this.read(table, filters);
            
            if (!result.success) {
                return result;
            }

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedData = result.data.slice(startIndex, endIndex);

            return {
                success: true,
                data: paginatedData,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: result.data.length,
                    totalPages: Math.ceil(result.data.length / limit),
                    hasNext: endIndex < result.data.length,
                    hasPrev: page > 1
                },
                message: `Página ${page} de ${Math.ceil(result.data.length / limit)} da tabela ${table}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao paginar registros da tabela ${table}`
            };
        }
    }

    // Contar registros
    count(table, filters = {}) {
        try {
            const result = this.read(table, filters);
            return {
                success: result.success,
                count: result.data.length,
                message: result.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                count: 0,
                message: `Erro ao contar registros da tabela ${table}`
            };
        }
    }

    // Buscar por campo específico
    findByField(table, field, value) {
        try {
            if (!this.data[table]) {
                throw new Error(`Tabela '${table}' não existe`);
            }

            const records = this.data[table].filter(item => {
                if (typeof value === 'string') {
                    return item[field] && item[field].toString().toLowerCase().includes(value.toLowerCase());
                }
                return item[field] === value;
            });

            return {
                success: true,
                data: records,
                total: records.length,
                message: `${records.length} registro(s) encontrado(s) com ${field} = ${value}`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: `Erro ao buscar por ${field} na tabela ${table}`
            };
        }
    }

    // ========== AUDITORIA ==========

    audit(action, table, recordId, oldData, newData) {
        try {
            const auditRecord = {
                id: this.generateId('auditoria'),
                usuarioId: 1, // TODO: Pegar do contexto da requisição
                acao: action,
                tabela: table,
                registroId: recordId,
                dadosAntigos: oldData ? JSON.stringify(oldData) : null,
                dadosNovos: newData ? JSON.stringify(newData) : null,
                ip: '127.0.0.1', // TODO: Pegar do contexto da requisição
                userAgent: 'Sistema Interno',
                createdAt: new Date().toISOString()
            };

            this.data.auditoria.push(auditRecord);
            this.saveData();
        } catch (error) {
            console.error('Erro ao registrar auditoria:', error.message);
        }
    }

    // ========== UTILITÁRIOS ==========

    // Listar todas as tabelas disponíveis
    getTables() {
        return {
            success: true,
            data: Object.keys(this.data),
            message: 'Tabelas disponíveis no sistema'
        };
    }

    // Obter estatísticas do sistema
    getStats() {
        try {
            const stats = {};
            Object.keys(this.data).forEach(table => {
                stats[table] = this.data[table].length;
            });

            return {
                success: true,
                data: stats,
                message: 'Estatísticas do sistema'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Erro ao obter estatísticas'
            };
        }
    }

    // Limpar todos os dados (CUIDADO!)
    clearAllData() {
        try {
            Object.keys(this.data).forEach(table => {
                this.data[table] = [];
            });
            this.saveData();
            
            return {
                success: true,
                message: 'Todos os dados foram limpos'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Erro ao limpar dados'
            };
        }
    }

    // Fazer backup dos dados
    backup() {
        try {
            const backupFile = path.join(__dirname, `backup_${Date.now()}.json`);
            fs.writeFileSync(backupFile, JSON.stringify(this.data, null, 2));
            
            return {
                success: true,
                data: { backupFile },
                message: 'Backup criado com sucesso'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Erro ao criar backup'
            };
        }
    }
}

// Instância singleton do banco de dados
const dataCondominio = new DataCondominio();

module.exports = dataCondominio;

