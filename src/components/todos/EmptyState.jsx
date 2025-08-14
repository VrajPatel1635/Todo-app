import { ClipboardList } from "lucide-react";

export default function EmptyState({ label = "No tasks yet", subtitle = "Create your first task to get started." }) {
  return (
    <div className="glass p-8 text-center">
      <div className="mx-auto h-12 w-12 rounded-2xl flex items-center justify-center bg-brand-600/10 text-brand-600 mb-3">
        <ClipboardList className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{label}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm">{subtitle}</p>
    </div>
  );
}