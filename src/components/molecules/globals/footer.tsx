"use client";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card relative z-20 border-t py-8 text-center">
      <p className="text-muted-foreground font-mono text-xs">
        © {currentYear} App router base | Nguyen Sinh Nhat
      </p>
    </footer>
  );
};
