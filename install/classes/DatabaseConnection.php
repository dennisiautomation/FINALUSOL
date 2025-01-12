<?php
class DatabaseConnection {
    private $logger;
    private $errors = [];
    
    public function __construct() {
        $this->logger = new Logger();
    }

    public function connect($host, $name, $user, $pass) {
        try {
            // Configurações PDO
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
                PDO::ATTR_TIMEOUT => 5
            ];

            // Primeiro tenta conectar sem selecionar o banco
            $pdo = new PDO("mysql:host=$host", $user, $pass, $options);
            
            // Depois tenta conectar ao banco específico
            $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4", $user, $pass, $options);
            
            $this->logger->info("Conexão estabelecida com sucesso");
            return true;

        } catch (PDOException $e) {
            $error = $e->getMessage();
            $this->logger->error("Erro de conexão: $error");
            $this->errors[] = $this->formatError($error);
            return false;
        }
    }

    private function formatError($error) {
        // Remove informações sensíveis do erro
        $error = preg_replace('/SQLSTATE\[\d+\]/', '', $error);
        $error = str_replace(['[', ']'], '', $error);
        return "Erro de conexão: " . trim($error);
    }

    public function getErrors() {
        return $this->errors;
    }
}