import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { ProposalList } from '../components/proposals/ProposalList';
import { useProposalsStore } from '../store/proposals';
import { useAuthStore } from '../store/auth';
import { useRepresentativesStore } from '../store/representatives';
import { ProposalStatus } from '../types/proposal';

export default function AdminProposals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepresentative, setSelectedRepresentative] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<ProposalStatus | ''>('');
  
  const { user } = useAuthStore();
  const { proposals, updateStatus, deleteProposal } = useProposalsStore();
  const { representatives } = useRepresentativesStore();

  // Filtrar propostas
  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = 
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.status.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRepresentative = selectedRepresentative 
      ? proposal.representativeId === selectedRepresentative
      : true;
      
    const matchesStatus = selectedStatus 
      ? proposal.status === selectedStatus
      : true;

    return matchesSearch && matchesRepresentative && matchesStatus;
  });

  // Ordenar por data mais recente
  const sortedProposals = [...filteredProposals].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleUpdateStatus = (id: string, status: ProposalStatus) => {
    updateStatus(id, status, user?.id || '');
  };

  const handleDownload = (proposal: any) => {
    // Implementar download da proposta
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Propostas</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Buscar propostas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={selectedRepresentative}
            onChange={(e) => setSelectedRepresentative(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            <option value="">Todos os Representantes</option>
            {representatives.map((rep) => (
              <option key={rep.id} value={rep.id}>
                {rep.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ProposalStatus)}
            className="rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            <option value="">Todos os Status</option>
            <option value="draft">Rascunho</option>
            <option value="sent">Enviada</option>
            <option value="pending_financing">Aguardando Financiamento</option>
            <option value="accepted">Aceita</option>
            <option value="completed">Finalizada</option>
            <option value="rejected">Recusada</option>
          </select>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Total de Propostas</div>
            <div className="text-2xl font-semibold">{sortedProposals.length}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Em Andamento</div>
            <div className="text-2xl font-semibold">
              {sortedProposals.filter(p => ['sent', 'pending_financing'].includes(p.status)).length}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Aceitas</div>
            <div className="text-2xl font-semibold text-green-600">
              {sortedProposals.filter(p => p.status === 'accepted').length}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Recusadas</div>
            <div className="text-2xl font-semibold text-red-600">
              {sortedProposals.filter(p => p.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Lista de Propostas */}
        <ProposalList
          proposals={sortedProposals}
          currentUser={user!}
          onUpdateStatus={handleUpdateStatus}
          onDelete={deleteProposal}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}