import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';

export function GenerationForm() {
  const { register, formState: { errors }, watch, setValue, getValues } = useFormContext();
  const generationType = watch('generationType');
  const linkedUnits = watch('linkedUnits') || [];

  const addLinkedUnit = () => {
    const currentUnits = getValues('linkedUnits') || [];
    setValue('linkedUnits', [
      ...currentUnits,
      { document: '', address: {}, averageConsumption: 0 }
    ]);
  };

  const removeLinkedUnit = (index: number) => {
    const currentUnits = getValues('linkedUnits') || [];
    setValue('linkedUnits', currentUnits.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Modalidade de Geração</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Geração
        </label>
        <select
          {...register('generationType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="individual">Individual</option>
          <option value="shared">Compartilhada</option>
          <option value="remote">Autoconsumo Remoto</option>
        </select>
        {errors.generationType?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.generationType.message}
          </p>
        )}
      </div>

      {(generationType === 'shared' || generationType === 'remote') && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Unidades Vinculadas</h3>
            <Button type="button" variant="outline" size="sm" onClick={addLinkedUnit}>
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Unidade
            </Button>
          </div>

          {linkedUnits.map((_, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeLinkedUnit(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <Input
                label="CPF/CNPJ"
                {...register(`linkedUnits.${index}.document`)}
                error={errors.linkedUnits?.[index]?.document?.message}
              />

              <Input
                label="Endereço Completo"
                {...register(`linkedUnits.${index}.address`)}
                error={errors.linkedUnits?.[index]?.address?.message}
              />

              <Input
                label="Consumo Médio Mensal (kWh)"
                type="number"
                {...register(`linkedUnits.${index}.averageConsumption`)}
                error={errors.linkedUnits?.[index]?.averageConsumption?.message}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}