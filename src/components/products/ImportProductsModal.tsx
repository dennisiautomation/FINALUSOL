import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { importProductsFromCSV } from '../../utils/productImport/importProducts';
import { useProductsStore } from '../../store/products';

interface ImportProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportProductsModal({ isOpen, onClose }: ImportProductsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    totalRows: number;
    successRows: number;
    errors: string[];
  } | null>(null);

  const { addProduct } = useProductsStore();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const importResult = await importProductsFromCSV(file);
      
      if (importResult.success) {
        importResult.products.forEach(product => addProduct(product));
      }
      
      setResult({
        success: importResult.success,
        totalRows: importResult.totalRows,
        successRows: importResult.successRows,
        errors: importResult.errors
      });
    } catch (error) {
      setResult({
        success: false,
        totalRows: 0,
        successRows: 0,
        errors: ['Erro ao processar arquivo']
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Importar Produtos
            </h3>

            {!result ? (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-yellow-500"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileSelect}
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Clique para selecionar ou arraste o arquivo CSV
                    </p>
                  </div>
                </div>

                {isLoading && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Processando arquivo...</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  result.success ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {result.success ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-green-700">
                        Importação concluída com sucesso!
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <span className="text-red-700">
                        Ocorreram erros durante a importação
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-left">
                  <p>Total de linhas: {result.totalRows}</p>
                  <p>Produtos importados: {result.successRows}</p>
                  
                  {result.errors.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium">Erros encontrados:</p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-red-600">
                        {result.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button onClick={onClose}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}