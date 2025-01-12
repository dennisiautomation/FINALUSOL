<?php
require_once 'classes/Logger.php';
require_once 'classes/DatabaseConnection.php';

$db = new DatabaseConnection();
$result = $db->connect(
    'localhost',                    // host
    'u850202022_Usolproducao',     // nome do banco
    'u850202022_Usolproducao',     // usuário 
    'Laura0202@@@'                 // senha
);

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Conexão estabelecida com sucesso']);
} else {
    echo json_encode(['success' => false, 'errors' => $db->getErrors()]);
}