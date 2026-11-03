
"use client";

import Navbar from "@/components/ui/Shared/Navbar";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NavbarWrapper() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout failed");
      return;
    }

    toast.success("Logged out successfully");
    router.replace("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <header className="sticky top-0 z-50 h-18 border-b border-border bg-navbar" />
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
