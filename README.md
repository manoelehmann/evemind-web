# Evemind - Sistema de Gestão de Condomínio

Sistema completo e moderno para gestão de condomínios com interface visual rica e funcionalidades abrangentes.

## 🚀 Funcionalidades Implementadas

### 🎨 Interface Visual Aprimorada
- **Design Moderno**: Interface com gradientes animados e efeitos visuais
- **Tema Dinâmico**: Cores vibrantes com animações suaves
- **Responsividade**: Adaptável a diferentes tamanhos de tela
- **Elementos Visuais**: Cards com glassmorphism, sombras e animações

### 🔐 Sistema de Autenticação
- **Login Multi-Empresa**: Seleção de empresa no login
- **Controle de Acesso**: Sistema de usuários e permissões
- **Segurança**: Validação de credenciais e sessões

### 👥 Gestão Completa de Usuários
- **Cadastro de Usuários**: Nome, email, função, empresa
- **Controle de Permissões**: Módulos e ações específicas por função
- **Gestão de Empresas**: Cadastro e administração de empresas
- **Auditoria**: Logs detalhados de todas as ações

### 📊 Dashboard Avançado
- **Estatísticas em Tempo Real**: Métricas atualizadas dinamicamente
- **Cards Interativos**: Animações e efeitos visuais
- **Navegação Intuitiva**: Menu lateral com ícones e categorias

### 🏢 Gestão de Moradores e Unidades
- **Cadastro de Moradores**: Informações completas e status
- **Gestão de Unidades**: Apartamentos, blocos, andares
- **Prestadores de Serviço**: Cadastro de empresas terceirizadas
- **Controle de Visitantes**: Registro de entrada e saída

### 📅 Sistema de Reservas
- **Áreas Comuns**: Salão, churrasqueira, quadra, piscina
- **Agendamento**: Sistema de calendário
- **Confirmações**: Status de reservas e notificações

### ⚠️ Gestão de Ocorrências
- **Registro Detalhado**: Tipo, descrição, morador envolvido
- **Acompanhamento**: Status e histórico
- **Relatórios**: Dados para análise

### 📢 Sistema de Comunicação
- **Avisos**: Publicação com prioridades (alta, média, baixa)
- **Quadro de Avisos**: Visualização organizada
- **E-mails**: Sistema de envio automático
- **Notificações**: Alertas em tempo real

### 🏗️ Gestão de Patrimônio
- **Inventário**: Cadastro de bens e equipamentos
- **Categorização**: Organização por tipo e localização
- **Controle de Valor**: Acompanhamento financeiro

### 🔧 Ordem de Serviço
- **Solicitações**: Registro de demandas
- **Prestadores**: Atribuição de serviços
- **Acompanhamento**: Status e prazos

### 🔍 Sistema de Auditoria
- **Logs Detalhados**: Registro de todas as ações
- **Rastreabilidade**: Usuário, data, IP, tabela afetada
- **Exportação**: Relatórios em CSV/JSON
- **Estatísticas**: Métricas de uso do sistema

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica moderna
- **CSS3**: Gradientes, animações, glassmorphism
- **JavaScript ES6+**: Classes, async/await, módulos
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Inter

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **CORS**: Controle de acesso
- **Helmet**: Segurança HTTP
- **JWT**: Autenticação por tokens

### Banco de Dados
- **SQLite**: Banco leve e portável
- **JSON**: Dados em memória para desenvolvimento

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 14.0.0 ou superior
- NPM ou Yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/evemind.git
cd evemind

# Instale as dependências
cd backend
npm install

# Inicie o servidor
npm start
```

### Acesso ao Sistema
```
URL: http://localhost:3000
```

### Credenciais de Acesso
- **Empresa**: Condomínio Residencial Jardim
- **Email**: admin@condominio.com
- **Senha**: senha123

## 🎯 Funcionalidades por Módulo

### 👤 Usuários e Permissões
- Cadastro de usuários com funções específicas
- Controle granular de permissões por módulo
- Gestão de empresas e grupos
- Auditoria completa de ações

### 🏠 Moradores e Unidades
- Cadastro completo de moradores
- Gestão de apartamentos e blocos
- Controle de prestadores de serviço
- Histórico de atividades

### 📅 Reservas e Agendamentos
- Sistema de reservas para áreas comuns
- Calendário de disponibilidade
- Confirmações automáticas
- Controle de conflitos

### 📢 Comunicação
- Sistema de avisos com prioridades
- Quadro de avisos digital
- Envio de e-mails automáticos
- Notificações push

### 🔧 Manutenção e Serviços
- Ordens de serviço
- Controle de prestadores
- Gestão de patrimônio
- Relatórios de manutenção

### 🔍 Auditoria e Relatórios
- Logs detalhados de todas as ações
- Exportação de dados
- Estatísticas de uso
- Rastreabilidade completa

## 🎨 Design e Interface

### Características Visuais
- **Gradientes Animados**: Backgrounds com movimento suave
- **Glassmorphism**: Efeitos de vidro e transparência
- **Animações CSS**: Transições suaves e interativas
- **Tipografia Moderna**: Font Inter para melhor legibilidade
- **Cores Vibrantes**: Paleta de cores moderna e profissional

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablets e desktops
- **Touch Friendly**: Interface otimizada para toque

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
evemind/
├── frontend/
│   ├── index.html          # Interface principal
│   └── styles.css          # Estilos e animações
├── backend/
│   ├── server.js           # Servidor principal
│   ├── routes/             # Rotas da API
│   │   ├── auth.js         # Autenticação
│   │   ├── usuarios.js     # Gestão de usuários
│   │   ├── empresas.js     # Gestão de empresas
│   │   ├── permissoes.js   # Controle de permissões
│   │   ├── auditoria.js    # Sistema de logs
│   │   ├── moradores.js    # Gestão de moradores
│   │   ├── avisos.js       # Sistema de avisos
│   │   ├── reservas.js     # Gestão de reservas
│   │   └── ocorrencias.js  # Gestão de ocorrências
│   ├── config.js           # Configurações
│   └── package.json        # Dependências
├── scripts/
│   └── script.js           # JavaScript principal
└── README.md               # Documentação
```

### Scripts Disponíveis
```bash
npm start          # Inicia o servidor
npm run dev        # Modo desenvolvimento com nodemon
npm test           # Executa os testes
```

### API Endpoints
```
GET    /api/usuarios        # Listar usuários
POST   /api/usuarios        # Criar usuário
PUT    /api/usuarios/:id    # Atualizar usuário
DELETE /api/usuarios/:id     # Deletar usuário

GET    /api/empresas        # Listar empresas
POST   /api/empresas        # Criar empresa
PUT    /api/empresas/:id    # Atualizar empresa
DELETE /api/empresas/:id    # Deletar empresa

GET    /api/permissoes      # Listar permissões
POST   /api/permissoes      # Criar permissão
PUT    /api/permissoes/:id  # Atualizar permissão
DELETE /api/permissoes/:id  # Deletar permissão

GET    /api/auditoria       # Listar logs
GET    /api/auditoria/export # Exportar logs
POST   /api/auditoria       # Criar log
```

## 🔒 Segurança

### Medidas Implementadas
- **Helmet.js**: Headers de segurança HTTP
- **CORS**: Controle de origem das requisições
- **Validação**: Sanitização de dados de entrada
- **Auditoria**: Logs de todas as ações
- **Autenticação**: Sistema de login seguro

### Controle de Acesso
- **Permissões Granulares**: Controle por módulo e ação
- **Funções**: Administrador, Síndico, Porteiro, Morador
- **Empresas**: Isolamento por empresa
- **Sessões**: Controle de tempo de sessão

## 📊 Métricas e Analytics

### Dashboard de Estatísticas
- **Usuários Ativos**: Contagem em tempo real
- **Avisos Publicados**: Total de avisos ativos
- **Reservas do Dia**: Agendamentos do dia atual
- **Ocorrências**: Total de problemas registrados

### Sistema de Auditoria
- **Logs Detalhados**: Data, usuário, ação, tabela, IP
- **Estatísticas**: Ações mais comuns, tabelas mais acessadas
- **Exportação**: Relatórios em CSV e JSON
- **Filtros**: Por usuário, ação, data, tabela

## 🚀 Próximas Funcionalidades

### Em Desenvolvimento
- [ ] Sistema de notificações push
- [ ] Integração com WhatsApp
- [ ] Relatórios avançados
- [ ] Backup automático
- [ ] API REST completa
- [ ] Aplicativo mobile

### Planejadas
- [ ] Integração com sistemas de pagamento
- [ ] Chat interno
- [ ] Sistema de votação online
- [ ] Integração com câmeras de segurança
- [ ] IA para análise de dados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 🔧 Enviar pull requests
- 📖 Melhorar a documentação