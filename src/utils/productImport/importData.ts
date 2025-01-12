import { Product } from '../../types/product';
import { sampleProducts } from './sampleData';

export function importProducts(): Product[] {
  return sampleProducts.map(product => ({
    ...product,
    id: product.id || Math.random().toString(36).substr(2, 9),
    createdAt: product.createdAt || new Date(),
    updatedAt: product.updatedAt || new Date(),
    createdBy: product.createdBy || 'import'
  }));
}