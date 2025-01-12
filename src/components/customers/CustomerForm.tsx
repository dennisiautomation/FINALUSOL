import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const customerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  consumption: z.string().transform((val) => parseFloat(val)),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: Partial<CustomerFormData>;
  isLoading?: boolean;
}

export function CustomerForm({ onSubmit, initialData, isLoading }: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nome Completo"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <Input
        label="E-mail"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Telefone"
        {...register('phone')}
        error={errors.phone?.message}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Endereço</label>
        <textarea
          {...register('address')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>
      
      <Input
        label="Consumo Mensal de Energia (kWh)"
        type="number"
        step="0.01"
        {...register('consumption')}
        error={errors.consumption?.message}
      />

      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Atualizar Cliente' : 'Adicionar Cliente'}
      </Button>
    </form>
  );
}