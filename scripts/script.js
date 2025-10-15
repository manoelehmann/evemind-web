// Sistema de Condomínio Evemind
class CondominioSystem {
    constructor() {
        this.currentUser = null;
        this.editingId = null;
        this.editingType = null;
        this.data = {
            moradores: [
                {
                    id: 1,
                    nome: "João Silva",
                    apartamento: "101",
                    email: "joao.silva@email.com",
                    telefone: "(11) 99999-9999",
                    status: "ativo"
                },
                {
                    id: 2,
                    nome: "Maria Santos",
                    apartamento: "202",
                    email: "maria.santos@email.com",
                    telefone: "(11) 88888-8888",
                    status: "ativo"
                },
                {
                    id: 3,
                    nome: "Pedro Oliveira",
                    apartamento: "303",
                    email: "pedro.oliveira@email.com",
                    telefone: "(11) 77777-7777",
                    status: "ativo"
                }
            ],
            avisos: [
                {
                    id: 1,
                    titulo: "Manutenção do Elevador",
                    descricao: "O elevador social passará por manutenção preventiva no dia 15/12/2024 das 8h às 12h.",
                    prioridade: "alta",
                    data: "2024-12-10",
                    ativo: true
                },
                {
                    id: 2,
                    titulo: "Reunião de Condomínio",
                    descricao: "Reunião ordinária do condomínio será realizada no dia 20/12/2024 às 19h no salão de festas.",
                    prioridade: "media",
                    data: "2024-12-12",
                    ativo: true
                }
            ],
            reservas: [
                {
                    id: 1,
                    area: "salao-festas",
                    morador: "João Silva",
                    moradorId: 1,
                    data: "2024-12-15",
                    horario: "19:00",
                    status: "confirmada"
                },
                {
                    id: 2,
                    area: "churrasqueira",
                    morador: "Maria Santos",
                    moradorId: 2,
                    data: "2024-12-16",
                    horario: "14:00",
                    status: "confirmada"
                }
            ],
            ocorrencias: [
                {
                    id: 1,
                    tipo: "barulho",
                    descricao: "Barulho excessivo no apartamento 101 durante a madrugada",
                    morador: "Maria Santos",
                    moradorId: 2,
                    data: "2024-12-10",
                    status: "pendente"
                }
            ],
            unidades: [
                {
                    id: 1,
                    numero: "101",
                    bloco: "A",
                    andar: 1,
                    tipo: "apartamento",
                    moradorPrincipal: "João Silva",
                    moradorId: 1,
                    status: "ocupada"
                },
                {
                    id: 2,
                    numero: "202",
                    bloco: "A",
                    andar: 2,
                    tipo: "apartamento",
                    moradorPrincipal: "Maria Santos",
                    moradorId: 2,
                    status: "ocupada"
                }
            ],
            prestadores: [
                {
                    id: 1,
                    nome: "Carlos Silva",
                    empresa: "Limpeza Total",
                    servico: "limpeza",
                    telefone: "(11) 99999-1111",
                    email: "carlos@limpezatotal.com",
                    status: "ativo"
                },
                {
                    id: 2,
                    nome: "Ana Costa",
                    empresa: "Manutenção Express",
                    servico: "manutencao",
                    telefone: "(11) 88888-2222",
                    email: "ana@manutencao.com",
                    status: "ativo"
                }
            ],
            ordensServico: [
                {
                    id: 1,
                    numero: "OS-001",
                    tipo: "manutencao",
                    descricao: "Manutenção do elevador social",
                    unidade: "101",
                    prestador: "Ana Costa",
                    prestadorId: 2,
                    data: "2024-12-15",
                    status: "em_andamento"
                }
            ],
            visitantes: [
                {
                    id: 1,
                    nome: "Roberto Lima",
                    documento: "123.456.789-00",
                    unidade: "101",
                    dataEntrada: "2024-12-10T14:30",
                    dataSaida: "2024-12-10T16:45",
                    status: "saido"
                }
            ],
            patrimonio: [
                {
                    id: 1,
                    codigo: "PAT-001",
                    descricao: "Elevador Social",
                    categoria: "equipamento",
                    localizacao: "Hall Principal",
                    valor: 150000.00,
                    status: "ativo"
                },
                {
                    id: 2,
                    codigo: "PAT-002",
                    descricao: "Sofá do Salão",
                    categoria: "mobiliario",
                    localizacao: "Salão de Festas",
                    valor: 5000.00,
                    status: "ativo"
                }
            ],
            quadroAvisos: [
                {
                    id: 1,
                    titulo: "Regulamento da Piscina",
                    descricao: "Horários de funcionamento: 6h às 22h. Uso obrigatório de touca.",
                    categoria: "regulamento",
                    dataInicio: "2024-12-01",
                    dataFim: "2024-12-31",
                    status: "ativo"
                }
            ],
            emails: [
                {
                    id: 1,
                    assunto: "Reunião de Condomínio",
                    destinatario: "todos",
                    conteudo: "Convocamos todos os moradores para a reunião ordinária...",
                    prioridade: "normal",
                    dataEnvio: "2024-12-10",
                    status: "enviado"
                }
            ],
            usuarios: [
                {
                    id: 1,
                    nome: "Administrador",
                    email: "admin@condominio.com",
                    funcao: "admin",
                    empresa: "Condomínio Residencial Jardim",
                    status: "ativo",
                    ultimoAcesso: "2024-12-10 10:30"
                }
            ],
            permissoes: [
                {
                    id: 1,
                    funcao: "admin",
                    modulo: "moradores",
                    permissoes: ["visualizar", "criar", "editar", "excluir"],
                    status: "ativo"
                },
                {
                    id: 2,
                    funcao: "sindico",
                    modulo: "avisos",
                    permissoes: ["visualizar", "criar", "editar"],
                    status: "ativo"
                }
            ],
            empresas: [
                {
                    id: 1,
                    nome: "Condomínio Residencial Jardim",
                    cnpj: "12.345.678/0001-90",
                    endereco: "Rua das Flores, 123",
                    telefone: "(11) 3333-4444",
                    email: "contato@condominio.com",
                    responsavel: "João Silva",
                    status: "ativo"
                }
            ],
            auditoria: [
                {
                    id: 1,
                    dataHora: "2024-12-10 10:30:00",
                    usuario: "admin@condominio.com",
                    acao: "CREATE",
                    tabela: "moradores",
                    registro: "João Silva - Apt 101",
                    ip: "192.168.1.100"
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Menu navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.navigateToSection(e.currentTarget.dataset.section);
            });
        });

        // Modal forms
        document.getElementById('moradorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleMoradorSubmit();
        });

        document.getElementById('avisoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAvisoSubmit();
        });

        document.getElementById('reservaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReservaSubmit();
        });

        document.getElementById('ocorrenciaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleOcorrenciaSubmit();
        });

        // Novos formulários
        document.getElementById('unidadeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUnidadeSubmit();
        });

        document.getElementById('prestadorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePrestadorSubmit();
        });

        document.getElementById('ordemServicoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleOrdemServicoSubmit();
        });

        document.getElementById('visitanteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleVisitanteSubmit();
        });

        document.getElementById('patrimonioForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePatrimonioSubmit();
        });

        document.getElementById('quadroAvisoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleQuadroAvisoSubmit();
        });

        document.getElementById('emailForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEmailSubmit();
        });

        document.getElementById('usuarioForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUsuarioSubmit();
        });

        document.getElementById('permissaoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePermissaoSubmit();
        });

        document.getElementById('empresaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEmpresaSubmit();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Modal overlay click
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') {
                this.closeModal();
            }
        });
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulação de login (dados hardcoded)
        if (email === 'admin@condominio.com' && password === 'senha123') {
            this.currentUser = { email, name: 'Administrador' };
            this.showMainApp();
            this.loadData();
        } else {
            alert('Credenciais inválidas! Use: admin@condominio.com / senha123');
        }
    }

    handleLogout() {
        this.currentUser = null;
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
        document.getElementById('loginForm').reset();
    }

    showMainApp() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'flex';
    }

    navigateToSection(section) {
        // Update active menu item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Show section
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');

        // Load section data
        this.loadSectionData(section);
    }

    loadData() {
        this.updateStats();
        this.loadSectionData('dashboard');
    }

    loadSectionData(section) {
        switch(section) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'moradores':
                this.loadMoradores();
                break;
            case 'unidades':
                this.loadUnidades();
                break;
            case 'prestadores':
                this.loadPrestadores();
                break;
            case 'avisos':
                this.loadAvisos();
                break;
            case 'reservas':
                this.loadReservas();
                break;
            case 'ordem-servico':
                this.loadOrdemServico();
                break;
            case 'visitantes':
                this.loadVisitantes();
                break;
            case 'patrimonio':
                this.loadPatrimonio();
                break;
            case 'quadro-avisos':
                this.loadQuadroAvisos();
                break;
            case 'emails':
                this.loadEmails();
                break;
            case 'ocorrencias':
                this.loadOcorrencias();
                break;
            case 'auditoria':
                this.loadAuditoria();
                break;
            case 'usuarios':
                this.loadUsuarios();
                break;
            case 'permissoes':
                this.loadPermissoes();
                break;
            case 'empresas':
                this.loadEmpresas();
                break;
        }
    }

    updateStats() {
        document.getElementById('totalMoradores').textContent = this.data.moradores.length;
        document.getElementById('totalAvisos').textContent = this.data.avisos.filter(a => a.ativo).length;
        
        const today = new Date().toISOString().split('T')[0];
        const reservasHoje = this.data.reservas.filter(r => r.data === today).length;
        document.getElementById('totalReservas').textContent = reservasHoje;
        
        document.getElementById('totalOcorrencias').textContent = this.data.ocorrencias.length;
    }

    loadDashboard() {
        // Recent avisos
        const recentAvisos = this.data.avisos
            .filter(a => a.ativo)
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 3);

        const avisosContainer = document.getElementById('recentAvisos');
        avisosContainer.innerHTML = '';

        if (recentAvisos.length === 0) {
            avisosContainer.innerHTML = '<div class="empty-state"><i class="fas fa-bullhorn"></i><h3>Nenhum aviso</h3><p>Não há avisos recentes</p></div>';
        } else {
            recentAvisos.forEach(aviso => {
                const avisoElement = document.createElement('div');
                avisoElement.className = 'recent-item';
                avisoElement.innerHTML = `
                    <h4>${aviso.titulo}</h4>
                    <p>${aviso.descricao}</p>
                    <div class="date">${this.formatDate(aviso.data)}</div>
                `;
                avisosContainer.appendChild(avisoElement);
            });
        }

        // Upcoming reservas
        const today = new Date();
        const upcomingReservas = this.data.reservas
            .filter(r => new Date(r.data) >= today)
            .sort((a, b) => new Date(a.data) - new Date(b.data))
            .slice(0, 3);

        const reservasContainer = document.getElementById('upcomingReservas');
        reservasContainer.innerHTML = '';

        if (upcomingReservas.length === 0) {
            reservasContainer.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-alt"></i><h3>Nenhuma reserva</h3><p>Não há reservas próximas</p></div>';
        } else {
            upcomingReservas.forEach(reserva => {
                const reservaElement = document.createElement('div');
                reservaElement.className = 'recent-item';
                reservaElement.innerHTML = `
                    <h4>${this.getAreaName(reserva.area)}</h4>
                    <p>${reserva.morador} - ${reserva.horario}</p>
                    <div class="date">${this.formatDate(reserva.data)}</div>
                `;
                reservasContainer.appendChild(reservaElement);
            });
        }
    }

    loadMoradores() {
        const tbody = document.getElementById('moradoresTable');
        tbody.innerHTML = '';

        this.data.moradores.forEach(morador => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${morador.nome}</td>
                <td>${morador.apartamento}</td>
                <td>${morador.email}</td>
                <td>${morador.telefone}</td>
                <td><span class="status-badge status-${morador.status}">${morador.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editMorador(${morador.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteMorador(${morador.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadAvisos() {
        const container = document.getElementById('avisosGrid');
        container.innerHTML = '';

        const avisosAtivos = this.data.avisos.filter(a => a.ativo);

        if (avisosAtivos.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-bullhorn"></i><h3>Nenhum aviso</h3><p>Não há avisos publicados</p></div>';
        } else {
            avisosAtivos.forEach(aviso => {
                const avisoElement = document.createElement('div');
                avisoElement.className = `aviso-card ${aviso.prioridade}`;
                avisoElement.innerHTML = `
                    <div class="aviso-header">
                        <div>
                            <div class="aviso-titulo">${aviso.titulo}</div>
                        </div>
                        <span class="aviso-prioridade prioridade-${aviso.prioridade}">${aviso.prioridade}</span>
                    </div>
                    <div class="aviso-descricao">${aviso.descricao}</div>
                    <div class="aviso-footer">
                        <span>${this.formatDate(aviso.data)}</span>
                        <div class="action-buttons">
                            <button class="action-btn btn-edit" onclick="sistema.editAviso(${aviso.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn btn-delete" onclick="sistema.deleteAviso(${aviso.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(avisoElement);
            });
        }
    }

    loadReservas() {
        const tbody = document.getElementById('reservasTable');
        tbody.innerHTML = '';

        this.data.reservas.forEach(reserva => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.getAreaName(reserva.area)}</td>
                <td>${reserva.morador}</td>
                <td>${this.formatDate(reserva.data)}</td>
                <td>${reserva.horario}</td>
                <td><span class="status-badge status-${reserva.status}">${reserva.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editReserva(${reserva.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteReserva(${reserva.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadOcorrencias() {
        const tbody = document.getElementById('ocorrenciasTable');
        tbody.innerHTML = '';

        this.data.ocorrencias.forEach(ocorrencia => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ocorrencia.tipo}</td>
                <td>${ocorrencia.descricao}</td>
                <td>${ocorrencia.morador}</td>
                <td>${this.formatDate(ocorrencia.data)}</td>
                <td><span class="status-badge status-${ocorrencia.status}">${ocorrencia.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editOcorrencia(${ocorrencia.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteOcorrencia(${ocorrencia.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Novas seções
    loadUnidades() {
        const tbody = document.getElementById('unidadesTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.unidades.forEach(unidade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${unidade.numero}</td>
                <td>${unidade.bloco}</td>
                <td>${unidade.andar}</td>
                <td>${unidade.tipo}</td>
                <td>${unidade.moradorPrincipal}</td>
                <td><span class="status-badge status-${unidade.status}">${unidade.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editUnidade(${unidade.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteUnidade(${unidade.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadPrestadores() {
        const tbody = document.getElementById('prestadoresTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.prestadores.forEach(prestador => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${prestador.nome}</td>
                <td>${prestador.empresa}</td>
                <td>${prestador.servico}</td>
                <td>${prestador.telefone}</td>
                <td>${prestador.email}</td>
                <td><span class="status-badge status-${prestador.status}">${prestador.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editPrestador(${prestador.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deletePrestador(${prestador.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadOrdemServico() {
        const tbody = document.getElementById('ordemServicoTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.ordensServico.forEach(ordem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ordem.numero}</td>
                <td>${ordem.tipo}</td>
                <td>${ordem.descricao}</td>
                <td>${ordem.unidade}</td>
                <td>${ordem.prestador}</td>
                <td>${this.formatDate(ordem.data)}</td>
                <td><span class="status-badge status-${ordem.status}">${ordem.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editOrdemServico(${ordem.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteOrdemServico(${ordem.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadVisitantes() {
        const tbody = document.getElementById('visitantesTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.visitantes.forEach(visitante => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${visitante.nome}</td>
                <td>${visitante.documento}</td>
                <td>${visitante.unidade}</td>
                <td>${this.formatDateTime(visitante.dataEntrada)}</td>
                <td>${visitante.dataSaida ? this.formatDateTime(visitante.dataSaida) : '-'}</td>
                <td><span class="status-badge status-${visitante.status}">${visitante.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editVisitante(${visitante.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteVisitante(${visitante.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadPatrimonio() {
        const tbody = document.getElementById('patrimonioTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.patrimonio.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.codigo}</td>
                <td>${item.descricao}</td>
                <td>${item.categoria}</td>
                <td>${item.localizacao}</td>
                <td>R$ ${item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td><span class="status-badge status-${item.status}">${item.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editPatrimonio(${item.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deletePatrimonio(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadQuadroAvisos() {
        const container = document.getElementById('quadroAvisosGrid');
        if (!container) return;
        
        container.innerHTML = '';

        const avisosAtivos = this.data.quadroAvisos.filter(a => a.status === 'ativo');

        if (avisosAtivos.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-newspaper"></i><h3>Nenhum aviso</h3><p>Não há avisos no quadro</p></div>';
        } else {
            avisosAtivos.forEach(aviso => {
                const avisoElement = document.createElement('div');
                avisoElement.className = `aviso-card ${aviso.categoria}`;
                avisoElement.innerHTML = `
                    <div class="aviso-header">
                        <div>
                            <div class="aviso-titulo">${aviso.titulo}</div>
                        </div>
                        <span class="aviso-prioridade prioridade-${aviso.categoria}">${aviso.categoria}</span>
                    </div>
                    <div class="aviso-descricao">${aviso.descricao}</div>
                    <div class="aviso-footer">
                        <span>${this.formatDate(aviso.dataInicio)} - ${this.formatDate(aviso.dataFim)}</span>
                        <div class="action-buttons">
                            <button class="action-btn btn-edit" onclick="sistema.editQuadroAviso(${aviso.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn btn-delete" onclick="sistema.deleteQuadroAviso(${aviso.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(avisoElement);
            });
        }
    }

    loadEmails() {
        const tbody = document.getElementById('emailsTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.emails.forEach(email => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${email.assunto}</td>
                <td>${email.destinatario}</td>
                <td>${this.formatDate(email.dataEnvio)}</td>
                <td><span class="status-badge status-${email.status}">${email.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editEmail(${email.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteEmail(${email.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadAuditoria() {
        const tbody = document.getElementById('auditoriaTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.auditoria.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.dataHora}</td>
                <td>${log.usuario}</td>
                <td>${log.acao}</td>
                <td>${log.tabela}</td>
                <td>${log.registro}</td>
                <td>${log.ip}</td>
            `;
            tbody.appendChild(row);
        });
    }

    loadUsuarios() {
        const tbody = document.getElementById('usuariosTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.funcao}</td>
                <td>${usuario.empresa}</td>
                <td><span class="status-badge status-${usuario.status}">${usuario.status}</span></td>
                <td>${usuario.ultimoAcesso}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editUsuario(${usuario.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteUsuario(${usuario.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadPermissoes() {
        const tbody = document.getElementById('permissoesTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.permissoes.forEach(permissao => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${permissao.funcao}</td>
                <td>${permissao.modulo}</td>
                <td>${permissao.permissoes.join(', ')}</td>
                <td><span class="status-badge status-${permissao.status}">${permissao.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editPermissao(${permissao.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deletePermissao(${permissao.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadEmpresas() {
        const tbody = document.getElementById('empresasTable');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.empresas.forEach(empresa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empresa.nome}</td>
                <td>${empresa.cnpj}</td>
                <td>${empresa.endereco}</td>
                <td>${empresa.telefone}</td>
                <td><span class="status-badge status-${empresa.status}">${empresa.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn btn-edit" onclick="sistema.editEmpresa(${empresa.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn btn-delete" onclick="sistema.deleteEmpresa(${empresa.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Modal functions
    openMoradorModal() {
        this.openModal('moradorModal');
        this.populateMoradorSelects();
    }

    openAvisoModal() {
        this.openModal('avisoModal');
    }

    openReservaModal() {
        this.openModal('reservaModal');
        this.populateMoradorSelects();
        this.setMinDate();
    }

    openOcorrenciaModal() {
        this.openModal('ocorrenciaModal');
        this.populateMoradorSelects();
    }

    // Novos modais
    openUnidadeModal() {
        this.openModal('unidadeModal');
        this.populateUnidadeSelects();
    }

    openPrestadorModal() {
        this.openModal('prestadorModal');
    }

    openOrdemServicoModal() {
        this.openModal('ordemServicoModal');
        this.populateOrdemServicoSelects();
    }

    openVisitanteModal() {
        this.openModal('visitanteModal');
        this.populateUnidadeSelects();
    }

    openPatrimonioModal() {
        this.openModal('patrimonioModal');
    }

    openQuadroAvisoModal() {
        this.openModal('quadroAvisoModal');
    }

    openEmailModal() {
        this.openModal('emailModal');
    }

    openUsuarioModal() {
        this.openModal('usuarioModal');
        this.populateEmpresaSelects();
    }

    openPermissaoModal() {
        this.openModal('permissaoModal');
    }

    openEmpresaModal() {
        this.openModal('empresaModal');
    }

    openModal(modalId) {
        // Fechar todos os modais primeiro
        this.closeModal();
        
        // Abrir o modal específico
        document.getElementById('modalOverlay').classList.add('active');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.clearForms();
        
        // Resetar estado de edição
        this.editingId = null;
        this.editingType = null;
        
        // Resetar títulos dos modais para o padrão
        document.querySelectorAll('.modal-header h3').forEach(title => {
            const text = title.textContent;
            if (text.startsWith('Editar')) {
                title.textContent = text.replace('Editar', 'Novo');
            }
        });
    }

    clearForms() {
        document.querySelectorAll('form').forEach(form => {
            form.reset();
        });
    }

    populateMoradorSelects() {
        const selects = ['reservaMorador', 'ocorrenciaMorador'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">Selecione um morador</option>';
            this.data.moradores.forEach(morador => {
                const option = document.createElement('option');
                option.value = morador.id;
                option.textContent = `${morador.nome} - Apt ${morador.apartamento}`;
                select.appendChild(option);
            });
        });
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('reservaData').min = today;
    }

    // Funções de população de selects
    populateUnidadeSelects() {
        const selects = ['unidadeMorador', 'ordemUnidade', 'visitanteUnidade'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">Selecione uma unidade</option>';
                this.data.unidades.forEach(unidade => {
                    const option = document.createElement('option');
                    option.value = unidade.id;
                    option.textContent = `${unidade.numero} - Bloco ${unidade.bloco}`;
                    select.appendChild(option);
                });
            }
        });
    }

    populateOrdemServicoSelects() {
        // Popula select de unidades
        this.populateUnidadeSelects();
        
        // Popula select de prestadores
        const select = document.getElementById('ordemPrestador');
        if (select) {
            select.innerHTML = '<option value="">Selecione um prestador</option>';
            this.data.prestadores.forEach(prestador => {
                const option = document.createElement('option');
                option.value = prestador.id;
                option.textContent = `${prestador.nome} - ${prestador.empresa}`;
                select.appendChild(option);
            });
        }
    }

    populateEmpresaSelects() {
        const selects = ['usuarioEmpresa'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.innerHTML = '<option value="">Selecione uma empresa</option>';
                this.data.empresas.forEach(empresa => {
                    const option = document.createElement('option');
                    option.value = empresa.id;
                    option.textContent = empresa.nome;
                    select.appendChild(option);
                });
            }
        });
    }

    // Form handlers
    handleMoradorSubmit() {
        if (this.editingId && this.editingType === 'morador') {
            // Modo edição
            const index = this.data.moradores.findIndex(m => m.id === this.editingId);
            if (index !== -1) {
                this.data.moradores[index] = {
                    ...this.data.moradores[index],
                    nome: document.getElementById('moradorNome').value,
                    apartamento: document.getElementById('moradorApartamento').value,
                    email: document.getElementById('moradorEmail').value,
                    telefone: document.getElementById('moradorTelefone').value,
                    status: document.getElementById('moradorStatus').value
                };
                this.showNotification('Morador atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const morador = {
                id: this.data.moradores.length + 1,
                nome: document.getElementById('moradorNome').value,
                apartamento: document.getElementById('moradorApartamento').value,
                email: document.getElementById('moradorEmail').value,
                telefone: document.getElementById('moradorTelefone').value,
                status: 'ativo'
            };
            this.data.moradores.push(morador);
            this.showNotification('Morador adicionado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadMoradores();
        this.updateStats();
    }

    handleAvisoSubmit() {
        if (this.editingId && this.editingType === 'aviso') {
            // Modo edição
            const index = this.data.avisos.findIndex(a => a.id === this.editingId);
            if (index !== -1) {
                this.data.avisos[index] = {
                    ...this.data.avisos[index],
                    titulo: document.getElementById('avisoTitulo').value,
                    descricao: document.getElementById('avisoDescricao').value,
                    prioridade: document.getElementById('avisoPrioridade').value
                };
                this.showNotification('Aviso atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const aviso = {
                id: this.data.avisos.length + 1,
                titulo: document.getElementById('avisoTitulo').value,
                descricao: document.getElementById('avisoDescricao').value,
                prioridade: document.getElementById('avisoPrioridade').value,
                data: new Date().toISOString().split('T')[0],
                ativo: true
            };
            this.data.avisos.push(aviso);
            this.showNotification('Aviso publicado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadAvisos();
        this.updateStats();
    }

    handleReservaSubmit() {
        const moradorId = parseInt(document.getElementById('reservaMorador').value);
        const morador = this.data.moradores.find(m => m.id === moradorId);

        if (this.editingId && this.editingType === 'reserva') {
            // Modo edição
            const index = this.data.reservas.findIndex(r => r.id === this.editingId);
            if (index !== -1) {
                this.data.reservas[index] = {
                    ...this.data.reservas[index],
                    area: document.getElementById('reservaArea').value,
                    morador: morador.nome,
                    moradorId: moradorId,
                    data: document.getElementById('reservaData').value,
                    horario: document.getElementById('reservaHorario').value,
                    status: document.getElementById('reservaStatus').value
                };
                this.showNotification('Reserva atualizada com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const reserva = {
                id: this.data.reservas.length + 1,
                area: document.getElementById('reservaArea').value,
                morador: morador.nome,
                moradorId: moradorId,
                data: document.getElementById('reservaData').value,
                horario: document.getElementById('reservaHorario').value,
                status: 'confirmada'
            };
            this.data.reservas.push(reserva);
            this.showNotification('Reserva realizada com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadReservas();
        this.updateStats();
    }

    handleOcorrenciaSubmit() {
        const moradorId = parseInt(document.getElementById('ocorrenciaMorador').value);
        const morador = this.data.moradores.find(m => m.id === moradorId);

        if (this.editingId && this.editingType === 'ocorrencia') {
            // Modo edição
            const index = this.data.ocorrencias.findIndex(o => o.id === this.editingId);
            if (index !== -1) {
                this.data.ocorrencias[index] = {
                    ...this.data.ocorrencias[index],
                    tipo: document.getElementById('ocorrenciaTipo').value,
                    descricao: document.getElementById('ocorrenciaDescricao').value,
                    morador: morador.nome,
                    moradorId: moradorId,
                    data: document.getElementById('ocorrenciaData').value,
                    status: document.getElementById('ocorrenciaStatus').value
                };
                this.showNotification('Ocorrência atualizada com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const ocorrencia = {
                id: this.data.ocorrencias.length + 1,
                tipo: document.getElementById('ocorrenciaTipo').value,
                descricao: document.getElementById('ocorrenciaDescricao').value,
                morador: morador.nome,
                moradorId: moradorId,
                data: new Date().toISOString().split('T')[0],
                status: 'pendente'
            };
            this.data.ocorrencias.push(ocorrencia);
            this.showNotification('Ocorrência registrada com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadOcorrencias();
        this.updateStats();
    }

    // Novos handlers
    handleUnidadeSubmit() {
        const moradorId = parseInt(document.getElementById('unidadeMorador').value);
        const morador = moradorId ? this.data.moradores.find(m => m.id === moradorId) : null;

        if (this.editingId && this.editingType === 'unidade') {
            // Modo edição
            const index = this.data.unidades.findIndex(u => u.id === this.editingId);
            if (index !== -1) {
                this.data.unidades[index] = {
                    ...this.data.unidades[index],
                    numero: document.getElementById('unidadeNumero').value,
                    bloco: document.getElementById('unidadeBloco').value,
                    andar: parseInt(document.getElementById('unidadeAndar').value),
                    tipo: document.getElementById('unidadeTipo').value,
                    moradorPrincipal: morador ? morador.nome : null,
                    moradorId: moradorId || null,
                    status: document.getElementById('unidadeStatus').value
                };
                this.showNotification('Unidade atualizada com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const unidade = {
                id: this.data.unidades.length + 1,
                numero: document.getElementById('unidadeNumero').value,
                bloco: document.getElementById('unidadeBloco').value,
                andar: parseInt(document.getElementById('unidadeAndar').value),
                tipo: document.getElementById('unidadeTipo').value,
                moradorPrincipal: morador ? morador.nome : null,
                moradorId: moradorId || null,
                status: 'ocupada'
            };
            this.data.unidades.push(unidade);
            this.showNotification('Unidade cadastrada com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadUnidades();
    }

    handlePrestadorSubmit() {
        if (this.editingId && this.editingType === 'prestador') {
            // Modo edição
            const index = this.data.prestadores.findIndex(p => p.id === this.editingId);
            if (index !== -1) {
                this.data.prestadores[index] = {
                    ...this.data.prestadores[index],
                    nome: document.getElementById('prestadorNome').value,
                    servico: document.getElementById('prestadorServico').value,
                    telefone: document.getElementById('prestadorTelefone').value,
                    email: document.getElementById('prestadorEmail').value,
                    status: document.getElementById('prestadorStatus').value
                };
                this.showNotification('Prestador atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const prestador = {
                id: this.data.prestadores.length + 1,
                nome: document.getElementById('prestadorNome').value,
                servico: document.getElementById('prestadorServico').value,
                telefone: document.getElementById('prestadorTelefone').value,
                email: document.getElementById('prestadorEmail').value,
                status: 'ativo'
            };
            this.data.prestadores.push(prestador);
            this.showNotification('Prestador cadastrado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadPrestadores();
    }

    handleOrdemServicoSubmit() {
        const unidadeId = parseInt(document.getElementById('ordemUnidade').value);
        const prestadorId = parseInt(document.getElementById('ordemPrestador').value);
        const unidade = this.data.unidades.find(u => u.id === unidadeId);
        const prestador = this.data.prestadores.find(p => p.id === prestadorId);

        if (this.editingId && this.editingType === 'ordemServico') {
            // Modo edição
            const index = this.data.ordensServico.findIndex(o => o.id === this.editingId);
            if (index !== -1) {
                this.data.ordensServico[index] = {
                    ...this.data.ordensServico[index],
                    servico: document.getElementById('ordemServico').value,
                    unidade: unidade ? unidade.numero : '',
                    unidadeId: unidadeId,
                    prestador: prestador ? prestador.nome : '',
                    prestadorId: prestadorId,
                    data: document.getElementById('ordemData').value,
                    status: document.getElementById('ordemStatus').value,
                    observacoes: document.getElementById('ordemObservacoes').value
                };
                this.showNotification('Ordem de serviço atualizada com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const ordem = {
                id: this.data.ordensServico.length + 1,
                numero: `OS-${String(this.data.ordensServico.length + 1).padStart(3, '0')}`,
                tipo: document.getElementById('ordemTipo').value,
                descricao: document.getElementById('ordemDescricao').value,
                unidade: unidade.numero,
                prestador: prestador.nome,
                prestadorId: prestadorId,
                data: document.getElementById('ordemData').value,
                status: 'em_andamento'
            };
            this.data.ordensServico.push(ordem);
            this.showNotification('Ordem de serviço criada com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadOrdemServico();
    }

    handleVisitanteSubmit() {
        const unidadeId = parseInt(document.getElementById('visitanteUnidade').value);
        const unidade = this.data.unidades.find(u => u.id === unidadeId);

        if (this.editingId && this.editingType === 'visitante') {
            // Modo edição
            const index = this.data.visitantes.findIndex(v => v.id === this.editingId);
            if (index !== -1) {
                this.data.visitantes[index] = {
                    ...this.data.visitantes[index],
                    nome: document.getElementById('visitanteNome').value,
                    documento: document.getElementById('visitanteDocumento').value,
                    unidade: unidade ? unidade.numero : '',
                    unidadeId: unidadeId,
                    data: document.getElementById('visitanteData').value,
                    horario: document.getElementById('visitanteHorario').value,
                    autorizadoPor: document.getElementById('visitanteAutorizadoPor').value
                };
                this.showNotification('Visitante atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const visitante = {
                id: this.data.visitantes.length + 1,
                nome: document.getElementById('visitanteNome').value,
                documento: document.getElementById('visitanteDocumento').value,
                unidade: unidade.numero,
                dataEntrada: document.getElementById('visitanteDataEntrada').value,
                dataSaida: document.getElementById('visitanteDataSaida').value || null,
                status: document.getElementById('visitanteDataSaida').value ? 'saido' : 'presente'
            };
            this.data.visitantes.push(visitante);
            this.showNotification('Visitante registrado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadVisitantes();
    }

    handlePatrimonioSubmit() {
        if (this.editingId && this.editingType === 'patrimonio') {
            // Modo edição
            const index = this.data.patrimonio.findIndex(p => p.id === this.editingId);
            if (index !== -1) {
                this.data.patrimonio[index] = {
                    ...this.data.patrimonio[index],
                    nome: document.getElementById('patrimonioNome').value,
                    categoria: document.getElementById('patrimonioCategoria').value,
                    local: document.getElementById('patrimonioLocal').value,
                    dataAquisicao: document.getElementById('patrimonioDataAquisicao').value,
                    valor: parseFloat(document.getElementById('patrimonioValor').value),
                    status: document.getElementById('patrimonioStatus').value
                };
                this.showNotification('Patrimônio atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const patrimonio = {
                id: this.data.patrimonio.length + 1,
                codigo: document.getElementById('patrimonioCodigo').value,
                descricao: document.getElementById('patrimonioDescricao').value,
                categoria: document.getElementById('patrimonioCategoria').value,
                localizacao: document.getElementById('patrimonioLocalizacao').value,
                valor: parseFloat(document.getElementById('patrimonioValor').value),
                status: 'ativo'
            };
            this.data.patrimonio.push(patrimonio);
            this.showNotification('Item do patrimônio cadastrado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadPatrimonio();
    }

    handleQuadroAvisoSubmit() {
        if (this.editingId && this.editingType === 'quadroAviso') {
            // Modo edição
            const index = this.data.quadroAvisos.findIndex(q => q.id === this.editingId);
            if (index !== -1) {
                this.data.quadroAvisos[index] = {
                    ...this.data.quadroAvisos[index],
                    titulo: document.getElementById('quadroAvisoTitulo').value,
                    conteudo: document.getElementById('quadroAvisoConteudo').value,
                    dataInicio: document.getElementById('quadroAvisoDataInicio').value,
                    dataFim: document.getElementById('quadroAvisoDataFim').value,
                    local: document.getElementById('quadroAvisoLocal').value
                };
                this.showNotification('Quadro de avisos atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const quadroAviso = {
                id: this.data.quadroAvisos.length + 1,
                titulo: document.getElementById('quadroTitulo').value,
                descricao: document.getElementById('quadroDescricao').value,
                categoria: document.getElementById('quadroCategoria').value,
                dataInicio: document.getElementById('quadroDataInicio').value,
                dataFim: document.getElementById('quadroDataFim').value,
                status: 'ativo'
            };
            this.data.quadroAvisos.push(quadroAviso);
            this.showNotification('Aviso do quadro publicado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadQuadroAvisos();
    }

    handleEmailSubmit() {
        if (this.editingId && this.editingType === 'email') {
            // Modo edição
            const index = this.data.emails.findIndex(e => e.id === this.editingId);
            if (index !== -1) {
                this.data.emails[index] = {
                    ...this.data.emails[index],
                    destinatarios: document.getElementById('emailDestinatarios').value,
                    assunto: document.getElementById('emailAssunto').value,
                    mensagem: document.getElementById('emailMensagem').value,
                    prioridade: document.getElementById('emailPrioridade').value
                };
                this.showNotification('Email atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const email = {
                id: this.data.emails.length + 1,
                assunto: document.getElementById('emailAssunto').value,
                destinatario: document.getElementById('emailDestinatario').value,
                conteudo: document.getElementById('emailConteudo').value,
                prioridade: document.getElementById('emailPrioridade').value,
                dataEnvio: new Date().toISOString().split('T')[0],
                status: 'enviado'
            };
            this.data.emails.push(email);
            this.showNotification('E-mail enviado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadEmails();
    }

    handleUsuarioSubmit() {
        const empresaId = parseInt(document.getElementById('usuarioEmpresa').value);
        const empresa = this.data.empresas.find(e => e.id === empresaId);

        if (this.editingId && this.editingType === 'usuario') {
            // Modo edição
            const index = this.data.usuarios.findIndex(u => u.id === this.editingId);
            if (index !== -1) {
                this.data.usuarios[index] = {
                    ...this.data.usuarios[index],
                    nome: document.getElementById('usuarioNome').value,
                    email: document.getElementById('usuarioEmail').value,
                    perfil: document.getElementById('usuarioPerfil').value,
                    empresa: empresa ? empresa.nome : '',
                    empresaId: empresaId,
                    status: document.getElementById('usuarioStatus').value
                };
                // Atualizar senha apenas se foi fornecida
                const senha = document.getElementById('usuarioSenha').value;
                if (senha) {
                    this.data.usuarios[index].senha = senha;
                }
                this.showNotification('Usuário atualizado com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const usuario = {
                id: this.data.usuarios.length + 1,
                nome: document.getElementById('usuarioNome').value,
                email: document.getElementById('usuarioEmail').value,
                funcao: document.getElementById('usuarioFuncao').value,
                empresa: empresa.nome,
                status: 'ativo',
                ultimoAcesso: new Date().toLocaleString('pt-BR')
            };
            this.data.usuarios.push(usuario);
            this.showNotification('Usuário criado com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadUsuarios();
    }

    handlePermissaoSubmit() {
        const permissoes = [];
        if (document.getElementById('permissaoAcaoVisualizar').checked) permissoes.push('visualizar');
        if (document.getElementById('permissaoAcaoCriar').checked) permissoes.push('criar');
        if (document.getElementById('permissaoAcaoEditar').checked) permissoes.push('editar');
        if (document.getElementById('permissaoAcaoExcluir').checked) permissoes.push('excluir');

        if (this.editingId && this.editingType === 'permissao') {
            // Modo edição
            const index = this.data.permissoes.findIndex(p => p.id === this.editingId);
            if (index !== -1) {
                this.data.permissoes[index] = {
                    ...this.data.permissoes[index],
                    nome: document.getElementById('permissaoNome').value,
                    descricao: document.getElementById('permissaoDescricao').value,
                    modulo: document.getElementById('permissaoModulo').value,
                    acoes: permissoes
                };
                this.showNotification('Permissão atualizada com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const permissao = {
                id: this.data.permissoes.length + 1,
                funcao: document.getElementById('permissaoFuncao').value,
                modulo: document.getElementById('permissaoModulo').value,
                permissoes: permissoes,
                status: 'ativo'
            };
            this.data.permissoes.push(permissao);
            this.showNotification('Permissão criada com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadPermissoes();
    }

    handleEmpresaSubmit() {
        if (this.editingId && this.editingType === 'empresa') {
            // Modo edição
            const index = this.data.empresas.findIndex(e => e.id === this.editingId);
            if (index !== -1) {
                this.data.empresas[index] = {
                    ...this.data.empresas[index],
                    nome: document.getElementById('empresaNome').value,
                    cnpj: document.getElementById('empresaCNPJ').value,
                    endereco: document.getElementById('empresaEndereco').value,
                    telefone: document.getElementById('empresaTelefone').value,
                    email: document.getElementById('empresaEmail').value,
                    status: document.getElementById('empresaStatus').value
                };
                this.showNotification('Empresa atualizada com sucesso!', 'success');
            }
            this.editingId = null;
            this.editingType = null;
        } else {
            // Modo criação
            const empresa = {
                id: this.data.empresas.length + 1,
                nome: document.getElementById('empresaNome').value,
                cnpj: document.getElementById('empresaCnpj').value,
                endereco: document.getElementById('empresaEndereco').value,
                telefone: document.getElementById('empresaTelefone').value,
                email: document.getElementById('empresaEmail').value,
                responsavel: document.getElementById('empresaResponsavel').value,
                status: 'ativo'
            };
            this.data.empresas.push(empresa);
            this.showNotification('Empresa cadastrada com sucesso!', 'success');
        }
        
        this.closeModal();
        this.loadEmpresas();
    }

    // Delete functions
    deleteMorador(id) {
        if (confirm('Tem certeza que deseja excluir este morador?')) {
            this.data.moradores = this.data.moradores.filter(m => m.id !== id);
            this.loadMoradores();
            this.updateStats();
            this.showNotification('Morador excluído com sucesso!', 'success');
        }
    }

    deleteAviso(id) {
        if (confirm('Tem certeza que deseja excluir este aviso?')) {
            this.data.avisos = this.data.avisos.filter(a => a.id !== id);
            this.loadAvisos();
            this.updateStats();
            this.showNotification('Aviso excluído com sucesso!', 'success');
        }
    }

    deleteReserva(id) {
        if (confirm('Tem certeza que deseja excluir esta reserva?')) {
            this.data.reservas = this.data.reservas.filter(r => r.id !== id);
            this.loadReservas();
            this.updateStats();
            this.showNotification('Reserva excluída com sucesso!', 'success');
        }
    }

    deleteOcorrencia(id) {
        if (confirm('Tem certeza que deseja excluir esta ocorrência?')) {
            this.data.ocorrencias = this.data.ocorrencias.filter(o => o.id !== id);
            this.loadOcorrencias();
            this.updateStats();
            this.showNotification('Ocorrência excluída com sucesso!', 'success');
        }
    }

    // Novas funções de delete
    deleteUnidade(id) {
        if (confirm('Tem certeza que deseja excluir esta unidade?')) {
            this.data.unidades = this.data.unidades.filter(u => u.id !== id);
            this.loadUnidades();
            this.showNotification('Unidade excluída com sucesso!', 'success');
        }
    }

    deletePrestador(id) {
        if (confirm('Tem certeza que deseja excluir este prestador?')) {
            this.data.prestadores = this.data.prestadores.filter(p => p.id !== id);
            this.loadPrestadores();
            this.showNotification('Prestador excluído com sucesso!', 'success');
        }
    }

    deleteOrdemServico(id) {
        if (confirm('Tem certeza que deseja excluir esta ordem de serviço?')) {
            this.data.ordensServico = this.data.ordensServico.filter(o => o.id !== id);
            this.loadOrdemServico();
            this.showNotification('Ordem de serviço excluída com sucesso!', 'success');
        }
    }

    deleteVisitante(id) {
        if (confirm('Tem certeza que deseja excluir este visitante?')) {
            this.data.visitantes = this.data.visitantes.filter(v => v.id !== id);
            this.loadVisitantes();
            this.showNotification('Visitante excluído com sucesso!', 'success');
        }
    }

    deletePatrimonio(id) {
        if (confirm('Tem certeza que deseja excluir este item do patrimônio?')) {
            this.data.patrimonio = this.data.patrimonio.filter(p => p.id !== id);
            this.loadPatrimonio();
            this.showNotification('Item do patrimônio excluído com sucesso!', 'success');
        }
    }

    deleteQuadroAviso(id) {
        if (confirm('Tem certeza que deseja excluir este aviso do quadro?')) {
            this.data.quadroAvisos = this.data.quadroAvisos.filter(q => q.id !== id);
            this.loadQuadroAvisos();
            this.showNotification('Aviso do quadro excluído com sucesso!', 'success');
        }
    }

    deleteEmail(id) {
        if (confirm('Tem certeza que deseja excluir este e-mail?')) {
            this.data.emails = this.data.emails.filter(e => e.id !== id);
            this.loadEmails();
            this.showNotification('E-mail excluído com sucesso!', 'success');
        }
    }

    deleteUsuario(id) {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            this.data.usuarios = this.data.usuarios.filter(u => u.id !== id);
            this.loadUsuarios();
            this.showNotification('Usuário excluído com sucesso!', 'success');
        }
    }

    deletePermissao(id) {
        if (confirm('Tem certeza que deseja excluir esta permissão?')) {
            this.data.permissoes = this.data.permissoes.filter(p => p.id !== id);
            this.loadPermissoes();
            this.showNotification('Permissão excluída com sucesso!', 'success');
        }
    }

    deleteEmpresa(id) {
        if (confirm('Tem certeza que deseja excluir esta empresa?')) {
            this.data.empresas = this.data.empresas.filter(e => e.id !== id);
            this.loadEmpresas();
            this.showNotification('Empresa excluída com sucesso!', 'success');
        }
    }

    // Edit functions (simplified for demo)
    // ===== FUNÇÕES DE EDIÇÃO =====
    
    editMorador(id) {
        const morador = this.data.moradores.find(m => m.id === id);
        if (!morador) return;
        
        this.editingId = id;
        this.editingType = 'morador';
        
        document.getElementById('moradorNome').value = morador.nome;
        document.getElementById('moradorApartamento').value = morador.apartamento;
        document.getElementById('moradorEmail').value = morador.email;
        document.getElementById('moradorTelefone').value = morador.telefone;
        document.getElementById('moradorStatus').value = morador.status;
        
        document.querySelector('#moradorModal .modal-header h3').textContent = 'Editar Morador';
        this.openModal('moradorModal');
    }

    editAviso(id) {
        const aviso = this.data.avisos.find(a => a.id === id);
        if (!aviso) return;
        
        this.editingId = id;
        this.editingType = 'aviso';
        
        document.getElementById('avisoTitulo').value = aviso.titulo;
        document.getElementById('avisoDescricao').value = aviso.descricao;
        document.getElementById('avisoPrioridade').value = aviso.prioridade;
        
        document.querySelector('#avisoModal .modal-header h3').textContent = 'Editar Aviso';
        this.openModal('avisoModal');
    }

    editReserva(id) {
        const reserva = this.data.reservas.find(r => r.id === id);
        if (!reserva) return;
        
        this.editingId = id;
        this.editingType = 'reserva';
        
        document.getElementById('reservaArea').value = reserva.area;
        document.getElementById('reservaMorador').value = reserva.moradorId;
        document.getElementById('reservaData').value = reserva.data;
        document.getElementById('reservaHorario').value = reserva.horario;
        document.getElementById('reservaStatus').value = reserva.status;
        
        document.querySelector('#reservaModal .modal-header h3').textContent = 'Editar Reserva';
        this.openModal('reservaModal');
    }

    editOcorrencia(id) {
        const ocorrencia = this.data.ocorrencias.find(o => o.id === id);
        if (!ocorrencia) return;
        
        this.editingId = id;
        this.editingType = 'ocorrencia';
        
        document.getElementById('ocorrenciaTipo').value = ocorrencia.tipo;
        document.getElementById('ocorrenciaDescricao').value = ocorrencia.descricao;
        document.getElementById('ocorrenciaMorador').value = ocorrencia.moradorId;
        document.getElementById('ocorrenciaData').value = ocorrencia.data;
        document.getElementById('ocorrenciaStatus').value = ocorrencia.status;
        
        document.querySelector('#ocorrenciaModal .modal-header h3').textContent = 'Editar Ocorrência';
        this.openModal('ocorrenciaModal');
    }

    editUnidade(id) {
        const unidade = this.data.unidades.find(u => u.id === id);
        if (!unidade) return;
        
        this.editingId = id;
        this.editingType = 'unidade';
        
        document.getElementById('unidadeNumero').value = unidade.numero;
        document.getElementById('unidadeBloco').value = unidade.bloco;
        document.getElementById('unidadeAndar').value = unidade.andar;
        document.getElementById('unidadeTipo').value = unidade.tipo;
        document.getElementById('unidadeMorador').value = unidade.moradorId;
        document.getElementById('unidadeStatus').value = unidade.status;
        
        document.querySelector('#unidadeModal .modal-header h3').textContent = 'Editar Unidade';
        this.openModal('unidadeModal');
    }

    editPrestador(id) {
        const prestador = this.data.prestadores.find(p => p.id === id);
        if (!prestador) return;
        
        this.editingId = id;
        this.editingType = 'prestador';
        
        document.getElementById('prestadorNome').value = prestador.nome;
        document.getElementById('prestadorServico').value = prestador.servico;
        document.getElementById('prestadorTelefone').value = prestador.telefone;
        document.getElementById('prestadorEmail').value = prestador.email;
        document.getElementById('prestadorStatus').value = prestador.status;
        
        document.querySelector('#prestadorModal .modal-header h3').textContent = 'Editar Prestador';
        this.openModal('prestadorModal');
    }

    editOrdemServico(id) {
        const ordem = this.data.ordensServico.find(o => o.id === id);
        if (!ordem) return;
        
        this.editingId = id;
        this.editingType = 'ordemServico';
        
        document.getElementById('ordemServico').value = ordem.servico;
        document.getElementById('ordemUnidade').value = ordem.unidadeId;
        document.getElementById('ordemPrestador').value = ordem.prestadorId;
        document.getElementById('ordemData').value = ordem.data;
        document.getElementById('ordemStatus').value = ordem.status;
        document.getElementById('ordemObservacoes').value = ordem.observacoes;
        
        document.querySelector('#ordemServicoModal .modal-header h3').textContent = 'Editar Ordem de Serviço';
        this.openModal('ordemServicoModal');
    }

    editVisitante(id) {
        const visitante = this.data.visitantes.find(v => v.id === id);
        if (!visitante) return;
        
        this.editingId = id;
        this.editingType = 'visitante';
        
        document.getElementById('visitanteNome').value = visitante.nome;
        document.getElementById('visitanteDocumento').value = visitante.documento;
        document.getElementById('visitanteUnidade').value = visitante.unidadeId;
        document.getElementById('visitanteData').value = visitante.data;
        document.getElementById('visitanteHorario').value = visitante.horario;
        document.getElementById('visitanteAutorizadoPor').value = visitante.autorizadoPor;
        
        document.querySelector('#visitanteModal .modal-header h3').textContent = 'Editar Visitante';
        this.openModal('visitanteModal');
    }

    editPatrimonio(id) {
        const patrimonio = this.data.patrimonio.find(p => p.id === id);
        if (!patrimonio) return;
        
        this.editingId = id;
        this.editingType = 'patrimonio';
        
        document.getElementById('patrimonioNome').value = patrimonio.nome;
        document.getElementById('patrimonioCategoria').value = patrimonio.categoria;
        document.getElementById('patrimonioLocal').value = patrimonio.local;
        document.getElementById('patrimonioDataAquisicao').value = patrimonio.dataAquisicao;
        document.getElementById('patrimonioValor').value = patrimonio.valor;
        document.getElementById('patrimonioStatus').value = patrimonio.status;
        
        document.querySelector('#patrimonioModal .modal-header h3').textContent = 'Editar Patrimônio';
        this.openModal('patrimonioModal');
    }

    editQuadroAviso(id) {
        const quadro = this.data.quadroAvisos.find(q => q.id === id);
        if (!quadro) return;
        
        this.editingId = id;
        this.editingType = 'quadroAviso';
        
        document.getElementById('quadroAvisoTitulo').value = quadro.titulo;
        document.getElementById('quadroAvisoConteudo').value = quadro.conteudo;
        document.getElementById('quadroAvisoDataInicio').value = quadro.dataInicio;
        document.getElementById('quadroAvisoDataFim').value = quadro.dataFim;
        document.getElementById('quadroAvisoLocal').value = quadro.local;
        
        document.querySelector('#quadroAvisoModal .modal-header h3').textContent = 'Editar Quadro de Avisos';
        this.openModal('quadroAvisoModal');
    }

    editEmail(id) {
        const email = this.data.emails.find(e => e.id === id);
        if (!email) return;
        
        this.editingId = id;
        this.editingType = 'email';
        
        document.getElementById('emailDestinatarios').value = email.destinatarios;
        document.getElementById('emailAssunto').value = email.assunto;
        document.getElementById('emailMensagem').value = email.mensagem;
        document.getElementById('emailPrioridade').value = email.prioridade;
        
        document.querySelector('#emailModal .modal-header h3').textContent = 'Editar Email';
        this.openModal('emailModal');
    }

    editUsuario(id) {
        const usuario = this.data.usuarios.find(u => u.id === id);
        if (!usuario) return;
        
        this.editingId = id;
        this.editingType = 'usuario';
        
        document.getElementById('usuarioNome').value = usuario.nome;
        document.getElementById('usuarioEmail').value = usuario.email;
        document.getElementById('usuarioPerfil').value = usuario.perfil;
        document.getElementById('usuarioEmpresa').value = usuario.empresaId;
        document.getElementById('usuarioStatus').value = usuario.status;
        
        // Não preencher senha ao editar
        document.getElementById('usuarioSenha').value = '';
        
        document.querySelector('#usuarioModal .modal-header h3').textContent = 'Editar Usuário';
        this.openModal('usuarioModal');
    }

    editPermissao(id) {
        const permissao = this.data.permissoes.find(p => p.id === id);
        if (!permissao) return;
        
        this.editingId = id;
        this.editingType = 'permissao';
        
        document.getElementById('permissaoNome').value = permissao.nome;
        document.getElementById('permissaoDescricao').value = permissao.descricao;
        document.getElementById('permissaoModulo').value = permissao.modulo;
        
        // Preencher checkboxes de ações
        document.getElementById('permissaoAcaoVisualizar').checked = permissao.acoes.includes('visualizar');
        document.getElementById('permissaoAcaoCriar').checked = permissao.acoes.includes('criar');
        document.getElementById('permissaoAcaoEditar').checked = permissao.acoes.includes('editar');
        document.getElementById('permissaoAcaoExcluir').checked = permissao.acoes.includes('excluir');
        
        document.querySelector('#permissaoModal .modal-header h3').textContent = 'Editar Permissão';
        this.openModal('permissaoModal');
    }

    editEmpresa(id) {
        const empresa = this.data.empresas.find(e => e.id === id);
        if (!empresa) return;
        
        this.editingId = id;
        this.editingType = 'empresa';
        
        document.getElementById('empresaNome').value = empresa.nome;
        document.getElementById('empresaCNPJ').value = empresa.cnpj;
        document.getElementById('empresaEndereco').value = empresa.endereco;
        document.getElementById('empresaTelefone').value = empresa.telefone;
        document.getElementById('empresaEmail').value = empresa.email;
        document.getElementById('empresaStatus').value = empresa.status;
        
        document.querySelector('#empresaModal .modal-header h3').textContent = 'Editar Empresa';
        this.openModal('empresaModal');
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString('pt-BR');
    }

    getAreaName(area) {
        const areas = {
            'salao-festas': 'Salão de Festas',
            'churrasqueira': 'Churrasqueira',
            'piscina': 'Piscina',
            'quadra': 'Quadra'
        };
        return areas[area] || area;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showForgotPassword() {
        const email = prompt('Digite seu e-mail cadastrado:');
        if (email) {
            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                this.showNotification('Instruções de recuperação enviadas para ' + email, 'success');
            } else {
                this.showNotification('Por favor, digite um e-mail válido', 'error');
            }
        }
    }
}

// Global functions for HTML onclick events
function openMoradorModal() {
    sistema.openMoradorModal();
}

function openAvisoModal() {
    sistema.openAvisoModal();
}

function openReservaModal() {
    sistema.openReservaModal();
}

function openOcorrenciaModal() {
    sistema.openOcorrenciaModal();
}

function closeModal() {
    sistema.closeModal();
}

function refreshData() {
    sistema.loadData();
    sistema.showNotification('Dados atualizados!', 'success');
}

// Novas funções globais para os modais
function openUnidadeModal() {
    sistema.openUnidadeModal();
}

function openPrestadorModal() {
    sistema.openPrestadorModal();
}

function openOrdemServicoModal() {
    sistema.openOrdemServicoModal();
}

function openVisitanteModal() {
    sistema.openVisitanteModal();
}

function openPatrimonioModal() {
    sistema.openPatrimonioModal();
}

function openQuadroAvisoModal() {
    sistema.openQuadroAvisoModal();
}

function openEmailModal() {
    sistema.openEmailModal();
}

function openUsuarioModal() {
    sistema.openUsuarioModal();
}

function openPermissaoModal() {
    sistema.openPermissaoModal();
}

function openEmpresaModal() {
    sistema.openEmpresaModal();
}

function exportAuditLog() {
    sistema.showNotification('Exportação de logs será implementada em breve!', 'info');
}

function refreshAuditLog() {
    sistema.loadAuditoria();
    sistema.showNotification('Logs de auditoria atualizados!', 'success');
}

// Initialize the system
let sistema;
document.addEventListener('DOMContentLoaded', () => {
    sistema = new CondominioSystem();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

