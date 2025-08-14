"use client";

import { useMemo, useState } from "react";
import Button from "../ui/Button";
import Toolbar from "./Toolbar";
import TodoList from "./TodoList";
import Modal from "../ui/Modal";
import TodoForm from "./TodoForm";
import ConfirmDialog from "./ConfirmDialog";
import { useTodos } from "@/lib/todosContext";
import { isTodayISO, isUpcoming } from "@/lib/date";
import { Plus } from "lucide-react";

export default function TodoBoard({ view }) {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, reorderWithinSubset } = useTodos();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState({ key: "order", direction: "asc" });
  const [createOpen, setCreateOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const filtered = useMemo(() => {
    let list = todos.slice();

    list = list.filter(t => {
      if (view === "all") return true;
      if (view === "today") return !t.completed && isTodayISO(t.dueDate || null);
      if (view === "upcoming") return !t.completed && isUpcoming(t.dueDate || null) && !isTodayISO(t.dueDate || null);
      if (view === "completed") return t.completed;
      return true;
    });

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
      );
    }

    if (priority !== "all") {
      list = list.filter(t => t.priority === priority);
    }

    list.sort((a, b) => {
      let res = 0;
      switch (sort.key) {
        case "order":
          res = a.order - b.order; break;
        case "dueDate":
          res = (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) - (b.dueDate ? new Date(b.dueDate).getTime() : Infinity);
          break;
        case "priority":
          const pv = (p) => (p === "high" ? 3 : p === "medium" ? 2 : 1);
          res = pv(a.priority) - pv(b.priority); break;
        case "createdAt":
          res = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
        default:
          break;
      }
      return sort.direction === "asc" ? res : -res;
    });

    return list;
  }, [todos, view, search, priority, sort]);

  const editingTodo = editId ? todos.find(t => t.id === editId) || null : null;

  function handleCreate(values) {
    addTodo(values);
    setCreateOpen(false);
  }

  function handleEdit(values) {
    if (!editingTodo) return;
    updateTodo(editingTodo.id, values);
    setEditId(null);
  }

  function onReorder(oldIndex, newIndex) {
    reorderWithinSubset(filtered, oldIndex, newIndex);
  }

  return (
    <section className="py-6 md:py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-600 dark:text-slate-300 text-2xl md:text-3xl font-bold tracking-tight">
            {view === "all" ? "All Tasks" : view === "today" ? "Today" : view === "upcoming" ? "Upcoming" : "Completed"}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Stay on top of your day with a delightful, premium experience.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="hidden md:inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Task
        </Button>
      </div>

      <Button onClick={() => setCreateOpen(true)} className="md:hidden w-full inline-flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" /> New Task
      </Button>

      <div className="glass p-4 md:p-5 space-y-4 min-h-[calc(100vh-180px)]">
        <Toolbar
          search={search}
          setSearch={setSearch}
          priority={priority}
          setPriority={setPriority}
          sortKey={sort.key}
          setSortKey={(k) => setSort({ ...sort, key: k })}
          sortDir={sort.direction}
          setSortDir={(d) => setSort({ ...sort, direction: d })}
        />

        <TodoList
          items={filtered}
          onToggle={toggleComplete}
          onEdit={(id) => setEditId(id)}
          onDelete={(id) => setConfirmDeleteId(id)}
          onReorder={onReorder}
        />
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New task">
        <TodoForm mode="create" onSubmit={handleCreate} onCancel={() => setCreateOpen(false)} />
      </Modal>

      <Modal open={!!editId} onClose={() => setEditId(null)} title="Edit task">
        {editingTodo && (
          <TodoForm
            mode="edit"
            initial={editingTodo}
            onSubmit={handleEdit}
            onCancel={() => setEditId(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) deleteTodo(confirmDeleteId);
        }}
      />
    </section>
  );
}