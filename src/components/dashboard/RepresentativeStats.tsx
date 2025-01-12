import React from 'react';
import { useRepresentativesStore } from '../../store/representatives';
import { useProposalsStore } from '../../store/proposals';

interface RepresentativeStatsProps {
  highlightId?: string | null;
}

export function RepresentativeStats({ highlightId }: RepresentativeStatsProps) {
  const { representatives } = useRepresentativesStore();
  const { proposals } = useProposalsStore();

  const repStats = representatives.map(rep => {
    const repProposals = proposals.filter(p => p.representativeId === rep.id);
    const totalValue = repProposals
      .filter(p => p.status === 'accepted')
      .reduce((sum, p) => sum + p.totalValue, 0);
    const proposalCount = repProposals.length;
    const acceptedCount = repProposals.filter(p => p.status === 'accepted').length;
    const conversionRate = proposalCount ? (acceptedCount / proposalCount * 100).toFixed(1) : '0';

    return {
      ...rep,
      totalValue,
      proposalCount,
      acceptedCount,
      conversionRate
    };
  }).sort((a, b) => b.totalValue - a.totalValue);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Desempenho dos Representantes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Representante
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendas Totais
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propostas
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taxa de Conversão
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Região
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {repStats.map(rep => (
                <tr 
                  key={rep.id} 
                  className={`hover:bg-gray-50 ${
                    highlightId === rep.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{rep.name}</div>
                        <div className="text-sm text-gray-500">{rep.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    R$ {rep.totalValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {rep.proposalCount} ({rep.acceptedCount} aceitas)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {rep.conversionRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {rep.region}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}