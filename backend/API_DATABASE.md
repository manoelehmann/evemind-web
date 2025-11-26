# Sistema de Banco de Dados Interno - Evemind

Este documento descreve como usar o sistema de banco de dados interno do Evemind, que funciona completamente em memória com persistência opcional em arquivo JSON.

## Características

- ✅ **Sem dependências externas**: Não usa MySQL, SQLite ou outros bancos
- ✅ **Persistência opcional**: Dados salvos em arquivo JSON
- ✅ **CRUD completo**: Create, Read, Update, Delete
- ✅ **API REST**: Endpoints padronizados
- ✅ **Auditoria automática**: Registra todas as operações
- ✅ **Filtros e paginação**: Busca avançada
- ✅ **Validação**: Middlewares de validação

## Tabelas Disponíveis

- `moradores` - Dados dos moradores do condomínio
- `avisos` - Avisos e comunicados
- `reservas` - Reservas de espaços comuns
- `ocorrencias` - Ocorrências e manutenções
- `usuarios` - Usuários do sistema
- `empresas` - Empresas prestadoras de serviço
- `permissoes` - Permissões do sistema
- `auditoria` - Log de todas as operações

## Endpoints da API

### Informações Gerais

#### Listar Tabelas
```http
GET /api/database/tables
```

#### Estatísticas do Sistema
```http
GET /api/database/stats
```

#### Exemplos de Uso
```http
GET /api/database/examples
```

### Operações CRUD

#### 1. Listar Registros

**Listar todos os registros:**
```http
GET /api/database/moradores
```

**Listar com paginação:**
```http
GET /api/database/moradores?page=1&limit=10
```

**Listar com filtros:**
```http
GET /api/database/moradores?ativo=true&bloco=A
```

**Contar registros:**
```http
GET /api/database/moradores/count
```

#### 2. Buscar Registro por ID

```http
GET /api/database/moradores/1
```

#### 3. Buscar por Campo Específico

```http
GET /api/database/moradores/search/nome/João
```

#### 4. Criar Novo Registro

```http
POST /api/database/moradores
Content-Type: application/json

{
    "nome": "Maria Silva",
    "apartamento": "202",
    "bloco": "B",
    "telefone": "(11) 88888-8888",
    "email": "maria@email.com",
    "dataEntrada": "2023-12-01",
    "ativo": true
}
```

#### 5. Atualizar Registro (Completo)

```http
PUT /api/database/moradores/1
Content-Type: application/json

{
    "nome": "João Silva Santos",
    "apartamento": "101",
    "bloco": "A",
    "telefone": "(11) 99999-0000",
    "email": "joao.novo@email.com",
    "dataEntrada": "2023-01-15",
    "ativo": true
}
```

#### 6. Atualização Parcial

```http
PATCH /api/database/moradores/1
Content-Type: application/json

{
    "telefone": "(11) 99999-0000",
    "email": "joao.novo@email.com"
}
```

#### 7. Excluir Registro

```http
DELETE /api/database/moradores/1
```

### Operações Especiais

#### Criar Backup
```http
POST /api/database/backup
```

#### Limpar Todos os Dados (CUIDADO!)
```http
DELETE /api/database/clear?confirm=true
```

## Exemplos Práticos

### 1. Gerenciar Moradores

**Criar um novo morador:**
```bash
curl -X POST http://localhost:3000/api/database/moradores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Costa",
    "apartamento": "303",
    "bloco": "C",
    "telefone": "(11) 77777-7777",
    "email": "ana@email.com",
    "dataEntrada": "2023-12-01",
    "ativo": true
  }'
```

**Listar moradores ativos do bloco A:**
```bash
curl "http://localhost:3000/api/database/moradores?ativo=true&bloco=A"
```

**Atualizar telefone de um morador:**
```bash
curl -X PATCH http://localhost:3000/api/database/moradores/1 \
  -H "Content-Type: application/json" \
  -d '{"telefone": "(11) 99999-1111"}'
```

### 2. Gerenciar Avisos

**Criar um novo aviso:**
```bash
curl -X POST http://localhost:3000/api/database/avisos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Reunião de Condomínio",
    "conteudo": "Reunião ordinária marcada para o dia 20/12/2023 às 19h.",
    "dataInicio": "2023-12-15",
    "dataFim": "2023-12-25",
    "prioridade": "media",
    "ativo": true
  }'
```

**Listar avisos ativos de alta prioridade:**
```bash
curl "http://localhost:3000/api/database/avisos?ativo=true&prioridade=alta"
```

### 3. Gerenciar Reservas

**Criar uma nova reserva:**
```bash
curl -X POST http://localhost:3000/api/database/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "moradorId": 1,
    "espaco": "Churrasqueira",
    "dataReserva": "2023-12-31",
    "horarioInicio": "18:00",
    "horarioFim": "22:00",
    "status": "pendente",
    "observacoes": "Festa de Ano Novo"
  }'
```

**Listar reservas confirmadas:**
```bash
curl "http://localhost:3000/api/database/reservas?status=confirmada"
```

### 4. Gerenciar Ocorrências

**Criar uma nova ocorrência:**
```bash
curl -X POST http://localhost:3000/api/database/ocorrencias \
  -H "Content-Type: application/json" \
  -d '{
    "moradorId": 1,
    "tipo": "manutencao",
    "descricao": "Portão automático não está funcionando",
    "prioridade": "alta",
    "status": "aberta",
    "dataOcorrencia": "2023-12-01"
  }'
```

**Listar ocorrências abertas:**
```bash
curl "http://localhost:3000/api/database/ocorrencias?status=aberta"
```

## Estrutura dos Dados

### Morador
```json
{
  "id": 1,
  "nome": "João Silva",
  "apartamento": "101",
  "bloco": "A",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "dataEntrada": "2023-01-15",
  "ativo": true,
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

### Aviso
```json
{
  "id": 1,
  "titulo": "Manutenção do Elevador",
  "conteudo": "O elevador do bloco A passará por manutenção...",
  "dataInicio": "2023-12-10",
  "dataFim": "2023-12-20",
  "prioridade": "alta",
  "ativo": true,
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

### Reserva
```json
{
  "id": 1,
  "moradorId": 1,
  "espaco": "Salão de Festas",
  "dataReserva": "2023-12-25",
  "horarioInicio": "19:00",
  "horarioFim": "23:00",
  "status": "confirmada",
  "observacoes": "Festa de Natal",
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

### Ocorrência
```json
{
  "id": 1,
  "moradorId": 1,
  "tipo": "manutencao",
  "descricao": "Vazamento no banheiro",
  "prioridade": "alta",
  "status": "aberta",
  "dataOcorrencia": "2023-12-01",
  "dataResolucao": null,
  "createdAt": "2023-12-01T10:00:00.000Z",
  "updatedAt": "2023-12-01T10:00:00.000Z"
}
```

## Respostas da API

### Sucesso
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Erro
```json
{
  "success": false,
  "error": "Descrição do erro",
  "message": "Mensagem de erro amigável"
}
```

### Paginação
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "Página 1 de 3 da tabela moradores"
}
```

## Persistência

Os dados são automaticamente salvos em `backend/data.json` sempre que houver modificações. O arquivo é criado automaticamente na primeira execução com dados de exemplo.

### Backup
Para criar um backup manual:
```bash
curl -X POST http://localhost:3000/api/database/backup
```

### Restaurar
Para restaurar dados, simplesmente substitua o arquivo `data.json` e reinicie o servidor.

## Auditoria

Todas as operações de criação, atualização e exclusão são automaticamente registradas na tabela `auditoria` com:
- Usuário que fez a operação
- Tipo de operação (CREATE, UPDATE, DELETE)
- Tabela afetada
- ID do registro
- Dados antigos e novos
- Timestamp da operação

## Segurança

- Validação de tabelas existentes
- Validação de IDs numéricos
- Confirmação obrigatória para limpeza de dados
- Middlewares de validação em todas as rotas

## Limitações

- Dados ficam em memória (limitado pela RAM)
- Não suporta transações complexas
- Não tem índices otimizados
- Não suporta relacionamentos entre tabelas
- Não tem controle de concorrência avançado

## Uso Recomendado

Este sistema é ideal para:
- Prototipagem rápida
- Aplicações pequenas a médias
- Desenvolvimento e testes
- Sistemas com poucos usuários simultâneos

Para aplicações em produção com muitos usuários, considere migrar para um banco de dados tradicional.

