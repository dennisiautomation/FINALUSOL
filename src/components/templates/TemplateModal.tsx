import React from 'react';
import { TemplateForm } from './TemplateForm';
import { TemplatePreview } from './TemplatePreview';
import { ProposalTemplate } from '../../types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ProposalTemplate>) => void;
  template?: ProposalTemplate;
}

export function TemplateModal({
  isOpen,
  onClose,
  onSubmit,
  template,
}: TemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-7xl">
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
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {template ? 'Edit Template' : 'Create New Template'}
                </h3>
                
                <TemplateForm
                  onSubmit={onSubmit}
                  initialData={template}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                <div className="border rounded-lg p-4 overflow-auto max-h-[800px]">
                  {template && <TemplatePreview template={template} scale={0.8} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}