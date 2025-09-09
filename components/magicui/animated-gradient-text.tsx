import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
        className,
      )}
      style={
        {
          "--bg-size": "400%",
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
