import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { AddressForm } from './forms/AddressForm';
import { ConsumptionForm } from './forms/ConsumptionForm';
import { InstallationForm } from './forms/InstallationForm';
import { GenerationForm } from './forms/GenerationForm';
import { Button } from '../ui/Button';
import { customerSchema } from '../../schemas/customerSchema';
import { Customer } from '../../types/customer';
import { useAuthStore } from '../../store/auth';

interface CustomerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Customer) => void;
  initialData?: Customer;
}

export function CustomerRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CustomerRegistrationModalProps) {
  const { user } = useAuthStore();
  
  const methods = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: React.useMemo(() => ({
      documentType: 'cpf',
      consumptionInfo: {
        tariffType: 'residential',
        voltage: '220',
        powerCompany: '',
        averageConsumption: 0,
        monthlyHistory: {},
      },
      installationInfo: {
        type: 'roof',
        availableArea: 0,
        roofMaterial: 'ceramic',
        roofOrientation: 'north',
        roofInclination: 0,
      },
      generationType: 'individual',
      linkedUnits: [],
      ...initialData
    }), [initialData])
  });

  // Reset form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      methods.reset(initialData);
    }
  }, [initialData, methods]);

  const handleSubmit = async (data: any) => {
    try {
      const customerData: Customer = {
        ...data,
        id: initialData?.id || Math.random().toString(36).substr(2, 9),
        representativeId: user?.id || '',
        createdAt: initialData?.createdAt || new Date(),
        updatedAt: new Date()
      };
      
      await onSubmit(customerData);
      methods.reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao salvar cliente. Por favor, verifique os dados e tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {initialData ? 'Editar Cliente' : 'Novo Cliente'}
            </h3>
            
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8 mt-4">
                <PersonalInfoForm />
                <AddressForm />
                <ConsumptionForm />
                <InstallationForm />
                <GenerationForm />

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {initialData ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}