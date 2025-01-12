import React from 'react';
import { Customer } from '../../types';
import { CustomerSelector } from './CustomerSelector';

interface CustomerSelectionSectionProps {
  customers: Customer[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CustomerSelectionSection({ customers, selectedId, onSelect }: CustomerSelectionSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Selecione o Cliente</h2>
      <CustomerSelector
        customers={customers}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </div>
  );
}