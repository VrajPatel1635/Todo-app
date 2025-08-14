export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isTodayISO(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const t0 = startOfToday().getTime();
  return d >= startOfToday() && d < new Date(t0 + 24 * 60 * 60 * 1000);
}

export function isOverdue(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d < startOfToday() && d < now && !isTodayISO(iso);
}

export function isUpcoming(iso) {
  if (!iso) return true; // No due date -> treat as upcoming
  const d = new Date(iso);
  return d >= startOfToday();
}

export function formatDate(iso) {
  if (!iso) return "No due date";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}