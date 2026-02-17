"use client";

import { AlertTriangle } from "lucide-react";

import type { TypeFunction } from "@/types/commons";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

type ButtonModalProps = {
  isShow?: boolean;
  label?: string;
};

export type AlertModalProps = {
  open: boolean;
  onClose?: TypeFunction;
  onPositive?: TypeFunction;
  message?: string;
  title?: string;
  negativeButton?: ButtonModalProps;
  positiveButton?: ButtonModalProps;
  showClose?: boolean;
};

const NEGATIVE_BUTTON_LABEL_DEFAULT = "Cancel";
const POSITIVE_BUTTON_LABEL_DEFAULT = "OK";
const TITLE_DEFAULT = "Heads Up";

export const AlertModal = ({
  open,
  onClose,
  onPositive,
  message,
  title = TITLE_DEFAULT,
  negativeButton,
  positiveButton,
  showClose = true,
}: AlertModalProps) => {
  const { isShow: negativeShow = false, label: negativeLabel = NEGATIVE_BUTTON_LABEL_DEFAULT } =
    negativeButton ?? {};
  const { isShow: positiveShow = false, label: positiveLabel = POSITIVE_BUTTON_LABEL_DEFAULT } =
    positiveButton ?? {};

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogContent
        size="sm"
        showCloseButton={showClose}
        className="border-border/50 from-background via-background to-muted/30 overflow-hidden bg-gradient-to-br backdrop-blur-xl"
      >
        {/* Decorative accent gradient */}
        <div className="from-primary/20 via-primary/5 pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r to-transparent" />
        <div className="from-primary/10 pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br to-transparent blur-3xl" />

        <DialogHeader className="space-y-3">
          {/* Icon with animated glow */}
          <div className="relative mx-auto flex size-14 items-center justify-center sm:mx-0">
            <div className="from-primary/20 via-primary/10 absolute inset-0 animate-pulse rounded-full bg-gradient-to-br to-transparent" />
            <div className="from-primary/30 to-primary/10 relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-1 ring-white/10">
              <AlertTriangle className="text-primary size-6" />
            </div>
          </div>

          <DialogTitle className="text-foreground text-center text-xl font-bold tracking-tight sm:text-left">
            {title}
          </DialogTitle>

          {message && (
            <DialogDescription className="text-muted-foreground text-center text-sm leading-relaxed sm:text-left">
              {message}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="mt-2 gap-3 sm:gap-2">
          {negativeShow && (
            <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
              {negativeLabel}
            </Button>
          )}
          {positiveShow && (
            <Button
              variant="primaryBlue"
              onClick={onPositive}
              className="shadow-primary/20 flex-1 shadow-lg sm:flex-none"
            >
              {positiveLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
