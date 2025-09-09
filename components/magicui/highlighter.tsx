import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HighlighterProps {
  children: ReactNode;
  action?: "highlight" | "underline";
  color?: string;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#87CEFA",
  className,
}: HighlighterProps) {
  const baseClasses = "relative inline-block";
  
  const highlightClasses = action === "highlight" 
    ? "bg-opacity-30 px-1 py-0.5 rounded-sm"
    : "border-b-2 border-opacity-70";

  return (
    <span
      className={cn(baseClasses, highlightClasses, className)}
      style={{
        backgroundColor: action === "highlight" ? color : "transparent",
        borderBottomColor: action === "underline" ? color : "transparent",
      }}
    >
      {children}
    </span>
  );
}
