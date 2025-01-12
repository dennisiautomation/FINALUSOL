import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, GripVertical, X } from 'lucide-react';
import { ProposalTemplate } from '../../types';

const templateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  header: z.object({
    logo: z.string().optional(),
    companyName: z.string().min(1, 'Company name is required'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
  footer: z.object({
    text: z.string(),
    includeSignature: z.boolean(),
  }),
  styling: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
  }),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface TemplateFormProps {
  onSubmit: (data: Partial<ProposalTemplate>) => void;
  initialData?: Partial<ProposalTemplate>;
}

export function TemplateForm({ onSubmit, initialData }: TemplateFormProps) {
  const [sections, setSections] = useState(initialData?.sections || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      ...initialData,
      styling: {
        primaryColor: '#000000',
        secondaryColor: '#666666',
        fontFamily: 'Arial',
        fontSize: '16px',
        ...initialData?.styling,
      },
    },
  });

  const addSection = (type: 'text' | 'products' | 'terms' | 'signature') => {
    setSections([
      ...sections,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        order: sections.length,
        title: '',
        content: '',
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const moveSection = (from: number, to: number) => {
    const newSections = [...sections];
    const [removed] = newSections.splice(from, 1);
    newSections.splice(to, 0, removed);
    setSections(newSections.map((section, index) => ({ ...section, order: index })));
  };

  const onFormSubmit = (data: TemplateFormData) => {
    onSubmit({
      ...data,
      sections,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Template Name"
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
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Header</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Company Name"
            {...register('header.companyName')}
            error={errors.header?.companyName?.message}
          />
          <Input
            label="Logo URL"
            {...register('header.logo')}
          />
          <Input
            label="Address"
            {...register('header.address')}
          />
          <Input
            label="Phone"
            {...register('header.phone')}
          />
          <Input
            label="Email"
            {...register('header.email')}
            error={errors.header?.email?.message}
          />
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Sections</h3>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
              <div className="flex-1">
                <Input
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[index].title = e.target.value;
                    setSections(newSections);
                  }}
                  placeholder="Section Title"
                />
              </div>
              <div className="text-sm text-gray-500">{section.type}</div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeSection(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => addSection('text')}>
              <Plus className="h-4 w-4 mr-1" /> Add Text Section
            </Button>
            <Button type="button" variant="outline" onClick={() => addSection('products')}>
              <Plus className="h-4 w-4 mr-1" /> Add Products Table
            </Button>
            <Button type="button" variant="outline" onClick={() => addSection('terms')}>
              <Plus className="h-4 w-4 mr-1" /> Add Terms
            </Button>
            <Button type="button" variant="outline" onClick={() => addSection('signature')}>
              <Plus className="h-4 w-4 mr-1" /> Add Signature
            </Button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Footer</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Footer Text</label>
            <textarea
              {...register('footer.text')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              rows={3}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('footer.includeSignature')}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Include Signature Block
            </label>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Styling</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Primary Color"
            type="color"
            {...register('styling.primaryColor')}
          />
          <Input
            label="Secondary Color"
            type="color"
            {...register('styling.secondaryColor')}
          />
          <Input
            label="Font Family"
            {...register('styling.fontFamily')}
          />
          <Input
            label="Font Size"
            {...register('styling.fontSize')}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {initialData ? 'Update Template' : 'Create Template'}
        </Button>
      </div>
    </form>
  );
}