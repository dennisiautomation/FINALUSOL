<div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium mb-4">Configuração do Administrador</h3>
    
    <form method="post" class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" name="name" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">E-mail</label>
            <input type="email" name="email" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Senha</label>
            <input type="password" name="password" required minlength="8"
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        </div>

        <div class="flex items-center">
            <input type="checkbox" name="insert_test_data" id="insert_test_data"
                   class="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded">
            <label for="insert_test_data" class="ml-2 block text-sm text-gray-900">
                Inserir dados de teste (produtos e clientes)
            </label>
        </div>

        <div class="mt-6">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Finalizar Instalação
            </button>
        </div>
    </form>
</div>