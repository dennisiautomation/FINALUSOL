import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { SECTION_TYPES } from '../../constants/proposalSections';
import { RichTextEditor } from './RichTextEditor';

export function ProposalTemplateEditor() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const sections = watch('sections') || [];

  const moveSection = (from: number, to: number) => {
    const newSections = [...sections];
    const [removed] = newSections.splice(from, 1);
    newSections.splice(to, 0, removed);
    setValue('sections', newSections.map((section, index) => ({ ...section, order: index })));
  };

  const addSection = (type: string) => {
    const sectionType = SECTION_TYPES.find(t => t.id === type);
    if (!sectionType) return;

    setValue('sections', [
      ...sections,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        title: sectionType.defaultTitle,
        content: sectionType.defaultContent,
        order: sections.length,
        required: sectionType.required
      }
    ]);
  };

  const removeSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setValue('sections', newSections.map((section, idx) => ({ ...section, order: idx })));
  };

  return (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Informações Básicas
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Nome do Modelo"
            {...register('name')}
            error={errors.name?.message}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="residential">Residencial</option>
              <option value="commercial">Comercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
      </div>

      {/* Estilo do Cabeçalho */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Estilo do Cabeçalho
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Cor Principal"
            type="color"
            {...register('styling.primaryColor')}
            defaultValue="#f59e0b"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Imagem de Fundo (opcional)
            </label>
            <input
              type="url"
              {...register('styling.backgroundImage')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="URL da imagem (ex: https://...)"
            />
            <p className="mt-1 text-sm text-gray-500">
              Deixe em branco para usar apenas a cor
            </p>
          </div>
        </div>
      </div>

      {/* Seções da Proposta */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Seções da Proposta
          </h3>
          <div className="flex space-x-2">
            {SECTION_TYPES.map((type) => (
              <Button
                key={type.id}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSection(type.id)}
              >
                <Plus className="h-4 w-4 mr-1" />
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-gray-50 p-4 rounded-lg border"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                moveSection(fromIndex, index);
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move mr-2" />
                  <h4 className="font-medium text-gray-900">
                    {SECTION_TYPES.find(t => t.id === section.type)?.label || section.type}
                  </h4>
                </div>
                {!section.required && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSection(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  label="Título da Seção"
                  value={section.title}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[index].title = e.target.value;
                    setValue('sections', newSections);
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conteúdo
                  </label>
                  <RichTextEditor
                    value={section.content}
                    onChange={(value) => {
                      const newSections = [...sections];
                      newSections[index].content = value;
                      setValue('sections', newSections);
                    }}
                    initialValue={section.content}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}