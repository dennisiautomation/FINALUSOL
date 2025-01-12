<?php
header('Content-Type: application/json');

require_once 'Database.php';

$db = Database::getInstance()->getConnection();

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$endpoint = array_shift($request);
$id = array_shift($request);

// Get JSON data for POST/PUT requests
$data = json_decode(file_get_contents('php://input'), true);

try {
    switch ($endpoint) {
        case 'users':
            handleUsers($method, $id, $data, $db);
            break;
        case 'customers':
            handleCustomers($method, $id, $data, $db);
            break;
        case 'products':
            handleProducts($method, $id, $data, $db);
            break;
        case 'proposals':
            handleProposals($method, $id, $data, $db);
            break;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function handleUsers($method, $id, $data, $db) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch());
            } else {
                $stmt = $db->query("SELECT * FROM users");
                echo json_encode($stmt->fetchAll());
            }
            break;
        case 'POST':
            $stmt = $db->prepare("INSERT INTO users (name, email, role, region, active) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$data['name'], $data['email'], $data['role'], $data['region'], $data['active']]);
            echo json_encode(['id' => $db->lastInsertId()]);
            break;
        case 'PUT':
            $stmt = $db->prepare("UPDATE users SET name = ?, email = ?, role = ?, region = ?, active = ? WHERE id = ?");
            $stmt->execute([$data['name'], $data['email'], $data['role'], $data['region'], $data['active'], $id]);
            echo json_encode(['success' => true]);
            break;
        case 'DELETE':
            $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
    }
}

function handleCustomers($method, $id, $data, $db) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM customers WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch());
            } else {
                $stmt = $db->query("SELECT * FROM customers");
                echo json_encode($stmt->fetchAll());
            }
            break;
        case 'POST':
            $stmt = $db->prepare("INSERT INTO customers (representative_id, name, document_type, document, email, phone, address, consumption_info, installation_info, generation_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['representative_id'],
                $data['name'],
                $data['document_type'],
                $data['document'],
                $data['email'],
                $data['phone'],
                json_encode($data['address']),
                json_encode($data['consumption_info']),
                json_encode($data['installation_info']),
                $data['generation_type']
            ]);
            echo json_encode(['id' => $db->lastInsertId()]);
            break;
        case 'PUT':
            $stmt = $db->prepare("UPDATE customers SET name = ?, document_type = ?, document = ?, email = ?, phone = ?, address = ?, consumption_info = ?, installation_info = ?, generation_type = ? WHERE id = ?");
            $stmt->execute([
                $data['name'],
                $data['document_type'],
                $data['document'],
                $data['email'],
                $data['phone'],
                json_encode($data['address']),
                json_encode($data['consumption_info']),
                json_encode($data['installation_info']),
                $data['generation_type'],
                $id
            ]);
            echo json_encode(['success' => true]);
            break;
        case 'DELETE':
            $stmt = $db->prepare("DELETE FROM customers WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
    }
}

function handleProducts($method, $id, $data, $db) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch());
            } else {
                $stmt = $db->query("SELECT * FROM products");
                echo json_encode($stmt->fetchAll());
            }
            break;
        case 'POST':
            $stmt = $db->prepare("INSERT INTO products (type, model, manufacturer, description, price, warranty, specifications) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['type'],
                $data['model'],
                $data['manufacturer'],
                $data['description'],
                $data['price'],
                $data['warranty'],
                json_encode($data['specifications'])
            ]);
            echo json_encode(['id' => $db->lastInsertId()]);
            break;
        case 'PUT':
            $stmt = $db->prepare("UPDATE products SET type = ?, model = ?, manufacturer = ?, description = ?, price = ?, warranty = ?, specifications = ? WHERE id = ?");
            $stmt->execute([
                $data['type'],
                $data['model'],
                $data['manufacturer'],
                $data['description'],
                $data['price'],
                $data['warranty'],
                json_encode($data['specifications']),
                $id
            ]);
            echo json_encode(['success' => true]);
            break;
        case 'DELETE':
            $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
    }
}

function handleProposals($method, $id, $data, $db) {
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM proposals WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode($stmt->fetch());
            } else {
                $stmt = $db->query("SELECT * FROM proposals");
                echo json_encode($stmt->fetchAll());
            }
            break;
        case 'POST':
            $stmt = $db->prepare("INSERT INTO proposals (customer_id, representative_id, status, technical_data, financial_data, total_value, validity_days, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['customer_id'],
                $data['representative_id'],
                $data['status'],
                json_encode($data['technical_data']),
                json_encode($data['financial_data']),
                $data['total_value'],
                $data['validity_days'],
                $data['notes']
            ]);
            echo json_encode(['id' => $db->lastInsertId()]);
            break;
        case 'PUT':
            $stmt = $db->prepare("UPDATE proposals SET status = ?, technical_data = ?, financial_data = ?, total_value = ?, validity_days = ?, notes = ? WHERE id = ?");
            $stmt->execute([
                $data['status'],
                json_encode($data['technical_data']),
                json_encode($data['financial_data']),
                $data['total_value'],
                $data['validity_days'],
                $data['notes'],
                $id
            ]);
            echo json_encode(['success' => true]);
            break;
        case 'DELETE':
            $stmt = $db->prepare("DELETE FROM proposals WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;
    }
}