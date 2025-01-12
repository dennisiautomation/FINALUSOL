import React from 'react';
import { ContractTemplateForm } from './ContractTemplateForm';
import { ContractTemplate } from '../../types';

interface ContractTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ContractTemplate>) => void;
  template?: ContractTemplate;
}

export function ContractTemplateModal({
  isOpen,
  onClose,
  onSubmit,
  template,
}: ContractTemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-4xl">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {template ? 'Edit Contract Template' : 'Create New Contract Template'}
            </h3>
            
            <ContractTemplateForm
              onSubmit={onSubmit}
              initialData={template}
            />
          </div>
        </div>
      </div>
    </div>
  );
}