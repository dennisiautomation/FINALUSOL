export async function prepareContent(element: HTMLElement): Promise<HTMLElement> {
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Force all images to load
  const images = Array.from(clone.getElementsByTagName('img'));
  await Promise.all(images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      // Set timeout to prevent hanging
      setTimeout(reject, 15000);
    });
  }));

  // Ensure background images are properly set
  const bgElements = clone.querySelectorAll('[style*="background-image"]');
  bgElements.forEach(el => {
    const style = window.getComputedStyle(el);
    (el as HTMLElement).style.backgroundImage = style.backgroundImage;
  });

  return clone;
}