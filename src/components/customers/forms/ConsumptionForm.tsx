import React from 'react';
import { useFormContext } from 'react-hook-form';
import { powerCompanies } from '../../../data/powerCompanies';
import { MonthlyConsumptionHistory } from './MonthlyConsumptionHistory';
import { calculateAverageConsumption } from '../../../utils/calculations/consumption';

export function ConsumptionForm() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const selectedCompany = watch('consumptionInfo.powerCompany');
  const monthlyHistory = watch('consumptionInfo.monthlyHistory') || {};

  // Automatically calculate and update average consumption when monthly history changes
  React.useEffect(() => {
    const average = calculateAverageConsumption(monthlyHistory);
    setValue('consumptionInfo.averageConsumption', average);
  }, [monthlyHistory, setValue]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Informações de Consumo</h2>

      <MonthlyConsumptionHistory />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Tarifa
        </label>
        <select
          {...register('consumptionInfo.tariffType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        >
          <option value="residential">Residencial</option>
          <option value="commercial">Comercial</option>
          <option value="rural">Rural</option>
          <option value="industrial">Industrial</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Concessionária de Energia
        </label>
        <select
          value={selectedCompany}
          {...register('consumptionInfo.powerCompany')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        >
          <option value="">Selecione a concessionária</option>
          {powerCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.consumptionInfo?.powerCompany?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.consumptionInfo.powerCompany.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tensão Elétrica
        </label>
        <select
          {...register('consumptionInfo.voltage')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        >
          <option value="110">110V</option>
          <option value="220">220V</option>
          <option value="380">380V</option>
        </select>
      </div>
    </div>
  );
}