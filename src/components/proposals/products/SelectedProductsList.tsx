import React from 'react';
import { Product } from '../../../types/product';
import { getProductTypeLabel } from '../../../utils/productFormatters';
import { QuantityInput } from './QuantityInput';

interface SelectedProductsListProps {
  products: Array<{ product: Product; quantity: number }>;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export function SelectedProductsList({ products, onQuantityChange }: SelectedProductsListProps) {
  if (products.length === 0) return null;

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium text-gray-900 mb-3">Produtos Selecionados</h3>
      <div className="space-y-3">
        {products.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{product.model}</div>
              <div className="text-sm text-gray-500">
                {getProductTypeLabel(product.type)}
              </div>
            </div>
            <QuantityInput
              quantity={quantity}
              onChange={(value) => onQuantityChange(product.id, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}