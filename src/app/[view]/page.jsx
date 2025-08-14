import TodoBoard from "@/components/todos/TodoBoard";

export default async function ViewPage({ params }) {
  const { view } = await params; // important in newer Next.js
  const v = (view || "").toLowerCase();
  const allowed = ["all", "today", "upcoming", "completed"];
  return <TodoBoard view={allowed.includes(v) ? v : "all"} />;
}