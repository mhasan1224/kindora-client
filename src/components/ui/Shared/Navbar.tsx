
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
  UserRound,
  Home,
  Info,
  Mail,
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

import ThemeToggle from "@/components/ui/Shared/ThemeToggle";

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
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Upcoming Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
  {
    title: "About Us",
    href: "/#about",
    icon: Info,
  },
  {
    title: "Contact Us",
    href: "/#contact",
    icon: Mail,
  },
];

const privateLinks = [
  {
    title: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-navbar text-navbar-foreground shadow-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/kindora-logo.png"
            alt="Kindora - Small Acts, Big Impact"
            width={170}
            height={65}
            priority
            className="h-12 w-auto rounded-2xl py-0.5 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 lg:flex"
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
                    ? "bg-secondary text-foreground shadow-sm dark:bg-card"
                    : "text-navbar-foreground hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Authentication and Theme */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

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
                              className="rounded-full outline-none ring-offset-2 ring-offset-navbar transition hover:ring-2 hover:ring-primary focus-visible:ring-2 focus-visible:ring-primary"
                            />
                          }
                        />
                      }
                    >
                      <Avatar className="h-10 w-10 border-2 border-card">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-secondary font-semibold text-secondary-foreground">
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
                  className="z-[100] w-72 min-w-72 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl"
                >
                  {/* Profile Information */}
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 border border-border">
                          <AvatarImage
                            src={user.image || undefined}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-secondary text-base font-semibold text-secondary-foreground">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex min-w-0 flex-col gap-1">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {user.name}
                          </span>

                          {user.email && (
                            <span className="truncate text-xs font-normal text-muted-foreground">
                              {user.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2 bg-border" />

                  <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                              ? "bg-secondary text-secondary-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              active ? "text-primary" : "text-muted-foreground"
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
                className="gap-2 rounded-full border-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navigation and Theme */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="border-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="fixed inset-x-0 top-[72px] bottom-auto h-auto max-h-[calc(100dvh-72px)] w-full max-w-none overflow-y-auto rounded-b-2xl rounded-t-none border-x-0 border-t border-b border-border bg-popover p-5"
            >
              <SheetHeader className="p-0 text-left">
                <SheetTitle className="flex items-center">
                  <Image
                    src="/kindora-logo.png"
                    alt="Kindora"
                    width={140}
                    height={55}
                    className="h-11 w-auto rounded-2xl py-0.5 object-contain"
                  />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-5 flex flex-col gap-2">

                {/* User Information */}
                {user && (
                  <div className="mb-2 flex items-center gap-3 rounded-xl bg-secondary p-3">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {user.name}
                      </p>

                      {user.email && (
                        <p className="truncate text-xs text-muted-foreground">
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
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                            isActive(link.href)
                              ? "bg-secondary text-secondary-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                          }`}
                        />
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {link.title}
                    </SheetClose>
                  );
                })}

                {/* Private Navigation */}
                {user && (
                  <>
                    <div className="my-2 border-t border-border" />

                    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      My Activities
                    </p>

                    {privateLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <SheetClose
                          key={link.href}
                          render={
                            <Link
                              href={link.href}
                              aria-current={
                                isActive(link.href) ? "page" : undefined
                              }
                              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                                isActive(link.href)
                                  ? "bg-secondary text-secondary-foreground"
                                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                              }`}
                            />
                          }
                        >
                          <Icon className="h-5 w-5" />
                          {link.title}
                        </SheetClose>
                      );
                    })}
                  </>
                )}

                <div className="my-2 border-t border-border" />

                {/* Mobile Authentication */}
                {user ? (
                  <SheetClose
                    render={
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full justify-start gap-3 rounded-lg border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      />
                    }
                  >
                    <LogOut className="h-5 w-5" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </SheetClose>
                ) : (
                  <SheetClose
                    render={
                      <Link
                        href="/login"
                        className="flex w-full items-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                      />
                    }
                  >
                    <LogIn className="h-5 w-5" />
                    Login
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
