"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Button from "../ui/Button";
import Select from "../ui/Select";
import { Calendar, Check } from "lucide-react";

export default function TodoForm({ mode, initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priority, setPriority] = useState(initial?.priority ?? "medium");
  const [date, setDate] = useState(initial?.dueDate ? new Date(initial.dueDate) : null);
  const [completed, setCompleted] = useState(initial?.completed ?? false);

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setPriority(initial?.priority ?? "medium");
    setDate(initial?.dueDate ? new Date(initial.dueDate) : null);
    setCompleted(initial?.completed ?? false);
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: date ? date.toISOString() : null,
      priority,
      completed
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-transparent backdrop-blur-xl">
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          className="w-full glass px-3 py-2 rounded-xl"
          placeholder="e.g. Prepare project proposal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea
          className="w-full min-h-[90px] glass px-3 py-2 rounded-xl"
          placeholder="Optional details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm mb-1">Priority</label>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Due date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="w-full glass pl-9 pr-3 py-2 rounded-xl text-sm"
              placeholderText="Pick a date (optional)"
              dateFormat="MMM d, yyyy"
              isClearable
            />
          </div>
        </div>
      </div>

      {mode === "edit" && (
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          <span className="text-sm">Mark as completed</span>
        </label>
      )}

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="inline-flex items-center gap-2">
          <Check className="h-4 w-4" />
          {mode === "create" ? "Add task" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}