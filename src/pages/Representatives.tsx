import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { RepresentativeModal } from '../components/representatives/RepresentativeModal';
import { useRepresentativesStore } from '../store/representatives';
import { Representative } from '../types/representative';

export default function Representatives() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { representatives, addRepresentative, updateRepresentative, deleteRepresentative } = useRepresentativesStore();

  const filteredRepresentatives = representatives.filter(
    (rep) =>
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (data: Partial<Representative>) => {
    if (selectedRepresentative) {
      updateRepresentative(selectedRepresentative.id, data);
    } else {
      addRepresentative({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        role: 'representative',
      } as Representative);
    }
    setIsModalOpen(false);
    setSelectedRepresentative(undefined);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Representantes</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <UserPlus className="h-5 w-5 mr-2" />
          Adicionar Representante
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <Input
            type="search"
            placeholder="Buscar representantes..."
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
                    Documentos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Região
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRepresentatives.map((representative) => (
                  <tr key={representative.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {representative.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {representative.email}<br />
                        {representative.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        CPF: {representative.cpf}<br />
                        RG: {representative.rg}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {representative.region}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedRepresentative(representative);
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
                          if (window.confirm('Tem certeza que deseja excluir este representante?')) {
                            deleteRepresentative(representative.id);
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

      <RepresentativeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRepresentative(undefined);
        }}
        onSubmit={handleSubmit}
        representative={selectedRepresentative}
      />
    </div>
  );
}