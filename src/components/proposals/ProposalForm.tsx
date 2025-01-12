import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProductsStore } from '../../store/products';
import { Product } from '../../types';

const proposalSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  validityDays: z.string().transform((val) => parseInt(val, 10)),
  notes: z.string().optional(),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  onSubmit: (data: ProposalFormData, selectedProducts: Array<{ product: Product; quantity: number }>) => void;
  customers: Array<{ id: string; name: string }>;
  initialData?: Partial<ProposalFormData>;
  isLoading?: boolean;
}

export function ProposalForm({ onSubmit, customers, initialData, isLoading }: ProposalFormProps) {
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: Product; quantity: number }>>([]);
  const { products } = useProductsStore();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: initialData,
  });

  const handleAddProduct = () => {
    const product = products.find(p => p.id === selectedProductId);
    if (product && quantity > 0) {
      setSelectedProducts([...selectedProducts, { product, quantity }]);
      setSelectedProductId('');
      setQuantity(1);
    }
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, { product, quantity }) => {
      return total + (product.price * quantity);
    }, 0);
  };

  const onFormSubmit = (data: ProposalFormData) => {
    onSubmit(data, selectedProducts);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer</label>
          <select
            {...register('customerId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customerId && (
            <p className="mt-1 text-sm text-red-600">{errors.customerId.message}</p>
          )}
        </div>

        <Input
          label="Validity (days)"
          type="number"
          {...register('validityDays')}
          error={errors.validityDays?.message}
        />
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-medium mb-4">Products</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>

          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            placeholder="Quantity"
          />

          <Button type="button" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Total</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map(({ product, quantity }, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{quantity}</td>
                    <td className="px-4 py-2 text-right">${product.price}</td>
                    <td className="px-4 py-2 text-right">${product.price * quantity}</td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeProduct(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
                  <td className="px-4 py-2 text-right">${calculateTotal()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
        <textarea
          {...register('paymentTerms')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          placeholder="Enter payment terms and conditions..."
        />
        {errors.paymentTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.paymentTerms.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          placeholder="Enter any additional notes..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Create Proposal
        </Button>
      </div>
    </form>
  );
}