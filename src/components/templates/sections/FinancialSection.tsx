import React from 'react';
import { FinancialCalculation } from '../../../types/proposal';
import { DollarSign, TrendingUp, Clock, PiggyBank } from 'lucide-react';

interface FinancialSectionProps {
  data: FinancialCalculation;
}

export function FinancialSection({ data }: FinancialSectionProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Análise Financeira</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Economia Mensal</p>
              <p className="text-lg font-semibold">{formatCurrency(data.monthlySavings)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Economia Anual</p>
              <p className="text-lg font-semibold">{formatCurrency(data.annualSavings)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo de Retorno</p>
              <p className="text-lg font-semibold">{data.estimatedPayback.toFixed(1)} anos</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <PiggyBank className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Investimento Total</p>
              <p className="text-lg font-semibold">{formatCurrency(data.totalInvestment)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}