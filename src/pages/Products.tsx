import React, { useState, useEffect } from 'react';
import { ProductList } from '../components/products/ProductList';
import { ProductHeader } from '../components/products/ProductHeader';
import { ProductRegistrationModal } from '../components/products/ProductRegistrationModal';
import { ImportProductsModal } from '../components/products/ImportProductsModal';
import { useProductsStore } from '../store/products';
import { Product } from '../types/product';
import { importProducts } from '../utils/productImport/importData';

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore();

  // Import initial products if none exist
  useEffect(() => {
    if (products.length === 0) {
      const importedProducts = importProducts();
      importedProducts.forEach(product => addProduct(product));
    }
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (data: Partial<Product>) => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, data);
    } else {
      addProduct({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'manual',
      } as Product);
    }
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };

  const handleClone = (product: Product) => {
    const clonedProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      model: `${product.model} (Cópia)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'clone'
    };
    addProduct(clonedProduct);
  };

  return (
    <div className="space-y-6">
      <ProductHeader 
        onAddClick={() => setIsModalOpen(true)}
        onImportClick={() => setIsImportModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ProductList
        products={filteredProducts}
        onEdit={(product) => {
          setSelectedProduct(product);
          setIsModalOpen(true);
        }}
        onDelete={deleteProduct}
        onClone={handleClone}
      />

      <ProductRegistrationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
      />

      <ImportProductsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}