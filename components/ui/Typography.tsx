import React from "react";
import { cn } from "@/lib/utils";

type TypographyProps = {
  variant: "h1" | "h2" | "h3" | "body1" | "body2" | "body3"; // Added body3
  className?: string;
  children: React.ReactNode;
};

const Typography: React.FC<TypographyProps> = ({ variant, className, children }) => {
  const baseStyles = "tracking-tight";
  
  const variants = {
    h1: "text-5xl md:text-6xl font-bold leading-tight",
    h2: "text-4xl md:text-5xl font-semibold leading-snug",
    h3: "text-2xl md:text-3xl font-semibold",
    body1: "text-lg md:text-xl font-normal",
    body2: "text-xs md:text-sm font-normal",
    body3: "text-xs md:text-sm font-light", // Added body3 (12px)
  };

  return <p className={cn(baseStyles, variants[variant], className)}>{children}</p>;
};

export default Typography;