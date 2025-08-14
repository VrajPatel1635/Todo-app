"use client";

import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, CheckCircle2, Circle, Flag, GripVertical, Pencil, Trash2 } from "lucide-react";
import { formatDate, isOverdue, isTodayISO } from "@/lib/date";
import Badge from "../ui/Badge";
import { cn } from "@/lib/cn";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const priorityColor = todo.priority === "high" ? "red" : todo.priority === "medium" ? "amber" : "indigo";

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className={cn("glass p-3 md:p-4 flex items-start gap-3 md:gap-4", isDragging && "ring-2 ring-brand-500/40")}
    >
      <button
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        onClick={onToggle}
        className="mt-0.5 shrink-0 rounded-lg p-1 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
      >
        {todo.completed ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-slate-400" />}
      </button>

      <div className={cn("flex-1 min-w-0", todo.completed && "opacity-70 line-through")}>
        <div className="flex items-center gap-2">
          <h4 className="font-medium truncate">{todo.title}</h4>
          <Badge color={priorityColor}>
            <span className="inline-flex items-center gap-1">
              <Flag className={cn("h-3.5 w-3.5", priorityColor === "red" ? "text-red-500" : priorityColor === "amber" ? "text-amber-500" : "text-indigo-500")} />
              {todo.priority}
            </span>
          </Badge>
        </div>
        {todo.description && <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 overflow-hidden text-ellipsis">{todo.description}</p>}

        <div className="flex items-center gap-2 mt-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg",
              isOverdue(todo.dueDate)
                ? "bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                : isTodayISO(todo.dueDate)
                ? "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            )}
          >
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(todo.dueDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <button {...attributes} {...listeners} aria-label="Drag to reorder" className="p-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/60 cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-slate-400" />
        </button>
        <button onClick={onEdit} aria-label="Edit task" className="p-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/60">
          <Pencil className="h-4 w-4" />
        </button>
        <button onClick={onDelete} aria-label="Delete task" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30">
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </motion.li>
  );
}