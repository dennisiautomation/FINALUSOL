import React from 'react';
import { Check, AlertTriangle, Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { Product } from '../../types/product';
import { Customer } from '../../types/customer';
import { recommendProducts } from '../../utils/recommendations/productRecommender';
import { getProductTypeLabel, formatPrice } from '../../utils/productFormatters';

interface AutomaticProductSelectorProps {
  customer: Customer;
  products: Product[];
  onProductsSelect: (products: Array<{ product: Product; quantity: number }>) => void;
  onSwitchToManual: () => void;
}

export function AutomaticProductSelector({
  customer,
  products,
  onProductsSelect,
  onSwitchToManual
}: AutomaticProductSelectorProps) {
  const { recommendations, requirements } = recommendProducts(customer, products);

  return (
    <div className="space-y-6">
      {/* Requisitos do Sistema */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Requisitos do Sistema</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Potência Necessária</span>
            <p className="font-medium">{requirements.systemSize} kWp</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Painéis Necessários</span>
            <p className="font-medium">{requirements.panelCount} unidades</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Área Necessária</span>
            <p className="font-medium">{requirements.requiredArea} m²</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Área Disponível</span>
            <p className="font-medium">{customer.installationInfo.availableArea} m²</p>
          </div>
        </div>

        {!requirements.isViable && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center text-yellow-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>Área disponível menor que a necessária. Ajuste manual pode ser necessário.</span>
            </div>
          </div>
        )}
      </div>

      {/* Produtos Recomendados */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Produtos Recomendados</h3>
          <Button variant="outline" size="sm" onClick={onSwitchToManual}>
            <Edit className="h-4 w-4 mr-2" />
            Seleção Manual
          </Button>
        </div>

        <div className="space-y-4">
          {recommendations.map(({ product, quantity, reason }, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{product.model}</div>
                  <div className="text-sm text-gray-500">
                    {getProductTypeLabel(product.type)}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{reason}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-yellow-600">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantidade: {quantity}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onSwitchToManual}>
            Ajustar Manualmente
          </Button>
          <Button 
            onClick={() => onProductsSelect(recommendations)}
            disabled={recommendations.length === 0}
          >
            <Check className="h-5 w-5 mr-2" />
            Usar Recomendação
          </Button>
        </div>
      </div>
    </div>
  );
}