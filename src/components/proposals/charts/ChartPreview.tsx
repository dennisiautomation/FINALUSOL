import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartPreviewProps {
  data: any;
}

export function ChartPreview({ data }: ChartPreviewProps) {
  const consumptionData = {
    labels: ['Antes', 'Depois'],
    datasets: [
      {
        label: 'Consumo Mensal (kWh)',
        data: [data.customer.consumptionInfo.averageConsumption, data.customer.consumptionInfo.averageConsumption * 0.1],
        backgroundColor: ['#f59e0b', '#10b981'],
      }
    ]
  };

  const paybackData = {
    labels: Array.from({ length: 25 }, (_, i) => `Ano ${i + 1}`),
    datasets: [
      {
        label: 'Economia Acumulada',
        data: Array.from({ length: 25 }, (_, i) => data.financial.annualSavings * (i + 1)),
        backgroundColor: '#10b981',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Comparativo de Consumo</h3>
        <Bar data={consumptionData} options={options} height={200} />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Retorno do Investimento</h3>
        <Bar data={paybackData} options={options} height={200} />
      </div>
    </div>
  );
}