import React from 'react';
import { TechnicalSummary } from '../../../types/proposal';
import { Sun, Zap, Maximize, Weight } from 'lucide-react';

interface TechnicalSectionProps {
  data: TechnicalSummary;
}

export function TechnicalSection({ data }: TechnicalSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Especificações do Sistema</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Sun className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Potência Total</p>
              <p className="text-lg font-semibold">{data.totalPower.toFixed(2)} kWp</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Zap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Produção Mensal</p>
              <p className="text-lg font-semibold">{data.monthlyProduction.toFixed(2)} kWh</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Maximize className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Área Necessária</p>
              <p className="text-lg font-semibold">{data.requiredArea.toFixed(2)} m²</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Weight className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Peso no Telhado</p>
              <p className="text-lg font-semibold">{data.roofWeight.toFixed(2)} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}