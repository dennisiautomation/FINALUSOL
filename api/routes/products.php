<?php
return [
    'GET' => function($db) {
        $stmt = $db->query("SELECT * FROM products");
        return $stmt->fetchAll();
    },
    
    'POST' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $db->insert('products', [
            'id' => uniqid(),
            'type' => $data['type'],
            'model' => $data['model'],
            'manufacturer' => $data['manufacturer'],
            'description' => $data['description'],
            'price' => $data['price'],
            'warranty' => $data['warranty'],
            'specifications' => json_encode($data['specifications'])
        ]);
        return ['id' => $id];
    },
    
    'PUT' => function($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'];
        $db->update('products', $id, $data);
        return ['success' => true];
    },
    
    'DELETE' => function($db) {
        $id = $_GET['id'];
        $db->delete('products', $id);
        return ['success' => true];
    }
];