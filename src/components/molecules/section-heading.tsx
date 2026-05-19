import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  align?: "left" | "center";
  className?: string;
  description: string;
  eyebrow?: string;
  title: string;
};

export const SectionHeading = ({
  align = "center",
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) => {
  return (
    <div className={cn("space-y-4", align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-on-surface text-3xl leading-tight font-bold sm:text-4xl">{title}</h2>
      <p
        className={cn(
          "text-on-surface-variant text-base leading-relaxed sm:text-lg",
          align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
        )}
      >
        {description}
      </p>
    </div>
  );
};
