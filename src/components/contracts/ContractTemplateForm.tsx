import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, GripVertical, X } from 'lucide-react';
import { ContractTemplate } from '../../types';

const contractTemplateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string(),
  styling: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
  }),
  footer: z.object({
    text: z.string(),
    includeSignature: z.boolean(),
  }),
});

type ContractTemplateFormData = z.infer<typeof contractTemplateSchema>;

interface ContractTemplateFormProps {
  onSubmit: (data: Partial<ContractTemplate>) => void;
  initialData?: Partial<ContractTemplate>;
}

export function ContractTemplateForm({ onSubmit, initialData }: ContractTemplateFormProps) {
  const [sections, setSections] = useState(initialData?.sections || []);
  const [variables, setVariables] = useState(initialData?.variables || []);
  const [signatureFields, setSignatureFields] = useState(
    initialData?.footer?.signatureFields || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractTemplateFormData>({
    resolver: zodResolver(contractTemplateSchema),
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

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        content: '',
        order: sections.length,
        required: true,
      },
    ]);
  };

  const addVariable = () => {
    setVariables([
      ...variables,
      {
        key: '',
        label: '',
        type: 'text',
        required: true,
      },
    ]);
  };

  const addSignatureField = () => {
    setSignatureFields([
      ...signatureFields,
      {
        label: '',
        role: 'customer',
        required: true,
      },
    ]);
  };

  const onFormSubmit = (data: ContractTemplateFormData) => {
    onSubmit({
      ...data,
      sections,
      variables,
      footer: {
        ...data.footer,
        signatureFields,
      },
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
        <h3 className="text-lg font-medium mb-4">Contract Sections</h3>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-1" />
              <div className="flex-1 space-y-4">
                <Input
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[index].title = e.target.value;
                    setSections(newSections);
                  }}
                  placeholder="Section Title"
                />
                <textarea
                  value={section.content}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[index].content = e.target.value;
                    setSections(newSections);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows={4}
                  placeholder="Section Content"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={section.required}
                    onChange={(e) => {
                      const newSections = [...sections];
                      newSections[index].required = e.target.checked;
                      setSections(newSections);
                    }}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Required Section
                  </label>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSections(sections.filter((_, i) => i !== index));
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addSection}>
            <Plus className="h-4 w-4 mr-1" /> Add Section
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Variables</h3>
        <div className="space-y-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Input
                  value={variable.key}
                  onChange={(e) => {
                    const newVariables = [...variables];
                    newVariables[index].key = e.target.value;
                    setVariables(newVariables);
                  }}
                  placeholder="Variable Key"
                />
                <Input
                  value={variable.label}
                  onChange={(e) => {
                    const newVariables = [...variables];
                    newVariables[index].label = e.target.value;
                    setVariables(newVariables);
                  }}
                  placeholder="Display Label"
                />
                <select
                  value={variable.type}
                  onChange={(e) => {
                    const newVariables = [...variables];
                    newVariables[index].type = e.target.value as any;
                    setVariables(newVariables);
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="boolean">Boolean</option>
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={variable.required}
                    onChange={(e) => {
                      const newVariables = [...variables];
                      newVariables[index].required = e.target.checked;
                      setVariables(newVariables);
                    }}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Required
                  </label>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setVariables(variables.filter((_, i) => i !== index));
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addVariable}>
            <Plus className="h-4 w-4 mr-1" /> Add Variable
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Footer & Signatures</h3>
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

          {signatureFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Input
                  value={field.label}
                  onChange={(e) => {
                    const newFields = [...signatureFields];
                    newFields[index].label = e.target.value;
                    setSignatureFields(newFields);
                  }}
                  placeholder="Signature Label"
                />
                <select
                  value={field.role}
                  onChange={(e) => {
                    const newFields = [...signatureFields];
                    newFields[index].role = e.target.value as any;
                    setSignatureFields(newFields);
                  }}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="customer">Customer</option>
                  <option value="representative">Representative</option>
                  <option value="witness">Witness</option>
                </select>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSignatureFields(signatureFields.filter((_, i) => i !== index));
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addSignatureField}>
            <Plus className="h-4 w-4 mr-1" /> Add Signature Field
          </Button>
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