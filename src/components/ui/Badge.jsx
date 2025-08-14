import { cn } from "@/lib/cn";

export default function Badge({ children, color = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
  };
  return <span className={cn("px-2 py-1 rounded-lg text-xs font-medium", map[color])}>{children}</span>;
}