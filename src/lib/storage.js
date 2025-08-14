const KEY = "premium_todos_v1";

export function loadTodos() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(todos));
}