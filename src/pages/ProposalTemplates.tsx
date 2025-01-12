import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Copy, Eye, Plus, Pencil, Trash2, Check } from 'lucide-react';
import { useTemplatesStore } from '../store/templates';
import { CreateTemplateModal } from '../components/templates/CreateTemplateModal';
import { ProposalTemplate } from '../types/proposal';
import { useNavigate } from 'react-router-dom';

export default function ProposalTemplates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProposalTemplate | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { templates, addTemplate, updateTemplate, deleteTemplate, setActiveTemplate, activeTemplate, duplicateTemplate, getTemplateById } = useTemplatesStore();

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      setSelectedTemplate(template);
      setIsModalOpen(true);
    }
  };

  const handlePreview = (template: ProposalTemplate) => {
    setActiveTemplate(template.id);
    navigate('/preview');
  };

  const handleSubmit = (data: Partial<ProposalTemplate>) => {
    if (selectedTemplate) {
      updateTemplate(selectedTemplate.id, {
        ...data,
        updatedAt: new Date(),
      });
    } else {
      addTemplate({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      } as ProposalTemplate);
    }
    setIsModalOpen(false);
    setSelectedTemplate(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Modelos de Proposta</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Criar Modelo
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <Input
          type="search"
          placeholder="Buscar modelos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs mb-6"
        />

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
                    Ativo
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
                <p>Última atualização: {new Date(template.updatedAt).toLocaleDateString()}</p>
                <p>{template.sections.length} seções</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Button
                  variant={activeTemplate === template.id ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => setActiveTemplate(template.id)}
                >
                  {activeTemplate === template.id ? 'Ativo' : 'Definir como Ativo'}
                </Button>
                
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    title="Visualizar modelo"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(template.id)}
                    title="Editar modelo"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => duplicateTemplate(template.id)}
                    title="Duplicar modelo"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja excluir este modelo?')) {
                        deleteTemplate(template.id);
                      }
                    }}
                    title="Excluir modelo"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateTemplateModal
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