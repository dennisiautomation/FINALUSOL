import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { ProposalData } from '../../../types/proposal';
import { formatCurrency } from '../../../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartsSectionProps {
  data: ProposalData;
}

export function ChartsSection({ data }: ChartsSectionProps) {
  // Consumption comparison data
  const consumptionData = {
    labels: ['Antes', 'Depois'],
    datasets: [
      {
        label: 'Consumo da Rede (kWh)',
        data: [
          data.customer.consumptionInfo.averageConsumption,
          data.customer.consumptionInfo.averageConsumption * 0.1
        ],
        backgroundColor: ['#f59e0b', '#10b981'],
      }
    ]
  };

  // ROI projection data
  const years = Array.from({ length: 25 }, (_, i) => `Ano ${i + 1}`);
  const savings = years.map((_, i) => data.financial.annualSavings * (i + 1));
  const investment = Array(25).fill(data.financial.totalInvestment);

  const roiData = {
    labels: years,
    datasets: [
      {
        label: 'Economia Acumulada',
        data: savings,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true
      },
      {
        label: 'Investimento',
        data: investment,
        borderColor: '#f59e0b',
        borderDash: [5, 5],
        fill: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatCurrency(value)
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Análise Gráfica</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Comparativo de Consumo</h3>
          <div className="h-[300px]">
            <Bar 
              data={consumptionData} 
              options={chartOptions}
              key="consumption-chart"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Retorno do Investimento</h3>
          <div className="h-[300px]">
            <Line 
              data={roiData} 
              options={chartOptions}
              key="roi-chart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}