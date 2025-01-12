import React from 'react';
import { Product } from '../../../types/product';

interface EquipmentListProps {
  products: Array<{
    product: Product;
    quantity: number;
  }>;
}

export function EquipmentList({ products }: EquipmentListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Equipamentos Selecionados</h2>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modelo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Potência
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(({ product, quantity }) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.type === 'solar_panel' ? 'Painel Solar' :
                   product.type === 'inverter' ? 'Inversor' :
                   product.type === 'structure' ? 'Estrutura' :
                   product.type === 'cables' ? 'Cabos' :
                   product.type === 'string_box' ? 'String Box' : 'Outro'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.manufacturer} - {product.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {product.type === 'solar_panel' && (
                    <>{(product as any).nominalPower * quantity} W</>
                  )}
                  {product.type === 'inverter' && (
                    <>{(product as any).maxCapacity} kWp</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}