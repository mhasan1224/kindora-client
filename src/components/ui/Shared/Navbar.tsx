
"use client";

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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    href: "/joined-events",
    icon: Users,
  },
];

export default function Navbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/kindora-logo.png"
            alt="Kindora - Small Acts, Big Impact"
            width={170}
            height={65}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={`gap-2 rounded-full px-4 ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <Link href={link.href}>
                  <Icon className="h-4 w-4" />
                  {link.title}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {/* Profile Dropdown */}
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="Open profile menu"
                          className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-emerald-500"
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
                        </button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-slate-800">
                        {user.name}
                      </span>
                      {user.email && (
                        <span className="text-xs font-normal text-slate-500">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {privateLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Icon className="h-4 w-4 text-emerald-600" />
                          {link.title}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Logout Button */}
              <Button
                onClick={onLogout}
                variant="outline"
                className="gap-2 rounded-full border-emerald-600 text-emerald-700 hover:bg-emerald-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="gap-2 rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700"
            >
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
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

            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
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

              <div className="mt-8 flex flex-col gap-3">
                {/* User Information */}
                {user && (
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
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
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
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
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
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
                      onClick={onLogout}
                      className="w-full justify-start gap-3 rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      asChild
                      className="w-full justify-start gap-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      <Link href="/login">
                        <LogIn className="h-5 w-5" />
                        Login
                      </Link>
                    </Button>
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