import type { SupportedLocale } from "@/constants/site";

const WHATSAPP_PHONE_NUMBER = "84365802210";

type ConsultationInput = {
  intent: "consultation";
  locale: SupportedLocale;
};

type PricingInput = {
  intent: "pricing";
  locale: SupportedLocale;
  planName: string;
  price: string;
};

type BuildContactChatUrlInput = ConsultationInput | PricingInput;

const getConsultationMessage = (locale: SupportedLocale) => {
  if (locale === "en") {
    return "Hi, I would like to get a consultation on your services.";
  }

  return "Chào bạn, mình cần tư vấn thêm về dịch vụ của bạn.";
};

const getPricingMessage = ({ locale, planName, price }: PricingInput) => {
  if (locale === "en") {
    return `Hi, I am interested in the ${planName} plan priced at ${price}.`;
  }

  return `Chào bạn, mình quan tâm đến gói ${planName} với mức giá ${price}.`;
};

export const buildContactChatUrl = (input: BuildContactChatUrlInput) => {
  const message =
    input.intent === "consultation"
      ? getConsultationMessage(input.locale)
      : getPricingMessage(input);

  const url = new URL(`https://wa.me/${WHATSAPP_PHONE_NUMBER}`);
  url.searchParams.set("text", message);

  return url.toString();
};
