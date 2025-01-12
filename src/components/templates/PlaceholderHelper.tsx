import React from 'react';
import { PLACEHOLDERS } from '../../utils/proposalPlaceholders';

export function PlaceholderHelper() {
  const placeholderGroups = {
    'Dados do Cliente': [
      { key: 'CUSTOMER_NAME', description: 'Nome do cliente' },
      { key: 'CUSTOMER_EMAIL', description: 'E-mail do cliente' },
      { key: 'CUSTOMER_PHONE', description: 'Telefone do cliente' },
      { key: 'CUSTOMER_ADDRESS', description: 'Endereço completo' },
    ],
    'Dados de Consumo': [
      { key: 'MONTHLY_CONSUMPTION', description: 'Consumo mensal em kWh' },
      { key: 'ENERGY_RATE', description: 'Tarifa de energia' },
    ],
    'Dados Técnicos': [
      { key: 'SYSTEM_POWER', description: 'Potência do sistema' },
      { key: 'MONTHLY_PRODUCTION', description: 'Produção mensal estimada' },
      { key: 'REQUIRED_AREA', description: 'Área necessária' },
      { key: 'ROOF_WEIGHT', description: 'Peso no telhado' },
    ],
    'Dados Financeiros': [
      { key: 'MONTHLY_SAVINGS', description: 'Economia mensal' },
      { key: 'ANNUAL_SAVINGS', description: 'Economia anual' },
      { key: 'PAYBACK_YEARS', description: 'Tempo de retorno' },
      { key: 'TOTAL_INVESTMENT', description: 'Investimento total' },
    ],
    'Datas': [
      { key: 'CURRENT_DATE', description: 'Data atual' },
      { key: 'VALIDITY_DATE', description: 'Data de validade' },
    ],
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Placeholders Disponíveis
      </h4>
      
      <div className="space-y-4">
        {Object.entries(placeholderGroups).map(([group, items]) => (
          <div key={group}>
            <h5 className="text-xs font-medium text-gray-700 mb-2">{group}</h5>
            <div className="grid grid-cols-2 gap-2">
              {items.map(({ key, description }) => (
                <div
                  key={key}
                  className="text-xs bg-white p-2 rounded border border-gray-200"
                  onClick={() => {
                    navigator.clipboard.writeText(PLACEHOLDERS[key as keyof typeof PLACEHOLDERS]);
                  }}
                  title="Clique para copiar"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="font-mono text-blue-600">
                    {PLACEHOLDERS[key as keyof typeof PLACEHOLDERS]}
                  </span>
                  <span className="block text-gray-500 mt-1">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}