import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { FileText, Plus, Pencil, Trash2, Check } from 'lucide-react';
import { useContractsStore } from '../store/contracts';
import { ContractTemplateModal } from '../components/contracts/ContractTemplateModal';
import { ContractTemplate } from '../types';

export default function ContractTemplates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { templates, addTemplate, updateTemplate, deleteTemplate, setActiveTemplate, activeTemplate } = useContractsStore();

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (data: Partial<ContractTemplate>) => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.id, {
        ...data,
        updatedAt: new Date(),
      });
    } else {
      addTemplate({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ContractTemplate);
    }
    setIsModalOpen(false);
    setSelectedTemplate(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Contract Templates</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Input
              type="search"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="mt-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No contract templates found. Create your first template to get started.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="relative bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    {activeTemplate === template.id && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4">
                      {template.description}
                    </p>

                    <div className="text-sm text-gray-500 mb-4">
                      <p>Last updated: {template.updatedAt.toLocaleDateString()}</p>
                      <p>{template.sections.length} sections</p>
                      <p>{template.variables.length} variables</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Button
                        variant={activeTemplate === template.id ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => setActiveTemplate(template.id)}
                      >
                        {activeTemplate === template.id ? 'Active' : 'Set as Active'}
                      </Button>
                      
                      <div className="space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setIsModalOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ContractTemplateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTemplate(undefined);
        }}
        onSubmit={handleSubmit}
        template={selectedTemplate}
      />
    </div>
  );
}