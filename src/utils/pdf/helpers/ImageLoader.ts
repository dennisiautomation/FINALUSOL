import { jsPDF } from 'jspdf';

interface ImageOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  fallbackColor?: string;
}

export class ImageLoader {
  private readonly TIMEOUT = 5000;
  private readonly QUALITY = 0.8;

  public async loadImage(url: string, options: ImageOptions, doc: jsPDF): Promise<void> {
    try {
      const img = await this.loadImageWithTimeout(url);
      const imageData = await this.prepareImageData(img);
      doc.addImage(imageData, 'JPEG', options.x, options.y, options.width, options.height);
    } catch (error) {
      console.warn('Image load failed:', error);
      this.handleFallback(doc, options);
    }
  }

  private loadImageWithTimeout(url: string): Promise<HTMLImageElement> {
    return Promise.race([
      this.createImagePromise(url),
      this.createTimeout()
    ]);
  }

  private createImagePromise(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

  private createTimeout(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Image load timeout')), this.TIMEOUT);
    });
  }

  private async prepareImageData(img: HTMLImageElement): Promise<string> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not available');
    }

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    return canvas.toDataURL('image/jpeg', this.QUALITY);
  }

  private handleFallback(doc: jsPDF, options: ImageOptions): void {
    if (options.fallbackColor) {
      doc.setFillColor(options.fallbackColor);
      doc.rect(options.x, options.y, options.width, options.height, 'F');
    }
  }
}