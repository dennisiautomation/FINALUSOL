import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { maskCPF, maskPhone } from '../../../utils/masks';

export function PersonalInfoForm() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Informações Pessoais</h2>
      
      <Input
        label="Nome Completo"
        {...register('name')}
        error={errors.name?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="CPF"
          {...register('document')}
          onChange={(e) => {
            e.target.value = maskCPF(e.target.value);
          }}
          error={errors.document?.message}
        />

        <Input
          label="Telefone"
          {...register('phone')}
          onChange={(e) => {
            e.target.value = maskPhone(e.target.value);
          }}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label="E-mail"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
    </div>
  );
}