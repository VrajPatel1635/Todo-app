"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = (theme === "system" ? systemTheme : theme) || "light";
  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center justify-center h-10 w-10 rounded-xl glass hover:opacity-90 transition"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {current === "dark" ? (
          <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon className="h-5 w-5 text-slate-300" />
          </motion.span>
        ) : (
          <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun className="h-5 w-5 text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}