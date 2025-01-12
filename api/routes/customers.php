<?php
return [
    'GET' => function($db) {
        $stmt = $db->query("SELECT * FROM customers");
        return $stmt->fetchAll();
    },
    
    'POST' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $db->insert('customers', [
            'id' => uniqid(),
            'representative_id' => $data['representative_id'],
            'name' => $data['name'],
            'document_type' => $data['document_type'],
            'document' => $data['document'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address' => json_encode($data['address']),
            'consumption_info' => json_encode($data['consumption_info']),
            'installation_info' => json_encode($data['installation_info']),
            'generation_type' => $data['generation_type']
        ]);
        return ['id' => $id];
    },
    
    'PUT' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'];
        $db->update('customers', $id, $data);
        return ['success' => true];
    },
    
    'DELETE' => function($db) {
        $id = $_GET['id'];
        $db->delete('customers', $id);
        return ['success' => true];
    }
];