import { jsPDF } from 'jspdf';

export function checkPageBreak(doc: jsPDF, currentY: number, requiredHeight: number): boolean {
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  return (currentY + requiredHeight) > (pageHeight - margin);
}

export function getPageDimensions(doc: jsPDF) {
  return {
    width: doc.internal.pageSize.width,
    height: doc.internal.pageSize.height,
    margin: 20
  };
}