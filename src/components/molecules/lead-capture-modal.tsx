"use client";

import { useTranslations } from "next-intl";
import { LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VIETNAM_LOCATIONS } from "@/constants/vietnamLocations";
import { zodResolver } from "@hookform/resolvers/zod";

type LeadCaptureModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: LeadCaptureFormValues) => Promise<void>;
  isSubmitting: boolean;
};

const phoneRegex = /^[0-9+()\-\s]{8,20}$/;

const useLeadCaptureSchema = () => {
  const t = useTranslations("landing.leadForm.validation");

  return z.object({
    phone: z
      .string()
      .trim()
      .min(1, t("phoneRequired"))
      .regex(phoneRegex, t("phoneInvalid")),
    email: z.string().trim().min(1, t("emailRequired")).email(t("emailInvalid")),
    location: z.string().trim().min(1, t("locationRequired")),
  });
};

export type LeadCaptureFormValues = z.infer<ReturnType<typeof useLeadCaptureSchema>>;

export const LeadCaptureModal = ({ open, onClose, onSubmit, isSubmitting }: LeadCaptureModalProps) => {
  const t = useTranslations("landing.leadForm");
  const schema = useLeadCaptureSchema();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadCaptureFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      email: "",
      location: "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
      onClose();
    }
  };

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
    reset();
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        size="md"
        className="border-border/50 from-background via-background to-surface-container-low overflow-hidden bg-gradient-to-br p-0 shadow-2xl backdrop-blur-xl"
      >
        <div className="from-primary/18 via-primary/8 absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent" />
        <div className="from-primary/15 absolute -top-20 -right-16 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-3xl" />

        <div className="space-y-6 p-6 sm:p-8">
          <DialogHeader className="space-y-3 text-left">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl ring-1 ring-white/20">
              <Mail className="size-5" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">{t("title")}</DialogTitle>
            <DialogDescription className="text-on-surface-variant text-sm leading-relaxed">
              {t("description")}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label htmlFor="lead-phone" className="text-on-surface text-sm font-semibold">
                {t("fields.phone.label")}
              </label>
              <div className="relative">
                <Phone className="text-on-surface-variant absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="lead-phone"
                  type="tel"
                  placeholder={t("fields.phone.placeholder")}
                  className="bg-surface-container-lowest h-11 rounded-xl pl-10"
                  aria-invalid={errors.phone ? "true" : "false"}
                  {...register("phone")}
                />
              </div>
              {errors.phone ? <p className="text-destructive text-sm">{errors.phone.message}</p> : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="lead-email" className="text-on-surface text-sm font-semibold">
                {t("fields.email.label")}
              </label>
              <div className="relative">
                <Mail className="text-on-surface-variant absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  id="lead-email"
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  className="bg-surface-container-lowest h-11 rounded-xl pl-10"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email")}
                />
              </div>
              {errors.email ? <p className="text-destructive text-sm">{errors.email.message}</p> : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="lead-location" className="text-on-surface text-sm font-semibold">
                {t("fields.location.label")}
              </label>
              <Controller
                control={control}
                name="location"
                render={({ field }) => (
                  <div className="relative">
                    <MapPin className="text-on-surface-variant absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="lead-location"
                        aria-invalid={errors.location ? "true" : "false"}
                        className="bg-surface-container-lowest h-11 w-full rounded-xl pl-10"
                      >
                        <SelectValue placeholder={t("fields.location.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {VIETNAM_LOCATIONS.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.location ? <p className="text-destructive text-sm">{errors.location.message}</p> : null}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => handleOpenChange(false)}>
                {t("actions.cancel")}
              </Button>
              <Button type="submit" className="rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    {t("actions.submitting")}
                  </>
                ) : (
                  t("actions.submit")
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
