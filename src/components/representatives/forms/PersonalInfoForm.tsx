import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { maskCPF } from '../../../utils/masks/documentMasks';
import { maskPhone } from '../../../utils/masks/phoneMasks';

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
          {...register('cpf')}
          onChange={(e) => {
            e.target.value = maskCPF(e.target.value);
          }}
          error={errors.cpf?.message}
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

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="E-mail"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Senha"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
    </div>
  );
}