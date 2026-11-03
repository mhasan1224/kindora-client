
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  CalendarCheck,
  PlusCircle,
  Users,
  LogIn,
  LogOut,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarUser {
  name: string;
  email?: string;
  image?: string;
}

interface NavbarProps {
  user: NavbarUser | null;
  onLogout: () => void | Promise<void>;
}

const navLinks = [
  {
    title: "Upcoming Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
];

const privateLinks = [
  {
    title: "Create Event",
    href: "/create-event",
    icon: PlusCircle,
  },
  {
    title: "Manage Events",
    href: "/manage-events",
    icon: CalendarCheck,
  },
  {
    title: "Joined Events",
    href: "/my-joined-events",
    icon: Users,
  },
];

export default function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await onLogout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-800 bg-[#047857] text-white backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/kindora-logo.jpg"
            alt="Kindora - Small Acts, Big Impact"
            width={170}
            height={65}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 md:flex"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {/* Desktop Profile Dropdown */}
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              aria-label="Open profile menu"
                              className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500"
                            />
                          }
                        />
                      }
                    >
                      <Avatar className="h-10 w-10 border-2 border-emerald-100">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-emerald-100 font-semibold text-emerald-700">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenuContent
                  align="end"
                  side="bottom"
                  sideOffset={12}
                  className="z-[100] w-72 min-w-72 rounded-2xl border border-emerald-100 bg-white p-2 text-slate-800 shadow-2xl"
                >
                  {/* Profile Information */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 border border-emerald-100">
                          <AvatarImage
                            src={user.image || undefined}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-emerald-100 text-base font-semibold text-emerald-700">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex min-w-0 flex-col gap-1">
                          <span className="truncate text-sm font-semibold text-slate-800">
                            {user.name}
                          </span>

                          {user.email && (
                            <span className="truncate text-xs font-normal text-slate-500">
                              {user.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2 bg-slate-200" />

                  <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    My Activities
                  </div>

                  {/* Private Navigation Links */}
                  <DropdownMenuGroup>
                    {privateLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);

                      return (
                        <DropdownMenuItem
                          key={link.href}
                          render={<Link href={link.href} />}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                            active
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 focus:bg-emerald-50 focus:text-emerald-700"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              active ? "text-emerald-700" : "text-emerald-600"
                            }`}
                          />
                          {link.title}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Desktop Logout */}
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="outline"
                className="gap-2 rounded-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
                className="border-slate-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="fixed inset-x-0 top-[72px] bottom-auto h-auto max-h-[calc(100dvh-72px)] w-full max-w-none overflow-y-auto rounded-b-2xl rounded-t-none border-x-0 border-t border-b border-slate-200 bg-white p-5"
            >
              <SheetHeader className="p-0 text-left">
                <SheetTitle className="flex items-center">
                  <Image
                    src="/kindora-logo.png"
                    alt="Kindora"
                    width={140}
                    height={55}
                    className="h-11 w-auto object-contain"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-5 flex flex-col gap-2">
                {/* User Information */}
                {user && (
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">
                        {user.name}
                      </p>

                      {user.email && (
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Public Navigation */}
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                          isActive(link.href)
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {link.title}
                      </Link>
                    </SheetClose>
                  );
                })}

                {/* Private Navigation */}
                {user && (
                  <>
                    <div className="my-2 border-t border-slate-200" />

                    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      My Activities
                    </p>

                    {privateLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <SheetClose key={link.href} asChild>
                          <Link
                            href={link.href}
                            aria-current={
                              isActive(link.href) ? "page" : undefined
                            }
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                              isActive(link.href)
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {link.title}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </>
                )}

                <div className="my-2 border-t border-slate-200" />

                {/* Mobile Authentication */}
                {user ? (
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full justify-start gap-3 rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="h-5 w-5" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href="/login"
                      className="flex w-full items-center gap-3 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      <LogIn className="h-5 w-5" />
                      Login
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
