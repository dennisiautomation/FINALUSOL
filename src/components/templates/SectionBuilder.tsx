import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { ProposalSection } from '../../types/proposal';
import { DEFAULT_SECTIONS } from './sections/DefaultSections';
import { PlaceholderHelper } from './PlaceholderHelper';

interface SectionBuilderProps {
  control: Control<any>;
}

export function SectionBuilder({ control }: SectionBuilderProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'sections'
  });

  const addSection = (type: ProposalSection['type']) => {
    const defaultSection = DEFAULT_SECTIONS.find(s => s.type === type);
    append({
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: defaultSection?.title || '',
      content: defaultSection?.content || '',
      order: fields.length,
      isRequired: defaultSection?.isRequired || false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Seções da Proposta</h3>
        <div className="flex space-x-2">
          {['introduction', 'technical', 'equipment', 'benefits', 'financial', 'charts', 'notes'].map((type) => (
            <Button 
              key={type}
              type="button" 
              variant="outline" 
              onClick={() => addSection(type as ProposalSection['type'])}
            >
              <Plus className="h-4 w-4 mr-1" /> 
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <PlaceholderHelper />

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
            <button
              type="button"
              className="mt-2 cursor-move"
              onMouseDown={(e) => {
                e.preventDefault();
                const startY = e.pageY;
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const currentY = moveEvent.pageY;
                  const diff = Math.round((currentY - startY) / 40);
                  if (diff !== 0) {
                    const newIndex = Math.max(0, Math.min(index + diff, fields.length - 1));
                    move(index, newIndex);
                  }
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                }, { once: true });
              }}
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </button>

            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Título da Seção"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  {...control.register(`sections.${index}.title`)}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    {...control.register(`sections.${index}.isRequired`)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Obrigatória</span>
                </div>
              </div>
              
              <textarea
                placeholder="Conteúdo da Seção"
                rows={5}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 font-mono text-sm"
                {...control.register(`sections.${index}.content`)}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              disabled={field.isRequired}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}