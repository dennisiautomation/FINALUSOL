import { jsPDF } from 'jspdf';
import { ProposalData } from '../../../types/proposal';
import { drawCustomerSection } from './customerSection';
import { drawTechnicalSection } from './technicalSection';
import { drawEquipmentSection } from './equipmentSection';
import { drawFinancialSection } from './financialSection';
import { drawBenefitsSection } from './benefitsSection';
import { drawChartsSection } from './chartsSection';
import { PDFSection } from '../types';

export class ContentSection implements PDFSection {
  public async draw(doc: jsPDF, data: ProposalData): Promise<void> {
    let currentY = 20;

    // Add new page for content
    doc.addPage();

    // Draw each section
    currentY = await drawCustomerSection(doc, data, currentY);
    currentY = await drawTechnicalSection(doc, data, currentY);
    
    // Add new page for equipment
    doc.addPage();
    currentY = 20;
    currentY = await drawEquipmentSection(doc, data, currentY);
    
    // Add new page for benefits and financial info
    doc.addPage();
    currentY = 20;
    currentY = await drawBenefitsSection(doc, data, currentY);
    currentY = await drawFinancialSection(doc, data, currentY);
    
    // Add charts on a new page
    doc.addPage();
    currentY = 20;
    await drawChartsSection(doc, data, currentY);
  }
}