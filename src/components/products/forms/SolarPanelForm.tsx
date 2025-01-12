import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { DecimalInput } from '../../ui/DecimalInput';

export function SolarPanelForm() {
  const { register, formState: { errors }, watch, setValue } = useFormContext();
  const width = watch('dimensions.width') || 0;
  const height = watch('dimensions.height') || 0;

  return (
    <div className="space-y-4">
      <Input
        label="Potência Nominal (W)"
        type="number"
        {...register('nominalPower')}
        error={errors.nominalPower?.message}
      />
      
      <Input
        label="Eficiência (%)"
        type="number"
        step="0.01"
        {...register('efficiency')}
        error={errors.efficiency?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <DecimalInput
          label="Largura (m)"
          value={width}
          onChange={(value) => setValue('dimensions.width', value)}
          error={errors.dimensions?.width?.message}
          precision={3}
        />
        
        <DecimalInput
          label="Altura (m)"
          value={height}
          onChange={(value) => setValue('dimensions.height', value)}
          error={errors.dimensions?.height?.message}
          precision={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Peso (kg)"
          type="number"
          step="0.01"
          {...register('weight')}
          error={errors.weight?.message}
        />
        
        <Input
          label="Área (m²)"
          type="number"
          step="0.01"
          {...register('area')}
          error={errors.area?.message}
        />
      </div>
    </div>
  );
}