import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  className?: string;
  description: string;
  icon: ReactNode;
  title: string;
};

export const FeatureCard = ({ className, description, icon, title }: FeatureCardProps) => {
  return (
    <article
      className={cn(
        "group border-outline-variant/80 bg-surface-container-lowest hover:border-outline rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      <div className="bg-primary/10 text-primary group-hover:bg-primary-container group-hover:text-on-primary mb-6 flex size-14 items-center justify-center rounded-2xl transition-colors">
        {icon}
      </div>
      <h3 className="text-on-surface mb-3 text-2xl font-semibold">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed">{description}</p>
    </article>
  );
};
