import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Customer } from '../../types/customer';

interface CustomerSelectorProps {
  customers: Customer[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CustomerSelector({ customers, selectedId, onSelect }: CustomerSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.document.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar cliente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedId === customer.id ? 'bg-yellow-50' : ''
            }`}
            onClick={() => onSelect(customer.id)}
          >
            <div className="font-medium text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500">
              {customer.documentType === 'cpf' ? 'CPF' : 'CNPJ'}: {customer.document}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}