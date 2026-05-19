import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { Logo } from "@/components/icons/logo";

export const Footer = async () => {
  const currentYear = new Date().getFullYear();
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  const companyLinks = [
    { label: t("global.footer.links.about"), href: "#" },
    { label: t("global.footer.links.careers"), href: "#" },
    { label: t("global.footer.links.blog"), href: "#" },
  ];

  const legalLinks = [
    { label: t("global.footer.links.terms"), href: "#" },
    { label: t("global.footer.links.privacy"), href: "#" },
  ];

  const supportLinks = [
    { label: t("global.footer.links.customerSupport"), href: "#" },
    { label: t("global.footer.links.helpCenter"), href: "#" },
  ];

  return (
    <footer className="border-outline-variant/40 bg-surface-container-lowest border-t px-5 py-16 md:px-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        <div className="space-y-5">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <Logo width="32" height="32" bgColor="var(--primary-container)" />
            <span className="text-primary text-lg font-bold">{t("global.brand")}</span>
          </Link>
          <p className="text-on-surface-variant max-w-xs text-sm leading-relaxed">
            © {currentYear} {t("global.brand")}. {t("global.footer.description")}
          </p>
        </div>

        <FooterColumn title={t("global.footer.columns.company")} links={companyLinks} />
        <FooterColumn title={t("global.footer.columns.legal")} links={legalLinks} />
        <FooterColumn title={t("global.footer.columns.support")} links={supportLinks} />
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
