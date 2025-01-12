<?php
session_start();
require_once 'classes/Installer.php';

$installer = new Installer();
$step = isset($_GET['step']) ? (int)$_GET['step'] : 1;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $installer->handlePost($step);
}

$pageTitle = "U-sol Energia Solar - Instalação";
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
                <img src="https://usolenergiasolar.com.br/wp-content/uploads/2023/04/00.png" alt="Logo" class="h-16 mx-auto">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                    Instalação do Sistema
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Passo <?php echo $step; ?> de 4
                </p>
            </div>

            <?php include "steps/step{$step}.php"; ?>
            
            <div class="mt-4 text-center text-sm text-gray-600">
                <p>Precisa de ajuda? Entre em contato com o suporte</p>
            </div>
        </div>
    </div>
</body>
</html>