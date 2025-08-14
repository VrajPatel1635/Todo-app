"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

export default function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute inset-0 flex items-end md:items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={cn("w-full max-w-lg glass p-4 md:p-6", className)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button aria-label="Close" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100/60 dark:hover:bg-slate-800/60">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}