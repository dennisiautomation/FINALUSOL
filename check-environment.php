<?php
header('Content-Type: text/plain');

function check($condition, $message) {
    echo ($condition ? "✓" : "✗") . " $message\n";
    return $condition;
}

echo "=== Verificação de Ambiente ===\n\n";

// PHP Version
$phpVersion = phpversion();
echo "PHP Version: $phpVersion\n";
check(version_compare($phpVersion, '7.4.0', '>='), "PHP >= 7.4.0");

// Extensions
echo "\nExtensões:\n";
$requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'mbstring'];
$allExtensionsOk = true;
foreach ($requiredExtensions as $ext) {
    $hasExt = extension_loaded($ext);
    $allExtensionsOk &= $hasExt;
    check($hasExt, "Extensão $ext");
}

// Database
echo "\nBanco de Dados:\n";
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=u850202022_Usolproducao",
        "u850202022_Usolproducao",
        "Laura0202@@@",
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    check(true, "Conexão com banco de dados");
    
    $tables = ['users', 'customers', 'products', 'proposals'];
    foreach ($tables as $table) {
        $result = $pdo->query("SELECT 1 FROM $table LIMIT 1");
        check($result !== false, "Tabela $table existe");
    }
} catch (PDOException $e) {
    check(false, "Erro de banco: " . $e->getMessage());
}

// Permissões
echo "\nPermissões:\n";
$paths = [
    '/home/project/dist' => '755',
    '/home/project/.env' => '644'
];

foreach ($paths as $path => $required) {
    $exists = file_exists($path);
    $perms = $exists ? substr(sprintf('%o', fileperms($path)), -3) : 'N/A';
    check($exists && $perms == $required, "$path ($perms)");
}