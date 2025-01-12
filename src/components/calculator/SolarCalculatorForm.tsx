import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Calculator } from 'lucide-react';
import { maskCEP } from '../../utils/masks';

const calculatorSchema = z.object({
  cep: z.string().min(8, 'CEP inválido'),
  monthlyConsumption: z.number().min(30, 'Consumo mínimo de 30 kWh'),
  availableArea: z.number().min(1, 'Área mínima de 1 m²'),
});

type FormData = z.infer<typeof calculatorSchema>;

interface SolarCalculatorFormProps {
  onCalculate: (data: FormData) => void;
  isLoading?: boolean;
}

export function SolarCalculatorForm({ onCalculate, isLoading }: SolarCalculatorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(calculatorSchema),
  });

  return (
    <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
      <Input
        label="CEP da Instalação"
        {...register('cep')}
        onChange={(e) => {
          e.target.value = maskCEP(e.target.value);
        }}
        error={errors.cep?.message}
      />

      <Input
        label="Consumo Médio Mensal (kWh)"
        type="number"
        {...register('monthlyConsumption', { valueAsNumber: true })}
        error={errors.monthlyConsumption?.message}
      />

      <Input
        label="Área Disponível (m²)"
        type="number"
        step="0.1"
        {...register('availableArea', { valueAsNumber: true })}
        error={errors.availableArea?.message}
      />

      <Button type="submit" isLoading={isLoading}>
        <Calculator className="h-5 w-5 mr-2" />
        Calcular Sistema
      </Button>
    </form>
  );
}