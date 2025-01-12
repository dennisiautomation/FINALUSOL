<?php
class DatabaseService {
    private $db;

    public function __construct() {
        $config = require 'config.php';
        try {
            $this->db = new PDO(
                "mysql:host={$config['db']['host']};dbname={$config['db']['name']};charset=utf8mb4",
                $config['db']['user'],
                $config['db']['pass'],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            throw new Exception("Connection failed: " . $e->getMessage());
        }
    }

    public function query($sql, $params = []) {
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            throw new Exception("Query failed: " . $e->getMessage());
        }
    }

    public function insert($table, $data) {
        $fields = array_keys($data);
        $values = array_fill(0, count($fields), '?');
        
        $sql = sprintf(
            "INSERT INTO %s (%s) VALUES (%s)",
            $table,
            implode(', ', $fields),
            implode(', ', $values)
        );

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute(array_values($data));
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            throw new Exception("Insert failed: " . $e->getMessage());
        }
    }

    public function update($table, $id, $data) {
        $fields = array_map(function($field) {
            return "$field = ?";
        }, array_keys($data));
        
        $sql = sprintf(
            "UPDATE %s SET %s WHERE id = ?",
            $table,
            implode(', ', $fields)
        );

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([...array_values($data), $id]);
            return true;
        } catch (PDOException $e) {
            throw new Exception("Update failed: " . $e->getMessage());
        }
    }

    public function delete($table, $id) {
        $sql = "DELETE FROM $table WHERE id = ?";
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$id]);
            return true;
        } catch (PDOException $e) {
            throw new Exception("Delete failed: " . $e->getMessage());
        }
    }

    public function beginTransaction() {
        return $this->db->beginTransaction();
    }

    public function commit() {
        return $this->db->commit();
    }

    public function rollback() {
        return $this->db->rollBack();
    }
}