<?php
class DatabaseTester {
    private $errors = [];
    private $debug = true; // Ativar para desenvolvimento

    public function test($host, $name, $user, $pass) {
        if ($this->debug) {
            ini_set('display_errors', 1);
            error_reporting(E_ALL);
        }

        // Validação básica dos parâmetros
        if (empty($host) || empty($name) || empty($user)) {
            $this->errors[] = "Todos os campos são obrigatórios";
            return false;
        }

        try {
            // 1. Teste de conexão básica
            $pdo = $this->testBasicConnection($host, $user, $pass);
            if (!$pdo) return false;

            // 2. Teste de criação do banco
            $success = $this->createDatabaseIfNotExists($pdo, $name);
            if (!$success) return false;

            // 3. Teste de conexão com o banco específico
            $dbPdo = $this->testDatabaseConnection($host, $name, $user, $pass);
            if (!$dbPdo) return false;

            return true;

        } catch (Exception $e) {
            $this->logError($e);
            return false;
        }
    }

    private function testBasicConnection($host, $user, $pass) {
        try {
            $dsn = "mysql:host=$host;charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];

            $pdo = new PDO($dsn, $user, $pass, $options);
            return $pdo;

        } catch (PDOException $e) {
            $this->errors[] = "Erro de conexão: " . $this->formatError($e);
            $this->logError($e);
            return false;
        }
    }

    private function createDatabaseIfNotExists($pdo, $name) {
        try {
            // Sanitiza o nome do banco
            $name = preg_replace('/[^A-Za-z0-9_-]/', '', $name);
            
            $sql = "CREATE DATABASE IF NOT EXISTS `$name` 
                   CHARACTER SET utf8mb4 
                   COLLATE utf8mb4_unicode_ci";
            
            $pdo->exec($sql);
            return true;

        } catch (PDOException $e) {
            $this->errors[] = "Erro ao criar banco: " . $this->formatError($e);
            $this->logError($e);
            return false;
        }
    }

    private function testDatabaseConnection($host, $name, $user, $pass) {
        try {
            $dsn = "mysql:host=$host;dbname=$name;charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];

            $pdo = new PDO($dsn, $user, $pass, $options);
            
            // Testa permissões
            $pdo->query("SELECT 1");
            
            return $pdo;

        } catch (PDOException $e) {
            $this->errors[] = "Erro ao conectar ao banco: " . $this->formatError($e);
            $this->logError($e);
            return false;
        }
    }

    private function formatError(PDOException $e) {
        $message = $e->getMessage();
        // Remove informações sensíveis
        $message = preg_replace('/SQLSTATE\[\d+\]/', '', $message);
        return $message;
    }

    private function logError($e) {
        $logMessage = sprintf(
            "[%s] Database Error: %s in %s:%d\n",
            date('Y-m-d H:i:s'),
            $e->getMessage(),
            $e->getFile(),
            $e->getLine()
        );
        error_log($logMessage);
    }

    public function getErrors() {
        return $this->errors;
    }
}