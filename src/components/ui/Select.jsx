import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const Select = forwardRef(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn("w-full glass px-3 py-2 text-sm", className)}
      {...props}
    >
      {children}
    </select>
  );
});

export default Select;