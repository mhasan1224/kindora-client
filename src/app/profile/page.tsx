"use client";

import Link from "next/link";
import { Lock, Mail, Pencil, UserRound } from "lucide-react";

import ProfileShell from "@/components/Profile/ProfileShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <ProfileShell
      title="My"
      highlight="Profile"
      subtitle="View your personal information. Use Edit Profile to update your name or photo."
      callbackURL="/profile"
    >
      {({ user }) => {
        const fallbackInitial = (user.name || user.email)
          .charAt(0)
          .toUpperCase();

        return (
          <Card className="rounded-2xl border border-border bg-card shadow-lg shadow-foreground/5">
            <CardHeader className="space-y-1 border-b border-border px-6 py-5">
              <CardTitle className="text-lg font-semibold text-foreground">
                Account Details
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                This page is view-only. Your email address cannot be changed.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 py-6">
              {/* Profile summary */}
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <Avatar className="h-24 w-24 border border-border">
                  <AvatarImage
                    src={user.image || undefined}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-secondary text-2xl font-semibold text-secondary-foreground">
                    {fallbackInitial}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 space-y-1">
                  <p className="truncate text-xl font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Full name - read only */}
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">
                  Full Name
                </p>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <div className="flex h-10 items-center rounded-lg border border-border bg-muted pr-3 pl-10 text-sm text-foreground">
                    <span className="truncate">{user.name}</span>
                  </div>
                </div>
              </div>

              {/* Email - read only */}
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">
                  Email Address
                </p>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <div className="flex h-10 items-center rounded-lg border border-border bg-muted pr-3 pl-10 text-sm text-muted-foreground">
                    <span className="truncate">{user.email}</span>
                    <Lock className="ml-auto h-3.5 w-3.5 shrink-0" />
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  Your email address cannot be changed.
                </p>
              </div>
            </CardContent>

            <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
              <Button
                render={<Link href="/profile/edit" />}
                className="rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </Card>
        );
      }}
    </ProfileShell>
  );
}
