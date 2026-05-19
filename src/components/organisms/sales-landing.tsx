import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  HandCoins,
  Rocket,
  ScanLine,
  Sparkles,
  Users,
} from "lucide-react";

import { MetricItem } from "@/components/atoms/metric-item";
import { FeatureCard } from "@/components/molecules/feature-card";
import { SectionHeading } from "@/components/molecules/section-heading";
import { TestimonialCard } from "@/components/molecules/testimonial-card";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";

const brands = ["Saigon Bistro", "Luna Kitchen", "Mekong Bowl", "Ariya Café", "Lotus Dine"];

export const SalesLanding = () => {
  return (
    <main className="bg-background overflow-x-hidden">
      <HeroSection />
      <TrustedBySection />
      <BenefitsSection />
      <FeatureDetailSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
};

const HeroSection = async () => {
  const t = await getTranslations();

  return (
    <section id="hero" className="scroll-mt-header relative overflow-hidden bg-black px-5 pt-28 pb-24 md:px-16 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-35"
      />
      <div aria-hidden className="from-background/95 via-background/70 to-background/15 pointer-events-none absolute inset-0 bg-gradient-to-r" />
      <div aria-hidden className="from-background/70 via-background/15 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl space-y-8">
          <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase backdrop-blur-sm">
            <Sparkles className="size-4" />
            {t("landing.hero.badge")}
          </span>

          <h1 className="text-on-surface text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            {t("landing.hero.title.line1")} <br className="hidden md:block" />
            <span className="text-primary-container">{t("landing.hero.title.highlight")}</span> {t("landing.hero.title.line2")}
          </h1>

          <p className="text-on-surface-variant max-w-2xl text-base leading-relaxed sm:text-xl">{t("landing.hero.description")}</p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button size="lg" className="w-full sm:w-auto">
              {t("landing.hero.ctaPrimary")}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t("landing.hero.ctaSecondary")}
              <CirclePlay className="size-5" />
            </Button>
          </div>

          <div className="border-outline-variant/40 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4 sm:gap-10">
            <MetricItem value="300.000+" label={t("landing.hero.metrics.businesses")} />
            <MetricItem value="10.000+" label={t("landing.hero.metrics.partners")} />
            <MetricItem value={t("landing.hero.metrics.setupValue")} label={t("landing.hero.metrics.setup")} />
            <MetricItem value="24/7" label={t("landing.hero.metrics.support")} />
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustedBySection = async () => {
  const t = await getTranslations();

  return (
    <section className="border-outline-variant/30 bg-surface border-b px-5 py-12 md:px-16">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <p className="text-on-surface-variant text-center text-xs font-bold tracking-[0.2em] uppercase">
          {t("landing.trusted.title")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {brands.map((brand) => (
            <span
              key={brand}
              className="border-outline-variant/40 text-on-surface-variant bg-surface-container-low inline-flex rounded-full border px-5 py-2 text-sm font-semibold"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = async () => {
  const t = await getTranslations();

  const benefitItems = [
    {
      key: "speed",
      title: t("landing.benefits.items.speed.title"),
      description: t("landing.benefits.items.speed.description"),
      icon: <Rocket className="size-7" />,
    },
    {
      key: "cost",
      title: t("landing.benefits.items.cost.title"),
      description: t("landing.benefits.items.cost.description"),
      icon: <HandCoins className="size-7" />,
    },
    {
      key: "management",
      title: t("landing.benefits.items.management.title"),
      description: t("landing.benefits.items.management.description"),
      icon: <BarChart3 className="size-7" />,
    },
  ];

  return (
    <section id="benefits" className="scroll-mt-header bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title={t("landing.benefits.title")}
          description={t("landing.benefits.description")}
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {benefitItems.map((item) => (
            <FeatureCard key={item.key} title={item.title} description={item.description} icon={item.icon} className="p-10" />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureDetailSection = async () => {
  const t = await getTranslations();

  const featureGrid = [
    {
      key: "digitalMenu",
      title: t("landing.featureDetails.cards.digitalMenu.title"),
      description: t("landing.featureDetails.cards.digitalMenu.description"),
      icon: <ScanLine className="size-7" />,
    },
    {
      key: "analytics",
      title: t("landing.featureDetails.cards.analytics.title"),
      description: t("landing.featureDetails.cards.analytics.description"),
      icon: <BarChart3 className="size-7" />,
    },
    {
      key: "staff",
      title: t("landing.featureDetails.cards.staff.title"),
      description: t("landing.featureDetails.cards.staff.description"),
      icon: <Users className="size-7" />,
    },
    {
      key: "loyalty",
      title: t("landing.featureDetails.cards.loyalty.title"),
      description: t("landing.featureDetails.cards.loyalty.description"),
      icon: <Sparkles className="size-7" />,
    },
  ];

  const processSteps = [
    {
      key: "scan",
      title: t("landing.featureDetails.process.steps.scan.title"),
      description: t("landing.featureDetails.process.steps.scan.description"),
    },
    {
      key: "order",
      title: t("landing.featureDetails.process.steps.order.title"),
      description: t("landing.featureDetails.process.steps.order.description"),
    },
    {
      key: "sync",
      title: t("landing.featureDetails.process.steps.sync.title"),
      description: t("landing.featureDetails.process.steps.sync.description"),
    },
  ];

  return (
    <section id="feature-details" className="scroll-mt-header bg-surface-container-lowest px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl space-y-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow={t("landing.featureDetails.heading.eyebrow")}
            title={t("landing.featureDetails.heading.title")}
            description={t("landing.featureDetails.heading.description")}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {featureGrid.map((item) => (
              <article key={item.key} className="border-outline-variant/40 bg-surface-container rounded-2xl border p-6 shadow-sm">
                <div className="text-primary mb-4">{item.icon}</div>
                <h3 className="text-on-surface mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="from-primary-container to-secondary-container text-on-primary rounded-[2rem] bg-gradient-to-r p-8 sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <h3 className="text-2xl leading-tight font-bold sm:text-3xl">{t("landing.featureDetails.paymentCta.title")}</h3>
              <p className="text-on-primary/90 max-w-2xl text-sm leading-relaxed sm:text-base">
                {t("landing.featureDetails.paymentCta.description")}
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="text-primary-container w-full border-white/15 bg-white hover:bg-white/90 sm:w-auto"
            >
              {t("landing.featureDetails.paymentCta.button")}
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="border-outline-variant/40 bg-surface-container-low rounded-3xl border p-8 sm:p-10">
          <SectionHeading
            align="left"
            eyebrow={t("landing.featureDetails.process.eyebrow")}
            title={t("landing.featureDetails.process.title")}
            description={t("landing.featureDetails.process.description")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.key} className="bg-surface-container-lowest border-outline-variant/35 rounded-2xl border p-6">
                <p className="text-primary mb-4 text-sm font-bold tracking-[0.2em] uppercase">
                  {t("landing.featureDetails.process.stepLabel")} {index + 1}
                </p>
                <h4 className="text-on-surface mb-2 text-lg font-semibold">{step.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = async () => {
  const t = await getTranslations();

  const testimonialItems = [
    {
      key: "minh",
      name: t("landing.testimonials.items.minh.name"),
      role: t("landing.testimonials.items.minh.role"),
      quote: t("landing.testimonials.items.minh.quote"),
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
    },
    {
      key: "lan",
      name: t("landing.testimonials.items.lan.name"),
      role: t("landing.testimonials.items.lan.role"),
      quote: t("landing.testimonials.items.lan.quote"),
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    },
    {
      key: "hoang",
      name: t("landing.testimonials.items.hoang.name"),
      role: t("landing.testimonials.items.hoang.role"),
      quote: t("landing.testimonials.items.hoang.quote"),
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    },
  ];

  return (
    <section id="testimonials" className="scroll-mt-header bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title={t("landing.testimonials.title")}
          description={t("landing.testimonials.description")}
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonialItems.map((item) => (
            <TestimonialCard
              key={item.key}
              name={item.name}
              role={item.role}
              quote={item.quote}
              avatarUrl={item.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = async () => {
  const t = await getTranslations();

  const planCards = [
    {
      key: "basic",
      name: t("landing.pricing.plans.basic.name"),
      price: "200.000đ",
      period: t("landing.pricing.plans.basic.period"),
      cta: t("landing.pricing.plans.basic.cta"),
      ctaVariant: "outline" as const,
      highlight: false,
      features: [
        t("landing.pricing.plans.basic.features.menu"),
        t("landing.pricing.plans.basic.features.tables"),
        t("landing.pricing.plans.basic.features.report"),
      ],
    },
    {
      key: "premium",
      name: t("landing.pricing.plans.premium.name"),
      price: "500.000đ",
      period: t("landing.pricing.plans.premium.period"),
      cta: t("landing.pricing.plans.premium.cta"),
      ctaVariant: "default" as const,
      highlight: true,
      badge: t("landing.pricing.plans.premium.badge"),
      features: [
        t("landing.pricing.plans.premium.features.menu"),
        t("landing.pricing.plans.premium.features.tables"),
        t("landing.pricing.plans.premium.features.payment"),
        t("landing.pricing.plans.premium.features.support"),
      ],
    },
    {
      key: "enterprise",
      name: t("landing.pricing.plans.enterprise.name"),
      price: t("landing.pricing.plans.enterprise.price"),
      period: "",
      cta: t("landing.pricing.plans.enterprise.cta"),
      ctaVariant: "secondary" as const,
      highlight: false,
      features: [
        t("landing.pricing.plans.enterprise.features.branding"),
        t("landing.pricing.plans.enterprise.features.api"),
        t("landing.pricing.plans.enterprise.features.chain"),
      ],
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-header bg-surface-container-low px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title={t("landing.pricing.title")}
          description={t("landing.pricing.description")}
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {planCards.map((plan) => (
            <article
              key={plan.key}
              className={cn(
                "border-outline-variant/60 bg-surface-container-lowest relative flex h-full flex-col rounded-3xl border p-8 shadow-sm",
                plan.highlight && "border-primary-container shadow-primary-container/20 scale-[1.01] border-2 shadow-xl"
              )}
            >
              {plan.badge ? (
                <span className="bg-primary-container text-on-primary absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-wide">
                  {plan.badge}
                </span>
              ) : null}

              <div className="mb-8 pt-2">
                <h3 className="text-on-surface mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <p className="text-on-surface text-3xl font-extrabold">{plan.price}</p>
                  {plan.period ? <p className="text-on-surface-variant pb-1 text-sm">{plan.period}</p> : null}
                </div>
              </div>

              <ul className="mb-10 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-on-surface-variant flex items-start gap-3 text-sm">
                    <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.ctaVariant} size="lg" className="mt-auto w-full">
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = async () => {
  const t = await getTranslations();

  const faqItems = [
    {
      key: "setup",
      question: t("landing.faq.items.setup.question"),
      answer: t("landing.faq.items.setup.answer"),
      defaultOpen: true,
    },
    {
      key: "hardware",
      question: t("landing.faq.items.hardware.question"),
      answer: t("landing.faq.items.hardware.answer"),
      defaultOpen: false,
    },
    {
      key: "pricing",
      question: t("landing.faq.items.pricing.question"),
      answer: t("landing.faq.items.pricing.answer"),
      defaultOpen: false,
    },
    {
      key: "support",
      question: t("landing.faq.items.support.question"),
      answer: t("landing.faq.items.support.answer"),
      defaultOpen: false,
    },
  ];

  return (
    <section id="faq" className="scroll-mt-header bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeading
          title={t("landing.faq.title")}
          description={t("landing.faq.description")}
          className="mb-12"
        />

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.key}
              className="group border-outline-variant/40 bg-surface-container-low overflow-hidden rounded-2xl border"
              open={item.defaultOpen}
            >
              <summary className="hover:bg-surface-container-high cursor-pointer list-none p-6 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-on-surface text-base font-bold">{item.question}</p>
                  <ChevronDown className="text-primary size-5 shrink-0 transition-transform group-open:rotate-180" />
                </div>
              </summary>
              <Separator className="bg-outline-variant/25" />
              <p className="text-on-surface-variant p-6 text-sm leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCtaSection = async () => {
  const t = await getTranslations();

  return (
    <section id="final-cta" className="scroll-mt-header bg-on-surface relative overflow-hidden px-5 py-24 md:px-16">
      <div aria-hidden className="bg-primary/10 pointer-events-none absolute top-0 -right-24 h-full w-80 -skew-x-12" />
      <div aria-hidden className="bg-secondary/10 pointer-events-none absolute bottom-0 -left-20 h-full w-72 skew-x-12" />

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <h2 className="mx-auto mb-6 max-w-4xl text-4xl leading-tight font-extrabold text-white sm:text-5xl">
          {t("landing.finalCta.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-white/75 sm:text-xl">
          {t("landing.finalCta.description")}
        </p>

        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Button size="lg" className="w-full sm:w-auto">
            {t("landing.finalCta.primary")}
            <ArrowRight className="size-5" />
          </Button>
          <Button variant="outline" size="lg" className="w-full border-white/35 text-white hover:bg-white/10 sm:w-auto">
            {t("landing.finalCta.secondary")}
          </Button>
        </div>

        <p className="mt-7 text-xs text-white/45">{t("landing.finalCta.disclaimer")}</p>
      </div>
    </section>
  );
};
