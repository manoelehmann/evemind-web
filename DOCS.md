## Evemind – Documentação Técnica

### 1. Visão Geral

**Evemind** é um sistema web para gestão de condomínios, com foco em:

- **Gestão Operacional**: moradores, unidades, reservas, visitantes, ocorrências, ordens de serviço, patrimônio.
- **Comunicação**: avisos, quadro de avisos, e-mails.
- **Governança**: usuários, permissões, empresas, auditoria.

O sistema é composto por um **frontend** em HTML/CSS/JavaScript e um **backend** em Node.js/Express com APIs REST.

---

### 2. Arquitetura do Projeto

Estrutura principal:

```text
evemind/
├── frontend/
│   ├── index.html          # Interface principal (SPA)
│   └── styles.css          # Estilos e animações
├── backend/
│   ├── server.js           # Servidor Express principal
│   ├── config.js           # Configurações (porta, JWT, etc.)
│   ├── routes/             # Rotas da API (módulos de negócio)
│   │   ├── auth.js         # Autenticação (JWT)
│   │   ├── usuarios.js     # Gestão de usuários
│   │   ├── empresas.js     # Gestão de empresas
│   │   ├── permissoes.js   # Controle de permissões
│   │   ├── auditoria.js    # Logs e estatísticas
│   │   ├── moradores.js    # Gestão de moradores
│   │   ├── unidades.js     # Unidades/apartamentos
│   │   ├── prestadores.js  # Prestadores de serviço
│   │   ├── reservas.js     # Reservas de áreas comuns
│   │   ├── avisos.js       # Sistema de avisos
│   │   ├── quadro-avisos.js# Quadro de avisos
│   │   ├── visitantes.js   # Controle de visitantes
│   │   ├── patrimonio.js   # Patrimônio
│   │   ├── eventos.js      # Eventos
│   │   ├── reunioes.js     # Reuniões
│   │   ├── atas.js         # Atas
│   │   ├── agendamentos.js # Agendamentos
│   │   ├── ocorrencias.js  # Ocorrências
│   │   ├── orcamento-compras.js
│   │   ├── orcamento-servicos.js
│   │   ├── funcionarios.js
│   │   ├── documentos.js
│   │   ├── grupos.js
│   │   ├── funcoes.js
│   │   ├── database.js     # Utilitários de banco de dados
│   │   └── ...
│   └── package.json        # Dependências do backend
├── scripts/
│   └── script.js           # Lógica da SPA (classe CondominioSystem)
├── README.md               # Visão geral do produto
└── DOCS.md                 # Este documento técnico
```

**Tecnologias principais**:

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Font Awesome, Google Fonts.
- **Backend**: Node.js, Express.js, CORS, Helmet, JWT.
- **Dados**: Arrays em memória (mock) para demonstração; preparado para evoluir para banco real.

---

### 3. Backend – Servidor e Middlewares

Arquivo `backend/server.js`:

- Cria a aplicação Express.
- Configura segurança com **Helmet** (CSP, fontes/scripts confiáveis).
- Ativa **CORS** e parsers `JSON/urlencoded`.
- Expõe o frontend como estático:
  - `/` → `frontend/index.html`
  - `/scripts` → `scripts/`
- Registra todas as rotas da API sob `/api/...`.
- Middlewares de:
  - **Erro 500** (retorna JSON padrão).
  - **404** para qualquer rota não encontrada (`/api` e demais).

**URL base da API**: `http://localhost:3000/api-docs`  
Por padrão (config.js), `http://localhost:3000/api-docs`.

---

### 4. Frontend – SPA e Integração com a API

#### 4.1. Estrutura Geral

- `frontend/index.html`:
  - Tela de login (empresa, e-mail, senha).
  - Layout principal com sidebar (Dashboard, Moradores, Unidades, Reservas, Avisos, Ocorrências, Visitantes, Patrimônio, Auditoria, Usuários, Permissões, Empresas, etc.).
  - Cada seção é um `<section>` com `id` correspondente ao módulo.

- `scripts/script.js`:
  - Classe `CondominioSystem` centraliza:
    - Navegação (menu lateral).
    - Gestão de modais de cadastro/edição.
    - Atualização de tabelas/cards.
    - Integração com a API via `fetch`.

#### 4.2. Helper de API

O frontend consome o backend via helper padronizado:

```javascript
async apiCall(endpoint, method = 'GET', data = null) {
    const baseURL = window.location.origin;
    const url = `${baseURL}/api${endpoint}`;

    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Erro na requisição');
    }

    return result;
}
```

Uso típico:

- Listar moradores: `apiCall('/moradores')`
- Criar morador: `apiCall('/moradores', 'POST', moradorData)`
- Atualizar morador: `apiCall('/moradores/1', 'PUT', moradorData)`
- Excluir morador: `apiCall('/moradores/1', 'DELETE')`

---

### 5. Fluxo de Autenticação

#### 5.1. Backend (`/api/auth`)

Rota em `backend/routes/auth.js` utilizando **bcrypt** e **JWT**.

- **POST `/api/auth/login`**
  - **Body**:
    ```json
    {
      "email": "admin@condominio.com",
      "password": "senha123"
    }
    ```
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Login realizado com sucesso",
      "data": {
        "token": "JWT_TOKEN_AQUI",
        "user": {
          "id": 1,
          "email": "admin@condominio.com",
          "name": "Administrador",
          "role": "admin"
        }
      }
    }
    ```

- **GET `/api/auth/verify`**
  - Lê `Authorization: Bearer <token>` e, se válido, retorna os dados do usuário embutidos no token.

- **POST `/api/auth/logout`**
  - Apenas responde com sucesso (não mantém sessão server-side).

> Observação: o frontend atualmente realiza um login simulado (hardcoded). A integração total com o JWT pode ser feita reaproveitando essas rotas e armazenando o token no cliente (ex.: `localStorage` ou `sessionStorage`).

---

### 6. Padrão Geral das APIs REST

A grande maioria das rotas segue o mesmo padrão REST sobre um recurso:

- `GET    /api/recurso`          → Lista todos (com filtros por query em alguns casos).
- `GET    /api/recurso/:id`      → Detalhe de um registro.
- `POST   /api/recurso`          → Cria um novo registro.
- `PUT    /api/recurso/:id`      → Atualiza um registro existente.
- `DELETE /api/recurso/:id`      → Remove um registro.

Os dados são mantidos em arrays em memória para fins de demonstração.

---

### 7. Documentação dos Principais Módulos de API

#### 7.1. Usuários – `/api/usuarios`

Arquivo: `backend/routes/usuarios.js`

- **Modelo (conceitual)**:
  ```json
  {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@condominio.com",
    "senha": "senha123",
    "funcao": "Administrador",
    "empresa": "Condomínio Residencial Jardim",
    "status": "ativo",
    "ultimoAcesso": "2024-01-15 10:30:00",
    "permissoes": ["dashboard", "moradores", "avisos", "reservas", "ocorrencias", "usuarios", "auditoria"]
  }
  ```

- **GET `/api/usuarios`**
  - Retorna todos os usuários sem o campo `senha`.

- **GET `/api/usuarios/:id`**
  - Usuário específico, também sem `senha`.

- **POST `/api/usuarios`**
  - **Body obrigatório**:
    ```json
    {
      "nome": "Novo Usuário",
      "email": "novo@condominio.com",
      "senha": "senha123",
      "funcao": "Síndico",
      "empresa": "Condomínio Residencial Jardim",
      "permissoes": ["dashboard", "moradores"]
    }
    ```
  - Valida campos obrigatórios e se o e-mail já existe.

- **PUT `/api/usuarios/:id`**
  - Atualiza nome, email, função, empresa, status e permissões.

- **DELETE `/api/usuarios/:id`**
  - Remove o usuário da lista.

---

#### 7.2. Moradores – `/api/moradores`

Arquivo: `backend/routes/moradores.js`

- **Modelo (conceitual)**:
  ```json
  {
    "id": 1,
    "nome": "João Silva",
    "apartamento": "101",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "status": "ativo",
    "dataCadastro": "2024-01-15"
  }
  ```

- **GET `/api/moradores`**
  - Lista todos os moradores.

- **GET `/api/moradores/:id`**
  - Morador pelo ID.

- **POST `/api/moradores`**
  - **Body**:
    ```json
    {
      "nome": "João Silva",
      "apartamento": "101",
      "email": "joao@email.com",
      "telefone": "(11) 99999-9999"
    }
    ```
  - Valida campos obrigatórios e garante que não exista outro morador no mesmo apartamento.

- **PUT `/api/moradores/:id`**
  - Atualiza dados básicos e status.

- **DELETE `/api/moradores/:id`**
  - Remove o morador.

No frontend, estas rotas são usadas para:

- Listar moradores na tabela da seção **Moradores**.
- Popular selects de morador em reservas e ocorrências.
- Criar/editar/excluir moradores via modais.

---

#### 7.3. Reservas – `/api/reservas`

Arquivo: `backend/routes/reservas.js`

- **Modelo (conceitual)**:
  ```json
  {
    "id": 1,
    "area": "salao-festas",
    "morador": "João Silva",
    "moradorId": 1,
    "data": "2024-12-15",
    "horario": "19:00",
    "status": "confirmada",
    "dataReserva": "2024-12-10"
  }
  ```

- **GET `/api/reservas`**
  - Suporta filtros:
    - `?data=YYYY-MM-DD`
    - `?area=salao-festas|churrasqueira|piscina|quadra`
    - `?status=confirmada|...`

- **GET `/api/reservas/:id`**
  - Reserva específica.

- **POST `/api/reservas`**
  - **Body**:
    ```json
    {
      "area": "salao-festas",
      "moradorId": 1,
      "data": "2024-12-15",
      "horario": "19:00"
    }
    ```
  - Valida:
    - Campos obrigatórios.
    - Área válida.
    - Conflito de reserva (mesma área + data + horário com status `confirmada`).

- **PUT `/api/reservas/:id`**
  - Atualiza área, moradorId, data, horário e status.

- **DELETE `/api/reservas/:id`**
  - Remove a reserva.

- **GET `/api/reservas/areas/disponiveis`**
  - Retorna mapa com as áreas possíveis:
    ```json
    {
      "salao-festas": "Salão de Festas",
      "churrasqueira": "Churrasqueira",
      "piscina": "Piscina",
      "quadra": "Quadra"
    }
    ```

---

#### 7.4. Avisos – `/api/avisos`

Arquivo: `backend/routes/avisos.js`

- **Modelo (conceitual)**:
  ```json
  {
    "id": 1,
    "titulo": "Manutenção do Elevador",
    "descricao": "Texto do aviso...",
    "prioridade": "alta",
    "data": "2024-12-10",
    "ativo": true,
    "autor": "Administrador"
  }
  ```

- **GET `/api/avisos`**
  - Filtros opcionais:
    - `?ativo=true|false`
    - `?prioridade=baixa|media|alta`

- **GET `/api/avisos/:id`**
  - Aviso específico.

- **POST `/api/avisos`**
  - **Body**:
    ```json
    {
      "titulo": "Título do aviso",
      "descricao": "Descrição",
      "prioridade": "alta"
    }
    ```
  - Servidor preenche `data`, `ativo: true`, `autor`.

- **PUT `/api/avisos/:id`**
  - Atualiza título, descrição, prioridade e ativo.

- **DELETE `/api/avisos/:id`**
  - Remove aviso da lista.

---

#### 7.5. Auditoria – `/api/auditoria`

Arquivo: `backend/routes/auditoria.js`

- **Modelo (conceitual)**:
  ```json
  {
    "id": 1,
    "dataHora": "2024-01-15 10:30:00",
    "usuario": "admin@condominio.com",
    "acao": "Login",
    "tabela": "Usuarios",
    "registro": "ID: 1",
    "ip": "192.168.1.100",
    "detalhes": "Login realizado com sucesso"
  }
  ```

- **GET `/api/auditoria`**
  - Query params:
    - `page` (padrão 1), `limit` (padrão 50)
    - `usuario`, `acao`, `tabela`, `dataInicio`, `dataFim`
  - **Resposta**:
    ```json
    {
      "success": true,
      "data": [ /* logs filtrados */ ],
      "pagination": {
        "page": 1,
        "limit": 50,
        "total": 123,
        "pages": 3
      }
    }
    ```

- **GET `/api/auditoria/export?formato=csv|json`**
  - `formato=csv`: retorna arquivo CSV para download.
  - `formato=json` (ou não informado): retorna JSON com os logs e `exportadoEm`.

- **POST `/api/auditoria`**
  - Cria um novo log:
    ```json
    {
      "usuario": "admin@condominio.com",
      "acao": "CREATE",
      "tabela": "moradores",
      "registro": "ID: 5",
      "ip": "192.168.1.100",
      "detalhes": "Novo morador cadastrado"
    }
    ```

- **GET `/api/auditoria/stats`**
  - Retorna estatísticas de uso:
    - Total de logs, logs de hoje, quantidade de usuários únicos, ações mais comuns e tabelas mais acessadas.

---

### 8. Demais Módulos da API

Existem outros módulos já criados em `backend/routes/` que seguem o mesmo padrão REST descrito acima. Exemplos:

- **Unidades** – `/api/unidades`
- **Prestadores** – `/api/prestadores`
- **Visitantes** – `/api/visitantes`
- **Patrimônio** – `/api/patrimonio`
- **Quadro de Avisos** – `/api/quadro-avisos`
- **Empresas** – `/api/empresas`
- **Permissões** – `/api/permissoes`
- **Eventos, Reuniões, Atas, Agendamentos**
- **Orçamentos de Compras e Serviços** – `/api/orcamento-compras`, `/api/orcamento-servicos`
- **Funcionários, Documentos, Grupos, Funções**, etc.

Cada um possui:

- `GET /api/modulo`
- `GET /api/modulo/:id`
- `POST /api/modulo`
- `PUT /api/modulo/:id`
- `DELETE /api/modulo/:id`

com campos específicos ao domínio (descritos diretamente nos arquivos de rota).

---

### 9. Execução e Ambiente

- **Instalação do backend**:
  ```bash
  cd backend
  npm install
  npm start
  ```

- **Acesso**:
  - Aplicação web: `http://localhost:3000`
  - API base: `http://localhost:3000/api`

- **Credenciais de demonstração**:
  - Empresa: `Condomínio Residencial Jardim`
  - Email: `admin@condominio.com`
  - Senha: `senha123`

---

### 10. Evoluções Futuras

O código já está preparado para:

- Trocar os arrays em memória por um banco de dados real (ex.: SQLite, PostgreSQL, etc.).
- Conectar o login do frontend ao fluxo JWT do backend.
- Registrar automaticamente logs de auditoria a cada operação em módulos críticos.
- Expandir o controle de permissões por módulo/ação usando o conteúdo de `/api/permissoes`.

Este `DOCS.md` serve como base técnica para manutenção, integração com outros sistemas e futura publicação de uma documentação pública de API (ex.: Swagger/OpenAPI).


