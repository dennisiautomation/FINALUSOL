import React, { useState } from 'react';
import { SolarCalculatorForm } from '../components/calculator/SolarCalculatorForm';
import { SolarResults } from '../components/calculator/SolarResults';
import { SolarCalculatorService } from '../services/SolarCalculatorService';
import { SolarCalculation } from '../types/solar';

const calculator = new SolarCalculatorService();

export default function SolarCalculator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SolarCalculation | null>(null);

  const handleCalculate = async (data: any) => {
    try {
      setIsLoading(true);
      const calculation = await calculator.calculateFromCEP({
        cep: data.cep,
        monthlyConsumption: data.monthlyConsumption,
        availableArea: data.availableArea
      });
      setResult(calculation);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      // Aqui você pode adicionar um componente de notificação de erro
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Calculadora Solar
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <SolarCalculatorForm 
            onCalculate={handleCalculate}
            isLoading={isLoading}
          />
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SolarResults data={result} />
          </div>
        )}
      </div>
    </div>
  );
}