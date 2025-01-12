import { Chart } from 'chart.js/auto';
import { colors } from './colors';

export async function createChart(
  config: any,
  width = 500,
  height = 300
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      const chart = new Chart(ctx, {
        ...config,
        options: {
          ...config.options,
          responsive: false,
          animation: false
        }
      });

      // Wait for next frame to ensure chart is rendered
      requestAnimationFrame(() => {
        try {
          const imageData = canvas.toDataURL('image/png');
          chart.destroy();
          resolve(imageData);
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function createConsumptionChart(
  currentValue: number,
  futureValue: number
): Promise<string> {
  const config = {
    type: 'bar',
    data: {
      labels: ['Consumo Atual', 'Com Sistema Solar'],
      datasets: [{
        label: 'Consumo da Rede',
        data: [currentValue, currentValue * 0.1],
        backgroundColor: getRGBColor(colors.error),
        borderWidth: 0
      }, {
        label: 'Geração Solar',
        data: [0, currentValue * 0.9],
        backgroundColor: getRGBColor(colors.success),
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: 'Comparativo de Consumo Mensal'
        }
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          title: { display: true, text: 'kWh/mês' }
        },
        x: { stacked: true }
      }
    }
  };

  return createChart(config);
}

export async function createSavingsChart(annualSavings: number): Promise<string> {
  const years = Array.from({ length: 25 }, (_, i) => `Ano ${i + 1}`);
  const savings = years.map((_, i) => annualSavings * (i + 1));
  const investment = Array(25).fill(annualSavings * 4);

  const config = {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Economia Acumulada',
        data: savings,
        borderColor: getRGBColor(colors.success),
        backgroundColor: getRGBAColor(colors.success, 0.1),
        fill: true
      }, {
        label: 'Investimento',
        data: investment,
        borderColor: getRGBColor(colors.primary),
        borderDash: [5, 5],
        fill: false
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'R$' },
          ticks: {
            callback: (value: number) => formatCurrency(value)
          }
        }
      }
    }
  };

  return createChart(config);
}

function getRGBColor(color: [number, number, number]): string {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function getRGBAColor(color: [number, number, number], alpha: number): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}