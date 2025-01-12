import React, { useState } from 'react';
import { Download, FileText, Trash2, Pencil } from 'lucide-react';
import { Button } from '../ui/Button';
import { Proposal, ProposalStatus, User } from '../../types';
import { useCustomersStore } from '../../store/customers';
import { useNavigate } from 'react-router-dom';

interface ProposalListProps {
  proposals: Proposal[];
  currentUser: User;
  onUpdateStatus: (id: string, status: ProposalStatus) => void;
  onDelete: (id: string) => void;
}

export function ProposalList({
  proposals,
  currentUser,
  onUpdateStatus,
  onDelete,
}: ProposalListProps) {
  const { customers } = useCustomersStore();
  const navigate = useNavigate();
  const [generatingPDF, setGeneratingPDF] = useState<string | null>(null);
  const isAdmin = currentUser.role === 'admin';

  const getStatusColor = (status: ProposalStatus) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      pending_financing: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      completed: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getStatusLabel = (status: ProposalStatus) => {
    const labels = {
      draft: 'Rascunho',
      sent: 'Enviada',
      pending_financing: 'Aguardando Financiamento',
      accepted: 'Aceita',
      completed: 'Finalizada',
      rejected: 'Recusada'
    };
    return labels[status];
  };

  const handleDownload = async (proposal: Proposal) => {
    setGeneratingPDF(proposal.id);
    try {
      navigate('/preview', { state: proposal });
    } catch (error) {
      console.error('Error downloading proposal:', error);
    } finally {
      setGeneratingPDF(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor Total
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {proposals.map((proposal) => {
            const customer = customers.find(c => c.id === proposal.customerId);
            
            return (
              <tr key={proposal.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {customer?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer?.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isAdmin || proposal.representativeId === currentUser.id ? (
                    <select
                      value={proposal.status}
                      onChange={(e) => onUpdateStatus(proposal.id, e.target.value as ProposalStatus)}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(proposal.status)}`}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="sent">Enviada</option>
                      <option value="pending_financing">Aguardando Financiamento</option>
                      <option value="accepted">Aceita</option>
                      <option value="completed">Finalizada</option>
                      <option value="rejected">Recusada</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(proposal.status)}`}>
                      {getStatusLabel(proposal.status)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(proposal.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(proposal.totalValue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/proposal/edit/${proposal.id}`)}
                    title="Editar Proposta"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDownload(proposal)}
                    disabled={generatingPDF === proposal.id}
                    title="Baixar Proposta"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  {(isAdmin || proposal.status === 'draft') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(proposal.id)}
                      title="Excluir Proposta"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}