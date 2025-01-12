import React from 'react';
import { Product } from '../../types/product';
import { getProductTypeLabel } from '../../utils/productFormatters';
import { SelectedProductsList } from './products/SelectedProductsList';
import { ProductCard } from './products/ProductCard';

interface ProductSelectorProps {
  products: Product[];
  selectedProducts: Array<{ product: Product; quantity: number }>;
  onChange: (products: Array<{ product: Product; quantity: number }>) => void;
}

export function ProductSelector({
  products,
  selectedProducts,
  onChange
}: ProductSelectorProps) {
  const addProduct = (product: Product) => {
    const existing = selectedProducts.find(p => p.product.id === product.id);
    if (existing) {
      updateQuantity(product.id, existing.quantity + 1);
    } else {
      onChange([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      onChange(selectedProducts.filter(p => p.product.id !== productId));
      return;
    }

    onChange(
      selectedProducts.map(p =>
        p.product.id === productId
          ? { ...p, quantity }
          : p
      )
    );
  };

  const groupedProducts = products.reduce((acc, product) => {
    const type = getProductTypeLabel(product.type);
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-6">
      <SelectedProductsList
        products={selectedProducts}
        onQuantityChange={updateQuantity}
      />

      <div className="space-y-6">
        {Object.entries(groupedProducts).map(([type, products]) => (
          <div key={type}>
            <h3 className="font-medium text-gray-900 mb-3">{type}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => addProduct(product)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}