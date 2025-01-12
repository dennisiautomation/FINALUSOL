export interface PDFSection {
  estimatedHeight: number;
  render(data: any, startY: number): number;
}