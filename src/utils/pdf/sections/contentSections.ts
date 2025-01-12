import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { drawCustomerSection } from './customerSection';
import { drawTechnicalSection } from './technicalSection';
import { drawFinancialSection } from './financialSection';
import { drawEquipmentSection } from './equipmentSection';

export async function drawContentSections(doc: jsPDF, data: ProposalData): Promise<void> {
  try {
    let yPosition = 20;

    // Customer Information
    doc.addPage();
    yPosition = await drawCustomerSection(doc, data, yPosition);

    // Technical Specifications
    if (yPosition > 250) doc.addPage();
    yPosition = await drawTechnicalSection(doc, data, yPosition);

    // Equipment List
    doc.addPage();
    yPosition = await drawEquipmentSection(doc, data, 20);

    // Financial Analysis
    doc.addPage();
    await drawFinancialSection(doc, data, 20);
  } catch (error) {
    console.error('Error drawing content sections:', error);
    throw error;
  }
}