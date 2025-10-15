// Configurações do Backend
const config = {
    // Configurações do servidor
    server: {
        port: 3000,
        host: 'localhost'
    },
    
    // Configurações do banco de dados (para futuras implementações)
    database: {
        type: 'sqlite',
        filename: './database.sqlite',
        // Para MySQL/PostgreSQL:
        // host: 'localhost',
        // port: 3306,
        // username: 'root',
        // password: '',
        // database: 'evemind'
    },
    
    // Configurações de autenticação
    auth: {
        jwtSecret: 'evemind-secret-key',
        tokenExpiration: '24h'
    },
    
    // Configurações de email (para futuras implementações)
    email: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    },
    
    // Configurações de upload de arquivos
    upload: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
    }
};

module.exports = config;

