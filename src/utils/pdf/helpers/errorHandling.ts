export function handlePDFError(error: unknown): never {
  console.error('PDF generation failed:', error);
  
  let message = 'Failed to generate PDF. Please try again.';
  if (error instanceof Error) {
    if (error.message.includes('timeout')) {
      message = 'PDF generation timed out. Please check your internet connection and try again.';
    } else if (error.message.includes('image')) {
      message = 'Failed to load images. Please ensure all images are accessible and try again.';
    }
  }
  
  throw new Error(message);
}