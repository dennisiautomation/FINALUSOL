<?php
require_once __DIR__ . '/DatabaseTester.php';

class Installer {
    private $errors = [];
    private $dbTester;

    public function __construct() {
        $this->dbTester = new DatabaseTester();
    }

    public function testDatabase($host, $name, $user, $pass) {
        try {
            if ($this->dbTester->test($host, $name, $user, $pass)) {
                $_SESSION['db_config'] = [
                    'host' => $host,
                    'name' => $name,
                    'user' => $user,
                    'pass' => $pass
                ];
                return true;
            }
            $this->errors = array_merge($this->errors, $this->dbTester->getErrors());
            return false;
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
            error_log("[Installer Error] " . $e->getMessage());
            return false;
        }
    }

    // ... resto do código da classe Installer permanece igual ...
}