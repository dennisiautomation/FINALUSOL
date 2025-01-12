import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { getLastNMonths } from '../../../utils/date';

export function MonthlyConsumptionHistory() {
  const { register, formState: { errors }, watch } = useFormContext();
  const months = getLastNMonths();

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Histórico de Consumo (últimos 12 meses)
      </h3>
      <div className="space-y-3">
        {months.map((month) => (
          <div key={month.key} className="grid grid-cols-2 gap-4 items-center">
            <div className="text-sm text-gray-600">
              {month.formatted}
            </div>
            <Input
              type="number"
              step="0.01"
              placeholder="Consumo em kWh"
              {...register(`consumptionInfo.monthlyHistory.${month.key}`, {
                valueAsNumber: true,
                setValueAs: (v: string) => v === '' ? 0 : parseFloat(v)
              })}
              error={errors.consumptionInfo?.monthlyHistory?.[month.key]?.message}
            />
          </div>
        ))}
      </div>
    </div>
  );
}