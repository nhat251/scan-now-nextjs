import type { HTMLAttributeAnchorTarget } from "react";

export const openExternalLink = (
  url?: string,
  target: HTMLAttributeAnchorTarget | undefined = "_blank"
) => {
  if (!url || typeof window === "undefined") return;
  window.open(url, target);
};
