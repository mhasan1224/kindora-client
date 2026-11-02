"use client";

import Navbar from "@/components/ui/Shared/Navbar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function NavbarWrapper() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout failed");
      return;
    }

    toast.success("Logged out successfully");
  };

  if (isPending) {
    return (
      <header className="sticky top-0 z-50 h-18 border-b border-slate-200 bg-white/95" />
    );
  }

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? undefined,
      }
    : null;

  return <Navbar user={user} onLogout={handleLogout} />;
}