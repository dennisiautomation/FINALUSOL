import React from 'react';
import { Sun, Zap, Maximize, PiggyBank } from 'lucide-react';
import { SolarCalculation } from '../../types/solar';
import { ENERGY_RATES } from '../../config/solarConstants';

interface SolarResultsProps {
  data: SolarCalculation;
}

export function SolarResults({ data }: SolarResultsProps) {
  if (!data || !data.systemRequirements) {
    return null;
  }

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Sun className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Potência do Sistema</p>
              <p className="text-lg font-semibold">
                {data.systemRequirements.systemSize.toFixed(2)} kWp
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Zap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Produção Mensal</p>
              <p className="text-lg font-semibold">
                {data.production.monthly.toFixed(2)} kWh
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Maximize className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Área Necessária</p>
              <p className="text-lg font-semibold">
                {data.systemRequirements.requiredArea.toFixed(2)} m²
              </p>
            </div>
          </div>
        </div>

        {data.financials && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <PiggyBank className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Economia Mensal Estimada</p>
                <p className="text-lg font-semibold">
                  {formatCurrency(data.production.monthly * (ENERGY_RATES[data.location.state] || 0.85))}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!data.isViable && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-800">
            Atenção: A área disponível é menor que a necessária para o sistema.
            Considere reduzir o consumo ou aumentar a área disponível.
          </p>
        </div>
      )}
    </div>
  );
}