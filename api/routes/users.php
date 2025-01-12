<?php
return [
    'GET' => function($db) {
        $stmt = $db->query("SELECT * FROM users");
        return $stmt->fetchAll();
    },
    
    'POST' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $db->insert('users', [
            'id' => uniqid(),
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
            'region' => $data['region'] ?? null,
            'active' => $data['active'] ?? true
        ]);
        return ['id' => $id];
    },
    
    'PUT' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'];
        $db->update('users', $id, $data);
        return ['success' => true];
    },
    
    'DELETE' => function($db) {
        $id = $_GET['id'];
        $db->delete('users', $id);
        return ['success' => true];
    }
];