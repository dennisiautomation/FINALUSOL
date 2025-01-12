import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().transform((val) => parseFloat(val)),
  category: z.string().min(2, 'Category is required'),
  specifications: z.record(z.string()),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
  isLoading?: boolean;
}

export function ProductForm({ onSubmit, initialData, isLoading }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Product Name"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          rows={3}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <Input
        label="Price"
        type="number"
        step="0.01"
        {...register('price')}
        error={errors.price?.message}
      />
      
      <Input
        label="Category"
        {...register('category')}
        error={errors.category?.message}
      />

      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
}