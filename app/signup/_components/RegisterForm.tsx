"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import {
  registerSchema,
  RegisterSchemaInput,
  RegisterSchemaOutput,
} from "@/schemas/auth.schema";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterSchemaInput, unknown, RegisterSchemaOutput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterSchemaOutput) {
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      form.setError("root", {
        message: error.message ?? "Could not create account. Please try again.",
      });
      toast.error(error.message ?? "Registration failed");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-muted/10">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup className="space-y-4">
              {/* Root Error (e.g., email already exists) */}
              {form.formState.errors.root && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="register-name"
                      placeholder="John Doe"
                      aria-invalid={fieldState.invalid}
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="register-email"
                      type="email"
                      placeholder="john@example.com"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            form="register-form"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin mr-2 size-4" />
            )}
            Create Account
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-foreground font-medium"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
