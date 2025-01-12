import React from 'react';
import { Customer } from '../../../types/customer';

interface CustomerSectionProps {
  customer: Customer;
}

export function CustomerSection({ customer }: CustomerSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Informações do Cliente</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Nome</p>
          <p className="font-medium">{customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Documento</p>
          <p className="font-medium">{customer.documentType.toUpperCase()}: {customer.document}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{customer.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Telefone</p>
          <p className="font-medium">{customer.phone}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Endereço</p>
        <p className="font-medium">
          {customer.address.street}, {customer.address.number}
          {customer.address.complement && ` - ${customer.address.complement}`}
          <br />
          {customer.address.neighborhood} - {customer.address.city}/{customer.address.state}
          <br />
          CEP: {customer.address.zipCode}
        </p>
      </div>
    </div>
  );
}