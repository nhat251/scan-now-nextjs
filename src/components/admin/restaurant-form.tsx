"use client";

import { useEffect } from "react";
import { LoaderCircle, StoreIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AvailableOwnerRecord, RestaurantRecord } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";

const urlRegex = /^https?:\/\/.+/;

const formSchema = z.object({
  ownerId: z.string().min(1, "Owner is required"),
  name: z.string().trim().min(1, "Restaurant name is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  logoUrl: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || urlRegex.test(value), "Logo URL must be a valid URL starting with http:// or https://"),
  description: z.string().trim().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type RestaurantFormProps = {
  restaurant: RestaurantRecord | null;
  availableOwners: AvailableOwnerRecord[];
  isSubmitting: boolean;
  onSave: (values: FormValues) => Promise<void>;
  onCancel: () => void;
};

export const RestaurantForm = ({
  restaurant,
  availableOwners,
  isSubmitting,
  onSave,
  onCancel,
}: RestaurantFormProps) => {
  const isEdit = Boolean(restaurant);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerId: "",
      name: "",
      slug: "",
      logoUrl: "",
      description: "",
    },
  });

  const selectedOwnerId = watch("ownerId");

  useEffect(() => {
    if (!restaurant) {
      reset({
        ownerId: "",
        name: "",
        slug: "",
        logoUrl: "",
        description: "",
      });
      return;
    }
    reset({
      ownerId: restaurant.ownerId,
      name: restaurant.name,
      slug: restaurant.slug,
      logoUrl: restaurant.logoUrl || "",
      description: restaurant.description || "",
    });
  }, [restaurant, reset]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setValue("name", name);
    if (!restaurant) {
      setValue("slug", generateSlug(name));
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    await onSave(values);
  });

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="border-border/60 bg-surface-container-lowest rounded-3xl border p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
            <StoreIcon className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {isEdit ? "Edit Restaurant" : "Create Restaurant"}
            </h2>
            <p className="text-on-surface-variant text-sm">
              {isEdit
                ? "Update the restaurant information."
                : "Fill in the details to register a new restaurant."}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {!isEdit ? (
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="restaurant-owner" required>Owner</Label>
              <Select
                value={selectedOwnerId}
                onValueChange={(value) => setValue("ownerId", value)}
              >
                <SelectTrigger
                  id="restaurant-owner"
                  className="bg-background border-border/60 h-11 rounded-xl"
                >
                  <SelectValue placeholder="Select an owner" />
                </SelectTrigger>
                <SelectContent>
                  {availableOwners.length === 0 ? (
                    <SelectItem value="__none__" disabled>
                      No available owners
                    </SelectItem>
                  ) : (
                    availableOwners.map((owner) => (
                      <SelectItem key={owner.userId} value={owner.userId}>
                        {owner.fullName} ({owner.email})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.ownerId ? (
                <p className="text-destructive text-sm">{errors.ownerId.message}</p>
              ) : null}
              {!isEdit && availableOwners.length === 0 ? (
                <p className="text-muted-foreground text-xs">
                  No owners available. All owners already have a restaurant assigned.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="restaurant-name" required>Restaurant name</Label>
            <Input
              id="restaurant-name"
              className="h-11 rounded-xl"
              {...register("name")}
              onChange={handleNameChange}
            />
            {errors.name ? (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurant-slug" required>Slug</Label>
            <Input id="restaurant-slug" className="h-11 rounded-xl" {...register("slug")} />
            {errors.slug ? (
              <p className="text-destructive text-sm">{errors.slug.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="restaurant-logo-url">Logo URL</Label>
            <Input
              id="restaurant-logo-url"
              type="url"
              placeholder="https://example.com/logo.png"
              className="h-11 rounded-xl"
              {...register("logoUrl")}
            />
            {errors.logoUrl ? (
              <p className="text-destructive text-sm">{errors.logoUrl.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="restaurant-description">Description</Label>
            <Textarea
              id="restaurant-description"
              rows={4}
              className="rounded-xl"
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" className="rounded-xl" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="rounded-xl" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Saving...
            </>
          ) : isEdit ? (
            "Update Restaurant"
          ) : (
            "Create Restaurant"
          )}
        </Button>
      </div>
    </form>
  );
};
