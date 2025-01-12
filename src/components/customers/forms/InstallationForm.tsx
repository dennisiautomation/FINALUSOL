import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';

export function InstallationForm() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const installationType = watch('installationInfo.type');

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Local de Instalação</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Instalação
        </label>
        <select
          {...register('installationInfo.type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        >
          <option value="roof">Telhado</option>
          <option value="ground">Solo</option>
        </select>
        {errors.installationInfo?.type?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.installationInfo.type.message}
          </p>
        )}
      </div>

      {installationType === 'roof' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material do Telhado
            </label>
            <select
              {...register('installationInfo.roofMaterial')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="fiber_cement">Fibrocimento</option>
              <option value="ceramic">Cerâmica</option>
              <option value="metallic">Metálico</option>
              <option value="other">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Orientação do Telhado
            </label>
            <select
              {...register('installationInfo.roofOrientation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="north">Norte</option>
              <option value="south">Sul</option>
              <option value="east">Leste</option>
              <option value="west">Oeste</option>
            </select>
          </div>

          <Input
            label="Inclinação do Telhado (°)"
            type="number"
            {...register('installationInfo.roofInclination', {
              valueAsNumber: true,
              setValueAs: (v: string) => v === '' ? undefined : parseFloat(v)
            })}
            error={errors.installationInfo?.roofInclination?.message}
          />
        </>
      )}

      <Input
        label="Área Disponível para Instalação (m²)"
        type="number"
        step="0.01"
        {...register('installationInfo.availableArea', {
          valueAsNumber: true,
          setValueAs: (v: string) => v === '' ? 0 : parseFloat(v)
        })}
        error={errors.installationInfo?.availableArea?.message}
      />
    </div>
  );
}