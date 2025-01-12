import { jsPDF } from 'jspdf';

export function checkPageBreak(doc: jsPDF, currentY: number, requiredHeight: number = 50): boolean {
  const pageHeight = doc.internal.pageSize.height;
  return (currentY + requiredHeight) > (pageHeight - 20);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}