import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { useProductsStore } from '../../../store/products';

export function StringBoxForm() {
  const { register, formState: { errors } } = useFormContext();
  const { products } = useProductsStore();
  const inverters = products.filter(p => p.type === 'inverter');

  return (
    <div className="space-y-4">
      <Input
        label="Corrente Máxima (A)"
        type="number"
        step="0.1"
        {...register('maxCurrent')}
        error={errors.maxCurrent?.message}
      />

      <Input
        label="Tensão Máxima (V)"
        type="number"
        step="0.1"
        {...register('maxVoltage')}
        error={errors.maxVoltage?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Compatibilidade com Inversores
        </label>
        <div className="mt-2 space-y-2">
          {inverters.map((inverter) => (
            <label key={inverter.id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={inverter.id}
                {...register('compatibleInverters')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2">{inverter.manufacturer} - {inverter.model}</span>
            </label>
          ))}
        </div>
        {errors.compatibleInverters?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.compatibleInverters.message}
          </p>
        )}
      </div>

      <Input
        label="Garantia (anos)"
        type="number"
        {...register('warranty')}
        error={errors.warranty?.message}
      />
    </div>
  );
}