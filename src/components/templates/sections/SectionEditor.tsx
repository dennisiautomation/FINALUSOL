import React from 'react';
import { Input } from '../../ui/Input';
import { RichTextEditor } from '../RichTextEditor';
import { SECTION_TYPES } from '../../../constants/proposalSections';

interface SectionEditorProps {
  section: any;
  index: number;
  register: any;
  errors: any;
  setValue: any;
}

export function SectionEditor({
  section,
  index,
  register,
  errors,
  setValue
}: SectionEditorProps) {
  const sectionType = SECTION_TYPES.find(t => t.id === section.type);

  const handleContentChange = (content: string) => {
    setValue(`sections.${index}.content`, content);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Título da Seção"
        defaultValue={section.title || sectionType?.defaultTitle}
        {...register(`sections.${index}.title`)}
        error={errors?.sections?.[index]?.title?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conteúdo
        </label>
        <RichTextEditor
          value={section.content || sectionType?.defaultContent}
          onChange={handleContentChange}
          placeholder="Digite o conteúdo da seção..."
          initialValue={section.content || sectionType?.defaultContent}
        />
        {errors?.sections?.[index]?.content?.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.sections[index].content.message}
          </p>
        )}
      </div>

      {!section.required && (
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register(`sections.${index}.optional`)}
            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-600">
            Seção Opcional
          </span>
        </div>
      )}
    </div>
  );
}