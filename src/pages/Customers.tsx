import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { CustomerRegistrationModal } from '../components/customers/CustomerRegistrationModal';
import { useCustomersStore } from '../store/customers';
import { useAuthStore } from '../store/auth';
import { Customer } from '../types';
import { calculateAverageConsumption } from '../utils/calculations/consumption';
import { sampleCustomers } from '../utils/sampleCustomers';

export default function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuthStore();
  const { customers, addCustomer, updateCustomer, deleteCustomer, getCustomersByRepresentative } = useCustomersStore();

  // Import sample customers if none exist
  useEffect(() => {
    if (customers.length === 0) {
      sampleCustomers.forEach(customer => {
        addCustomer({
          ...customer,
          id: Math.random().toString(36).substr(2, 9),
          representativeId: user?.id || '',
          createdAt: new Date(),
          updatedAt: new Date()
        } as Customer);
      });
    }
  }, []);

  const visibleCustomers = user?.role === 'admin' 
    ? customers 
    : getCustomersByRepresentative(user?.id || '');

  const filteredCustomers = visibleCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (data: Customer) => {
    try {
      if (selectedCustomer) {
        await updateCustomer(selectedCustomer.id, data);
      } else {
        await addCustomer(data);
      }
      setIsModalOpen(false);
      setSelectedCustomer(undefined);
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Erro ao salvar cliente. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Clientes</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <UserPlus className="h-5 w-5 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <Input
            type="search"
            placeholder="Buscar clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs mb-4"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customer.documentType === 'cpf' ? 'CPF' : 'CNPJ'}: {customer.document}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.phone}<br />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {calculateAverageConsumption(customer.consumptionInfo.monthlyHistory)} kWh/mês
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsModalOpen(true);
                        }}
                        className="mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
                            deleteCustomer(customer.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CustomerRegistrationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedCustomer}
      />
    </div>
  );
}