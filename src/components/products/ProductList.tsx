import React from 'react';
import { Pencil, Trash2, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { Product } from '../../types/product';
import { getProductTypeLabel, formatPrice } from '../../utils/productFormatters';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onClone: (product: Product) => void;
}

export function ProductList({ products, onEdit, onDelete, onClone }: ProductListProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fabricante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Garantia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => {
              const uniqueKey = `${product.id}-${index}`;
              
              return (
                <tr key={uniqueKey}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getProductTypeLabel(product.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.manufacturer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.warranty} anos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onClone(product)}
                      title="Clonar Produto"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(product)}
                      title="Editar Produto"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                          onDelete(product.id);
                        }
                      }}
                      title="Excluir Produto"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}