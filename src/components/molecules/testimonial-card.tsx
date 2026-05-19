import { Quote, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

type TestimonialCardProps = {
  avatarUrl: string;
  name: string;
  quote: string;
  role: string;
};

export const TestimonialCard = ({ avatarUrl, name, quote, role }: TestimonialCardProps) => {
  return (
    <article className="border-outline-variant/80 bg-surface-container-lowest relative rounded-3xl border p-8 shadow-sm">
      <Quote className="text-primary-container/20 absolute top-6 right-6 size-14" />

      <div className="text-primary-container mb-6 flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="size-4 fill-current" />
        ))}
      </div>

      <p className="text-on-surface-variant mb-8 leading-relaxed italic">{quote}</p>

      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-on-surface font-semibold">{name}</p>
          <p className="text-on-surface-variant text-sm">{role}</p>
        </div>
      </div>
    </article>
  );
};
