<?php
header('Content-Type: text/plain');

function fixPermissions($path, $dirMode = 0755, $fileMode = 0644) {
    echo "Ajustando permissões para $path\n";
    
    if (!file_exists($path)) {
        echo "ERRO: Caminho não existe: $path\n";
        return;
    }

    if (is_dir($path)) {
        chmod($path, $dirMode);
        $items = new DirectoryIterator($path);
        foreach ($items as $item) {
            if ($item->isDot()) continue;
            
            $itemPath = $item->getPathname();
            if ($item->isDir()) {
                fixPermissions($itemPath, $dirMode, $fileMode);
            } else {
                chmod($itemPath, $fileMode);
                echo "  Arquivo: $itemPath -> " . substr(sprintf('%o', fileperms($itemPath)), -3) . "\n";
            }
        }
    } else {
        chmod($path, $fileMode);
        echo "  Arquivo: $path -> " . substr(sprintf('%o', fileperms($path)), -3) . "\n";
    }
}

// Ajusta permissões dos diretórios principais
$paths = [
    '/home/project/dist',
    '/home/project/public',
    '/home/project/logs'
];

foreach ($paths as $path) {
    fixPermissions($path);
}

// Ajusta permissões específicas
chmod('/home/project/.env', 0644);
echo "Permissões do .env -> " . substr(sprintf('%o', fileperms('/home/project/.env')), -3) . "\n";