import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:-translate-y-[2px] active:translate-y-0",
  {
    variants: {
      variant: {
        none: "",
        default:
          "bg-primary-container text-on-primary shadow-md hover:bg-primary hover:text-on-primary hover:shadow-lg",
        secondary:
          "bg-secondary-container text-on-secondary shadow-md hover:bg-secondary hover:text-on-secondary hover:shadow-lg",
        accent: "bg-accent text-accent-foreground shadow-md hover:opacity-90 hover:shadow-lg",
        gradient:
          "bg-gradient-to-br from-primary-container via-primary-container to-secondary-container text-on-primary shadow-md hover:brightness-105 hover:shadow-lg",
        outline:
          "border-2 border-outline bg-transparent text-primary shadow-none hover:border-primary hover:bg-primary/5",
        ghost: "bg-transparent text-on-surface shadow-none hover:bg-surface-container-low",
        soft: "bg-surface-container-low text-on-surface shadow-none hover:bg-surface-container",
        link: "text-primary underline-offset-4 shadow-none hover:underline",
        success: "border border-success/60 bg-success text-success-foreground shadow-sm hover:bg-success/85",
        warning: "border border-warning/70 bg-warning text-warning-foreground shadow-sm hover:bg-warning/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg",
      },
      size: {
        default: "h-10 px-7 py-3 text-sm",
        sm: "h-9 gap-1.5 px-5 py-2 text-sm",
        lg: "h-11 px-8 py-3 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant = "default", size = "default", asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-size={size}
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
