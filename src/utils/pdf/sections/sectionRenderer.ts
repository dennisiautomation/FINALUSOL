import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { drawCustomerSection } from './customerSection';
import { drawTechnicalSection } from './technicalSection';
import { drawEquipmentSection } from './equipmentSection';
import { drawBenefitsSection } from './benefitsSection';
import { drawFinancialSection } from './financialSection';
import { drawChartsSection } from './chartsSection';
import { replacePlaceholders } from '../../proposalPlaceholders';
import { drawText } from '../text';

export async function drawSection(
  doc: jsPDF,
  section: any,
  data: ProposalData,
  startY: number,
  styling: any
): Promise<number> {
  let currentY = startY;

  // Draw section title if present
  if (section.title) {
    currentY = drawText(doc, section.title, 20, currentY, {
      fontSize: 16,
      fontStyle: 'bold',
      color: styling.primaryColor
    });
    currentY += 10;
  }

  // Draw section content based on type
  switch (section.type) {
    case 'customer_info':
      currentY = await drawCustomerSection(doc, data, currentY, styling);
      break;
    case 'technical':
      currentY = await drawTechnicalSection(doc, data, currentY, styling);
      break;
    case 'equipment':
      currentY = await drawEquipmentSection(doc, data, currentY, styling);
      break;
    case 'benefits':
      currentY = await drawBenefitsSection(doc, data, currentY, styling);
      break;
    case 'financial':
      currentY = await drawFinancialSection(doc, data, currentY, styling);
      break;
    case 'charts':
      currentY = await drawChartsSection(doc, data, currentY, styling);
      break;
    default:
      // For custom text sections, replace placeholders and render
      if (section.content) {
        const content = replacePlaceholders(section.content, data);
        currentY = drawText(doc, content, 20, currentY, {
          fontSize: 12,
          color: styling.secondaryColor
        });
      }
  }

  return currentY + 10;
}