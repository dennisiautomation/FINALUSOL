<?php
// Configurações do instalador
define('DEBUG', true); // Mudar para false em produção

// Configurações de logging
define('LOG_PATH', __DIR__ . '/logs/install.log');

// Requisitos mínimos
define('MIN_PHP_VERSION', '7.4.0');
define('REQUIRED_EXTENSIONS', [
    'pdo',
    'pdo_mysql',
    'json',
    'mbstring'
]);

// Configurações de timeout
define('DB_TIMEOUT', 5); // segundos

// Permissões necessárias
define('REQUIRED_PERMISSIONS', [
    __DIR__ . '/logs' => 0755,
    __DIR__ . '/../.env' => 0644
]);