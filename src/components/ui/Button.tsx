import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-primary-foreground hover:brightness-90 border border-primary shadow-sm",
            secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-accent/50 shadow-sm",
            outline: "bg-transparent text-foreground border border-primary hover:bg-primary hover:text-primary-foreground",
            ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
