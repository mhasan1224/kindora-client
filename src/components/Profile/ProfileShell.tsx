"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/auth-client";

export interface ProfileShellContext {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  refetch: ReturnType<typeof useSession>["refetch"];
}

interface ProfileShellProps {
  title: string;
  highlight: string;
  subtitle: string;
  callbackURL: string;
  children: (context: ProfileShellContext) => ReactNode;
}

export default function ProfileShell({
  title,
  highlight,
  subtitle,
  callbackURL,
  children,
}: ProfileShellProps) {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?callbackURL=${callbackURL}`);
    }
  }, [isPending, session, router, callbackURL]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Skeleton className="h-10 w-56 rounded-full" />
          <Skeleton className="mt-4 h-5 w-80" />
          <Skeleton className="mt-10 h-96 w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base text-muted-foreground">
            Redirecting to the login page...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            <UserRound size={16} />
            Your Account
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title} <span className="text-primary">{highlight}</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        {children({ user: session.user, refetch })}
      </div>
    </main>
  );
}
