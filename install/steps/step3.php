<div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">Criação das Tabelas</h3>
    
    <div class="space-y-4">
        <p class="text-gray-600">
            O sistema irá criar todas as tabelas necessárias no banco de dados.
            Este processo pode levar alguns minutos.
        </p>

        <?php if ($installer->getErrors()): ?>
        <div class="text-red-600 text-sm">
            <?php foreach ($installer->getErrors() as $error): ?>
                <p><?php echo htmlspecialchars($error); ?></p>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <form method="post" class="mt-6">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Criar Tabelas
            </button>
        </form>
    </div>
</div>