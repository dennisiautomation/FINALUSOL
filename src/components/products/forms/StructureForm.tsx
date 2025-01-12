import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';

export function StructureForm() {
  const { register, formState: { errors }, watch } = useFormContext();
  const structureType = watch('structureType');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Suporte
        </label>
        <select
          {...register('structureType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="fixed">Fixo</option>
          <option value="adjustable">Ajustável</option>
          <option value="roof">Telhado</option>
          <option value="ground">Solo</option>
        </select>
        {errors.structureType?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.structureType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Material
        </label>
        <select
          {...register('material')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="aluminum">Alumínio</option>
          <option value="galvanized_steel">Aço Galvanizado</option>
          <option value="other">Outros</option>
        </select>
        {errors.material?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.material.message}</p>
        )}
      </div>

      <Input
        label="Peso Suportado (kg)"
        type="number"
        step="0.01"
        {...register('maxWeight')}
        error={errors.maxWeight?.message}
      />

      {(structureType === 'roof' || structureType === 'adjustable') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Compatibilidade com Telhado
          </label>
          <div className="mt-2 space-x-4">
            {[
              { value: 'fiber_cement', label: 'Fibrocimento' },
              { value: 'ceramic', label: 'Cerâmica' },
              { value: 'metallic', label: 'Metálico' },
              { value: 'other', label: 'Outros' },
            ].map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={value}
                  {...register('compatibility.roof')}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {(structureType === 'ground' || structureType === 'adjustable') && (
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('compatibility.ground')}
            className="rounded border-gray-300 text-blue-600"
          />
          <span className="ml-2">Compatível com Instalação no Solo</span>
        </div>
      )}

      <Input
        label="Garantia (anos)"
        type="number"
        {...register('warranty')}
        error={errors.warranty?.message}
      />
    </div>
  );
}