import { create } from 'zustand';
import { Product } from '../types';
import { db } from '../services/DatabaseService';

interface ProductsState {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  initializeStore: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],

  addProduct: async (product) => {
    try {
      const response = await db.query('products', 'POST', product);
      set((state) => ({
        products: [...state.products, { ...product, id: response.id }],
      }));
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    try {
      await db.query(`products/${id}`, 'PUT', data);
      set((state) => ({
        products: state.products.map((prod) =>
          prod.id === id ? { ...prod, ...data } : prod
        ),
      }));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await db.query(`products/${id}`, 'DELETE');
      set((state) => ({
        products: state.products.filter((prod) => prod.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  initializeStore: async () => {
    try {
      const products = await db.query('products');
      set({ products });
    } catch (error) {
      console.error('Error initializing products:', error);
      set({ products: [] }); // Fallback to empty array on error
    }
  }
}));