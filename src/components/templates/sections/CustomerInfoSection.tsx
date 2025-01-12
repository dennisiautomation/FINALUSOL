import React from 'react';
import { Customer } from '../../../types/customer';

interface CustomerInfoSectionProps {
  customer: Customer;
}

export function CustomerInfoSection({ customer }: CustomerInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Informações do Cliente</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Nome</p>
          <p className="font-medium">{customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Documento</p>
          <p className="font-medium">{customer.document}</p>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Consumo Médio Mensal</p>
          <p className="font-medium">{customer.consumptionInfo.averageConsumption} kWh</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tipo de Tarifa</p>
          <p className="font-medium">{customer.consumptionInfo.tariffType}</p>
        </div>
      </div>
    </div>
  );
}