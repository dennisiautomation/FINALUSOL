import { create } from 'zustand';
import { Proposal, ProposalStatus } from '../types';
import { db } from '../services/DatabaseService';

interface ProposalsState {
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => Promise<void>;
  updateProposal: (id: string, data: Partial<Proposal>) => Promise<void>;
  updateStatus: (id: string, status: ProposalStatus, representativeId: string) => Promise<void>;
  deleteProposal: (id: string) => Promise<void>;
  getProposalsByRepresentative: (representativeId: string) => Proposal[];
  initializeStore: () => Promise<void>;
}

export const useProposalsStore = create<ProposalsState>((set, get) => ({
  proposals: [],
  
  addProposal: async (proposal) => {
    try {
      const response = await db.createProposal(proposal);
      set((state) => ({
        proposals: [...state.proposals, { ...proposal, id: response.id }],
      }));
    } catch (error) {
      console.error('Error adding proposal:', error);
      throw error;
    }
  },
  
  updateProposal: async (id, data) => {
    try {
      await db.updateProposal(id, data);
      set((state) => ({
        proposals: state.proposals.map((prop) =>
          prop.id === id ? { ...prop, ...data } : prop
        ),
      }));
    } catch (error) {
      console.error('Error updating proposal:', error);
      throw error;
    }
  },
  
  updateStatus: async (id, status, representativeId) => {
    try {
      await db.updateProposal(id, { status });
      set((state) => ({
        proposals: state.proposals.map((prop) =>
          prop.id === id && prop.representativeId === representativeId ? {
            ...prop,
            status,
            updatedAt: new Date()
          } : prop
        ),
      }));
    } catch (error) {
      console.error('Error updating proposal status:', error);
      throw error;
    }
  },
  
  deleteProposal: async (id) => {
    try {
      await db.deleteProposal(id);
      set((state) => ({
        proposals: state.proposals.filter((prop) => prop.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting proposal:', error);
      throw error;
    }
  },
  
  getProposalsByRepresentative: (representativeId) => {
    return get().proposals.filter(p => p.representativeId === representativeId);
  },

  initializeStore: async () => {
    try {
      const proposals = await db.getProposals();
      set({ proposals });
    } catch (error) {
      console.error('Error initializing proposals:', error);
      throw error;
    }
  }
}));