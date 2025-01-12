<?php
// Configurações do banco de dados
$config = [
    'host' => '77.37.43.78',
    'name' => 'u850202022_Usolproducao',
    'user' => 'u850202022_Usolproducao',
    'pass' => 'Laura0202@@@'
];

// Função para log
function log_message($message) {
    echo $message . "\n";
    error_log($message);
}

try {
    // 1. Teste de conexão inicial
    log_message("Testando conexão com o banco de dados...");
    $pdo = new PDO(
        "mysql:host={$config['host']};charset=utf8mb4",
        $config['user'],
        $config['pass'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]
    );
    log_message("✓ Conexão estabelecida com sucesso");

    // 2. Criar banco se não existir
    log_message("Criando banco de dados...");
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$config['name']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    log_message("✓ Banco de dados criado/verificado");

    // 3. Conectar ao banco específico
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['name']};charset=utf8mb4",
        $config['user'],
        $config['pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // 4. Criar tabelas
    log_message("Criando tabelas...");
    
    // Users
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'representative') NOT NULL,
        region VARCHAR(100),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Customers
    $pdo->exec("CREATE TABLE IF NOT EXISTS customers (
        id VARCHAR(36) PRIMARY KEY,
        representative_id VARCHAR(36) NOT NULL,
        name VARCHAR(100) NOT NULL,
        document_type ENUM('cpf', 'cnpj') NOT NULL,
        document VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address_street VARCHAR(100) NOT NULL,
        address_number VARCHAR(20) NOT NULL,
        address_complement VARCHAR(100),
        address_neighborhood VARCHAR(100) NOT NULL,
        address_city VARCHAR(100) NOT NULL,
        address_state CHAR(2) NOT NULL,
        address_zipcode VARCHAR(10) NOT NULL,
        consumption_average DECIMAL(10,2) NOT NULL,
        tariff_type ENUM('residential', 'commercial', 'rural', 'industrial') NOT NULL,
        power_company VARCHAR(100) NOT NULL,
        voltage ENUM('110', '220', '380') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (representative_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Products
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        type ENUM('solar_panel', 'inverter', 'structure', 'cables', 'string_box', 'other') NOT NULL,
        model VARCHAR(100) NOT NULL,
        manufacturer VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        warranty INT NOT NULL,
        specifications JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by VARCHAR(36) NOT NULL,
        FOREIGN KEY (created_by) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Proposals
    $pdo->exec("CREATE TABLE IF NOT EXISTS proposals (
        id VARCHAR(36) PRIMARY KEY,
        customer_id VARCHAR(36) NOT NULL,
        representative_id VARCHAR(36) NOT NULL,
        status ENUM('draft', 'sent', 'pending_financing', 'accepted', 'completed', 'rejected') NOT NULL,
        total_value DECIMAL(10,2) NOT NULL,
        notes TEXT,
        valid_until DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (representative_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Proposal Items
    $pdo->exec("CREATE TABLE IF NOT EXISTS proposal_items (
        id VARCHAR(36) PRIMARY KEY,
        proposal_id VARCHAR(36) NOT NULL,
        product_id VARCHAR(36) NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (proposal_id) REFERENCES proposals(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Criar índices
    log_message("Criando índices...");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_customers_representative ON customers(representative_id)");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_proposals_customer ON proposals(customer_id)");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_proposals_representative ON proposals(representative_id)");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_proposal_items_proposal ON proposal_items(proposal_id)");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_products_type ON products(type)");

    // 5. Criar usuário admin padrão
    log_message("Criando usuário admin...");
    $adminId = bin2hex(random_bytes(16));
    $adminPassword = 'admin123!@#';
    $adminPasswordHash = password_hash($adminPassword, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT IGNORE INTO users (id, name, email, password_hash, role, active) VALUES (?, ?, ?, ?, 'admin', 1)");
    $stmt->execute([$adminId, 'Admin', 'admin@usol.com.br', $adminPasswordHash]);

    log_message("✓ Configuração concluída com sucesso!");
    log_message("\nCredenciais do admin:");
    log_message("Email: admin@usol.com.br");
    log_message("Senha: admin123!@#");

} catch (Exception $e) {
    log_message("❌ Erro: " . $e->getMessage());
    exit(1);
}