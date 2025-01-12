<?php
if ($installer->getErrors()): ?>
    <div class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Erros encontrados:</h3>
                <div class="mt-2 text-sm text-red-700">
                    <ul class="list-disc pl-5 space-y-1">
                        <?php foreach ($installer->getErrors() as $error): ?>
                            <li><?php echo htmlspecialchars($error); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>

<div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">Configuração do Banco de Dados</h3>
    
    <form method="post" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Host</label>
            <input type="text" name="db_host" value="localhost" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Nome do Banco</label>
            <input type="text" name="db_name" value="solar_sales" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Usuário</label>
            <input type="text" name="db_user" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Senha</label>
            <input type="password" name="db_pass" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div class="mt-6">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Testar Conexão e Continuar
            </button>
        </div>
    </form>
</div>