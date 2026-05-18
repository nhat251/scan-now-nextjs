import Link from "next/link";

import { Logo } from "@/components/icons/logo";

const companyLinks = [
  { label: "Về chúng tôi", href: "#" },
  { label: "Tuyển dụng", href: "#" },
  { label: "Blog", href: "#" },
];

const legalLinks = [
  { label: "Điều khoản", href: "#" },
  { label: "Bảo mật", href: "#" },
];

const supportLinks = [
  { label: "Hỗ trợ khách hàng", href: "#" },
  { label: "Trung tâm trợ giúp", href: "#" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-outline-variant/40 bg-surface-container-lowest border-t px-5 py-16 md:px-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo width="32" height="32" bgColor="var(--primary-container)" />
            <span className="text-primary text-lg font-bold">Scan Now</span>
          </Link>
          <p className="text-on-surface-variant max-w-xs text-sm leading-relaxed">
            © {currentYear} Scan Now. Giải pháp gọi món thông minh cho nhà hàng hiện đại.
          </p>
        </div>

        <FooterColumn title="Công ty" links={companyLinks} />
        <FooterColumn title="Pháp lý" links={legalLinks} />
        <FooterColumn title="Hỗ trợ" links={supportLinks} />
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-on-surface text-xs font-bold tracking-[0.18em] uppercase">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-on-surface-variant hover:text-secondary text-sm transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
