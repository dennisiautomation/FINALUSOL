import React from 'react';
import { Product } from '../../../types/product';

interface EquipmentSectionProps {
  equipment: Array<{
    product: Product;
    quantity: number;
  }>;
}

export function EquipmentSection({ equipment }: EquipmentSectionProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const getProductTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      solar_panel: 'Painel Solar',
      inverter: 'Inversor',
      structure: 'Estrutura',
      cables: 'Cabos',
      string_box: 'String Box',
      other: 'Outro'
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Equipamentos</h2>
      
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Equipamento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Fabricante
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Quantidade
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Garantia
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {equipment.map(({ product, quantity }, index) => (
              <tr key={`${product.id}-${index}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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