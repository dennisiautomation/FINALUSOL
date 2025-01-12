import React from 'react';
import { RepresentativeForm } from './RepresentativeForm';
import { Representative } from '../../types/representative';

interface RepresentativeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Representative>) => void;
  representative?: Representative;
  isLoading?: boolean;
}

export function RepresentativeModal({
  isOpen,
  onClose,
  onSubmit,
  representative,
  isLoading,
}: RepresentativeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
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
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {representative ? 'Editar Representante' : 'Novo Representante'}
            </h3>
            
            <RepresentativeForm
              onSubmit={onSubmit}
              initialData={representative}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}