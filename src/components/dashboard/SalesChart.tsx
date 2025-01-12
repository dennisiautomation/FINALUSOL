import React from 'react';
import { useProposalsStore } from '../../store/proposals';

interface SalesChartProps {
  representativeId?: string | null;
}

export function SalesChart({ representativeId }: SalesChartProps) {
  const { proposals } = useProposalsStore();
  
  // Filter proposals by representative if ID is provided
  const filteredProposals = representativeId
    ? proposals.filter(p => p.representativeId === representativeId)
    : proposals;
  
  // Group sales by month
  const monthlySales = filteredProposals
    .filter(p => p.status === 'accepted')
    .reduce((acc, proposal) => {
      const date = new Date(proposal.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + proposal.totalValue;
      return acc;
    }, {} as Record<string, number>);

  const months = Object.keys(monthlySales);
  const values = Object.values(monthlySales);
  const maxValue = Math.max(...values, 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Vendas Mensais</h2>
      {months.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Nenhum dado de vendas disponível para o período selecionado
        </div>
      ) : (
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {months.map((month, index) => (
              <div key={month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-yellow-500 rounded-t"
                  style={{ 
                    height: `${(values[index] / maxValue) * 100}%`,
                    minHeight: '1px'
                  }}
                />
                <div className="text-xs text-gray-600 mt-2">{month}</div>
                <div className="text-xs font-medium">R$ {values[index].toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}