import { jsPDF } from 'jspdf';
import { drawText } from '../text';
import { ProposalData } from '../../../types/proposal';
import { colors } from '../colors';
import { createConsumptionChart, createSavingsChart } from '../chartUtils';

export async function drawCharts(
  doc: jsPDF, 
  data: ProposalData, 
  startY: number
): Promise<number> {
  let currentY = startY;

  try {
    // Section title
    currentY = drawText(doc, 'Análise Gráfica', 20, currentY, {
      fontSize: 16,
      fontStyle: 'bold',
      color: colors.primary
    });

    currentY += 15;

    // Ensure we have valid data
    if (!data.customer?.consumptionInfo?.averageConsumption || 
        !data.technical?.monthlyProduction || 
        !data.financial?.annualSavings) {
      throw new Error('Missing required data for charts');
    }

    // Consumption chart
    const consumptionChart = await createConsumptionChart(
      data.customer.consumptionInfo.averageConsumption,
      data.technical.monthlyProduction
    );

    doc.addImage(consumptionChart, 'PNG', 20, currentY, 170, 80);
    currentY += 90;

    // Savings chart
    const savingsChart = await createSavingsChart(data.financial.annualSavings);
    doc.addImage(savingsChart, 'PNG', 20, currentY, 170, 80);
    currentY += 90;

    return currentY;
  } catch (error) {
    console.error('Error in charts section:', error);
    currentY = drawText(doc, 'Não foi possível gerar os gráficos', 20, currentY, {
      fontSize: 12,
      color: colors.error
    });
    return currentY + 20;
  }
}