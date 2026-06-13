import * as React from "react";

import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";

function Label({
  className,
  required,
  requiredClassName,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  required?: boolean;
  requiredClassName?: string;
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className={cn("text-destructive ml-0.5", requiredClassName)}>
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
}

export { Label };
