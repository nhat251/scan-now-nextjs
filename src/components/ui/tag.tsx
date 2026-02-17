export type TagType = {
  id: string;
  tagString: string;
};

type TagProps = {
  tagString: string;
};

export function Tag({ tagString }: TagProps) {
  return (
    <span className="text-secondary-foreground bg-accent-foreground dark:border-muted-foreground rounded-full border px-3 py-1 text-xs font-semibold">
      {tagString}
    </span>
  );
}
