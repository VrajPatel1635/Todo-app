"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { TodosProvider } from "@/lib/todosContext";

export default function Providers({ children }) {
  const pathname = usePathname();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TodosProvider>
        <Toaster position="top-right" toastOptions={{ className: "text-sm" }} />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-h-screen"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </TodosProvider>
    </ThemeProvider>
  );
}