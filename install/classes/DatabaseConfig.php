<?php
class DatabaseConfig {
    private $host;
    private $name;
    private $user;
    private $pass;
    private $logger;

    public function __construct($host, $name, $user, $pass) {
        $this->host = $host;
        $this->name = $name;
        $this->user = $user;
        $this->pass = $pass;
        $this->logger = new Logger();
    }

    public function validate() {
        // Validação básica
        if (empty($this->host) || empty($this->name) || 
            empty($this->user) || empty($this->pass)) {
            return false;
        }

        // Testa a conexão
        try {
            $dsn = "mysql:host={$this->host}";
            $pdo = new PDO($dsn, $this->user, $this->pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Tenta criar o banco se não existir
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$this->name}`");
            
            // Testa conexão com o banco
            $pdo = new PDO(
                "mysql:host={$this->host};dbname={$this->name}",
                $this->user,
                $this->pass
            );
            
            return true;
        } catch (PDOException $e) {
            $this->logger->error("Database connection failed: " . $e->getMessage());
            return false;
        }
    }

    public function saveConfig() {
        $config = [
            'DB_HOST' => $this->host,
            'DB_NAME' => $this->name,
            'DB_USER' => $this->user,
            'DB_PASS' => $this->pass
        ];

        // Salva em session para o instalador
        $_SESSION['db_config'] = $config;

        // Cria/atualiza arquivo .env
        $envPath = dirname(__DIR__, 2) . '/.env';
        $envContent = "";
        foreach ($config as $key => $value) {
            $envContent .= "{$key}={$value}\n";
        }

        file_put_contents($envPath, $envContent);
        return true;
    }
}