import React from 'react';
import { DollarSign, FileText, TrendingUp, Users } from 'lucide-react';
import { useProposalsStore } from '../../store/proposals';
import { useCustomersStore } from '../../store/customers';
import { useProductsStore } from '../../store/products';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <p className={`mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}% vs mês anterior
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-100 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

export function SalesMetrics({ representativeId }: { representativeId?: string }) {
  const { proposals } = useProposalsStore();
  const { customers } = useCustomersStore();
  const { products } = useProductsStore();

  const filteredProposals = representativeId 
    ? proposals.filter(p => p.representativeId === representativeId)
    : proposals;

  const totalProposals = filteredProposals.length;
  const acceptedProposals = filteredProposals.filter(p => p.status === 'accepted').length;
  const conversionRate = totalProposals ? ((acceptedProposals / totalProposals) * 100).toFixed(1) : '0';
  
  const totalRevenue = filteredProposals
    .filter(p => p.status === 'accepted')
    .reduce((sum, p) => sum + p.totalValue, 0);

  const totalCost = filteredProposals
    .filter(p => p.status === 'accepted')
    .reduce((sum, p) => {
      return sum + p.products.reduce((prodSum, item) => {
        const product = products.find(prod => prod.id === item.productId);
        return prodSum + ((product?.price || 0) * 0.7 * item.quantity);
      }, 0);
    }, 0);

  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue ? ((profit / totalRevenue) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Receita Total"
        value={`R$ ${totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        trend={{ value: 12.5, isPositive: true }}
      />
      <MetricCard
        title="Margem de Lucro"
        value={`${profitMargin}%`}
        icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
        trend={{ value: 2.3, isPositive: true }}
      />
      <MetricCard
        title="Propostas"
        value={totalProposals}
        icon={<FileText className="h-6 w-6 text-blue-600" />}
      />
      <MetricCard
        title="Taxa de Conversão"
        value={`${conversionRate}%`}
        icon={<Users className="h-6 w-6 text-blue-600" />}
      />
    </div>
  );
}