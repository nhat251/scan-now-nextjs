import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center gap-2 justify-center whitespace-nowrap rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:-translate-y-[2px]",
  {
    variants: {
      variant: {
        none: "",
        default:
          "bg-primary text-secondary-foreground shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:text-primary-blue hover:shadow-[0_8px_20px_rgba(15,23,42,0.25)] dark:bg-primary-blue dark:hover:text-white",
        defaultWithTextWhite:
          "bg-primary text-white shadow-[0_4px_12px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.25)] dark:bg-primary-blue dark:hover:text-white",
        primaryBlue:
          "bg-primary-blue text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)]",
        secondary:
          "bg-secondary-foreground text-white shadow-[0_4px_12px_rgba(100,116,139,0.15)] hover:shadow-[0_6px_16px_rgba(100,116,139,0.25)]",
        accent:
          "bg-accent text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:bg-accent/90 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)]",
        gradient:
          "bg-gradient-to-br from-accent via-accent to-[#4F46E5] text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.4)]",
        outline:
          "bg-transparent text-primary border-2 border-border shadow-none hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-primary shadow-none hover:bg-muted",
        soft: "bg-muted text-primary shadow-none hover:bg-muted/80",
        link: "text-primary underline-offset-4 shadow-none hover:underline",
        success:
          "bg-success text-success-foreground border border-[#86efac] shadow-sm hover:bg-success/80",
        warning:
          "bg-warning text-warning-foreground border border-[#fcd34d] shadow-sm hover:bg-warning/80",
        destructive:
          "bg-destructive text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:bg-destructive/90 hover:shadow-[0_6px_16px_rgba(220,38,38,0.35)]",
      },

      size: {
        default: "h-9 px-7 py-3 text-[0.95rem]",
        sm: "h-8 rounded-full gap-1.5 px-5 py-2 text-sm",
        lg: "h-11 rounded-full px-7 py-3 text-base",
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

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
