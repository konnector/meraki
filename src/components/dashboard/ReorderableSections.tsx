'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

export type SectionType = {
  id: string;
  title: string;
  visible: boolean;
  component: React.ReactNode;
};

interface ReorderableSectionsProps {
  defaultSections: SectionType[];
  storageKey?: string;
  className?: string;
}

export function ReorderableSections({
  defaultSections,
  storageKey = 'dashboard-sections-order',
  className,
}: ReorderableSectionsProps) {
  // Use localStorage to remember section order and visibility
  const [sections, setSections] = useLocalStorage<SectionType[]>(
    storageKey,
    defaultSections
  );
  
  // State for client-side rendering (needed for drag and drop)
  const [isClient, setIsClient] = useState(false);
  
  // Handle order changes
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    // If dropped outside a droppable area
    if (!destination) return;
    
    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Reorder the sections
    const newSections = [...sections];
    const [removed] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, removed);
    
    setSections(newSections);
  };
  
  // Toggle section visibility
  const toggleSectionVisibility = (id: string) => {
    setSections(
      sections.map(section =>
        section.id === id
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  };
  
  // Set up client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Wait for client-side rendering before showing drag and drop
  if (!isClient) {
    return (
      <div className={className}>
        {sections
          .filter(section => section.visible)
          .map(section => (
            <div key={section.id} className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              {section.component}
            </div>
          ))}
      </div>
    );
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dashboard-sections">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={className}
          >
            {sections
              .filter(section => section.visible)
              .map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        'mb-8 transition-shadow',
                        snapshot.isDragging && 'shadow-lg rounded-xl'
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab p-1 hover:bg-accent rounded-md"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                      </div>
                      {section.component}
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