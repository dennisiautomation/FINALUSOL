import { ProposalData } from '../../types/proposal';

export function generateShareableLink(data: ProposalData): string {
  // Create a compressed version of the proposal data
  const minimalData = {
    id: data.id,
    customer: {
      name: data.customer.name,
      email: data.customer.email
    },
    date: data.date,
    validityDays: data.validityDays,
    products: data.products.map(p => ({
      id: p.product.id,
      quantity: p.quantity
    }))
  };

  // Encode data for URL
  const encodedData = btoa(JSON.stringify(minimalData));
  
  // Generate URL with base path and data
  const baseUrl = window.location.origin;
  return `${baseUrl}/preview/${data.id}?data=${encodedData}`;
}