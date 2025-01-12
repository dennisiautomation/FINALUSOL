import React from 'react';
import { FinancialCalculation } from '../../../types/proposal';
import { Chart } from '../charts/Chart';

interface FinancialSummaryProps {
  data: FinancialCalculation;
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Análise Financeira</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Economia Mensal</div>
          <div className="text-2xl font-semibold text-gray-900">
            R$ {data.monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Economia Anual</div>
          <div className="text-2xl font-semibold text-gray-900">
            R$ {data.annualSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Payback Estimado</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.estimatedPayback.toFixed(1)} anos
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">Investimento Total</div>
          <div className="text-2xl font-semibold text-gray-900">
            R$ {data.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Chart
          title="Comparativo de Consumo"
          type="consumption"
          data={data}
        />
        <Chart
          title="Retorno do Investimento"
          type="payback"
          data={data}
        />
      </div>
    </div>
  );
}