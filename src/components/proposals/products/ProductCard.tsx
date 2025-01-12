import React from 'react';
import { Product } from '../../../types/product';
import { formatPrice } from '../../../utils/productFormatters';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="border rounded-lg p-4 hover:border-yellow-500 cursor-pointer"
      onClick={onClick}
    >
      <div className="font-medium">{product.model}</div>
      <div className="text-sm text-gray-500">{product.manufacturer}</div>
      <div className="mt-2 font-medium text-yellow-600">
        {formatPrice(product.price)}
      </div>
    </div>
  );
}