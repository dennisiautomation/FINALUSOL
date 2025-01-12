import { ProposalData } from '../types/proposal';

export class ProposalLinkService {
  private readonly BASE_URL = window.location.origin;

  generateLink(data: ProposalData): string {
    // Encode proposal data
    const encodedData = btoa(JSON.stringify(data));
    
    // Generate unique ID
    const proposalId = Math.random().toString(36).substring(2, 15);
    
    // Create shareable link
    return `${this.BASE_URL}/preview/${proposalId}?data=${encodedData}`;
  }

  parseProposalData(encodedData: string): ProposalData {
    try {
      return JSON.parse(atob(encodedData));
    } catch (error) {
      throw new Error('Invalid proposal data');
    }
  }
}