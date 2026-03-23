import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "reveal-up" | "reveal-left" | "reveal-right" | "reveal-scale";
  delay?: string;
}

export default function ScrollReveal({
  children,
  className,
  animation = "reveal-up",
  delay,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && `${animation} ${delay ?? ""}`,
        className
      )}
    >
      {children}
    </div>
  );
}
