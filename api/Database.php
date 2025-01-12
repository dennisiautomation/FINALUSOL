<?php
class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $config = require 'config.php';
        
        try {
            $dsn = sprintf(
                "mysql:host=%s;dbname=%s;charset=%s",
                $config['db']['host'],
                $config['db']['name'],
                $config['db']['charset']
            );
            
            $this->connection = new PDO(
                $dsn,
                $config['db']['user'],
                $config['db']['pass'],
                $config['db']['options']
            );
        } catch (PDOException $e) {
            error_log("Connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed. Please try again later.");
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function query($sql, $params = []) {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            error_log("Query failed: " . $e->getMessage());
            throw new Exception("Database query failed. Please try again later.");
        }
    }
}