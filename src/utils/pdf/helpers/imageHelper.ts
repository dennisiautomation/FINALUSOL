import { loadImage } from './loadImage';
import { ImageOptions } from '../types';

export async function drawImage(doc: any, url: string, options: ImageOptions): Promise<void> {
  try {
    // Add timeout to image loading
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Image load timeout')), 5000);
    });

    const img = await Promise.race([
      loadImage(url),
      timeoutPromise
    ]);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }
    
    // Set canvas dimensions
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw image to canvas
    ctx.drawImage(img, 0, 0);
    
    // Convert to JPEG with quality setting
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Add image to PDF with error catching
    try {
      doc.addImage(imageData, 'JPEG', options.x, options.y, options.width, options.height);
    } catch (error) {
      console.warn('Failed to add image to PDF, using fallback', error);
      throw error;
    }
  } catch (error) {
    // Use fallback color if provided
    if (options.fallbackColor) {
      doc.setFillColor(options.fallbackColor);
      doc.rect(options.x, options.y, options.width, options.height, 'F');
    }
  }
}