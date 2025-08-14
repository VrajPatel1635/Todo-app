import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref
) {
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  }[size];

  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    secondary: "glass hover:opacity-90",
    ghost: "hover:glass",
    danger: "bg-red-600 text-white hover:bg-red-700"
  }[variant];

  return (
    <button
      ref={ref}
      className={cn("rounded-xl transition focus-visible:focus-ring", sizes, variants, className)}
      {...props}
    />
  );
});

export default Button;