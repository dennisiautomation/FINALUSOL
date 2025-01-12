import React from 'react';
import { TechnicalSummary as TechnicalSummaryType } from '../../../types/proposal';

interface TechnicalSummaryProps {
  data: TechnicalSummaryType;
}

export function TechnicalSummary({ data }: TechnicalSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Resumo Técnico</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Potência Total</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.totalPower.toFixed(2)} kWp
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Produção Média Mensal</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.monthlyProduction.toFixed(2)} kWh
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Área Necessária</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.requiredArea.toFixed(2)} m²
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Peso no Telhado</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.roofWeight.toFixed(2)} kg
          </div>
        </div>
      </div>
    </div>
  );
}