"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, CirclePlay } from "lucide-react";

import { type LeadCaptureFormValues,LeadCaptureModal } from "@/components/molecules/lead-capture-modal";
import { Button } from "@/components/ui/button";
import type { SupportedLocale } from "@/constants/site";
import { buildContactChatUrl } from "@/helpers/buildContactChatUrl";
import { openExternalLink } from "@/helpers/commons";
import { scrollToElement } from "@/helpers/scrollToElement";
import { cn } from "@/lib/utils";
import { showNotify } from "@/stores/global";

type LeadSource = "hero-primary" | "feature-payment" | "final-primary";

export type PricingPlan = {
  key: string;
  name: string;
  price: string;
  period: string;
  cta: string;
  ctaVariant: "outline" | "default" | "secondary";
  highlight: boolean;
  badge?: string;
  features: string[];
};

type PricingCardsProps = {
  plans: PricingPlan[];
};

const sendLeadCaptureEmail = async (payload: {
  email: string;
  phone: string;
  location: string;
  locale: SupportedLocale;
  source: LeadSource;
}) => {
  const response = await fetch("/api/lead-capture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to send lead capture email");
  }
};

const useLeadCapture = () => {
  const t = useTranslations("landing");
  const locale = useLocale() as SupportedLocale;
  const [leadSource, setLeadSource] = useState<LeadSource>("hero-primary");
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openLeadModal = (source: LeadSource) => {
    setLeadSource(source);
    setIsLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  const openConsultationChat = () => {
    openExternalLink(buildContactChatUrl({ intent: "consultation", locale }));
  };

  const openPricingChat = (planName: string, price: string) => {
    openExternalLink(buildContactChatUrl({ intent: "pricing", locale, planName, price }));
  };

  const handleLeadSubmit = async (values: LeadCaptureFormValues) => {
    setIsSubmitting(true);

    try {
      await sendLeadCaptureEmail({ ...values, locale, source: leadSource });
      showNotify({ type: "success", message: t("leadForm.feedback.success") });
      closeLeadModal();
    } catch {
      showNotify({ type: "error", message: t("leadForm.feedback.error") });
      throw new Error("Failed to submit lead");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = (
    <LeadCaptureModal
      open={isLeadModalOpen}
      onClose={closeLeadModal}
      onSubmit={handleLeadSubmit}
      isSubmitting={isSubmitting}
    />
  );

  return {
    t,
    openLeadModal,
    openConsultationChat,
    openPricingChat,
    modal,
  };
};

export const SalesLandingHeroActions = () => {
  const { t, openLeadModal, modal } = useLeadCapture();

  return (
    <>
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <Button size="lg" className="w-full sm:w-auto" onClick={() => openLeadModal("hero-primary")}>
          {t("hero.ctaPrimary")}
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => scrollToElement("pricing")}>
          {t("hero.ctaSecondary")}
          <CirclePlay className="size-5" />
        </Button>
      </div>
      {modal}
    </>
  );
};

export const SalesLandingFeatureCta = () => {
  const { t, openLeadModal, modal } = useLeadCapture();

  return (
    <>
      <Button
        variant="secondary"
        size="lg"
        className="text-primary-container w-full border-white/15 bg-white hover:bg-white/90 sm:w-auto"
        onClick={() => openLeadModal("feature-payment")}
      >
        {t("featureDetails.paymentCta.button")}
        <ArrowRight className="size-5" />
      </Button>
      {modal}
    </>
  );
};

export const SalesLandingPricingCards = ({ plans }: PricingCardsProps) => {
  const { openPricingChat } = useLeadCapture();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
      {plans.map((plan) => (
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

          <Button variant={plan.ctaVariant} size="lg" className="mt-auto w-full" onClick={() => openPricingChat(plan.name, plan.price)}>
            {plan.cta}
          </Button>
        </article>
      ))}
    </div>
  );
};

export const SalesLandingFinalCtaActions = () => {
  const { t, openLeadModal, openConsultationChat, modal } = useLeadCapture();

  return (
    <>
      <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
        <Button size="lg" className="w-full sm:w-auto" onClick={() => openLeadModal("final-primary")}>
          {t("finalCta.primary")}
          <ArrowRight className="size-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full border-white/35 text-white hover:bg-white/10 sm:w-auto"
          onClick={openConsultationChat}
        >
          {t("finalCta.secondary")}
        </Button>
      </div>
      {modal}
    </>
  );
};

export const SalesLandingActions = SalesLandingPricingCards;
