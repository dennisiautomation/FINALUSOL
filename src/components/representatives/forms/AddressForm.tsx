import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { maskCEP } from '../../../utils/masks';
import { useBrazilianStates } from '../../../hooks/useBrazilianStates';

export function AddressForm() {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const { states } = useBrazilianStates();
  const zipCode = watch('address.zipCode');

  const handleCEPBlur = async () => {
    const cep = zipCode?.replace(/\D/g, '');
    if (cep?.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue('address.street', data.logradouro, { shouldValidate: true });
          setValue('address.neighborhood', data.bairro, { shouldValidate: true });
          setValue('address.city', data.localidade, { shouldValidate: true });
          setValue('address.state', data.uf, { shouldValidate: true });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Endereço</h2>

      <Input
        label="CEP"
        {...register('address.zipCode')}
        onChange={(e) => {
          const maskedValue = maskCEP(e.target.value);
          setValue('address.zipCode', maskedValue, { shouldValidate: true });
        }}
        onBlur={handleCEPBlur}
        error={errors.address?.zipCode?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Rua"
          {...register('address.street')}
          error={errors.address?.street?.message}
        />

        <Input
          label="Número"
          {...register('address.number')}
          error={errors.address?.number?.message}
        />
      </div>

      <Input
        label="Complemento (Opcional)"
        {...register('address.complement')}
      />

      <Input
        label="Bairro"
        {...register('address.neighborhood')}
        error={errors.address?.neighborhood?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            {...register('address.state')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            <option value="">Selecione o estado</option>
            {states.map((state) => (
              <option key={state.uf} value={state.uf}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.address?.state?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
          )}
        </div>

        <Input
          label="Cidade"
          {...register('address.city')}
          error={errors.address?.city?.message}
        />
      </div>
    </div>
  );
}