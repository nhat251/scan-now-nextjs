"use client";

import { useEffect } from "react";
import { LoaderCircle, PencilIcon, UserPlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import type { CreateOwnerPayload, OwnerRecord, UpdateOwnerPayload } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = /^[0-9+()\-\s]{8,20}$/;
const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const nonAlphanumericRegex = /[^A-Za-z0-9]/;

const createSchema = (isEdit: boolean) =>
  z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    username: z.string().trim().min(1, "Username is required"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
    phoneNumber: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || phoneRegex.test(value), "Invalid phone number"),
    password: isEdit
      ? z.string().optional()
      : z
          .string()
          .trim()
          .min(6, "Password must be at least 6 characters")
          .refine((value) => lowercaseRegex.test(value), "Password must include at least one lowercase letter")
          .refine((value) => uppercaseRegex.test(value), "Password must include at least one uppercase letter")
          .refine(
            (value) => nonAlphanumericRegex.test(value),
            "Password must include at least one non-alphanumeric character"
          ),
  });

type FormValues = {
  fullName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  password: string | undefined;
};

type CreateOwnerDialogProps = {
  open: boolean;
  owner: OwnerRecord | null;
  isSubmitting: boolean;
  onClose: () => void;
  onCreate: (payload: CreateOwnerPayload) => Promise<void>;
  onUpdate: (id: string, payload: UpdateOwnerPayload) => Promise<void>;
};

export const CreateOwnerDialog = ({
  open,
  owner,
  isSubmitting,
  onClose,
  onCreate,
  onUpdate,
}: CreateOwnerDialogProps) => {
  const isEdit = Boolean(owner);
  const schema = createSchema(isEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    reset({
      fullName: owner?.fullName || "",
      username: owner?.username || "",
      email: owner?.email || "",
      phoneNumber: owner?.phoneNumber || "",
      password: "",
    });
  }, [open, owner, reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
      onClose();
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    if (owner) {
      await onUpdate(owner.userId, {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        phoneNumber: values.phoneNumber || null,
      });
      return;
    }

    await onCreate({
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber || null,
      password: values.password || "",
    });
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent size="lg" className="border-border/50 bg-background overflow-hidden rounded-[28px] p-0">
        <div className="from-primary/12 absolute -top-20 -right-10 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-3xl" />
        <div className="space-y-6 p-6 sm:p-8">
          <DialogHeader className="space-y-3 text-left">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
              {isEdit ? <PencilIcon className="size-5" /> : <UserPlusIcon className="size-5" />}
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">
              {isEdit ? "Edit Owner" : "Create Owner"}
            </DialogTitle>
            <DialogDescription className="text-on-surface-variant text-sm leading-relaxed">
              {isEdit
                ? "Update the owner profile information synced from the admin backend."
                : "Create a new owner account in the Scan Now admin backend."}
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="owner-full-name">Full name</Label>
              <Input id="owner-full-name" className="h-11 rounded-xl" {...register("fullName")} />
              {errors.fullName ? <p className="text-destructive text-sm">{errors.fullName.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner-username">Username</Label>
              <Input id="owner-username" className="h-11 rounded-xl" {...register("username")} />
              {errors.username ? <p className="text-destructive text-sm">{errors.username.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner-phone-number">Phone number</Label>
              <Input id="owner-phone-number" className="h-11 rounded-xl" {...register("phoneNumber")} />
              {errors.phoneNumber ? <p className="text-destructive text-sm">{errors.phoneNumber.message}</p> : null}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="owner-email">Email</Label>
              <Input id="owner-email" type="email" className="h-11 rounded-xl" {...register("email")} />
              {errors.email ? <p className="text-destructive text-sm">{errors.email.message}</p> : null}
            </div>

            {!isEdit ? (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="owner-password">Password</Label>
                <Input id="owner-password" type="password" className="h-11 rounded-xl" {...register("password")} />
                {errors.password ? <p className="text-destructive text-sm">{errors.password.message}</p> : null}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : isEdit ? (
                  "Update Owner"
                ) : (
                  "Create Owner"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
