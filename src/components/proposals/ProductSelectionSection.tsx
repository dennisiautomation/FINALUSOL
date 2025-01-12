import React from 'react';
import { Button } from '../ui/Button';
import { ProductSelector } from './ProductSelector';
import { AutomaticProductSelector } from './AutomaticProductSelector';
import { Customer, Product } from '../../types';

interface ProductSelectionSectionProps {
  customer: Customer;
  products: Product[];
  isManualSelection: boolean;
  onToggleSelectionMode: () => void;
  onProductsSelect: (products: Array<{ product: Product; quantity: number }>) => void;
}

export function ProductSelectionSection({
  customer,
  products,
  isManualSelection,
  onToggleSelectionMode,
  onProductsSelect
}: ProductSelectionSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Seleção de Produtos</h2>
        <Button variant="outline" onClick={onToggleSelectionMode}>
          {isManualSelection ? 'Usar Recomendação' : 'Seleção Manual'}
        </Button>
      </div>

      {isManualSelection ? (
        <ProductSelector
          products={products}
          selectedProducts={[]}
          onChange={onProductsSelect}
        />
      ) : (
        <AutomaticProductSelector
          customer={customer}
          products={products}
          onProductsSelect={onProductsSelect}
          onSwitchToManual={onToggleSelectionMode}
        />
      )}
    </div>
  );
}