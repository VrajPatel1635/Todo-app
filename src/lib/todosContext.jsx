"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { loadTodos, saveTodos } from "./storage";
import toast from "react-hot-toast";

const TodosContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map(t => t.id === action.payload.id ? { ...t, ...action.payload.data, updatedAt: new Date().toISOString() } : t);
    case "DELETE":
      return state.filter(t => t.id !== action.payload.id);
    case "TOGGLE":
      return state.map(t => t.id === action.payload.id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t);
    case "REORDER_ONE":
      return state.map(t => t.id === action.payload.id ? { ...t, order: action.payload.newOrder, updatedAt: new Date().toISOString() } : t);
    default:
      return state;
  }
}

export function TodosProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = loadTodos();
    dispatch({ type: "HYDRATE", payload: initial });
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveTodos(state);
  }, [state, mounted]);

  function addTodo(data) {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date().toISOString();
    const order = Date.now();
    const todo = { id, createdAt: now, updatedAt: now, order, ...data };
    dispatch({ type: "ADD", payload: todo });
    toast.success("Task added");
  }

  function updateTodo(id, data) {
    dispatch({ type: "UPDATE", payload: { id, data } });
    toast.success("Task updated");
  }

  function deleteTodo(id) {
    dispatch({ type: "DELETE", payload: { id } });
    toast.success("Task deleted");
  }

  function toggleComplete(id) {
    dispatch({ type: "TOGGLE", payload: { id } });
  }

  // Fractional indexing to reorder within current filtered subset
  function reorderWithinSubset(visible, oldIndex, newIndex) {
    if (oldIndex === newIndex) return;
    const moved = visible[oldIndex];
    let newOrder;

    if (newIndex === 0) {
      const next = visible[0];
      newOrder = next.order - 1;
    } else if (newIndex === visible.length - 1) {
      const prev = visible[visible.length - 1];
      newOrder = prev.order + 1;
    } else {
      const prev = visible[newIndex - 1];
      const next = visible[newIndex];
      newOrder = (prev.order + next.order) / 2;
    }

    dispatch({ type: "REORDER_ONE", payload: { id: moved.id, newOrder } });
    toast("List reordered", { icon: "↕️" });
  }

  const value = useMemo(
    () => ({ todos: state, addTodo, updateTodo, deleteTodo, toggleComplete, reorderWithinSubset }),
    [state]
  );

  if (!mounted) return null;
  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within TodosProvider");
  return ctx;
}