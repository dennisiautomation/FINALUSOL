import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SectionEditor } from './SectionEditor';
import { ProposalSection } from '../../../types/proposal';

interface SectionListProps {
  sections: ProposalSection[];
  onSectionsChange: (sections: ProposalSection[]) => void;
}

export function SectionList({ sections, onSectionsChange }: SectionListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onSectionsChange(items.map((item, index) => ({ ...item, order: index })));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SectionEditor
                      type={section.type}
                      title={section.title}
                      content={section.content}
                      isRequired={section.isRequired}
                      onTitleChange={(title) => {
                        const newSections = [...sections];
                        newSections[index] = { ...section, title };
                        onSectionsChange(newSections);
                      }}
                      onContentChange={(content) => {
                        const newSections = [...sections];
                        newSections[index] = { ...section, content };
                        onSectionsChange(newSections);
                      }}
                      onRequiredChange={(isRequired) => {
                        const newSections = [...sections];
                        newSections[index] = { ...section, isRequired };
                        onSectionsChange(newSections);
                      }}
                      onRemove={() => {
                        onSectionsChange(sections.filter((_, i) => i !== index));
                      }}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}