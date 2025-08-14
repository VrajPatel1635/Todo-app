import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const Input = forwardRef(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn("w-full glass px-3 py-2 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500", className)}
      {...props}
    />
  );
});

export default Input;