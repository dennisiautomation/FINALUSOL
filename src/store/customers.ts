import { create } from 'zustand';
import { Customer } from '../types';
import { db } from '../services/DatabaseService';

interface CustomersState {
  customers: Customer[];
  addCustomer: (customer: Customer) => Promise<void>;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  getCustomersByRepresentative: (representativeId: string) => Customer[];
  initializeStore: () => Promise<void>;
}

export const useCustomersStore = create<CustomersState>((set, get) => ({
  customers: [],

  addCustomer: async (customer) => {
    try {
      const response = await db.query('customers', 'POST', customer);
      set((state) => ({
        customers: [...state.customers, { ...customer, id: response.id }],
      }));
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  },

  updateCustomer: async (id, data) => {
    try {
      await db.query(`customers/${id}`, 'PUT', data);
      set((state) => ({
        customers: state.customers.map((cust) =>
          cust.id === id ? { ...cust, ...data } : cust
        ),
      }));
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    try {
      await db.query(`customers/${id}`, 'DELETE');
      set((state) => ({
        customers: state.customers.filter((cust) => cust.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },

  getCustomersByRepresentative: (representativeId) => {
    return get().customers.filter(c => c.representativeId === representativeId);
  },

  initializeStore: async () => {
    try {
      const customers = await db.query('customers');
      set({ customers });
    } catch (error) {
      console.error('Error initializing customers:', error);
      set({ customers: [] }); // Fallback to empty array on error
    }
  }
}));