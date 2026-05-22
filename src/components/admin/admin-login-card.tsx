"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, LockKeyholeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/services/admin";
import { login } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  identifier: z.string().trim().min(1, "Email or username is required"),
  password: z.string().trim().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

type AdminLoginCardProps = {
  onSuccess: () => void;
};

export const AdminLoginCard = ({ onSuccess }: AdminLoginCardProps) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setErrorMessage(null);
      setIsSubmitting(true);
      const response = await loginAdmin(values);
      const auth = response.data.result;

      if (auth?.accessToken) {
        localStorage.setItem("jwt", auth.accessToken);
      }

      if (auth?.user) {
        login({
          id: auth.user.id,
          name: auth.user.fullName,
          email: auth.user.email,
          avatar: auth.user.avatarUrl,
          username: auth.user.username,
          role: auth.user.role,
        });
      }

      onSuccess();
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign in with the provided admin credentials.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Card className="border-border/60 bg-surface-container-lowest mx-auto w-full max-w-lg rounded-[28px] shadow-xl">
      <CardHeader className="space-y-3">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
          <LockKeyholeIcon className="size-5" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Admin sign in</CardTitle>
        <CardDescription className="text-on-surface-variant leading-6">
          This admin portal uses protected backend endpoints. Sign in with an existing administrator account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or username</Label>
            <Input id="identifier" className="h-11 rounded-xl" {...register("identifier")} />
            {errors.identifier ? <p className="text-destructive text-sm">{errors.identifier.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="h-11 rounded-xl" {...register("password")} />
            {errors.password ? <p className="text-destructive text-sm">{errors.password.message}</p> : null}
          </div>

          {errorMessage ? <p className="text-destructive text-sm">{errorMessage}</p> : null}

          <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
