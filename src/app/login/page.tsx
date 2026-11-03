"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Eye, EyeOff, Leaf, Mail, LockKeyhole, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Welcome back!");
    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gradient-to-br from-secondary via-background to-background px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-foreground/10 lg:min-h-[620px] lg:grid-cols-2">
        {/* Login Form Section */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-10 inline-flex items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center">
                <Image
                  src="/kindora-logo.png"
                  alt="Kindora Logo"
                  width={100}
                  height={100}
                  className="h-11 w-11 rounded-2xl py-1.5 object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                Kindora<span className="text-primary">.</span>
              </span>
            </Link>

            <div className="mb-8 space-y-3">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Welcome Back
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Sign in to your account
              </h1>

              <p className="leading-relaxed text-muted-foreground">
                Continue your journey and make a positive difference in your
                community.
              </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-foreground">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 rounded-xl border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                    {...form.register("email")}
                  />
                </div>

                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="font-semibold text-foreground"
                  >
                    Password
                  </Label>
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 rounded-xl border-border bg-input-background pl-10 pr-12 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                    {...form.register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90"
              >
                {form.formState.isSubmitting ? (
                  "Signing In..."
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight size={18} />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="h-12 w-full rounded-xl border-border font-semibold text-foreground hover:bg-secondary"
            >
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
            </Button>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-primary transition hover:text-primary/80 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>

        {/* Illustration Section */}
        <section className="relative hidden overflow-hidden bg-secondary lg:flex lg:items-center lg:justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-900 to-green-950 dark:from-slate-900 dark:via-slate-950 dark:to-black" />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-10 py-12 text-center">
            <div className="mb-8 max-w-md space-y-4">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                Small Acts, Big Impact
              </span>

              <h2 className="text-3xl font-bold leading-tight text-white xl:text-4xl">
                Together, We Can Make The World Better.
              </h2>

              <p className="leading-relaxed text-white/80">
                Discover meaningful events, connect with volunteers, and create
                positive change in your community.
              </p>
            </div>

            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card/95 p-4 shadow-2xl">
              <div className="flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl bg-secondary">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=85"
                  alt="Volunteers working together to protect the environment"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
              <Leaf size={18} />
              <span>Be part of something meaningful.</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
