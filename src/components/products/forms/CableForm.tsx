import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';

export function CableForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Cabo
        </label>
        <select
          {...register('cableType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="copper">Cobre</option>
          <option value="aluminum">Alumínio</option>
        </select>
        {errors.cableType?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.cableType.message}</p>
        )}
      </div>

      <Input
        label="Bitola (mm²)"
        type="number"
        step="0.01"
        {...register('gauge')}
        error={errors.gauge?.message}
      />

      <Input
        label="Comprimento Máximo (m)"
        type="number"
        step="0.1"
        {...register('maxLength')}
        error={errors.maxLength?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Certificação
        </label>
        <input
          type="file"
          accept=".pdf"
          {...register('certifications')}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {errors.certifications?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.certifications.message}</p>
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