"use client";

import Navbar from "@/components/ui/Shared/Navbar";

export default function NavbarWrapper() {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return <Navbar user={null} onLogout={handleLogout} />;
}