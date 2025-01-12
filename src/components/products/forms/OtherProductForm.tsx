import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

export function OtherProductForm() {
  const { register, formState: { errors }, setValue, getValues } = useFormContext();
  const [newSpec, setNewSpec] = useState({ key: '', value: '' });

  const addSpecification = () => {
    if (newSpec.key && newSpec.value) {
      const currentSpecs = getValues('specifications') || {};
      setValue('specifications', {
        ...currentSpecs,
        [newSpec.key]: newSpec.value,
      });
      setNewSpec({ key: '', value: '' });
    }
  };

  const removeSpecification = (key: string) => {
    const currentSpecs = getValues('specifications') || {};
    const { [key]: removed, ...rest } = currentSpecs;
    setValue('specifications', rest);
  };

  const specifications = getValues('specifications') || {};

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Especificações</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            label="Nome"
            value={newSpec.key}
            onChange={(e) => setNewSpec({ ...newSpec, key: e.target.value })}
          />
          <Input
            label="Valor"
            value={newSpec.value}
            onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSpecification}
          disabled={!newSpec.key || !newSpec.value}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Especificação
        </Button>

        {Object.entries(specifications).length > 0 && (
          <div className="mt-4 space-y-2">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-medium">{key}:</span> {value}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSpecification(key)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
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