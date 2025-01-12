import { jsPDF } from 'jspdf';

export interface PageDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  contentWidth: number;
}

export function getPageDimensions(doc: jsPDF): PageDimensions {
  return {
    width: doc.internal.pageSize.width,
    height: doc.internal.pageSize.height,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    contentWidth: doc.internal.pageSize.width - 40 // 40 = left + right margin
  };
}

export function checkPageBreak(doc: jsPDF, currentY: number, requiredHeight: number): boolean {
  const dimensions = getPageDimensions(doc);
  return (currentY + requiredHeight) > (dimensions.height - dimensions.margin.bottom);
}

export function addNewPage(doc: jsPDF): number {
  doc.addPage();
  return getPageDimensions(doc).margin.top;
}