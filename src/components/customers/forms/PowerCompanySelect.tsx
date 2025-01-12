import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { powerCompanies } from '../../../data/powerCompanies';

export function PowerCompanySelect() {
  const { register, setValue } = useFormContext();
  const [otherCompany, setOtherCompany] = useState('');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Concessionária de Energia
      </label>
      <select
        {...register('consumptionInfo.powerCompany')}
        onChange={(e) => {
          setValue('consumptionInfo.powerCompany', e.target.value);
          if (e.target.value !== 'other') {
            setOtherCompany('');
          }
        }}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Selecione a concessionária</option>
        {powerCompanies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      
      {register('consumptionInfo.powerCompany').value === 'other' && (
        <Input
          placeholder="Digite o nome da concessionária"
          value={otherCompany}
          onChange={(e) => {
            setOtherCompany(e.target.value);
            setValue('consumptionInfo.powerCompany', e.target.value);
          }}
        />
      )}
    </div>
  );
}