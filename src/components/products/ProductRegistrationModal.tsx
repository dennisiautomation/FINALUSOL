import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { CurrencyInput } from '../ui/CurrencyInput';
import { Button } from '../ui/Button';
import { SolarPanelForm } from './forms/SolarPanelForm';
import { InverterForm } from './forms/InverterForm';
import { StructureForm } from './forms/StructureForm';
import { CableForm } from './forms/CableForm';
import { StringBoxForm } from './forms/StringBoxForm';
import { OtherProductForm } from './forms/OtherProductForm';
import { productSchema } from '../../schemas/productSchema';
import { Product, ProductType } from '../../types/product';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  initialData?: Product;
}

export function ProductRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProductRegistrationModalProps) {
  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: React.useMemo(() => ({
      type: initialData?.type || 'solar_panel',
      model: initialData?.model || '',
      manufacturer: initialData?.manufacturer || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      warranty: initialData?.warranty || 0,
      ...initialData
    }), [initialData]),
    mode: 'onSubmit'
  });

  const productType = methods.watch('type') as ProductType;
  const price = methods.watch('price');

  React.useEffect(() => {
    if (initialData) {
      methods.reset({
        ...initialData,
        type: initialData.type,
        model: initialData.model,
        manufacturer: initialData.manufacturer,
        description: initialData.description || '',
        price: initialData.price,
        warranty: initialData.warranty
      });
    }
  }, [initialData, methods.reset]);

  const handleSubmit = (data: any) => {
    if (initialData) {
      onSubmit({
        ...initialData,
        ...data,
        id: initialData.id,
        createdAt: initialData.createdAt,
        updatedAt: new Date(),
        createdBy: initialData.createdBy
      });
    } else {
      onSubmit(data);
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

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Produto
                </label>
                <select
                  {...methods.register('type')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  disabled={!!initialData}
                >
                  <option value="solar_panel">Painel Solar</option>
                  <option value="inverter">Inversor</option>
                  <option value="structure">Estrutura</option>
                  <option value="cables">Cabos</option>
                  <option value="string_box">String Box</option>
                  <option value="other">Outros</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Modelo"
                  {...methods.register('model')}
                  error={methods.formState.errors.model?.message}
                />
                
                <Input
                  label="Fabricante"
                  {...methods.register('manufacturer')}
                  error={methods.formState.errors.manufacturer?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  {...methods.register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <CurrencyInput
                label="Preço"
                value={price || 0}
                onChange={(value) => methods.setValue('price', value)}
                error={methods.formState.errors.price?.message}
              />

              <Input
                label="Garantia (anos)"
                type="number"
                {...methods.register('warranty')}
                error={methods.formState.errors.warranty?.message}
              />

              {productType === 'solar_panel' && <SolarPanelForm />}
              {productType === 'inverter' && <InverterForm />}
              {productType === 'structure' && <StructureForm />}
              {productType === 'cables' && <CableForm />}
              {productType === 'string_box' && <StringBoxForm />}
              {productType === 'other' && <OtherProductForm />}

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {initialData ? 'Atualizar Produto' : 'Cadastrar Produto'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}