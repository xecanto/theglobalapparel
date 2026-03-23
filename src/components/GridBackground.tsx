import { cn } from "@/lib/utils";

interface GridBackgroundProps {
    pattern?: "dots" | "grid";
    className?: string;
    opacity?: number;
    size?: number;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
    pattern = "dots",
    className,
    opacity = 0.05,
    size = 20,
}) => {
    const style = pattern === "dots"
        ? {
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: `${size}px ${size}px`,
            opacity,
        }
        : {
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: `${size}px ${size}px`,
            opacity,
        };

    return (
        <div
            className={cn("absolute inset-0 pointer-events-none", className)}
            style={style}
        />
    );
};
