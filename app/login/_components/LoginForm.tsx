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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import {
  loginSchema,
  LoginSchemaInput,
  LoginSchemaOutput,
} from "@/schemas/auth.schema";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginSchemaInput, unknown, LoginSchemaOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchemaOutput) {
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      form.setError("root", {
        message: error.message ?? "Could not sign in. Please try again.",
      });
      toast.error(error.message ?? "Login failed");
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-muted/10">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup className="space-y-4">
              {/* Root Error */}
              {form.formState.errors.root && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {form.formState.errors.root.message}
                </div>
              )}

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-email"
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
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
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
            form="login-form"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin mr-2 size-4" />
            )}
            Sign In
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="underline hover:text-foreground font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
