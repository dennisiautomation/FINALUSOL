import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';

export function InverterForm() {
  const { register, formState: { errors }, watch } = useFormContext();
  const voltageCompatibility = watch('voltageCompatibility') || [];
  const monitoring = watch('monitoring') || [];

  return (
    <div className="space-y-4">
      <Input
        label="Capacidade Máxima (kWp)"
        type="number"
        step="0.01"
        {...register('maxCapacity')}
        error={errors.maxCapacity?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Compatibilidade com Tensão
        </label>
        <div className="mt-2 space-x-4">
          {['110', '220', '380'].map((voltage) => (
            <label key={voltage} className="inline-flex items-center">
              <input
                type="checkbox"
                value={voltage}
                {...register('voltageCompatibility')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2">{voltage}V</span>
            </label>
          ))}
        </div>
        {errors.voltageCompatibility?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.voltageCompatibility.message}
          </p>
        )}
      </div>

      <Input
        label="Eficiência (%)"
        type="number"
        step="0.01"
        {...register('efficiency')}
        error={errors.efficiency?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Compatibilidade com Monitoramento
        </label>
        <div className="mt-2 space-x-4">
          {[
            { value: 'wifi', label: 'Wi-Fi' },
            { value: 'app', label: 'Aplicativo' },
            { value: 'other', label: 'Outros' },
          ].map(({ value, label }) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="checkbox"
                value={value}
                {...register('monitoring')}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <Input
        label="Quantidade Máxima de Strings"
        type="number"
        {...register('maxStrings')}
        error={errors.maxStrings?.message}
      />

      <Input
        label="Garantia (anos)"
        type="number"
        {...register('warranty')}
        error={errors.warranty?.message}
      />
    </div>
  );
}