<?php
require_once 'api/Database.php';

try {
    $db = Database::getInstance();
    $result = $db->query("SELECT 1")->fetch();
    echo json_encode([
        'success' => true,
        'message' => 'Database connection successful'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}