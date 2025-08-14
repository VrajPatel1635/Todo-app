"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

export default function TodoList({ items, onToggle, onEdit, onDelete, onReorder }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) onReorder(oldIndex, newIndex);
  }

  if (!items.length) return <EmptyState label="All clear" subtitle="No tasks match your view." />;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-3 md:space-y-4">
          <AnimatePresence initial={false}>
            {items.map(t => (
              <TodoItem
                key={t.id}
                todo={t}
                onToggle={() => onToggle(t.id)}
                onEdit={() => onEdit(t.id)}
                onDelete={() => onDelete(t.id)}
              />
            ))}
          </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  );
}