import { jsPDF } from 'jspdf';

interface TextOptions {
  fontSize?: number;
  fontStyle?: 'normal' | 'bold' | 'italic';
  color?: [number, number, number];
  align?: 'left' | 'center' | 'right';
}

export function drawText(
  doc: jsPDF,
  text: string | number,
  x: number,
  y: number,
  options: TextOptions = {}
): number {
  // Validate inputs
  if (!text || typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
    console.warn('Invalid text drawing parameters:', { text, x, y });
    return y;
  }

  const {
    fontSize = 12,
    fontStyle = 'normal',
    color = [0, 0, 0],
    align = 'left'
  } = options;

  const textStr = String(text).trim();
  if (!textStr) return y;

  try {
    // Save state
    const originalFontSize = doc.getFontSize();
    const originalTextColor = doc.getTextColor();
    const originalFont = doc.getFont();

    // Apply styles
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFont("helvetica", fontStyle);

    // Calculate position
    const textWidth = doc.getTextWidth(textStr);
    let xPos = x;

    if (align === 'center') {
      xPos = x - (textWidth / 2);
    } else if (align === 'right') {
      xPos = x - textWidth;
    }

    // Draw text
    doc.text(textStr, xPos, y);

    // Restore state
    doc.setFontSize(originalFontSize);
    doc.setTextColor(originalTextColor);
    doc.setFont(originalFont.fontName);

    return y + fontSize + 2;
  } catch (error) {
    console.error('Error drawing text:', { text: textStr, x, y, error });
    return y;
  }
}