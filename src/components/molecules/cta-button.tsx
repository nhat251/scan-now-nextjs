"use client";
import { useTranslations } from "next-intl";

import { scrollToElement } from "@/helpers/scrollToElement";
import { Button } from "@/ui/button";

export const CTAButton = () => {
  const t = useTranslations();
  const handleClick = () => {
    scrollToElement("final-cta");
  };

  return (
    <Button size="sm" className="px-6" onClick={handleClick}>
      {t("global.header.startNow")}
    </Button>
  );
};
