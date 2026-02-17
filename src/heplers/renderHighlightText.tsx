import React from "react";

/**
 * Renders text with highlighted portions wrapped in a styled element.
 *
 * @param text - The full text string to render
 * @param highlights - A string or array of strings to highlight within the text
 * @param className - CSS class name(s) to apply to highlighted portions
 * @param as - The HTML element type to wrap highlights in (default: "span")
 * @returns ReactNode with highlighted text portions
 *
 * @example
 * // Single highlight
 * renderHighlightText("Hello World", "World", "text-primary-blue")
 *
 * // Multiple highlights
 * renderHighlightText("Hello World Example", ["World", "Example"], "font-bold")
 */

type Props = {
  text: string;
  highlights: string | string[];
  className: string;
  as?: React.ElementType;
};

export function renderHighlightText({
  text,
  highlights,
  className,
  as = "span",
}: Props) {
  if (!text || !highlights) {
    return text;
  }

  const highlightArray = Array.isArray(highlights) ? highlights : [highlights];

  // Filter out empty strings
  const validHighlights = highlightArray.filter((h) => h && h.length > 0);

  if (validHighlights.length === 0) {
    return text;
  }

  // Escape special regex characters and create pattern
  const escapedHighlights = validHighlights.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escapedHighlights.join("|")})`, "g");

  // Split text by pattern, keeping the delimiters
  const parts = text.split(pattern);

  const Tag = as;

  return (
    <>
      {parts.map((part, index) =>
        validHighlights.includes(part) ? (
          <Tag key={index} className={className}>
            {part}
          </Tag>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
