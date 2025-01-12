import React from 'react';
import { Product } from '../../../types/product';
import { getProductTypeLabel } from '../../../utils/productFormatters';

interface EquipmentSectionProps {
  equipment: Array<{
    product: Product;
    quantity: number;
  }>;
}

export function EquipmentSection({ equipment }: EquipmentSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Equipamentos</h2>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fabricante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modelo
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Garantia
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipment.map(({ product, quantity }, index) => (
              <tr key={`${product.id}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getProductTypeLabel(product.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {product.warranty} anos
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}