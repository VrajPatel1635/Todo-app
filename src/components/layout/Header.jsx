"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import ThemeToggle from "./ThemeToggle";
import { CheckCircle2 } from "lucide-react";

const tabs = [
  { href: "/all", label: "All" },
  { href: "/today", label: "Today" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/completed", label: "Completed" }
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-slate-900/40 border-b border-white/30 dark:border-white/10">
      <div className="mx-auto w-full max-w-screen-2xl flex items-center justify-between py-4 px-4 md:px-6">
        <Link href="/all" className="flex items-center gap-2">
          <div className="glass h-9 w-9 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-brand-600" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-100">Premium Todo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map(t => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm transition",
                  active ? "glass text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300 hover:glass"
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <div className="md:hidden mx-auto w-full max-w-screen-2xl px-4 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {tabs.map(t => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  "text-center py-2 rounded-xl text-sm transition",
                  active ? "glass" : "hover:glass text-slate-600 dark:text-slate-300"
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}