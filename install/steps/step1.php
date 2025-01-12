<?php
$requirements = $installer->checkRequirements();
$canProceed = true;
?>

<div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">Verificação de Requisitos</h3>
    
    <div class="space-y-4">
        <!-- PHP Version -->
        <div class="flex justify-between items-center">
            <div>
                <p class="font-medium">PHP Version</p>
                <p class="text-sm text-gray-500">Required: <?php echo $requirements['php']['required']; ?></p>
            </div>
            <div class="<?php echo $requirements['php']['status'] ? 'text-green-500' : 'text-red-500'; ?>">
                <?php echo $requirements['php']['current']; ?>
            </div>
        </div>

        <!-- Extensions -->
        <?php foreach ($requirements['extensions']['extensions'] as $ext): ?>
        <div class="flex justify-between items-center">
            <p class="font-medium">Extension: <?php echo $ext['name']; ?></p>
            <div class="<?php echo $ext['status'] ? 'text-green-500' : 'text-red-500'; ?>">
                <?php echo $ext['status'] ? '✓' : '✗'; ?>
            </div>
        </div>
        <?php 
            if (!$ext['status']) $canProceed = false;
        endforeach; 
        ?>
    </div>

    <?php if ($canProceed): ?>
    <div class="mt-6">
        <a href="?step=2" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            Continuar
        </a>
    </div>
    <?php else: ?>
    <div class="mt-6 text-center text-red-600">
        Por favor, corrija os requisitos não atendidos antes de continuar.
    </div>
    <?php endif; ?>
</div>