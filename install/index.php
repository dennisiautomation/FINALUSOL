<?php
session_start();
require_once 'Installer.php';

$installer = new Installer();
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $installer->handlePost($step);
}

$pageTitle = "Solar Sales - Instalação";
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    Instalação do Sistema
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Passo <?php echo $step; ?> de 4
                </p>
            </div>

            <?php include "steps/step{$step}.php"; ?>
            
            <div class="mt-4 text-center text-sm text-gray-600">
                <p>Precisa de ajuda? Consulte nossa <a href="#" class="text-yellow-600 hover:text-yellow-500">documentação</a></p>
            </div>
        </div>
    </div>
</body>
</html>