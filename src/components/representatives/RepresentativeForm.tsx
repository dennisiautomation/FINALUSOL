import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { AddressForm } from './forms/AddressForm';
import { Representative } from '../../types/representative';

const representativeSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cpf: z.string().min(11, 'CPF inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.object({
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    zipCode: z.string().min(8, 'CEP inválido'),
  }),
  region: z.string().min(2, 'Região é obrigatória'),
});

type RepresentativeFormData = z.infer<typeof representativeSchema>;

interface RepresentativeFormProps {
  onSubmit: (data: RepresentativeFormData) => void;
  initialData?: Partial<Representative>;
  isLoading?: boolean;
}

export function RepresentativeForm({ onSubmit, initialData, isLoading }: RepresentativeFormProps) {
  const methods = useForm<RepresentativeFormData>({
    resolver: zodResolver(representativeSchema),
    defaultValues: initialData,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoForm />
        <AddressForm />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Região de Atuação
          </label>
          <input
            {...methods.register('region')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            placeholder="Ex: Zona Sul de São Paulo"
          />
          {methods.formState.errors.region?.message && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.region.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            {initialData ? 'Atualizar Representante' : 'Adicionar Representante'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}