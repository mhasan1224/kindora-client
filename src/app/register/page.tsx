"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Leaf,
  UserRound,
  Mail,
  Image as ImageIcon,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  image: z.string().url("Please enter a valid photo URL"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
    });

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Registration successful!");
    window.location.href = "/";
  };

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/register",
    });

    if (error) {
      toast.error(error.message || "Google registration failed");
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-background px-4 py-5">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <Card className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/5">
        <CardHeader className="space-y-2 px-6 pt-5 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center">
            <Image
              src="/kindora-logo.png"
              alt="Kindora Logo"
              width={100}
              height={100}
              className="h-14 w-14 rounded-2xl py-2 object-contain"
              priority
            />
          </div>

          <div className="space-y-1">

            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Create Your Account
            </CardTitle>

            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              Join our community and make a positive difference together.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-5 pt-3 sm:px-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-foreground"
              >
                Full Name
              </Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="h-10 rounded-lg border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                  {...form.register("name")}
                />
              </div>

              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 rounded-lg border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                  {...form.register("email")}
                />
              </div>

              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <Label
                htmlFor="image"
                className="text-sm font-semibold text-foreground"
              >
                Profile Photo URL
              </Label>

              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="h-10 rounded-lg border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                  {...form.register("image")}
                />
              </div>

              {form.formState.errors.image && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-foreground"
              >
                Password
              </Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="h-10 rounded-lg border-border bg-input-background pl-10 pr-12 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                  {...form.register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}

              <p className="text-xs leading-relaxed text-muted-foreground">
                At least 6 characters with uppercase and lowercase letters.
              </p>
            </div>

            {/* Email Registration */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || isGoogleLoading}
              className="h-10 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-60"
            >
              {form.formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Google Registration */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading || form.formState.isSubmitting}
            className="h-10 w-full rounded-lg border-border text-sm font-semibold text-foreground hover:bg-secondary disabled:opacity-60"
          >
            {isGoogleLoading ? (
              "Connecting to Google..."
            ) : (
              <>
                <svg viewBox="0 0 48 48" className="mr-2 h-5 w-5">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.98 6.19c4.66-4.3 6.79-10.62 6.79-17.84Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59A14.4 14.4 0 0 1 9.5 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.55 2.56 10.78l7.97-6.19Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.9-5.61l-7.98-6.19c-2.21 1.49-5.03 2.37-7.92 2.37-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          {/* Login Link */}
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary transition hover:text-primary/80 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
